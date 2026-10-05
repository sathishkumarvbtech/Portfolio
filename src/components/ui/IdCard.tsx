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
      // Damped spring physics: angle += velocity, velocity += (target - angle) * stiffness - velocity * damping
      const stiffness = 0.08;
      const damping = 0.85;

      // Add small idle sway when targetAngle is near 0
      const idleSway = Math.sin(performance.now() * 0.002) * 1.5;

      const force = (targetAngle - currentAngle) * stiffness;
      velocity = (velocity + force) * damping;
      currentAngle += velocity;

      // Slowly decay target angle back to 0
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
      
      {/* Lanyard Strap (30x48 px with scrolling text) */}
      <div className="relative w-[28px] h-[48px] bg-[#0d0d0d] rounded-t-sm shadow-md overflow-hidden flex flex-col items-center justify-center">
        {/* Repeating scrolling text on strap */}
        <div className="absolute inset-0 flex flex-col items-center animate-[strapScroll_8s_linear_infinite] whitespace-nowrap text-[8px] font-mono text-[#a9a6a0] py-1">
          <span className="rotate-90 my-2">SATHISHKUMAR</span>
          <span className="rotate-90 my-2">SOFTWARE</span>
          <span className="rotate-90 my-2">ENGINEER</span>
          <span className="rotate-90 my-2">MERN</span>
        </div>
      </div>

      {/* Metal Clip connecting strap to card */}
      <div className="w-7 h-3.5 bg-gradient-to-b from-[#77756f] via-[#e9e6e0] to-[#3a3a3a] rounded-sm shadow-sm z-20 flex items-center justify-center -mt-0.5">
        <div className="w-3.5 h-1 bg-[#0d0d0d] rounded-full" />
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
          className={`relative w-[290px] h-[386px] rounded-[24px] bg-white border border-[#0d0d0d]/15 shadow-xl transition-transform duration-700 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* ==================== FRONT OF CARD ==================== */}
          <div className="absolute inset-0 w-full h-full rounded-[24px] bg-white p-4 flex flex-col justify-between [backface-visibility:hidden]">
            {/* Top Black Band */}
            <div className="w-full bg-[#0d0d0d] text-[#f4f2ee] rounded-t-[18px] py-1.5 px-3 flex items-center justify-between font-mono text-xs">
              <span className="font-bold tracking-widest text-[11px]">DEVELOPER ID</span>
              <span className="text-[10px] text-[#a9a6a0]">SR-971</span>
            </div>

            {/* Centred Portrait Photo (118x144) */}
            <div className="flex flex-col items-center my-1">
              <div className="relative w-[118px] h-[144px] rounded-xl overflow-hidden p-[3px] bg-gradient-to-b from-[#0d0d0d] via-[#77756f] to-[#e9e6e0] shadow-md group-hover:scale-105 transition-transform duration-300">
                <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-[#f4f2ee]">
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
              <h3 className="font-bold text-base text-[#0d0d0d] leading-tight">
                {PROFILE.name}
              </h3>
              <p className="font-mono text-[10px] text-[#77756f] leading-snug">
                Senior Software Engineer & MERN Developer
              </p>
            </div>

            <div className="w-full border-t border-b border-[#0d0d0d]/10 py-2 px-1 grid grid-cols-3 text-center text-[10px] font-mono">
              <div>
                <span className="block text-[#a9a6a0]">ID NO.</span>
                <span className="font-bold text-[#0d0d0d]">5537B8</span>
              </div>
              <div>
                <span className="block text-[#a9a6a0]">DEPT.</span>
                <span className="font-bold text-[#0d0d0d]">ENG</span>
              </div>
              <div>
                <span className="block text-[#a9a6a0]">VALID TILL</span>
                <span className="font-bold text-[#0d0d0d]">{PROFILE.validTill}</span>
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
                    className="h-full bg-[#0d0d0d] inline-block"
                  />
                ))}
              </div>

              {/* Holographic Sticker */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#a9a6a0] via-[#e9e6e0] to-[#77756f] border border-white/60 shadow-inner flex items-center justify-center font-mono text-[9px] font-bold text-[#3a3a3a]">
                VERIFIED
              </div>
            </div>
          </div>

          {/* ==================== BACK OF CARD ==================== */}
          <div className="absolute inset-0 w-full h-full rounded-[24px] bg-[#0d0d0d] text-[#f4f2ee] p-5 flex flex-col justify-between [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div>
              <div className="font-mono text-xs text-[#a9a6a0] border-b border-white/10 pb-2 mb-3 flex justify-between">
                <span>WHAT I AM</span>
                <span>RESUME SUMMARY</span>
              </div>

              {/* Verbatim lines from resume */}
              <ul className="text-xs space-y-2 text-[#e9e6e0] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#a9a6a0] font-mono">•</span>
                  <span>Senior Software Engineer & MERN Developer (4+ Years)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#a9a6a0] font-mono">•</span>
                  <span>B.Tech in IT from K.S.R. Institute for Enginering and Technology (CGPA: 7.34)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#a9a6a0] font-mono">•</span>
                  <span>High-concurrency React & Next.js Architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#a9a6a0] font-mono">•</span>
                  <span>Key Systems: LMS for My Learn & MyLedger Platform</span>
                </li>
              </ul>
            </div>

            {/* Signature & Return notice */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="font-serif italic text-lg text-[#f4f2ee]">
                Sathishkumar V
              </div>
              <p className="font-mono text-[10px] text-[#a9a6a0]">
                If found, say hello · {PROFILE.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
