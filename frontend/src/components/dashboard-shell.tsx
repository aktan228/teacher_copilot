"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  Sparkles,
  Wifi,
  X,
  FlaskConical,
} from "lucide-react";
import { Logo, LogoMark } from "./logo";
import { Badge, Spinner } from "./ui";
import { cn } from "@/lib/utils";
import { clearStoredUser, useUser } from "@/lib/auth";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/lessons", label: "Lesson Planner", icon: BookOpen },
  { href: "/dashboard/quizzes", label: "Quiz Generator", icon: ListChecks },
  { href: "/dashboard/grader", label: "Assignment Grader", icon: ClipboardCheck },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/assistant", label: "AI Assistant", icon: Sparkles },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  return exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");
}

export function DashboardShell({
  demoMode,
  children,
}: {
  demoMode: boolean;
  children: ReactNode;
}) {
  const { user, ready } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-brand-600">
        <Spinner className="h-6 w-6" />
      </div>
    );
  }

  const current = nav.find((n) => isActive(pathname, n.href, n.exact));
  const initials = user.name.charAt(0).toUpperCase();

  function logout() {
    clearStoredUser();
    router.push("/");
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Link href="/dashboard">
          <Logo />
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map((item) => {
          const active = isActive(pathname, item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-soft hover:bg-slate-100 hover:text-ink",
              )}
            >
              <item.icon
                className={cn("h-[18px] w-[18px]", active ? "text-brand-600" : "text-slate-400 group-hover:text-ink")}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-100 p-4">
        {demoMode ? (
          <Badge color="amber" className="w-full justify-center py-1.5">
            <FlaskConical className="h-3.5 w-3.5" /> Demo mode
          </Badge>
        ) : (
          <Badge color="emerald" className="w-full justify-center py-1.5">
            <Wifi className="h-3.5 w-3.5" /> Live AI
          </Badge>
        )}
        <p className="mt-2 text-center text-[11px] leading-tight text-ink-muted">
          {demoMode
            ? "Add an API key in .env.local for live AI"
            : "Connected to OpenRouter"}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f8fc]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:block">
        {sidebar}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-64 bg-white shadow-xl">
            <button
              className="absolute right-3 top-4 rounded-lg p-1.5 text-ink-muted hover:bg-slate-100"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 text-ink-soft hover:bg-slate-100 lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="lg:hidden">
              <LogoMark className="h-8 w-8" />
            </div>
            <h1 className="text-base font-semibold text-ink sm:text-lg">
              {current?.label ?? "Dashboard"}
            </h1>
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition hover:bg-slate-100"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
                {initials}
              </span>
              <span className="hidden text-sm font-medium text-ink sm:block">
                {user.name}
              </span>
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
                  <div className="border-b border-slate-100 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
                    <p className="truncate text-xs text-ink-muted">{user.email}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-sm text-ink-soft hover:bg-slate-50"
                  >
                    <LogOut className="h-4 w-4" /> Log out
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
