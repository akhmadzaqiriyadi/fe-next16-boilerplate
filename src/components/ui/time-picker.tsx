"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Clock, ChevronUp, ChevronDown, X, Check } from "lucide-react";

export interface TimePickerProps {
  value?: string; // format "HH:mm" (24h)
  onChange?: (time: string) => void;
  format?: "24h" | "12h";
  minuteStep?: number; // default 5 (0, 5, 10, ..., 55)
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function TimePicker({
  value = "",
  onChange,
  format = "24h",
  minuteStep = 5,
  placeholder = "Pilih jam (JJ:MM)...",
  disabled = false,
  className,
}: TimePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const hoursListRef = React.useRef<HTMLDivElement>(null);
  const minutesListRef = React.useRef<HTMLDivElement>(null);

  // Parse current value
  const parseTime = (timeStr: string) => {
    if (!timeStr || !timeStr.includes(":")) {
      return { hours: "09", minutes: "00" };
    }
    const [h, m] = timeStr.split(":");
    return {
      hours: h.padStart(2, "0"),
      minutes: m.padStart(2, "0"),
    };
  };

  const { hours: currentH, minutes: currentM } = parseTime(value);
  const [selectedHour, setSelectedHour] = React.useState(currentH);
  const [selectedMinute, setSelectedMinute] = React.useState(currentM);

  // Sync internal state when external value changes
  React.useEffect(() => {
    if (value) {
      const { hours, minutes } = parseTime(value);
      setSelectedHour(hours);
      setSelectedMinute(minutes);
    }
  }, [value]);

  // Click outside listener
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

  // Escape key listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Generate lists
  const hoursList = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
  const minutesList = Array.from(
    { length: Math.ceil(60 / minuteStep) },
    (_, i) => String(i * minuteStep).padStart(2, "0")
  );

  const handleSelectTime = (h: string, m: string) => {
    setSelectedHour(h);
    setSelectedMinute(m);
    onChange?.(`${h}:${m}`);
  };

  const handleQuickPreset = (timeStr: string) => {
    const { hours, minutes } = parseTime(timeStr);
    setSelectedHour(hours);
    setSelectedMinute(minutes);
    onChange?.(timeStr);
    setIsOpen(false);
  };

  const handleNow = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const rawM = now.getMinutes();
    const roundedM = Math.round(rawM / minuteStep) * minuteStep;
    const finalM = String(roundedM >= 60 ? 55 : roundedM).padStart(2, "0");
    handleSelectTime(h, finalM);
    setIsOpen(false);
  };

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
          <Clock className="h-4 w-4 text-zinc-400 shrink-0" />
          <span className={cn("truncate font-mono text-xs sm:text-sm", !value && "text-zinc-400 dark:text-zinc-500 font-sans")}>
            {value ? `${value} WIB` : placeholder}
          </span>
        </div>
        {value && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onChange?.("");
            }}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5 rounded-sm"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </button>

      {/* Floating Popover Time Picker (Zero Native HTML) */}
      {isOpen && (
        <div className="absolute z-50 mt-1.5 w-[280px] rounded-lg border border-zinc-200/80 bg-white p-3.5 shadow-xl backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#121215] dark:shadow-2xl animate-in fade-in zoom-in-95">
          {/* Digital Clock Display Header */}
          <div className="flex items-center justify-center gap-2 pb-3 mb-3 border-b border-zinc-200/80 dark:border-zinc-800/80">
            <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 px-3 py-1.5 text-xl font-bold font-mono tracking-wider text-zinc-900 dark:text-white shadow-xs">
              {selectedHour}
            </div>
            <span className="text-xl font-bold text-zinc-400 animate-pulse">:</span>
            <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 px-3 py-1.5 text-xl font-bold font-mono tracking-wider text-zinc-900 dark:text-white shadow-xs">
              {selectedMinute}
            </div>
            <span className="text-xs font-mono text-zinc-400 font-semibold ml-1">WIB</span>
          </div>

          {/* Time Picker Columns (Hours & Minutes) */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            {/* Hours Column */}
            <div>
              <p className="text-[10.5px] font-mono uppercase text-zinc-400 dark:text-zinc-500 font-semibold mb-1.5 text-center">
                Jam (00-23)
              </p>
              <div
                ref={hoursListRef}
                className="h-44 overflow-y-auto space-y-1 rounded-md border border-zinc-200/70 dark:border-zinc-800/70 p-1 bg-zinc-50/50 dark:bg-zinc-900/30 scrollbar-thin"
              >
                {hoursList.map((h) => {
                  const isSelected = h === selectedHour;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleSelectTime(h, selectedMinute)}
                      className={cn(
                        "flex h-7 w-full items-center justify-center rounded-[4px] font-mono text-xs font-medium transition-colors select-none",
                        isSelected
                          ? "bg-zinc-900 text-white dark:bg-emerald-500 dark:text-zinc-950 font-bold shadow-xs"
                          : "text-zinc-700 hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                      )}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minutes Column */}
            <div>
              <p className="text-[10.5px] font-mono uppercase text-zinc-400 dark:text-zinc-500 font-semibold mb-1.5 text-center">
                Menit (:00-:55)
              </p>
              <div
                ref={minutesListRef}
                className="h-44 overflow-y-auto space-y-1 rounded-md border border-zinc-200/70 dark:border-zinc-800/70 p-1 bg-zinc-50/50 dark:bg-zinc-900/30 scrollbar-thin"
              >
                {minutesList.map((m) => {
                  const isSelected = m === selectedMinute;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleSelectTime(selectedHour, m)}
                      className={cn(
                        "flex h-7 w-full items-center justify-center rounded-[4px] font-mono text-xs font-medium transition-colors select-none",
                        isSelected
                          ? "bg-zinc-900 text-white dark:bg-emerald-500 dark:text-zinc-950 font-bold shadow-xs"
                          : "text-zinc-700 hover:bg-zinc-200/60 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                      )}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
            <div className="flex flex-wrap gap-1 mb-2.5">
              {["09:00", "12:00", "15:00", "18:00", "21:00"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleQuickPreset(t)}
                  className="px-1.5 py-0.5 rounded-[4px] border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-[10.5px] font-mono text-zinc-600 dark:text-zinc-300 transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={handleNow}
                className="font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Jam Sekarang
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange?.(`${selectedHour}:${selectedMinute}`);
                  setIsOpen(false);
                }}
                className="px-2.5 py-1 rounded-md bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 text-xs font-semibold hover:opacity-90 shadow-xs"
              >
                Pilih
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
