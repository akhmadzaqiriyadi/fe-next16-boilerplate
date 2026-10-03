"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DropdownMenuItem {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  onClick?: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: (DropdownMenuItem | "separator")[];
  align?: "left" | "right";
  className?: string;
}

export function DropdownMenu({
  trigger,
  items,
  align = "right",
  className,
}: DropdownMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

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
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 min-w-[200px] rounded-lg border border-zinc-200/80 bg-white p-1.5 shadow-xl backdrop-blur-md transition-all animate-in fade-in zoom-in-95",
            "dark:border-zinc-800/80 dark:bg-[#121215] dark:shadow-2xl",
            align === "right" ? "right-0" : "left-0",
            className
          )}
        >
          {items.map((item, index) => {
            if (item === "separator") {
              return (
                <div
                  key={`sep-${index}`}
                  className="my-1 h-[1px] bg-zinc-200/70 dark:bg-zinc-800/70"
                />
              );
            }

            return (
              <button
                key={`${item.label}-${index}`}
                disabled={item.disabled}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors select-none text-left cursor-pointer",
                  item.destructive
                    ? "text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40"
                    : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/60 dark:hover:text-white",
                  item.disabled && "pointer-events-none opacity-40"
                )}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <span className="text-zinc-400 shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
                {item.shortcut && (
                  <span className="font-mono text-[10px] tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                    {item.shortcut}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
