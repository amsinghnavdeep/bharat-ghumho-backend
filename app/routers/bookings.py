import json
import uuid
from fastapi import APIRouter, Depends, HTTPException
from ..models import BookingCreate
from ..middleware import get_current_user
from .. import database

router = APIRouter()


def _row_to_booking(row: dict) -> dict:
    details = None
    if row.get("details"):
        try:
            details = json.loads(row["details"])
        except (json.JSONDecodeError, TypeError):
            details = None
    return {
        "id": row["id"],
        "user_id": row["user_id"],
        "type": row["type"],
        "entity_id": row["entity_id"],
        "title": row["title"],
        "price": row["price"],
        "currency": row["currency"],
        "travelers": row["travelers"],
        "start_date": row["start_date"],
        "end_date": row["end_date"],
        "status": row["status"],
        "details": details,
        "created_at": row["created_at"],
    }


@router.post("")
def create_booking(req: BookingCreate, user=Depends(get_current_user)):
    booking_id = f"BK-{uuid.uuid4().hex[:10].upper()}"
    database.execute(
        """
        INSERT INTO bookings (id, user_id, type, entity_id, title, price, currency,
                              travelers, start_date, end_date, status, details)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed', ?)
        """,
        (booking_id, user["sub"], req.type, req.entity_id, req.title, req.price,
         req.currency, req.travelers, req.start_date, req.end_date,
         json.dumps(req.details) if req.details else None),
    )
    row = database.fetchone("SELECT * FROM bookings WHERE id = ?", (booking_id,))
    return {"success": True, "booking": _row_to_booking(row)}


@router.get("")
def list_bookings(user=Depends(get_current_user)):
    rows = database.fetchall(
        "SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC",
        (user["sub"],),
    )
    return {"success": True, "count": len(rows), "results": [_row_to_booking(r) for r in rows]}


@router.get("/{booking_id}")
def get_booking(booking_id: str, user=Depends(get_current_user)):
    row = database.fetchone(
        "SELECT * FROM bookings WHERE id = ? AND user_id = ?",
        (booking_id, user["sub"]),
    )
    if not row:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"success": True, "booking": _row_to_booking(row)}


@router.put("/{booking_id}/cancel")
def cancel_booking(booking_id: str, user=Depends(get_current_user)):
    row = database.fetchone(
        "SELECT id FROM bookings WHERE id = ? AND user_id = ?",
        (booking_id, user["sub"]),
    )
    if not row:
        raise HTTPException(status_code=404, detail="Booking not found")
    database.execute(
        "UPDATE bookings SET status = 'cancelled' WHERE id = ?",
        (booking_id,),
    )
    return {"success": True, "status": "cancelled", "id": booking_id}
