import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  ListChecks,
  MessageSquare,
  Sparkles,
  Star,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { buttonClasses } from "@/components/styles";

const features = [
  {
    icon: BookOpen,
    title: "AI Lesson Planner",
    desc: "Turn a subject, grade, and topic into a complete, structured lesson plan — objectives, activities, homework, and discussion questions.",
    color: "text-brand-600 bg-brand-50",
  },
  {
    icon: ListChecks,
    title: "AI Quiz Generator",
    desc: "Generate quizzes with multiple-choice, true/false, and open questions — complete with answer keys and explanations.",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: ClipboardCheck,
    title: "AI Assignment Grader",
    desc: "Paste a student's answer and get a fair score, specific feedback on mistakes, and personalized recommendations.",
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: BarChart3,
    title: "Classroom Analytics",
    desc: "See average performance, hard topics, and recurring mistakes — so you know exactly what to reteach.",
    color: "text-violet-600 bg-violet-50",
  },
  {
    icon: MessageSquare,
    title: "Teacher Assistant",
    desc: "Ask anything — “How do I explain Newton's laws to 7th graders?” — and get classroom-ready answers instantly.",
    color: "text-sky-600 bg-sky-50",
  },
  {
    icon: ShieldCheck,
    title: "Built for the classroom",
    desc: "Every output is age-appropriate, curriculum-aware, and editable. You stay in control of what reaches your students.",
    color: "text-rose-600 bg-rose-50",
  },
];

const steps = [
  { n: "01", title: "Pick a tool", desc: "Lesson, quiz, or grading — choose what you need right now." },
  { n: "02", title: "Describe it", desc: "Subject, grade, topic, and a few options. That's it." },
  { n: "03", title: "Get results", desc: "Claude generates classroom-ready content in seconds." },
  { n: "04", title: "Refine & teach", desc: "Edit, copy, and bring it straight into your classroom." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-aurora">
      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
            <a href="#features" className="hover:text-ink">Features</a>
            <a href="#how" className="hover:text-ink">How it works</a>
            <a href="#audience" className="hover:text-ink">For schools</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className={buttonClasses("ghost", "sm")}>
              Log in
            </Link>
            <Link href="/signup" className={buttonClasses("primary", "sm")}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-slide-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3 py-1 text-xs font-medium text-brand-700 shadow-soft">
              <Sparkles className="h-3.5 w-3.5" />
              Powered by Claude
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              The AI copilot that gives teachers their{" "}
              <span className="gradient-text">time back</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Plan lessons, generate quizzes, and grade assignments in seconds —
              not hours. Teacher Copilot automates the busywork so you can focus
              on what matters: your students.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/signup" className={buttonClasses("primary", "lg")}>
                Start free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/dashboard" className={buttonClasses("secondary", "lg")}>
                Try the live demo
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> No credit card
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-500" /> Set up in 30 seconds
              </span>
            </div>
          </div>

          {/* Hero visual: faux app preview */}
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-200/40 to-emerald-200/30 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
              <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/80 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-300" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-300" />
                <span className="ml-3 text-xs font-medium text-ink-muted">
                  Lesson Planner · Biology · Grade 8
                </span>
              </div>
              <div className="space-y-4 p-5">
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">
                    Topic: Photosynthesis
                  </span>
                  <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                    45 min
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">Learning Objectives</p>
                  <div className="mt-2 space-y-2">
                    {[88, 72, 80].map((w, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                        <div
                          className="h-2.5 rounded-full bg-slate-100"
                          style={{ width: `${w}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                  <p className="text-sm font-semibold text-ink">Lesson Flow</p>
                  <div className="mt-2 grid grid-cols-4 gap-2 text-center text-[10px] font-medium text-ink-muted">
                    {["Hook", "Teach", "Practice", "Wrap"].map((s) => (
                      <div key={s} className="rounded-lg bg-white px-1 py-2 shadow-sm">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-brand-600 px-4 py-3 text-white">
                  <span className="text-sm font-medium">Generated in 4.2s</span>
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-slate-200/60 bg-white/60">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 py-10 sm:grid-cols-4">
          {[
            { v: "5 hrs", l: "saved per week" },
            { v: "10×", l: "faster lesson prep" },
            { v: "3 clicks", l: "to a graded set" },
            { v: "100%", l: "editable output" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-ink">{s.v}</p>
              <p className="mt-1 text-sm text-ink-muted">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-5 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Everything in one place
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            One copilot for the whole teaching workflow
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            From the first lesson plan to the final grade — Teacher Copilot
            handles the repetitive work end to end.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.color}`}>
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-white/60 py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              How it works
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              From idea to classroom in four steps
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-soft">
                <span className="text-3xl font-bold text-brand-200">{s.n}</span>
                <h3 className="mt-2 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section id="audience" className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-soft">
            <Star className="h-7 w-7 text-amber-500" />
            <h3 className="mt-4 text-xl font-semibold text-ink">For teachers</h3>
            <p className="mt-2 text-ink-soft">
              Reclaim your evenings and weekends. Spend less time on prep and
              paperwork, and more time doing what you love — teaching.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-ink-soft">
              {["Less admin, more teaching", "Personalized learning at scale", "Consistent, high-quality materials"].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {t}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-white shadow-card">
            <ShieldCheck className="h-7 w-7 text-white/90" />
            <h3 className="mt-4 text-xl font-semibold">For schools & centers</h3>
            <p className="mt-2 text-white/85">
              Raise teaching quality across every classroom, reduce staff
              workload, and get visibility into student progress — all in one
              platform.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              {["Higher education quality", "Lower teacher burnout", "Insight into learning outcomes"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-card sm:p-16">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Ready to get your time back?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-ink-soft">
            Join the teachers using AI to do their best work in less time.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/signup" className={buttonClasses("primary", "lg")}>
              Create free account <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/dashboard" className={buttonClasses("secondary", "lg")}>
              Explore the demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row">
          <Logo />
          <p className="text-sm text-ink-muted">
            © {new Date().getFullYear()} Teacher Copilot · Built for educators.
          </p>
        </div>
      </footer>
    </div>
  );
}
