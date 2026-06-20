"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { Markdown } from "@/components/markdown";
import { LanguageSelect } from "@/components/language-select";
import { streamText } from "@/lib/stream-client";
import { cn } from "@/lib/utils";
import type { ChatMessage, Language } from "@/lib/types";

const SUGGESTIONS = [
  "How do I explain Newton's laws to 7th graders?",
  "Give me 3 icebreakers for the first day of class.",
  "Ideas to make a history lesson more engaging?",
  "How can I support a struggling reader?",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<Language>("en");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    setInput("");
    const next: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setLoading(true);
    try {
      await streamText(
        "/api/assistant",
        { messages: next, language },
        (delta) =>
          setMessages((cur) => {
            const copy = [...cur];
            const last = copy[copy.length - 1];
            copy[copy.length - 1] = { role: "assistant", content: last.content + delta };
            return copy;
          }),
      );
    } catch {
      setMessages((cur) => {
        const copy = [...cur];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Sorry — something went wrong. Please try again.",
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="flex h-[calc(100vh-9rem)] flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-ink">AI Assistant</h2>
            <p className="text-sm text-ink-soft">Your classroom-ready teaching expert</p>
          </div>
        </div>
        <div className="w-40">
          <LanguageSelect value={language} onChange={setLanguage} label="" />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        {empty ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <LogoMark className="h-14 w-14" />
            <p className="mt-4 text-lg font-semibold text-ink">How can I help you teach today?</p>
            <p className="mt-1 max-w-sm text-sm text-ink-soft">
              Ask about lesson ideas, explanations, classroom strategies, or anything else.
            </p>
            <div className="mt-6 grid w-full max-w-lg gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-left text-sm text-ink-soft transition hover:border-brand-200 hover:bg-brand-50/40 hover:text-ink"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
                {m.role === "assistant" && (
                  <LogoMark className="h-8 w-8 shrink-0" />
                )}
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                    m.role === "user"
                      ? "bg-brand-600 text-white"
                      : "bg-slate-50 text-ink",
                  )}
                >
                  {m.role === "assistant" ? (
                    m.content ? (
                      <Markdown content={m.content} className="prose-sm" />
                    ) : (
                      <TypingDots />
                    )
                  ) : (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-3 flex items-end gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-soft focus-within:border-brand-300 focus-within:ring-2 focus-within:ring-brand-100"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          rows={1}
          placeholder="Ask your teaching assistant…"
          className="max-h-32 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white transition hover:bg-brand-700 disabled:bg-brand-300"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </form>
      <p className="mt-2 text-center text-xs text-ink-muted">
        Teacher Copilot can make mistakes. Review important information.
      </p>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-pulse-soft rounded-full bg-slate-400"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </span>
  );
}
