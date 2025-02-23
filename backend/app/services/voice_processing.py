import openai
import io
from dotenv import load_dotenv
import os

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

async def process_voice(audio):
    """
    Process voice input and convert to text using OpenAI Whisper.
    """
    audio_bytes = await audio.read()
    audio_file = io.BytesIO(audio_bytes)

    response = openai.Audio.transcribe("whisper-1", audio_file, api_key=OPENAI_API_KEY)
    return response.get("text", "Could not transcribe audio")



# import os
# from groq import Groq

# client = Groq()
# filename = os.path.dirname(__file__) + "/audio.m4a"

# with open(filename, "rb") as file:
#     transcription = client.audio.transcriptions.create(
#       file=(filename, file.read()),
#       model="distil-whisper-large-v3-en",
#       response_format="verbose_json",
#     )
#     print(transcription.text)
      