from fastapi import APIRouter, HTTPException, Depends
from ..models import RegisterRequest, LoginRequest
from ..services.auth_service import register, login, get_user, update_prefs
from ..middleware import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
def do_register(req: RegisterRequest):
    result, err = register(req.name, req.email, req.password)
    if err: raise HTTPException(status_code=409, detail=err)
    return {"success": True, "message": "Account created", "token": result["token"],
            "user": {"id": result["id"], "name": result["name"], "email": result["email"], "preferences": result["preferences"]}}

@router.post("/login")
def do_login(req: LoginRequest):
    result, err = login(req.email, req.password)
    if err: raise HTTPException(status_code=401, detail=err)
    return {"success": True, "message": "Login successful", "token": result["token"],
            "user": {"id": result["id"], "name": result["name"], "email": result["email"], "preferences": result["preferences"]}}

@router.get("/me")
def get_me(user=Depends(get_current_user)):
    u = get_user(user["sub"])
    if not u: raise HTTPException(status_code=404, detail="User not found")
    return {"success": True, "user": {"id": u["id"], "name": u["name"], "email": u["email"], "preferences": u["preferences"]}}

@router.put("/preferences")
def update_preferences(prefs: dict, user=Depends(get_current_user)):
    result = update_prefs(user["sub"], prefs)
    if not result: raise HTTPException(status_code=404, detail="User not found")
    return {"success": True, "preferences": result}
