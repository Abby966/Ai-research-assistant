
from app.knowledge import load_pdf, chunk_cv
from app.vector_store import store_chunks, search_chunks

text = load_pdf("knowledge/resume.pdf")
chunks = chunk_cv(text)

count = store_chunks(chunks)
print("Chunks stored:", count)

question = "What is the Laptop Sentinel System?"
results = search_chunks(question)

print("\nSearch results:")
for document in results["documents"][0]:
    print("-", document[:300])
