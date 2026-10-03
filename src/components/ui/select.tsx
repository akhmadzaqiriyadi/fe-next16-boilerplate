"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  error?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <div className="relative flex items-center">
          <select
            ref={ref}
            className={cn(
              "h-10 w-full appearance-none rounded-xl border bg-white px-3.5 pr-10 text-sm text-zinc-900 transition-all duration-200 cursor-pointer",
              "border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100",
              "focus:border-emerald-500/80 focus:outline-none focus:ring-2 focus:ring-emerald-500/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 py-1"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 flex items-center text-zinc-400 dark:text-zinc-500">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        {error && <p className="text-xs text-rose-500 dark:text-rose-400">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
