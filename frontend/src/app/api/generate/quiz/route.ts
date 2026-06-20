import { NextResponse, type NextRequest } from "next/server";
import { getClient, MODEL } from "@/lib/ai/client";
import { quizPrompt } from "@/lib/ai/prompts";
import { demoQuiz } from "@/lib/ai/demo";
import { extractJson } from "@/lib/utils";
import type { Quiz, QuizInput } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const input = (await req.json()) as QuizInput;
  const client = getClient();

  if (!client) return NextResponse.json(demoQuiz(input));

  try {
    const { system, user } = quizPrompt(input);
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 3500,
      system,
      messages: [{ role: "user", content: user }],
    });
    const text = msg.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    const parsed = extractJson<Quiz>(text);

    if (!parsed || !Array.isArray(parsed.questions) || parsed.questions.length === 0) {
      return NextResponse.json(demoQuiz(input));
    }

    parsed.questions = parsed.questions.map((q, i) => ({ ...q, id: i + 1 }));
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Quiz generation failed, using demo content:", err);
    return NextResponse.json(demoQuiz(input));
  }
}
