import os
from dotenv import load_dotenv
from fastapi import FastAPI # added new
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate   #added new template
from langchain_core.output_parsers import StrOutputParser

app = FastAPI()

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Mount the static directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Define the request schema using Pydantic
class TranslationRequest(BaseModel):
    input_language: str
    output_language: str
    text_input: str

# Initialize the Gemini LLM
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash", api_key=GEMINI_API_KEY)

# Define the prompt template
prompt = ChatPromptTemplate.from_messages(
    [
    (
        "system",
        "You are a helpful assistant that translates {input_language} to {output_language}."
    ),
    (
        "human",
        "{input}"
    ),
]
)

chain = prompt | llm | StrOutputParser()

# Serve Frontend HTML at Home Path '/'
@app.get("/", response_class=HTMLResponse)
def read_root():
    with open("static/index.html", "r") as f:
        return f.read()

# Endpoint for text translation
@app.post("/translate")
def translate_text(request: TranslationRequest):
    ai_msg = chain.invoke({
    "input_language": request.input_language,
    "output_language": request.output_language,
    "input": request.text_input
})

    return {"translated_text": ai_msg}
