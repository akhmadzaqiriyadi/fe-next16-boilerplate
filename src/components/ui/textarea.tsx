import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, rows = 4, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <textarea
          ref={ref}
          rows={rows}
          className={cn(
            "w-full rounded-xl border bg-white p-3.5 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all duration-200 resize-y",
            "border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100 dark:placeholder:text-zinc-600",
            "focus:border-emerald-500/80 focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-500 dark:text-rose-400">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
