"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Service = {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  stat: string;
  statLabel: string;
};

const SERVICES: Service[] = [
  {
    num: "01",
    title: "Sitios para Negocios",
    desc: "Landing pages, portfolios y e-commerce construidos con precision de relojero. Velocidad, claridad y presencia que convierte primeras impresiones en clientes reales.",
    tags: ["NEXT.JS", "TAILWIND", "SSR/SSG", "SEO TÉCNICO"],
    stat: "+85%",
    statLabel: "RETENCIÓN",
  },
  {
    num: "02",
    title: "Experiencias WebGL",
    desc: "Entornos tridimensionales, shaders personalizados y física visual. El tipo de sitio que la gente envía a sus amigos porque nunca habían visto algo así.",
    tags: ["WebGL2", "THREE.JS", "GLSL", "R3F"],
    stat: "120fps",
    statLabel: "RENDER RATE",
  },
  {
    num: "03",
    title: "SEO & Posicionamiento",
    desc: "Arquitectura semántica que Google entiende. Desde la estructura de datos hasta el rendimiento Core Web Vitals — el trabajo que hace que te encuentren.",
    tags: ["SCHEMA.ORG", "CORE WEB VITALS", "METATAGS", "SEMÁNTICA"],
    stat: "+120%",
    statLabel: "LEADS ORGÁNICOS",
  },
];


export function ExpertiseSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Pin left column only on desktop
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: leftRef.current,
        pinSpacing: false,
      });

      // Growing accent line
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });

    // Card scroll reveals
    const cards = gsap.utils.toArray<HTMLElement>(".exp-card");
    cards.forEach((card, idx) => {
      gsap.fromTo(card,
        { opacity: 0, y: 55, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top center+=130",
            toggleActions: "play none none reverse",
          },
        }
      );

      ScrollTrigger.create({
        trigger: card,
        start: "top center",
        end: "bottom center",
        onEnter:     () => setActive(idx),
        onEnterBack: () => setActive(idx),
      });
    });
  }, { scope: sectionRef });

  // 3D tilt on cards
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".exp-card");
    const cleanups: VoidFunction[] = [];

    cards.forEach(card => {
      const onMove = (e: MouseEvent) => {
        const r  = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top)  / r.height - 0.5) * -12;
        const ry = ((e.clientX - r.left) / r.width  - 0.5) *  14;
        gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.22, ease: "power2.out", overwrite: "auto" });
      };
      const onLeave = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.55, ease: "elastic.out(1, 0.5)", overwrite: "auto" });

      card.addEventListener("mousemove",  onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove",  onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });
    return () => cleanups.forEach(f => f());
  }, []);

  const s = SERVICES[active];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#080808] text-white px-6 md:px-14 py-24 flex flex-col md:flex-row gap-10 min-h-screen md:min-h-[240vh] z-10"
    >
      {/* Background */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* ── LEFT — Pinned Panel ───────────────────────────────── */}
      <div ref={leftRef} className="w-full md:w-[42%] min-h-[50vh] md:h-screen flex flex-col justify-center relative z-10 pt-10 md:pt-0">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-5 h-[1px] bg-[#D8BFC5]/35" />
          <span className="hud-label text-[#D8BFC5]/50">Servicios Especializados</span>
        </div>

        <h2 className="font-display font-bold text-5xl md:text-[5.5rem] uppercase tracking-tighter leading-[0.9]">
          Nuestra
          <br />
          <span className="text-outline">Especialidad</span>
        </h2>

        {/* Diagnostics console */}
        <div
          key={active}
          className="mt-9 p-5 glass rounded-xl max-w-[340px] w-full relative overflow-hidden anim-shimmer"
          style={{ animation: "fadeUp 0.35s ease-out both, borderShimmer 4s ease-in-out infinite" }}
        >
          {/* Progress accent */}
          <div
            className="absolute top-0 left-0 h-[1.5px] rounded-full transition-all duration-700"
            style={{
              width: `${((active + 1) / SERVICES.length) * 100}%`,
              background: "linear-gradient(to right, #D8BFC5, #C9C1D9)",
            }}
          />

          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/5 pb-3 mb-3">
            <span className="font-mono text-[10px] tracking-widest text-white/60 font-bold">MÓDULO {s.num}</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9C1D9]" style={{ animation: "audioBar 1.2s ease-in-out infinite" }} />
              <span className="font-mono text-[8px] tracking-widest text-[#C9C1D9]/70">ACTIVO</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {s.tags.map((t, i) => <span key={i} className="tag">{t}</span>)}
          </div>

          {/* Big stat */}
          <div className="flex items-end gap-2">
            <span className="font-display font-bold text-[2.6rem] text-[#D8BFC5] leading-none tracking-tighter">{s.stat}</span>
            <span className="font-mono text-[9px] tracking-[0.2em] pb-1" style={{ color: "rgba(246,246,244,0.4)" }}>{s.statLabel}</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="flex gap-2 mt-7">
          {SERVICES.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width:      i === active ? "26px" : "6px",
                height:     "6px",
                background: i === active ? "#D8BFC5" : "rgba(255,255,255,0.14)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── RIGHT — Scroll column ─────────────────────────────── */}
      <div className="w-full md:w-[58%] flex flex-row md:gap-5 pt-10 pb-10 md:pt-[28vh] md:pb-[28vh] relative z-10">

        {/* Progress line */}
        <div className="w-[1px] bg-white/6 relative self-stretch flex-shrink-0 hidden md:block">
          <div
            ref={lineRef}
            className="absolute top-0 left-0 w-full h-full origin-top scale-y-0"
            style={{ background: "linear-gradient(to bottom, #D8BFC5, #C9C1D9)" }}
          />
        </div>

        {/* Cards */}
        <div className="flex-1 flex flex-col gap-28">
          {SERVICES.map((svc, idx) => (
            <div
              key={idx}
              className="exp-card glass rounded-2xl p-8 md:p-10 flex flex-col gap-6 relative overflow-hidden tilt-card"
              style={{ perspective: "900px" }}
              data-magnetic
            >
              {/* Corner glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, rgba(216,191,197,0.06), transparent 70%)" }}
              />

              {/* Top row */}
              <div className="flex justify-between items-center">
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#D8BFC5]/55">{svc.num}.</span>
                <span className="tag">MOD-ACTIVE</span>
              </div>

              {/* Title */}
              <h3 className="font-display font-extrabold text-3xl md:text-4xl uppercase tracking-tight text-white leading-tight">
                {svc.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "rgba(246,246,244,0.68)" }}>{svc.desc}</p>

              {/* Metric strip */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex flex-wrap gap-1.5">
                  {svc.tags.map((t, i) => <span key={i} className="tag">{t}</span>)}
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="font-display font-bold text-2xl text-[#D8BFC5] leading-none tracking-tight">{svc.stat}</div>
                  <div className="hud-label mt-0.5">{svc.statLabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
