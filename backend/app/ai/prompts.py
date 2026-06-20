"""Prompt factories — mirrors src/lib/ai/prompts.ts exactly."""

LANGUAGE_INSTRUCTIONS = {
    "en": "Respond entirely in English.",
    "ru": "Отвечай полностью на русском языке.",
    "kk": "Толығымен қазақ тілінде жауап бер.",
}


def language_instruction(lang: str) -> str:
    return LANGUAGE_INSTRUCTIONS.get(lang, LANGUAGE_INSTRUCTIONS["en"])


# ── Lesson ────────────────────────────────────────────────────────────────────
def lesson_system() -> str:
    return (
        "You are an expert curriculum designer and master teacher. "
        "You create detailed, practical, and engaging lesson plans. "
        "Always respond in well-structured Markdown."
    )


def lesson_user(subject: str, grade: str, topic: str, duration: int, lang: str, notes: str | None) -> str:
    extra = f"\n\nAdditional notes: {notes}" if notes else ""
    return f"""\
Create a complete lesson plan with these exact sections:

## Learning Objectives
## Materials Needed
## Lesson Flow
(A markdown table with columns: Phase | Duration | Teacher Activity | Student Activity)
## Core Explanation
## Practice Activities
## Differentiation Strategies
## Homework Assignment
## Discussion Questions
## Exit Ticket

Details:
- Subject: {subject}
- Grade/Level: {grade}
- Topic: {topic}
- Duration: {duration} minutes
- {language_instruction(lang)}{extra}

Be specific, practical, and classroom-ready."""


# ── Quiz ─────────────────────────────────────────────────────────────────────
def quiz_system() -> str:
    return (
        "You are an expert educator who creates high-quality assessments. "
        "Respond with ONLY valid JSON — no prose, no code fences."
    )


def quiz_user(subject: str, grade: str, topic: str, num: int, difficulty: str, types: list[str], lang: str) -> str:
    type_str = ", ".join(types)
    return f"""\
Create a {difficulty} quiz on "{topic}" for {subject}, {grade}.
Generate exactly {num} questions using these types (cycle if needed): {type_str}.

Return ONLY this JSON structure:
{{
  "title": "Quiz title",
  "questions": [
    {{
      "id": 1,
      "type": "multiple_choice",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "answer": "A",
      "explanation": "..."
    }},
    {{
      "id": 2,
      "type": "true_false",
      "question": "...",
      "options": ["True", "False"],
      "answer": "True",
      "explanation": "..."
    }},
    {{
      "id": 3,
      "type": "open",
      "question": "...",
      "answer": "Model answer...",
      "explanation": "..."
    }}
  ]
}}

{language_instruction(lang)}
Return ONLY the JSON object, nothing else."""


# ── Grade ─────────────────────────────────────────────────────────────────────
def grade_system() -> str:
    return (
        "You are a fair, constructive teacher who grades student work. "
        "Respond with ONLY valid JSON — no prose, no code fences."
    )


def grade_user(subject: str, grade: str, question: str, answer: str, rubric: str | None, lang: str) -> str:
    rubric_line = f"\nRubric: {rubric}" if rubric else ""
    return f"""\
Grade this student answer.

Subject: {subject}
Grade level: {grade}
Question: {question}
Student's answer: {answer}{rubric_line}

Return ONLY this JSON:
{{
  "score": 0-100,
  "summary": "One sentence overall assessment.",
  "strengths": ["strength 1", "strength 2"],
  "mistakes": ["mistake 1", "mistake 2"],
  "recommendations": ["recommendation 1", "recommendation 2"]
}}

{language_instruction(lang)}
Return ONLY the JSON object, nothing else."""


# ── Assistant ─────────────────────────────────────────────────────────────────
def assistant_system(lang: str) -> str:
    return (
        f"You are Teacher Copilot, an expert teaching assistant. "
        f"You give practical, classroom-ready advice to teachers. "
        f"Be concise, actionable, and supportive. {language_instruction(lang)}"
    )
