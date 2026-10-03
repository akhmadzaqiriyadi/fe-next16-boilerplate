import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: "default" | "glass" | "subtle" | "interactive";
}

export function Card({ className, surface = "default", ...props }: CardProps) {
  const surfaces = {
    default: "border border-zinc-200/80 bg-white shadow-xs dark:border-zinc-800/80 dark:bg-zinc-900/60",
    glass: "glass-surface shadow-sm",
    subtle: "bg-zinc-50 border border-zinc-200/60 dark:bg-zinc-900/40 dark:border-zinc-800/60",
    interactive: "border border-zinc-200/80 bg-white hover:border-emerald-500/40 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-emerald-500/30",
  };

  return (
    <div
      className={cn(
        "rounded-xl p-6 transition-all duration-200",
        surfaces[surface],
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 pb-4", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed", className)} {...props} />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pt-0", className)} {...props} />;
}
