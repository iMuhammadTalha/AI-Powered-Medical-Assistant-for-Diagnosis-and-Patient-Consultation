import os
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not set! Please set it as an environment variable.")

client = Groq(api_key=GROQ_API_KEY)

async def analyze_image_text(query, image_url: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.2-90b-vision-preview",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": query},
                    {"type": "image_url", "image_url": {"url": image_url}}
                ]
            }
        ],
        temperature=0.7,
        max_tokens=500,
        top_p=1.0
    )

    return response.choices[0].message.content

