"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/* ─────────────────────────────────────────────────────────────
   OSCAR LARA · LOADER
   
   FIX: Two-effect pattern solves the race condition:
   Effect 1 (runs on mount) → sets mounted=true → DOM renders
   Effect 2 (runs when mounted=true) → refs ARE attached → GSAP works
   
   Laws of UX applied:
   · Doherty Threshold: feedback within 400ms so user knows something is happening
   · Progress Indicators: always show motion (Jakob Nielsen NN/g)
   · Aesthetic-Usability Effect: beautiful loader = perceived quality
───────────────────────────────────────────────────────────── */

const PHASES = [
  "Preparando el espacio",
  "Calibrando composición",
  "Ajustando detalles",
  "Listo",
];

const P_FULL  = "M0,0 V100 Q50,100 100,100 V0 Z";
const P_BELLY = "M0,0 V100 Q22,118 50,88 Q78,60 100,100 V0 Z";
const P_GONE  = "M0,0 V0   Q50,0   100,0   V0 Z";

export function PageLoader() {
  const p1Ref    = useRef<SVGPathElement>(null);
  const p2Ref    = useRef<SVGPathElement>(null);
  const p3Ref    = useRef<SVGPathElement>(null);
  const coreRef  = useRef<HTMLDivElement>(null);
  const numRef   = useRef<HTMLSpanElement>(null);
  const phaseRef = useRef<HTMLSpanElement>(null);
  const barsRef  = useRef<HTMLDivElement>(null);
  const fillRef  = useRef<HTMLDivElement>(null);

  const [show,    setShow]    = useState(true);
  const [mounted, setMounted] = useState(false);

  // ── Effect 1: Just flip the flag so the DOM renders ─────
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setMounted(true);
    return () => { document.body.style.overflow = ""; };
  }, []);

  // ── Effect 2: Runs AFTER mount (refs are guaranteed attached) ─
  useEffect(() => {
    if (!mounted) return;

    const p1    = p1Ref.current;
    const p2    = p2Ref.current;
    const p3    = p3Ref.current;
    const core  = coreRef.current;
    const numEl = numRef.current;
    const phase = phaseRef.current;
    const bars  = barsRef.current;
    const fill  = fillRef.current;

    if (!p1 || !p2 || !p3 || !core || !numEl || !phase || !bars || !fill) return;

    // Safety ejector – never block > 5s
    const safety = setTimeout(() => {
      document.body.style.overflow = "";
      setShow(false);
    }, 5000);

    // ── Init ─────────────────────────────────────────────────
    gsap.set([p1, p2, p3], { attr: { d: P_FULL } });
    gsap.set(core,          { scale: 0, opacity: 0 });
    gsap.set([numEl, bars], { opacity: 0 });
    numEl.textContent = "000";
    fill.style.width  = "0%";

    // ── Phase 1: Entry (iris opens) ──────────────────────────
    const entry = gsap.timeline();
    entry
      .to([p1, p2, p3], {
        attr: { d: P_BELLY }, duration: 0.75,
        stagger: 0.09, ease: "power2.inOut",
      })
      .to(core, {
        scale: 1, opacity: 1,
        duration: 0.65, ease: "back.out(1.7)",
      }, "-=0.28")
      .to([numEl, bars], {
        opacity: 1, duration: 0.45,
        stagger: 0.08, ease: "power2.out",
      }, "-=0.22");

    // ── Phase 2: Counter 000 → 100 ───────────────────────────
    let phaseIdx = 0;
    const tickPhase = () => { phase.textContent = PHASES[phaseIdx++ % PHASES.length]; };
    tickPhase();
    const phaseInterval = setInterval(tickPhase, 520);

    // Counter driven entirely by GSAP onUpdate
    const obj = { n: 0 };
    gsap.to(obj, {
      n: 100,
      duration: 2.1,
      ease: "power1.inOut",
      delay: 0.4,
      onUpdate() {
        const v = Math.round(obj.n);
        numEl.textContent = String(v).padStart(3, "0");
        fill.style.width  = v + "%";
      },
    });

    // ── Phase 3: Liquid exit ─────────────────────────────────
    const exitTimer = setTimeout(() => {
      clearInterval(phaseInterval);
      clearTimeout(safety);

      const exit = gsap.timeline({
        onComplete() {
          document.body.style.overflow = "";
          setShow(false);
        },
      });

      // Dissolve center UI first
      exit.to([core, numEl, bars], {
        opacity: 0, y: -14,
        duration: 0.35, stagger: 0.04, ease: "power3.in",
      });

      // 3-layer staggered liquid wipe
      exit
        .to(p1, { attr: { d: P_BELLY }, duration: 0.44, ease: "power3.in" },  "-=0.1")
        .to(p1, { attr: { d: P_GONE  }, duration: 0.58, ease: "power4.out" })
        .to(p2, { attr: { d: P_BELLY }, duration: 0.44, ease: "power3.in" },  "-=0.85")
        .to(p2, { attr: { d: P_GONE  }, duration: 0.58, ease: "power4.out" }, "-=0.36")
        .to(p3, { attr: { d: P_BELLY }, duration: 0.44, ease: "power3.in" },  "-=1.15")
        .to(p3, { attr: { d: P_GONE  }, duration: 0.62, ease: "power4.out" }, "-=0.2");

    }, 2700);

    return () => {
      clearInterval(phaseInterval);
      clearTimeout(exitTimer);
      clearTimeout(safety);
      document.body.style.overflow = "";
    };
  }, [mounted]); // only fires once mounted is true

  // Hidden until mounted — avoids hydration flash
  if (!mounted || !show) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
      style={{ cursor: "none" }}
    >
      {/* ── 3 liquid fill layers ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path ref={p1Ref} d={P_FULL} fill="#D8BFC5" />
        <path ref={p2Ref} d={P_FULL} fill="#C9C1D9" />
        <path ref={p3Ref} d={P_FULL} fill="#080808" />
      </svg>

      {/* Subtle dot grid on the black layer */}
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none z-[2]" />

      {/* ── Orbital iris ── */}
      <div ref={coreRef} className="relative z-10 flex items-center justify-center">

        {/* Outer dashed orbit */}
        <div
          className="absolute rounded-full border border-dashed border-[#D8BFC5]/12"
          style={{ width: 248, height: 248, animation: "rotateSlow 30s linear infinite" }}
        />

        {/* Middle orbit with glowing dot */}
        <div
          className="absolute rounded-full border border-[#C9C1D9]/18"
          style={{ width: 170, height: 170, animation: "rotateSlow 18s linear infinite reverse" }}
        >
          <div
            className="absolute w-2 h-2 rounded-full bg-[#D8BFC5]"
            style={{
              top: -4, left: "50%",
              transform: "translateX(-50%)",
              boxShadow: "0 0 10px rgba(216,191,197,0.75)",
            }}
          />
        </div>

        {/* Inner orbit */}
        <div
          className="absolute rounded-full border border-[#D9D5E8]/20"
          style={{ width: 104, height: 104, animation: "rotateSlow 10s linear infinite" }}
        >
          <div
            className="absolute w-1.5 h-1.5 rounded-full bg-[#D9D5E8]/75"
            style={{ bottom: -3, right: -3 }}
          />
        </div>

        {/* Singularity */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full anim-ping" style={{ background: "rgba(216,191,197,0.1)" }} />
          <div className="absolute inset-0 rounded-full anim-ping" style={{ background: "rgba(201,193,217,0.07)", animationDelay: "0.85s" }} />
          <div className="absolute inset-0 rounded-full anim-ping" style={{ background: "rgba(217,213,232,0.05)", animationDelay: "1.7s" }} />
          <div
            className="w-4 h-4 rounded-full bg-[#D8BFC5]"
            style={{ boxShadow: "0 0 0 3px rgba(216,191,197,0.15), 0 0 26px rgba(216,191,197,0.6)" }}
          />
        </div>
      </div>

      {/* ── Counter + status ── */}
      <div className="relative z-10 mt-12 flex flex-col items-center gap-4 select-none pointer-events-none">

        {/* The counter — GSAP writes directly to textContent */}
        <span
          ref={numRef}
          className="font-display font-bold text-white leading-none tabular-nums"
          style={{ fontSize: "clamp(5rem, 15vw, 9.5rem)", letterSpacing: "-0.07em" }}
        >
          000
        </span>

        <div ref={barsRef} className="flex flex-col items-center gap-2">
          {/* Phase label */}
          <span
            ref={phaseRef}
            className="font-sans text-[11px] font-medium tracking-wide"
            style={{ color: "rgba(246,246,244,0.5)" }}
          >
            Preparando el espacio
          </span>

          {/* Progress track */}
          <div className="w-48 h-[1.5px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <div
              ref={fillRef}
              className="h-full rounded-full"
              style={{
                width: "0%",
                background: "linear-gradient(to right, #D8BFC5, #C9C1D9)",
                boxShadow: "0 0 10px rgba(216,191,197,0.5)",
                willChange: "width",
                transition: "none",
              }}
            />
          </div>

          {/* Bottom label */}
          <span
            className="font-mono text-[8px] tracking-[0.35em] uppercase"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            Oscar Lara — 2026
          </span>
        </div>
      </div>
    </div>
  );
}
