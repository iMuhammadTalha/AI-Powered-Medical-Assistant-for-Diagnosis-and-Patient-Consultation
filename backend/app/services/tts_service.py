from gtts import gTTS
import os
from app.services.cloudinary import upload_file
import io



async def text_to_speech(text: str):
    """
    Convert text to speech using gTTS.
    """    
    # Convert text to speech and save
    speech = gTTS(text)
    audio_buffer = io.BytesIO()
    speech.write_to_fp(audio_buffer)
    audio_buffer.seek(0)

    # Upload to Cloudinary
    url = await upload_file(audio_buffer, resource_type="raw")

    return url
