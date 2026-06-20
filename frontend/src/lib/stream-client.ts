// Reads a streaming text response from our API routes chunk-by-chunk.
export async function streamText(
  url: string,
  body: unknown,
  onDelta: (text: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  if (!res.body) {
    onDelta(await res.text());
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) onDelta(decoder.decode(value, { stream: true }));
  }
}
