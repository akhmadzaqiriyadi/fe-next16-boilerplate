import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "accent" | "glow";
  size?: "xs" | "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:pointer-events-none disabled:opacity-45 select-none cursor-pointer active:scale-[0.98]";

    const variants = {
      primary:
        "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white shadow-xs border border-transparent",
      secondary:
        "bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:text-zinc-100 dark:hover:bg-zinc-700/80 border border-zinc-200/50 dark:border-zinc-700/50",
      outline:
        "border border-zinc-200 bg-transparent hover:bg-zinc-100/50 dark:border-zinc-800 dark:hover:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
      ghost:
        "hover:bg-zinc-100 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white",
      danger:
        "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-600 dark:hover:bg-rose-500 shadow-xs",
      accent:
        "bg-emerald-500 text-zinc-950 font-semibold hover:bg-emerald-400 dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300 shadow-xs border border-emerald-400/30",
      glow: "bg-emerald-500 text-zinc-950 font-semibold hover:bg-emerald-400 dark:bg-emerald-400 dark:text-zinc-950 dark:hover:bg-emerald-300 shadow-xs border border-emerald-400/30",
    };

    const sizes = {
      xs: "h-7 px-2.5 rounded-[4px] text-xs gap-1.5",
      sm: "h-8 px-3 rounded-md text-xs gap-1.5",
      md: "h-10 px-4 rounded-md text-sm gap-2",
      lg: "h-12 px-6 rounded-lg text-base gap-2.5",
      icon: "h-9 w-9 rounded-md p-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 shrink-0 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
