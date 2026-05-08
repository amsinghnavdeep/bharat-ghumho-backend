from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Any, Dict


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
    preferences: Dict[str, Any] = {}


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


class BookingCreate(BaseModel):
    type: str = Field(..., description="flight | hotel | car | package")
    entity_id: str
    title: str
    price: float
    currency: str = "USD"
    travelers: int = 1
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    details: Optional[Dict[str, Any]] = None


class FavoriteCreate(BaseModel):
    type: str = Field(..., description="flight | hotel | route | car | package | destination")
    entity_id: str
    title: str
    metadata: Optional[Dict[str, Any]] = None


class ReviewCreate(BaseModel):
    entity_type: str = Field(..., description="flight | hotel | package | car")
    entity_id: str
    rating: float = Field(..., ge=1, le=5)
    title: Optional[str] = None
    body: str
    author: Optional[str] = None
