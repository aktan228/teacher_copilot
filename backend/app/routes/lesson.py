from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from ..ai.client import get_client, MODEL
from ..ai.prompts import lesson_system, lesson_user
from ..ai.demo import demo_lesson

router = APIRouter()


class LessonInput(BaseModel):
    subject: str
    grade: str
    topic: str
    durationMinutes: int = 45
    language: str = "en"
    notes: str | None = None


@router.post("/api/generate/lesson")
async def generate_lesson(body: LessonInput):
    client = get_client()

    if client is None:
        text = demo_lesson(
            subject=body.subject,
            grade=body.grade,
            topic=body.topic,
            duration=body.durationMinutes,
        )

        async def demo_stream():
            words = text.split(" ")
            chunk: list[str] = []
            for i, word in enumerate(words):
                chunk.append(word)
                if len(chunk) >= 5 or i == len(words) - 1:
                    yield " ".join(chunk) + " "
                    chunk = []

        return StreamingResponse(demo_stream(), media_type="text/plain; charset=utf-8")

    system = lesson_system()
    user = lesson_user(
        subject=body.subject,
        grade=body.grade,
        topic=body.topic,
        duration=body.durationMinutes,
        lang=body.language,
        notes=body.notes,
    )

    async def live_stream():
        try:
            with client.messages.stream(
                model=MODEL,
                max_tokens=4096,
                system=system,
                messages=[{"role": "user", "content": user}],
            ) as stream:
                for text in stream.text_stream:
                    yield text
        except Exception:
            fallback = demo_lesson(
                subject=body.subject,
                grade=body.grade,
                topic=body.topic,
                duration=body.durationMinutes,
            )
            yield fallback

    return StreamingResponse(live_stream(), media_type="text/plain; charset=utf-8")
