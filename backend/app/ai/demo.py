"""Realistic demo content — returned when no API key is set."""
import json
import math


def demo_lesson(subject: str, grade: str, topic: str, duration: int, **_) -> str:
    hook = max(5, math.floor(duration * 0.1))
    teach = max(10, math.floor(duration * 0.3))
    practice = max(10, math.floor(duration * 0.35))
    wrap = duration - hook - teach - practice

    return f"""\
> _Demo content — add an Anthropic API key in `.env` to generate tailored plans with Claude._

## Learning Objectives
By the end of this lesson, students will be able to:
- Explain the key ideas behind **{topic}** in their own words
- Apply {topic} concepts to solve at least two practice problems
- Evaluate real-world examples connected to {topic}

## Materials Needed
- Whiteboard and markers
- Student notebooks / lab sheets
- {subject} textbook (chapter on {topic})
- Optional: short video clip (2–3 min) introducing {topic}

## Lesson Flow

| Phase | Duration | Teacher Activity | Student Activity |
|-------|----------|-----------------|-----------------|
| Hook | {hook} min | Present a surprising fact or question about {topic} | Think-pair-share initial ideas |
| Teach | {teach} min | Direct instruction with examples | Take notes, ask questions |
| Practice | {practice} min | Circulate and give feedback | Work through 2–3 guided problems |
| Wrap-up | {wrap} min | Summarize key points | Complete exit ticket |

## Core Explanation
Introduce **{topic}** by connecting it to something students already know. Use at least two concrete examples — one familiar from daily life and one from {subject}. Write the key definition on the board and have students copy it in their own words.

## Practice Activities
1. **Guided practice** — Solve one example together as a class, thinking aloud.
2. **Partner work** — Students work in pairs on 2 problems, then compare answers.
3. **Challenge** (optional) — One extension problem for early finishers.

## Differentiation Strategies
- **Support:** Provide a partially filled graphic organiser; allow partner reading.
- **Extension:** Ask students to create their own example problem and swap with a partner.
- **ELL:** Pre-teach key vocabulary; allow responses in first language.

## Homework Assignment
Complete 3 practice problems on {topic} from the textbook (or provided sheet).
Write a 3-sentence reflection: *What did you learn? What confused you? Where do you see this in real life?*

## Discussion Questions
1. How does {topic} connect to what we studied last week?
2. Can you think of a real-world situation where understanding {topic} matters?
3. What would happen if {topic} worked differently?

## Exit Ticket
On a sticky note, write:
- **One thing** you learned today about {topic}
- **One question** you still have

*(Collect at the door — use to plan tomorrow's warm-up.)*
"""


def demo_quiz(subject: str, grade: str, topic: str, num: int, difficulty: str, types: list[str], **_) -> dict:
    questions = []
    for i in range(1, num + 1):
        q_type = types[(i - 1) % len(types)]
        if q_type == "multiple_choice":
            questions.append({
                "id": i,
                "type": "multiple_choice",
                "question": f"Which of the following best describes {topic}?",
                "options": [
                    f"A clear, correct statement about {topic}",
                    f"A common misconception about {topic}",
                    "An unrelated statement",
                    "A partially-true but incomplete statement",
                ],
                "answer": f"A clear, correct statement about {topic}",
                "explanation": f"Option A is correct because it accurately captures the core idea of {topic}.",
            })
        elif q_type == "true_false":
            questions.append({
                "id": i,
                "type": "true_false",
                "question": f"{topic} is an important concept in {subject}.",
                "options": ["True", "False"],
                "answer": "True",
                "explanation": f"True — {topic} is foundational to {subject} at the {grade} level.",
            })
        else:
            questions.append({
                "id": i,
                "type": "open",
                "question": f"Explain {topic} in your own words and give one real-world example.",
                "answer": f"A complete answer defines {topic} clearly, explains why it matters in {subject}, and provides a relevant example.",
                "explanation": "Look for: accurate definition, correct reasoning, and a concrete example.",
            })
    return {
        "title": f"{topic} — {subject} Quiz ({grade})",
        "questions": questions,
    }


def demo_grade(subject: str, grade: str, question: str, student_answer: str, **_) -> dict:
    word_count = len(student_answer.split())
    score = max(55, min(92, 55 + word_count * 2))
    return {
        "score": score,
        "summary": f"A solid attempt that shows real understanding of the {subject} task, with a few areas to refine.",
        "strengths": [
            "Addresses the main part of the question directly",
            "Uses relevant subject vocabulary",
            "Shows a logical line of reasoning",
        ],
        "mistakes": [
            "One step in the explanation could be more precise",
            "The example given is partially correct but incomplete",
        ],
        "recommendations": [
            f"Review the core definition of this {subject} concept once more",
            "Practice explaining ideas with a concrete real-world example",
            "Re-read your answer and check each claim against your notes",
        ],
    }


def demo_assistant(question: str) -> str:
    return f"""\
Great question about teaching!

Here are four practical strategies you can use right away:

1. **Start with prior knowledge** — Connect the new concept to something students already understand. A quick "think-pair-share" works well here.

2. **Use concrete before abstract** — Introduce the idea through a real example or hands-on activity before showing the formal definition.

3. **Check for understanding early** — Ask a quick exit question halfway through your explanation, not just at the end. This lets you adjust in the moment.

4. **Differentiate the practice** — Offer the same core task at two levels of difficulty so every student is challenged without anyone being left behind.

Would you like me to tailor any of these strategies for a specific subject or grade level?
"""
