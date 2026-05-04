AIRLINES = {
    "AI": {"name": "Air India", "code": "AI", "color": "#E23744", "alliance": "Star Alliance", "baggage": "2x23kg"},
    "BA": {"name": "British Airways", "code": "BA", "color": "#00256C", "alliance": "Oneworld", "baggage": "1x23kg"},
    "EK": {"name": "Emirates", "code": "EK", "color": "#C6A962", "alliance": "None", "baggage": "2x23kg"},
    "AC": {"name": "Air Canada", "code": "AC", "color": "#D81921", "alliance": "Star Alliance", "baggage": "2x23kg"},
    "QR": {"name": "Qatar Airways", "code": "QR", "color": "#5C0D34", "alliance": "Oneworld", "baggage": "2x30kg"},
    "LH": {"name": "Lufthansa", "code": "LH", "color": "#05164D", "alliance": "Star Alliance", "baggage": "1x23kg"},
    "SQ": {"name": "Singapore Airlines", "code": "SQ", "color": "#F5A623", "alliance": "Star Alliance", "baggage": "2x23kg"},
    "TK": {"name": "Turkish Airlines", "code": "TK", "color": "#C7202E", "alliance": "Star Alliance", "baggage": "2x23kg"},
    "6E": {"name": "IndiGo", "code": "6E", "color": "#3F51B5", "alliance": "None", "baggage": "1x15kg"},
    "UK": {"name": "Vistara", "code": "UK", "color": "#4A2366", "alliance": "None", "baggage": "1x25kg"},
}

FLIGHTS = [
    {"id":"BG-1001","ac":"AI","flight":"AI 302","aircraft":"Boeing 777-300ER","fr":"YYZ","to":"DEL","frCity":"Toronto","toCity":"New Delhi","dep":"21:45","arr":"22:05","arrD":"+1","dur":"14h 20m","durM":860,"stops":0,"stopC":[],"price":687,"cabin":"Economy","meals":True,"wifi":True},
    {"id":"BG-1002","ac":"BA","flight":"BA 036 / BA 143","aircraft":"Airbus A380","fr":"YYZ","to":"DEL","frCity":"Toronto","toCity":"New Delhi","dep":"19:30","arr":"23:15","arrD":"+1","dur":"17h 45m","durM":1065,"stops":1,"stopC":["LHR"],"price":612,"cabin":"Economy","meals":True,"wifi":True},
    {"id":"BG-1003","ac":"EK","flight":"EK 242 / EK 510","aircraft":"Boeing 777-200LR","fr":"YYZ","to":"DEL","frCity":"Toronto","toCity":"New Delhi","dep":"22:15","arr":"03:25","arrD":"+2","dur":"19h 10m","durM":1150,"stops":1,"stopC":["DXB"],"price":724,"cabin":"Economy","meals":True,"wifi":True},
    {"id":"BG-1004","ac":"AC","flight":"AC 042","aircraft":"Boeing 787-9","fr":"YYZ","to":"DEL","frCity":"Toronto","toCity":"New Delhi","dep":"20:30","arr":"21:10","arrD":"+1","dur":"14h 40m","durM":880,"stops":0,"stopC":[],"price":742,"cabin":"Economy","meals":True,"wifi":True},
    {"id":"BG-1005","ac":"LH","flight":"LH 471 / LH 760","aircraft":"Airbus A340-600","fr":"YYZ","to":"DEL","frCity":"Toronto","toCity":"New Delhi","dep":"17:00","arr":"18:30","arrD":"+1","dur":"18h 30m","durM":1110,"stops":1,"stopC":["FRA"],"price":598,"cabin":"Economy","meals":True,"wifi":False},
    {"id":"BG-2001","ac":"AI","flight":"AI 188","aircraft":"Boeing 777-300ER","fr":"YYZ","to":"BOM","frCity":"Toronto","toCity":"Mumbai","dep":"20:00","arr":"22:30","arrD":"+1","dur":"16h 30m","durM":990,"stops":0,"stopC":[],"price":715,"cabin":"Economy","meals":True,"wifi":True},
    {"id":"BG-2002","ac":"EK","flight":"EK 242 / EK 500","aircraft":"Airbus A380","fr":"YYZ","to":"BOM","frCity":"Toronto","toCity":"Mumbai","dep":"22:15","arr":"04:50","arrD":"+2","dur":"20h 35m","durM":1235,"stops":1,"stopC":["DXB"],"price":668,"cabin":"Economy","meals":True,"wifi":True},
    {"id":"BG-2003","ac":"QR","flight":"QR 764 / QR 556","aircraft":"Boeing 787-9","fr":"YYZ","to":"BOM","frCity":"Toronto","toCity":"Mumbai","dep":"21:30","arr":"05:20","arrD":"+2","dur":"21h 50m","durM":1310,"stops":1,"stopC":["DOH"],"price":635,"cabin":"Economy","meals":True,"wifi":True},
    {"id":"BG-3001","ac":"AI","flight":"AI 186","aircraft":"Boeing 777-200LR","fr":"YVR","to":"BOM","frCity":"Vancouver","toCity":"Mumbai","dep":"01:30","arr":"06:15","arrD":"+1","dur":"17h 45m","durM":1065,"stops":0,"stopC":[],"price":698,"cabin":"Economy","meals":True,"wifi":True},
    {"id":"BG-4001","ac":"AI","flight":"AI 176","aircraft":"Airbus A350-900","fr":"LHR","to":"BLR","frCity":"London","toCity":"Bangalore","dep":"20:30","arr":"10:50","arrD":"+1","dur":"10h 20m","durM":620,"stops":0,"stopC":[],"price":342,"cabin":"Economy","meals":True,"wifi":True},
    {"id":"BG-5001","ac":"EK","flight":"EK 532","aircraft":"Boeing 777-300ER","fr":"DXB","to":"COK","frCity":"Dubai","toCity":"Kochi","dep":"09:30","arr":"14:45","arrD":"","dur":"4h 15m","durM":255,"stops":0,"stopC":[],"price":245,"cabin":"Economy","meals":True,"wifi":True},
    {"id":"BG-6001","ac":"SQ","flight":"SQ 232 / SQ 752","aircraft":"Airbus A350-900","fr":"SYD","to":"HYD","frCity":"Sydney","toCity":"Hyderabad","dep":"09:00","arr":"22:30","arrD":"","dur":"16h 30m","durM":990,"stops":1,"stopC":["SIN"],"price":680,"cabin":"Economy","meals":True,"wifi":True},
    {"id":"BG-7001","ac":"SQ","flight":"SQ 528","aircraft":"Boeing 787-10","fr":"SIN","to":"MAA","frCity":"Singapore","toCity":"Chennai","dep":"08:15","arr":"09:45","arrD":"","dur":"4h 30m","durM":270,"stops":0,"stopC":[],"price":245,"cabin":"Economy","meals":True,"wifi":True},
    {"id":"BG-8001","ac":"6E","flight":"6E 2345","aircraft":"Airbus A320neo","fr":"DEL","to":"GOI","frCity":"New Delhi","toCity":"Goa","dep":"06:15","arr":"08:50","arrD":"","dur":"2h 35m","durM":155,"stops":0,"stopC":[],"price":82,"cabin":"Economy","meals":False,"wifi":False},
    {"id":"BG-8002","ac":"UK","flight":"UK 864","aircraft":"Boeing 737-800","fr":"GOI","to":"BOM","frCity":"Goa","toCity":"Mumbai","dep":"14:00","arr":"15:15","arrD":"","dur":"1h 15m","durM":75,"stops":0,"stopC":[],"price":65,"cabin":"Economy","meals":True,"wifi":False},
    {"id":"BG-8003","ac":"EK","flight":"EK 501 / EK 241","aircraft":"Airbus A380","fr":"BOM","to":"YYZ","frCity":"Mumbai","toCity":"Toronto","dep":"04:15","arr":"17:25","arrD":"","dur":"22h 10m","durM":1330,"stops":1,"stopC":["DXB"],"price":712,"cabin":"Economy","meals":True,"wifi":True},
]

POPULAR_ROUTES = [
    {"from":"Toronto","fromCode":"YYZ","to":"Delhi","toCode":"DEL","region":"North America","tag":"Diwali Peak","tagClass":"sf","priceFrom":589,"currency":"USD"},
    {"from":"Vancouver","fromCode":"YVR","to":"Mumbai","toCode":"BOM","region":"North America","tag":"Most Popular","tagClass":"gr","priceFrom":612,"currency":"USD"},
    {"from":"London","fromCode":"LHR","to":"Bangalore","toCode":"BLR","region":"United Kingdom","tag":"Tech Corridor","tagClass":"sf","priceFrom":342,"currency":"GBP"},
    {"from":"Dubai","fromCode":"DXB","to":"Kerala","toCode":"COK","region":"Middle East","tag":"Top Route","tagClass":"gr","priceFrom":890,"currency":"AED"},
    {"from":"Sydney","fromCode":"SYD","to":"Hyderabad","toCode":"HYD","region":"Australia","tag":"Growing Fast","tagClass":"sf","priceFrom":680,"currency":"AUD"},
    {"from":"Singapore","fromCode":"SIN","to":"Chennai","toCode":"MAA","region":"Southeast Asia","tag":"Quick Hop","tagClass":"gr","priceFrom":245,"currency":"USD"},
]

def enrich(f):
    a = AIRLINES.get(f["ac"], {})
    sl = "Non-stop" if f["stops"] == 0 else f"{f['stops']} stop - {', '.join(f['stopC'])}"
    sc = "direct" if f["stops"] == 0 else "one"
    return {**f, "airline": a.get("name",""), "code": a.get("code",""), "color": a.get("color",""),
            "alliance": a.get("alliance",""), "includedBaggage": a.get("baggage",""),
            "stopsLabel": sl, "stopsClass": sc, "from": f["fr"], "to": f["to"],
            "fromCity": f.get("frCity",""), "toCity": f.get("toCity",""),
            "depTime": f["dep"], "arrTime": f["arr"], "arrDay": f["arrD"],
            "duration": f["dur"], "durationMin": f["durM"]}

def extract_code(s):
    import re
    m = re.search(r"\(([A-Z]{3})\)", s)
    return m.group(1) if m else s.upper().strip()[:3]
