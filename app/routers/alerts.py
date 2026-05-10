import uuid
from fastapi import APIRouter, Depends, HTTPException
from ..models import FareAlertRequest
from ..middleware import get_optional_user
from .. import database

router = APIRouter()


def _row_to_alert(row: dict) -> dict:
    return {
        "id": row["id"],
        "user_id": row["user_id"],
        "frm": row["frm"],
        "to": row["to_"],
        "target_price": row["target_price"],
        "currency": row["currency"],
        "email": row["email"],
        "active": bool(row["active"]),
        "created_at": row["created_at"],
    }


@router.post("")
def create_alert(req: FareAlertRequest, user=Depends(get_optional_user)):
    alert_id = f"AL-{uuid.uuid4().hex[:10].upper()}"
    user_id = user["sub"] if user else None
    database.execute(
        "INSERT INTO fare_alerts (id, user_id, frm, to_, target_price, currency, email) "
        "VALUES (?, ?, ?, ?, ?, ?, ?)",
        (alert_id, user_id, req.frm.upper(), req.to.upper(), req.target_price,
         req.currency.upper(), req.email),
    )
    row = database.fetchone("SELECT * FROM fare_alerts WHERE id = ?", (alert_id,))
    return {"success": True, "alert": _row_to_alert(row)}


@router.post("/")
def create_alert_slash(req: FareAlertRequest, user=Depends(get_optional_user)):
    return create_alert(req, user)


@router.get("")
def list_alerts(user=Depends(get_optional_user)):
    if user:
        rows = database.fetchall(
            "SELECT * FROM fare_alerts WHERE user_id = ? ORDER BY created_at DESC",
            (user["sub"],),
        )
    else:
        rows = database.fetchall(
            "SELECT * FROM fare_alerts ORDER BY created_at DESC LIMIT 50",
        )
    return {"success": True, "count": len(rows), "results": [_row_to_alert(r) for r in rows]}


@router.get("/")
def list_alerts_slash(user=Depends(get_optional_user)):
    return list_alerts(user)


@router.delete("/{alert_id}")
def delete_alert(alert_id: str, user=Depends(get_optional_user)):
    row = database.fetchone("SELECT user_id FROM fare_alerts WHERE id = ?", (alert_id,))
    if not row:
        raise HTTPException(status_code=404, detail="Alert not found")
    if row["user_id"] and (not user or row["user_id"] != user["sub"]):
        raise HTTPException(status_code=403, detail="Not authorised")
    database.execute("DELETE FROM fare_alerts WHERE id = ?", (alert_id,))
    return {"success": True, "id": alert_id}
