import { NextResponse, type NextRequest } from "next/server";
import { getClient, MODEL } from "@/lib/ai/client";
import { gradePrompt } from "@/lib/ai/prompts";
import { demoGrade } from "@/lib/ai/demo";
import { clampScore, extractJson } from "@/lib/utils";
import type { GradeInput, GradeResult } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const asArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x) => typeof x === "string") : [];

export async function POST(req: NextRequest) {
  const input = (await req.json()) as GradeInput;
  const client = getClient();

  if (!client) return NextResponse.json(demoGrade(input));

  try {
    const { system, user } = gradePrompt(input);
    const msg = await client.chat.completions.create({
      model: MODEL,
      max_tokens: 2000,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });
    const text = msg.choices[0]?.message?.content ?? "";
    const parsed = extractJson<GradeResult>(text);

    if (!parsed || typeof parsed.summary !== "string") {
      return NextResponse.json(demoGrade(input));
    }

    const result: GradeResult = {
      score: clampScore(parsed.score),
      summary: parsed.summary,
      strengths: asArray(parsed.strengths),
      mistakes: asArray(parsed.mistakes),
      recommendations: asArray(parsed.recommendations),
    };
    return NextResponse.json(result);
  } catch (err) {
    console.error("Grading failed, using demo content:", err);
    return NextResponse.json(demoGrade(input));
  }
}
