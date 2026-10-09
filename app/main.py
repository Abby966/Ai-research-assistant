
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.rag import answer_question

app = FastAPI(
    title="Abby AI",
    description="An AI-powered portfolio assistant for Abegail Chanyalew",
    version="1.0.0"
)

# Allow the local React development server to call this API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResearchQuestion(BaseModel):
    question: str

@app.get("/")
def home():
    return {"message": "Abby AI API is running"}

@app.post("/ask")
def ask_question(request: ResearchQuestion):
    try:
        answer = answer_question(request.question)
        return {"question": request.question, "answer": answer}
    except Exception as e:
        print(f"Error processing question: {e}")
        return {
            "error": "Sorry, Abby AI could not process your question. Please try again."
        }
