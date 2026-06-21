import type { NextRequest } from "next/server";
import { getClient, MODEL } from "@/lib/ai/client";
import { lessonPrompt } from "@/lib/ai/prompts";
import { demoLesson } from "@/lib/ai/demo";
import { demoStream, streamHeaders } from "@/lib/ai/stream";
import type { LessonInput } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const input = (await req.json()) as LessonInput;
  const client = getClient();

  if (!client) return demoStream(demoLesson(input));

  const { system, user } = lessonPrompt(input);
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const llm = await client.chat.completions.create({
          model: MODEL,
          max_tokens: 3500,
          messages: [
            { role: "system", content: system },
            { role: "user", content: user },
          ],
          stream: true,
        });
        for await (const chunk of llm) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (err) {
        console.error("Lesson generation failed, using demo content:", err);
        controller.enqueue(encoder.encode(demoLesson(input)));
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: streamHeaders });
}
