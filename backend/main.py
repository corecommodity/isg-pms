import os
from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
#
# in-house modules
from iointerface import io
from iointerface import SQLReader, CSVReader

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
print(io.__class__.__name__)

@app.get("/commodity_index")
def commodity_index():
    df = io.test_read()
    print("\n===== DATA FROM CommodityIndex =====\n")
    return df.to_dict(orient="records")

# API for account_value Table
@app.get("/account_value")
def account_value():
    df = io.read("account_value")
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
    df = io.read("cash")
    df = df.fillna("")
    print("\n===== DATA FROM Cash =====\n")
    return df.to_dict(orient="records")

# API for fixed_income Table
@app.get("/fixed_income")
def fixed_income():
    df = io.read("fixed_income")
    df = df.fillna("")
    print("\n===== DATA FROM Fixed_Income =====\n")
    return df.to_dict(orient="records")

@app.get("/test/io/v1")
def test_io_v1():
    df = pd.DataFrame()
    f = "select clientId from jfp.dbo.jcpClients" 
    with next(io.get_jam()).connection() as conn:
        df = pd.read_sql(f, conn, params=[])
    return df


@app.get("/jcp_clients")
def jcp_clients():
    df = io.read_jcp_clients()
    return df.to_dict()