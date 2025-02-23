from fastapi import APIRouter
from app.schemas.diagnosis import DiagnosisRequest, DiagnosisResponse
from app.services.image_processing import analyze_image_text

router = APIRouter()

@router.post("/diagnose", response_model=DiagnosisResponse)
async def diagnose_image(request: DiagnosisRequest):
    """
    Not in use
    """
    # result = await analyze_image_text(request.image_url)
    return {"result": "result"}
