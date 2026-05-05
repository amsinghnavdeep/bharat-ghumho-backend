from fastapi import APIRouter, Query, HTTPException
from app.data.hotels import HOTELS

router = APIRouter(prefix="/hotels", tags=["Hotels"])


@router.get("/search")
def search_hotels(
      city: str = Query(None),
      code: str = Query(None),
      checkin: str = Query(None),
      checkout: str = Query(None),
      guests: int = Query(1),
      rooms: int = Query(1),
      min_stars: float = Query(None),
      max_price: int = Query(None),
      sort: str = Query("price"),
      page: int = Query(1),
      limit: int = Query(10),
):
      results = list(HOTELS)
      if city:
                results = [h for h in results if city.lower() in h.get("city", "").lower()]
            if code:
                      results = [h for h in results if h.get("code", "") == code.upper()]
                  if min_stars:
                            results = [h for h in results if h.get("stars", 0) >= min_stars]
                        if max_price:
                                  results = [h for h in results if h.get("price", 0) >= max_price]
                              key = {"rating": "rating", "stars": "stars"}.get(sort, "price")
    results.sort(key=lambda x: x.get(key, 0), reverse=(sort in ["rating", "stars"]))
    start = (page - 1) * limit
    return {"success": True, "hotels": results[start:start + limit], "total": len(results), "page": page}


@router.get("/city/{code}")
def hotels_by_city(code: str):
      results = [h for h in HOTELS if h.get("code", "") == code.upper()]
    if not results:
              raise HTTPException(status_code=404, detail=f"No hotels found for {code.upper()}")
          return {"success": True, "city": code.upper(), "hotels": results, "total": len(results)}


@router.get("/{hotel_id}")
def get_hotel(hotel_id: str):
      hotel = next((h for h in HOTELS if h["id"] == hotel_id), None)
    if not hotel:
              raise HTTPException(status_code=404, detail="Hotel not found")
          return {"success": True, "hotel": hotel}
