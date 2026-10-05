"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const titleLines = ["Let's build", "something together."];

  return (
    <section id="contact" className="site-container section-padding border-t border-[#0d0d0d]/10 flex flex-col justify-between min-h-[90vh]">
      
      {/* Top Section Tag */}
      <div className="rv space-y-2" style={{ "--i": 1 } as React.CSSProperties}>
        <span className="section-tag">06 — Contact</span>
      </div>

      {/* Main Interactive Hopping Letter Heading */}
      <div className="rv my-auto space-y-4 py-8" style={{ "--i": 2 } as React.CSSProperties}>
        {titleLines.map((line, lIdx) => (
          <h2
            key={lIdx}
            className="section-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter flex flex-wrap gap-x-2 sm:gap-x-4 select-none"
          >
            {line.split(" ").map((word, wIdx) => (
              <span key={wIdx} className="inline-flex overflow-hidden py-2">
                {word.split("").map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-4 cursor-default hover:text-[#77756f]"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
            {lIdx === 1 && <span className="serif-italic ml-2">.</span>}
          </h2>
        ))}

        {/* Email with Large Underline & Copy Chip */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="text-xl sm:text-3xl md:text-4xl font-mono font-bold text-[#0d0d0d] underline underline-offset-8 decoration-2 hover:text-[#77756f] transition-colors"
          >
            {PROFILE.email}
          </a>

          {/* Copy Chip with aria-live */}
          <button
            onClick={handleCopyEmail}
            className="px-4 py-2 rounded-full bg-white border border-[#0d0d0d]/15 text-xs font-semibold text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#f4f2ee] shadow-sm transition-all duration-200"
            aria-label="Copy email address to clipboard"
          >
            {copied ? "Copied ✓" : "Copy email"}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>

        {/* Phone Links & Socials */}
        <div className="pt-6 flex flex-wrap items-center gap-6 text-sm font-semibold">
          <a
            href={PROFILE.phoneHrefUAE}
            className="flex items-center gap-2 hover:underline text-[#0d0d0d]"
          >
            <span>🇦🇪 UAE:</span>
            <span>{PROFILE.phoneUAE}</span>
          </a>
          <a
            href={PROFILE.phoneHrefIndia}
            className="flex items-center gap-2 hover:underline text-[#0d0d0d]"
          >
            <span>🇮🇳 India:</span>
            <span>{PROFILE.phoneIndia}</span>
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill-secondary text-xs py-2.5 px-4"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      {/* Rotating Circular 'Say Hello' Badge & Footer */}
      <div className="pt-12 border-t border-[#0d0d0d]/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Rotating SVG Badge */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg
            className="w-full h-full animate-[spin_12s_linear_infinite]"
            viewBox="0 0 100 100"
          >
            <path
              id="circlePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="font-mono text-[9px] uppercase font-bold fill-[#0d0d0d] tracking-widest">
              <textPath href="#circlePath" startOffset="0%">
                • SAY HELLO • GET IN TOUCH • SATHISHKUMAR V
              </textPath>
            </text>
          </svg>
          <div className="absolute w-3 h-3 rounded-full bg-[#0d0d0d]" />
        </div>

        {/* Footer Lines */}
        <div className="flex flex-col sm:flex-row items-center gap-6 font-mono text-xs text-[#77756f]">
          <span>© {new Date().getFullYear()} {PROFILE.name}</span>
          <span>•</span>
          <button
            onClick={() => scrollToTarget("hero")}
            className="hover:text-[#0d0d0d] underline underline-offset-4"
          >
            Back to top ↑
          </button>
          <span>•</span>
          <span>Built with Next.js 15</span>
        </div>

      </div>
    </section>
  );
}
