import os
from typing import Any, Dict, List, Optional, Union
from dotenv import load_dotenv
from langchain.agents import create_agent  # Modern import (replaces langgraph.prebuilt import)
from langchain_core.messages import HumanMessage
from langchain_core.tools import tool
from langchain_google_genai import ChatGoogleGenerativeAI
from tavily import TavilyClient

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

tavily_client = TavilyClient(api_key=TAVILY_API_KEY)

# Use valid model identifier: gemini-1.5-flash or gemini-2.0-flash
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", google_api_key=GEMINI_API_KEY)


@tool("Calculator", description="Performs mathematical calculations.")
def tool1(expression: str) -> str:
    try:
        result = eval(expression)
        return str(result)
    except Exception as e:
        return f"Error: {e}"


@tool("web_search", description="Search the web for information.")
def tool2(
    query: Optional[str] = None, 
    queries: Optional[Union[List[str], str]] = None, 
    **kwargs: Any
) -> Dict[str, Any] | str:
    search_str = ""
    if query:
        search_str = query
    elif queries:
        search_str = queries[0] if isinstance(queries, list) else queries
    elif kwargs:
        search_str = str(list(kwargs.values())[0])

    try:
        return tavily_client.search(search_str)
    except Exception as e:
        return f"Error: {e}"


tools = [tool1, tool2]

# Modern agent creation
agent = create_agent(
    model=llm,
    tools=tools,
    system_prompt="You are a helpful assistant"
)

question = HumanMessage(content="How much water is in this earth?")
response = agent.invoke({"messages": [question]})

final_message = response["messages"][-1]
print(final_message.content)