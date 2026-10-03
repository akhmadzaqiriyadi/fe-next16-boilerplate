"use client";

import * as React from "react";

export function usePresence(isOpen: boolean, durationMs = 250) {
  const [mounted, setMounted] = React.useState(isOpen);
  const [visible, setVisible] = React.useState(isOpen);
  const [prevOpen, setPrevOpen] = React.useState(isOpen);

  // Synchronize state during render when isOpen changes
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setMounted(true);
    } else {
      setVisible(false);
    }
  }

  React.useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isOpen) {
      const raf = requestAnimationFrame(() => {
        setVisible(true);
      });
      return () => cancelAnimationFrame(raf);
    } else {
      timer = setTimeout(() => {
        setMounted(false);
      }, durationMs);
      return () => clearTimeout(timer);
    }
  }, [isOpen, durationMs]);

  return { mounted, visible };
}
