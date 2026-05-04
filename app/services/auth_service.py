from passlib.context import CryptContext
from ..middleware import create_token

pwd_ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")
users_db: list[dict] = []
_counter = 0

def get_next_id():
    global _counter
    _counter += 1
    return f"USR-{_counter:04d}"

def register(name: str, email: str, password: str):
    email = email.lower().strip()
    if any(u["email"] == email for u in users_db):
        return None, "Email already registered"
    user = {
        "id": get_next_id(), "name": name.strip(), "email": email,
        "password": pwd_ctx.hash(password),
        "preferences": {"currency": "CAD", "homeAirport": "YYZ", "notifications": True}
    }
    users_db.append(user)
    token = create_token({"sub": user["id"], "email": user["email"], "name": user["name"]})
    return {"id": user["id"], "name": user["name"], "email": user["email"], "preferences": user["preferences"], "token": token}, None

def login(email: str, password: str):
    email = email.lower().strip()
    user = next((u for u in users_db if u["email"] == email), None)
    if not user or not pwd_ctx.verify(password, user["password"]):
        return None, "Invalid credentials"
    token = create_token({"sub": user["id"], "email": user["email"], "name": user["name"]})
    return {"id": user["id"], "name": user["name"], "email": user["email"], "preferences": user["preferences"], "token": token}, None

def get_user(user_id: str):
    return next((u for u in users_db if u["id"] == user_id), None)

def update_prefs(user_id: str, prefs: dict):
    user = get_user(user_id)
    if not user:
        return None
    for k in ["currency", "homeAirport", "notifications"]:
        if k in prefs:
            user["preferences"][k] = prefs[k]
    return user["preferences"]
