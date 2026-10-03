"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  startOfDay,
  isSameDay,
  isBeforeDay,
  isAfterDay,
  formatDate,
  formatMonthYear,
} from "@/lib/date-utils";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";

export interface DatePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Pilih tanggal...",
  disabled = false,
  className,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Current view month & year
  const initialDate = value || new Date();
  const [viewYear, setViewYear] = React.useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = React.useState(initialDate.getMonth());

  // Keep view aligned when value changes
  React.useEffect(() => {
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
  }, [value]);

  // Click outside to close
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  // Keyboard Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((prev) => prev - 1);
    } else {
      setViewMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((prev) => prev + 1);
    } else {
      setViewMonth((prev) => prev + 1);
    }
  };

  // Calendar day calculation (Monday as first day of week)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // 0 = Mon, 6 = Sun

  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(viewYear, viewMonth, day));
  }

  const today = new Date();

  const isDateDisabled = (d: Date) => {
    if (minDate && isBeforeDay(d, minDate)) return true;
    if (maxDate && isAfterDay(d, maxDate)) return true;
    return false;
  };

  const weekLabels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border bg-white px-3.5 text-sm transition-all duration-200 cursor-pointer select-none",
          "border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100",
          "focus-visible:border-emerald-500/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/20",
          isOpen && "border-emerald-500/80 ring-2 ring-emerald-500/20",
          disabled && "cursor-not-allowed opacity-50 bg-zinc-50 dark:bg-zinc-900/30"
        )}
      >
        <div className="flex items-center gap-2.5 truncate">
          <CalendarIcon className="h-4 w-4 text-zinc-400 shrink-0" />
          <span className={cn("truncate", !value && "text-zinc-400 dark:text-zinc-500")}>
            {value ? formatDate(value) : placeholder}
          </span>
        </div>
        {value && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange?.(null);
            }}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5 rounded-sm"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </button>

      {/* Popover Calendar */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 min-w-[280px] rounded-lg border border-zinc-200/80 bg-white p-3 shadow-xl backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#121215] dark:shadow-2xl animate-in fade-in zoom-in-95">
          {/* Header Navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-xs font-semibold tracking-tight text-zinc-900 dark:text-white capitalize">
              {formatMonthYear(viewYear, viewMonth)}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday Names */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {weekLabels.map((w) => (
              <span key={w} className="text-[10.5px] font-mono font-medium text-zinc-400 dark:text-zinc-500 py-1">
                {w}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, index) => {
              if (!d) {
                return <div key={`empty-${index}`} className="h-8 w-8" />;
              }

              const isSelected = isSameDay(d, value);
              const isToday = isSameDay(d, today);
              const disabledDay = isDateDisabled(d);

              return (
                <button
                  key={d.toISOString()}
                  type="button"
                  disabled={disabledDay}
                  onClick={() => {
                    onChange?.(d);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition-colors select-none",
                    disabledDay && "cursor-not-allowed opacity-25 hover:bg-transparent pointer-events-none",
                    isSelected
                      ? "bg-zinc-900 text-white dark:bg-emerald-500 dark:text-zinc-950 font-bold shadow-xs"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-white",
                    !isSelected && isToday && "border border-emerald-500/50 text-emerald-600 dark:text-emerald-400 font-semibold"
                  )}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer Quick Action */}
          <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                onChange?.(now);
                setViewYear(now.getFullYear());
                setViewMonth(now.getMonth());
                setIsOpen(false);
              }}
              className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Hari Ini
            </button>
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange?.(null);
                  setIsOpen(false);
                }}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
