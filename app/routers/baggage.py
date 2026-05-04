from fastapi import APIRouter, HTTPException
from ..data.baggage import BAGGAGE_RULES

router = APIRouter(prefix="/baggage", tags=["Baggage"])

@router.get("/rules/{airline}")
def get_rules(airline: str | None = None):
    if airline:
        rules = BAGGAGE_RULES.get(airline.upper())
        if not rules: raise HTTPException(status_code=404, detail="Airline not found")
        return {"success": True, "airline": airline.upper(), "rules": rules}
    return {"success": True, "airlines": BAGGAGE_RULES}

@router.post("/calculate")
def calculate(data: dict):
    code = data.get("airline", "").upper()
    bags = data.get("bags", [])
    rules = BAGGAGE_RULES.get(code)
    if not rules: raise HTTPException(status_code=404, detail="Airline not found")
    total = 0
    breakdown = []
    for i, bag in enumerate(bags):
        w = bag.get("weight", 23)
        cost = 0
        if i == 0: note = f"Included ({rules['included']})"
        elif w <= 23: cost = rules["extra23"]; note = "Extra bag (up to 23kg)"
        elif w <= 32: cost = rules["extra32"]; note = "Extra bag (up to 32kg)"
        else: cost = rules["extra32"] + (w - 32) * rules["overweight_per_kg"]; note = f"Overweight ({w}kg)"
        total += cost
        breakdown.append({"bag": i+1, "weight": f"{w}kg", "cost": f"${cost}", "note": note})
    return {"success": True, "airline": rules["name"], "cabin": rules["cabin"], "included": rules["included"],
            "bags": breakdown, "totalExtraCost": f"${total}"}

@router.get("/compare")
def compare(airlines: str = ""):
    codes = [c.strip().upper() for c in airlines.split(",") if c.strip()]
    comparison = []
    for code in codes:
        r = BAGGAGE_RULES.get(code)
        if r: comparison.append({"code": code, **r})
    return {"success": True, "comparison": comparison}
