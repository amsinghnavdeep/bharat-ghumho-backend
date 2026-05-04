from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import CLIENT_URL
from app.routers import flights, auth, hotels, baggage, trips

app = FastAPI(title="Bharat Gumho API", version="1.0.0", description="Flight search API for the Indian diaspora")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[CLIENT_URL, "http://localhost:4200", "http://localhost:3000"],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

app.include_router(flights.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(hotels.router, prefix="/api")
app.include_router(baggage.router, prefix="/api")
app.include_router(trips.router, prefix="/api")

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "Bharat Gumho API", "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
