from pydantic import BaseModel
from typing import Optional

class HealthQueryInput(BaseModel):
    query: str
    symptoms: Optional[str] = None
    occupation: Optional[str] = None
    bp: Optional[str] = None
    sugar: Optional[str] = None
    height: Optional[str] = None
    weight: Optional[str] = None
    bmi: Optional[str] = None
    familyHistory: Optional[str] = None
    age: Optional[str] = None
    gender: Optional[str] = None
    maritalStatus: Optional[str] = None
    area: Optional[str] = None
    travelHistory: Optional[str] = None
    medication: Optional[str] = None
    surgeryHistory: Optional[str] = None
    diseaseHistory: Optional[str] = None
    allergies: Optional[str] = None


class HealthQueryResponse(BaseModel):
    response: str