from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import flights, auth, baggage, trips

app = FastAPI(
    title="Bharat Ghumho API",
    description="Flight search & travel platform for the Indian diaspora",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "http://localhost:3000",
        "https://bharat-ghumho.netlify.app",
        "https://69fcbb1f99415800087d6e74--bharat-ghumho.netlify.app",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(flights.router, prefix="/api/flights", tags=["flights"])
app.include_router(auth.router,    prefix="/api/auth",    tags=["auth"])
app.include_router(baggage.router, prefix="/api/baggage", tags=["baggage"])
app.include_router(trips.router,   prefix="/api/trips",   tags=["trips"])

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "bharat-ghumho-api", "version": "2.0.0"}

@app.get("/")
def root():
    return {"message": "Bharat Ghumho API - visit /docs for Swagger UI"}

if __name__ == "__main__":
        import uvicorn
        uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    
