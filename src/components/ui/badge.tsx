import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "outline";
  dot?: boolean;
}

export function Badge({ className, variant = "default", dot = false, children, ...props }: BadgeProps) {
  const variants = {
    default: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950",
    secondary: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
    success: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400 border border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-500/20",
    danger: "bg-rose-500/10 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400 border border-rose-500/20",
    outline: "border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300",
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
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium transition-colors select-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full", dotColors[variant])} />}
      {children}
    </div>
  );
}
