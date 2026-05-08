"""Currency conversion via open.er-api.com with a static fallback for offline dev."""
import time
import httpx

ER_BASE = "https://open.er-api.com/v6/latest"

# Static fallback rates (USD-base). Used when the upstream is unreachable.
_FALLBACK_USD = {
    "USD": 1.0, "INR": 84.0, "CAD": 1.37, "GBP": 0.79, "EUR": 0.92,
    "AED": 3.67, "SGD": 1.35, "AUD": 1.51, "JPY": 152.0, "CNY": 7.10,
    "NZD": 1.66, "THB": 36.0, "MYR": 4.66, "MVR": 15.4, "LKR": 305.0,
    "NPR": 134.4, "BTN": 84.0, "IDR": 15750.0
}

_cache: dict[str, tuple[float, dict[str, float]]] = {}
_TTL = 3600


async def _rates(base: str) -> dict[str, float]:
    base = base.upper()
    now = time.time()
    cached = _cache.get(base)
    if cached and now - cached[0] < _TTL:
        return cached[1]
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            r = await client.get(f"{ER_BASE}/{base}")
            if r.status_code == 200:
                data = r.json()
                if data.get("result") == "success":
                    rates = data["rates"]
                    _cache[base] = (now, rates)
                    return rates
    except Exception:
        pass
    if base == "USD":
        return _FALLBACK_USD
    base_in_usd = _FALLBACK_USD.get(base)
    if not base_in_usd:
        return _FALLBACK_USD
    return {k: v / base_in_usd for k, v in _FALLBACK_USD.items()}


async def convert(from_ccy: str, to_ccy: str, amount: float) -> dict:
    rates = await _rates(from_ccy)
    rate = rates.get(to_ccy.upper())
    if rate is None:
        return {
            "from": from_ccy.upper(),
            "to": to_ccy.upper(),
            "amount": amount,
            "rate": None,
            "result": None,
            "error": "Unsupported target currency"
        }
    return {
        "from": from_ccy.upper(),
        "to": to_ccy.upper(),
        "amount": amount,
        "rate": rate,
        "result": round(rate * amount, 2),
        "fetched_at": int(time.time())
    }


async def latest_rates(base: str) -> dict:
    rates = await _rates(base)
    return {"base": base.upper(), "rates": rates, "fetched_at": int(time.time())}
