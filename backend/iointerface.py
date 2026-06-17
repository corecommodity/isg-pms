# iointerface.py
# external/builtin modules
import pyodbc
import pandas as pd
from loguru import logger as log
from abc import ABC, abstractmethod
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
#
# in-house modules
from config import settings


class IOInterface(ABC):

    @abstractmethod
    def read(self) -> pd.DataFrame:
        pass


class SQLReader(IOInterface):
    JAM_ENGINE = create_engine(settings.jam_db_url, pool_pre_ping=True)
    jam_session = sessionmaker(bind=JAM_ENGINE, autoflush=False, autocommit=False)

    def __init__(self):
        # self.conn = pyodbc.connect(
        #     "DRIVER={ODBC Driver 17 for SQL Server};"
        #     "SERVER=CSMBHUL1141\\SQLEXPRESS;"
        #     "DATABASE=jam;"
        #     "Trusted_Connection=yes;"
        # )
        #self.conn = pyodbc.connect(
        #    "DRIVER={ODBC Driver 17 for SQL Server};"
        #    "SERVER=host.docker.internal,1433;"
        #    "DATABASE=jam;"
        #    "UID=sa;"
        #    "PWD=StrongPassword123!;"
        #    "TrustServerCertificate=yes;"
        #)
        pass 

    def get_jam(self):
        db = SQLReader.jam_session()
        try:
            log.info("Delegating a db handle") 
            yield db
        finally:
            log.info("post op: flush and clean db handle") 
            db.flush()
            db.close()

    def read(self) -> pd.DataFrame:
        pass
    
    def test_read(self) -> pd.DataFrame:
        query = "SELECT * FROM jam.idx.CommodityIndex"
        with SQLReader.JAM_ENGINE.connect() as conn:
            return pd.read_sql(query, conn)
        
    def read_jcp_clients(self) -> pd.DataFrame:
        query = "SELECT clientId FROM jfp.dbo.jcpClients"
        with SQLReader.JAM_ENGINE.connect() as conn:
            return pd.read_sql(query, conn)
    

class CSVReader(IOInterface):

    files = {
        "account_value": "csv/Account_Value.csv",
        "cash": "csv/cash.csv",
        "fixed_income": "csv/Fixed_Income.csv",
        "jcpClients": "csv/jcpClients.csv",
    }

    def read(self, report_name: str) -> pd.DataFrame:
        return pd.read_csv(self.files[report_name])
    
    def read_jcp_clients(self) -> pd.DataFrame:
        return pd.read_csv(self.files["jcpClients"])

io = SQLReader() if settings.environment == "prod" else CSVReader() 

