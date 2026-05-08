from fastapi import APIRouter, HTTPException, Query
from ..data.cars import CARS, search_cars, CITY_NAMES

router = APIRouter()


@router.get("/search")
def cars_search(
    city: str | None = None,
    code: str | None = None,
    type: str | None = None,
    max_price: float | None = None,
    sort: str = Query("price", enum=["price", "rating", "seats"]),
):
    results = search_cars(city, code, type, max_price, sort)
    return {"success": True, "count": len(results), "cars": results}


@router.get("/cities")
def list_cities():
    return {"success": True, "cities": [
        {"code": code, "name": name} for code, name in CITY_NAMES.items()
    ]}


@router.get("/city/{code}")
def cars_by_city(code: str):
    results = sorted(
        [c for c in CARS if c["code"] == code.upper()],
        key=lambda c: c["price_per_day"],
    )
    return {"success": True, "city": code.upper(), "count": len(results), "cars": results}


@router.get("/{car_id}")
def get_car(car_id: str):
    car = next((c for c in CARS if c["id"] == car_id), None)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return {"success": True, "car": car}
