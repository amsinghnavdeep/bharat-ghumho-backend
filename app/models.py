from pydantic import BaseModel, EmailStr
from typing import Optional, List

class RegisterRequest(BaseModel):
        name: str
        email: EmailStr
        password: str

class LoginRequest(BaseModel):
        email: EmailStr
        password: str

class UserResponse(BaseModel):
        id: str
        name: str
        email: str
        savedRoutes: List[str] = []
        preferences: dict = {}

class AuthResponse(BaseModel):
        access_token: str
        token_type: str = "bearer"
        user: UserResponse

class MultiCityLeg(BaseModel):
        frm: str
        to: str
        date: Optional[str] = None

    model_config = {"populate_by_name": True}

    def __init__(self, **data):
                if 'from' in data:
                                data['frm'] = data.pop('from')
                            super().__init__(**data)

class MultiCityRequest(BaseModel):
        legs: List[MultiCityLeg]

class BaggageCalcRequest(BaseModel):
        airline: str
    bags: int
    weight_per_bag: float = 23.0
    route_type: str = "international"

class TripPlanRequest(BaseModel):
        origin: str
    destinations: List[str]
    travelers: int = 2
    budget: Optional[float] = None
    nights: int = 14

class FareAlertRequest(BaseModel):
        frm: str
    to: str
    target_price: float
    email: str
    currency: str = "CAD"
