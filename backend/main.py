import os
from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
from iointerface import SQLReader, CSVReader

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def get_data():
    df = SQLReader().read()
    print("\n===== DATA FROM CommodityIndex =====\n")
    return df.to_dict(orient="records")

# New API for Allocation2 Table
@app.get("/allocation2")
def allocation2():
    df = CSVReader().read() 
    df = df.fillna("")
    print("\n===== DATA FROM Allocation2 =====\n")
    return df.to_dict(orient="records")