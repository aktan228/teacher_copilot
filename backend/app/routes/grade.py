import json
import re
from fastapi import APIRouter
from pydantic import BaseModel
from ..ai.client import get_client, MODEL
from ..ai.prompts import grade_system, grade_user
from ..ai.demo import demo_grade

router = APIRouter()


class GradeInput(BaseModel):
    subject: str
    grade: str
    question: str
    studentAnswer: str
    rubric: str | None = None
    language: str = "en"


def extract_json(text: str) -> dict:
    text = re.sub(r"```(?:json)?", "", text).strip().rstrip("`").strip()
    start = text.find("{")
    if start == -1:
        raise ValueError("No JSON found")
    return json.loads(text[start:])


def clamp(score: int) -> int:
    return max(0, min(100, score))


@router.post("/api/grade")
async def grade_answer(body: GradeInput):
    client = get_client()

    if client is None:
        return demo_grade(
            subject=body.subject,
            grade=body.grade,
            question=body.question,
            student_answer=body.studentAnswer,
        )

    try:
        message = client.messages.create(
            model=MODEL,
            max_tokens=1024,
            system=grade_system(),
            messages=[{
                "role": "user",
                "content": grade_user(
                    subject=body.subject,
                    grade=body.grade,
                    question=body.question,
                    answer=body.studentAnswer,
                    rubric=body.rubric,
                    lang=body.language,
                ),
            }],
        )
        result = extract_json(message.content[0].text)
        result["score"] = clamp(int(result.get("score", 0)))
        return result
    except Exception:
        return demo_grade(
            subject=body.subject,
            grade=body.grade,
            question=body.question,
            student_answer=body.studentAnswer,
        )
