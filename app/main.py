from fastapi import FastAPI
from pydantic import BaseModel

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
    return {
        "question": request.question,
        "answer": "This is where our AI-generated answer will go."
    }