"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP quickTo for extreme performance
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleHoverIn = () => cursor.classList.add("hover");
    const handleHoverOut = () => cursor.classList.remove("hover");

    window.addEventListener("mousemove", handleMouseMove);
    
    // Use MutationObserver or interval to attach to data-magnetic elements dynamically
    const updateMagnets = () => {
      document.querySelectorAll("[data-magnetic]").forEach((el) => {
        // Prevent duplicate listeners
        if (el.hasAttribute("data-cursor-attached")) return;
        el.setAttribute("data-cursor-attached", "true");
        
        el.addEventListener("mouseenter", handleHoverIn);
        el.addEventListener("mouseleave", handleHoverOut);
      });
    };
    
    updateMagnets();
    const interval = setInterval(updateMagnets, 1000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor"></div>;
}
