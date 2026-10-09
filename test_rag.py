
from app.rag import answer_question

question = "What is the Laptop Sentinel System?"

answer = answer_question(question)

print("\nQuestion:", question)
print("\nAbby AI:", answer)
