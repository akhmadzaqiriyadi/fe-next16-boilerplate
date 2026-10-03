"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BackdropProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose?: () => void;
  blur?: "none" | "sm" | "md" | "lg";
  opacity?: "subtle" | "medium" | "heavy";
}

export function Backdrop({
  isOpen,
  onClose,
  blur = "md",
  opacity = "medium",
  className,
  children,
  ...props
}: BackdropProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const blurs = {
    none: "",
    sm: "backdrop-blur-xs",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-xl",
  };

  const opacities = {
    subtle: "bg-black/35",
    medium: "bg-black/60",
    heavy: "bg-black/80",
  };

  return (
    <div
      role="presentation"
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-50 transition-opacity duration-300 animate-in fade-in cursor-pointer select-none",
        blurs[blur],
        opacities[opacity],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
