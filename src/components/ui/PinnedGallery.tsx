"use client";

import { useEffect, useState } from "react";
import { ACHIEVEMENTS } from "@/lib/data";
import TechLogo from "./TechLogo";

export default function PinnedGallery() {
  const [activeSetIndex, setActiveSetIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [countedValues, setCountedValues] = useState<Record<string, number>>({});

  // Divide achievements into 3 sets of 3 items
  const cardSets = [
    {
      id: "set-1",
      label: "Set 01 — Scale & Experience",
      cards: ACHIEVEMENTS.slice(0, 3),
    },
    {
      id: "set-2",
      label: "Set 02 — Performance & Quality",
      cards: ACHIEVEMENTS.slice(3, 6),
    },
    {
      id: "set-3",
      label: "Set 03 — Architecture & Delivery",
      cards: ACHIEVEMENTS.slice(6, 8),
      isFinalSet: true,
    },
  ];

  // Auto-carousel timer (advance every 4.5 seconds when not hovered)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveSetIndex((prev) => (prev + 1) % cardSets.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, cardSets.length]);

  // Count up animation over 1.2s with easeOutQuart whenever activeSetIndex changes
  useEffect(() => {
    const startTime = performance.now();
    const duration = 1200;

    const animateCount = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      const nextValues: Record<string, number> = {};
      ACHIEVEMENTS.forEach((ach) => {
        nextValues[ach.id] = Math.floor(ach.numValue * eased);
      });

      setCountedValues(nextValues);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    const id = requestAnimationFrame(animateCount);
    return () => cancelAnimationFrame(id);
  }, [activeSetIndex]);

  const handlePrev = () => {
    setActiveSetIndex((prev) => (prev - 1 + cardSets.length) % cardSets.length);
  };

  const handleNext = () => {
    setActiveSetIndex((prev) => (prev + 1) % cardSets.length);
  };

  return (
    <section
      id="achievements"
      className="relative w-full py-16 md:py-24 bg-[var(--paper)] border-t border-[var(--line)] overflow-hidden transition-colors duration-300"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="site-container w-full space-y-10">
        
        {/* Header with Title & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="section-tag">05 — Performance & Metrics</span>
            <h2 className="section-heading text-3xl sm:text-4xl md:text-5xl">
              Proven <span className="serif-italic">impact.</span>
            </h2>
          </div>

          {/* Set Tabs & Navigation Arrows */}
          <div className="flex flex-wrap items-center gap-3">
            {/* 3 Set Indicator Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[var(--card)] border border-[var(--line)] shadow-sm">
              {cardSets.map((set, idx) => {
                const isActive = idx === activeSetIndex;
                return (
                  <button
                    key={set.id}
                    onClick={() => setActiveSetIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[var(--ink)] text-[var(--paper)] shadow-sm"
                        : "text-[var(--mute)] hover:text-[var(--ink)] hover:bg-[var(--ink)]/5"
                    }`}
                  >
                    Set 0{idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-[var(--card)] border border-[var(--line)] flex items-center justify-center font-bold text-xs text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-all shadow-sm cursor-pointer"
                aria-label="Previous card set"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-[var(--card)] border border-[var(--line)] flex items-center justify-center font-bold text-xs text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-all shadow-sm cursor-pointer"
                aria-label="Next card set"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Active Set Subtitle Tag */}
        <div className="flex items-center justify-between font-mono text-xs text-[var(--mute)] border-b border-[var(--line)] pb-3">
          <span className="font-semibold text-[var(--ink)] uppercase tracking-wider">
            {cardSets[activeSetIndex].label}
          </span>
          <span className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isPaused ? "bg-amber-500" : "bg-emerald-500 animate-pulse"
              }`}
            />
            {isPaused ? "Paused on hover" : "Auto-rotating (4.5s)"}
          </span>
        </div>

        {/* 3 Card Set Display Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardSets[activeSetIndex].cards.map((card) => {
            const currentNum = countedValues[card.id] ?? 0;

            return (
              <div
                key={card.id}
                className="relative rounded-[28px] bg-[var(--card)] p-6 md:p-8 flex flex-col justify-between shadow-md shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-all duration-300 min-h-[300px] border border-[var(--line)] hover:-translate-y-1"
              >
                {/* Top: Tech Logo Tile & Index */}
                <div className="flex items-center justify-between">
                  <div className="relative w-[64px] h-[64px] rounded-2xl bg-[var(--paper)] p-2.5 flex items-center justify-center border border-[var(--line)]">
                    <TechLogo brandKey={card.platformIconKey} size={40} />
                  </div>
                  <span className="font-mono text-xs font-bold text-[var(--mute)]">
                    {card.index}
                  </span>
                </div>

                {/* Bottom: Information & Count-up Number */}
                <div className="flex items-end justify-between gap-4 pt-6 border-t border-[var(--line)]">
                  <div className="space-y-1 max-w-[62%]">
                    <span className="font-mono text-[10px] uppercase text-[var(--faint)] block tracking-wider leading-normal font-semibold">
                      {card.platformName}
                    </span>
                    <h3 className="font-bold text-base md:text-lg text-[var(--ink)] leading-snug">
                      {card.label}
                    </h3>
                    <p className="text-xs text-[var(--mute)] line-clamp-2 leading-relaxed">
                      {card.caption}
                    </p>
                  </div>

                  {/* Count-Up Metric */}
                  <div className="text-right">
                    <span className="font-mono text-3xl md:text-4xl font-extrabold text-[var(--ink)] tracking-tighter block leading-none">
                      {card.number.includes("%")
                        ? `${currentNum}%`
                        : card.number.includes("+")
                        ? `${currentNum.toLocaleString()}+`
                        : currentNum}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--faint)]">
                      {card.unit}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Third slot for final set: "and counting →" card */}
          {cardSets[activeSetIndex].isFinalSet && (
            <div className="rounded-[28px] border-2 border-dashed border-[var(--line)] p-8 flex flex-col items-center justify-center text-center min-h-[300px] bg-[var(--card)]/60 shadow-sm space-y-2 hover:border-[var(--ink)]/40 transition-colors">
              <span className="font-serif italic text-3xl text-[var(--ink)]">
                and counting →
              </span>
              <span className="font-mono text-xs text-[var(--mute)] max-w-[200px]">
                Always engineering higher throughput & zero-downtime releases
              </span>
            </div>
          )}
        </div>

        {/* Footer Indicators & Carousel Progress Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[var(--mute)] pt-4">
          <span>Set {activeSetIndex + 1} of 3 — Click tabs or arrows to jump sets</span>
          
          {/* Progress Bar for Current Set */}
          <div className="w-full sm:w-48 h-1.5 bg-[var(--line)] rounded-full overflow-hidden">
            <div
              key={activeSetIndex}
              className={`h-full bg-[var(--ink)] rounded-full ${
                isPaused ? "w-full opacity-60" : "animate-progress"
              }`}
              style={{
                animationDuration: "4.5s",
                animationTimingFunction: "linear",
              }}
            />
          </div>
        </div>
      </div>

      {/* Inline animation keyframe for progress bar */}
      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 4.5s linear infinite;
        }
      `}</style>
    </section>
  );
}
