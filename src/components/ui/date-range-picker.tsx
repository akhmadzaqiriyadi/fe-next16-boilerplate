"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  startOfDay,
  isSameDay,
  isBeforeDay,
  isAfterDay,
  isBetweenDays,
  formatDate,
  formatMonthYear,
} from "@/lib/date-utils";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from "lucide-react";

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function DateRangePicker({
  value = { from: null, to: null },
  onChange,
  minDate,
  maxDate,
  placeholder = "Pilih rentang tanggal...",
  disabled = false,
  className,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [hoveredDate, setHoveredDate] = React.useState<Date | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Default view to 'from' date or today
  const [viewYear, setViewYear] = React.useState(() => (value.from || new Date()).getFullYear());
  const [viewMonth, setViewMonth] = React.useState(() => (value.from || new Date()).getMonth());
  const [prevFrom, setPrevFrom] = React.useState(value.from);

  // Sync view when range changes externally
  if (value.from !== prevFrom) {
    setPrevFrom(value.from);
    if (value.from) {
      setViewYear(value.from.getFullYear());
      setViewMonth(value.from.getMonth());
    }
  }

  // Click outside listener
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setHoveredDate(null);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  // Escape key listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        setHoveredDate(null);
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

  // Calendar days grid
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Monday = 0

  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(new Date(viewYear, viewMonth, d));
  }

  const isDateDisabled = (d: Date) => {
    if (minDate && isBeforeDay(d, minDate)) return true;
    if (maxDate && isAfterDay(d, maxDate)) return true;
    return false;
  };

  /**
   * ROBUST ZERO-BUG RANGE SELECTION LOGIC:
   * 1. If no start date or both start & end date already chosen:
   *    Clicking sets new 'from', resets 'to'.
   * 2. If 'from' is set but no 'to':
   *    - If clicked date is BEFORE 'from' (H-1 / invalid past date):
   *      Instantly reset 'from' to clicked date (prevents negative range bug!).
   *    - If clicked date is SAME or AFTER 'from':
   *      Sets 'to' and completes the range.
   */
  const handleDateClick = (d: Date) => {
    if (!value.from || (value.from && value.to)) {
      // First click: start new range
      onChange?.({ from: d, to: null });
    } else if (value.from && !value.to) {
      // Second click
      if (isBeforeDay(d, value.from)) {
        // User clicked a date BEFORE 'from' -> Auto-fix: make it the new start date!
        onChange?.({ from: d, to: null });
      } else {
        // Valid end date: from <= to
        onChange?.({ from: value.from, to: d });
        setIsOpen(false);
        setHoveredDate(null);
      }
    }
  };

  const weekLabels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

  // Effective end date for visual highlighting while hovering
  const effectiveTo =
    value.to ||
    (value.from && hoveredDate && !isBeforeDay(hoveredDate, value.from) ? hoveredDate : null);

  const displayText =
    value.from && value.to
      ? `${formatDate(value.from)} - ${formatDate(value.to)}`
      : value.from
        ? `${formatDate(value.from)} - Pilih tgl akhir...`
        : placeholder;

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
          "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border bg-white px-3.5 text-sm transition-all duration-200 select-none",
          "border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100",
          "focus-visible:border-emerald-500/80 focus-visible:ring-2 focus-visible:ring-emerald-500/20 focus-visible:outline-none",
          isOpen && "border-emerald-500/80 ring-2 ring-emerald-500/20",
          disabled && "cursor-not-allowed bg-zinc-50 opacity-50 dark:bg-zinc-900/30"
        )}
      >
        <div className="flex items-center gap-2.5 truncate">
          <CalendarIcon className="h-4 w-4 shrink-0 text-zinc-400" />
          <span
            className={cn(
              "truncate text-xs sm:text-sm",
              !value.from && "text-zinc-400 dark:text-zinc-500"
            )}
          >
            {displayText}
          </span>
        </div>
        {value.from && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange?.({ from: null, to: null });
            }}
            className="rounded-sm p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </button>

      {/* Popover Calendar */}
      {isOpen && (
        <div className="animate-in fade-in zoom-in-95 absolute z-50 mt-1.5 w-[310px] rounded-lg border border-zinc-200/80 bg-white p-3.5 shadow-xl backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#121215] dark:shadow-2xl">
          {/* Header Navigation */}
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span className="text-xs font-semibold tracking-tight text-zinc-900 capitalize dark:text-white">
              {formatMonthYear(viewYear, viewMonth)}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Weekday Names */}
          <div className="mb-1 grid grid-cols-7 gap-1 text-center">
            {weekLabels.map((w) => (
              <span
                key={w}
                className="py-1 font-mono text-[10.5px] font-medium text-zinc-400 dark:text-zinc-500"
              >
                {w}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {days.map((d, index) => {
              if (!d) {
                return <div key={`empty-${index}`} className="h-8 w-8" />;
              }

              const disabledDay = isDateDisabled(d);
              const isStart = value.from && isSameDay(d, value.from);
              const isEnd = effectiveTo && isSameDay(d, effectiveTo);
              const isInRange =
                value.from && effectiveTo && isBetweenDays(d, value.from, effectiveTo);

              return (
                <div
                  key={d.toISOString()}
                  className={cn(
                    "relative flex h-8 w-full items-center justify-center",
                    isInRange && "bg-emerald-500/10 dark:bg-emerald-500/15",
                    isStart &&
                      effectiveTo &&
                      !isSameDay(value.from, effectiveTo) &&
                      "rounded-l-md bg-emerald-500/10 dark:bg-emerald-500/15",
                    isEnd &&
                      value.from &&
                      !isSameDay(value.from, effectiveTo) &&
                      "rounded-r-md bg-emerald-500/10 dark:bg-emerald-500/15"
                  )}
                >
                  <button
                    type="button"
                    disabled={disabledDay}
                    onMouseEnter={() => {
                      if (value.from && !value.to) {
                        setHoveredDate(d);
                      }
                    }}
                    onClick={() => handleDateClick(d)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition-colors select-none",
                      disabledDay &&
                        "pointer-events-none cursor-not-allowed opacity-25 hover:bg-transparent",
                      isStart || isEnd
                        ? "z-10 bg-zinc-900 font-bold text-white shadow-xs dark:bg-emerald-500 dark:text-zinc-950"
                        : isInRange
                          ? "font-medium text-emerald-800 dark:text-emerald-300"
                          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-white"
                    )}
                  >
                    {d.getDate()}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Quick Preset Buttons */}
          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-zinc-100 pt-3 text-[11px] dark:border-zinc-800/60">
            <button
              type="button"
              onClick={() => {
                const now = startOfDay(new Date());
                const next7 = new Date(now);
                next7.setDate(next7.getDate() + 7);
                onChange?.({ from: now, to: next7 });
                setViewYear(now.getFullYear());
                setViewMonth(now.getMonth());
                setIsOpen(false);
              }}
              className="rounded-[4px] border border-zinc-200 px-2 py-1 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              +7 Hari
            </button>
            <button
              type="button"
              onClick={() => {
                const now = startOfDay(new Date());
                const next30 = new Date(now);
                next30.setDate(next30.getDate() + 30);
                onChange?.({ from: now, to: next30 });
                setViewYear(now.getFullYear());
                setViewMonth(now.getMonth());
                setIsOpen(false);
              }}
              className="rounded-[4px] border border-zinc-200 px-2 py-1 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              +30 Hari
            </button>
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
                const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                onChange?.({ from: firstDay, to: lastDay });
                setViewYear(now.getFullYear());
                setViewMonth(now.getMonth());
                setIsOpen(false);
              }}
              className="rounded-[4px] border border-zinc-200 px-2 py-1 text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Bulan Ini
            </button>
            <button
              type="button"
              onClick={() => {
                onChange?.({ from: null, to: null });
                setIsOpen(false);
              }}
              className="ml-auto px-2 py-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
