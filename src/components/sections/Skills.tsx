"use client";

import { useState } from "react";
import { SKILLS, SKILL_GROUPS, SkillElement } from "@/lib/data";
import TechLogo from "../ui/TechLogo";

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedSkill, setSelectedSkill] = useState<SkillElement>(SKILLS[0]);

  return (
    <section id="skills" className="site-container section-padding border-t border-[#0d0d0d]/10">
      
      {/* Section Tag */}
      <div className="rv" style={{ "--i": 1 } as React.CSSProperties}>
        <span className="section-tag">02 — Periodic table of my stack</span>
      </div>

      {/* Heading */}
      <h2 className="rv section-heading mb-8" style={{ "--i": 2 } as React.CSSProperties}>
        Technical <span className="serif-italic">elements.</span>
      </h2>

      {/* Family Filter Chips */}
      <div className="rv flex flex-wrap items-center gap-2 mb-10" style={{ "--i": 3 } as React.CSSProperties}>
        {SKILL_GROUPS.map((group) => {
          const isActive = activeFilter === group;
          return (
            <button
              key={group}
              onClick={() => setActiveFilter(group)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#0d0d0d] text-[#f4f2ee] shadow-sm"
                  : "bg-white text-[#3a3a3a] border border-[#0d0d0d]/10 hover:border-[#0d0d0d]/30"
              }`}
            >
              {group}
            </button>
          );
        })}
      </div>

      {/* Main Layout: 8-Column Periodic Grid + Sticky Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
        
        {/* Periodic Grid (8 columns desktop, 4 mobile) */}
        <div className="rv grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3" style={{ "--i": 4 } as React.CSSProperties}>
          {SKILLS.map((skill) => {
            const isMatch = activeFilter === "All" || skill.family === activeFilter;
            const isSelected = selectedSkill.id === skill.id;

            return (
              <button
                key={skill.id}
                onClick={() => setSelectedSkill(skill)}
                onMouseEnter={() => setSelectedSkill(skill)}
                onFocus={() => setSelectedSkill(skill)}
                className={`aspect-square rounded-2xl p-2 flex flex-col justify-between text-left transition-all duration-200 relative border cursor-pointer ${
                  isSelected
                    ? "bg-[#0d0d0d] text-[#f4f2ee] border-[#0d0d0d] shadow-lg scale-105 z-10"
                    : isMatch
                    ? "bg-white text-[#0d0d0d] border-[#0d0d0d]/10 hover:border-[#0d0d0d]/40 hover:-translate-y-1 shadow-sm"
                    : "bg-white/40 text-[#77756f] border-transparent opacity-40 hover:opacity-75"
                }`}
                aria-label={`Skill: ${skill.name}, ${skill.family}`}
              >
                {/* Top Row: Atomic Number */}
                <span
                  className={`font-mono text-[10px] ${
                    isSelected ? "text-[#a9a6a0]" : "text-[#77756f]"
                  }`}
                >
                  {String(skill.atomicNumber).padStart(2, "0")}
                </span>

                {/* Center: 2-Letter Symbol */}
                <span className="font-bold text-lg md:text-xl font-mono tracking-tight my-auto text-center">
                  {skill.symbol}
                </span>

                {/* Bottom: Truncated Skill Name */}
                <span
                  className={`text-[9px] font-semibold truncate ${
                    isSelected ? "text-[#e9e6e0]" : "text-[#3a3a3a]"
                  }`}
                >
                  {skill.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Sticky Inspector Panel (320px wide) */}
        <div className="lg:sticky lg:top-24 w-full">
          <div className="card-surface p-6 flex flex-col items-center text-center space-y-6">
            
            {/* Real Brand Logo at 150px with Pop Animation */}
            <div className="w-full flex justify-center items-center py-4 bg-[#f4f2ee]/50 rounded-2xl border border-[#0d0d0d]/5">
              <TechLogo
                brandKey={selectedSkill.brandKey}
                conceptIcon={selectedSkill.conceptIcon}
                size={120}
              />
            </div>

            {/* Skill Details */}
            <div className="space-y-2 w-full text-left border-t border-[#0d0d0d]/10 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#a9a6a0]">ATOMIC NO.</span>
                <span className="font-mono font-bold text-xs text-[#0d0d0d]">
                  #{String(selectedSkill.atomicNumber).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-bold text-xl text-[#0d0d0d] tracking-tight">
                {selectedSkill.name}
              </h3>

              <div className="inline-block px-3 py-1 rounded-full bg-[#0d0d0d]/5 font-mono text-xs text-[#77756f]">
                {selectedSkill.family}
              </div>
            </div>

            {/* Projects using this skill */}
            <div className="w-full text-left space-y-2 border-t border-[#0d0d0d]/10 pt-4">
              <span className="font-mono text-[10px] text-[#a9a6a0] block uppercase tracking-wider">
                Applied In Systems
              </span>
              <ul className="space-y-1 text-xs text-[#3a3a3a]">
                {selectedSkill.projectsUsedIn.map((proj, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
                    <span>{proj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
