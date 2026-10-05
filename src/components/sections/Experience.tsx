"use client";

import TimelinePath from "../ui/TimelinePath";

export default function Experience() {
  return (
    <section id="experience" className="site-container pt-20 md:pt-28 pb-12 md:pb-16 border-t border-[#0d0d0d]/10">
      
      {/* Section Tag */}
      <div className="rv" style={{ "--i": 1 } as React.CSSProperties}>
        <span className="section-tag">04 — Career & Education</span>
      </div>

      {/* Heading */}
      <h2 className="rv section-heading mb-10 md:mb-12" style={{ "--i": 2 } as React.CSSProperties}>
        Chronological <span className="serif-italic">path.</span>
      </h2>

      {/* Vertical Timeline Path */}
      <div className="rv" style={{ "--i": 3 } as React.CSSProperties}>
        <TimelinePath />
      </div>
    </section>
  );
}
