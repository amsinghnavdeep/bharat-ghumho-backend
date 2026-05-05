from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import CLIENT_URL
from app.routers import flights, auth, hotels, baggage, trips, cars

app = FastAPI(
        title="Bharat Ghumho API",
        version="2.0.0",
        description="Flights, Hotels, Cars & Holiday Packages for the Indian Diaspora",
)

app.add_middleware(
        CORSMiddleware,
        allow_origins=[CLIENT_URL, "http://localhost:4200", "http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
)

app.include_router(flights.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(hotels.router, prefix="/api")
app.include_router(cars.router, prefix="/api")
app.include_router(baggage.router, prefix="/api")
app.include_router(trips.router, prefix="/api")

@app.get("/")
def root():
        return {"name": "Bharat Ghumho API", "version": "2.0.0", "status": "running"}

@app.get("/api/health")
def health():
        return {"status": "ok", "service": "Bharat Ghumho API", "version": "2.0.0"}

if __name__ == "__main__":
        import uvicorn
        uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    
