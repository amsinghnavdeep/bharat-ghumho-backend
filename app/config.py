import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY", "bharat-gumho-jwt-secret-2026")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "10080"))
CLIENT_URL = os.getenv("CLIENT_URL", "http://localhost:4200")

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY", "")
OPENTRIPMAP_API_KEY = os.getenv("OPENTRIPMAP_API_KEY", "")

DB_PATH = os.getenv("BG_DB_PATH", os.path.join(os.path.dirname(os.path.dirname(__file__)), "bharat_ghumho.db"))
