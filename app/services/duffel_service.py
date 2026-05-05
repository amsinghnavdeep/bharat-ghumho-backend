import os
import httpx
from tenacity import retry, stop_after_attempt, wait_exponential

DUFFEL_BASE = "https://api.duffel.com"
DUFFEL_VERSION = "v2"

def _headers():
      return {
                "Authorization": f"Bearer {os.getenv('DUFFEL_API_KEY', '')}",
                "Duffel-Version": DUFFEL_VERSION,
                "Content-Type": "application/json",
                "Accept": "application/json",
      }


#  FLIGHTS 
@retry(stop=stop_after_attempt(3), wait=wait_exponential(min=1, max=5))
async def search_flights(
      origin: str, destination: str, departure_date: str,
      cabin_class: str = "economy", adults: int = 1,
      children: int = 0, infants: int = 0, return_date: str = None,
) -> dict:
      slices = [{"origin": origin, "destination": destination, "departure_date": departure_date}]
      if return_date:
                slices.append({"origin": destination, "d
                async def get_offer(offer_id: str) -> dict:
                      async with httpx.AsyncClient(timeout=20) as client:
                                r = await client.get(f"{DUFFEL_BASE}/air/offers/{offer_id}", headers=_headers())
                                r.raise_for_status()
                                return r.json()["data"]
                        
                  async def get_seat_map(offer_id: str) -> dict:
                        async with httpx.AsyncClient(timeout=20) as client:
                                  r = await client.get(f"{DUFFEL_BASE}/air/seat_maps",
                                                                   headers=_headers(), params={"offer_id": offer_id})
                                  r.raise_for_status()
                                  return r.json()["data"]
                          
                    async def create_order(offer_id: str, passengers: list, payment: dict) -> dict:
                          payload = {"data": {"selected_offers": [offer_id],
                                                      "passengers": passengers, "payments": [payment], "type": "instant"}}
                          async with httpx.AsyncClient(timeout=45) as client:
                                    r = await client.post(f"{DUFFEL_BASE}/air/orders", headers=_headers(), json=payload)
                                    r.raise_for_status()
                                    return r.json()["data"]
                            
                      async def cancel_order(order_id: str) -> dict:
                            async with httpx.AsyncClient(timeout=20) as client:
                                      r = await client.post(f"{DUFFEL_BASE}/air/order_cancellations",
                                                                        headers=_headers(), json={"data": {"order_id": order_id}})
                                      r.raise_for_status()
                                      return r.json()["data"]
                              
                        
        #  STAYS (HOTELS) 
  @retry(stop=stop_after_attempt(3), wait=wait_exponential(min=1, max=5))
async def search_stays(
      checkin: str, checkout: str, guests: int = 1,
      latitude: float = None, longitude: float = None, radius_km: int = 5,
) -> dict:
      payload = {"data": {
                "check_in_date": checkin, "check_out_date": checkout,
                "guests": [{"type": "adult"}] * guests,
                "rooms": 1,
      }}
      async with httpx.AsyncClient(timeout=30) as client:
                r = await client.post(f"{DUFFEL_BASE}/stays/search", headers=_headers(), json=payload)
                r.raise_for_status()
        async def book_stay(quote_id: str, guest: dict, payment: dict) -> dict:
              payload = {"data": {"quote_id": quote_id, "guest": guest, "payment": payment}}
              async with httpx.AsyncClient(timeout=45) as client:
                        r = await client.post(f"{DUFFEL_BASE}/stays/bookings", headers=_headers(), json=payload)
                        r.raise_for_status()
                        return r.json()["data"]


          #  CARS 
          @retry(stop=stop_after_attempt(3), wait=wait_exponential(min=1, max=5))
async def search_cars(
      pickup_location: str, dropoff_location: str,
      pickup_datetime: str, dropoff_datetime: str,
      driver_age: int = 30,
) -> dict:
      payload = {"data": {
                    "pickup_location": pickup_location,
                    "dropoff_location": dropoff_location,
                    "pickup_date_time": pickup_datetime,
                    "dropoff_date_time": dropoff_datetime,
                    "driver": {"age": driver_age},
          }}
    async with httpx.AsyncClient(timeout=30) as client:
              r = await client.post(f"{DUFFEL_BASE}/cars/search", headers=_headers(), json=payload)
              r.raise_for_status()
              search_id = r.json()["data"]["id"]
              results = await client.get(f"{DUFFEL_BASE}/cars/search_results",
                                                     headers=_headers(), params={"search_id": search_id, "limit": 20})
              results.raise_for_status()
              return {"source": "duffel_cars", "results": results.json()["data"]}

      async def get_car_quote(offer_id: str) -> dict:
            async with httpx.AsyncClient(timeout=20) as client:
                      r = await client.post(f"{DUFFEL_BASE}/cars/quotes",
                                                        headers=_headers(), json={"data": {"offer_id": offer_id}})
                      r.raise_for_status()
                      return r.json()["data"]

        async def book_car(quote_id: str, driver: dict, payment: dict) -> dict:
              payload = {"data": {"quote_id": quote_id, "driver": driver, "payment": payment}}
              async with httpx.AsyncClient(timeout=45) as client:
                        r = await client.post(f"{DUFFEL_BASE}/cars/bookings", headers=_headers(), json=payload)
                        r.raise_for_status()
                        return r.json()["data"]
                
                return {"source": "duffel_stays", "results": r.json()["data"]}
        
  async def get_stay_quote(accommodation_id: str, checkin: str, checkout: str, guests: int = 1) -> dict:
        payload = {"data": {"accommodation_id": accommodation_id,
                                    "check_in_date": checkin, "check_out_date": checkout,
                                    "guests": [{"type": "adult"}] * guests}}
        async with httpx.AsyncClient(timeout=20) as client:
                  r = await client.post(f"{DUFFEL_BASE}/stays/quotes", headers=_headers(), json=payload)
                  r.raise_for_status()
                  return r.json()["data"]
          estination": origin, "departure_date": return_date})
            passengers = ([{"type": "adult"}] * adults
                                  + [{"type": "child"}] * children
                                  + [{"type": "infant_without_seat"}] * infants)
    payload = {"data": {"slices": slices, "passengers": passengers, "cabin_class": cabin_class}}
    async with httpx.AsyncClient(timeout=30) as client:
              r = await client.post(f"{DUFFEL_BASE}/air/offer_requests", headers=_headers(), json=payload)
              r.raise_for_status()
              req_id = r.json()["data"]["id"]
              offers = await client.get(f"{DUFFEL_BASE}/air/offers", headers=_headers(),
                  params={"offer_request_id": req_id, "sort": "total_amount", "limit": 20})
              offers.raise_for_status()
              return {"source": "duffel", "offers": offers.json()["data"]}
      
