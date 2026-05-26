from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from iointerface import SQLReader 
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def get_data():
    reader = SQLReader()
    df = reader.read()
    print("\n===== DATA FROM CommodityIndex =====\n")
    print(df.head()) 
    return {"message": "Hello World 🚀"}

