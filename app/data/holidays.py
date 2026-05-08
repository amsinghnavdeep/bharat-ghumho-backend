PACKAGES = [
    {
        "id": "PKG-001", "name": "Golden Triangle", "theme": "heritage",
        "days": 7, "nights": 6, "cities": ["DEL", "AGR", "JAI"],
        "price_per_person": 850, "currency": "USD",
        "includes": ["flights", "hotels", "transfers", "guide"],
        "highlights": ["Taj Mahal at sunrise", "Amber Fort", "Red Fort", "Hawa Mahal"],
        "rating": 4.7, "reviews_count": 340,
        "image": "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200",
        "description": "Iconic Delhi - Agra - Jaipur loop covering India's three most photogenic heritage cities.",
        "itinerary": [
            {"day": 1, "city": "Delhi", "title": "Arrival in Delhi", "activities": ["Airport pickup", "Hotel check-in", "Welcome dinner"]},
            {"day": 2, "city": "Delhi", "title": "Old & New Delhi tour", "activities": ["Red Fort", "Jama Masjid", "Qutub Minar", "India Gate"]},
            {"day": 3, "city": "Agra", "title": "Drive to Agra", "activities": ["Taj Mahal at sunset", "Agra Fort"]},
            {"day": 4, "city": "Agra", "title": "Taj at sunrise", "activities": ["Sunrise Taj Mahal", "Itimad-ud-Daulah", "Drive to Jaipur"]},
            {"day": 5, "city": "Jaipur", "title": "Pink City", "activities": ["Amber Fort elephant ride", "City Palace", "Hawa Mahal"]},
            {"day": 6, "city": "Jaipur", "title": "Local culture", "activities": ["Jal Mahal", "Bazaar shopping", "Folk dinner"]},
            {"day": 7, "city": "Delhi", "title": "Departure", "activities": ["Drive to Delhi", "Departure transfer"]}
        ]
    },
    {
        "id": "PKG-002", "name": "Kerala Backwaters", "theme": "nature",
        "days": 5, "nights": 4, "cities": ["COK", "MUN", "ALL"],
        "price_per_person": 620, "currency": "USD",
        "includes": ["houseboat", "hotels", "ayurveda", "transfers"],
        "highlights": ["Houseboat cruise", "Tea plantations", "Ayurveda spa", "Kathakali show"],
        "rating": 4.8, "reviews_count": 520,
        "image": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200",
        "description": "Glide through palm-fringed backwaters, sip estate tea in Munnar, and unwind with Ayurvedic therapies.",
        "itinerary": [
            {"day": 1, "city": "Kochi", "title": "Arrival in Kochi", "activities": ["Fort Kochi walk", "Chinese fishing nets", "Kathakali show"]},
            {"day": 2, "city": "Munnar", "title": "Hill country", "activities": ["Tea plantation tour", "Eravikulam National Park"]},
            {"day": 3, "city": "Munnar", "title": "Spice trails", "activities": ["Spice plantation", "Mattupetty Dam"]},
            {"day": 4, "city": "Alleppey", "title": "Houseboat", "activities": ["Houseboat boarding", "Backwater cruise", "Onboard meals"]},
            {"day": 5, "city": "Kochi", "title": "Departure", "activities": ["Drive to Kochi", "Departure transfer"]}
        ]
    },
    {
        "id": "PKG-003", "name": "Goa Beach Escape", "theme": "beach",
        "days": 4, "nights": 3, "cities": ["GOI"],
        "price_per_person": 380, "currency": "USD",
        "includes": ["hotel", "water sports", "nightlife tour"],
        "highlights": ["Baga Beach", "Old Goa churches", "Dudhsagar Falls", "Sunset cruise"],
        "rating": 4.5, "reviews_count": 890,
        "image": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200",
        "description": "Sun-kissed beaches, Portuguese churches, sizzling seafood and dance-floor nights.",
        "itinerary": [
            {"day": 1, "city": "North Goa", "title": "Beach arrival", "activities": ["Hotel check-in", "Baga Beach", "Tito's nightlife"]},
            {"day": 2, "city": "North Goa", "title": "Water sports", "activities": ["Parasailing", "Jet ski", "Anjuna flea market"]},
            {"day": 3, "city": "South Goa", "title": "Heritage & nature", "activities": ["Old Goa churches", "Dudhsagar Falls trek"]},
            {"day": 4, "city": "Goa", "title": "Departure", "activities": ["Sunset cruise (optional)", "Departure transfer"]}
        ]
    },
    {
        "id": "PKG-004", "name": "Rajasthan Heritage", "theme": "heritage",
        "days": 9, "nights": 8, "cities": ["JAI", "JDH", "UDR"],
        "price_per_person": 1180, "currency": "USD",
        "includes": ["heritage hotels", "flights", "private car", "guide"],
        "highlights": ["Mehrangarh Fort", "Lake Pichola", "Desert safari", "Folk performance"],
        "rating": 4.9, "reviews_count": 415,
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200",
        "description": "Live like royalty across Jaipur, Jodhpur and Udaipur with heritage palace stays.",
        "itinerary": [
            {"day": 1, "city": "Jaipur", "title": "Pink City arrival", "activities": ["Hotel check-in", "City walk"]},
            {"day": 2, "city": "Jaipur", "title": "Forts & palaces", "activities": ["Amber Fort", "City Palace", "Jantar Mantar"]},
            {"day": 3, "city": "Jodhpur", "title": "Blue City", "activities": ["Mehrangarh Fort", "Jaswant Thada"]},
            {"day": 4, "city": "Jodhpur", "title": "Desert experience", "activities": ["Bishnoi village safari", "Camel ride"]},
            {"day": 5, "city": "Udaipur", "title": "Lake City", "activities": ["Drive via Ranakpur Jain temples"]},
            {"day": 6, "city": "Udaipur", "title": "Romance of Udaipur", "activities": ["City Palace", "Lake Pichola boat ride"]},
            {"day": 7, "city": "Udaipur", "title": "Crafts & cuisine", "activities": ["Shilpgram", "Cooking class"]},
            {"day": 8, "city": "Udaipur", "title": "Leisure day", "activities": ["Spa", "Sunset Sajjangarh"]},
            {"day": 9, "city": "Udaipur", "title": "Departure", "activities": ["Departure transfer"]}
        ]
    },
    {
        "id": "PKG-005", "name": "Himalayan Adventure", "theme": "adventure",
        "days": 10, "nights": 9, "cities": ["DEL", "MAN", "LEH"],
        "price_per_person": 1450, "currency": "USD",
        "includes": ["flights", "permits", "camping", "transfers"],
        "highlights": ["Rohtang Pass", "Pangong Lake", "Khardung La", "River rafting"],
        "rating": 4.7, "reviews_count": 220,
        "image": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200",
        "description": "High passes, snowy peaks, monasteries and turquoise lakes - the ultimate Himalayan road trip.",
        "itinerary": [
            {"day": 1, "city": "Delhi", "title": "Arrival", "activities": ["Hotel check-in"]},
            {"day": 2, "city": "Manali", "title": "Hill country", "activities": ["Drive to Manali", "Mall Road"]},
            {"day": 3, "city": "Manali", "title": "Solang & Rohtang", "activities": ["Solang Valley", "Rohtang Pass"]},
            {"day": 4, "city": "Leh", "title": "Fly to Leh", "activities": ["Acclimatisation"]},
            {"day": 5, "city": "Leh", "title": "Local sightseeing", "activities": ["Shanti Stupa", "Leh Palace"]},
            {"day": 6, "city": "Pangong", "title": "Pangong Lake", "activities": ["Drive via Chang La", "Lakeside camp"]},
            {"day": 7, "city": "Nubra", "title": "Nubra Valley", "activities": ["Khardung La", "Diskit Monastery"]},
            {"day": 8, "city": "Leh", "title": "Return drive", "activities": ["Hunder dunes", "Drive back to Leh"]},
            {"day": 9, "city": "Leh", "title": "Rafting", "activities": ["River rafting on Zanskar"]},
            {"day": 10, "city": "Delhi", "title": "Departure", "activities": ["Fly to Delhi", "Departure"]}
        ]
    },
    {
        "id": "PKG-006", "name": "Andaman Islands", "theme": "beach",
        "days": 6, "nights": 5, "cities": ["IXZ", "HVL", "NEI"],
        "price_per_person": 980, "currency": "USD",
        "includes": ["flights", "hotels", "ferry", "scuba"],
        "highlights": ["Radhanagar Beach", "Scuba diving", "Cellular Jail", "Snorkeling"],
        "rating": 4.8, "reviews_count": 365,
        "image": "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200",
        "description": "Crystal turquoise waters, white sand beaches and world-class scuba diving.",
        "itinerary": [
            {"day": 1, "city": "Port Blair", "title": "Arrival", "activities": ["Cellular Jail light & sound"]},
            {"day": 2, "city": "Havelock", "title": "Ferry to Havelock", "activities": ["Radhanagar Beach"]},
            {"day": 3, "city": "Havelock", "title": "Scuba day", "activities": ["Beginner scuba", "Elephant Beach snorkel"]},
            {"day": 4, "city": "Neil", "title": "Neil Island", "activities": ["Bharatpur Beach", "Natural Bridge"]},
            {"day": 5, "city": "Port Blair", "title": "Return", "activities": ["Ferry to Port Blair", "Corbyn's Cove"]},
            {"day": 6, "city": "Port Blair", "title": "Departure", "activities": ["Departure transfer"]}
        ]
    },
    {
        "id": "PKG-007", "name": "Varanasi Spiritual", "theme": "spiritual",
        "days": 4, "nights": 3, "cities": ["VNS"],
        "price_per_person": 420, "currency": "USD",
        "includes": ["hotel", "boat ride", "guide"],
        "highlights": ["Ganga Aarti", "Sunrise boat ride", "Sarnath", "Old city walk"],
        "rating": 4.6, "reviews_count": 285,
        "image": "https://images.unsplash.com/photo-1561361398-a1f8b8a7d9ad?w=1200",
        "description": "The world's oldest living city - soak in ghats, prayers and Buddhist heritage in Sarnath.",
        "itinerary": [
            {"day": 1, "city": "Varanasi", "title": "Arrival", "activities": ["Evening Ganga Aarti at Dashashwamedh ghat"]},
            {"day": 2, "city": "Varanasi", "title": "Ghats & temples", "activities": ["Sunrise boat ride", "Kashi Vishwanath", "Old city walk"]},
            {"day": 3, "city": "Sarnath", "title": "Buddhist heritage", "activities": ["Dhamek Stupa", "Sarnath Museum"]},
            {"day": 4, "city": "Varanasi", "title": "Departure", "activities": ["Departure transfer"]}
        ]
    },
    {
        "id": "PKG-008", "name": "Wildlife Safari", "theme": "wildlife",
        "days": 6, "nights": 5, "cities": ["JLR", "RNK", "BHU"],
        "price_per_person": 990, "currency": "USD",
        "includes": ["lodges", "jeep safaris", "park fees"],
        "highlights": ["Bengal tiger sightings", "Bird watching", "Bandhavgarh", "Ranthambore"],
        "rating": 4.7, "reviews_count": 195,
        "image": "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200",
        "description": "Track Bengal tigers and a kaleidoscope of birds across India's premier national parks.",
        "itinerary": [
            {"day": 1, "city": "Jabalpur", "title": "Arrival", "activities": ["Drive to Bandhavgarh"]},
            {"day": 2, "city": "Bandhavgarh", "title": "Morning safari", "activities": ["Jeep safari", "Tribal village walk"]},
            {"day": 3, "city": "Bandhavgarh", "title": "Twin safaris", "activities": ["Morning & evening jeep"]},
            {"day": 4, "city": "Ranthambore", "title": "Drive & safari", "activities": ["Train to Sawai Madhopur", "Evening safari"]},
            {"day": 5, "city": "Ranthambore", "title": "Tiger trail", "activities": ["Twin jeep safaris"]},
            {"day": 6, "city": "Jaipur", "title": "Departure", "activities": ["Drive to Jaipur airport"]}
        ]
    },
    {
        "id": "PKG-009", "name": "Northeast Discovery", "theme": "nature",
        "days": 8, "nights": 7, "cities": ["GAU", "SHL", "KZR"],
        "price_per_person": 1080, "currency": "USD",
        "includes": ["hotels", "transfers", "park fees"],
        "highlights": ["Kaziranga rhino safari", "Living root bridges", "Cherrapunji falls"],
        "rating": 4.8, "reviews_count": 138,
        "image": "https://images.unsplash.com/photo-1606117331085-5760e3b58520?w=1200",
        "description": "Rolling green hills, one-horned rhinos and the world's wettest place - explore the Seven Sisters.",
        "itinerary": [
            {"day": 1, "city": "Guwahati", "title": "Arrival", "activities": ["Kamakhya temple"]},
            {"day": 2, "city": "Shillong", "title": "Drive to Shillong", "activities": ["Umiam Lake", "Local market"]},
            {"day": 3, "city": "Cherrapunji", "title": "Living root bridges", "activities": ["Nohkalikai Falls", "Mawsmai Cave"]},
            {"day": 4, "city": "Mawlynnong", "title": "Cleanest village", "activities": ["Sky walk", "Living root bridge"]},
            {"day": 5, "city": "Kaziranga", "title": "Drive to Kaziranga", "activities": ["Evening tea estate visit"]},
            {"day": 6, "city": "Kaziranga", "title": "Rhino safari", "activities": ["Elephant safari", "Jeep safari"]},
            {"day": 7, "city": "Kaziranga", "title": "Western range", "activities": ["Morning safari"]},
            {"day": 8, "city": "Guwahati", "title": "Departure", "activities": ["Drive to airport"]}
        ]
    },
    {
        "id": "PKG-010", "name": "South India Temples", "theme": "spiritual",
        "days": 7, "nights": 6, "cities": ["MAA", "MDU", "TRZ", "TNJ"],
        "price_per_person": 720, "currency": "USD",
        "includes": ["hotels", "AC car", "guide"],
        "highlights": ["Meenakshi Temple", "Brihadeeswarar", "Rock fort", "Mahabalipuram"],
        "rating": 4.6, "reviews_count": 175,
        "image": "https://images.unsplash.com/photo-1606298855672-3efb63017be8?w=1200",
        "description": "Tower-temples (gopurams), bronze sculptures and Carnatic culture across Tamil Nadu.",
        "itinerary": [
            {"day": 1, "city": "Chennai", "title": "Arrival", "activities": ["Marina Beach", "Kapaleeshwarar"]},
            {"day": 2, "city": "Mahabalipuram", "title": "UNESCO heritage", "activities": ["Shore Temple", "Five Rathas"]},
            {"day": 3, "city": "Tanjore", "title": "Drive to Tanjore", "activities": ["Brihadeeswarar Temple"]},
            {"day": 4, "city": "Trichy", "title": "Rock fort", "activities": ["Rock Fort Temple", "Sri Ranganathaswamy"]},
            {"day": 5, "city": "Madurai", "title": "Meenakshi", "activities": ["Meenakshi Amman Temple"]},
            {"day": 6, "city": "Madurai", "title": "Local culture", "activities": ["Thirumalai Nayakkar Mahal", "Bazaar"]},
            {"day": 7, "city": "Chennai", "title": "Departure", "activities": ["Drive to airport"]}
        ]
    }
]


def search_packages(theme: str | None = None, max_budget: float | None = None,
                    days: int | None = None, q: str | None = None, sort: str = "popular"):
    results = list(PACKAGES)
    if theme and theme != "all":
        results = [p for p in results if p["theme"] == theme.lower()]
    if max_budget is not None:
        results = [p for p in results if p["price_per_person"] <= max_budget]
    if days is not None:
        results = [p for p in results if p["days"] <= days + 1]
    if q:
        ql = q.lower()
        results = [p for p in results if ql in p["name"].lower() or ql in p["description"].lower()
                   or any(ql in c.lower() for c in p["cities"])]
    if sort == "price-low":
        results.sort(key=lambda p: p["price_per_person"])
    elif sort == "price-high":
        results.sort(key=lambda p: -p["price_per_person"])
    elif sort == "rating":
        results.sort(key=lambda p: -p["rating"])
    else:
        results.sort(key=lambda p: -p["reviews_count"])
    return results
