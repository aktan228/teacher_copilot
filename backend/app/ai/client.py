import os
from anthropic import Anthropic

MODEL = os.getenv("ANTHROPIC_MODEL", "claude-opus-4-8")


def has_api_key() -> bool:
    key = os.getenv("ANTHROPIC_API_KEY", "").strip()
    return bool(key)


def get_client() -> Anthropic | None:
    if not has_api_key():
        return None
    return Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
