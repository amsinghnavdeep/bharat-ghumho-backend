"""Tourist attractions via OpenTripMap with a curated mock fallback."""
import os
import httpx

OPENTRIPMAP_KEY = os.getenv("OPENTRIPMAP_API_KEY", "").strip()
OTM_BASE = "https://api.opentripmap.com/0.1/en"


_MOCK = {
    "delhi": [
        {"name": "Red Fort", "kinds": "historic,fortifications", "rating": 4.5, "lat": 28.6562, "lon": 77.2410},
        {"name": "Qutub Minar", "kinds": "historic", "rating": 4.6, "lat": 28.5245, "lon": 77.1855},
        {"name": "India Gate", "kinds": "monuments", "rating": 4.6, "lat": 28.6129, "lon": 77.2295},
        {"name": "Humayun's Tomb", "kinds": "historic,unesco", "rating": 4.7, "lat": 28.5933, "lon": 77.2507},
        {"name": "Lotus Temple", "kinds": "religion,architecture", "rating": 4.6, "lat": 28.5535, "lon": 77.2588},
    ],
    "mumbai": [
        {"name": "Gateway of India", "kinds": "monuments", "rating": 4.6, "lat": 18.9220, "lon": 72.8347},
        {"name": "Marine Drive", "kinds": "promenade", "rating": 4.6, "lat": 18.9438, "lon": 72.8231},
        {"name": "Chhatrapati Shivaji Terminus", "kinds": "architecture,unesco", "rating": 4.7, "lat": 18.9402, "lon": 72.8356},
        {"name": "Elephanta Caves", "kinds": "historic,unesco", "rating": 4.5, "lat": 18.9633, "lon": 72.9315},
    ],
    "agra": [
        {"name": "Taj Mahal", "kinds": "wonders,unesco", "rating": 4.9, "lat": 27.1751, "lon": 78.0421},
        {"name": "Agra Fort", "kinds": "fortifications,unesco", "rating": 4.7, "lat": 27.1795, "lon": 78.0211},
        {"name": "Itimad-ud-Daulah", "kinds": "historic", "rating": 4.5, "lat": 27.1929, "lon": 78.0306},
    ],
    "jaipur": [
        {"name": "Amber Fort", "kinds": "fortifications", "rating": 4.7, "lat": 26.9855, "lon": 75.8513},
        {"name": "Hawa Mahal", "kinds": "architecture", "rating": 4.5, "lat": 26.9239, "lon": 75.8267},
        {"name": "City Palace Jaipur", "kinds": "palaces", "rating": 4.5, "lat": 26.9258, "lon": 75.8237},
    ],
    "goa": [
        {"name": "Baga Beach", "kinds": "beaches", "rating": 4.4, "lat": 15.5520, "lon": 73.7517},
        {"name": "Basilica of Bom Jesus", "kinds": "religion,unesco", "rating": 4.6, "lat": 15.5009, "lon": 73.9116},
        {"name": "Dudhsagar Falls", "kinds": "nature,waterfalls", "rating": 4.7, "lat": 15.3144, "lon": 74.3144},
    ],
    "bangalore": [
        {"name": "Lalbagh Botanical Garden", "kinds": "gardens", "rating": 4.5, "lat": 12.9507, "lon": 77.5848},
        {"name": "Bangalore Palace", "kinds": "palaces", "rating": 4.4, "lat": 12.9986, "lon": 77.5921},
        {"name": "Cubbon Park", "kinds": "parks", "rating": 4.5, "lat": 12.9763, "lon": 77.5929},
    ],
    "chennai": [
        {"name": "Marina Beach", "kinds": "beaches", "rating": 4.4, "lat": 13.0500, "lon": 80.2824},
        {"name": "Kapaleeshwarar Temple", "kinds": "religion", "rating": 4.6, "lat": 13.0337, "lon": 80.2698},
        {"name": "Fort St. George", "kinds": "fortifications", "rating": 4.3, "lat": 13.0796, "lon": 80.2879},
    ],
    "kochi": [
        {"name": "Fort Kochi", "kinds": "historic", "rating": 4.5, "lat": 9.9695, "lon": 76.2333},
        {"name": "Chinese Fishing Nets", "kinds": "iconic", "rating": 4.4, "lat": 9.9658, "lon": 76.2421},
        {"name": "Mattancherry Palace", "kinds": "palaces", "rating": 4.3, "lat": 9.9580, "lon": 76.2599},
    ],
    "hyderabad": [
        {"name": "Charminar", "kinds": "monuments", "rating": 4.5, "lat": 17.3616, "lon": 78.4747},
        {"name": "Golconda Fort", "kinds": "fortifications", "rating": 4.5, "lat": 17.3833, "lon": 78.4011},
        {"name": "Ramoji Film City", "kinds": "amusement", "rating": 4.6, "lat": 17.2543, "lon": 78.6808},
    ],
    "varanasi": [
        {"name": "Dashashwamedh Ghat", "kinds": "religion", "rating": 4.7, "lat": 25.3068, "lon": 83.0107},
        {"name": "Kashi Vishwanath", "kinds": "religion", "rating": 4.7, "lat": 25.3109, "lon": 83.0107},
        {"name": "Sarnath", "kinds": "religion,historic", "rating": 4.6, "lat": 25.3811, "lon": 83.0210},
    ],
    "udaipur": [
        {"name": "City Palace Udaipur", "kinds": "palaces", "rating": 4.7, "lat": 24.5760, "lon": 73.6839},
        {"name": "Lake Pichola", "kinds": "lakes", "rating": 4.7, "lat": 24.5728, "lon": 73.6769},
        {"name": "Jagdish Temple", "kinds": "religion", "rating": 4.5, "lat": 24.5790, "lon": 73.6841},
    ],
    "leh": [
        {"name": "Pangong Lake", "kinds": "lakes", "rating": 4.8, "lat": 33.7574, "lon": 78.6692},
        {"name": "Shanti Stupa", "kinds": "religion", "rating": 4.7, "lat": 34.1707, "lon": 77.5797},
        {"name": "Khardung La Pass", "kinds": "nature", "rating": 4.7, "lat": 34.2796, "lon": 77.6051},
    ],
}


def _mock_places(city: str) -> list[dict]:
    return _MOCK.get(city.lower().strip(), [
        {"name": f"Top attraction in {city.title()}", "kinds": "tourism", "rating": 4.0, "lat": 0, "lon": 0}
    ])


async def places_for_city(city: str, limit: int = 10) -> list[dict]:
    if not OPENTRIPMAP_KEY:
        return _mock_places(city)[:limit]
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            geo = await client.get(f"{OTM_BASE}/places/geoname", params={
                "name": city, "apikey": OPENTRIPMAP_KEY
            })
            if geo.status_code != 200:
                return _mock_places(city)[:limit]
            g = geo.json()
            lat, lon = g.get("lat"), g.get("lon")
            if lat is None or lon is None:
                return _mock_places(city)[:limit]
            radius = await client.get(f"{OTM_BASE}/places/radius", params={
                "radius": 15000, "lon": lon, "lat": lat,
                "rate": 2, "format": "json", "limit": limit, "apikey": OPENTRIPMAP_KEY
            })
            if radius.status_code != 200:
                return _mock_places(city)[:limit]
            items = radius.json()
            out = []
            for it in items:
                out.append({
                    "name": it.get("name") or "Unnamed POI",
                    "kinds": it.get("kinds", ""),
                    "rating": float(it.get("rate", 0)),
                    "lat": it.get("point", {}).get("lat"),
                    "lon": it.get("point", {}).get("lon"),
                    "xid": it.get("xid"),
                })
            return [o for o in out if o["name"] != "Unnamed POI"]
    except Exception:
        return _mock_places(city)[:limit]
