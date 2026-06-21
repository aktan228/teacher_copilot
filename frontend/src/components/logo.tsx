import { cn } from "@/lib/utils";

type Tone = "brand" | "white";

/**
 * Brand graduation-cap mark.
 * - tone="brand": rounded #4F4EE5 app-icon tile with a white cap (default).
 * - tone="white": transparent white cap for dark backgrounds.
 */
export function LogoMark({
  className,
  tone = "brand",
}: {
  className?: string;
  tone?: Tone;
}) {
  if (tone === "white") {
    return (
      <span className={cn("relative inline-flex items-center justify-center", className)}>
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          <path
            fill="#ffffff"
            fillRule="evenodd"
            d="M50 27 L83 45 L50 63 L17 45 Z M45.4 45 a4.6 4.6 0 1 0 9.2 0 a4.6 4.6 0 1 0 -9.2 0 Z"
          />
          <path
            d="M50 45 L73 45 L73 64"
            fill="none"
            stroke="#9FEDD3"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="73" cy="67" r="4.8" fill="#9FEDD3" />
        </svg>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-[22%]",
        className,
      )}
    >
      <svg viewBox="0 0 1024 1024" className="h-full w-full" aria-hidden>
        <rect width="1024" height="1024" rx="224" fill="#4F4EE5" />
        <g transform="translate(202,205) scale(6.2)">
          <path
            fill="#ffffff"
            fillRule="evenodd"
            d="M50 27 L83 45 L50 63 L17 45 Z M45.4 45 a4.6 4.6 0 1 0 9.2 0 a4.6 4.6 0 1 0 -9.2 0 Z"
          />
          <path
            d="M50 45 L73 45 L73 64"
            fill="none"
            stroke="#9FEDD3"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="73" cy="67" r="4.8" fill="#9FEDD3" />
        </g>
      </svg>
    </span>
  );
}

export function Logo({
  className,
  textClassName,
  tone = "brand",
}: {
  className?: string;
  textClassName?: string;
  tone?: Tone;
}) {
  const teacherColor = tone === "white" ? "text-white" : "text-ink";
  const copilotColor = tone === "white" ? "text-brand-200" : "text-brand-600";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark tone={tone} className="h-9 w-9" />
      <span
        className={cn("text-lg font-semibold tracking-tight", teacherColor, textClassName)}
      >
        Teacher<span className={copilotColor}>Copilot</span>
      </span>
    </span>
  );
}
