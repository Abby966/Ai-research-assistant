
from fastapi import FastAPI
from pydantic import BaseModel

from app.rag import answer_question

app = FastAPI(
    title="Abby AI",
    description="An AI-powered portfolio assistant for Abegail Chanyalew",
    version="1.0.0"
)


class ResearchQuestion(BaseModel):
    question: str


@app.get("/")
def home():
    return {
        "message": "Abby AI API is running"
    }


@app.post("/ask")
def ask_question(request: ResearchQuestion):
    try:
        answer = answer_question(request.question)

        return {
            "question": request.question,
            "answer": answer
        }

    except Exception:
        return {
            "error": "Sorry, Abby AI could not process your question. Please try again."
        }
