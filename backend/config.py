import sys
from loguru import logger
from pydantic_settings import BaseSettings

# Remove the default stderr handler
# Add a new handler pointing to stdout
logger.remove() 
logger.add(sys.stdout, level="INFO")

class Settings(BaseSettings):
    jam_db_url: str
    environment: str

    class Config:
        env_file = ".env"
    
settings = Settings()
