"use client";

import { useEffect, useState } from "react";

// Lightweight client-side auth for the MVP/demo. No backend required, so there's
// nothing to misconfigure on stage. Swap for real auth (NextAuth, Clerk, custom
// API) later without touching the feature pages.

export interface StoredUser {
  name: string;
  email: string;
}

const KEY = "tc_user";

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: StoredUser): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("tc-auth"));
}

export function clearStoredUser(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("tc-auth"));
}

/** Reactive hook: returns the current user and whether we've checked storage. */
export function useUser(): { user: StoredUser | null; ready: boolean } {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setUser(getStoredUser());
    sync();
    setReady(true);
    window.addEventListener("tc-auth", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("tc-auth", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { user, ready };
}
