from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.risk import router as risk_router


app = FastAPI(
    title="CivicShield API",
    description="AI-powered disaster intelligence and flood risk API",
    version="1.0.0"
)


# React development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():

    return {
        "message": "CivicShield API is running",
        "status": "online"
    }


app.include_router(risk_router)