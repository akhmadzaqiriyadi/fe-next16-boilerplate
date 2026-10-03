"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  label?: string;
  className?: string;
}

export function Checkbox({
  checked,
  onCheckedChange,
  disabled = false,
  id,
  label,
  className,
}: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex items-center gap-2.5 select-none cursor-pointer group",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        role="checkbox"
        id={id}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange(!checked)}
        className={cn(
          "h-5 w-5 shrink-0 rounded-lg border transition-all duration-150 flex items-center justify-center",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50",
          checked
            ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-950"
            : "border-zinc-300 bg-white hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900/80 dark:hover:border-zinc-600"
        )}
      >
        {checked && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
      </button>
      {label && (
        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          {label}
        </span>
      )}
    </label>
  );
}
