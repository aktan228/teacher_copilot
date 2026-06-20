"use client";

import { useState } from "react";
import {
  ClipboardCheck,
  Lightbulb,
  Sparkles,
  ThumbsUp,
  TriangleAlert,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button, Card, Field, Input, Textarea, Spinner } from "@/components/ui";
import { LanguageSelect } from "@/components/language-select";
import { cn } from "@/lib/utils";
import type { GradeInput, GradeResult, Language } from "@/lib/types";

function scoreColor(s: number) {
  if (s >= 85) return { ring: "text-emerald-500", text: "text-emerald-600", label: "Excellent" };
  if (s >= 70) return { ring: "text-brand-500", text: "text-brand-600", label: "Good" };
  if (s >= 50) return { ring: "text-amber-500", text: "text-amber-600", label: "Needs work" };
  return { ring: "text-rose-500", text: "text-rose-600", label: "Revisit" };
}

function ScoreRing({ score }: { score: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);
  const col = scoreColor(score);
  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 110 110" className="h-full w-full -rotate-90">
        <circle cx="55" cy="55" r={r} className="stroke-slate-100" strokeWidth="9" fill="none" />
        <circle
          cx="55"
          cy="55"
          r={r}
          className={cn("transition-all duration-700", col.ring)}
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("text-3xl font-bold", col.text)}>{score}</span>
        <span className="text-xs font-medium text-ink-muted">/ 100</span>
      </div>
    </div>
  );
}

function FeedbackList({
  title,
  items,
  icon: Icon,
  tone,
}: {
  title: string;
  items: string[];
  icon: typeof ThumbsUp;
  tone: "emerald" | "rose" | "brand";
}) {
  if (!items.length) return null;
  const tones = {
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
    brand: "bg-brand-50 text-brand-600",
  } as const;
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg", tones[tone])}>
          <Icon className="h-4 w-4" />
        </span>
        <h4 className="text-sm font-semibold text-ink">{title}</h4>
      </div>
      <ul className="space-y-1.5 pl-1">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm text-ink-soft">
            <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", tone === "emerald" ? "bg-emerald-400" : tone === "rose" ? "bg-rose-400" : "bg-brand-400")} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function GraderPage() {
  const [subject, setSubject] = useState("Mathematics");
  const [grade, setGrade] = useState("Grade 6");
  const [question, setQuestion] = useState("Solve 1/2 + 1/3 and explain each step.");
  const [studentAnswer, setStudentAnswer] = useState(
    "1/2 + 1/3 = 2/5 because you add the top numbers and the bottom numbers.",
  );
  const [rubric, setRubric] = useState("");
  const [language, setLanguage] = useState<Language>("en");

  const [result, setResult] = useState<GradeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function gradeAnswer(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    const input: GradeInput = {
      subject,
      grade,
      question,
      studentAnswer,
      rubric: rubric.trim() || undefined,
      language,
    };
    try {
      const res = await fetch("/api/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      setResult((await res.json()) as GradeResult);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <PageHeader
        icon={ClipboardCheck}
        title="Assignment Grader"
        description="Get a fair score, specific feedback, and next steps for any answer."
        color="amber"
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <Card className="self-start p-5 lg:col-span-2 lg:sticky lg:top-24">
          <form onSubmit={gradeAnswer} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Subject" htmlFor="subject">
                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              </Field>
              <Field label="Grade / level" htmlFor="grade">
                <Input id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
              </Field>
            </div>
            <Field label="Question / task" htmlFor="question">
              <Textarea id="question" rows={2} value={question} onChange={(e) => setQuestion(e.target.value)} required />
            </Field>
            <Field label="Student's answer" htmlFor="answer">
              <Textarea id="answer" rows={5} value={studentAnswer} onChange={(e) => setStudentAnswer(e.target.value)} required />
            </Field>
            <Field label="Rubric (optional)" htmlFor="rubric" hint="Grading criteria, if you have any.">
              <Textarea id="rubric" rows={2} value={rubric} onChange={(e) => setRubric(e.target.value)} placeholder="e.g. 50% correct method, 50% correct answer" />
            </Field>
            <LanguageSelect value={language} onChange={setLanguage} />
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? <Spinner /> : <Sparkles className="h-4 w-4" />}
              {loading ? "Grading…" : "Grade answer"}
            </Button>
            {error && <p className="text-sm text-rose-600">{error}</p>}
          </form>
        </Card>

        {/* Result */}
        <div className="lg:col-span-3">
          {result ? (
            <Card className="p-6">
              <div className="flex flex-col items-center gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
                <ScoreRing score={result.score} />
                <div className="text-center sm:text-left">
                  <span className={cn("inline-block rounded-full px-2.5 py-1 text-xs font-semibold", scoreColor(result.score).text, "bg-slate-50")}>
                    {scoreColor(result.score).label}
                  </span>
                  <p className="mt-2 text-ink-soft">{result.summary}</p>
                </div>
              </div>
              <div className="mt-6 space-y-6">
                <FeedbackList title="Strengths" items={result.strengths} icon={ThumbsUp} tone="emerald" />
                <FeedbackList title="Mistakes & gaps" items={result.mistakes} icon={TriangleAlert} tone="rose" />
                <FeedbackList title="Recommendations" items={result.recommendations} icon={Lightbulb} tone="brand" />
              </div>
            </Card>
          ) : loading ? (
            <Card className="flex min-h-[24rem] flex-col items-center justify-center gap-4 p-6">
              <Spinner className="h-7 w-7 text-amber-500" />
              <p className="text-sm text-ink-soft">Evaluating the answer…</p>
            </Card>
          ) : (
            <Card className="flex min-h-[24rem] flex-col items-center justify-center p-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                <ClipboardCheck className="h-7 w-7" />
              </span>
              <p className="mt-4 font-semibold text-ink">Feedback will appear here</p>
              <p className="mt-1 max-w-xs text-sm text-ink-soft">
                Paste a student&apos;s answer and get a score with actionable feedback.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
