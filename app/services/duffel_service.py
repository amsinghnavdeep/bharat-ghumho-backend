"""
Duffel API Service  International flights (YYZDEL, LHRBLR, DXBCOK etc.)
Docs: https://duffel.com/docs/api
"""
import httpx
import os
from typing import Optional
from tenacity import retry, stop_after_attempt, wait_exponential

DUFFEL_BASE = "https://api.duffel.com"
DUFFEL_TOKEN = os.getenv("DUFFEL_API_KEY", "")
DUFFEL_VERSION = "v1"

HEADERS = {
      "Authorization": f"Bearer {DUFFEL_TOKEN}",
      "Duffel-Version": DUFFEL_VERSION,
      "Content-Type": "application/json",
      "Accept": "application/json",
}

@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=1, max=4))
async def search_flights(
      origin: str,
      destination: str,
      departure_date: str,
      cabin_class: str = "economy",
      adults: int = 1,
      children: int = 0,
      infants: int = 0,
) -> dict:
      """Search one-way flights via Duffel."""
      slices = [{"origin": origin, "destination": destination, "departure_date": departure_date}]
      passengers = (
          [{"type": "adult"}] * adults
          + [{"type": "child"}] * children
          + [{"type": "infant_without_seat"}] * infants
      )
      payload = {
          "data": {
              "slices": slices,
              "passengers": passengers,
              "cabin_class": cabin_class,
          }
      }
      async with httpx.AsyncClient(timeout=30) as client:
                resp = await client.post(f"{DUFFEL_BASE}/air/offer_requests", headers=HEADERS, json=payload)
                resp.raise_for_status()
                offer_request_id = resp.json()["data"]["id"]

          offers_resp = await client.get(
                        f"{DUFFEL_BASE}/air/offers",
                        headers=HEADERS,
                        params={"offer_request_id": offer_request_id, "sort": "total_amount", "limit": 20},
          )
        offers_resp.raise_for_status()
        return _normalize_duffel(offers_resp.json()["data"])


def _normalize_duffel(offers: list) -> list:
      """Normalize Duffel offers to Bharat Ghumho format."""
    results = []
    for offer in offers:
              try:
                            slice_ = offer["slices"][0]
                            seg = slice_["segments"][0]
                            results.append({
                                "id": offer["id"],
                                "source": "duffel",
                                "airline": seg["operating_carrier"]["name"],
                                "code": seg["operating_carrier"]["iata_code"],
                                "flight": f"{seg['operating_carrier']['iata_code']} {seg['operating_carrier_flight_number']}",
                                "aircraft": seg.get("aircraft", {}).get("name", ""),
                                "from": slice_["origin"]["iata_code"],
                                "to": slice_["destination"]["iata_code"],
                                "fromCity": slice_["origin"]["city_name"],
                                "toCity": slice_["destination"]["city_name"],
                                "depTime": seg["departing_at"][11:16],
                                "arrTime": seg["arriving_at"][11:16],
                                "duration": slice_["duration"],
                                "stops": len(slice_["segments"]) - 1,
                                "stopC": [s["destination"]["iata_code"] for s in slice_["segments"][:-1]],
                                "price": float(offer["total_amount"]),
                                "currency": offer["total_currency"],
                                "cabin": offer["passengers"][0]["cabin_class_marketing_name"],
                                "meals": False,
                                "wifi": False,
                                "color": "#1A1A2E",
                                "stopsLabel": "Non-stop" if len(slice_["segments"]) == 1 else f"{len(slice_['segments'])-1} Stop",
                            })
except (KeyError, IndexError):
            continue
    return results
