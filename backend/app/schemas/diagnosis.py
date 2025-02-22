from pydantic import BaseModel

class DiagnosisRequest(BaseModel):
    image_url: str

class DiagnosisResponse(BaseModel):
    result: str
