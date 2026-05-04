from fastapi import APIRouter, Depends
from ..data.flights import FLIGHTS, AIRLINES, enrich, extract_code
from ..data.hotels import HOTELS
from ..middleware import get_optional_user

router = APIRouter(prefix="/trips", tags=["Trips"])

@router.post("/plan")
def plan_trip(data: dict, user=Depends(get_optional_user)):
    travelers = data.get("travelers", 1)
    origin = extract_code(data.get("origin", ""))
    destinations = data.get("destinations", [])
    budget = data.get("budget")
    plan = {"travelers": travelers, "origin": origin, "totalEstimate": 0, "legs": []}
    current = origin
    for i, dest in enumerate(destinations):
        dc = extract_code(dest.get("city", dest) if isinstance(dest, dict) else dest)
        nights = dest.get("nights", 3) if isinstance(dest, dict) else 3
        flights = sorted([enrich(f) for f in FLIGHTS if f["fr"] == current and f["to"] == dc], key=lambda x: x["price"])
        cheapest = flights[0] if flights else None
        hotels = sorted([h for h in HOTELS if h["code"] == dc], key=lambda x: x["price"])
        best_hotel = hotels[0] if hotels else None
        fc = (cheapest["price"] * travelers) if cheapest else 0
        hc = (best_hotel["price"] * nights) if best_hotel else 0
        plan["legs"].append({
            "leg": i+1, "from": current, "to": dc, "nights": nights,
            "flight": {"airline": cheapest.get("airline",""), "price": cheapest["price"], "duration": cheapest["duration"], "totalForGroup": fc} if cheapest else {"note": "No direct flight found"},
            "hotel": {"name": best_hotel["name"], "stars": best_hotel["stars"], "pricePerNight": best_hotel["price"], "totalForStay": hc} if best_hotel else {"note": "No hotel data"},
            "legEstimate": fc + hc
        })
        plan["totalEstimate"] += fc + hc
        current = dc
    # Return leg
    ret_flights = sorted([enrich(f) for f in FLIGHTS if f["fr"] == current and f["to"] == origin], key=lambda x: x["price"])
    if ret_flights:
        rc = ret_flights[0]["price"] * travelers
        plan["legs"].append({"leg": len(plan["legs"])+1, "from": current, "to": origin, "type": "return",
            "flight": {"airline": ret_flights[0]["airline"], "price": ret_flights[0]["price"], "totalForGroup": rc}, "legEstimate": rc})
        plan["totalEstimate"] += rc
    plan["budgetStatus"] = f"Within budget" if budget and plan["totalEstimate"] <= budget else (f"Over budget by ${plan['totalEstimate']-budget}" if budget else "No budget set")
    return {"success": True, "plan": plan}
