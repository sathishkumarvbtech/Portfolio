"use client";

import { useEffect, useRef, useState } from "react";
import { EXPERIENCE_PATH } from "@/lib/data";

export default function TimelinePath() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress 0..1 as section moves through viewport
      const totalDist = rect.height;
      const currentDist = windowHeight * 0.7 - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto pt-2 pb-0">
      
      {/* Vertical Spine Line (Drawn dynamically on scroll) */}
      <div className="absolute left-4 md:left-1/2 top-4 bottom-20 w-[2px] bg-[var(--line)] -translate-x-1/2">
        <div
          className="w-full bg-[var(--ink)] transition-all duration-100 ease-out origin-top"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Timeline Stops */}
      <div className="space-y-12 relative">
        {EXPERIENCE_PATH.map((item, index) => {
          // Stop lights up when progress reaches its index fraction
          const itemThreshold = (index + 0.5) / EXPERIENCE_PATH.length;
          const isLit = scrollProgress >= itemThreshold;
          const isEven = index % 2 === 0;

          if (item.type === "next") {
            return (
              <div
                key={item.id}
                className="relative flex flex-col items-center justify-center pt-10 z-20"
              >
                {/* Center Stop Node placed above card */}
                <div
                  className={`w-9 h-9 rounded-full border-2 border-dashed border-[var(--ink)] bg-[var(--card)] flex items-center justify-center z-30 transition-all duration-300 -mb-4 shadow-sm ${
                    isLit ? "scale-110 shadow-md bg-[var(--ink)] text-[var(--paper)] border-solid" : "text-[var(--ink)]"
                  }`}
                >
                  <span className="font-bold text-sm">↓</span>
                </div>

                {/* Dashed Card: Next - Your team? */}
                <div className="w-full max-w-md ml-12 md:ml-0 border-2 border-dashed border-[var(--line)] rounded-2xl p-6 pt-7 bg-[var(--card)] text-center space-y-2 shadow-sm relative z-20">
                  <span className="font-mono text-xs text-[var(--mute)] uppercase tracking-wider block font-semibold">
                    NEXT CHAPTER
                  </span>
                  <h3 className="text-xl font-bold text-[var(--ink)]">
                    Next — Your team?
                  </h3>
                  <p className="text-xs text-[var(--mute)] leading-relaxed">
                    Ready to engineer scalable web applications and lead frontend architecture.
                  </p>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className={`relative flex flex-col md:flex-row items-center ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Center Node Bullet */}
              <div
                className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-[var(--ink)] z-10 transition-all duration-300 ${
                  isLit ? "bg-[var(--ink)] scale-125 shadow-md" : "bg-[var(--card)]"
                }`}
              />

              {/* Content Card */}
              <div
                className={`w-full md:w-[calc(50%-2rem)] ml-12 md:ml-0 ${
                  isEven ? "md:pr-6" : "md:pl-6"
                }`}
              >
                <div
                  className={`p-6 space-y-3.5 rounded-2xl bg-[var(--card)] border transition-all duration-300 text-left ${
                    isLit
                      ? "border-[var(--ink)]/40 shadow-md translate-y-0"
                      : "border-[var(--line)] shadow-sm hover:border-[var(--ink)]/20"
                  }`}
                >
                  {/* Period Badge & Type */}
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="px-3 py-1 rounded-full bg-[var(--ink)] text-[var(--paper)] font-bold text-[11px]">
                      {item.period}
                    </span>
                    <span className="text-[var(--mute)] uppercase text-[10px] tracking-wider font-semibold">
                      {item.type}
                    </span>
                  </div>

                  {/* Role Title & Company */}
                  <div>
                    <h3 className="text-lg font-bold text-[var(--ink)] tracking-tight leading-snug">
                      {item.role}
                    </h3>
                    <p className="font-semibold text-xs text-[var(--mute)] mt-0.5">
                      {item.company} · <span className="font-normal">{item.location}</span>
                    </p>
                  </div>

                  {/* Details List */}
                  <ul className="space-y-1.5 text-xs text-[var(--ink-2)] leading-relaxed">
                    {item.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--mute)] font-mono text-[10px] mt-0.5">•</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Metrics Badge if present */}
                  {item.metrics && (
                    <div className="pt-2.5 border-t border-[var(--line)] flex justify-start">
                      <span className="inline-block font-mono text-[10px] font-bold px-2.5 py-1 rounded bg-[var(--soft)] text-[var(--ink)]">
                        ⚡ {item.metrics}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
