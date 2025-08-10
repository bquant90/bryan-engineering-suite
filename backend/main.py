"""
FastAPI main application entry point for Bryan Engineering Suite.

This module creates and configures the FastAPI application with:
- CORS middleware for frontend integration
- API route registration
- Health check endpoints
- Development server configuration

Bryan Engineering Suite - Modern Python Backend
"""
from typing import Dict, Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.calculator import router as calculator_router

# Create FastAPI app
app = FastAPI(
    title="Bryan Engineering Suite API",
    description="Professional engineering calculation tools",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative React port
        "http://127.0.0.1:5173",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",  # Vercel deployments
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(calculator_router, prefix="/api/v1", tags=["calculators"])

# Root endpoint
@app.get("/")
async def root() -> Dict[str, Any]:
    """Root endpoint providing API information."""
    return {
        "message": "Bryan Engineering Suite API",
        "version": "1.0.0",
        "docs": "/api/docs"
    }

@app.get("/health")
async def health_check() -> Dict[str, str]:
    """Health check endpoint for monitoring."""
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
