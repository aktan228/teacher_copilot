from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import lesson, quiz, grade, assistant

app = FastAPI(title="Teacher Copilot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lesson.router)
app.include_router(quiz.router)
app.include_router(grade.router)
app.include_router(assistant.router)


@app.get("/health")
def health():
    from .ai.client import has_api_key
    return {"status": "ok", "ai_mode": "live" if has_api_key() else "demo"}
