import openai
import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

async def analyze_health_query(query: str):
    """
    Process a health-related query using LLaMA/OpenAI.
    """
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": "You are a medical chatbot."},
                  {"role": "user", "content": query}],
        api_key=OPENAI_API_KEY
    )
    return response['choices'][0]['message']['content']
