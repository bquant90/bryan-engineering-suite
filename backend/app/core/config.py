"""
Configuration settings for the FastAPI application
"""
from pydantic import BaseSettings
from typing import List

class Settings(BaseSettings):
    """Application settings"""
    
    # App info
    app_name: str = "Bryan Engineering Suite API"
    app_version: str = "1.0.0"
    description: str = "Professional engineering calculation tools"
    
    # Server settings
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = True
    
    # CORS settings
    allowed_origins: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000", 
        "http://127.0.0.1:5173"
    ]
    
    # API settings
    api_prefix: str = "/api/v1"
    docs_url: str = "/api/docs"
    redoc_url: str = "/api/redoc"
    
    class Config:
        env_file = ".env"

# Create settings instance
settings = Settings()
