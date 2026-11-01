import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
# THINKING_LEVEL = "low"
llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash-lite", 
    google_api_key=os.getenv("GEMINI_API_KEY")
    # thinking_level = THINKING_LEVEL
)

llm_with_url = llm.bind_tools([{"url_context": {}}])
URL = "https://en.wikipedia.org/wiki/Jeffrey_Epstein","https://en.wikipedia.org/wiki/Arnold_Schwarzenegger"

chain = llm_with_url | StrOutputParser()

response = chain.invoke([
    HumanMessage(content=f"Write a concise summary of this page: {URL}. Read the page and list 3 important key takeaways and summarize the page in 5 concise bullet points.")
])

print(response)