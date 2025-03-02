import os
import httpx
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"  # Replace with actual endpoint

if not GROQ_API_KEY:
    raise ValueError("❌ Error: GROQ_API_KEY is missing! Check your .env file.")

async def analyze_medical_text(prompt: str):
    """Send medical query to Groq API and return response"""
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    system_prompt = """
    You are MedAI, an advanced AI doctor trained on medical textbooks, clinical guidelines, 
    and PubMed research papers. You provide highly accurate medical advice, but you always 
    warn users to consult a real doctor for final decisions. 
    You follow professional guidelines (WHO, CDC, NHS, and FDA).
    """


    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(GROQ_API_URL, json=data, headers=headers)

    if response.status_code == 200:
        return response.json().get("choices", [{}])[0].get("message", {}).get("content", "No response content.")
    return f"Error: {response.status_code}, {response.text}"
