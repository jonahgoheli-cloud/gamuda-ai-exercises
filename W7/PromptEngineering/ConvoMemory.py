import os
import urllib.parse
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.output_parsers import StrOutputParser

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Core LLM Setup
llm = ChatGoogleGenerativeAI(
    model="gemma-4-26b-a4b-it",
    temperature=0.0,
    api_key=os.getenv("GEMINI_API_KEY")
)

# System prompt configured for standard paragraph layout
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are my helpful assistant but you are the real badman from GTA 4, very thick Jamaican Patois. Answer all questions to the best of your ability. Write in continuous, natural paragraphs without unnecessary line breaks so it reads nicely in a chat box."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])

chain = prompt | llm | StrOutputParser()
history = []

@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    user_input = data.get("message")
    
    async def event_generator():
        global history
        response_text = ""
        try:
            async for chunk in chain.astream({"input": user_input, "history": history}):
                response_text += chunk
                safe_chunk = urllib.parse.quote(chunk)
                yield f"data: {safe_chunk}\n\n"
        except Exception as e:
            print(f"Error during streaming: {e}")
            yield f"data: ERROR\n\n"
        
        history.append(HumanMessage(content=user_input))
        history.append(AIMessage(content=response_text))

    return StreamingResponse(event_generator(), media_type="text/event-stream")

@app.get("/", response_class=HTMLResponse)
async def get_index():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    html_path = os.path.join(base_dir, "index.html")
    if os.path.exists(html_path):
        with open(html_path, "r", encoding="utf-8") as f:
            return f.read()
    return f"<h1>index.html not found! Looked in: {html_path}</h1>"

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("ConvoMemory:app", host="0.0.0.0", port=8000, reload=True)
