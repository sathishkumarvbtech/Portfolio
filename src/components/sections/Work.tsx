"use client";

import AccordionGallery from "../ui/AccordionGallery";

export default function Work() {
  return (
    <section id="work" className="site-container section-padding border-t border-[#0d0d0d]/10">
      
      {/* Section Tag */}
      <div className="rv" style={{ "--i": 1 } as React.CSSProperties}>
        <span className="section-tag">03 — Selected work</span>
      </div>

      {/* Heading */}
      <h2 className="rv section-heading mb-12" style={{ "--i": 2 } as React.CSSProperties}>
        Things I&apos;ve <span className="serif-italic">built.</span>
      </h2>

      {/* Expanding Accordion Gallery */}
      <div className="rv" style={{ "--i": 3 } as React.CSSProperties}>
        <AccordionGallery />
      </div>
    </section>
  );
}
