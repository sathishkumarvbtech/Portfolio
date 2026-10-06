"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";

export default function IdCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [swingAngle, setSwingAngle] = useState(0);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  // Physics simulation for damped pendulum swing on mouse move
  useEffect(() => {
    let currentAngle = 0;
    let targetAngle = 0;
    let velocity = 0;
    let lastMouseX = 0;
    let lastTime = performance.now();
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      if (dt > 0) {
        const mouseVelX = (e.clientX - lastMouseX) / dt;
        // Map mouse velocity to swing angle max ±12 degrees
        targetAngle = Math.max(-12, Math.min(12, mouseVelX * 0.008));
      }
      lastMouseX = e.clientX;
      lastTime = now;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Spring damping animation loop
    const updatePhysics = () => {
      const stiffness = 0.08;
      const damping = 0.85;

      const idleSway = Math.sin(performance.now() * 0.002) * 1.5;

      const force = (targetAngle - currentAngle) * stiffness;
      velocity = (velocity + force) * damping;
      currentAngle += velocity;

      targetAngle *= 0.95;

      setSwingAngle(currentAngle + idleSway);
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none py-1">
      
      {/* Lanyard Strap */}
      <div className="relative w-[28px] h-[48px] bg-[var(--ink)] rounded-t-sm shadow-md overflow-hidden flex flex-col items-center justify-center">
        {/* Repeating scrolling text on strap */}
        <div className="absolute inset-0 flex flex-col items-center animate-[strapScroll_8s_linear_infinite] whitespace-nowrap text-[8px] font-mono text-[var(--paper)] opacity-80 py-1">
          <span className="rotate-90 my-2">SATHISHKUMAR</span>
          <span className="rotate-90 my-2">SOFTWARE</span>
          <span className="rotate-90 my-2">ENGINEER</span>
          <span className="rotate-90 my-2">MERN</span>
        </div>
      </div>

      {/* Metal Clip connecting strap to card */}
      <div className="w-7 h-3.5 bg-gradient-to-b from-gray-500 via-gray-300 to-gray-700 rounded-sm shadow-sm z-20 flex items-center justify-center -mt-0.5">
        <div className="w-3.5 h-1 bg-[var(--ink)] rounded-full" />
      </div>

      {/* Pendulum Swung Card Container */}
      <div
        ref={cardContainerRef}
        style={{
          transform: `rotate(${swingAngle}deg)`,
          transformOrigin: "top center",
          transition: "transform 0.1s ease-out",
        }}
        className="relative mt-1 cursor-pointer perspective-1000 group focus:outline-none"
        onClick={() => setIsFlipped((prev) => !prev)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Developer ID Card. Press Enter or tap to flip card."
      >
        {/* Card Frame (290x386 px) */}
        <div
          className={`relative w-[290px] h-[386px] rounded-[24px] bg-[var(--card)] border border-[var(--line)] shadow-xl transition-transform duration-700 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* ==================== FRONT OF CARD ==================== */}
          <div className="absolute inset-0 w-full h-full rounded-[24px] bg-[var(--card)] p-4 flex flex-col justify-between [backface-visibility:hidden]">
            {/* Top Black Band */}
            <div className="w-full bg-[var(--ink)] text-[var(--paper)] rounded-t-[18px] py-1.5 px-3 flex items-center justify-between font-mono text-xs">
              <span className="font-bold tracking-widest text-[11px]">DEVELOPER ID</span>
              <span className="text-[10px] opacity-75">SR-971</span>
            </div>

            {/* Centred Portrait Photo (118x144) */}
            <div className="flex flex-col items-center my-1">
              <div className="relative w-[118px] h-[144px] rounded-xl overflow-hidden p-[3px] bg-gradient-to-b from-[var(--ink)] via-[var(--mute)] to-[var(--line)] shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-[var(--paper)]">
                  <Image
                    src="/portrait-bust.webp"
                    alt="Sathishkumar V portrait photo"
                    fill
                    className="object-cover"
                    sizes="118px"
                  />
                </div>
              </div>
            </div>

            {/* ID Details Rows */}
            <div className="space-y-1 text-center px-2">
              <h3 className="font-bold text-base text-[var(--ink)] leading-tight">
                {PROFILE.name}
              </h3>
              <p className="font-mono text-[10px] text-[var(--mute)] leading-snug">
                Senior Software Engineer & MERN Developer
              </p>
            </div>

            <div className="w-full border-t border-b border-[var(--line)] py-2 px-1 grid grid-cols-3 text-center text-[10px] font-mono">
              <div>
                <span className="block text-[var(--faint)]">ID NO.</span>
                <span className="font-bold text-[var(--ink)]">5537B8</span>
              </div>
              <div>
                <span className="block text-[var(--faint)]">DEPT.</span>
                <span className="font-bold text-[var(--ink)]">ENG</span>
              </div>
              <div>
                <span className="block text-[var(--faint)]">VALID TILL</span>
                <span className="font-bold text-[var(--ink)]">{PROFILE.validTill}</span>
              </div>
            </div>

            {/* Bottom Barcode & Holographic Sticker */}
            <div className="flex items-center justify-between pt-1">
              {/* Barcode representation */}
              <div className="h-6 flex items-center gap-[2px] opacity-75">
                {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2].map((w, i) => (
                  <span
                    key={i}
                    style={{ width: `${w}px` }}
                    className="h-full bg-[var(--ink)] inline-block"
                  />
                ))}
              </div>

              {/* Holographic Sticker */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-400 via-gray-200 to-gray-600 dark:from-neutral-700 dark:via-neutral-500 dark:to-neutral-900 border border-white/40 shadow-inner flex items-center justify-center font-mono text-[9px] font-bold text-[var(--ink)]">
                VERIFIED
              </div>
            </div>
          </div>

          {/* ==================== BACK OF CARD ==================== */}
          <div className="absolute inset-0 w-full h-full rounded-[24px] bg-[var(--ink)] text-[var(--paper)] p-5 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div>
              <div className="font-mono text-xs opacity-75 border-b border-white/10 pb-2 mb-3 flex justify-between">
                <span>WHAT I AM</span>
                <span>RESUME SUMMARY</span>
              </div>

              {/* Verbatim lines from resume */}
              <ul className="text-xs space-y-2 opacity-90 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="opacity-60 font-mono">•</span>
                  <span>Senior Software Engineer & MERN Developer (4+ Years)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="opacity-60 font-mono">•</span>
                  <span>B.Tech in IT from K.S.R. Institute for Enginering and Technology (CGPA: 7.34)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="opacity-60 font-mono">•</span>
                  <span>High-concurrency React & Next.js Architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="opacity-60 font-mono">•</span>
                  <span>Key Systems: LMS for My Learn & MyLedger Platform</span>
                </li>
              </ul>
            </div>

            {/* Signature & Return notice */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="font-serif italic text-lg text-[var(--paper)]">
                Sathishkumar V
              </div>
              <p className="font-mono text-[10px] opacity-75">
                If found, say hello · {PROFILE.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
