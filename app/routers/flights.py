from fastapi import APIRouter, Query
from ..data.flights import FLIGHTS, POPULAR_ROUTES, AIRLINES, enrich, extract_code

router = APIRouter(prefix="/flights", tags=["Flights"])

@router.get("/search")
def search_flights(
    from_city: str = Query(..., alias="from"),
    to_city: str = Query(..., alias="to"),
    sort: str = "price",
    page: int = 1, limit: int = 10,
    max_price: int | None = None,
    stops: int | None = None
):
    fc, tc = extract_code(from_city), extract_code(to_city)
    results = [enrich(f) for f in FLIGHTS if f["fr"] == fc and f["to"] == tc]
    if max_price: results = [r for r in results if r["price"] <= max_price]
    if stops is not None: results = [r for r in results if r["stops"] <= stops]
    key = {"duration": "durationMin", "stops": "stops"}.get(sort, "price")
    results.sort(key=lambda x: x.get(key, 999))
    start = (page - 1) * limit
    return {"success": True, "flights": results[start:start+limit], "total": len(results), "page": page}

@router.get("/routes")
def get_routes():
    return {"success": True, "routes": POPULAR_ROUTES, "count": len(POPULAR_ROUTES)}

@router.get("/airlines")
def get_airlines():
    return {"success": True, "airlines": list(AIRLINES.values())}

@router.post("/multi-city")
def multi_city(data: dict):
    from ..data.flights import FLIGHTS, enrich, extract_code
    legs = data.get("legs", [])
    results = []
    total = 0
    for i, leg in enumerate(legs):
        fc = extract_code(leg.get("from", ""))
        tc = extract_code(leg.get("to", ""))
        flights = sorted([enrich(f) for f in FLIGHTS if f["fr"] == fc and f["to"] == tc], key=lambda x: x["price"])
        cheapest = flights[0] if flights else None
        total += cheapest["price"] if cheapest else 0
        results.append({"leg": i+1, "from": fc, "to": tc, "options": len(flights), "cheapest": cheapest, "flights": flights})
    return {"success": True, "legs": results, "totalLegs": len(results), "estimatedMinTotal": total}

@router.get("/{flight_id}")
def get_flight(flight_id: str):
    f = next((fl for fl in FLIGHTS if fl["id"] == flight_id), None)
    if not f: return {"success": False, "error": "Flight not found"}
    return {"success": True, "flight": enrich(f)}
