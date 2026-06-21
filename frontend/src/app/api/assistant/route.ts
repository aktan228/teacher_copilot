import type { NextRequest } from "next/server";
import { getClient, MODEL } from "@/lib/ai/client";
import { assistantSystem } from "@/lib/ai/prompts";
import { demoAssistant } from "@/lib/ai/demo";
import { demoStream, streamHeaders } from "@/lib/ai/stream";
import type { ChatMessage, Language } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Body {
  messages: ChatMessage[];
  language?: Language;
}

export async function POST(req: NextRequest) {
  const { messages, language = "en" } = (await req.json()) as Body;
  const last = [...messages].reverse().find((m) => m.role === "user");
  const client = getClient();

  if (!client) return demoStream(demoAssistant(last?.content ?? ""));

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const llm = await client.chat.completions.create({
          model: MODEL,
          max_tokens: 1500,
          messages: [
            { role: "system", content: assistantSystem(language) },
            ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
          ],
          stream: true,
        });
        for await (const chunk of llm) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      } catch (err) {
        console.error("Assistant failed, using demo content:", err);
        controller.enqueue(encoder.encode(demoAssistant(last?.content ?? "")));
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: streamHeaders });
}
