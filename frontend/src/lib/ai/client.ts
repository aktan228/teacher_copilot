import OpenAI from "openai";

export const MODEL = process.env.OPENROUTER_MODEL?.trim() || "anthropic/claude-opus-4-8";

export function hasApiKey(): boolean {
  return Boolean(process.env.OPENROUTER_API_KEY && process.env.OPENROUTER_API_KEY.trim());
}

let cached: OpenAI | null = null;

export function getClient(): OpenAI | null {
  if (!hasApiKey()) return null;
  if (!cached) {
    cached = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": "https://teacher-copilot.app",
        "X-Title": "Teacher Copilot",
      },
    });
  }
  return cached;
}
