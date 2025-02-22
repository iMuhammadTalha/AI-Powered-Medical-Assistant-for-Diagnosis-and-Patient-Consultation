from fastapi import APIRouter, UploadFile, File
from app.services.voice_processing import process_voice

router = APIRouter()

@router.post("/speech-to-text/")
async def speech_to_text(audio: UploadFile = File(...)):
    """
    Convert uploaded voice/audio file to text using OpenAI Whisper API.
    """
    text = await process_voice(audio)
    return {"text": text}
