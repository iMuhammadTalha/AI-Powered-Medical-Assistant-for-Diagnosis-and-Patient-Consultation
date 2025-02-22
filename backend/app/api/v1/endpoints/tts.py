from fastapi import APIRouter
from app.services.tts_service import text_to_speech
from app.schemas.tts import TextToSpeechInput

router = APIRouter()

@router.post("/text-to-speech/")
async def tts_service(input_data: TextToSpeechInput):
    """
    Convert text input to natural speech using gTTS or ElevenLabs API.
    """
    audio_url = await text_to_speech(input_data.text)
    return {"audio_url": audio_url}
