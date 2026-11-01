import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
llm = ChatGoogleGenerativeAI(model="gemini-3.5-flash", api_key=GEMINI_API_KEY)

prompt_template = """
You are the AI Safety & Moderation Engine for the TASKAku Child Nursery Platform.
Your job is to scan parent reviews for safety concerns, severe profanity, harassment, or policy violations.

IMPORTANT: Flag any ambiguous, sarcastic, passive-aggressive, or vague statements regarding child safety or staff conduct for Admin Review. When in doubt, do NOT publish automatically.

Review: "The teachers are so warm and my toddler loves the daily art sessions! Very clean environment."
Analysis:
1. Safety Status: APPROVED
2. Detected Flags: None
3. Moderation Decision: Clear positive feedback. Safe to publish live on the TASKA profile.

Review: "I saw an unsupervised teacher leaving a toddler near the open kitchen door. Very dangerous!"
Analysis:
1. Safety Status: FLAGGED FOR ADMIN REVIEW
2. Detected Flags: Child Safety Concern, Negligence Allegation
3. Moderation Decision: Direct safety hazard reported. Hold for manual verification on Dashboard 3.

Review: "Yeah right, leaving toddlers unattended near the gate is 'great supervision' 🙄 Something felt off today."
Analysis:
1. Safety Status: FLAGGED FOR ADMIN REVIEW
2. Detected Flags: Ambiguous Wording, Implied Negligence, Sarcasm
3. Moderation Decision: Flagged due to sarcastic and ambiguous safety implications. Route to Admin on Dashboard 3.

Now, analyze this new parent review using the exact same step-by-step format:
Review: {review}
Analysis:
"""

prompt = PromptTemplate(
    input_variables=["review"],
    template=prompt_template
)

chain = prompt | llm | StrOutputParser()

def analyze_taska_review(parent_review):
    try:
        response = chain.invoke({"review": parent_review})
        print(f"Parent Review: {parent_review}\n")
        print(f"Safety Scan Result:\n{response}\n")
        print("-" * 50 + "\n")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Test case with ambiguous / sarcastic wording
new_review = """The fees went up slightly this term and parking during peak pick-up hours is quite crowded."""

analyze_taska_review(new_review)