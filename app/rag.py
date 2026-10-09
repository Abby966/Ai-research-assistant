
from google import genai
import os

from dotenv import load_dotenv
from app.vector_store import search_chunks

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def answer_question(question):
    results = search_chunks(question, n_results=3)

    documents = results.get("documents", [[]])[0]

    if not documents:
        return "I couldn't find relevant information in Abby's portfolio."

    context = "\n\n".join(documents)

    prompt = f"""
You are Abby AI, an assistant that answers questions about
Abegail Chanyalew's professional portfolio.

Answer the question using ONLY the portfolio context below.
Do not invent experience, qualifications, achievements, or projects.
If the context does not contain enough information, say so clearly.
Refer to Abby in the third person.
Answer in the same language as the question.

PORTFOLIO CONTEXT:
{context}

QUESTION:
{question}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash-lite",
        contents=prompt
    )

    return response.text
