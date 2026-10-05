"use client";

import { PROFILE } from "@/lib/data";
import IdCard from "../ui/IdCard";

export default function About() {
  return (
    <section id="about" className="site-container section-padding border-t border-[#0d0d0d]/10">
      
      {/* Section Tag */}
      <div className="rv" style={{ "--i": 1 } as React.CSSProperties}>
        <span className="section-tag">01 — About me</span>
      </div>

      {/* Heading ending with Instrument Serif italic word */}
      <h2 className="rv section-heading mb-12" style={{ "--i": 2 } as React.CSSProperties}>
        Engineering with <span className="serif-italic">purpose.</span>
      </h2>

      {/* Three-Column Equal Height Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_310px_minmax(0,1fr)] gap-8 items-stretch">
        
        {/* Left Column: Summary & CTAs */}
        <div className="rv card-surface p-7 md:p-8 flex flex-col justify-between rounded-[28px] bg-white border border-[#0d0d0d]/10 shadow-sm hover:shadow-md transition-shadow" style={{ "--i": 3 } as React.CSSProperties}>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#0d0d0d] tracking-tight">
              Hi, I&apos;m {PROFILE.name}.
            </h3>
            <p className="text-[#3a3a3a] leading-relaxed text-sm md:text-base font-normal">
              {PROFILE.resumeSummary}
            </p>
            <p className="text-[#77756f] leading-relaxed text-xs md:text-sm">
              {PROFILE.additionalSummary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-[#0d0d0d]/10 mt-6">
            <a
              href={PROFILE.resumePath}
              download
              className="btn-pill-primary text-xs py-2.5 px-5"
            >
              Résumé ↓
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-secondary text-xs py-2.5 px-5"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Centre Column: Hanging Lanyard ID Card */}
        <div className="rv flex items-center justify-center min-h-[440px]" style={{ "--i": 4 } as React.CSSProperties}>
          <IdCard />
        </div>

        {/* Right Column: Quick Facts & Paraphrased Quote */}
        <div className="rv card-surface p-7 md:p-8 flex flex-col justify-between rounded-[28px] bg-white border border-[#0d0d0d]/10 shadow-sm hover:shadow-md transition-shadow" style={{ "--i": 5 } as React.CSSProperties}>
          <div className="space-y-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#77756f] border-b border-[#0d0d0d]/10 pb-3">
              Quick Facts
            </h3>

            <div className="space-y-3.5 text-xs md:text-sm">
              <div>
                <span className="block font-mono text-[10px] text-[#a9a6a0] uppercase tracking-wider">LOCATION</span>
                <span className="font-semibold text-[#0d0d0d]">{PROFILE.location}</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-[#a9a6a0] uppercase tracking-wider">EDUCATION</span>
                <span className="font-semibold text-[#0d0d0d]">
                  B.Tech in IT (K.S.R. Institute for Enginering and Technology) · CGPA: 7.34
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-[#a9a6a0] uppercase tracking-wider">CURRENT ROLE</span>
                <span className="font-semibold text-[#0d0d0d]">
                  Senior Software Engineer · Cloudgate Host Solution
                </span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-[#a9a6a0] uppercase tracking-wider">EMAIL</span>
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="font-semibold text-[#0d0d0d] hover:underline"
                >
                  {PROFILE.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quote paraphrased strictly from resume wording */}
          <div className="pt-5 border-t border-[#0d0d0d]/10 mt-6">
            <blockquote className="font-serif italic text-sm md:text-base text-[#3a3a3a] leading-snug">
              &ldquo;Engineering high-throughput, secure, and production-scalable web applications with sub-second page rendering.&rdquo;
            </blockquote>
          </div>
        </div>

      </div>
    </section>
  );
}
