// Shared domain types for Teacher Copilot.

export type Language = "en" | "ru" | "kk";

export const LANGUAGES: { value: Language; label: string; flag: string }[] = [
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "ru", label: "Русский", flag: "🇷🇺" },
  { value: "kk", label: "Қазақша", flag: "🇰🇿" },
];

export type Difficulty = "easy" | "medium" | "hard";

export type QuestionType = "multiple_choice" | "true_false" | "open";

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  multiple_choice: "Multiple choice",
  true_false: "True / False",
  open: "Open question",
};

// ── Lesson Planner ──────────────────────────────────────────
export interface LessonInput {
  subject: string;
  grade: string;
  topic: string;
  durationMinutes: number;
  language: Language;
  notes?: string;
}

// ── Quiz Generator ──────────────────────────────────────────
export interface QuizInput {
  subject: string;
  grade: string;
  topic: string;
  numQuestions: number;
  difficulty: Difficulty;
  types: QuestionType[];
  language: Language;
}

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

// ── Assignment Grader ───────────────────────────────────────
export interface GradeInput {
  subject: string;
  grade: string;
  question: string;
  studentAnswer: string;
  rubric?: string;
  language: Language;
}

export interface GradeResult {
  score: number; // 0–100
  summary: string;
  strengths: string[];
  mistakes: string[];
  recommendations: string[];
}

// ── Teacher Assistant ───────────────────────────────────────
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
