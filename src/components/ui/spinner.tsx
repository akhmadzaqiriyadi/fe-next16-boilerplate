import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function Spinner({
  size = "md",
  label,
  className,
  ...props
}: SpinnerProps) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };

  return (
    <div
      role="status"
      className={cn("inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 select-none", className)}
      {...props}
    >
      <Loader2 className={cn("animate-spin shrink-0 text-emerald-500", sizes[size])} />
      {label && <span className="text-xs font-medium font-mono">{label}</span>}
      <span className="sr-only">{label || "Loading..."}</span>
    </div>
  );
}
