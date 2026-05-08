"""OpenWeatherMap integration with a deterministic mock fallback for offline / no-key dev."""
import os
import math
from datetime import datetime, timedelta
import httpx

OPENWEATHER_KEY = os.getenv("OPENWEATHER_API_KEY", "").strip()
OWM_BASE = "https://api.openweathermap.org/data/2.5"


_MOCK_CITY_BASE = {
    "delhi": (32, "Haze"),
    "mumbai": (30, "Humid"),
    "bangalore": (24, "Pleasant"),
    "kolkata": (31, "Humid"),
    "chennai": (33, "Sunny"),
    "hyderabad": (29, "Partly Cloudy"),
    "kochi": (28, "Light Rain"),
    "goa": (29, "Sunny"),
    "jaipur": (33, "Sunny"),
    "agra": (32, "Sunny"),
    "udaipur": (30, "Clear"),
    "leh": (8, "Cold"),
    "manali": (12, "Cloudy"),
    "shimla": (15, "Cloudy"),
    "varanasi": (30, "Clear"),
    "amritsar": (28, "Clear"),
    "guwahati": (27, "Light Rain"),
    "port blair": (29, "Showers"),
    "toronto": (10, "Cloudy"),
    "vancouver": (12, "Light Rain"),
    "new york": (14, "Partly Cloudy"),
    "london": (12, "Drizzle"),
    "dubai": (34, "Sunny"),
    "singapore": (30, "Humid"),
    "sydney": (22, "Sunny"),
    "tokyo": (16, "Clear"),
}


def _mock_weather(city: str) -> dict:
    key = city.lower().strip()
    base_temp, cond = _MOCK_CITY_BASE.get(key, (26, "Partly Cloudy"))
    return {
        "city": city.title(),
        "temp": base_temp,
        "feels_like": base_temp + 1,
        "condition": cond,
        "description": cond.lower(),
        "humidity": 60,
        "wind_speed": 4.5,
        "icon": "01d",
        "source": "mock"
    }


def _mock_forecast(city: str) -> list[dict]:
    key = city.lower().strip()
    base_temp, cond = _MOCK_CITY_BASE.get(key, (26, "Partly Cloudy"))
    today = datetime.utcnow().date()
    out = []
    for i in range(5):
        delta = math.sin(i) * 2.5
        out.append({
            "date": (today + timedelta(days=i)).isoformat(),
            "min": round(base_temp - 4 + delta, 1),
            "max": round(base_temp + 3 + delta, 1),
            "condition": cond,
            "icon": "01d",
        })
    return out


async def current_weather(city: str) -> dict:
    if not OPENWEATHER_KEY:
        return _mock_weather(city)
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            r = await client.get(f"{OWM_BASE}/weather", params={
                "q": city, "appid": OPENWEATHER_KEY, "units": "metric"
            })
            if r.status_code != 200:
                return _mock_weather(city)
            d = r.json()
            return {
                "city": d.get("name", city.title()),
                "temp": d["main"]["temp"],
                "feels_like": d["main"]["feels_like"],
                "condition": d["weather"][0]["main"],
                "description": d["weather"][0]["description"],
                "humidity": d["main"]["humidity"],
                "wind_speed": d["wind"]["speed"],
                "icon": d["weather"][0]["icon"],
                "source": "openweathermap"
            }
    except Exception:
        return _mock_weather(city)


async def forecast(city: str) -> list[dict]:
    if not OPENWEATHER_KEY:
        return _mock_forecast(city)
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            r = await client.get(f"{OWM_BASE}/forecast", params={
                "q": city, "appid": OPENWEATHER_KEY, "units": "metric"
            })
            if r.status_code != 200:
                return _mock_forecast(city)
            data = r.json()
            buckets: dict[str, dict] = {}
            for item in data.get("list", []):
                day = item["dt_txt"].split(" ")[0]
                t = item["main"]["temp"]
                cond = item["weather"][0]["main"]
                icon = item["weather"][0]["icon"]
                if day not in buckets:
                    buckets[day] = {"date": day, "min": t, "max": t, "condition": cond, "icon": icon}
                else:
                    buckets[day]["min"] = min(buckets[day]["min"], t)
                    buckets[day]["max"] = max(buckets[day]["max"], t)
            return list(buckets.values())[:5]
    except Exception:
        return _mock_forecast(city)
