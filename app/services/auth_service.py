"""SQLite-backed user store and auth helpers."""
import json
import uuid
from passlib.context import CryptContext
from ..middleware import create_token
from .. import database

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")


DEFAULT_PREFS = {"currency": "CAD", "homeAirport": "YYZ", "notifications": True}


def _new_id() -> str:
    return f"USR-{uuid.uuid4().hex[:8].upper()}"


def _row_to_user(row: dict) -> dict:
    prefs = {}
    if row.get("preferences"):
        try:
            prefs = json.loads(row["preferences"])
        except (json.JSONDecodeError, TypeError):
            prefs = {}
    return {
        "id": row["id"],
        "name": row["name"],
        "email": row["email"],
        "preferences": prefs or DEFAULT_PREFS,
    }


def register(name: str, email: str, password: str):
    email = email.lower().strip()
    existing = database.fetchone("SELECT id FROM users WHERE email = ?", (email,))
    if existing:
        return None, "Email already registered"

    user_id = _new_id()
    database.execute(
        "INSERT INTO users (id, name, email, password_hash, preferences) VALUES (?, ?, ?, ?, ?)",
        (user_id, name.strip(), email, pwd_ctx.hash(password), json.dumps(DEFAULT_PREFS)),
    )
    token = create_token({"sub": user_id, "email": email, "name": name.strip()})
    return {
        "id": user_id, "name": name.strip(), "email": email,
        "preferences": DEFAULT_PREFS, "token": token,
    }, None


def login(email: str, password: str):
    email = email.lower().strip()
    row = database.fetchone(
        "SELECT id, name, email, password_hash, preferences FROM users WHERE email = ?",
        (email,),
    )
    if not row or not pwd_ctx.verify(password, row["password_hash"]):
        return None, "Invalid credentials"
    user = _row_to_user(row)
    token = create_token({"sub": user["id"], "email": user["email"], "name": user["name"]})
    return {**user, "token": token}, None


def get_user(user_id: str):
    row = database.fetchone(
        "SELECT id, name, email, password_hash, preferences FROM users WHERE id = ?",
        (user_id,),
    )
    return _row_to_user(row) if row else None


def update_prefs(user_id: str, prefs: dict):
    user = get_user(user_id)
    if not user:
        return None
    merged = {**user["preferences"]}
    for k in ("currency", "homeAirport", "notifications"):
        if k in prefs:
            merged[k] = prefs[k]
    database.execute(
        "UPDATE users SET preferences = ? WHERE id = ?",
        (json.dumps(merged), user_id),
    )
    return merged
