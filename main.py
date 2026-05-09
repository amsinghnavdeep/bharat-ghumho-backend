from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import database
from app.routers import (
    flights, auth, baggage, trips, hotels,
    cars, holidays, weather, currency, places, visa,
    bookings, alerts, reviews, favorites, festival,
)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    database.init_db()
    yield


app = FastAPI(
    title="Bharat Ghumho API",
    description="Flight + travel platform API for the Indian diaspora.",
    version="3.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(flights.router,   prefix="/api/flights",   tags=["flights"])
app.include_router(auth.router,      prefix="/api/auth",      tags=["auth"])
app.include_router(baggage.router,   prefix="/api/baggage",   tags=["baggage"])
app.include_router(trips.router,     prefix="/api/trips",     tags=["trips"])
app.include_router(hotels.router,    prefix="/api/hotels",    tags=["hotels"])
app.include_router(cars.router,      prefix="/api/cars",      tags=["cars"])
app.include_router(holidays.router,  prefix="/api/holidays",  tags=["holidays"])
app.include_router(weather.router,   prefix="/api/weather",   tags=["weather"])
app.include_router(currency.router,  prefix="/api/currency",  tags=["currency"])
app.include_router(places.router,    prefix="/api/places",    tags=["places"])
app.include_router(visa.router,      prefix="/api/visa",      tags=["visa"])
app.include_router(bookings.router,  prefix="/api/bookings",  tags=["bookings"])
app.include_router(alerts.router,    prefix="/api/alerts",    tags=["alerts"])
app.include_router(reviews.router,   prefix="/api/reviews",   tags=["reviews"])
app.include_router(favorites.router, prefix="/api/favorites", tags=["favorites"])
app.include_router(festival.router,  prefix="/api/festivals",  tags=["festivals"])


@app.get("/api/health")
def health():
    return {"status": "ok", "service": "bharat-ghumho-api", "version": "3.0.0"}


@app.get("/")
def root():
    return {"message": "Bharat Ghumho API - visit /docs for Swagger UI"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
