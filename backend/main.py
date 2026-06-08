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

@app.get("/commodity_index")
def commodity_index():
    df = SQLReader().read()
    print("\n===== DATA FROM CommodityIndex =====\n")
    return df.to_dict(orient="records")

# API for account_value Table
@app.get("/account_value")
def account_value():
    df = CSVReader().read("account_value") 
    df = df.fillna("")
    row = {
        "Client": "Total",
        "NAV": df["NAV"].sum(),
        "Flows": df["Flows"].sum(),
        "Net NAV": df["Net NAV"].sum(),
        "Over/Under": "",
        "Over/Under.1": "",
        "Cmdty": "",
        "Cmdty.1": "",
        "Equity": "",
        "Equity.1": ""
    }
    df.loc[len(df)] = row

    print("\n===== DATA FROM Account_Value =====\n")
    return df.to_dict(orient="records")

# API for cash Table
@app.get("/cash")
def cash():
    df = CSVReader().read("cash")
    df = df.fillna("")
    print("\n===== DATA FROM Cash =====\n")
    return df.to_dict(orient="records")

# API for fixed_income Table
@app.get("/fixed_income")
def fixed_income():
    df = CSVReader().read("fixed_income")
    df = df.fillna("")
    print("\n===== DATA FROM Fixed_Income =====\n")
    return df.to_dict(orient="records")