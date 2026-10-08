import os

from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai

load_dotenv()


api_key=os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY is not loaded from .env")

client = genai.Client(api_key=api_key)

app = FastAPI(
    title="AI Research Assistant",
    description="An AI-powered research assistant",
    version="1.0.0"
)


class ResearchQuestion(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "AI Research Assistant API is running"
    }


@app.post("/ask")
def ask_question(request: ResearchQuestion):

    prompt = f"""
You are an AI research assistant.

Answer the user's question accurately and clearly.
Answer in the same language as the user's question.
If the question is in Amharic, answer in Amharic.
If the question is in English, answer in English.

User question:
{request.question}
"""

    try:
        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=prompt
        )

        return {
            "question": request.question,
            "answer": response.text
        }

    except Exception as e:
        return {
            "error": str(e)
        }