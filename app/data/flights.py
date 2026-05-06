AIRLINES = {
        "AI": {"name": "Air India",      "logo": "ai", "alliance": "Star Alliance"},
        "BA": {"name": "British Airways", "logo": "ba", "alliance": "Oneworld"},
        "EK": {"name": "Emirates",        "logo": "ek", "alliance": None},
        "AC": {"name": "Air Canada",      "logo": "ac", "alliance": "Star Alliance"},
        "QR": {"name": "Qatar Airways",   "logo": "qr", "alliance": "Oneworld"},
        "LH": {"name": "Lufthansa",       "logo": "lh", "alliance": "Star Alliance"},
        "SQ": {"name": "Singapore Air",   "logo": "sq", "alliance": "Star Alliance"},
        "TK": {"name": "Turkish Air",     "logo": "tk", "alliance": "Star Alliance"},
        "6E": {"name": "IndiGo",          "logo": "6e", "alliance": None},
        "UK": {"name": "Vistara",         "logo": "uk", "alliance": "Star Alliance"},
        "WS": {"name": "WestJet",         "logo": "ws", "alliance": None},
        "EY": {"name": "Etihad Airways",  "logo": "ey", "alliance": None},
}

POPULAR_ROUTES = [
        {"id": "r1", "region": "Canada Corridor", "from": "Toronto",   "fromCode": "YYZ", "to": "New Delhi", "toCode": "DEL", "airlines_count": 12, "price_from": 680, "currency": "CAD", "tag": "Most Popular",  "flag": "CA", "cities": "Toronto * Vancouver * Calgary * Montreal"},
        {"id": "r2", "region": "Canada Corridor", "from": "Vancouver",  "fromCode": "YVR", "to": "Mumbai",    "toCode": "BOM", "airlines_count": 10, "price_from": 720, "currency": "CAD", "tag": "Most Popular",  "flag": "CA", "cities": "Toronto * Vancouver * Calgary * Montreal"},
        {"id": "r3", "region": "USA Corridor",    "from": "New York",   "fromCode": "JFK", "to": "Mumbai",    "toCode": "BOM", "airlines_count": 18, "price_from": 620, "currency": "USD", "tag": "Best Value",    "flag": "US", "cities": "NYC * San Francisco * Chicago * Houston"},
        {"id": "r4", "region": "UK Corridor",     "from": "London",     "fromCode": "LHR", "to": "Delhi",     "toCode": "DEL", "airlines_count": 15, "price_from": 420, "currency": "GBP", "tag": "Direct Flights","flag": "GB", "cities": "London * Birmingham * Manchester"},
        {"id": "r5", "region": "UAE Corridor",    "from": "Dubai",      "fromCode": "DXB", "to": "Kerala",    "toCode": "COK", "airlines_count": 20, "price_from": 660, "currency": "AED", "tag": "Lowest Fares", "flag": "AE", "cities": "Dubai * Abu Dhabi * Sharjah"},
        {"id": "r6", "region": "Australia Corridor", "from": "Sydney",  "fromCode": "SYD", "to": "Delhi",     "toCode": "DEL", "airlines_count": 10, "price_from": 750, "currency": "AUD", "tag": "New Routes",   "flag": "AU", "cities": "Sydney * Melbourne * Perth * Brisbane"},
        {"id": "r7", "region": "Singapore Corridor", "from": "Singapore", "fromCode": "SIN", "to": "Chennai", "toCode": "MAA", "airlines_count": 14, "price_from": 220, "currency": "USD", "tag": "Fastest",      "flag": "SG", "cities": "Singapore * Direct to 8 Indian cities"},
]

FLIGHTS_DB = [
        {"id": "f1",  "airline": "AI", "from": "YYZ", "to": "DEL", "price": 689, "duration": "14h 30m", "stops": 0, "departure": "08:00", "arrival": "09:30+1", "baggage": "2x23kg", "class": "Economy", "seats_left": 4},
        {"id": "f2",  "airline": "EK", "from": "YYZ", "to": "DEL", "price": 742, "duration": "17h 45m", "stops": 1, "departure": "11:30", "arrival": "16:15+1", "baggage": "2x23kg", "class": "Economy", "seats_left": 12},
        {"id": "f3",  "airline": "QR", "from": "YYZ", "to": "DEL", "price": 698, "duration": "16h 20m", "stops": 1, "departure": "15:00", "arrival": "18:20+1", "baggage": "2x23kg", "class": "Economy", "seats_left": 8},
        {"id": "f4",  "airline": "AC", "from": "YYZ", "to": "BOM", "price": 812, "duration": "19h 10m", "stops": 1, "departure": "19:30", "arrival": "23:40+1", "baggage": "2x23kg", "class": "Economy", "seats_left": 6},
        {"id": "f5",  "airline": "AI", "from": "YVR", "to": "BOM", "price": 724, "duration": "16h 05m", "stops": 1, "departure": "01:00", "arrival": "07:05+1", "baggage": "2x23kg", "class": "Economy", "seats_left": 3},
        {"id": "f6",  "airline": "BA", "from": "LHR", "to": "DEL", "price": 428, "duration": "08h 30m", "stops": 0, "departure": "09:30", "arrival": "23:00",   "baggage": "1x23kg", "class": "Economy", "seats_left": 15},
        {"id": "f7",  "airline": "AI", "from": "LHR", "to": "BLR", "price": 445, "duration": "09h 50m", "stops": 0, "departure": "14:00", "arrival": "05:50+1", "baggage": "2x23kg", "class": "Economy", "seats_left": 9},
        {"id": "f8",  "airline": "EK", "from": "DXB", "to": "COK", "price": 185, "duration": "03h 20m", "stops": 0, "departure": "07:00", "arrival": "11:20",   "baggage": "1x23kg", "class": "Economy", "seats_left": 22},
        {"id": "f9",  "airline": "EY", "from": "DXB", "to": "BOM", "price": 210, "duration": "02h 55m", "stops": 0, "departure": "10:00", "arrival": "15:25",   "baggage": "1x23kg", "class": "Economy", "seats_left": 18},
        {"id": "f10", "airline": "SQ", "from": "SYD", "to": "HYD", "price": 758, "duration": "12h 10m", "stops": 1, "departure": "22:00", "arrival": "13:10+1", "baggage": "2x23kg", "class": "Economy", "seats_left": 5},
        {"id": "f11", "airline": "SQ", "from": "SIN", "to": "MAA", "price": 218, "duration": "03h 50m", "stops": 0, "departure": "06:00", "arrival": "08:00",   "baggage": "1x23kg", "class": "Economy", "seats_left": 30},
        {"id": "f12", "airline": "6E", "from": "DEL", "to": "GOI", "price": 82,  "duration": "02h 35m", "stops": 0, "departure": "12:00", "arrival": "14:35",   "baggage": "1x15kg", "class": "Economy", "seats_left": 14},
        {"id": "f13", "airline": "UK", "from": "GOI", "to": "BOM", "price": 65,  "duration": "01h 15m", "stops": 0, "departure": "16:00", "arrival": "17:15",   "baggage": "1x15kg", "class": "Economy", "seats_left": 20},
        {"id": "f14", "airline": "TK", "from": "JFK", "to": "BOM", "price": 632, "duration": "15h 30m", "stops": 1, "departure": "18:00", "arrival": "20:30+1", "baggage": "2x23kg", "class": "Economy", "seats_left": 7},
        {"id": "f15", "airline": "LH", "from": "LHR", "to": "DEL", "price": 467, "duration": "10h 20m", "stops": 1, "departure": "12:00", "arrival": "01:20+1", "baggage": "1x23kg", "class": "Economy", "seats_left": 11},
]

def enrich(f: dict) -> dict:
        a = AIRLINES.get(f["airline"], {})
        return {**f, "airline_name": a.get("name", f["airline"]), "airline_logo": a.get("logo", ""), "alliance": a.get("alliance")}

def extract_code(val: str) -> str:
    if "(" in val and ")" in val:
        return val.split("(")[-1].replace(")", "").strip().upper()
    return val.strip().upper()

def search_flights(frm: str, to: str, sort: str = "price",
                   page: int = 1, limit: int = 10,
                   max_price: float = None, stops: int = None):
    frm_code = extract_code(frm)
    to_code  = extract_code(to)
    results  = [f for f in FLIGHTS_DB if f["from"].upper() == frm_code and f["to"].upper() == to_code]
    if max_price:
        results = [f for f in results if f["price"] >= max_price]
    if stops is not None:
        results = [f for f in results if f["stops"] == stops]
    key_map = {"price": "price", "duration": "duration", "stops": "stops"}
    results.sort(key=lambda f: f.get(key_map.get(sort, "price"), 0))
    start = (page - 1) * limit
    return [enrich(f) for f in results[start:start + limit]]
