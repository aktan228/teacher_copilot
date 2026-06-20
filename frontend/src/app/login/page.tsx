"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { setStoredUser } from "@/lib/auth";
import { AuthShell } from "@/components/auth-shell";
import { Button, Field, Input } from "@/components/ui";

function nameFromEmail(email: string): string {
  const local = email.split("@")[0] || "Teacher";
  return (
    local
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim() || "Teacher"
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStoredUser({ name: nameFromEmail(email), email });
    router.push("/dashboard");
  }

  return (
    <AuthShell title="Welcome back" subtitle="Log in to your Teacher Copilot workspace.">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            required
            placeholder="you@school.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Password" htmlFor="password">
          <Input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          Log in <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-4 rounded-xl bg-brand-50/70 px-4 py-3 text-center text-xs text-brand-700">
        Demo login — any email and password will work.
      </p>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-brand-600 hover:text-brand-700">
          Sign up free
        </Link>
      </p>
    </AuthShell>
  );
}
