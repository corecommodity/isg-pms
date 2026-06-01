# iointerface.py
from abc import ABC, abstractmethod
import pandas as pd
import pyodbc


class IOInterface(ABC):

    @abstractmethod
    def read(self) -> pd.DataFrame:
        pass


class SQLReader(IOInterface):

    def __init__(self):
        self.conn = pyodbc.connect(
            "DRIVER={ODBC Driver 17 for SQL Server};"
            "SERVER=CSMBHUL1141\\SQLEXPRESS;"
            "DATABASE=jam;"
            "Trusted_Connection=yes;"
        )

    def read(self) -> pd.DataFrame:
        query = "SELECT * FROM idx.CommodityIndex"
        df = pd.read_sql(query, self.conn)
        return df
    

    
class CSVReader(IOInterface):
    
    account_value = "csv/Account_Value.csv"

    def read(self) -> pd.DataFrame:
        return pd.read_csv(self.account_value)    