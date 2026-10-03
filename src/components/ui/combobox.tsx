"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, ChevronDown, Check, X } from "lucide-react";

export interface ComboboxOption {
  value: string;
  label: string;
  category?: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Pilih item...",
  searchPlaceholder = "Cari item...",
  emptyMessage = "Tidak ada hasil ditemukan.",
  className,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(query.toLowerCase()));
  }, [options, query]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border bg-white px-3.5 text-sm transition-all duration-200 select-none",
          "border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100",
          "focus-visible:border-emerald-500/80 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:outline-none",
          isOpen && "border-emerald-500/80 ring-2 ring-emerald-500/20"
        )}
      >
        <span className={cn("truncate", !selectedOption && "text-zinc-400 dark:text-zinc-500")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-zinc-400" />
      </button>

      {/* Floating Popover */}
      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute z-50 mt-1.5 w-full rounded-lg border border-zinc-200/80 bg-white p-1.5 shadow-xl backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#121215] dark:shadow-2xl">
          {/* Search Field */}
          <div className="relative mb-1.5 flex items-center border-b border-zinc-200/70 pb-1.5 dark:border-zinc-800/70">
            <Search className="absolute left-2.5 h-3.5 w-3.5 text-zinc-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-8 w-full bg-transparent pr-7 pl-8 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none dark:text-zinc-100 dark:placeholder:text-zinc-500"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Options List */}
          <div className="max-h-56 space-y-0.5 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="p-3 text-center text-xs text-zinc-400 dark:text-zinc-500">
                {emptyMessage}
              </p>
            ) : (
              filtered.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setQuery("");
                    }}
                    className={cn(
                      "flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-colors select-none",
                      isSelected
                        ? "bg-emerald-500/10 font-semibold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60 dark:hover:text-white"
                    )}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
