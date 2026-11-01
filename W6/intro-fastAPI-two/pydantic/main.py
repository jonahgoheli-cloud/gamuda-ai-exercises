from fastapi import FastAPI
from router import right_window, left_window

app = FastAPI()

app.include_router(
    right_window.router,
    prefix="/right",
    tags=["Right Window Buttons"]
)

app.include_router(
    left_window.router,
    prefix="/left",
    tags=["Left Window Buttons"]
)