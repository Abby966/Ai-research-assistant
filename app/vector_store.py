
import chromadb
from app.embeddings import create_embedding

# Create a local database folder
client = chromadb.PersistentClient(path="chroma_db")

# Create or reuse a collection for Abby's portfolio
collection = client.get_or_create_collection(
    name="abby_portfolio"
)


def store_chunks(chunks):
    for i, chunk in enumerate(chunks):
        embedding = create_embedding(chunk["text"])

        collection.upsert(
            ids=[f"cv_chunk_{i}"],
            documents=[chunk["text"]],
            embeddings=[embedding],
            metadatas=[{
                "source": chunk["source"],
                "document_type": chunk["document_type"],
                "section": chunk["section"],
                "topic": chunk["topic"] or ""
            }]
        )

    return collection.count()


def search_chunks(question, n_results=3):
    query_embedding = create_embedding(question)

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=min(n_results, collection.count())
    )

    return results
