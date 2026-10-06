"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(true);

  // Video autoplay & user interaction sound unlock logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlayingSound(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {
          video.muted = true;
          video.play().catch(() => {});
          setIsPlayingSound(false);
          setAutoplayBlocked(true);
        });
    }

    const unlockSound = () => {
      if (video && video.muted) {
        video.muted = false;
        video
          .play()
          .then(() => {
            setIsPlayingSound(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {});
      }
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound);
    window.addEventListener("keydown", unlockSound);
    window.addEventListener("touchend", unlockSound);

    return () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("keydown", unlockSound);
      window.removeEventListener("touchend", unlockSound);
    };
  }, []);

  // IntersectionObserver: Pause video when <35% visible
  useEffect(() => {
    const heroEl = heroRef.current;
    const video = videoRef.current;
    if (!heroEl || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.35) {
          if (video.paused) {
            video.play().catch(() => {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      {
        threshold: [0, 0.35, 1.0],
      }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted || !isPlayingSound) {
      video.muted = false;
      video
        .play()
        .then(() => {
          setIsPlayingSound(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {});
    } else {
      video.muted = true;
      setIsPlayingSound(false);
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-svh w-full flex flex-col justify-between pt-24 pb-8 overflow-hidden bg-(--paper) transition-colors duration-300"
      aria-label="Hero Section"
    >
      {/* Giant Upper Background Watermark Text */}
      <div
        className="absolute top-20 left-0 right-0 w-full text-center pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-mono text-[10vw] sm:text-[11vw] lg:text-[12.5vw] font-black uppercase tracking-tighter text-[var(--ink)] opacity-[0.06] dark:opacity-[0.04] leading-none block whitespace-nowrap px-4">
          {PROFILE.name}
        </span>
      </div>

      {/* Main Hero Container */}
      <div className="site-container relative z-10 flex flex-col justify-between min-h-[calc(100svh-8rem)] w-full">
        
        {/* Top Bar: Status Badge & Floating Sound Control */}
        <div className="flex items-center justify-between w-full pt-2 z-20">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--card)]/80 backdrop-blur-md border border-[var(--line)] shadow-sm text-xs font-mono text-[var(--ink-2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for Senior Roles & Architecture</span>
          </div>

          {/* Floating Sound Control Button */}
          <button
            onClick={toggleSound}
            className="group relative px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center gap-2 text-xs font-semibold shadow-md active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]"
            aria-label={isPlayingSound ? "Mute video audio" : "Unmute video audio"}
          >
            {autoplayBlocked && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 animate-ping" />
            )}
            
            {/* Animated Soundwave / Mute Icon */}
            {isPlayingSound ? (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-full bg-(--paper) animate-[bounce_0.6s_infinite_100ms]" />
                <span className="w-0.5 h-2/3 bg-(--paper) animate-[bounce_0.6s_infinite_200ms]" />
                <span className="w-0.5 h-full bg-(--paper) animate-[bounce_0.6s_infinite_300ms]" />
              </div>
            ) : (
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}

            <span>{isPlayingSound ? "Sound On" : "Enable Sound"}</span>
          </button>
        </div>

        {/* Center Standing Cutout Video */}
        <div className="relative w-full flex-1 flex items-center justify-center my-auto z-10 pointer-events-none">
          <div className="relative h-[56svh] md:h-[68svh] lg:h-[74svh] aspect-[768/960] max-w-full">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal select-none pointer-events-auto"
              aria-label="Video introduction of Sathishkumar V"
            >
              <source src="/hero/hero.webm" type="video/webm" />
              <source src="/hero/hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Bottom Hero Layout: Left Typography & Right CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end pb-2 z-20">
          
          {/* Left Column: Kicker, Headline, Subtitle & Initials Mark */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-[var(--mute)]">
              <span className="font-bold uppercase tracking-widest text-[var(--ink)]">
                {PROFILE.name}
              </span>
              <span>—</span>
              <span className="uppercase text-[11px] tracking-wider">
                Senior Software Engineer & MERN Developer
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-extrabold tracking-tight text-[var(--ink)] leading-[1.02]">
              Senior Software <br />
              Engineer & MERN Stack Developer.
            </h1>

            <p className="text-sm md:text-base text-[var(--mute)] max-w-xl leading-relaxed font-medium">
              Engineering high-throughput, secure, and production-scalable web applications in React.js, Next.js & MERN architecture.
            </p>

            {/* Bottom Initials Badge */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[var(--ink)] text-[var(--paper)] font-mono font-bold text-xs flex items-center justify-center shadow-md">
                {PROFILE.initials}
              </div>
              <span className="font-mono text-xs text-[var(--mute)]">
                5+ Years Production Experience · Dubai & India
              </span>
            </div>
          </div>

          {/* Right Column: Action CTAs */}
          <div className="lg:col-span-4 flex flex-wrap lg:flex-col items-start lg:items-end justify-start lg:justify-end gap-3 pt-2">
            <button
              onClick={() => scrollToTarget("work")}
              className="btn-pill-primary w-full sm:w-auto text-center"
            >
              Explore work ↗
            </button>
            <button
              onClick={() => scrollToTarget("contact")}
              className="btn-pill-secondary w-full sm:w-auto text-center"
            >
              Let&apos;s talk
            </button>
            <a
              href={PROFILE.resumePath}
              download
              className="btn-pill-secondary gap-2 w-full sm:w-auto text-center justify-center"
            >
              Résumé ↓
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
