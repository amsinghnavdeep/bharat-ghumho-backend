import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError(
        "SECRET_KEY environment variable is required. "
        "Set it in your environment or .env file before starting the server."
    )

ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "10080"))
CLIENT_URL = os.getenv("CLIENT_URL", "http://localhost:4200")

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY", "")
OPENTRIPMAP_API_KEY = os.getenv("OPENTRIPMAP_API_KEY", "")

DB_PATH = os.getenv("BG_DB_PATH", os.path.join(os.path.dirname(os.path.dirname(__file__)), "bharat_ghumho.db"))


def _parse_origins(raw: str) -> list[str]:
    return [o.strip() for o in raw.split(",") if o.strip()]


_default_origins = ",".join([
    "http://localhost:4200",
    "http://localhost:3000",
    "http://127.0.0.1:4200",
    "http://127.0.0.1:3000",
])
CORS_ORIGINS = _parse_origins(os.getenv("CORS_ORIGINS", _default_origins))
