from gtts import gTTS
import os

async def text_to_speech(text: str):
    """
    Convert text to speech using gTTS.
    """
    speech = gTTS(text)
    file_path = f"static/audio/response.mp3"
    speech.save(file_path)
    return f"/{file_path}"  # API will serve this file
