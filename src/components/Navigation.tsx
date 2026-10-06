"use client";

import { useState, useEffect } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";
import { useTheme } from "@/lib/theme";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const { theme, toggleTheme } = useTheme();

  // Handle scroll detection for initials mark and frosted nav pill
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = ["hero", ...NAV.map((n) => n.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock scroll on mobile menu open & handle Esc key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    scrollToTarget(id);
  };

  return (
    <>
      {/* Top 2px Ink Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--ink)] z-50 origin-left transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Main Floating Header */}
      <header className="fixed top-4 left-0 right-0 z-40 px-4 md:px-8 pointer-events-none">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          
          {/* Left: Initials Mark + Full Name */}
          <button
            onClick={() => handleNavClick("hero")}
            className="pointer-events-auto flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)] rounded-full p-1 transition-all"
            aria-label="Scroll to top / Hero"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs border transition-all duration-300 group-hover:rotate-[360deg] ${
                scrolled
                  ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                  : "bg-transparent text-[var(--ink)] border-[var(--ink)]/30"
              }`}
            >
              {PROFILE.initials}
            </div>
            <span
              className={`font-semibold text-sm tracking-tight text-[var(--ink)] transition-opacity duration-300 hidden sm:inline-block ${
                scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {PROFILE.name}
            </span>
          </button>

          {/* Desktop Centre/Right: Nav Links Glass Pill */}
          <div className="pointer-events-auto hidden md:flex items-center gap-2">
            <nav
              aria-label="Primary Navigation"
              className={`flex items-center gap-1 p-1.5 rounded-full border transition-all duration-300 relative ${
                scrolled
                  ? "bg-[var(--nav-bg)] backdrop-blur-md border-[var(--nav-border)] shadow-lg shadow-black/5"
                  : "bg-[var(--nav-bg)] backdrop-blur-sm border-[var(--line)]"
              }`}
            >
              {NAV.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2 text-xs font-semibold rounded-full transition-colors duration-200 z-10 ${
                      isActive ? "text-[var(--paper)]" : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* Sliding active indicator pill */}
                    {isActive && (
                      <span
                        className="absolute inset-0 bg-[var(--ink)] rounded-full -z-10 shadow-sm"
                        style={{ transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
                      />
                    )}
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-105 active:scale-95 ${
                scrolled
                  ? "bg-[var(--nav-bg)] backdrop-blur-md border-[var(--nav-border)] text-[var(--ink)] shadow-md"
                  : "bg-[var(--card)] border-[var(--line)] text-[var(--ink)] shadow-sm"
              }`}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                /* Sun Icon */
                <svg className="w-4 h-4 text-amber-300 animate-spin-once" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                /* Moon Icon */
                <svg className="w-4 h-4 text-[var(--ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Menu Trigger */}
          <div className="pointer-events-auto md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--card)] border border-[var(--line)] text-[var(--ink)] shadow-sm"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <svg className="w-4 h-4 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[var(--ink)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="px-4 py-2 rounded-full bg-[var(--ink)] text-[var(--paper)] text-xs font-semibold shadow-md active:scale-95 transition-transform"
              aria-expanded={mobileMenuOpen}
              aria-label="Open navigation menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Paper Overlay */}
      <div
        className={`fixed inset-0 bg-[var(--paper)] z-50 flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto [clip-path:circle(150%_at_top_right)]"
            : "opacity-0 pointer-events-none [clip-path:circle(0%_at_top_right)]"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Overlay Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-mono font-bold text-xs">
              {PROFILE.initials}
            </div>
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded-full border border-[var(--line)] text-xs font-mono flex items-center gap-1.5 text-[var(--ink)] bg-[var(--card)]"
            >
              {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--ink)] font-bold text-lg hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        {/* Big Numbered Staggered Links */}
        <nav aria-label="Mobile Navigation" className="flex flex-col gap-6 my-auto">
          {NAV.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-baseline gap-4 text-left transition-all duration-300 ${
                  mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${idx * 60 + 100}ms` }}
              >
                <span className="font-mono text-xs text-[var(--mute)]">{item.index}</span>
                <span
                  className={`text-4xl font-bold tracking-tight ${
                    isActive ? "text-[var(--ink)] underline underline-offset-8" : "text-[var(--mute)]"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Overlay Footer */}
        <div className="pt-6 border-t border-[var(--line)] flex justify-between items-center text-xs text-[var(--mute)] font-mono">
          <span>{PROFILE.location}</span>
          <a
            href={PROFILE.resumePath}
            download
            className="underline text-[var(--ink)] font-semibold"
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </>
  );
}
