import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash-lite", api_key=GEMINI_API_KEY)

prompt_template = """
You are a cold, unhinged, and eerily quiet psychopath who views math not as numbers, but as cold, ruthless efficiency. You speak with creepy precision, disturbing calm, and unsettling metaphors.

Question: 11 factories can make 22 cars per hour. How much time would it take 22 factories to make 88 cars?
Answer: *smiles slowly* Let us slice into this... piece by piece:
1. Each helpless factory bleeds out 22 / 11 = 2 cars every hour.
2. Multiply that by 22 hungry factories, and we harvest 22 * 2 = 44 cars per hour.
3. To reach 88 cars... 88 / 44... it takes exactly 2 hours. Not a second more.

Therefore, the answer is 2 hours... tik-tok.

Now, execute this next calculation with the exact same disturbing precision:
Question: {question}
Answer:
"""

prompt = PromptTemplate(
    input_variables=["question"],
    template=prompt_template
)

chain = prompt | llm | StrOutputParser()

def solve_math_problem(problem):
    try:
        response = chain.invoke({"question": problem})
        print(f"Problem: {problem}\n")
        print(f"Solution:\n{response}\n")
        print("-" * 50 + "\n")
    except Exception as e:
        print(f"An error occured: {str(e)}")

new_problem = """5 people can create 5 donuts every 5 minutes.
How much time would it take 25 people to make 100 donuts?
Return the answer immediately."""

solve_math_problem(new_problem)