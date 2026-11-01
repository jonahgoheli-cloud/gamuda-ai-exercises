from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class Receipt(BaseModel):
    date: str
    terminal: str
    transaction: str
    amount_RM: float

atm_database = [
    {
        "date": "06/08/2022",
        "terminal":"642251",
        "transaction":"WITHDRAWAL",
        "amount_RM": "500.01",
        "password" : "P@$$w0rd123",
        "house_possesed": 6,
        "car_possesed": 7
    }
]

@app.get("/receipt-with-no-model")
def get_receipt_no_model():
    return atm_database

@app.get("/receipt-with-model", response_model=List[Receipt])
def get_receipt_with_model():
    return atm_database