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

  // DEMO MODE — no API key configured.
  if (!client) return demoStream(demoLesson(input));

  const { system, user } = lessonPrompt(input);
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const llm = client.messages.stream({
          model: MODEL,
          max_tokens: 3500,
          system,
          messages: [{ role: "user", content: user }],
        });
        for await (const event of llm) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        controller.close();
      } catch (err) {
        // Never fail in front of an audience — fall back to demo content.
        console.error("Lesson generation failed, using demo content:", err);
        controller.enqueue(encoder.encode(demoLesson(input)));
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: streamHeaders });
}
