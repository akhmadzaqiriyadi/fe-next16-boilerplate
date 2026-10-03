import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "outline";
  dot?: boolean;
}

export function Badge({ className, variant = "default", dot = false, children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-800 dark:border-zinc-200",
    secondary: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800/80 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700",
    success: "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border-amber-500/30",
    danger: "bg-rose-500/10 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400 border-rose-500/30",
    outline: "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300",
  };

  const dotColors = {
    default: "bg-zinc-400",
    secondary: "bg-zinc-500",
    success: "bg-emerald-500 animate-pulse",
    warning: "bg-amber-500 animate-pulse",
    danger: "bg-rose-500 animate-pulse",
    outline: "bg-zinc-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[4px] border px-2 py-0.5 font-mono text-[10.5px] font-semibold tracking-wider uppercase select-none transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-[1px] shrink-0", dotColors[variant])} />}
      {children}
    </div>
  );
}
