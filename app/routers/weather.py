from fastapi import APIRouter
from ..services import weather_service

router = APIRouter()


@router.get("/{city}")
async def get_weather(city: str):
    data = await weather_service.current_weather(city)
    return {"success": True, "weather": data}


@router.get("/{city}/forecast")
async def get_forecast(city: str):
    data = await weather_service.forecast(city)
    return {"success": True, "city": city.title(), "forecast": data}
