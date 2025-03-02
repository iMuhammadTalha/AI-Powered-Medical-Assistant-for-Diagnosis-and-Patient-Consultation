import os
import httpx
import numpy as np
import faiss
from dotenv import load_dotenv
from datasets import load_dataset
from sentence_transformers import SentenceTransformer

# Load environment variables
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

if not GROQ_API_KEY:
    raise ValueError("❌ Error: GROQ_API_KEY is missing! Check your .env file.")

# Load PubMed-QA dataset
dataset = load_dataset("pubmed_qa", "pqa_labeled", split="train")

# Load a pre-trained embedding model
embed_model = SentenceTransformer("all-MiniLM-L6-v2")

# Create embeddings for all questions
questions = [sample["question"] for sample in dataset]
question_embeddings = embed_model.encode(questions, convert_to_numpy=True)

# Build a FAISS index for fast similarity search
index = faiss.IndexFlatL2(question_embeddings.shape[1])
index.add(np.array(question_embeddings))

def get_relevant_medical_qa(query):
    """Retrieve the most relevant medical Q&A using FAISS semantic search."""
    query_embedding = embed_model.encode([query], convert_to_numpy=True)
    _, idx = index.search(query_embedding, 1)  # Get the most similar question index
    sample = dataset[int(idx[0][0])]  # Retrieve corresponding Q&A

    return f"Reference Q&A:\nQ: {sample['question']}\nA: {sample['long_answer']}\n"

async def analyze_medical_text(prompt: str):
    """Send a medical query to Groq API with retrieved medical knowledge."""
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    system_prompt = """
    You are MedAI, an AI that provides direct, precise, and factual medical advice. 
    Avoid unnecessary introductions. Simply answer user questions based on medical research. 
    Always advise users to consult a real doctor for confirmation.
    """

    # Retrieve the most relevant PubMed-QA example
    medical_context = get_relevant_medical_qa(prompt)

    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"{medical_context}\nUser Question: {prompt}"}
        ]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(GROQ_API_URL, json=data, headers=headers)

    if response.status_code == 200:
        return response.json().get("choices", [{}])[0].get("message", {}).get("content", "No response content.")
    return f"Error: {response.status_code}, {response.text}"
