import type { Metadata } from "next";
import { Inter, Space_Grotesk, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ReactLenis } from "lenis/react";
import { CustomCursor } from "@/components/CustomCursor";
import { AudioPlayer }  from "@/components/AudioPlayer";
import { PageLoader }   from "@/components/PageLoader";
import Link from "next/link";

const inter        = Inter({          subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const robotoMono   = Roboto_Mono({   subsets: ["latin"], variable: "--font-roboto-mono" });

export const metadata: Metadata = {
  title: "Oscar Lara — Desarrollador Front-End & Diseñador Digital",
  description: "Oscar Lara, desarrollador Front-End de 19 años. Diseño y desarrollo de experiencias web de precisión. Sitios premium, interfaces inmersivas y productos digitales que perduran.",
  keywords: ["Oscar Lara", "desarrollo web", "diseño digital", "páginas web premium", "front-end", "react", "nextjs", "Mexico", "UAT", "Tamaulipas"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} ${robotoMono.variable}`}>
      <body className="antialiased bg-[#080808] selection:bg-[#D8BFC5] selection:text-[#080808]">
        <ReactLenis root options={{ lerp: 0.055, smoothWheel: true }}>

          <PageLoader />
          <CustomCursor />
          <AudioPlayer />

          {/* ── Nav ─────────────────────────────────────────────────
              Laws of UX applied:
              · Fitts's Law — nav items have generous touch targets
              · Hick's Law — only 3 choices, no paralysis
              · Serial Position Effect — CTA last (most remembered)
          ─────────────────────────────────────────────────────────── */}
          <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-7 md:px-12 py-6">

            {/* Logo wordmark — minimal, no superfluous badges */}
            <Link
              href="/"
              className="group flex items-center gap-3"
              data-magnetic
            >
              <span className="font-display font-black text-[1.05rem] tracking-tighter uppercase text-white mix-blend-difference leading-none">
                Oscar Lara
              </span>
              {/* Year marker — honest, non-generic */}
              <span
                className="font-mono text-[7.5px] tracking-[0.28em] uppercase leading-none pb-[1px]"
                style={{ color: "rgba(216,191,197,0.45)" }}
              >
                ©&nbsp;2026
              </span>
            </Link>

            {/* Primary links */}
            <div className="flex items-center gap-4 md:gap-10">
              <Link
                href="/#work"
                className="font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-300 mix-blend-difference"
                style={{ color: "rgba(246,246,244,0.45)" }}
                data-magnetic
              >
                Trabajo
              </Link>
              <Link
                href="/about"
                className="font-mono text-[10px] uppercase tracking-[0.24em] transition-colors duration-300 mix-blend-difference"
                style={{ color: "rgba(246,246,244,0.45)" }}
                data-magnetic
              >
                Acerca
              </Link>
              {/* CTA — high contrast by design (Refactoring UI: contrast draws attention) */}
              <a
                href="https://wa.me/5218331119884"
                target="_blank"
                rel="noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 border"
                style={{
                  background: "rgba(216,191,197,0.07)",
                  borderColor: "rgba(216,191,197,0.2)",
                  color: "#D8BFC5",
                }}
                data-magnetic
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#D8BFC5] flex-shrink-0" style={{ animation: "audioBar 1.8s ease-in-out infinite" }} />
                Hablemos
              </a>
            </div>
          </nav>

          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
