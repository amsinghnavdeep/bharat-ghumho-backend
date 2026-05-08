VISA_REQUIREMENTS = {
    "CA": {
        "country": "Canada", "visa_required": True, "type": "Tourist Visa (TRV)",
        "processing_days": "15-30", "fee": 185, "currency": "CAD", "validity_days": 180,
        "documents": [
            "Valid passport (min 6 months)", "Recent passport-size photos",
            "Bank statements (6 months)", "Travel itinerary",
            "Employment letter / proof of ties", "Cover letter"
        ],
        "e_visa": False, "biometrics": True,
        "notes": "Apply via VFS Global. Biometrics mandatory at one of the centres."
    },
    "US": {
        "country": "United States", "visa_required": True, "type": "B1/B2 Visitor Visa",
        "processing_days": "30-60", "fee": 185, "currency": "USD", "validity_days": 3650,
        "documents": [
            "DS-160 confirmation page", "Valid passport (min 6 months)",
            "Recent 51x51mm photo", "Bank statements (6 months)",
            "Interview at consulate", "Employment / income proof"
        ],
        "e_visa": False, "biometrics": True,
        "notes": "Personal interview at U.S. consulate required. 10-year multiple entry possible."
    },
    "GB": {
        "country": "United Kingdom", "visa_required": True, "type": "Standard Visitor Visa",
        "processing_days": "15-21", "fee": 100, "currency": "GBP", "validity_days": 180,
        "documents": [
            "Valid passport", "Recent photos", "Bank statements (6 months)",
            "Accommodation proof", "Travel itinerary", "Employment letter"
        ],
        "e_visa": False, "biometrics": True,
        "notes": "Apply via VFS Global. Faster Priority service available for an extra fee."
    },
    "AE": {
        "country": "United Arab Emirates", "visa_required": True, "type": "Tourist e-Visa",
        "processing_days": "3-5", "fee": 90, "currency": "USD", "validity_days": 30,
        "documents": ["Valid passport", "Photo", "Confirmed return ticket", "Hotel booking"],
        "e_visa": True, "biometrics": False,
        "notes": "Quick e-visa via airline (Emirates / Etihad) or visa portals. 14/30/60 day options."
    },
    "SG": {
        "country": "Singapore", "visa_required": True, "type": "Tourist Visa",
        "processing_days": "3-5", "fee": 30, "currency": "SGD", "validity_days": 30,
        "documents": [
            "Valid passport", "Photo", "Bank statements", "Travel itinerary",
            "Employment letter", "Form 14A"
        ],
        "e_visa": True, "biometrics": False,
        "notes": "Apply via authorised travel agent or via SAVE portal."
    },
    "TH": {
        "country": "Thailand", "visa_required": False, "type": "Visa Exempt (60 days)",
        "processing_days": "0", "fee": 0, "currency": "THB", "validity_days": 60,
        "documents": ["Valid passport", "Return ticket", "Hotel booking"],
        "e_visa": True, "biometrics": False,
        "notes": "From Nov 2023, Indians get 60-day visa-free entry. Verify policy before travel."
    },
    "MY": {
        "country": "Malaysia", "visa_required": False, "type": "Visa Exempt (30 days)",
        "processing_days": "0", "fee": 0, "currency": "MYR", "validity_days": 30,
        "documents": ["Valid passport", "Return ticket", "Hotel booking"],
        "e_visa": True, "biometrics": False,
        "notes": "Visa-free for Indian passport holders (30 days)."
    },
    "ID": {
        "country": "Indonesia", "visa_required": True, "type": "Visa on Arrival",
        "processing_days": "0", "fee": 35, "currency": "USD", "validity_days": 30,
        "documents": ["Valid passport (min 6 months)", "Return ticket", "Hotel booking"],
        "e_visa": True, "biometrics": False,
        "notes": "Visa on arrival fee is approx. IDR 500,000."
    },
    "VN": {
        "country": "Vietnam", "visa_required": True, "type": "e-Visa",
        "processing_days": "3-5", "fee": 25, "currency": "USD", "validity_days": 30,
        "documents": ["Valid passport scan", "Photo", "Travel dates", "Entry/exit port"],
        "e_visa": True, "biometrics": False,
        "notes": "Apply directly via official Vietnam e-Visa portal."
    },
    "JP": {
        "country": "Japan", "visa_required": True, "type": "Tourist Visa",
        "processing_days": "5-7", "fee": 0, "currency": "INR", "validity_days": 90,
        "documents": [
            "Valid passport", "Photos", "Visa application form",
            "Bank statements", "Travel itinerary", "Employment certificate"
        ],
        "e_visa": False, "biometrics": False,
        "notes": "Apply via VFS Global Japan. Visa fee waived for Indian nationals."
    },
    "AU": {
        "country": "Australia", "visa_required": True, "type": "Subclass 600 Tourist",
        "processing_days": "20-40", "fee": 190, "currency": "AUD", "validity_days": 90,
        "documents": [
            "Valid passport", "Photos", "Bank statements (6 months)",
            "Travel itinerary", "Employment letter", "Travel insurance"
        ],
        "e_visa": True, "biometrics": True,
        "notes": "Online application via ImmiAccount. Multi-entry options available."
    },
    "FR": {
        "country": "France (Schengen)", "visa_required": True, "type": "Schengen C Visa",
        "processing_days": "15", "fee": 80, "currency": "EUR", "validity_days": 90,
        "documents": [
            "Valid passport", "Photos", "Confirmed flight & hotel bookings",
            "Travel insurance (>=30k EUR cover)", "Bank statements", "Cover letter"
        ],
        "e_visa": False, "biometrics": True,
        "notes": "Schengen visa allows travel across 27 European countries."
    },
    "DE": {
        "country": "Germany (Schengen)", "visa_required": True, "type": "Schengen C Visa",
        "processing_days": "15", "fee": 80, "currency": "EUR", "validity_days": 90,
        "documents": [
            "Valid passport", "Photos", "Confirmed bookings",
            "Travel insurance", "Bank statements", "Cover letter"
        ],
        "e_visa": False, "biometrics": True,
        "notes": "Apply via VFS Global Germany."
    },
    "NL": {
        "country": "Netherlands (Schengen)", "visa_required": True, "type": "Schengen C Visa",
        "processing_days": "15", "fee": 80, "currency": "EUR", "validity_days": 90,
        "documents": [
            "Valid passport", "Photos", "Confirmed bookings",
            "Travel insurance", "Bank statements", "Cover letter"
        ],
        "e_visa": False, "biometrics": True,
        "notes": "Schengen visa via VFS Global Netherlands."
    },
    "TR": {
        "country": "Turkey", "visa_required": True, "type": "Sticker / e-Visa",
        "processing_days": "5-7", "fee": 50, "currency": "USD", "validity_days": 30,
        "documents": ["Valid passport", "Photos", "Travel insurance"],
        "e_visa": True, "biometrics": False,
        "notes": "Indians with valid Schengen / US / UK visa are eligible for e-Visa; otherwise sticker visa."
    },
    "NZ": {
        "country": "New Zealand", "visa_required": True, "type": "Visitor Visa",
        "processing_days": "20-25", "fee": 246, "currency": "NZD", "validity_days": 90,
        "documents": [
            "Valid passport", "Photos", "Bank statements",
            "Employment letter", "Travel itinerary", "Insurance"
        ],
        "e_visa": True, "biometrics": True,
        "notes": "Apply online via Immigration NZ portal."
    },
    "MV": {
        "country": "Maldives", "visa_required": False, "type": "Visa on Arrival (30 days)",
        "processing_days": "0", "fee": 0, "currency": "USD", "validity_days": 30,
        "documents": ["Valid passport", "Return ticket", "Confirmed hotel"],
        "e_visa": False, "biometrics": False,
        "notes": "Free 30-day visa on arrival. IMUGA pre-arrival form required."
    },
    "LK": {
        "country": "Sri Lanka", "visa_required": False, "type": "Visa Free (30 days)",
        "processing_days": "0", "fee": 0, "currency": "USD", "validity_days": 30,
        "documents": ["Valid passport", "Return ticket", "Hotel booking"],
        "e_visa": True, "biometrics": False,
        "notes": "Visa-free pilot programme since 2024 - verify before travel."
    },
    "NP": {
        "country": "Nepal", "visa_required": False, "type": "Visa Free (Open border)",
        "processing_days": "0", "fee": 0, "currency": "NPR", "validity_days": 0,
        "documents": ["Valid Indian passport / Voter ID / Aadhaar"],
        "e_visa": False, "biometrics": False,
        "notes": "Indian citizens do not need a passport or visa to enter Nepal."
    },
    "BT": {
        "country": "Bhutan", "visa_required": True, "type": "Permit + SDF",
        "processing_days": "1-3", "fee": 1200, "currency": "INR", "validity_days": 30,
        "documents": ["Valid Indian passport", "Hotel booking", "SDF payment"],
        "e_visa": True, "biometrics": False,
        "notes": "Sustainable Development Fee applicable per day for Indian nationals."
    }
}


def all_countries():
    return [
        {"code": code, "country": v["country"],
         "visa_required": v["visa_required"], "e_visa": v["e_visa"],
         "type": v["type"], "fee": v["fee"], "currency": v["currency"]}
        for code, v in VISA_REQUIREMENTS.items()
    ]


def get_visa(destination_code: str):
    return VISA_REQUIREMENTS.get(destination_code.upper())
