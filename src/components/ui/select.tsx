"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  error?: string;
  className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue = "",
      onChange,
      onValueChange,
      placeholder = "Pilih opsi...",
      disabled = false,
      name,
      id,
      error,
      className,
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    const selectedOption = options.find((opt) => opt.value === currentValue);

    // Close on outside click
    React.useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleOutsideClick);
      }
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
      };
    }, [isOpen]);

    // Handle Escape key
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isOpen) {
          setIsOpen(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const handleSelect = (val: string) => {
      if (!isControlled) {
        setUncontrolledValue(val);
      }
      onValueChange?.(val);
      onChange?.({ target: { value: val, name } });
      setIsOpen(false);
    };

    return (
      <div ref={ref} className={cn("w-full space-y-1.5", className)}>
        {/* Hidden input for form submits */}
        {name && <input type="hidden" name={name} value={currentValue} />}

        <div ref={containerRef} className="relative w-full">
          {/* Custom Trigger */}
          <button
            id={id}
            type="button"
            disabled={disabled}
            onClick={() => setIsOpen((prev) => !prev)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className={cn(
              "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border bg-white px-3.5 text-sm transition-all duration-200 select-none",
              "border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100",
              "focus-visible:border-emerald-500/80 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:outline-none",
              isOpen && "border-emerald-500/80 ring-2 ring-emerald-500/20",
              disabled && "cursor-not-allowed bg-zinc-50 opacity-50 dark:bg-zinc-900/30",
              error &&
                "border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20"
            )}
          >
            <span
              className={cn(
                "truncate text-left",
                !selectedOption && "text-zinc-400 dark:text-zinc-500"
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown
              className={cn(
                "ml-2 h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200",
                isOpen && "rotate-180 text-emerald-500"
              )}
            />
          </button>

          {/* Custom Floating Popover (Zero Native HTML) */}
          {isOpen && (
            <div
              role="listbox"
              className={cn(
                "animate-in fade-in zoom-in-95 absolute z-50 mt-1.5 w-full rounded-lg border border-zinc-200/80 bg-white p-1.5 shadow-xl backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#121215] dark:shadow-2xl",
                "max-h-60 space-y-0.5 overflow-y-auto"
              )}
            >
              {options.map((opt) => {
                const isSelected = opt.value === currentValue;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={opt.disabled}
                    onClick={() => !opt.disabled && handleSelect(opt.value)}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between rounded-md px-2.5 py-2 text-left text-xs font-medium transition-colors select-none",
                      isSelected
                        ? "bg-emerald-500/10 font-semibold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60 dark:hover:text-white",
                      opt.disabled && "cursor-not-allowed opacity-40 hover:bg-transparent"
                    )}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {error && <p className="text-xs text-rose-500 dark:text-rose-400">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
