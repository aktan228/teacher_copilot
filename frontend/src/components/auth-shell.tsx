import Link from "next/link";
import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { Logo } from "./logo";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden bg-gradient-to-br from-brand-700 via-brand-700 to-brand-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="bg-grid absolute inset-0 opacity-[0.12]" />
        <Link href="/" className="relative z-10">
          <Logo textClassName="text-white" />
        </Link>
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold leading-tight">
            Give your teachers their time back.
          </h2>
          <p className="mt-4 text-white/80">
            Plan lessons, generate quizzes, and grade work in seconds with an AI
            copilot built for the classroom.
          </p>
          <ul className="mt-8 space-y-3 text-white/90">
            {[
              "Complete lesson plans in seconds",
              "Auto-generated quizzes with answer keys",
              "Instant, fair grading with feedback",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative z-10 text-sm text-white/60">
          © {new Date().getFullYear()} Teacher Copilot
        </p>
      </div>

      {/* Form panel */}
      <div className="bg-aurora flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-slide-up">
          <div className="mb-8 lg:hidden">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-ink">{title}</h1>
          <p className="mt-1.5 text-ink-soft">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
