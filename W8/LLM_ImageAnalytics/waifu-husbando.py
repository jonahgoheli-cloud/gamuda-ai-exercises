import base64
import os

import streamlit as st
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-3.5-flash",
    api_key=os.getenv("GEMINI_API_KEY"),
    temperature=0,
)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            """
You are an expert anime character recognition AI.

Your job is to identify WAIFUS AND HUSBANDOS from images
WITHOUT requiring the user to provide the anime title,
character name, or any other clues.

You specialize in characters from:
- Anime
- Manga
- Manhwa
- Manhua
- Visual novels
- Anime-style video games
- Gacha games
- Light novels

IDENTIFICATION RULES:

1. Identify the character using visual information alone.

2. Analyze hair color, hairstyle, eye color, clothing,
   accessories, facial features, and distinctive traits.

3. Attempt to identify the character even if the image
   contains no text, subtitles, logos, or watermarks.

4. Recognize characters in screenshots, fan art,
   wallpapers, profile pictures, and cropped images.

5. If multiple characters appear, identify each one.

6. Provide the character's full name and the series
   or game they originate from.

7. Do not invent names or confidently guess when unsure.
   If uncertain, provide up to three possible candidates
   and explain the uncertainty.

8. Distinguish between a character's identity and the
   particular version, costume, or alternate form shown.

9. Do not ask the user for the anime title.
   The entire point is to identify the character
   without that information.

10. Waifu and husbando are playful fandom labels.
    Use them appropriately, but do not assume every
    character fits either category.

RESPONSE FORMAT:

💖 CHARACTER IDENTIFIED

Name: [Character's full name]
Anime/Game: [Series or game title]
Category: [Waifu / Husbando / Other]
Confidence: [High / Medium / Low]

🔍 HOW I RECOGNIZED THEM:
Explain the visual features that support your answer.

✨ CHARACTER DETAILS:
Give a short description of the character.

If there are multiple characters, repeat this format
for each character.

If identification is uncertain, explain why and provide
the most plausible candidates instead of inventing facts.
""",
        ),
        (
            "human",
            [
                {"type": "text", "text": "{input}"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "data:{mime_type};base64,{image}",
                    },
                },
            ],
        ),
    ]
)

chain = prompt | llm | StrOutputParser()

st.title("Waifu/Husbando Identifier")

st.write(
    "Upload an anime character image and let AI identify them. "
    "No anime title. No character name. No hints."
)

col1, col2 = st.columns(2)

with col1:
    uploaded_file = st.file_uploader(
        "Upload your image", type=["jpg", "jpeg", "png", "webp"]
    )

with col2:
    if uploaded_file is not None:
        image_bytes = uploaded_file.read()
        st.image(image_bytes, caption="Mystery Character")
    else:
        st.write("🕵️ Waiting for a mystery waifu or husbando...")

question = st.text_input(
    "Question",
    value=(
        "Identify the character in this image using visual clues "
        "alone. Tell me their name and the anime, manga, or game "
        "they come from. I will not provide the title."
    ),
)

if st.button("🔍 Identify Character"):
    if uploaded_file is None:
        st.warning("Upload an image first!")
    elif not question.strip():
        st.warning("Enter a question first!")
    else:
        image = base64.b64encode(image_bytes).decode()

        with st.spinner("Scanning anime character database... 🧠"):
            try:
                res = chain.invoke(
                    {
                        "input": question,
                        "image": image,
                        "mime_type": uploaded_file.type,
                    }
                )

                st.subheader("🎯 Recognition Results")
                st.write(res)

            except Exception as e:
                st.error(f"Something went wrong: {e}")