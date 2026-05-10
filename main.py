import os
from contextlib import asynccontextmanager
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from app import config, database
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
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
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


# --- Frontend (Angular SPA) -------------------------------------------------
# When the Angular build output exists (produced by the `npm run build` step
# in nixpacks.toml), FastAPI also serves the SPA. The API lives at /api/* and
# everything else is delegated to the SPA so Angular's client-side router can
# handle the URL.
FRONTEND_DIST = os.path.realpath(
    os.path.join(
        os.path.dirname(__file__),
        "frontend", "dist", "bharat-gumho", "browser",
    )
)
FRONTEND_INDEX = os.path.join(FRONTEND_DIST, "index.html")


def _resolve_under_dist(requested: str) -> Optional[str]:
    """Resolve `requested` under FRONTEND_DIST, blocking path traversal."""
    candidate = os.path.realpath(os.path.join(FRONTEND_DIST, requested))
    if candidate == FRONTEND_DIST or candidate.startswith(FRONTEND_DIST + os.sep):
        return candidate
    return None


if os.path.isdir(FRONTEND_DIST) and os.path.isfile(FRONTEND_INDEX):
    @app.get("/{full_path:path}", include_in_schema=False)
    async def spa(full_path: str):
        # Let FastAPI 404 unknown API routes instead of returning index.html.
        if full_path == "api" or full_path.startswith("api/"):
            raise HTTPException(status_code=404)
        if full_path:
            candidate = _resolve_under_dist(full_path)
            if candidate is not None and os.path.isfile(candidate):
                return FileResponse(candidate)
        return FileResponse(FRONTEND_INDEX)
else:
    @app.get("/")
    def root():
        return {
            "message": "Bharat Ghumho API - visit /docs for Swagger UI. "
                       "Frontend build not found at frontend/dist/bharat-gumho/browser; "
                       "run `cd frontend && npm run build` to enable the SPA."
        }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
