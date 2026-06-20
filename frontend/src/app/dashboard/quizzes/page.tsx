"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Eye, EyeOff, ListChecks, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button, Card, Field, Input, Select, Spinner } from "@/components/ui";
import { LanguageSelect } from "@/components/language-select";
import { CopyButton } from "@/components/copy-button";
import { cn } from "@/lib/utils";
import {
  QUESTION_TYPE_LABELS,
  type Difficulty,
  type Language,
  type QuestionType,
  type Quiz,
  type QuizInput,
} from "@/lib/types";

const ALL_TYPES: QuestionType[] = ["multiple_choice", "true_false", "open"];
const LETTERS = ["A", "B", "C", "D", "E", "F"];

export default function QuizzesPage() {
  const [subject, setSubject] = useState("Mathematics");
  const [grade, setGrade] = useState("Grade 6");
  const [topic, setTopic] = useState("Fractions");
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [types, setTypes] = useState<QuestionType[]>(["multiple_choice", "true_false"]);
  const [language, setLanguage] = useState<Language>("en");

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [revealAll, setRevealAll] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  function toggleType(t: QuestionType) {
    setTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  }

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    if (types.length === 0) return;
    setLoading(true);
    setError("");
    setQuiz(null);
    setRevealAll(false);
    setRevealed(new Set());
    const input: QuizInput = { subject, grade, topic, numQuestions, difficulty, types, language };
    try {
      const res = await fetch("/api/generate/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const data = (await res.json()) as Quiz;
      setQuiz(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const copyText = useMemo(() => {
    if (!quiz) return "";
    const lines = [quiz.title, ""];
    quiz.questions.forEach((q) => {
      lines.push(`${q.id}. ${q.question}`);
      if (q.options) q.options.forEach((o, i) => lines.push(`   ${LETTERS[i]}. ${o}`));
      lines.push(`   Answer: ${q.answer}`);
      lines.push(`   Why: ${q.explanation}`, "");
    });
    return lines.join("\n");
  }, [quiz]);

  return (
    <div>
      <PageHeader
        icon={ListChecks}
        title="Quiz Generator"
        description="Create assessments with answer keys and explanations in seconds."
        color="emerald"
      />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <Card className="self-start p-5 lg:col-span-2 lg:sticky lg:top-24">
          <form onSubmit={generate} className="space-y-4">
            <Field label="Subject" htmlFor="subject">
              <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Grade / level" htmlFor="grade">
                <Input id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
              </Field>
              <Field label="Questions" htmlFor="num">
                <Select id="num" value={numQuestions} onChange={(e) => setNumQuestions(Number(e.target.value))}>
                  {[3, 5, 8, 10].map((n) => (
                    <option key={n} value={n}>{n} questions</option>
                  ))}
                </Select>
              </Field>
            </div>
            <Field label="Topic" htmlFor="topic">
              <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} required />
            </Field>
            <Field label="Difficulty" htmlFor="difficulty">
              <Select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </Field>
            <Field label="Question types">
              <div className="flex flex-wrap gap-2">
                {ALL_TYPES.map((t) => {
                  const active = types.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleType(t)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                        active
                          ? "border-brand-200 bg-brand-50 text-brand-700"
                          : "border-slate-200 bg-white text-ink-soft hover:border-slate-300",
                      )}
                    >
                      {QUESTION_TYPE_LABELS[t]}
                    </button>
                  );
                })}
              </div>
            </Field>
            <LanguageSelect value={language} onChange={setLanguage} />
            <Button type="submit" size="lg" className="w-full" disabled={loading || types.length === 0}>
              {loading ? <Spinner /> : <Sparkles className="h-4 w-4" />}
              {loading ? "Generating…" : "Generate quiz"}
            </Button>
            {types.length === 0 && (
              <p className="text-xs text-amber-600">Select at least one question type.</p>
            )}
            {error && <p className="text-sm text-rose-600">{error}</p>}
          </form>
        </Card>

        {/* Result */}
        <div className="lg:col-span-3">
          {quiz ? (
            <div className="space-y-4">
              <Card className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <h3 className="font-semibold text-ink">{quiz.title}</h3>
                  <p className="text-sm text-ink-soft">{quiz.questions.length} questions · answer key included</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => setRevealAll((v) => !v)}
                  >
                    {revealAll ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    {revealAll ? "Hide answers" : "Reveal all"}
                  </Button>
                  <CopyButton text={copyText} />
                </div>
              </Card>

              {quiz.questions.map((q) => {
                const open = revealAll || revealed.has(q.id);
                return (
                  <Card key={q.id} className="p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                        {q.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="mb-2">
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-ink-muted">
                            {QUESTION_TYPE_LABELS[q.type] ?? q.type}
                          </span>
                        </div>
                        <p className="font-medium text-ink">{q.question}</p>

                        {q.options && q.options.length > 0 && (
                          <ul className="mt-3 space-y-2">
                            {q.options.map((opt, i) => {
                              const correct = open && opt === q.answer;
                              return (
                                <li
                                  key={i}
                                  className={cn(
                                    "flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm",
                                    correct
                                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                      : "border-slate-200 text-ink-soft",
                                  )}
                                >
                                  <span className="text-xs font-semibold text-ink-muted">{LETTERS[i]}</span>
                                  <span className="flex-1">{opt}</span>
                                  {correct && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                                </li>
                              );
                            })}
                          </ul>
                        )}

                        {open ? (
                          <div className="mt-3 space-y-2 rounded-xl bg-emerald-50/60 p-3 text-sm">
                            {(!q.options || q.options.length === 0) && (
                              <p className="text-emerald-900">
                                <span className="font-semibold">Answer: </span>
                                {q.answer}
                              </p>
                            )}
                            <p className="text-ink-soft">
                              <span className="font-semibold text-ink">Why: </span>
                              {q.explanation}
                            </p>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setRevealed((prev) => new Set(prev).add(q.id))
                            }
                            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
                          >
                            <Eye className="h-4 w-4" /> Show answer
                          </button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : loading ? (
            <Card className="p-6">
              <div className="space-y-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="shimmer h-4 w-3/4 rounded bg-slate-100" />
                    <div className="shimmer h-9 rounded bg-slate-100" />
                    <div className="shimmer h-9 w-5/6 rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="flex min-h-[24rem] flex-col items-center justify-center p-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500">
                <ListChecks className="h-7 w-7" />
              </span>
              <p className="mt-4 font-semibold text-ink">Your quiz will appear here</p>
              <p className="mt-1 max-w-xs text-sm text-ink-soft">
                Choose your options and generate a ready-to-use quiz with an answer key.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
