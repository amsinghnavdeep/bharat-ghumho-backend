import json
import uuid
from fastapi import APIRouter, Depends, HTTPException
from ..data.flights import FLIGHTS_DB, AIRLINES, enrich, extract_code
from ..data.hotels import HOTELS
from ..middleware import get_current_user, get_optional_user
from ..models import SaveTripRequest, UpdateTripRequest
from .. import database

router = APIRouter()


def _build_plan(data: dict) -> dict:
    travelers = data.get("travelers", 1)
    origin = extract_code(data.get("origin", ""))
    destinations = data.get("destinations", [])
    budget = data.get("budget")
    plan = {"travelers": travelers, "origin": origin, "totalEstimate": 0, "legs": []}
    current = origin
    for i, dest in enumerate(destinations):
        dc = extract_code(dest.get("city", dest) if isinstance(dest, dict) else dest)
        nights = dest.get("nights", 3) if isinstance(dest, dict) else 3
        flights = sorted([enrich(f) for f in FLIGHTS_DB if f["from"] == current and f["to"] == dc], key=lambda x: x["price"])
        cheapest = flights[0] if flights else None
        hotels = sorted([h for h in HOTELS if h["code"] == dc], key=lambda x: x["price"])
        best_hotel = hotels[0] if hotels else None
        fc = (cheapest["price"] * travelers) if cheapest else 0
        hc = (best_hotel["price"] * nights) if best_hotel else 0
        plan["legs"].append({
            "leg": i + 1, "from": current, "to": dc, "nights": nights,
            "flight": {"airline": cheapest.get("airline", ""), "price": cheapest["price"], "duration": cheapest["duration"], "totalForGroup": fc} if cheapest else {"note": "No direct flight found"},
            "hotel": {"name": best_hotel["name"], "stars": best_hotel["stars"], "pricePerNight": best_hotel["price"], "totalForStay": hc} if best_hotel else {"note": "No hotel data"},
            "legEstimate": fc + hc,
        })
        plan["totalEstimate"] += fc + hc
        current = dc
    ret_flights = sorted([enrich(f) for f in FLIGHTS_DB if f["from"] == current and f["to"] == origin], key=lambda x: x["price"])
    if ret_flights:
        rc = ret_flights[0]["price"] * travelers
        plan["legs"].append({
            "leg": len(plan["legs"]) + 1, "from": current, "to": origin, "type": "return",
            "flight": {"airline": ret_flights[0]["airline"], "price": ret_flights[0]["price"], "totalForGroup": rc},
            "legEstimate": rc,
        })
        plan["totalEstimate"] += rc
    plan["budgetStatus"] = (
        "Within budget" if budget and plan["totalEstimate"] <= budget
        else (f"Over budget by ${plan['totalEstimate'] - budget:.0f}" if budget else "No budget set")
    )
    return plan


def _row_to_saved_trip(row: dict) -> dict:
    return {
        "id": row["id"],
        "user_id": row["user_id"],
        "name": row["name"],
        "plan": json.loads(row["plan"]) if row.get("plan") else None,
        "created_at": row["created_at"],
    }


@router.post("/plan")
def plan_trip(data: dict, user=Depends(get_optional_user)):
    plan = _build_plan(data)
    return {"success": True, "plan": plan}


@router.post("/save")
def save_trip(req: SaveTripRequest, user=Depends(get_current_user)):
    plan = _build_plan({
        "travelers": req.travelers,
        "origin": req.origin,
        "destinations": req.destinations,
        "budget": req.budget,
    })
    trip_id = f"TR-{uuid.uuid4().hex[:10].upper()}"
    database.execute(
        "INSERT INTO saved_trips (id, user_id, name, plan) VALUES (?, ?, ?, ?)",
        (trip_id, user["sub"], req.name, json.dumps(plan)),
    )
    row = database.fetchone("SELECT * FROM saved_trips WHERE id = ?", (trip_id,))
    return {"success": True, "trip": _row_to_saved_trip(row)}


@router.get("/saved")
def list_saved_trips(user=Depends(get_current_user)):
    rows = database.fetchall(
        "SELECT * FROM saved_trips WHERE user_id = ? ORDER BY created_at DESC",
        (user["sub"],),
    )
    return {"success": True, "count": len(rows), "trips": [_row_to_saved_trip(r) for r in rows]}


@router.get("/saved/{trip_id}")
def get_saved_trip(trip_id: str, user=Depends(get_current_user)):
    row = database.fetchone(
        "SELECT * FROM saved_trips WHERE id = ? AND user_id = ?",
        (trip_id, user["sub"]),
    )
    if not row:
        raise HTTPException(status_code=404, detail="Saved trip not found")
    return {"success": True, "trip": _row_to_saved_trip(row)}


@router.put("/saved/{trip_id}")
def update_saved_trip(trip_id: str, req: UpdateTripRequest, user=Depends(get_current_user)):
    row = database.fetchone(
        "SELECT * FROM saved_trips WHERE id = ? AND user_id = ?",
        (trip_id, user["sub"]),
    )
    if not row:
        raise HTTPException(status_code=404, detail="Saved trip not found")

    current_plan = json.loads(row["plan"])

    new_name = req.name if req.name is not None else row["name"]

    needs_replan = any(v is not None for v in [req.origin, req.destinations, req.travelers, req.budget])
    if needs_replan:
        current_plan_data = {
            "travelers": current_plan.get("travelers", 1),
            "origin": current_plan.get("origin", ""),
            "destinations": [],
            "budget": None,
        }
        for leg in current_plan.get("legs", []):
            if leg.get("type") != "return":
                current_plan_data["destinations"].append({
                    "city": leg.get("to", ""),
                    "nights": leg.get("nights", 3),
                })

        merged = {
            "travelers": req.travelers if req.travelers is not None else current_plan_data["travelers"],
            "origin": req.origin if req.origin is not None else current_plan_data["origin"],
            "destinations": req.destinations if req.destinations is not None else current_plan_data["destinations"],
            "budget": req.budget if req.budget is not None else current_plan_data["budget"],
        }
        new_plan = _build_plan(merged)
    else:
        new_plan = current_plan

    database.execute(
        "UPDATE saved_trips SET name = ?, plan = ? WHERE id = ?",
        (new_name, json.dumps(new_plan), trip_id),
    )
    updated = database.fetchone("SELECT * FROM saved_trips WHERE id = ?", (trip_id,))
    return {"success": True, "trip": _row_to_saved_trip(updated)}


@router.delete("/saved/{trip_id}")
def delete_saved_trip(trip_id: str, user=Depends(get_current_user)):
    row = database.fetchone(
        "SELECT id FROM saved_trips WHERE id = ? AND user_id = ?",
        (trip_id, user["sub"]),
    )
    if not row:
        raise HTTPException(status_code=404, detail="Saved trip not found")
    database.execute("DELETE FROM saved_trips WHERE id = ?", (trip_id,))
    return {"success": True, "id": trip_id}
