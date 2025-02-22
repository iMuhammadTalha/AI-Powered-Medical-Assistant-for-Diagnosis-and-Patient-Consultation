import openai
from app.core.config import settings

openai.api_key = settings.OPENAI_API_KEY

async def analyze_image(image_url: str) -> str:
    response = openai.ChatCompletion.create(
        model="gpt-4-vision-preview",
        messages=[{"role": "user", "content": f"Analyze this medical image: {image_url}"}],
        max_tokens=100
    )
    
    return response["choices"][0]["message"]["content"]
