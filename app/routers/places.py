from fastapi import APIRouter, Query
from ..services import places_service

router = APIRouter()


@router.get("/{city}")
async def attractions(city: str, limit: int = Query(10, ge=1, le=30)):
    items = await places_service.places_for_city(city, limit=limit)
    return {"success": True, "city": city.title(), "count": len(items), "places": items}
