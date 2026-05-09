from fastapi import APIRouter
from datetime import date
import random

router = APIRouter()

FESTIVALS = [
    {
        "id": "diwali",
        "name": "Diwali",
        "icon": "🪔",
        "color": "#FF6B00",
        "desc": "Festival of Lights — the busiest travel season. Book 8–10 weeks early for best fares.",
        "peak_dates": ["2025-10-20", "2025-10-21", "2025-10-22", "2025-10-23", "2025-10-24"],
        "best_book_window": "8-10 weeks before",
        "avg_surge": 38,
        "corridors": [
            {"from": "Toronto", "from_code": "YYZ", "to": "Delhi", "to_code": "DEL", "flag": "🇨🇦"},
            {"from": "London", "from_code": "LHR", "to": "Mumbai", "to_code": "BOM", "flag": "🇬🇧"},
            {"from": "Dubai", "from_code": "DXB", "to": "Delhi", "to_code": "DEL", "flag": "🇦🇪"},
            {"from": "New York", "from_code": "JFK", "to": "Delhi", "to_code": "DEL", "flag": "🇺🇸"},
            {"from": "Sydney", "from_code": "SYD", "to": "Mumbai", "to_code": "BOM", "flag": "🇦🇺"},
            {"from": "Singapore", "from_code": "SIN", "to": "Chennai", "to_code": "MAA", "flag": "🇸🇬"},
        ],
    },
    {
        "id": "holi",
        "name": "Holi",
        "icon": "🎨",
        "color": "#C2185B",
        "desc": "Festival of Colours in March. Fares spike 2–3 weeks before. Book 6 weeks out.",
        "peak_dates": ["2026-03-14", "2026-03-15", "2026-03-16"],
        "best_book_window": "6-8 weeks before",
        "avg_surge": 24,
        "corridors": [
            {"from": "Toronto", "from_code": "YYZ", "to": "Delhi", "to_code": "DEL", "flag": "🇨🇦"},
            {"from": "London", "from_code": "LHR", "to": "Delhi", "to_code": "DEL", "flag": "🇬🇧"},
            {"from": "Dubai", "from_code": "DXB", "to": "Jaipur", "to_code": "JAI", "flag": "🇦🇪"},
            {"from": "Vancouver", "from_code": "YVR", "to": "Mumbai", "to_code": "BOM", "flag": "🇨🇦"},
        ],
    },
    {
        "id": "navratri",
        "name": "Navratri",
        "icon": "💃",
        "color": "#D4A843",
        "desc": "Nine nights of dance. Gujarat-bound routes surge heavily. Book 5–7 weeks before.",
        "peak_dates": ["2025-10-02", "2025-10-03", "2025-10-04", "2025-10-05", "2025-10-06",
                       "2025-10-07", "2025-10-08", "2025-10-09", "2025-10-10", "2025-10-11"],
        "best_book_window": "5-7 weeks before",
        "avg_surge": 29,
        "corridors": [
            {"from": "Toronto", "from_code": "YYZ", "to": "Ahmedabad", "to_code": "AMD", "flag": "🇨🇦"},
            {"from": "London", "from_code": "LHR", "to": "Ahmedabad", "to_code": "AMD", "flag": "🇬🇧"},
            {"from": "Dubai", "from_code": "DXB", "to": "Ahmedabad", "to_code": "AMD", "flag": "🇦🇪"},
        ],
    },
    {
        "id": "wedding",
        "name": "Wedding Season",
        "icon": "💒",
        "color": "#7A1F2B",
        "desc": "Nov–Feb is wedding peak across India. Family group routes are most affected.",
        "peak_dates": ["2025-11-15", "2025-11-22", "2025-11-29", "2025-12-06", "2025-12-13",
                       "2025-12-20", "2026-01-10", "2026-01-17", "2026-01-24", "2026-02-07"],
        "best_book_window": "10-12 weeks before",
        "avg_surge": 45,
        "corridors": [
            {"from": "Toronto", "from_code": "YYZ", "to": "Delhi", "to_code": "DEL", "flag": "🇨🇦"},
            {"from": "London", "from_code": "LHR", "to": "Mumbai", "to_code": "BOM", "flag": "🇬🇧"},
            {"from": "Dubai", "from_code": "DXB", "to": "Delhi", "to_code": "DEL", "flag": "🇦🇪"},
            {"from": "Calgary", "from_code": "YYC", "to": "Jaipur", "to_code": "JAI", "flag": "🇨🇦"},
            {"from": "New York", "from_code": "JFK", "to": "Mumbai", "to_code": "BOM", "flag": "🇺🇸"},
        ],
    },
    {
        "id": "eid",
        "name": "Eid",
        "icon": "🌙",
        "color": "#0D7377",
        "desc": "Eid travel peaks to Gulf corridors. Dubai and Abu Dhabi routes sell out fast.",
        "peak_dates": ["2026-03-30", "2026-03-31", "2026-04-01"],
        "best_book_window": "6-8 weeks before",
        "avg_surge": 33,
        "corridors": [
            {"from": "London", "from_code": "LHR", "to": "Dubai", "to_code": "DXB", "flag": "🇬🇧"},
            {"from": "Toronto", "from_code": "YYZ", "to": "Dubai", "to_code": "DXB", "flag": "🇨🇦"},
            {"from": "New York", "from_code": "JFK", "to": "Dubai", "to_code": "DXB", "flag": "🇺🇸"},
        ],
    },
    {
        "id": "summer",
        "name": "Summer Break",
        "icon": "🥭",
        "color": "#138808",
        "desc": "May–July school holidays see the highest overall volume. Book 12+ weeks ahead.",
        "peak_dates": ["2026-05-01", "2026-05-15", "2026-06-01", "2026-06-15", "2026-07-01"],
        "best_book_window": "12-14 weeks before",
        "avg_surge": 52,
        "corridors": [
            {"from": "Toronto", "from_code": "YYZ", "to": "Delhi", "to_code": "DEL", "flag": "🇨🇦"},
            {"from": "London", "from_code": "LHR", "to": "Goa", "to_code": "GOI", "flag": "🇬🇧"},
            {"from": "Sydney", "from_code": "SYD", "to": "Delhi", "to_code": "DEL", "flag": "🇦🇺"},
            {"from": "Singapore", "from_code": "SIN", "to": "Kerala", "to_code": "COK", "flag": "🇸🇬"},
            {"from": "New York", "from_code": "JFK", "to": "Mumbai", "to_code": "BOM", "flag": "🇺🇸"},
        ],
    },
]

def _make_fare_trend(base: int, surge_pct: int, weeks: int = 16):
    """Generate realistic weekly fare trend from now (16 weeks out → peak)."""
    trend = []
    random.seed(base)
    for w in range(weeks, -1, -1):
        if w > 10:
            factor = 1.0 + random.uniform(-0.04, 0.06)
        elif w > 6:
            factor = 1.0 + (10 - w) * 0.018 + random.uniform(-0.03, 0.04)
        elif w > 3:
            factor = 1.0 + surge_pct / 100 * 0.6 + random.uniform(0, 0.05)
        else:
            factor = 1.0 + surge_pct / 100 * 0.85 + random.uniform(0.02, 0.08)
        fare = int(base * factor)
        trend.append({"weeks_out": w, "fare": fare})
    return trend


@router.get("/")
def get_festivals():
    return [
        {
            "id": f["id"], "name": f["name"], "icon": f["icon"],
            "color": f["color"], "desc": f["desc"],
            "peak_dates": f["peak_dates"], "best_book_window": f["best_book_window"],
            "avg_surge": f["avg_surge"], "corridor_count": len(f["corridors"]),
        }
        for f in FESTIVALS
    ]


@router.get("/{festival_id}")
def get_festival_detail(festival_id: str):
    fest = next((f for f in FESTIVALS if f["id"] == festival_id), None)
    if not fest:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Festival not found")

    corridors_with_fares = []
    for c in fest["corridors"]:
        base = random.randint(480, 900)
        corridors_with_fares.append({
            **c,
            "base_fare": base,
            "peak_fare": int(base * (1 + fest["avg_surge"] / 100)),
            "trend": _make_fare_trend(base, fest["avg_surge"]),
            "savings_if_early": int(base * fest["avg_surge"] / 100),
        })

    return {**fest, "corridors": corridors_with_fares}
