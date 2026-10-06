"use client";

import Image from "next/image";

// Map of real brand logo SVG paths in public/logos
export const BRAND_MAP: Record<string, { src: string; alt: string; glow: string }> = {
  react: { src: "/logos/react.svg", alt: "React.js logo", glow: "rgba(97, 218, 251, 0.25)" },
  nextjs: { src: "/logos/nextjs.svg", alt: "Next.js logo", glow: "rgba(0, 0, 0, 0.15)" },
  typescript: { src: "/logos/typescript.svg", alt: "TypeScript logo", glow: "rgba(49, 120, 198, 0.25)" },
  javascript: { src: "/logos/javascript.svg", alt: "JavaScript logo", glow: "rgba(247, 223, 30, 0.25)" },
  html5: { src: "/logos/html5.svg", alt: "HTML5 logo", glow: "rgba(227, 79, 38, 0.25)" },
  css3: { src: "/logos/css3.svg", alt: "CSS3 logo", glow: "rgba(21, 114, 182, 0.25)" },
  nodejs: { src: "/logos/nodejs.svg", alt: "Node.js logo", glow: "rgba(51, 153, 51, 0.25)" },
  express: { src: "/logos/express.svg", alt: "Express.js logo", glow: "rgba(0, 0, 0, 0.15)" },
  mongodb: { src: "/logos/mongodb.svg", alt: "MongoDB logo", glow: "rgba(71, 162, 72, 0.25)" },
  tailwindcss: { src: "/logos/tailwindcss.svg", alt: "Tailwind CSS logo", glow: "rgba(6, 182, 212, 0.25)" },
  antd: { src: "/logos/antd.svg", alt: "Ant Design logo", glow: "rgba(1, 112, 254, 0.25)" },
  reactquery: { src: "/logos/reactquery.svg", alt: "TanStack Query logo", glow: "rgba(255, 65, 84, 0.25)" },
  formik: { src: "/logos/formik.svg", alt: "Formik logo", glow: "rgba(23, 43, 77, 0.25)" },
  git: { src: "/logos/git.svg", alt: "Git logo", glow: "rgba(240, 80, 50, 0.25)" },
  github: { src: "/logos/github.svg", alt: "GitHub logo", glow: "rgba(24, 23, 23, 0.25)" },
  bitbucket: { src: "/logos/bitbucket.svg", alt: "Bitbucket logo", glow: "rgba(0, 82, 204, 0.25)" },
  postman: { src: "/logos/postman.svg", alt: "Postman logo", glow: "rgba(255, 108, 55, 0.25)" },
  vite: { src: "/logos/vite.svg", alt: "Vite logo", glow: "rgba(100, 108, 255, 0.25)" },
  webpack: { src: "/logos/webpack.svg", alt: "Webpack logo", glow: "rgba(141, 214, 249, 0.25)" },
  jira: { src: "/logos/jira.svg", alt: "Jira logo", glow: "rgba(0, 82, 204, 0.25)" },
};

// Thin line SVG icons for concept skills
export const CONCEPT_MAP: Record<string, React.ReactNode> = {
  api: (
    <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path d="M4 12h16M12 4v16M8 8l8 8M16 8l-8 8" />
    </svg>
  ),
  lock: (
    <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </svg>
  ),
  server: (
    <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="7" rx="2" />
      <rect x="2" y="14" width="20" height="7" rx="2" />
      <line x1="6" y1="6.5" x2="6" y2="6.5" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="17.5" x2="6" y2="17.5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  layers: (
    <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  database: (
    <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  zap: (
    <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  shield: (
    <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  key: (
    <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="M10.7 12.3L21 2M16.5 6.5L19 9" />
    </svg>
  ),
  "check-circle": (
    <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  cpu: (
    <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
    </svg>
  ),
  layout: (
    <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  ),
  "user-check": (
    <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <polyline points="17 11 19 13 23 9" />
    </svg>
  ),
  code: (
    <svg className="w-full h-full stroke-current fill-none stroke-[1.5]" viewBox="0 0 24 24">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
};

export function isBrand(key?: string): boolean {
  return !!key && key in BRAND_MAP;
}

interface TechLogoProps {
  brandKey?: string;
  conceptIcon?: string;
  size?: number;
  className?: string;
}

export default function TechLogo({ brandKey, conceptIcon, size = 150, className = "" }: TechLogoProps) {
  if (brandKey && isBrand(brandKey)) {
    const brand = BRAND_MAP[brandKey];
    const isMonochrome = brandKey === "nextjs" || brandKey === "express" || brandKey === "github";
    return (
      <div
        className={`relative flex items-center justify-center ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {/* Soft brand-tint glow behind official brand logo */}
        <div
          className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300"
          style={{ backgroundColor: brand.glow }}
        />
        <Image
          src={brand.src}
          alt={brand.alt}
          width={size}
          height={size}
          className={`relative z-10 object-contain drop-shadow-sm transition-transform duration-300 hover:scale-110 ${
            isMonochrome ? "dark:invert" : ""
          }`}
        />
      </div>
    );
  }

  if (conceptIcon && conceptIcon in CONCEPT_MAP) {
    return (
      <div
        className={`flex items-center justify-center text-[var(--ink)] ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        {CONCEPT_MAP[conceptIcon]}
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center text-[var(--mute)] font-mono text-sm border border-[var(--line)] rounded-full ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      DEV
    </div>
  );
}
