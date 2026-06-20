import type { GradeInput, LessonInput, QuizInput, Language } from "../types";
import { QUESTION_TYPE_LABELS } from "../types";
import { languageInstruction } from "../utils";

export interface PromptPair {
  system: string;
  user: string;
}

// ── Lesson Planner ──────────────────────────────────────────
export function lessonPrompt(input: LessonInput): PromptPair {
  const system = [
    "You are Teacher Copilot — an expert instructional designer and pedagogy coach.",
    "You help teachers create clear, engaging, age-appropriate lesson plans grounded in good pedagogy (clear objectives, active learning, formative assessment, differentiation).",
    "Always respond in clean, well-structured GitHub-flavored Markdown using `##` section headings, bullet lists, and tables where helpful. Do not include a top-level `#` title.",
  ].join(" ");

  const user = [
    `Create a complete, ready-to-teach lesson plan.`,
    ``,
    `- Subject: ${input.subject}`,
    `- Grade / level: ${input.grade}`,
    `- Topic: ${input.topic}`,
    `- Total duration: ${input.durationMinutes} minutes`,
    input.notes ? `- Teacher notes: ${input.notes}` : ``,
    ``,
    `Include these sections:`,
    `1. **Learning Objectives** — 3–4 measurable objectives ("Students will be able to…").`,
    `2. **Materials & Preparation** — what the teacher needs.`,
    `3. **Lesson Flow** — a Markdown table with columns: Phase | Time | What the teacher does | What students do. The times must add up to ${input.durationMinutes} minutes.`,
    `4. **Core Explanation** — a concise, correct explanation of the topic written at the right level for ${input.grade}.`,
    `5. **Guided & Independent Practice** — concrete activities.`,
    `6. **Differentiation** — support for struggling learners and extension for advanced learners.`,
    `7. **Homework** — a short, meaningful assignment.`,
    `8. **Discussion Questions** — 4–5 open questions to spark thinking.`,
    `9. **Exit Ticket** — one quick formative check.`,
    ``,
    languageInstruction(input.language),
  ]
    .filter(Boolean)
    .join("\n");

  return { system, user };
}

// ── Quiz Generator ──────────────────────────────────────────
export function quizPrompt(input: QuizInput): PromptPair {
  const allowed = input.types.map((t) => QUESTION_TYPE_LABELS[t]).join(", ");

  const system = [
    "You are Teacher Copilot — an expert assessment designer.",
    "You write accurate, fair, curriculum-aligned quiz questions.",
    "You output ONLY valid minified JSON that matches the requested schema. No prose, no Markdown, no code fences.",
  ].join(" ");

  const user = [
    `Generate a quiz as a single JSON object.`,
    ``,
    `Parameters:`,
    `- Subject: ${input.subject}`,
    `- Grade / level: ${input.grade}`,
    `- Topic: ${input.topic}`,
    `- Number of questions: ${input.numQuestions}`,
    `- Difficulty: ${input.difficulty}`,
    `- Allowed question types: ${allowed}`,
    ``,
    `JSON schema (keys MUST stay in English):`,
    `{`,
    `  "title": string,`,
    `  "questions": [`,
    `    {`,
    `      "id": number,                       // 1-based`,
    `      "type": "multiple_choice" | "true_false" | "open",`,
    `      "question": string,`,
    `      "options": string[],                // 4 items for multiple_choice; ["True","False"] for true_false; omit for open`,
    `      "answer": string,                   // exact correct option, or a model answer for open questions`,
    `      "explanation": string               // why the answer is correct`,
    `    }`,
    `  ]`,
    `}`,
    ``,
    `Only use question types from the allowed list. Vary them across the quiz. Make questions genuinely about "${input.topic}".`,
    `The visible text (question, options, answer, explanation) must follow this instruction: ${languageInstruction(
      input.language,
    )}`,
  ].join("\n");

  return { system, user };
}

// ── Assignment Grader ───────────────────────────────────────
export function gradePrompt(input: GradeInput): PromptPair {
  const system = [
    "You are Teacher Copilot — a fair, encouraging, and rigorous grading assistant.",
    "You evaluate student work constructively: you recognise what is correct, identify mistakes precisely, and give actionable next steps.",
    "You output ONLY valid minified JSON that matches the requested schema. No prose, no Markdown, no code fences.",
  ].join(" ");

  const user = [
    `Grade the following student answer.`,
    ``,
    `- Subject: ${input.subject}`,
    `- Grade / level: ${input.grade}`,
    `- Question / task: ${input.question}`,
    input.rubric ? `- Rubric / criteria: ${input.rubric}` : ``,
    ``,
    `Student answer:`,
    `"""`,
    input.studentAnswer,
    `"""`,
    ``,
    `Return a single JSON object (keys MUST stay in English):`,
    `{`,
    `  "score": number,                 // 0-100`,
    `  "summary": string,               // 1-2 sentence overall judgement`,
    `  "strengths": string[],           // what the student did well`,
    `  "mistakes": string[],            // specific errors or gaps`,
    `  "recommendations": string[]      // concrete next steps / topics to review`,
    `}`,
    ``,
    `Be specific and reference the student's actual answer. The visible text must follow: ${languageInstruction(
      input.language,
    )}`,
  ]
    .filter(Boolean)
    .join("\n");

  return { system, user };
}

// ── Teacher Assistant (chat) ────────────────────────────────
export function assistantSystem(language: Language): string {
  return [
    "You are Teacher Copilot — a knowledgeable, practical teaching assistant for K-12 and secondary teachers.",
    "You give classroom-ready advice: lesson ideas, explanations pitched to a grade level, activities, behaviour strategies, and assessment help.",
    "Be concise and actionable. Use Markdown (short paragraphs, bullet lists, bold key terms). When a teacher mentions a grade or age, tailor your answer to it.",
    languageInstruction(language),
  ].join(" ");
}
