import json
import uuid
from fastapi import APIRouter, Depends, HTTPException
from ..models import FavoriteCreate
from ..middleware import get_current_user
from .. import database

router = APIRouter()


def _row_to_fav(row: dict) -> dict:
    metadata = None
    if row.get("metadata"):
        try:
            metadata = json.loads(row["metadata"])
        except (json.JSONDecodeError, TypeError):
            metadata = None
    return {
        "id": row["id"],
        "type": row["type"],
        "entity_id": row["entity_id"],
        "title": row["title"],
        "metadata": metadata,
        "created_at": row["created_at"],
    }


@router.post("")
def add_favorite(req: FavoriteCreate, user=Depends(get_current_user)):
    existing = database.fetchone(
        "SELECT id FROM favorites WHERE user_id = ? AND type = ? AND entity_id = ?",
        (user["sub"], req.type, req.entity_id),
    )
    if existing:
        return {"success": True, "duplicate": True, "id": existing["id"]}
    fav_id = f"FV-{uuid.uuid4().hex[:10].upper()}"
    database.execute(
        "INSERT INTO favorites (id, user_id, type, entity_id, title, metadata) "
        "VALUES (?, ?, ?, ?, ?, ?)",
        (fav_id, user["sub"], req.type, req.entity_id, req.title,
         json.dumps(req.metadata) if req.metadata else None),
    )
    row = database.fetchone("SELECT * FROM favorites WHERE id = ?", (fav_id,))
    return {"success": True, "favorite": _row_to_fav(row)}


@router.post("/")
def add_favorite_slash(req: FavoriteCreate, user=Depends(get_current_user)):
    return add_favorite(req, user)


@router.get("")
def list_favorites(type: str | None = None, user=Depends(get_current_user)):
    if type:
        rows = database.fetchall(
            "SELECT * FROM favorites WHERE user_id = ? AND type = ? ORDER BY created_at DESC",
            (user["sub"], type),
        )
    else:
        rows = database.fetchall(
            "SELECT * FROM favorites WHERE user_id = ? ORDER BY created_at DESC",
            (user["sub"],),
        )
    return {"success": True, "count": len(rows), "results": [_row_to_fav(r) for r in rows]}


@router.get("/")
def list_favorites_slash(type: str | None = None, user=Depends(get_current_user)):
    return list_favorites(type, user)


@router.delete("/{fav_id}")
def remove_favorite(fav_id: str, user=Depends(get_current_user)):
    row = database.fetchone(
        "SELECT id FROM favorites WHERE id = ? AND user_id = ?",
        (fav_id, user["sub"]),
    )
    if not row:
        raise HTTPException(status_code=404, detail="Favorite not found")
    database.execute("DELETE FROM favorites WHERE id = ?", (fav_id,))
    return {"success": True, "id": fav_id}
