"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Backdrop } from "./backdrop";

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  side?: "right" | "left" | "top" | "bottom";
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

export function Sheet({
  isOpen,
  onClose,
  side = "right",
  title,
  description,
  children,
  size = "md",
  className,
}: SheetProps) {
  // Escape key listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sideAnimations = {
    right: "right-0 top-0 bottom-0 animate-in slide-in-from-right duration-300 border-l",
    left: "left-0 top-0 bottom-0 animate-in slide-in-from-left duration-300 border-r",
    top: "top-0 left-0 right-0 animate-in slide-in-from-top duration-300 border-b",
    bottom: "bottom-0 left-0 right-0 animate-in slide-in-from-bottom duration-300 border-t",
  };

  const horizontalSizes = {
    sm: "w-full max-w-sm",
    md: "w-full max-w-md",
    lg: "w-full max-w-xl",
    xl: "w-full max-w-2xl",
    full: "w-full max-w-none",
  };

  const verticalSizes = {
    sm: "h-64",
    md: "h-96",
    lg: "h-[32rem]",
    xl: "h-[40rem]",
    full: "h-full",
  };

  const isVertical = side === "top" || side === "bottom";
  const sizeClass = isVertical ? verticalSizes[size] : horizontalSizes[size];

  return (
    <>
      <Backdrop isOpen={isOpen} onClose={onClose} blur="md" opacity="medium" />

      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed z-50 flex flex-col bg-white shadow-2xl transition-all",
          "border-zinc-200/80 dark:border-zinc-800/80 dark:bg-[#121215] dark:shadow-2xl",
          sideAnimations[side],
          sizeClass,
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200/80 p-5 dark:border-zinc-800/80">
          <div className="space-y-1 pr-6">
            {title && (
              <h2 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Sheet"
            className="rounded-md p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </>
  );
}
