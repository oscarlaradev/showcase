"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Project = { id: string; title: string; role: string; image: string; url?: string; };

export function ShowcaseSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const wrapRef     = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [active,   setActive]   = useState(0);

  useEffect(() => {
    fetch("/api/projects").then(r => r.json()).then(setProjects).catch(console.error);
  }, []);

  useGSAP(() => {
    if (!projects.length) return;

    const panels = gsap.utils.toArray<HTMLElement>(".sc-panel");
    const w      = wrapRef.current?.offsetWidth ?? 0;

    const st = gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1.3,
        snap: { snapTo: 1 / (panels.length - 1), duration: 0.55, ease: "power2.inOut" },
        end: () => `+=${w}`,
        onUpdate: (self) => setActive(Math.round(self.progress * (panels.length - 1))),
      },
    });

    // Image parallax
    panels.forEach(panel => {
      const img = panel.querySelector<HTMLElement>(".sc-img");
      if (!img) return;
      gsap.fromTo(img,
        { xPercent: -10 },
        { xPercent: 10, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: () => `+=${w}`, scrub: true }
        }
      );
    });

    // Text reveals
    panels.forEach(panel => {
      gsap.fromTo(panel.querySelectorAll(".sc-text"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { containerAnimation: st, trigger: panel, start: "left center", toggleActions: "play none none reverse" }
        }
      );
    });

  }, { scope: sectionRef, dependencies: [projects] });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden z-10 bg-[#080808]"
    >
      {/* ── Effects overlay ──────────────────────────────────── */}
      <div className="absolute inset-0 scanlines pointer-events-none z-30 opacity-35" />
      <div className="absolute inset-0 scan-sweep pointer-events-none z-30" />
      <div className="absolute inset-0 cyber-grid opacity-[0.08] pointer-events-none z-0" />

      {/* ── Top HUD ──────────────────────────────────────────── */}
      <div className="absolute top-24 md:top-8 left-0 w-full px-6 md:px-8 flex justify-between items-center z-20 pointer-events-none">
        <div className="hidden md:flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D8BFC5]" style={{ animation: "audioBar 1.5s ease-in-out infinite" }} />
          <span className="hud-label">MÓDULO: PORTAFOLIO_VISUAL</span>
        </div>
        <span className="hud-label ml-auto">
          {String(active + 1).padStart(2, "0")} / {String(projects.length || 1).padStart(2, "0")}
        </span>
      </div>

      {/* ── Slide dots ───────────────────────────────────────── */}
      {projects.length > 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-none">
          {projects.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width:      i === active ? "28px" : "6px",
                height:     "6px",
                background: i === active ? "#D8BFC5" : "rgba(255,255,255,0.12)",
              }}
            />
          ))}
        </div>
      )}

      {/* ── Panels container ─────────────────────────────────── */}
      <div
        ref={wrapRef}
        className="flex h-full"
        style={{ width: `${(projects.length || 1) * 100}vw` }}
      >
        {projects.length > 0 ? projects.map((p, i) => (
          <div
            key={p.id}
            className="sc-panel w-screen h-full flex-shrink-0 relative flex flex-col justify-center items-center px-8 md:px-20"
          >
            {/* BG image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                className="sc-img w-[116%] h-[116%] object-cover opacity-28"
                style={{ marginLeft: "-8%", marginTop: "-8%", willChange: "transform" }}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920";
                }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #080808 0%, transparent 30%, transparent 70%, #080808 100%)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #080808 0%, transparent 20%, transparent 75%, #080808 100%)" }} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl w-full gap-5">
              {/* Badge */}
              <span className="sc-text inline-flex items-center gap-2 tag text-[10px] px-4 py-1.5 rounded-full border-[#D8BFC5]/18 bg-[#D8BFC5]/5">
                <span className="w-1 h-1 rounded-full bg-[#D8BFC5]" style={{ animation: "audioBar 1.8s ease-in-out infinite" }} />
                PROYECTO {String(i + 1).padStart(2, "0")} · {p.role}
              </span>

              {/* Title */}
              <h2
                className="sc-text font-display font-extrabold uppercase tracking-tighter text-white text-outline select-none"
                style={{ fontSize: "clamp(3rem, 9vw, 9rem)", lineHeight: 0.88 }}
              >
                {p.title}
              </h2>

              {/* Divider */}
              <div className="sc-text w-20 h-[1px]" style={{ background: "linear-gradient(to right, transparent, rgba(216,191,197,0.4), transparent)" }} />

              {/* Meta */}
              <p className="sc-text hud-label tracking-[0.28em]">
                CONVERGENCIA CLIENTE ESTABILIZADA · ID:{p.id}
              </p>

              {/* CTA */}
              {p.url && p.url !== "#" && (
                <div className="sc-text mt-4">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost group"
                    data-magnetic
                  >
                    <span>Ver Proyecto</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </a>
                </div>
              )}
            </div>

            {/* Corner index */}
            <div className="absolute bottom-9 right-10 pointer-events-none select-none hidden md:block">
              <span className="hud-label">MATRIX_IDX:{p.id}</span>
            </div>
          </div>
        )) : (
          <div className="w-screen h-full flex items-center justify-center">
            <span className="font-mono text-[#C9C1D9]/35 text-xs tracking-widest uppercase" style={{ animation: "audioBar 1.2s ease-in-out infinite" }}>
              CARGANDO EL VACÍO DEL PORTAFOLIO...
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
