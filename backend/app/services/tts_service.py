from gtts import gTTS
import os

async def text_to_speech(text: str):
    """
    Convert text to speech using gTTS.
    """
    speech = gTTS(text)
    os.makedirs("public/audio", exist_ok=True)
    file_path = f"public/audio/response.mp3"
    speech.save(file_path)
    return f"/{file_path}"  # API will serve this file
