"use client";

import { useState, useEffect } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { scrollToTarget } from "@/lib/scroll";
import { useScrollProgress } from "@/lib/hooks";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();

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
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#0d0d0d] z-50 origin-left transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      {/* Main Floating Header */}
      <header className="fixed top-4 left-0 right-0 z-40 px-4 md:px-8 pointer-events-none">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          
          {/* Left: Initials Mark + Full Name */}
          <button
            onClick={() => handleNavClick("hero")}
            className="pointer-events-auto flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0d0d] rounded-full p-1 transition-all"
            aria-label="Scroll to top / Hero"
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs border transition-all duration-300 group-hover:rotate-[360deg] ${
                scrolled
                  ? "bg-[#0d0d0d] text-[#f4f2ee] border-[#0d0d0d]"
                  : "bg-transparent text-[#0d0d0d] border-[#0d0d0d]/30"
              }`}
            >
              {PROFILE.initials}
            </div>
            <span
              className={`font-semibold text-sm tracking-tight text-[#0d0d0d] transition-opacity duration-300 hidden sm:inline-block ${
                scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            >
              {PROFILE.name}
            </span>
          </button>

          {/* Desktop Centre/Right: Nav Links Glass Pill */}
          <nav
            aria-label="Primary Navigation"
            className={`pointer-events-auto hidden md:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-300 relative ${
              scrolled
                ? "bg-white/70 backdrop-blur-md border-[#0d0d0d]/10 shadow-lg shadow-black/5"
                : "bg-white/40 backdrop-blur-sm border-transparent"
            }`}
          >
            {NAV.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-full transition-colors duration-200 z-10 ${
                    isActive ? "text-[#f4f2ee]" : "text-[#3a3a3a] hover:text-[#0d0d0d]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Sliding active indicator pill */}
                  {isActive && (
                    <span
                      className="absolute inset-0 bg-[#0d0d0d] rounded-full -z-10 shadow-sm"
                      style={{ transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="pointer-events-auto md:hidden px-4 py-2 rounded-full bg-[#0d0d0d] text-[#f4f2ee] text-xs font-semibold shadow-md active:scale-95 transition-transform"
            aria-expanded={mobileMenuOpen}
            aria-label="Open navigation menu"
          >
            Menu
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Paper Overlay */}
      <div
        className={`fixed inset-0 bg-[#f4f2ee] z-50 flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto [clip-path:circle(150%_at_top_right)]"
            : "opacity-0 pointer-events-none [clip-path:circle(0%_at_top_right)]"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Overlay Header */}
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 rounded-full bg-[#0d0d0d] text-[#f4f2ee] flex items-center justify-center font-mono font-bold text-xs">
            {PROFILE.initials}
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full border border-[#0d0d0d]/20 flex items-center justify-center text-[#0d0d0d] font-bold text-lg hover:bg-black/5"
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
                <span className="font-mono text-xs text-[#77756f]">{item.index}</span>
                <span
                  className={`text-4xl font-bold tracking-tight ${
                    isActive ? "text-[#0d0d0d] underline underline-offset-8" : "text-[#77756f]"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Overlay Footer */}
        <div className="pt-6 border-t border-[#0d0d0d]/10 flex justify-between items-center text-xs text-[#77756f] font-mono">
          <span>{PROFILE.location}</span>
          <a
            href={PROFILE.resumePath}
            download
            className="underline text-[#0d0d0d] font-semibold"
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </>
  );
}
