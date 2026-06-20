from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from ..ai.client import get_client, MODEL
from ..ai.prompts import assistant_system
from ..ai.demo import demo_assistant

router = APIRouter()


class ChatMessage(BaseModel):
    role: str
    content: str


class AssistantInput(BaseModel):
    messages: list[ChatMessage]
    language: str = "en"


@router.post("/api/assistant")
async def chat(body: AssistantInput):
    client = get_client()
    last_user = next(
        (m.content for m in reversed(body.messages) if m.role == "user"), ""
    )

    if client is None:
        text = demo_assistant(last_user)

        async def demo_stream():
            words = text.split(" ")
            chunk: list[str] = []
            for i, word in enumerate(words):
                chunk.append(word)
                if len(chunk) >= 5 or i == len(words) - 1:
                    yield " ".join(chunk) + " "
                    chunk = []

        return StreamingResponse(demo_stream(), media_type="text/plain; charset=utf-8")

    anthropic_messages = [{"role": m.role, "content": m.content} for m in body.messages]

    async def live_stream():
        try:
            with client.messages.stream(
                model=MODEL,
                max_tokens=2048,
                system=assistant_system(body.language),
                messages=anthropic_messages,
            ) as stream:
                for text in stream.text_stream:
                    yield text
        except Exception:
            yield demo_assistant(last_user)

    return StreamingResponse(live_stream(), media_type="text/plain; charset=utf-8")
