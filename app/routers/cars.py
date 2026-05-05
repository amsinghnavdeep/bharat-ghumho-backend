from fastapi import APIRouter, Query, HTTPException
from app.data.cars import CARS, CAR_CATEGORIES, CAR_VENDORS, PICKUP_AIRPORTS, get_cars

router = APIRouter(prefix="/cars", tags=["Cars"])


@router.get("/search")
def search_cars(
      airport: str = Query(...),
      pickup_date: str = Query(None),
      dropoff_date: str = Query(None),
      category: str = Query(None),
      max_price: int = Query(None),
      transmission: str = Query(None),
      min_seats: int = Query(None),
      sort: str = Query("price"),
      page: int = Query(1),
      limit: int = Query(10),
):
      results = get_cars(
                airport=airport, category=category, max_price=max_price,
                transmission=transmission, min_seats=min_seats, sort=sort,
      )
      start = (page - 1) * limit
      return {"success": True, "cars": results[start:start + limit], "total": len(results), "page": page}


@router.get("/airports")
def get_airports():
      return {"success": True, "airports": PICKUP_AIRPORTS}


@router.get("/categories")
def get_categories():
      return {"success": True, "categories": CAR_CATEGORIES}


@router.get("/vendors")
def get_vendors():
      return {"success": True, "vendors": CAR_VENDORS}


@router.get("/{car_id}")
def get_car(car_id: str):
      car = next((c for c in CARS if c["id"] == car_id), None)
      if not car:
                raise HTTPException(status_code=404, detail="Car not found")
            return {"success": True, "car": car}
