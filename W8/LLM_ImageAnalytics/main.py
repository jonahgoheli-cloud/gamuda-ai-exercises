import os
import base64

from fastapi import FastAPI, File, UploadFile, HTTPException
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
from typing import Dict

load_dotenv()

llm = ChatGoogleGenerativeAI(
model=os.getenv("GEMINI_MODEL", "gemini-3.5-flash"),
api_key=os.getenv("GEMINI_API_KEY")
)

app = FastAPI()

def encode_image(image_content: bytes) -> str:
    return base64.b64encode(image_content).decode("utf-8")

@app.post("/anaylyze-image")
async def analyze_image(file: UploadFile = File(...)) -> Dict[str, str]:

    allowed_types = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf"
    ]

    if not file.content_type or file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Invalid or missing file type. Only JPEG, JPG, PNG, and PDF are allowed."
        )

    contents = await file.read()

    if not contents:
        raise HTTPException(
            status_code=400,
            detail="The uploaded file is empty."
        )

    if len(contents) > 10_000_000:
        raise HTTPException(
            status_code=400,
            detail="File too large. Maximum size is 10MB."
        )

    try:
        if file.content_type == "application/pdf":
            file_data = base64.b64encode(contents).decode("utf-8")
            file_type = "application/pdf"
            content_type = "media"
        else:
            file_data = encode_image(contents)
            file_type = file.content_type
            content_type = "image_url"

        if content_type == "image_url":
            document_content = {
                "type": "image_url",
                "image_url": {
                    "url": f"data:{file_type};base64,{file_data}"
                }
            }
        else:
            document_content = {
                "type": "media",
                "mime_type": "application/pdf",
                "data": file_data
            }

        prompt = ChatPromptTemplate.from_messages([
            (
                "system",
                """You are TASKAku's AI document legibility assistant.
                Your role is to assess whether uploaded childcare registration
                documents are visually clear enough for a human administrator
                to review. You must not certify document authenticity or legal validity."""
            ),
            (
                "human",
                [
                    {
                        "type": "text",
                        "text": """
                        Analyze this uploaded document for TASKAku.

                        Follow these steps:

                        1. Check whether the document is blurry or out of focus.
                        2. Check whether the text is readable.
                        3. Check whether important information is cropped or cut off.
                        4. Check whether shadows, glare, or poor lighting affect readability.
                        5. Check whether any part of the document is obscured or missing.
                        6. Provide an overall legibility assessment.
                        7. Recommend whether it is suitable for human review or
                        whether a clearer copy should be requested.

                        Explain your findings clearly.

                        Do not determine whether the document is genuine.
                        Do not claim that a JKM registration or SSM document is valid.
                        If something cannot be assessed confidently, say so.
                        The result is an aid for human review, not a final decision.
                        """
                    },
                    {
                        "type": "text",
                        "text": f"Document MIME type: {file_type}"
                    },
                    document_content
                ]
            )
        ])

        chain = prompt | llm | StrOutputParser()
        res = await chain.ainvoke({})

    except HTTPException:
        raise

    except Exception as e:
        print(f"Document analysis error: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while analyzing the document."
        )

    return {"analysis": res}