from pydantic import BaseModel, EmailStr, Field
from typing import Optional

# ===== AUTH =====
class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=2)
    email: str
    password: str = Field(..., min_length=6)

class LoginRequest(BaseModel):
    email: str
    password: str

class UserPreferences(BaseModel):
    currency: str = "CAD"
    homeAirport: str = "YYZ"
    notifications: bool = True

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    preferences: UserPreferences

class AuthResponse(BaseModel):
    success: bool
    message: str
    token: str
    user: UserResponse

# ===== FLIGHTS =====
class FlightSearchParams(BaseModel):
    from_city: str = Field(..., alias="from")
    to_city: str = Field(..., alias="to")
    sort: str = "price"

class MultiCityLeg(BaseModel):
    from_city: str = Field(..., alias="from")
    to_city: str = Field(..., alias="to")
    date: Optional[str] = None

    class Config:
        populate_by_name = True

class MultiCityRequest(BaseModel):
    legs: list[MultiCityLeg]

# ===== BAGGAGE =====
class BagItem(BaseModel):
    weight: int = 23

class BaggageCalcRequest(BaseModel):
    airline: str
    bags: list[BagItem]

# ===== TRIPS =====
class TripDestination(BaseModel):
    city: str
    nights: int = 3

class TripPlanRequest(BaseModel):
    travelers: int = Field(..., ge=1)
    origin: str
    destinations: list[TripDestination]
    budget: Optional[int] = None
    nights: int = 7
