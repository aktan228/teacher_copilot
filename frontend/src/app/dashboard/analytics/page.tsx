"use client";

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  GraduationCap,
  Lightbulb,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Class average", value: "76%", icon: TrendingUp, delta: "+4% vs last month", up: true },
  { label: "Completion rate", value: "92%", icon: GraduationCap, delta: "+2%", up: true },
  { label: "Active students", value: "28", icon: Users, delta: "of 30", up: true },
  { label: "Need support", value: "5", icon: AlertTriangle, delta: "-2 vs last month", up: false },
];

const topics = [
  { name: "Fractions", mastery: 58 },
  { name: "Word problems", mastery: 64 },
  { name: "Decimals", mastery: 71 },
  { name: "Geometry basics", mastery: 83 },
  { name: "Multiplication", mastery: 91 },
];

const weekly = [
  { w: "W1", v: 62 },
  { w: "W2", v: 67 },
  { w: "W3", v: 64 },
  { w: "W4", v: 72 },
  { w: "W5", v: 70 },
  { w: "W6", v: 76 },
];

const students = [
  { name: "Aisha K.", score: 92, trend: 5, status: "On track" },
  { name: "Daniel P.", score: 78, trend: 3, status: "On track" },
  { name: "Mia R.", score: 64, trend: -6, status: "Watch" },
  { name: "Omar S.", score: 51, trend: -2, status: "At risk" },
  { name: "Lena V.", score: 88, trend: 7, status: "On track" },
  { name: "Yerlan T.", score: 47, trend: -9, status: "At risk" },
];

function masteryColor(m: number) {
  if (m >= 80) return "bg-emerald-500";
  if (m >= 65) return "bg-amber-500";
  return "bg-rose-500";
}

function statusBadge(status: string) {
  if (status === "On track") return <Badge color="emerald">{status}</Badge>;
  if (status === "Watch") return <Badge color="amber">{status}</Badge>;
  return <Badge color="rose">{status}</Badge>;
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={BarChart3}
        title="Classroom Analytics"
        description="Spot struggling topics and students before they fall behind."
        color="violet"
        action={<Badge color="slate">Sample data</Badge>}
      />

      {/* Insight callout */}
      <Card className="flex items-start gap-4 border-amber-200 bg-amber-50/60 p-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          <Lightbulb className="h-5 w-5" />
        </span>
        <div>
          <p className="font-semibold text-ink">Class insight</p>
          <p className="mt-0.5 text-sm text-ink-soft">
            <span className="font-semibold text-amber-700">70% of students</span> are
            struggling with <span className="font-semibold">fractions</span>.
            Consider reteaching this topic before the next unit — generate a
            targeted lesson and a short diagnostic quiz to close the gap.
          </p>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-ink-soft">
                <s.icon className="h-[18px] w-[18px]" />
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-xs font-medium",
                  s.up ? "text-emerald-600" : "text-rose-600",
                )}
              >
                {s.up ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-ink">{s.value}</p>
            <p className="text-sm text-ink-soft">{s.label}</p>
            <p className="mt-1 text-xs text-ink-muted">{s.delta}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Topics to reteach */}
        <Card className="p-6 lg:col-span-3">
          <h3 className="font-semibold text-ink">Topic mastery</h3>
          <p className="text-sm text-ink-soft">Average class mastery by topic</p>
          <div className="mt-5 space-y-4">
            {topics.map((t) => (
              <div key={t.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium text-ink">{t.name}</span>
                  <span className="text-ink-muted">{t.mastery}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={cn("h-full rounded-full transition-all", masteryColor(t.mastery))}
                    style={{ width: `${t.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly trend */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold text-ink">Weekly average</h3>
          <p className="text-sm text-ink-soft">Class score over 6 weeks</p>
          <div className="mt-6 flex h-40 items-end justify-between gap-2">
            {weekly.map((d) => (
              <div key={d.w} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-brand-500 to-brand-400"
                    style={{ height: `${d.v}%` }}
                    title={`${d.v}%`}
                  />
                </div>
                <span className="text-[11px] text-ink-muted">{d.w}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Students table */}
      <Card className="overflow-hidden">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-semibold text-ink">Student performance</h3>
          <p className="text-sm text-ink-soft">Latest scores and trends</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wider text-ink-muted">
                <th className="px-5 py-3 font-medium">Student</th>
                <th className="px-5 py-3 font-medium">Latest score</th>
                <th className="px-5 py-3 font-medium">Trend</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.name} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="px-5 py-3.5 font-medium text-ink">{s.name}</td>
                  <td className="px-5 py-3.5 text-ink-soft">{s.score}%</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 font-medium",
                        s.trend >= 0 ? "text-emerald-600" : "text-rose-600",
                      )}
                    >
                      {s.trend >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      {Math.abs(s.trend)}%
                    </span>
                  </td>
                  <td className="px-5 py-3.5">{statusBadge(s.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
