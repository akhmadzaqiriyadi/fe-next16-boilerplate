"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { usePresence } from "@/hooks/use-presence";

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
  const { mounted, visible } = usePresence(isOpen, 220);

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

  if (!mounted) return null;

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
        "fixed inset-0 z-50 cursor-pointer transition-all duration-200 ease-out select-none",
        blurs[blur],
        opacities[opacity],
        visible ? "opacity-100" : "pointer-events-none opacity-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
