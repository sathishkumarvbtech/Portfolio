# Sathishkumar V — Portfolio Website

A minimal, high-throughput personal portfolio built for **Sathishkumar V** (Senior Software Engineer & MERN Stack Developer). Designed with an Awwwards-inspired "Site of the Day" aesthetic in strict monochrome tones (white, black, and grays).

---

## 🚀 How to Run

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Installation & Development
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build production bundle & test type safety
npm run build
npm run start
```

---

## 📋 Sections Overview

| Section Index | Component | Description & Key Interactions |
| :--- | :--- | :--- |
| **00 — Hero** | `Hero.tsx` | Seamless looping video intro with unmuted/muted toggle button, ghost background text, and auto-pause on scroll. |
| **01 — About** | `About.tsx` | Hanging lanyard ID card (`IdCard.tsx`) with pendulum spring physics, 3D card flip on hover/tap, verbatim resume summary, and quick facts. |
| **02 — Skills** | `Skills.tsx` | 32-element periodic table grid with diagonal wave reveal, family filter chips, and sticky 320px brand inspector panel (`TechLogo.tsx`). |
| **03 — Work** | `Work.tsx` | Side-by-side expanding accordion gallery (`AccordionGallery.tsx`) with flex-8 focus panels, mini grayscale illustrative wireframe UIs, and mobile fallback. |
| **04 — Experience** | `Experience.tsx` | Chronological vertical path (`TimelinePath.tsx`) with dynamic scroll-drawn spine line and illuminated career/education stops. |
| **05 — Achievements** | `Achievements.tsx` | Pinned 100svh horizontal gallery (`PinnedGallery.tsx`) with easeOutQuart count-up numbers and centered card elevation. |
| **06 — Contact** | `Contact.tsx` | Interactive hopping letter title animation, copy-to-clipboard email chip, direct tel/LinkedIn links, spinning badge, and footer. |

---

## 🎬 How to Rebuild Hero Video Assets

The video loop is generated automatically from `intro.mp4` using Python, OpenCV, NumPy, SciPy, and FFmpeg:

```bash
python3 scripts/build-hero-assets.py
```

### Pipeline Steps:
1. **Framing & Crop**: Crops `intro.mp4` to centered 576×720 bounds and scales to 768×960.
2. **Background Whitening**: Applies color levels scaling to make the backdrop off-white pure white (`#ffffff`).
3. **Audio & Video Cross-fade**: Blends the last 0.5s into the first 0.5s using NumPy audio frame crossfading and OpenCV frame blending.
4. **Outputs**: Exports `public/hero/hero.mp4` (H.264 AAC) and `public/hero/hero.webm` (VP9 Opus), along with `public/portrait-bust.webp` and `public/og.jpg`.

---

## 📜 Credits & Brand Logo Licenses

Official brand SVGs in `public/logos/` are sourced from [Simple Icons](https://simpleicons.org) and [Devicon](https://devicon.dev):
- All brand SVGs are dedicated under the **Creative Commons Zero v1.0 Universal (CC0 1.0)** public domain license.
- License text is stored in `public/logos/LICENSE`.
- Brand trademarks belong to their respective owners (React, Next.js, TypeScript, Node.js, Express, MongoDB, Tailwind CSS, Ant Design, TanStack Query, Formik, Git, GitHub, Bitbucket, Postman, Vite, Webpack, Jira).
