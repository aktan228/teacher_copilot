import Anthropic from "@anthropic-ai/sdk";

/**
 * Central place for AI configuration so features stay model-agnostic and the
 * AI layer is easy to swap (PRD priority: "keep AI features replaceable").
 */
export const MODEL = process.env.ANTHROPIC_MODEL?.trim() || "claude-opus-4-8";

/** True when a real API key is configured; otherwise we serve demo content. */
export function hasApiKey(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY.trim());
}

let cached: Anthropic | null = null;

/** Returns a configured client, or null when running in demo mode. */
export function getClient(): Anthropic | null {
  if (!hasApiKey()) return null;
  if (!cached) cached = new Anthropic();
  return cached;
}
