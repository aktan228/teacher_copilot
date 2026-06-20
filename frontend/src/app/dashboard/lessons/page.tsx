"use client";

import { useState } from "react";
import { BookOpen, Download, FileText, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button, Card, Field, Input, Select, Textarea, Spinner } from "@/components/ui";
import { LanguageSelect } from "@/components/language-select";
import { Markdown } from "@/components/markdown";
import { CopyButton } from "@/components/copy-button";
import { streamText } from "@/lib/stream-client";
import type { Language, LessonInput } from "@/lib/types";

export default function LessonsPage() {
  const [subject, setSubject] = useState("Biology");
  const [grade, setGrade] = useState("Grade 8");
  const [topic, setTopic] = useState("Photosynthesis");
  const [duration, setDuration] = useState(45);
  const [language, setLanguage] = useState<Language>("en");
  const [notes, setNotes] = useState("");

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutput("");
    const input: LessonInput = {
      subject,
      grade,
      topic,
      durationMinutes: duration,
      language,
      notes: notes.trim() || undefined,
    };
    try {
      await streamText("/api/generate/lesson", input, (delta) =>
        setOutput((o) => o + delta),
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function download() {
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lesson-${topic.toLowerCase().replace(/\s+/g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        icon={BookOpen}
        title="Lesson Planner"
        description="Turn any topic into a complete, ready-to-teach lesson plan."
        color="brand"
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <Card className="self-start p-5 lg:col-span-2 lg:sticky lg:top-24">
          <form onSubmit={generate} className="space-y-4">
            <Field label="Subject" htmlFor="subject">
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Biology" required />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Grade / level" htmlFor="grade">
                <Input id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="e.g. Grade 8" required />
              </Field>
              <Field label="Duration" htmlFor="duration">
                <Select id="duration" value={duration} onChange={(e) => setDuration(Number(e.target.value))}>
                  {[30, 45, 60, 90].map((d) => (
                    <option key={d} value={d}>{d} minutes</option>
                  ))}
                </Select>
              </Field>
            </div>
            <Field label="Topic" htmlFor="topic">
              <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Photosynthesis" required />
            </Field>
            <LanguageSelect value={language} onChange={setLanguage} />
            <Field label="Notes (optional)" htmlFor="notes" hint="Anything specific to include or emphasize.">
              <Textarea id="notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Include a hands-on experiment" />
            </Field>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? <Spinner /> : <Sparkles className="h-4 w-4" />}
              {loading ? "Generating…" : "Generate lesson"}
            </Button>
            {error && <p className="text-sm text-rose-600">{error}</p>}
          </form>
        </Card>

        {/* Output */}
        <Card className="min-h-[28rem] p-6 lg:col-span-3">
          {output ? (
            <div>
              <div className="mb-4 flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <p className="text-sm font-semibold text-ink">
                  {subject} · {topic} · {grade}
                </p>
                <div className="flex gap-2">
                  <CopyButton text={output} />
                  <Button variant="secondary" size="sm" onClick={download} type="button">
                    <Download className="h-4 w-4" /> .md
                  </Button>
                </div>
              </div>
              <Markdown content={output} />
              {loading && <span className="ml-0.5 inline-block h-4 w-2 animate-pulse-soft bg-brand-400 align-middle" />}
            </div>
          ) : loading ? (
            <SkeletonLines />
          ) : (
            <EmptyState />
          )}
        </Card>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
        <FileText className="h-7 w-7" />
      </span>
      <p className="mt-4 font-semibold text-ink">Your lesson plan will appear here</p>
      <p className="mt-1 max-w-xs text-sm text-ink-soft">
        Fill in the details and hit <span className="font-medium text-ink">Generate lesson</span> to see the magic.
      </p>
    </div>
  );
}

function SkeletonLines() {
  return (
    <div className="space-y-3">
      {[100, 70, 90, 60, 95, 80, 50].map((w, i) => (
        <div
          key={i}
          className="shimmer h-4 rounded bg-slate-100"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
}
