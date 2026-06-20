import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[58%] w-[58%]" aria-hidden>
        {/* graduation cap */}
        <path
          d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4Z"
          fill="currentColor"
          opacity="0.95"
        />
        <path
          d="M6 11v4.2c0 .8 2.7 2.3 6 2.3s6-1.5 6-2.3V11"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
        <circle cx="20.5" cy="9" r="0.9" fill="currentColor" />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  textClassName,
}: {
  className?: string;
  textClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9" />
      <span className={cn("text-lg font-semibold tracking-tight text-ink", textClassName)}>
        Teacher<span className="text-brand-600">Copilot</span>
      </span>
    </span>
  );
}
