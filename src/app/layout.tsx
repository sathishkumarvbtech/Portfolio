import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScrollProvider } from "@/lib/scroll";
import { ThemeProvider } from "@/lib/theme";

const interTight = localFont({
  src: "../fonts/InterTight-Variable.woff2",
  variable: "--font-inter-tight",
  display: "swap",
});

const instrumentSerifRegular = localFont({
  src: "../fonts/InstrumentSerif-Regular.woff2",
  variable: "--font-instrument-serif",
  display: "swap",
});

const instrumentSerifItalic = localFont({
  src: "../fonts/InstrumentSerif-Italic.woff2",
  variable: "--font-instrument-serif-italic",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sathishkumar.dev"),
  title: "Sathishkumar V — Senior Software Engineer & MERN Stack Developer",
  description:
    "Results-oriented Senior Software Engineer & MERN Stack Developer with 4+ years of experience engineering high-throughput, secure, and production-scalable web applications in React.js, Next.js, Node.js, and TypeScript.",
  authors: [{ name: "Sathishkumar V" }],
  keywords: [
    "Sathishkumar V",
    "Senior Frontend Developer",
    "MERN Stack Developer",
    "React.js Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Express.js Developer",
    "MongoDB Developer",
    "TypeScript",
    "UI Developer",
    "Dubai",
    "India",
  ],
  openGraph: {
    title: "Sathishkumar V — Senior Software Engineer & MERN Stack Developer",
    description:
      "Results-oriented Senior Software Engineer & MERN Stack Developer with 4+ years of hands-on experience engineering scalable web applications.",
    url: "https://sathishkumarv.dev",
    siteName: "Sathishkumar V Portfolio",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Sathishkumar V — Senior Software Engineer & MERN Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerifRegular.variable} ${instrumentSerifItalic.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('portfolio-theme');var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased selection:bg-(--ink) selection:text-(--paper)">
        <ThemeProvider>
          <ScrollProvider>{children}</ScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

