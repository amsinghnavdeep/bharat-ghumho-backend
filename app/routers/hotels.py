from fastapi import APIRouter, Query
from ..data.hotels import HOTELS

router = APIRouter()

@router.get("/search")
def search_hotels(city: str | None = None, code: str | None = None, min_stars: int | None = None,
                  max_price: int | None = None, sort: str = "price"):
    results = list(HOTELS)
    if city: results = [h for h in results if city.lower() in h["city"].lower()]
    if code: results = [h for h in results if h["code"] == code.upper()]
    if min_stars: results = [h for h in results if h["stars"] >= min_stars]
    if max_price: results = [h for h in results if h["price"] <= max_price]
    key = {"rating": "rating", "stars": "stars"}.get(sort, "price")
    results.sort(key=lambda x: x.get(key, 0), reverse=sort in ["rating","stars"])
    return {"success": True, "hotels": results, "count": len(results)}

@router.get("/city/{code}")
def hotels_by_city(code: str):
    hotels = sorted([h for h in HOTELS if h["code"] == code.upper()], key=lambda x: x["price"])
    return {"success": True, "city": code.upper(), "hotels": hotels, "count": len(hotels)}

@router.get("/{hotel_id}")
def get_hotel(hotel_id: str):
    h = next((x for x in HOTELS if x["id"] == hotel_id), None)
    if not h: return {"success": False, "error": "Hotel not found"}
    return {"success": True, "hotel": h}
