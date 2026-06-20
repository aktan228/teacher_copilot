"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { setStoredUser } from "@/lib/auth";
import { AuthShell } from "@/components/auth-shell";
import { Button, Field, Input } from "@/components/ui";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStoredUser({ name: name.trim() || "Teacher", email });
    router.push("/dashboard");
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start planning, generating, and grading in seconds."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Full name" htmlFor="name">
          <Input
            id="name"
            required
            placeholder="Alex Morgan"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          Create account <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-4 text-center text-xs text-ink-muted">
        By continuing you agree to the Terms and Privacy Policy.
      </p>

      <p className="mt-6 text-center text-sm text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
