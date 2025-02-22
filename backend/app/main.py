from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import diagnosis, voice, tts, health_query
from dotenv import load_dotenv

app = FastAPI(title="AI Doctor - Medical Assistant")

# CORS Middleware (for frontend integration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domain later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routes
app.include_router(diagnosis.router, prefix="/api/v1/diagnosis", tags=["Diagnosis"])
app.include_router(voice.router, prefix="/api/v1/voice", tags=["Voice Processing"])
app.include_router(tts.router, prefix="/api/v1/tts", tags=["Text-to-Speech"])
app.include_router(health_query.router, prefix="/api/v1/health-query", tags=["Health Chatbot"])

@app.get("/")
async def root():
    return {"message": "Welcome to AI Doctor API 🚀"}
