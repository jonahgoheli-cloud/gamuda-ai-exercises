import os
import streamlit as st
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# 1. Load environment variables
load_dotenv()

# 2. Page Configuration
st.set_page_config(page_title="AI YouTube Video Analyst", page_icon="🎥")
st.title("🎥 AI YouTube Video Analyst")
st.write("Analyze online YouTube videos using LangChain and Google Gemini directly via URL.")

# 3. Initialize LangChain Model
llm = ChatGoogleGenerativeAI(
    model=os.getenv("GEMINI_MODEL", "gemini-3.5-flash-lite"),
    api_key=os.getenv("GEMINI_API_KEY")
)

# 4. Build LangChain Prompt & Chain
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are an expert video analyst. Analyze videos carefully and provide detailed descriptions with timecodes."),
    ("human", [
        {
            "type": "text",
            "text": "{analysis_request}"
        },
        {
            "type": "video",
            "url": "{video_url}"
        }
    ])
])

chain = prompt | llm | StrOutputParser()

# 5. UI Inputs
youtube_url = st.text_input(
    "Enter YouTube URL:",
    placeholder="https://www.youtube.com/watch?v=rMvqiIWGZ5g"
)

PROMPT_OPTIONS = {
    "1. Detailed Summary": "Describe what's happening in this video with corresponding timecodes.",
    "2. Short Bullet Points": "Summarize this video in a few key bullet points.",
    "3. Quiz & Answer Key": "Summarize this video and generate a quiz with an answer key based on its contents.",
    "Custom Prompt": "Custom"
}

selected_option = st.selectbox("Select Analysis Task:", list(PROMPT_OPTIONS.keys()))

if selected_option == "Custom Prompt":
    analysis_request = st.text_area("Custom Prompt:", "Describe what's happening in this video.")
else:
    analysis_request = PROMPT_OPTIONS[selected_option]

# 6. Streamlit Video Player Preview & Analysis Trigger
if youtube_url:
    st.video(youtube_url)
    
    if st.button("Run Video Analysis", type="primary"):
        with st.spinner("Analyzing video stream with Gemini..."):
            try:
                # Direct online URL invocation
                response = chain.invoke({
                    "analysis_request": analysis_request,
                    "video_url": youtube_url
                })

                st.subheader("Results")
                st.markdown("---")
                st.markdown(response)

            except Exception as e:
                st.error(f"An error occurred during video analysis: {e}")