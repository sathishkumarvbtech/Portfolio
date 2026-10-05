"use client";

import { useState } from "react";
import { PROJECTS } from "@/lib/data";
import TechLogo from "./TechLogo";

export default function AccordionGallery() {
  const [activeId, setActiveId] = useState<string>(PROJECTS[0].id);

  return (
    <div className="w-full">
      {/* Desktop Horizontal Accordion (hidden on mobile) */}
      <div className="hidden lg:flex gap-4 h-[min(78svh,600px)] w-full items-stretch">
        {PROJECTS.map((project) => {
          const isOpen = activeId === project.id;
          return (
            <div
              key={project.id}
              onClick={() => setActiveId(project.id)}
              onFocus={() => setActiveId(project.id)}
              tabIndex={0}
              role="region"
              aria-label={`Project panel: ${project.title}`}
              className={`relative rounded-[28px] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden cursor-pointer border ${
                isOpen
                  ? "flex-[8] bg-white border-[#0d0d0d]/15 shadow-xl"
                  : "flex-1 bg-[#f4f2ee] border-[#0d0d0d]/10 hover:bg-white/80"
              }`}
            >
              {/* Slim Folded Spine when Closed */}
              {!isOpen && (
                <div className="absolute inset-0 p-6 flex flex-col justify-between items-center text-center">
                  <span className="font-mono text-sm font-bold text-[#77756f]">
                    {project.index}
                  </span>

                  <div className="[writing-mode:vertical-rl] rotate-180 font-bold text-lg text-[#0d0d0d] tracking-tight">
                    {project.title}
                  </div>

                  <div className="w-10 h-10 rounded-full border border-[#0d0d0d]/20 flex items-center justify-center text-[#0d0d0d] font-mono text-lg transition-transform duration-300 group-hover:rotate-90">
                    +
                  </div>
                </div>
              )}

              {/* Full Content Layout when Open */}
              {isOpen && (
                <div className="w-full h-full p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch overflow-y-auto">
                  
                  {/* Left Side: Kicker, Title, Description, Features, Tech Chips */}
                  <div className="flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 font-mono text-xs text-[#77756f]">
                        <span className="font-bold text-[#0d0d0d]">{project.index}</span>
                        <span>/</span>
                        <span className="uppercase">{project.kicker}</span>
                      </div>

                      <h3 className="text-3xl font-bold text-[#0d0d0d] tracking-tight">
                        {project.title}
                      </h3>

                      <p className="text-sm text-[#3a3a3a] leading-relaxed">
                        {project.description}
                      </p>

                      {/* 2-Column Feature List */}
                      <div className="pt-2">
                        <span className="font-mono text-[10px] text-[#a9a6a0] block uppercase mb-2">
                          Key Systems & Architecture
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#0d0d0d]">
                          {project.features.map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 bg-[#f4f2ee] px-3 py-1.5 rounded-lg">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tech Chips with Tiny Logos */}
                    <div className="space-y-3 pt-4 border-t border-[#0d0d0d]/10">
                      <span className="font-mono text-[10px] text-[#a9a6a0] block uppercase">
                        Technologies Used
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f2ee] border border-[#0d0d0d]/10 text-xs font-semibold text-[#0d0d0d]"
                          >
                            <TechLogo brandKey={t.iconKey} size={14} className="w-3.5 h-3.5" />
                            <span>{t.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* GitHub Link if available */}
                      {project.github && (
                        <div className="pt-2">
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-pill-primary text-xs py-2 px-4"
                          >
                            View on GitHub ↗
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Side: Illustrative Mini-UI in Pure CSS/JSX */}
                  <div className="relative rounded-2xl bg-[#f4f2ee] p-6 border border-[#0d0d0d]/10 flex flex-col justify-between overflow-hidden group">
                    
                    {/* Top UI Bar */}
                    <div className="flex items-center justify-between border-b border-[#0d0d0d]/10 pb-3">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#3a3a3a]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#77756f]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#a9a6a0]" />
                      </div>
                      <span className="font-mono text-[10px] uppercase text-[#77756f] tracking-wider">
                        {project.id === "lms-mylearn" ? "LMS Dashboard" : "Financial Guard"}
                      </span>
                    </div>

                    {/* Grayscale Wireframe Mini-UI */}
                    <div className="my-auto space-y-4">
                      {project.id === "lms-mylearn" ? (
                        /* LMS Mini UI Wireframe */
                        <div className="space-y-3">
                          <div className="h-8 bg-white rounded-lg border border-[#0d0d0d]/10 p-2 flex items-center justify-between">
                            <span className="w-24 h-2 bg-[#0d0d0d] rounded" />
                            <span className="w-12 h-4 bg-[#0d0d0d] rounded-full text-[8px] text-white flex items-center justify-center font-mono">
                              ACTIVE
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="h-16 bg-white rounded-lg p-2 border border-[#0d0d0d]/10 space-y-1">
                              <span className="block w-8 h-2 bg-[#77756f] rounded" />
                              <span className="block w-12 h-3 bg-[#0d0d0d] rounded" />
                            </div>
                            <div className="h-16 bg-white rounded-lg p-2 border border-[#0d0d0d]/10 space-y-1">
                              <span className="block w-8 h-2 bg-[#77756f] rounded" />
                              <span className="block w-12 h-3 bg-[#0d0d0d] rounded" />
                            </div>
                            <div className="h-16 bg-white rounded-lg p-2 border border-[#0d0d0d]/10 space-y-1">
                              <span className="block w-8 h-2 bg-[#77756f] rounded" />
                              <span className="block w-12 h-3 bg-[#0d0d0d] rounded" />
                            </div>
                          </div>
                          <div className="h-20 bg-white rounded-lg p-3 border border-[#0d0d0d]/10 flex flex-col justify-between">
                            <div className="w-full bg-[#f4f2ee] h-2 rounded overflow-hidden">
                              <div className="w-3/4 bg-[#0d0d0d] h-full" />
                            </div>
                            <span className="font-mono text-[9px] text-[#77756f]">
                              Course Progress Tracking · Async Module Stream
                            </span>
                          </div>
                        </div>
                      ) : (
                        /* MyLedger Mini UI Wireframe */
                        <div className="space-y-3">
                          <div className="h-8 bg-white rounded-lg border border-[#0d0d0d]/10 p-2 flex items-center justify-between">
                            <span className="font-mono text-[9px] font-bold text-[#0d0d0d]">
                              ROLE: BANK ADMIN
                            </span>
                            <span className="w-16 h-4 bg-[#0d0d0d] text-white rounded-full text-[8px] flex items-center justify-center font-mono">
                              PROTECTED
                            </span>
                          </div>
                          <div className="h-24 bg-white rounded-lg p-3 border border-[#0d0d0d]/10 space-y-2">
                            <div className="flex justify-between items-center border-b border-[#0d0d0d]/5 pb-1 text-[9px] font-mono">
                              <span>Action Guard</span>
                              <span className="font-bold text-[#0d0d0d]">Schema Validated ✓</span>
                            </div>
                            <div className="w-full h-3 bg-[#f4f2ee] rounded border border-[#0d0d0d]/10 flex items-center px-2">
                              <span className="w-20 h-1.5 bg-[#77756f] rounded" />
                            </div>
                            <div className="w-full h-3 bg-[#f4f2ee] rounded border border-[#0d0d0d]/10 flex items-center px-2">
                              <span className="w-28 h-1.5 bg-[#77756f] rounded" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Label: Illustrative UI */}
                    <div className="pt-2 text-right border-t border-[#0d0d0d]/10">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#a9a6a0]">
                        Illustrative UI
                      </span>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Accordion */}
      <div className="lg:hidden flex flex-col gap-4">
        {PROJECTS.map((project) => {
          const isOpen = activeId === project.id;
          return (
            <div
              key={project.id}
              className="card-surface p-6 overflow-hidden space-y-4"
            >
              <button
                onClick={() => setActiveId(isOpen ? "" : project.id)}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <div className="space-y-1">
                  <span className="font-mono text-xs text-[#77756f]">
                    {project.index} / {project.kicker}
                  </span>
                  <h3 className="text-xl font-bold text-[#0d0d0d]">
                    {project.title}
                  </h3>
                </div>
                <span className="w-8 h-8 rounded-full border border-[#0d0d0d]/20 flex items-center justify-center font-mono text-lg">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div className="pt-4 border-t border-[#0d0d0d]/10 space-y-4">
                  <p className="text-xs text-[#3a3a3a] leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-[#a9a6a0] block uppercase">
                      Features
                    </span>
                    <div className="grid grid-cols-1 gap-1.5 text-xs">
                      {project.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 bg-[#f4f2ee] p-2 rounded-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d0d0d]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-[#a9a6a0] block uppercase">
                      Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-full bg-[#f4f2ee] text-[11px] font-semibold text-[#0d0d0d]"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
