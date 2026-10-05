"use client";

import Navigation from "./Navigation";
import Hero from "./hero/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Work from "./sections/Work";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import RevealObserver from "./ui/RevealObserver";

export default function App() {
  return (
    <main className="relative min-h-screen bg-[#f4f2ee] text-[#0d0d0d] selection:bg-[#0d0d0d] selection:text-[#f4f2ee]">
      <RevealObserver />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Experience />
      <Achievements />
      <Contact />
    </main>
  );
}
