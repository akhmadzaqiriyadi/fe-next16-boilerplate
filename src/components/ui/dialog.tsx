"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Backdrop } from "./backdrop";
import { usePresence } from "@/hooks/use-presence";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = "md",
  className,
}: DialogProps) {
  const { mounted, visible } = usePresence(isOpen, 220);

  // Escape key handler
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <>
      {/* Reusable Backdrop with sync exit */}
      <Backdrop isOpen={isOpen} onClose={onClose} blur="md" opacity="medium" />

      {/* Modal Container */}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200",
          visible ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "pointer-events-auto relative w-full rounded-xl border border-zinc-200/80 bg-white p-6 shadow-2xl transition-all duration-200 ease-out select-none",
            "dark:border-zinc-800/80 dark:bg-[#121215] dark:shadow-2xl",
            visible
              ? "translate-y-0 scale-100 opacity-100 ease-out"
              : "translate-y-2 scale-95 opacity-0 ease-in",
            sizes[size],
            className
          )}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Dialog"
            className="absolute top-4 right-4 cursor-pointer rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Header */}
          {(title || description) && (
            <div className="mb-4 space-y-1.5 pr-8">
              {title && (
                <h2 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Body Content */}
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </>
  );
}
