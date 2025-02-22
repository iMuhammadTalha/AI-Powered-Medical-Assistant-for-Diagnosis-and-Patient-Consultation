import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "AI-Powered Medical Assistant"
    API_VERSION: str = "v1"
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "your-api-key")

settings = Settings()
