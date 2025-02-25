from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional
from app.schemas.health_query import HealthQueryResponse
from app.services.groq_client import analyze_medical_text
from app.services.image_processing import analyze_image_text
from app.services.cloudinary import upload_file

router = APIRouter()

@router.post("/analyze-query/", response_model=HealthQueryResponse)
async def analyze_query(
    query: str = Form(...),  
    symptoms: Optional[str] = Form(None),
    occupation: Optional[str] = Form(None),
    bp: Optional[str] = Form(None),
    sugar: Optional[str] = Form(None),
    height: Optional[str] = Form(None),
    weight: Optional[str] = Form(None),
    bmi: Optional[str] = Form(None),
    familyHistory: Optional[str] = Form(None),
    age: Optional[str] = Form(None),
    gender: Optional[str] = Form(None),
    maritalStatus: Optional[str] = Form(None),
    area: Optional[str] = Form(None),
    travelHistory: Optional[str] = Form(None),
    medication: Optional[str] = Form(None),
    surgeryHistory: Optional[str] = Form(None),
    diseaseHistory: Optional[str] = Form(None),
    allergies: Optional[str] = Form(None),
    imageUrl: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
):
    """
    Process user health-related query with optional medical files.
    """

    # Collect only user-provided inputs
    user_inputs = {
        "symptoms": symptoms,
        "occupation": occupation,
        "bp": bp,
        "sugar": sugar,
        "height": height,
        "weight": weight,
        "bmi": bmi,
        "familyHistory": familyHistory,
        "age": age,
        "gender": gender,
        "maritalStatus": maritalStatus,
        "area": area,
        "travelHistory": travelHistory,
        "medication": medication,
        "surgeryHistory": surgeryHistory,
        "diseaseHistory": diseaseHistory,
        "allergies": allergies,
    }

    # Filter out None values
    merged_query = query + "\n" + "\n".join(f"{key}: {value}" for key, value in user_inputs.items() if value)

    print("merged_query", merged_query)

    # Process text or image analysis
    if imageUrl:
        print("image_url", imageUrl)
        response = await analyze_image_text(merged_query, imageUrl)
    else:
        response = await analyze_medical_text(merged_query)

    return {"response": response}
