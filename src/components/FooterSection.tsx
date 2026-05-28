"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLHeadingElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const bgImgRef   = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Big text parallax reveal
    gsap.fromTo(textRef.current,
      { yPercent: 45, opacity: 0, scale: 0.92 },
      {
        yPercent: 0, opacity: 1, scale: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "center center", scrub: true },
      }
    );

    // CTA fade in
    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top center", toggleActions: "play none none reverse" },
      }
    );

    // Expanding line
    gsap.fromTo(lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top center", toggleActions: "play none none reverse" },
      }
    );

    // Background parallax + mouse drift
    const xTo = gsap.quickTo(bgImgRef.current, "x", { duration: 1.0, ease: "power3" });
    const yTo = gsap.quickTo(bgImgRef.current, "y", { duration: 1.0, ease: "power3" });

    // Scroll parallax
    gsap.to(bgImgRef.current, {
      yPercent: 18, ease: "none",
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
    });

    // Mouse parallax
    const onMove = (e: MouseEvent) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      xTo((e.clientX - rect.left - rect.width  / 2) * 0.045);
      yTo((e.clientY - rect.top  - rect.height / 2) * 0.045);
    };
    sectionRef.current?.addEventListener("mousemove", onMove);
    return () => sectionRef.current?.removeEventListener("mousemove", onMove);

  }, { scope: sectionRef });

  return (
    <footer
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#080808] text-white flex flex-col justify-between items-center overflow-hidden z-20 pt-16 pb-10"
    >
      {/* ── Background image ────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          ref={bgImgRef}
          src="/assets/footer-bg.png"
          alt=""
          aria-hidden
          className="w-[118%] h-[118%] object-cover mix-blend-screen opacity-45 will-change-transform"
          style={{ marginLeft: "-9%", marginTop: "-9%" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #080808 0%, transparent 20%, transparent 70%, #080808 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #080808 0%, transparent 20%, transparent 80%, #080808 100%)" }} />
      </div>

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-[0.07] pointer-events-none z-0" />

      {/* ── Top meta bar ───────────────────────────────────── */}
      <div className="relative z-10 w-full px-8 md:px-14 flex flex-wrap justify-between gap-2">
        <span className="hud-label">© 2026 OSCAR LARA</span>
        <span className="hud-label hidden md:block">DISEÑO Y DESARROLLO DIGITAL · MÉXICO</span>
        <span className="hud-label">TODOS LOS DERECHOS RESERVADOS</span>
      </div>

      {/* ── Expanding line ─────────────────────────────────── */}
      <div
        ref={lineRef}
        className="relative z-10 w-full h-[1px] mt-5 origin-left"
        style={{ background: "linear-gradient(to right, transparent, rgba(216,191,197,0.18), transparent)" }}
      />

      {/* ── Big CTA text ───────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6 gap-4">
        <span className="hud-label text-[#D8BFC5]/45 tracking-[0.4em]">Iniciemos la Colaboración</span>
        <h2
          ref={textRef}
          className="text-huge font-display font-bold uppercase text-outline select-none"
          data-magnetic
        >
          Hablemos
        </h2>
      </div>

      {/* ── CTA Buttons ────────────────────────────────────── */}
      <div ref={ctaRef} className="relative z-10 flex flex-col md:flex-row gap-3 px-8 pb-5 opacity-0">
        <a href="https://wa.me/5218331119884" target="_blank" rel="noreferrer" className="btn-primary" data-magnetic>
          WhatsApp Directo
          <span>→</span>
        </a>
        <a href="mailto:oscarserafin201@gmail.com" className="btn-ghost" data-magnetic>
          Enviar Email
        </a>
      </div>

      {/* ── Bottom credits ─────────────────────────────────── */}
      <div className="relative z-10 w-full px-8 md:px-14 flex flex-wrap justify-between gap-y-1 pt-5 border-t border-white/[0.04]">
        <span className="hud-label">OSCAR ALFREDO PÉREZ LARA</span>
        <span className="hud-label hidden md:block">UAT · TAMAULIPAS, MÉXICO</span>
        <span className="hud-label">PORTFOLIO V2.0</span>
      </div>
    </footer>
  );
}
