export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  specialization: string;
  email: string;
  phoneUAE: string;
  phoneIndia: string;
  phoneHrefUAE: string;
  phoneHrefIndia: string;
  location: string;
  resumeSummary: string;
  additionalSummary: string;
  linkedin: string;
  resumePath: string;
  validTill: string;
}

export interface NavLink {
  id: string;
  label: string;
  index: string;
}

export interface SkillElement {
  id: string;
  atomicNumber: number;
  symbol: string;
  name: string;
  family: 'Frontend' | 'Backend' | 'State & Hydration' | 'Security & Forms' | 'Concepts' | 'Tools & Quality';
  color: string;
  brandKey?: string;
  conceptIcon?: string;
  projectsUsedIn: string[];
}

export interface Project {
  id: string;
  index: string;
  title: string;
  kicker: string;
  subtitle: string;
  description: string;
  features: string[];
  tech: { name: string; iconKey: string }[];
  github?: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  details: string[];
  type: 'work' | 'education' | 'next';
  metrics?: string;
}

export interface Achievement {
  id: string;
  index: string;
  number: string;
  numValue: number;
  unit: string;
  label: string;
  caption: string;
  detail: string;
  brandColor: string;
  platformName: string;
  platformIconKey: string;
}

export const PROFILE: Profile = {
  name: "Sathishkumar V",
  firstName: "SATHISHKUMAR",
  lastName: "V",
  initials: "SV",
  role: "Senior Software Engineer & MERN Stack Developer",
  specialization: "React.js & Next.js Specialist",
  email: "sathishkumarvbtech@gmail.com",
  phoneUAE: "+971 502693210",
  phoneIndia: "+91 80566 86885",
  phoneHrefUAE: "tel:+971502693210",
  phoneHrefIndia: "tel:+918056686885",
  location: "Dubai, UAE & India",
  resumeSummary:
    "Results-oriented Senior Software Engineer & MERN Stack Developer with 4+ years of hands-on experience engineering high-throughput, secure, and production-scalable web applications. Specialized in React.js, Next.js (SSR, SSG, ISR), Node.js, Express.js, and MongoDB with TypeScript.",
  additionalSummary:
    "Proven track record in orchestrating client/server state using TanStack Query, establishing rigorous Role-Based Access Control (RBAC) architectures, boosting Core Web Vitals, and reducing API response latency by ~30%.",
  linkedin: "https://linkedin.com/in/sathishkumar-v-5537b8148",
  resumePath: "/resume.pdf",
  validTill: "2026",
};

export const NAV: NavLink[] = [
  { id: "about", label: "About", index: "01" },
  { id: "skills", label: "Skills", index: "02" },
  { id: "work", label: "Work", index: "03" },
  { id: "experience", label: "Experience", index: "04" },
  { id: "achievements", label: "Achievements", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
];

export const SKILL_GROUPS = [
  "All",
  "Frontend",
  "Backend",
  "State & Hydration",
  "Security & Forms",
  "Concepts",
  "Tools & Quality",
] as const;

export const SKILLS: SkillElement[] = [
  // Frontend
  { id: "react", atomicNumber: 1, symbol: "Re", name: "React.js", family: "Frontend", color: "#61DAFB", brandKey: "react", projectsUsedIn: ["LMS for My Learn", "MyLedger Platform", "Cloudrevel Apps"] },
  { id: "nextjs", atomicNumber: 2, symbol: "Nx", name: "Next.js", family: "Frontend", color: "#000000", brandKey: "nextjs", projectsUsedIn: ["LMS for My Learn", "MyLedger Platform", "Cloudgate Cloud Portals"] },
  { id: "typescript", atomicNumber: 3, symbol: "Ts", name: "TypeScript", family: "Frontend", color: "#3178C6", brandKey: "typescript", projectsUsedIn: ["LMS for My Learn", "MyLedger Platform", "Cloudgate Portals"] },
  { id: "javascript", atomicNumber: 4, symbol: "Js", name: "JavaScript ES6+", family: "Frontend", color: "#F7DF1E", brandKey: "javascript", projectsUsedIn: ["All Projects"] },
  { id: "html5", atomicNumber: 5, symbol: "H5", name: "HTML5", family: "Frontend", color: "#E34F26", brandKey: "html5", projectsUsedIn: ["RR Donnelley Digital Initiatives", "Trasol UI Libraries"] },
  { id: "css3", atomicNumber: 6, symbol: "C3", name: "CSS3", family: "Frontend", color: "#1572B6", brandKey: "css3", projectsUsedIn: ["RR Donnelley", "Trasol UI Libraries"] },
  { id: "tailwindcss", atomicNumber: 7, symbol: "Tw", name: "Tailwind CSS", family: "Frontend", color: "#06B6D4", brandKey: "tailwindcss", projectsUsedIn: ["Cloudrevel Apps", "Enterprise Dashboards"] },
  { id: "antd", atomicNumber: 8, symbol: "Ad", name: "Ant Design", family: "Frontend", color: "#0170FE", brandKey: "antd", projectsUsedIn: ["LMS for My Learn", "MyLedger Platform"] },

  // Backend
  { id: "nodejs", atomicNumber: 9, symbol: "Nd", name: "Node.js", family: "Backend", color: "#339933", brandKey: "nodejs", projectsUsedIn: ["LMS for My Learn", "MyLedger Platform", "Cloudgate Services"] },
  { id: "express", atomicNumber: 10, symbol: "Ex", name: "Express.js", family: "Backend", color: "#000000", brandKey: "express", projectsUsedIn: ["LMS for My Learn", "MyLedger Backend Endpoints"] },
  { id: "mongodb", atomicNumber: 11, symbol: "Mg", name: "MongoDB", family: "Backend", color: "#47A248", brandKey: "mongodb", projectsUsedIn: ["LMS for My Learn", "MyLedger Database Pipelines"] },
  { id: "restapi", atomicNumber: 12, symbol: "Ra", name: "RESTful APIs", family: "Backend", color: "#FF6C37", conceptIcon: "api", projectsUsedIn: ["LMS for My Learn", "MyLedger Platform"] },
  { id: "jwt", atomicNumber: 13, symbol: "Jw", name: "JWT Auth", family: "Backend", color: "#000000", conceptIcon: "lock", projectsUsedIn: ["MyLedger RBAC Architecture"] },
  { id: "microservices", atomicNumber: 14, symbol: "Ms", name: "Microservices", family: "Backend", color: "#4B0082", conceptIcon: "server", projectsUsedIn: ["Cloudgate Enterprise Portals"] },

  // State & Hydration
  { id: "reactquery", atomicNumber: 15, symbol: "Rq", name: "TanStack Query", family: "State & Hydration", color: "#FF4154", brandKey: "reactquery", projectsUsedIn: ["LMS for My Learn", "Cloudrevel Apps"] },
  { id: "contextapi", atomicNumber: 16, symbol: "Ca", name: "Context API", family: "State & Hydration", color: "#61DAFB", conceptIcon: "layers", projectsUsedIn: ["MyLedger Permission Logic"] },
  { id: "caching", atomicNumber: 17, symbol: "Sc", name: "Server-Side Caching", family: "State & Hydration", color: "#008080", conceptIcon: "database", projectsUsedIn: ["Cloudrevel Innovations App Cache"] },
  { id: "optimistic", atomicNumber: 18, symbol: "Ou", name: "Optimistic UI Updates", family: "State & Hydration", color: "#2E8B57", conceptIcon: "zap", projectsUsedIn: ["LMS Async Course Modules"] },

  // Security & Forms
  { id: "rbac", atomicNumber: 19, symbol: "Rb", name: "RBAC Architecture", family: "Security & Forms", color: "#111111", conceptIcon: "shield", projectsUsedIn: ["MyLedger Financial Permissions", "Cloudrevel RBAC Tiers"] },
  { id: "routeguards", atomicNumber: 20, symbol: "Rg", name: "Route Guards", family: "Security & Forms", color: "#444444", conceptIcon: "key", projectsUsedIn: ["MyLedger Role Tiers"] },
  { id: "formik", atomicNumber: 21, symbol: "Fk", name: "Formik", family: "Security & Forms", color: "#172B4D", brandKey: "formik", projectsUsedIn: ["MyLedger Form Validation"] },
  { id: "yup", atomicNumber: 22, symbol: "Yp", name: "Yup Validation", family: "Security & Forms", color: "#8B0000", conceptIcon: "check-circle", projectsUsedIn: ["MyLedger Schema Validation"] },

  // Concepts
  { id: "mern", atomicNumber: 23, symbol: "Me", name: "MERN Architecture", family: "Concepts", color: "#339933", conceptIcon: "cpu", projectsUsedIn: ["LMS for My Learn", "MyLedger Platform"] },
  { id: "mvc", atomicNumber: 24, symbol: "Mv", name: "MVC Pattern", family: "Concepts", color: "#555555", conceptIcon: "layout", projectsUsedIn: ["Node.js API Pipelines"] },
  { id: "a11y", atomicNumber: 25, symbol: "Ay", name: "Web Accessibility (a11y)", family: "Concepts", color: "#005A9C", conceptIcon: "user-check", projectsUsedIn: ["RR Donnelley Digital Components"] },
  { id: "cleanarch", atomicNumber: 26, symbol: "Cl", name: "Clean Architecture", family: "Concepts", color: "#222222", conceptIcon: "code", projectsUsedIn: ["All Enterprise Systems"] },

  // Tools & Quality
  { id: "git", atomicNumber: 27, symbol: "Gt", name: "Git", family: "Tools & Quality", color: "#F05032", brandKey: "git", projectsUsedIn: ["All Repositories"] },
  { id: "github", atomicNumber: 28, symbol: "Gh", name: "GitHub", family: "Tools & Quality", color: "#181717", brandKey: "github", projectsUsedIn: ["Version Control & Code Reviews"] },
  { id: "bitbucket", atomicNumber: 29, symbol: "Bb", name: "Bitbucket", family: "Tools & Quality", color: "#0052CC", brandKey: "bitbucket", projectsUsedIn: ["Enterprise Team Pipelines"] },
  { id: "postman", atomicNumber: 30, symbol: "Pm", name: "Postman", family: "Tools & Quality", color: "#FF6C37", brandKey: "postman", projectsUsedIn: ["REST API Testing & Specs"] },
  { id: "vite", atomicNumber: 31, symbol: "Vt", name: "Vite", family: "Tools & Quality", color: "#646CFF", brandKey: "vite", projectsUsedIn: ["React UI Component Libraries"] },
  { id: "webpack", atomicNumber: 32, symbol: "Wp", name: "Webpack", family: "Tools & Quality", color: "#8DD6F9", brandKey: "webpack", projectsUsedIn: ["Bundle Optimization & Code Splitting"] },
];

export const PROJECTS: Project[] = [
  {
    id: "lms-mylearn",
    index: "01",
    title: "LMS for My Learn",
    kicker: "Interactive Learning Platform",
    subtitle: "Asynchronous course modules, state tracking, and RESTful APIs",
    description:
      "Architected interactive Learning Management System (LMS) featuring asynchronous course modules, state tracking, and RESTful APIs.",
    features: [
      "Asynchronous Course Modules",
      "Real-Time State Tracking",
      "RESTful API Integration",
      "High-Concurrency UI Rendering",
    ],
    tech: [
      { name: "Next.js", iconKey: "nextjs" },
      { name: "React", iconKey: "react" },
      { name: "TypeScript", iconKey: "typescript" },
      { name: "Node.js", iconKey: "nodejs" },
      { name: "Express.js", iconKey: "express" },
      { name: "MongoDB", iconKey: "mongodb" },
      { name: "AntD", iconKey: "antd" },
      { name: "TanStack Query", iconKey: "reactquery" },
    ],
  },
  {
    id: "myledger",
    index: "02",
    title: "MyLedger Enterprise",
    kicker: "Enterprise Financial Platform",
    subtitle: "Role-based permission logic (Admin, Reporting, Employee) & schema forms",
    description:
      "Engineered role-based permission logic (Admin, Reporting, Employee) governing financial actions and sensitive data views. Reduced user validation errors by ~40% by enforcing schema-driven form validation mechanisms using Formik and Yup.",
    features: [
      "Role-Based Permission Tiers (Admin, Reporting, Employee)",
      "Schema-Driven Validation (Formik + Yup)",
      "Sensitive Financial Data Guarding",
      "~40% Validation Error Reduction",
    ],
    tech: [
      { name: "Next.js", iconKey: "nextjs" },
      { name: "React", iconKey: "react" },
      { name: "TypeScript", iconKey: "typescript" },
      { name: "Node.js", iconKey: "nodejs" },
      { name: "Express.js", iconKey: "express" },
      { name: "MongoDB", iconKey: "mongodb" },
      { name: "AntD", iconKey: "antd" },
      { name: "Formik", iconKey: "formik" },
    ],
  },
];

export const EXPERIENCE_PATH: ExperienceItem[] = [
  {
    id: "edu-btech",
    period: "2017 – 2021",
    role: "Bachelor of Technology (B.Tech) – Information Technology",
    company: "K.S.R. Institute for Engineering and Technology",
    location: "Namakkal, Tamil Nadu, India",
    details: [
      "Academic CGPA: 7.34",
      "Engineering Practices: Agile/Scrum, Git Workflows, Clean Architecture, CI/CD",
      "Languages: English (Professional), Tamil (Native)",
    ],
    type: "education",
  },
  {
    id: "exp-trasol",
    period: "Aug 2021 – Jul 2022",
    role: "UI Developer",
    company: "Trasol Technologies",
    location: "Namakkal, India",
    details: [
      "Crafted reusable React component libraries and design tokens, reducing feature delivery lifecycle by ~30% across sprints.",
      "Integrated component-level code splitting and image lazy loading, improving user interaction metrics and interface responsiveness.",
    ],
    metrics: "~30% Faster Delivery Lifecycle",
    type: "work",
  },
  {
    id: "exp-rrd",
    period: "Sep 2022 – Jan 2025",
    role: "HTML Developer",
    company: "RR Donnelley",
    location: "Chennai, India",
    details: [
      "Developed accessible, pixel-perfect, and cross-platform responsive web components across 20+ digital marketing initiatives.",
      "Systematized cross-browser rendering tests, reducing client layout defects and cross-platform regressions by ~40%.",
      "Streamlined DOM tree depth and eliminated render-blocking assets, boosting initial page painting performance by ~25%.",
    ],
    metrics: "~40% Fewer Defects | ~25% Faster Paint",
    type: "work",
  },
  {
    id: "exp-cloudrevel",
    period: "Feb 2025 – Apr 2026",
    role: "Software Engineer",
    company: "Cloudrevel Innovations",
    location: "Chennai, India",
    details: [
      "Delivered high-performance React and Next.js applications catering to 50,000+ monthly active users with high reliability.",
      "Designed and executed enterprise-grade RBAC tiers (Super Admin, Bank Admin, Merchant) with protected routing and granular access controls.",
      "Decreased page load times by ~35% by implementing hybrid SSR/SSG rendering, dynamic code splitting, and automated asset caching.",
      "Cut API response overhead and redundant payload transfers by ~30% via TanStack Query caching and query invalidation.",
      "Elevated search engine rankings and Core Web Vitals (LCP, FID, CLS) through automated JSON-LD and dynamic metadata injection.",
    ],
    metrics: "10,000+ MAU | ~35% Page Load Boost",
    type: "work",
  },
  {
    id: "exp-cloudgate",
    period: "May 2026 – Present",
    role: "Senior Software Engineer",
    company: "Cloudgate Host Solution",
    location: "UAE",
    details: [
      "Architect and deploy mission-critical enterprise cloud portals and high-concurrency interfaces utilizing Next.js, React, and TypeScript.",
      "Collaborate on MERN stack integration, engineering resilient Node.js/Express.js backend endpoints and query pipelines for MongoDB.",
      "Enforce production performance benchmarks and bundle minification strategies, driving sub-second page rendering for global users.",
    ],
    metrics: "Enterprise Cloud Portals",
    type: "work",
  },
  {
    id: "exp-next",
    period: "Future",
    role: "Next Role",
    company: "Your Team?",
    location: "Global / Remote / On-site",
    details: [
      "Ready to engineer scalable, high-performance web applications and lead frontend architecture for high-impact products.",
    ],
    type: "next",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "ach-exp",
    index: "01 / 08",
    number: "4+",
    numValue: 5,
    unit: "+ Years",
    label: "Hands-on Experience",
    caption: "Frontend & MERN Stack Engineering",
    detail: "High-throughput, secure, and production-scalable web applications",
    brandColor: "#0d0d0d",
    platformName: "Enterprise Engineering",
    platformIconKey: "react",
  },
  {
    id: "ach-mau",
    index: "02 / 08",
    number: "10,000+",
    numValue: 10000,
    unit: "+ MAU",
    label: "Monthly Active Users",
    caption: "Cloudrevel Innovations Applications",
    detail: "Engineered with high reliability and enterprise RBAC tiers",
    brandColor: "#61DAFB",
    platformName: "Production Scale",
    platformIconKey: "nextjs",
  },
  {
    id: "ach-load",
    index: "03 / 08",
    number: "35%",
    numValue: 35,
    unit: "% Cut",
    label: "Page Load Reduction",
    caption: "Hybrid SSR / SSG Rendering",
    detail: "Dynamic code splitting and automated asset caching strategies",
    brandColor: "#000000",
    platformName: "Core Web Vitals",
    platformIconKey: "typescript",
  },
  {
    id: "ach-api",
    index: "04 / 08",
    number: "30%",
    numValue: 30,
    unit: "% Latency",
    label: "API Overhead Reduced",
    caption: "TanStack Query Caching",
    detail: "Query invalidation and eliminated redundant payload transfers",
    brandColor: "#FF4154",
    platformName: "TanStack Query",
    platformIconKey: "reactquery",
  },
  {
    id: "ach-defects",
    index: "05 / 08",
    number: "40%",
    numValue: 40,
    unit: "% Fewer",
    label: "Defects Eliminated",
    caption: "Cross-Browser Rendering Tests",
    detail: "Reduced layout regressions across 20+ digital marketing projects",
    brandColor: "#E34F26",
    platformName: "RR Donnelley",
    platformIconKey: "html5",
  },
  {
    id: "ach-paint",
    index: "06 / 08",
    number: "25%",
    numValue: 25,
    unit: "% Faster",
    label: "Page Paint Painting",
    caption: "DOM Depth Optimization",
    detail: "Eliminated render-blocking assets and optimized initial DOM tree",
    brandColor: "#1572B6",
    platformName: "Performance",
    platformIconKey: "webpack",
  },
  {
    id: "ach-lifecycle",
    index: "07 / 08",
    number: "30%",
    numValue: 30,
    unit: "% Faster",
    label: "Sprint Feature Delivery",
    caption: "Trasol Component Library",
    detail: "Reusable React design tokens and component-level code splitting",
    brandColor: "#646CFF",
    platformName: "Design Systems",
    platformIconKey: "vite",
  },
  {
    id: "ach-validation",
    index: "08 / 08",
    number: "40%",
    numValue: 40,
    unit: "% Fewer",
    label: "Validation Errors",
    caption: "MyLedger Formik + Yup",
    detail: "Schema-driven form validation for financial actions",
    brandColor: "#172B4D",
    platformName: "MyLedger",
    platformIconKey: "formik",
  },
];
