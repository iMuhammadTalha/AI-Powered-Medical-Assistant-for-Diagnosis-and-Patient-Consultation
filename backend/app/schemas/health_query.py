from pydantic import BaseModel

class HealthQueryInput(BaseModel):
    query: str
