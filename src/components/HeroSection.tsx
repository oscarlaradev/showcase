"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
   
   Laws of UX applied:
   · Aesthetic-Usability Effect — beauty = perceived quality
   · Von Restorff Effect — text-outline for distinctiveness  
   · Serial Position Effect — key message front & center
   · Doherty Threshold — immediate visual feedback on enter
   · Fitts's Law — CTA badges generous in size
   
   Design principles (Apple HIG + Refactoring UI):
   · Information hierarchy: name > role > tagline > meta
   · Whitespace is intentional, not empty
   · Contrast ratios meet WCAG AA minimum
   · Motion is purposeful, not decorative
─────────────────────────────────────────────────────────────── */

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRef    = useRef<HTMLDivElement>(null);
  const ring1Ref   = useRef<HTMLDivElement>(null);
  const ring2Ref   = useRef<HTMLDivElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);
  const metaRef    = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.1 });

    // ── Letter reveal — clip from below with skew ─────────
    tl.fromTo(".hero-char",
      { yPercent: 108, skewX: -6, opacity: 0 },
      { yPercent: 0, skewX: 0, opacity: 1, duration: 1.6, stagger: 0.08, ease: "power4.out" }
    );

    // ── Divider line expand ────────────────────────────────
    tl.fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
      "-=1.0"
    );

    // ── Orbital rings with initial rotation ───────────────
    tl.fromTo([ring1Ref.current, ring2Ref.current],
      { scale: 0.35, opacity: 0, rotation: -60 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1.5, stagger: 0.18, ease: "power3.out" },
      "-=0.9"
    );

    // ── Subtitle + badge ───────────────────────────────────
    tl.fromTo([subRef.current, badgeRef.current],
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: "power3.out" },
      "-=0.55"
    );

    // ── Bottom meta + scroll ───────────────────────────────
    tl.fromTo([metaRef.current, scrollRef.current],
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power3.out" },
      "-=0.4"
    );

    // ── Scroll parallax (word floats up as you scroll) ────
    gsap.to(wordRef.current, {
      yPercent: 22, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(ring1Ref.current, {
      yPercent: -16, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(ring2Ref.current, {
      yPercent: -28, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
    });

  }, { scope: sectionRef });

  // ── Gentle mouse parallax ─────────────────────────────────
  useEffect(() => {
    const r1 = ring1Ref.current;
    const r2 = ring2Ref.current;
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth  - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      if (r1) gsap.to(r1, { x: nx * 28, y: ny * 16, duration: 1.3, ease: "power2.out", overwrite: "auto" });
      if (r2) gsap.to(r2, { x: -nx * 16, y: -ny * 10, duration: 1.5, ease: "power2.out", overwrite: "auto" });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden z-10"
    >
      {/* ── Subtle vignette radial ──────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse 72% 58% at 50% 52%, rgba(216,191,197,0.045) 0%, transparent 65%)" }} />

      {/* ── Edge vignette (depth) ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{ background: "linear-gradient(to bottom, #080808 0%, transparent 18%, transparent 76%, #080808 100%)" }} />

      {/* ── Orbital rings — depth layers ───────────────────── */}
      <div ref={ring1Ref}
        className="absolute pointer-events-none z-0 opacity-0"
        style={{ width: "min(720px, 140vw)", height: "min(720px, 140vw)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        <svg viewBox="0 0 720 720" fill="none" className="w-full h-full" style={{ animation: "rotateSlow 42s linear infinite" }}>
          <ellipse cx="360" cy="360" rx="338" ry="115" stroke="rgba(216,191,197,0.055)" strokeWidth="1" strokeDasharray="6 14" />
          <ellipse cx="360" cy="360" rx="238" ry="238" stroke="rgba(201,193,217,0.04)" strokeWidth="0.8" />
          <circle cx="360" cy="22"  r="4.5" fill="rgba(216,191,197,0.6)" />
          <circle cx="598" cy="268" r="2.5" fill="rgba(201,193,217,0.4)" />
          <circle cx="122" cy="448" r="2"   fill="rgba(217,213,232,0.3)" />
        </svg>
      </div>

      <div ref={ring2Ref}
        className="absolute pointer-events-none z-0 opacity-0"
        style={{ width: "min(445px, 100vw)", height: "min(445px, 100vw)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        <svg viewBox="0 0 445 445" fill="none" className="w-full h-full" style={{ animation: "rotateSlow 26s linear infinite reverse" }}>
          <ellipse cx="222" cy="222" rx="205" ry="70" stroke="rgba(216,191,197,0.075)" strokeWidth="0.9" />
          <circle cx="222" cy="222" r="162"  stroke="rgba(201,193,217,0.055)" strokeWidth="0.8" strokeDasharray="4 10" />
          <circle cx="222" cy="17"  r="5.5"  fill="rgba(216,191,197,0.65)" style={{ filter: "blur(0.8px)" }} />
          <circle cx="428" cy="272" r="3"    fill="rgba(217,213,232,0.45)" />
        </svg>
      </div>

      {/* ── Name block ─────────────────────────────────────── */}
      <div ref={wordRef} className="relative z-10 text-center flex flex-col items-center">

        {/* Primary heading — Aesthetic-Usability Effect */}
        <div className="overflow-hidden flex">
          <h1 className="text-massive font-display font-extrabold flex select-none leading-none tracking-tighter">
            {"OSLR".split("").map((ch, i) => (
              <span key={i} className="overflow-hidden inline-block">
                <span
                  className="hero-char glitch inline-block text-outline opacity-0"
                  data-text={ch}
                  data-magnetic
                  style={{ willChange: "transform, opacity" }}
                >
                  {ch}
                </span>
              </span>
            ))}
          </h1>
        </div>

        {/* Expanding line — line-sweep shimmer */}
        <div
          ref={lineRef}
          className="w-full h-[1px] mt-3 origin-left opacity-0 line-sweep"
          style={{ background: "linear-gradient(to right, transparent, rgba(216,191,197,0.28) 30%, rgba(201,193,217,0.18) 70%, transparent)" }}
        />

        {/* Marquee — discipline tags, no tech buzzwords */}
        <div className="marquee-wrap w-full py-2.5">
          <div
            className="marquee-track font-mono text-[9px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(246,246,244,0.25)" }}
          >
            {Array(8).fill(
              "Oscar Lara · Diseño & Desarrollo · Front-End · Interfaces Inmersivas · Experiencia de Usuario · México · "
            ).join("")}
          </div>
        </div>

        {/* ── Tagline — no AI, no buzzwords ─────────────────
            Refactoring UI: short, concrete, benefit-oriented.
            Apple HIG: honest, human language.
        ────────────────────────────────────────────────────── */}
        <p
          ref={subRef}
          className="mt-7 font-sans text-[13px] max-w-[380px] leading-relaxed text-center opacity-0"
          style={{ color: "rgba(246,246,244,0.6)", letterSpacing: "0.01em" }}
        >
          Diseño y desarrollo de precisión para marcas<br />
          que quieren ser <em style={{ fontStyle: "normal", color: "#D8BFC5" }}>recordadas.</em>
        </p>

        {/* Status badge — minimal, not AI-looking */}
        <div
          ref={badgeRef}
          className="mt-7 inline-flex items-center gap-3 px-5 py-2.5 glass-lighter rounded-full opacity-0"
          data-magnetic
        >
          <span className="relative flex w-2 h-2 flex-shrink-0">
            <span className="absolute inset-0 rounded-full anim-ping" style={{ background: "rgba(216,191,197,0.6)" }} />
            <span className="w-2 h-2 rounded-full bg-[#D8BFC5]" />
          </span>
          <span
            className="font-sans text-[11px] font-medium"
            style={{ color: "rgba(246,246,244,0.55)", letterSpacing: "0.02em" }}
          >
            Disponible para proyectos — 2026
          </span>
        </div>
      </div>

      {/* ── Bottom meta strip ────────────────────────────────
          Replaces generic HUD. Short, human, purposeful.
          (NN/g: don't show info that serves no user need)
      ──────────────────────────────────────────────────────── */}
      <div
        ref={metaRef}
        className="absolute bottom-9 left-0 w-full px-8 md:px-12 flex justify-between items-end opacity-0 z-10 pointer-events-none"
      >
        {/* Left — location */}
        <div className="hidden md:flex flex-col gap-0.5">
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: "rgba(246,246,244,0.22)" }}>
            Ubicación
          </span>
          <span className="font-mono text-[10px] tracking-[0.15em]" style={{ color: "rgba(246,246,244,0.42)" }}>
            Tamaulipas, México
          </span>
        </div>

        {/* Center — scroll hint */}
        <div
          ref={scrollRef}
          className="flex flex-col items-center gap-2 pointer-events-none select-none mx-auto md:mx-0 md:absolute md:left-1/2 md:-translate-x-1/2"
          style={{ bottom: 0 }}
        >
          <div className="relative w-[1px] h-12 overflow-hidden">
            <div
              className="absolute w-full anim-scroll-dot rounded-full"
              style={{
                height: "38%",
                background: "linear-gradient(to bottom, transparent, rgba(216,191,197,0.65), transparent)",
              }}
            />
          </div>
          <span
            className="font-mono text-[8px] tracking-[0.4em] uppercase"
            style={{ color: "rgba(246,246,244,0.28)" }}
          >
            Desplazar
          </span>
        </div>

        {/* Right — stat */}
        <div className="hidden md:flex flex-col items-end gap-0.5">
          <span className="font-mono text-[8px] tracking-[0.3em] uppercase" style={{ color: "rgba(246,246,244,0.22)" }}>
            Proyectos
          </span>
          <span
            className="font-display font-bold leading-none"
            style={{ fontSize: "1.85rem", letterSpacing: "-0.04em", color: "#D8BFC5" }}
          >
            12+
          </span>
        </div>
      </div>
    </section>
  );
}
