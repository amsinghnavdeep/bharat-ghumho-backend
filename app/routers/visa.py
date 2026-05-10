from fastapi import APIRouter, HTTPException, Query
from ..data.visa import VISA_REQUIREMENTS, all_countries, get_visa

router = APIRouter()


@router.get("")
def visa_info(
    passport: str = Query("IN"),
    destination: str = Query(..., description="ISO-2 destination code, e.g. US, GB, AE"),
):
    pp = (passport or "IN").upper()
    if pp != "IN":
        raise HTTPException(
            status_code=400,
            detail=f"Visa data is only available for Indian (IN) passport holders. Got: {pp}",
        )
    info = get_visa(destination)
    if not info:
        raise HTTPException(status_code=404, detail=f"No visa data for {destination.upper()}")
    return {"success": True, "passport": pp, "destination": destination.upper(), **info}


@router.get("/countries")
def countries():
    return {"success": True, "countries": all_countries(), "count": len(VISA_REQUIREMENTS)}
