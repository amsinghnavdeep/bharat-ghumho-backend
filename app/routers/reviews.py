import uuid
from fastapi import APIRouter, Depends, HTTPException
from ..models import ReviewCreate
from ..middleware import get_optional_user
from .. import database

router = APIRouter()


def _row_to_review(row: dict) -> dict:
    return {
        "id": row["id"],
        "user_id": row["user_id"],
        "entity_type": row["entity_type"],
        "entity_id": row["entity_id"],
        "rating": row["rating"],
        "title": row["title"],
        "body": row["body"],
        "author": row["author"],
        "created_at": row["created_at"],
    }


@router.post("")
def create_review(req: ReviewCreate, user=Depends(get_optional_user)):
    review_id = f"RV-{uuid.uuid4().hex[:10].upper()}"
    user_id = user["sub"] if user else None
    author = req.author or (user.get("name") if user else "Anonymous")
    database.execute(
        """
        INSERT INTO reviews (id, user_id, entity_type, entity_id, rating, title, body, author)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (review_id, user_id, req.entity_type, req.entity_id, req.rating,
         req.title, req.body, author),
    )
    row = database.fetchone("SELECT * FROM reviews WHERE id = ?", (review_id,))
    return {"success": True, "review": _row_to_review(row)}


@router.post("/")
def create_review_slash(req: ReviewCreate, user=Depends(get_optional_user)):
    return create_review(req, user)


@router.get("/{entity_type}/{entity_id}")
def list_reviews(entity_type: str, entity_id: str):
    rows = database.fetchall(
        "SELECT * FROM reviews WHERE entity_type = ? AND entity_id = ? ORDER BY created_at DESC",
        (entity_type, entity_id),
    )
    avg = round(sum(r["rating"] for r in rows) / len(rows), 2) if rows else None
    return {
        "success": True,
        "entity_type": entity_type,
        "entity_id": entity_id,
        "count": len(rows),
        "average_rating": avg,
        "reviews": [_row_to_review(r) for r in rows],
    }


@router.delete("/{review_id}")
def delete_review(review_id: str, user=Depends(get_optional_user)):
    row = database.fetchone("SELECT user_id FROM reviews WHERE id = ?", (review_id,))
    if not row:
        raise HTTPException(status_code=404, detail="Review not found")
    if row["user_id"] and (not user or row["user_id"] != user["sub"]):
        raise HTTPException(status_code=403, detail="Not authorised")
    database.execute("DELETE FROM reviews WHERE id = ?", (review_id,))
    return {"success": True, "id": review_id}
