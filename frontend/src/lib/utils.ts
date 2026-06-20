import type { Language } from "./types";

/** Tiny classNames combiner (no external dep). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Instruction appended to prompts so Claude answers in the chosen language. */
export function languageInstruction(language: Language): string {
  switch (language) {
    case "ru":
      return "Write the entire response in Russian (Русский язык).";
    case "kk":
      return "Write the entire response in Kazakh (Қазақ тілі).";
    default:
      return "Write the entire response in English.";
  }
}

/**
 * Robustly extract a JSON object from a model response that might be wrapped
 * in prose or ```json fences. Returns null if nothing parseable is found.
 */
export function extractJson<T = unknown>(text: string): T | null {
  if (!text) return null;
  // Strip code fences if present.
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) return null;
  const slice = candidate.slice(start, end + 1);
  try {
    return JSON.parse(slice) as T;
  } catch {
    return null;
  }
}

export function clampScore(n: unknown): number {
  const v = typeof n === "number" ? n : Number(n);
  if (Number.isNaN(v)) return 0;
  return Math.max(0, Math.min(100, Math.round(v)));
}
