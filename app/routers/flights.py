from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from app.data.flights import search_flights, POPULAR_ROUTES, AIRLINES, FLIGHTS_DB, enrich
from app.models import MultiCityRequest

router = APIRouter()

@router.get("/search")
def search(
        frm: str = Query(..., alias="from"),
        to: str = Query(...),
        sort: str = Query("price", enum=["price", "duration", "stops"]),
        page: int = Query(1, ge=1),
        limit: int = Query(10, ge=1, le=50),
        max_price: Optional[float] = None,
        stops: Optional[int] = Query(None, ge=0, le=3)
):
        results = search_flights(frm, to, sort, page, limit, max_price, stops)
        return {"results": results, "total": len(results), "page": page}

@router.get("/routes")
def get_routes():
        return POPULAR_ROUTES

@router.get("/airlines")
def get_airlines():
        return [{"code": k, **v} for k, v in AIRLINES.items()]

@router.post("/multi-city")
def multi_city(req: MultiCityRequest):
    all_results = []
    for leg in req.legs:
        results = search_flights(leg.frm, leg.to, page=1, limit=5)
        all_results.append({"leg": {"from": leg.frm, "to": leg.to, "date": leg.date}, "options": results})
    return {"legs": all_results, "total_legs": len(all_results)}

@router.get("/{flight_id}")
def get_flight(flight_id: str):
    flight = next((f for f in FLIGHTS_DB if f["id"] == flight_id), None)
    if not flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    return enrich(flight)
