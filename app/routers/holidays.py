from fastapi import APIRouter, HTTPException, Query
from ..data.holidays import PACKAGES, search_packages

router = APIRouter()


@router.get("")
def list_packages(
    theme: str | None = None,
    budget: float | None = Query(None, ge=0),
    days: int | None = Query(None, ge=1),
    q: str | None = None,
    sort: str = Query("popular", enum=["popular", "price-low", "price-high", "rating"]),
):
    results = search_packages(theme=theme, max_budget=budget, days=days, q=q, sort=sort)
    return {"success": True, "count": len(results), "results": results}


@router.get("/")
def list_packages_slash(
    theme: str | None = None,
    budget: float | None = Query(None, ge=0),
    days: int | None = Query(None, ge=1),
    q: str | None = None,
    sort: str = Query("popular", enum=["popular", "price-low", "price-high", "rating"]),
):
    return list_packages(theme=theme, budget=budget, days=days, q=q, sort=sort)


@router.get("/themes")
def themes():
    seen: list[str] = []
    for p in PACKAGES:
        if p["theme"] not in seen:
            seen.append(p["theme"])
    return {"success": True, "themes": seen}


@router.get("/search")
def search(
    theme: str | None = None,
    budget: float | None = Query(None, ge=0),
    days: int | None = Query(None, ge=1),
    q: str | None = None,
    sort: str = Query("popular", enum=["popular", "price-low", "price-high", "rating"]),
):
    return list_packages(theme=theme, budget=budget, days=days, q=q, sort=sort)


@router.get("/{package_id}")
def get_package(package_id: str):
    pkg = next((p for p in PACKAGES if p["id"] == package_id), None)
    if not pkg:
        raise HTTPException(status_code=404, detail="Package not found")
    return {"success": True, "package": pkg}
