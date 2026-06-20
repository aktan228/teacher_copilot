"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export function Markdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-slate prose-tc max-w-none",
        "prose-headings:font-semibold prose-h2:text-lg prose-h2:mt-7 prose-h2:mb-3",
        "prose-h3:text-base prose-p:leading-relaxed",
        "prose-table:overflow-hidden prose-table:rounded-xl prose-table:border prose-table:border-slate-200",
        "prose-th:bg-slate-50 prose-th:px-3 prose-th:py-2 prose-th:text-left prose-th:text-sm",
        "prose-td:border-t prose-td:border-slate-100 prose-td:px-3 prose-td:py-2 prose-td:align-top prose-td:text-sm",
        "prose-blockquote:rounded-r-lg prose-blockquote:border-brand-300 prose-blockquote:bg-brand-50/40 prose-blockquote:py-0.5 prose-blockquote:not-italic",
        "prose-li:my-0.5 prose-strong:text-ink",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
