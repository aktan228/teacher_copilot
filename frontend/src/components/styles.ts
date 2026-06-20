import { cn } from "@/lib/utils";

// Button styling lives in a non-client module so both server components
// (e.g. the landing page applying classes to <Link>) and client components
// can use it.

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-soft hover:bg-brand-700 active:bg-brand-800 disabled:bg-brand-300",
  secondary:
    "bg-white text-ink border border-slate-200 shadow-soft hover:bg-slate-50 hover:border-slate-300 disabled:opacity-60",
  ghost: "text-ink-soft hover:bg-slate-100 hover:text-ink",
  danger: "bg-rose-600 text-white hover:bg-rose-700",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra?: string,
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed",
    sizes[size],
    variants[variant],
    extra,
  );
}
