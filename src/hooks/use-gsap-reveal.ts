"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function useGsapReveal<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      gsap.from(containerRef.current.querySelectorAll(".gsap-fade-up"), {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: containerRef }
  );

  return containerRef;
}
