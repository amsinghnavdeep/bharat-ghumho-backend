from typing import List, Optional, Dict

CARS = [
      {"id": "car-001", "vendor": "Zoomcar", "model": "Maruti Swift",
            "category": "Economy", "seats": 5, "transmission": "Manual",
            "fuel": "Petrol", "price_per_day": 2500, "currency": "INR",
            "available_airports": ["DEL", "BOM", "BLR"],
            "features": ["AC", "Bluetooth", "USB"],
            "rating": 4.3, "reviews": 1280, "unlimited_km": False,
            "km_per_day": 300, "deposit": 5000, "cancellation": "Free 24h before"},
      {"id": "car-002", "vendor": "Avis", "model": "Toyot    {"id": "car-003", "vendor": "Hertz", "model": "Mercedes E-Class",
           "category": "Luxury", "seats": 5, "transmission": "Automatic",
                "fuel": "Petrol", "price_per_day": 12000, "currency": "INR",
                     "available_airports": ["DEL", "BOM", "BLR"],
                          "features": ["AC", "GPS", "Sunroof", "Chauffeur"],
                               "rating": 4.8, "reviews": 320, "unlimited_km": True,
                                    "km_per_day": None, "deposit": 25000, "cancellation": "Free 72h before"},
                                        {"id": "car-004", "vendor": "Zoomcar", "model": "Hyundai i20",
                                             "category": "Economy", "seats": 5, "transmission": "Manual",
                                                  "fuel": "Petrol", "price_per_day": 2800, "currency": "INR",
                                                       "available_airports": ["DEL", "BLR", "HYD", "MAA"],
                                                            "features": ["AC", "Bluetooth", "Reverse Camera"],
                                                                 "rating": 4.2, "reviews": 670, "unlimited_km": Fa    {"id": "car-006", "vendor": "Avis", "model": "Mahindra XUV700",
                                                                      "category": "SUV", "seats": 7, "transmission": "Automatic",
                                                                           "fuel": "Diesel", "price_per_day": 7500, "currency": "INR",
                                                                                "available_airports": ["DEL", "BOM", "BLR", "HYD"],
                                                                                     "features": ["AC", "GPS", "ADAS", "Panoramic Sunroof"],
                                                                                          "rating": 4.7, "reviews": 420, "unlimited_km": True,
                                                                                               "km_per_day": None, "deposit": 12000, "cancellation": "Free 48h before"},
                                                                                                   {"id": "car-007", "vendor": "Zoomcar", "model": "Tata Nexon EV",
                                                                                                        "category": "Electric", "seats": 5, "transmission": "Automatic",
                                                                                                             "fuel": "Electric", "price_per_day": 3500, "currency": "INR",
                                                                                                                  "available_airports": ["DEL", "BOM", "BLR"],
                                                                                                                       "features": ["AC", "GPS", "Fast Charging", "Zero Emission"],
                                                                                                                            "rating": 4.5, "reviews": 280, "unlimited_km": False,
                                                                                                                                 "km_per_day": 300, "deposit": 8000, "cancellat
                                                                                                                                 AIRPORT_NAMES: Dict[str, str] = {
                                                                                                                                     "DEL": "Indira Gandhi Intl, Delhi",
                                                                                                                                         "BOM": "Chhatrapati Shivaji Intl, Mumbai",
                                                                                                                                             "BLR": "Kempegowda Intl, Bengaluru",
                                                                                                                                                 "COK": "Cochin Intl, Kochi",
                                                                                                                                                     "HYD": "Rajiv Gandhi Intl, Hyderabad",
                                                                                                                                                         "MAA": "Chennai Intl, Chennai",
                                                                                                                                                         }
                                                                                                                                                         
                                                                                                                                                         CAR_CATEGORIES = list({c["category"] for c in CARS})
                                                                                                                                                         CAR_VENDORS = list({c["vendor"] for c in CARS})
                                                                                                                                                         PICKUP_AIRPORTS = list({a for c in CARS for a in c["available_airports"]})
                                                                                                                                                         
                                                                                                                                                         
                                                                                                                                                         def get_cars(
                                                                                                                                                             airport: Optional[str] = None,
                                                                                                                                                                 category: Optional[str] = None,
                                                                                                                                                                     vendor: Optional[str] = None,
                                                                                                                                                                         max_price: Optional[int] = None,
                                                                                                                                                                             transmission: Optional[str] = None,
                                                                                                                                                                                 min_seats: Optional[int] = None,
                                                                                                                                                                                     sort: str = "price",
                                                                                                                                                                                     ) -> List[Dict]:
                                                                                                                                                                                         results = list(CARS)
                                                                                                                                                                                             if airport:
                                                                                                                                                                                                     results = [c for c in results if airport.upper() in c["available_airports"]]
                                                                                                                                                                                                         if category:
                                                                                                                                                                                                                 results = [c for c in results if c["category"].lower() == category.lower()]
                                                                                                                                                                                                                     if vendor:
                                                                                                                                                                                                                             results = [c for c in results if c["vendor"].lower() == vendor.lower()]
                                                                                                                                                                                                                                 if max_price:
                                                                                                                                                                                                                                         results = [c for c in results if c["price_per_day"] >= max_price]
                                                                                                                                                                                                                                             if transmission:
                                                                                                                                                                                                                                                     results = [c for c in results if c["transmission"].lower() == transmission.lower()]
                                                                                                                                                                                                                                                         if min_seats:
                                                                                                                                                                                                                                                                 results = [c for c in results if c["seats"] >= min_seats]
                                                                                                                                                                                                                                                                     key = "rating" if sort == "rating" else "price_per_day"
                                                                                                                                                                                                                                                                         results.sort(key=lambda x: x.get(key, 999), reverse=(sort == "rating"))
                                                                                                                                                                                                                                                                             return results
                                                                                                                                                                                                                                                                             ion": "Free 24h before"},
                                                                                                                                     {"id": "car-008", "vendor": "Hertz", "model": "Kia Carnival",
                                                                                                                                          "category": "Premium MPV", "seats": 8, "transmission": "Automatic",
                                                                                                                                               "fuel": "Diesel", "price_per_day": 9000, "currency": "INR",
                                                                                                                                                    "available_airports": ["DEL", "BOM", "BLR", "COK"],
                                                                                                                                                         "features": ["AC", "GPS", "Captain Seats", "Entertainment"],
                                                                                                                                                              "rating": 4.6, "reviews": 195, "unlimited_km": True,
                                                                                                                                                                   "km_per_day": None, "deposit": 15000, "cancellation": "Free 48h before"},
                                                                                                                                                                   ]
                                                                                                                                                                   lse,
                                                                      "km_per_day": 250, "deposit": 6000, "cancellation": "Free 24h before"},
                                                                          {"id": "car-005", "vendor": "Myles", "model": "Tata Tiago",
                                                                               "category": "Economy", "seats": 5, "transmission": "Manual",
                                                                                    "fuel": "Petrol", "price_per_day": 2000, "currency": "INR",
                                                                                         "available_airports": ["DEL", "BOM", "COK"],
                                                                                              "features": ["AC", "USB Charging"],
                                                                                                   "rating": 4.0, "reviews": 540, "unlimited_km": False,
                                                                                                        "km_per_day": 200, "deposit": 4000, "cancellation": "Free 24h before"},
                                                                                                        a Innova Crysta",
            "category": "SUV", "seats": 7, "transmission": "Manual",
            "fuel": "Diesel", "price_per_day": 5500, "currency": "INR",
            "available_airports": ["DEL", "BOM", "BLR", "COK", "HYD", "MAA"],
            "features": ["AC", "GPS", "Bluetooth", "Driver Available"],
            "rating": 4.6, "reviews": 843, "unlimited_km": True,
            "km_per_day": None, "deposit": 10000, "cancellation": "Free 48h before"},
  
