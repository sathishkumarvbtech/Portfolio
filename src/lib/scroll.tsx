"use client";

import { useEffect, useState, createContext, useContext } from "react";
import Lenis from "lenis";

let lenisGlobal: Lenis | null = null;

const ScrollContext = createContext<Lenis | null>(null);

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenisGlobal = lenis;
    queueMicrotask(() => {
      setLenisInstance(lenis);
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenisInstance(null);
      lenisGlobal = null;
    };
  }, []);

  return (
    <ScrollContext.Provider value={lenisInstance}>
      {children}
    </ScrollContext.Provider>
  );
}

export function scrollToTarget(targetId: string) {
  const element = document.getElementById(targetId);
  if (!element) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    element.scrollIntoView({ behavior: "auto" });
    return;
  }

  if (lenisGlobal) {
    lenisGlobal.scrollTo(element, { duration: 1.2 });
  } else {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export function useLenis() {
  return useContext(ScrollContext);
}

