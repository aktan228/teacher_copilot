import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const colors = {
  brand: "bg-brand-50 text-brand-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  violet: "bg-violet-50 text-violet-600",
  sky: "bg-sky-50 text-sky-600",
} as const;

export function PageHeader({
  icon: Icon,
  title,
  description,
  color = "brand",
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: keyof typeof colors;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            colors[color],
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-ink">{title}</h2>
          <p className="mt-0.5 text-sm text-ink-soft">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}
