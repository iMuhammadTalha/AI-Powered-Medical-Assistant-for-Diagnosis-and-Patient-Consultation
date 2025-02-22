from fastapi import APIRouter
from app.services.chatbot import analyze_health_query
from app.schemas.health_query import HealthQueryInput
from app.services.groq_client import analyze_medical_text


router = APIRouter()

@router.post("/analyze-query/")
async def analyze_query(input_data: HealthQueryInput):
    """
    Process user health-related query using AI (LLaMA or OpenAI API).
    """
    # response = await analyze_health_query(input_data.query)
    response = await analyze_medical_text(input_data.query)
    return {"response": response}
