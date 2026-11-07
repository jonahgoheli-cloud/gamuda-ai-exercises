# example_5.py: ask questions about the FnaF.pdf
import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query  # <--- Added FastAPI imports
from fastapi.middleware.cors import CORSMiddleware  # <--- Make sure this import is present!
from pymongo import MongoClient
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from embeddings import embeddings

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGODB_URI = os.getenv("MONGO_ATLAS_CLUSTER_URI")

app = FastAPI(title="FNaF Lore RAG API", description="API to query Five Nights at Freddy's lore")

# Enable CORS for local testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for local dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the LLM & MongoDB connection at startup
llm = ChatGoogleGenerativeAI(model="gemini-3.6-flash", api_key=GEMINI_API_KEY)
client = MongoClient(MONGODB_URI)
DB_NAME = "test_db"
COLLECTION_NAME = "test_collection_pdf"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "test-index-pdf"
MONGODB_COLLECTION = client[DB_NAME][COLLECTION_NAME]

# Vector store and retriever
# k=10 returns the top 10 most relevant chunks
vector_store = MongoDBAtlasVectorSearch(
    collection=MONGODB_COLLECTION,
    embedding=embeddings,
    index_name=ATLAS_VECTOR_SEARCH_INDEX_NAME,
    relevance_score_fn="cosine",
)
retriever = vector_store.as_retriever(search_kwargs={"k": 10})
# Define the system prompt with instructions for the AI

system_prompt = (
    """
    You are a FnaF lore expert like MattPatt and answer anything from the context. You can handle a conversation and answer follow-up questions. 
    If the context does not contain the answer, respond with "I don't know anything else other than FnaF!."
    CONTEXT: \n{context}
    """
)

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{input}"),
])
# Merge the retrieved chunks into one string
def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

# Retrieve, build the prompt, call the LLM, and parse the text
rag_chain = (
    {"context": retriever | format_docs, "input": RunnablePassthrough()}
    | prompt | llm | StrOutputParser()
)

@app.get("/ask")
async def ask_question(question: str = Query(..., description="Question to ask about the PDF content")):
    """
    Accepts a question as a query parameter and returns the AI response based on vector search context.
    """
    try:
        response = rag_chain.invoke(question)
        return {
            "question": question,
            "response": response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))