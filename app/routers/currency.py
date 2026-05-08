from fastapi import APIRouter, Query
from ..services import currency_service

router = APIRouter()


@router.get("/convert")
async def convert(
    from_: str = Query(..., alias="from"),
    to: str = Query(...),
    amount: float = Query(1.0, ge=0),
):
    result = await currency_service.convert(from_, to, amount)
    return {"success": True, **result}


@router.get("/rates")
async def rates(base: str = Query("USD")):
    return {"success": True, **(await currency_service.latest_rates(base))}


@router.get("/popular")
async def popular(base: str = Query("USD")):
    targets = ["INR", "USD", "CAD", "GBP", "EUR", "AED", "SGD", "AUD", "JPY"]
    out = []
    for ccy in targets:
        if ccy == base.upper():
            continue
        r = await currency_service.convert(base, ccy, 1)
        out.append({"currency": ccy, "rate": r.get("rate")})
    return {"success": True, "base": base.upper(), "rates": out}
