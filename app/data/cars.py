CARS = [
    {"id": "CAR-001", "name": "Maruti Swift", "type": "hatchback", "city": "New Delhi", "code": "DEL",
     "price_per_day": 25, "currency": "USD", "seats": 5, "transmission": "manual",
     "fuel": "petrol", "ac": True, "provider": "Zoomcar", "rating": 4.2,
     "image": "https://images.unsplash.com/photo-1549924231-f129b911e442?w=800"},
    {"id": "CAR-002", "name": "Honda City", "type": "sedan", "city": "New Delhi", "code": "DEL",
     "price_per_day": 45, "currency": "USD", "seats": 5, "transmission": "automatic",
     "fuel": "petrol", "ac": True, "provider": "Revv", "rating": 4.5,
     "image": "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?w=800"},
    {"id": "CAR-003", "name": "Toyota Innova Crysta", "type": "suv", "city": "New Delhi", "code": "DEL",
     "price_per_day": 65, "currency": "USD", "seats": 7, "transmission": "automatic",
     "fuel": "diesel", "ac": True, "provider": "Zoomcar", "rating": 4.7,
     "image": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800"},
    {"id": "CAR-004", "name": "Mercedes E-Class", "type": "luxury", "city": "New Delhi", "code": "DEL",
     "price_per_day": 165, "currency": "USD", "seats": 5, "transmission": "automatic",
     "fuel": "petrol", "ac": True, "provider": "Avis", "rating": 4.9,
     "image": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800"},
    {"id": "CAR-005", "name": "Hyundai Creta", "type": "suv", "city": "Mumbai", "code": "BOM",
     "price_per_day": 50, "currency": "USD", "seats": 5, "transmission": "automatic",
     "fuel": "petrol", "ac": True, "provider": "MyChoize", "rating": 4.4,
     "image": "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800"},
    {"id": "CAR-006", "name": "Tata Nexon", "type": "suv", "city": "Mumbai", "code": "BOM",
     "price_per_day": 38, "currency": "USD", "seats": 5, "transmission": "manual",
     "fuel": "diesel", "ac": True, "provider": "Zoomcar", "rating": 4.1,
     "image": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800"},
    {"id": "CAR-007", "name": "Maruti Ertiga", "type": "suv", "city": "Mumbai", "code": "BOM",
     "price_per_day": 42, "currency": "USD", "seats": 7, "transmission": "manual",
     "fuel": "petrol", "ac": True, "provider": "Revv", "rating": 4.0,
     "image": "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800"},
    {"id": "CAR-008", "name": "Volkswagen Polo", "type": "hatchback", "city": "Goa", "code": "GOI",
     "price_per_day": 30, "currency": "USD", "seats": 5, "transmission": "manual",
     "fuel": "petrol", "ac": True, "provider": "Zoomcar", "rating": 4.3,
     "image": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800"},
    {"id": "CAR-009", "name": "Mahindra Thar", "type": "suv", "city": "Goa", "code": "GOI",
     "price_per_day": 80, "currency": "USD", "seats": 4, "transmission": "manual",
     "fuel": "diesel", "ac": True, "provider": "Drivezy", "rating": 4.6,
     "image": "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800"},
    {"id": "CAR-010", "name": "Honda Activa", "type": "scooter", "city": "Goa", "code": "GOI",
     "price_per_day": 8, "currency": "USD", "seats": 2, "transmission": "automatic",
     "fuel": "petrol", "ac": False, "provider": "Royal Brothers", "rating": 4.4,
     "image": "https://images.unsplash.com/photo-1568772585407-3ba8c2fd0f0e?w=800"},
    {"id": "CAR-011", "name": "Toyota Camry", "type": "sedan", "city": "Bangalore", "code": "BLR",
     "price_per_day": 70, "currency": "USD", "seats": 5, "transmission": "automatic",
     "fuel": "hybrid", "ac": True, "provider": "Hertz", "rating": 4.7,
     "image": "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800"},
    {"id": "CAR-012", "name": "Kia Seltos", "type": "suv", "city": "Bangalore", "code": "BLR",
     "price_per_day": 55, "currency": "USD", "seats": 5, "transmission": "automatic",
     "fuel": "petrol", "ac": True, "provider": "Zoomcar", "rating": 4.5,
     "image": "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800"},
    {"id": "CAR-013", "name": "Maruti Baleno", "type": "hatchback", "city": "Bangalore", "code": "BLR",
     "price_per_day": 28, "currency": "USD", "seats": 5, "transmission": "manual",
     "fuel": "petrol", "ac": True, "provider": "Revv", "rating": 4.0,
     "image": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800"},
    {"id": "CAR-014", "name": "Tempo Traveller", "type": "van", "city": "Kochi", "code": "COK",
     "price_per_day": 95, "currency": "USD", "seats": 12, "transmission": "manual",
     "fuel": "diesel", "ac": True, "provider": "Local Operator", "rating": 4.2,
     "image": "https://images.unsplash.com/photo-1597907885317-31d3935e9c0e?w=800"},
    {"id": "CAR-015", "name": "Innova Toyota", "type": "suv", "city": "Kochi", "code": "COK",
     "price_per_day": 60, "currency": "USD", "seats": 7, "transmission": "manual",
     "fuel": "diesel", "ac": True, "provider": "Zoomcar", "rating": 4.5,
     "image": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800"},
    {"id": "CAR-016", "name": "BMW 5 Series", "type": "luxury", "city": "Hyderabad", "code": "HYD",
     "price_per_day": 180, "currency": "USD", "seats": 5, "transmission": "automatic",
     "fuel": "petrol", "ac": True, "provider": "Avis", "rating": 4.8,
     "image": "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800"},
    {"id": "CAR-017", "name": "Hyundai i20", "type": "hatchback", "city": "Hyderabad", "code": "HYD",
     "price_per_day": 27, "currency": "USD", "seats": 5, "transmission": "manual",
     "fuel": "petrol", "ac": True, "provider": "Zoomcar", "rating": 4.1,
     "image": "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800"},
    {"id": "CAR-018", "name": "Mahindra Bolero", "type": "suv", "city": "Chennai", "code": "MAA",
     "price_per_day": 40, "currency": "USD", "seats": 7, "transmission": "manual",
     "fuel": "diesel", "ac": True, "provider": "Drivezy", "rating": 3.9,
     "image": "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800"},
    {"id": "CAR-019", "name": "Ford EcoSport", "type": "suv", "city": "Chennai", "code": "MAA",
     "price_per_day": 45, "currency": "USD", "seats": 5, "transmission": "automatic",
     "fuel": "petrol", "ac": True, "provider": "Revv", "rating": 4.3,
     "image": "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800"},
    {"id": "CAR-020", "name": "Audi Q5", "type": "luxury", "city": "Chennai", "code": "MAA",
     "price_per_day": 195, "currency": "USD", "seats": 5, "transmission": "automatic",
     "fuel": "petrol", "ac": True, "provider": "Hertz", "rating": 4.9,
     "image": "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800"},
]


CITY_NAMES = {
    "DEL": "New Delhi", "BOM": "Mumbai", "GOI": "Goa", "BLR": "Bangalore",
    "COK": "Kochi", "HYD": "Hyderabad", "MAA": "Chennai",
}


def search_cars(city: str | None = None, code: str | None = None, type_: str | None = None,
                max_price: float | None = None, sort: str = "price"):
    results = list(CARS)
    if city:
        results = [c for c in results if city.lower() in c["city"].lower()]
    if code:
        results = [c for c in results if c["code"] == code.upper()]
    if type_:
        results = [c for c in results if c["type"].lower() == type_.lower()]
    if max_price is not None:
        results = [c for c in results if c["price_per_day"] <= max_price]
    key_map = {"price": "price_per_day", "rating": "rating", "seats": "seats"}
    reverse = sort == "rating"
    results.sort(key=lambda c: c.get(key_map.get(sort, "price_per_day"), 0), reverse=reverse)
    return results
