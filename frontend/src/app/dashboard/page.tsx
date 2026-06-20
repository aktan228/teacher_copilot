"use client";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  ListChecks,
  Sparkles,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useUser } from "@/lib/auth";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

const tools = [
  {
    href: "/dashboard/lessons",
    icon: BookOpen,
    title: "Lesson Planner",
    desc: "Generate a complete lesson plan from a topic.",
    color: "bg-brand-50 text-brand-600",
  },
  {
    href: "/dashboard/quizzes",
    icon: ListChecks,
    title: "Quiz Generator",
    desc: "Create quizzes with answer keys instantly.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    href: "/dashboard/grader",
    icon: ClipboardCheck,
    title: "Assignment Grader",
    desc: "Grade student answers with feedback.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    href: "/dashboard/assistant",
    icon: Sparkles,
    title: "AI Assistant",
    desc: "Ask anything about teaching.",
    color: "bg-violet-50 text-violet-600",
  },
];

const stats = [
  { label: "Lessons created", value: "24", icon: BookOpen, delta: "+6 this week" },
  { label: "Quizzes generated", value: "18", icon: ListChecks, delta: "+4 this week" },
  { label: "Answers graded", value: "132", icon: ClipboardCheck, delta: "+38 this week" },
  { label: "Hours saved", value: "11.5", icon: Clock, delta: "this month" },
];

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export default function DashboardHome() {
  const { user } = useUser();
  const firstName = user?.name?.split(" ")[0] ?? "Teacher";

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white shadow-card sm:p-8">
        <div className="relative">
          <p className="text-sm font-medium text-white/70">{greeting()},</p>
          <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{firstName} 👋</h2>
          <p className="mt-2 max-w-lg text-white/85">
            What would you like to create today? Pick a tool below and let your
            copilot handle the busywork.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/dashboard/lessons"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 shadow-soft transition hover:bg-white/90"
            >
              <BookOpen className="h-4 w-4" /> New lesson
            </Link>
            <Link
              href="/dashboard/quizzes"
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/25 transition hover:bg-white/25"
            >
              <ListChecks className="h-4 w-4" /> New quiz
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-ink-soft">
                <s.icon className="h-[18px] w-[18px]" />
              </span>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="mt-3 text-2xl font-bold text-ink">{s.value}</p>
            <p className="text-sm text-ink-soft">{s.label}</p>
            <p className="mt-1 text-xs text-ink-muted">{s.delta}</p>
          </Card>
        ))}
      </div>

      {/* Tools */}
      <div>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">
          Your tools
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((t) => (
            <Link key={t.href} href={t.href}>
              <Card className="group flex items-center gap-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-card">
                <span
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                    t.color,
                  )}
                >
                  <t.icon className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">{t.title}</p>
                  <p className="truncate text-sm text-ink-soft">{t.desc}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" />
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Insight teaser */}
      <Card className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <BarChart3 className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-ink">Classroom analytics</p>
            <p className="text-sm text-ink-soft">
              See which topics your students struggle with most.
            </p>
          </div>
        </div>
        <Link
          href="/dashboard/analytics"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          View insights <ArrowRight className="h-4 w-4" />
        </Link>
      </Card>
    </div>
  );
}
