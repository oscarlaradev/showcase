"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX  = gsap.quickTo(dot,  "x", { duration: 0.05, ease: "power3.out" });
    const dotY  = gsap.quickTo(dot,  "y", { duration: 0.05, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });

    const ticks = ring.querySelectorAll<HTMLElement>(".cur-tick");

    const onMove = (e: MouseEvent) => {
      dotX(e.clientX); dotY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
    };
    const onDown = () => {
      ring.classList.add("is-clicking");
      gsap.to(ticks, { scale: 0.65, duration: 0.12, ease: "power2.in", overwrite: "auto" });
    };
    const onUp = () => {
      ring.classList.remove("is-clicking");
      gsap.to(ticks, { scale: 1, duration: 0.4, ease: "elastic.out(1,0.4)", overwrite: "auto" });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    // ── Magnetic — REDUCED drift (0.12 instead of 0.28) ─────
    const bindMagnets = () => {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(el => {
        if (el.dataset.cursorBound) return;
        el.dataset.cursorBound = "1";

        const onEnter = () => {
          ring.classList.add("is-hovered");
          gsap.to(ticks, { rotation: 45, duration: 0.3, ease: "power3.out", overwrite: "auto" });
        };
        const onLeave = () => {
          ring.classList.remove("is-hovered");
          gsap.to(ticks, { rotation: 0, duration: 0.3, ease: "power3.out", overwrite: "auto" });
          // Gentle snap back — was 0.28 pull, now just 0.1
          gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
        };
        const onMoveEl = (e: MouseEvent) => {
          const r  = el.getBoundingClientRect();
          const cx = r.left + r.width  / 2;
          const cy = r.top  + r.height / 2;
          // REDUCED: was 0.28, now 0.12 — subtle, not violent
          gsap.to(el, {
            x: (e.clientX - cx) * 0.12,
            y: (e.clientY - cy) * 0.12,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
          // Ring barely moves toward element
          ringX(cx + (e.clientX - cx) * 0.3);
          ringY(cy + (e.clientY - cy) * 0.3);
        };

        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        el.addEventListener("mousemove",  onMoveEl);
      });
    };

    bindMagnets();
    const poll = setInterval(bindMagnets, 1200);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      clearInterval(poll);
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach(el => { delete el.dataset.cursorBound; });
    };
  }, []);

  const tickStyle = (dir: "top"|"bottom"|"left"|"right"): React.CSSProperties => {
    const s: React.CSSProperties = { position: "absolute", background: "rgba(216,191,197,0.7)", pointerEvents: "none", borderRadius: "99px" };
    if (dir === "top"    || dir === "bottom") { Object.assign(s, { width: "10px", height: "1.5px", left: "50%", transform: "translateX(-50%)" }); }
    if (dir === "left"   || dir === "right")  { Object.assign(s, { height: "10px", width: "1.5px", top: "50%", transform: "translateY(-50%)" }); }
    if (dir === "top")    s.top    = "-6px";
    if (dir === "bottom") s.bottom = "-6px";
    if (dir === "left")   s.left   = "-6px";
    if (dir === "right")  s.right  = "-6px";
    return s;
  };

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring flex items-center justify-center">
        {(["top","bottom","left","right"] as const).map(d => (
          <span key={d} className="cur-tick" style={tickStyle(d)} />
        ))}
      </div>
    </>
  );
}
