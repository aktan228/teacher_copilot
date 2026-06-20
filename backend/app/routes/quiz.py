import json
import re
from fastapi import APIRouter
from pydantic import BaseModel
from ..ai.client import get_client, MODEL
from ..ai.prompts import quiz_system, quiz_user
from ..ai.demo import demo_quiz

router = APIRouter()


class QuizInput(BaseModel):
    subject: str
    grade: str
    topic: str
    numQuestions: int = 5
    difficulty: str = "medium"
    types: list[str] = ["multiple_choice"]
    language: str = "en"


def extract_json(text: str) -> dict:
    text = re.sub(r"```(?:json)?", "", text).strip().rstrip("`").strip()
    start = text.find("{")
    if start == -1:
        raise ValueError("No JSON object found")
    return json.loads(text[start:])


@router.post("/api/generate/quiz")
async def generate_quiz(body: QuizInput):
    client = get_client()

    if client is None:
        return demo_quiz(
            subject=body.subject,
            grade=body.grade,
            topic=body.topic,
            num=body.numQuestions,
            difficulty=body.difficulty,
            types=body.types,
        )

    try:
        message = client.messages.create(
            model=MODEL,
            max_tokens=4096,
            system=quiz_system(),
            messages=[{
                "role": "user",
                "content": quiz_user(
                    subject=body.subject,
                    grade=body.grade,
                    topic=body.topic,
                    num=body.numQuestions,
                    difficulty=body.difficulty,
                    types=body.types,
                    lang=body.language,
                ),
            }],
        )
        return extract_json(message.content[0].text)
    except Exception:
        return demo_quiz(
            subject=body.subject,
            grade=body.grade,
            topic=body.topic,
            num=body.numQuestions,
            difficulty=body.difficulty,
            types=body.types,
        )
