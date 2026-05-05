"""
Verteil NDC Service  Air India + Air India Express (NDC direct)
Docs: https://verteil.com/developer
Covers: International routes YYZDEL, LHRBLR, DXBCOK etc.
"""
import httpx
import os
from tenacity import retry, stop_after_attempt, wait_exponential

VERTEIL_BASE = "https://api.verteil.com/entrygate/rest/request:"
VERTEIL_USER = os.getenv("VERTEIL_USERNAME", "")
VERTEIL_PASS = os.getenv("VERTEIL_PASSWORD", "")
VERTEIL_THIRDPARTY_ID = os.getenv("VERTEIL_THIRDPARTY_ID", "")
AI_OFFICE_ID = os.getenv("AI_OFFICE_ID", "")  # Air India office ID

def _build_air_shopping_payload(origin, destination, departure_date, cabin, adults, children, infants):
      pax = []
      for i in range(adults):
                pax.append({"PaxID": f"T1{i+1}", "PTC": "ADT"})
            for i in range(children):
                      pax.append({"PaxID": f"T2{i+1}", "PTC": "CHD"})
                  for i in range(infants):
                            pax.append({"PaxID": f"T3{i+1}", "PTC": "INF"})

    cabin_code = {"economy": "Y", "business": "C", "first": "F"}.get(cabin.lower(), "Y")

    return {
              "AirShoppingRQ": {
                            "Document": {"Name": "Bharat Ghumho", "ReferenceVersion": "1.0"},
                            "Party": {
                                              "Sender": {
                                                                    "TravelAgencySender": {
                                                                                              "AgencyID": VERTEIL_THIRDPARTY_ID,
                                                                                              "OfficialID": {"value": AI_OFFICE_ID}
                                                                    }
                                              }
                            },
                            "CoreQuery": {
                                              "OriginDestinations": {
                                                                    "OriginDestination": [{
                                                                                              "OriginDestinationKey": "OD1",
                                                                                              "Departure": {
                                                                                                                            "AirportCode": {"value": origin},
                                                                                                                            "Date": departure_date
                                                                                                },
                                                                                              "Arrival": {
                                                                                                                            "AirportCode": {"value": destination}
                                                                                                },
                                                                                              "ClassOfService": {"Code": {"SeatsLeft": 9, "value": cabin_code}}
                                                                    }]
                                              }
                            },
                            "Pax": pax,
                            "Preference": {
                                              "AirlinePreferences": {
                                                                    "Airline": [{"AirlineID": {"value": "AI"}}, {"AirlineID": {"value": "IX"}}]
                                              }
                            }
              }
    }


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=6))
async def search_flights(
      origin: str,
      destination: str,
      departure_date: str,
      cabin_class: str = "economy",
      adults: int = 1,
      children: int = 0,
      infants: int = 0,
) -> list:
      """Search Air India + Air India Express via Verteil NDC."""
    payload = _build_air_shopping_payload(
              origin, destination, departure_date, cabin_class, adults, children, infants
    )
    async with httpx.AsyncClient(timeout=30) as client:
              resp = await client.post(
                            f"{VERTEIL_BASE}AirShopping",
                            json=payload,
                            auth=(VERTEIL_USER, VERTEIL_PASS),
                            headers={"Content-Type": "application/json", "Accept": "application/json"},
              )
              resp.raise_for_status()
              return _normalize_verteil(resp.json())


def _normalize_verteil(data: dict) -> list:
      """Normalize Verteil AirShopping response to Bharat Ghumho format."""
    results = []
    try:
              offers = data.get("AirShoppingRS", {}).get("OffersGroup", {}).get("AirlineOffers", [])
              for airline_offer in offers:
                            for offer in airline_offer.get("Offer", []):
                                              try:
                                                                    item = offer["OfferItem"][0]
                                                                    service = item["FareDetail"][0]
                                                                    price = float(offer["TotalPrice"]["DetailCurrencyPrice"]["Total"]["value"])
                                                                    currency = offer["TotalPrice"]["DetailCurrencyPrice"]["Total"].get("Code", "USD")
                                                                    results.append({
                                                                        "id": offer["OfferID"]["value"],
                                                                        "source": "verteil_ndc",
                                                                        "airline": "Air India",
                                                                        "code": "AI",
                                                                        "flight": f"AI {offer['OfferID']['value'][-4:]}",
                                                                        "price": price,
                                                                        "currency": currency,
                                                                        "cabin": service.get("FareBasisCode", {}).get("value", "Economy"),
                                                                        "color": "#E23744",
                                                                        "stops": 0,
                                                                        "stopC": [],
                                                                        "stopsLabel": "Non-stop",
                                                                        "meals": True,
                                                                        "wifi": True,
                                                                        "raw": offer,
                                                                    })
    except (KeyError, IndexError, ValueError):
                    continue
except (KeyError, AttributeError):
        pass
    return results
