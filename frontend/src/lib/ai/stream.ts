import { sleep } from "../utils";

export const streamHeaders = {
  "Content-Type": "text/plain; charset=utf-8",
  "Cache-Control": "no-store, no-transform",
  // Disable proxy buffering so chunks reach the browser immediately.
  "X-Accel-Buffering": "no",
};

/**
 * Stream pre-written text back word-by-word so DEMO MODE feels identical to a
 * live model response.
 */
export function demoStream(text: string): Response {
  const encoder = new TextEncoder();
  const tokens = text.split(/(\s+)/); // keep whitespace tokens
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      for (let i = 0; i < tokens.length; i++) {
        buffer += tokens[i];
        if (i % 5 === 0) {
          controller.enqueue(encoder.encode(buffer));
          buffer = "";
          await sleep(14);
        }
      }
      if (buffer) controller.enqueue(encoder.encode(buffer));
      controller.close();
    },
  });
  return new Response(stream, { headers: streamHeaders });
}
