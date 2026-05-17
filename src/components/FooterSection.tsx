"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FooterSection() {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Scroll reveal animation for text
    gsap.fromTo(textRef.current, 
      { yPercent: 50, scale: 0.8, opacity: 0 },
      { 
        yPercent: 0, 
        scale: 1, 
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      }
    );

    // Subtle parallax on scroll for background
    gsap.to(bgRef.current, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Pure interactivity: Mouse movement tracking
    const xTo = gsap.quickTo(bgRef.current, "x", { duration: 0.8, ease: "power3" });
    const yTo = gsap.quickTo(bgRef.current, "y", { duration: 0.8, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!container.current) return;
      const { left, top, width, height } = container.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.05; // 5% movement multiplier
      const y = (e.clientY - top - height / 2) * 0.05;
      xTo(x);
      yTo(y);
    };

    container.current?.addEventListener("mousemove", handleMouseMove);
    return () => container.current?.removeEventListener("mousemove", handleMouseMove);

  }, { scope: container });

  return (
    <footer ref={container} className="relative w-full h-screen bg-black text-white flex flex-col justify-end items-center pb-8 overflow-hidden z-20">
      
      {/* Interactive Background Image */}
      <div className="absolute inset-0 w-full h-full opacity-60 pointer-events-none overflow-hidden flex items-center justify-center">
        <img 
          ref={bgRef} 
          src="/assets/footer-bg.png" 
          alt="Void Artifact" 
          className="w-[120%] h-[120%] object-cover mix-blend-screen scale-110"
        />
      </div>

      <div className="absolute top-8 w-full px-8 flex justify-between font-mono text-xs uppercase tracking-widest z-10">
        <span>© 2026 OSLR.SYS</span>
        <span>Basado en el Vacío</span>
      </div>
      
      <h2 ref={textRef} className="font-display font-bold text-[13vw] leading-none tracking-tighter uppercase mb-8 z-10 text-outline mix-blend-difference" data-magnetic>
        Hablemos
      </h2>
      
      <div className="flex flex-col md:flex-row gap-4 items-center z-10">
        <a href="https://wa.me/5218331119884" target="_blank" rel="noreferrer" className="px-8 py-4 bg-white text-black font-mono uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors" data-magnetic>
          WhatsApp Directo
        </a>
        <a href="mailto:oscarserafin201@gmail.com" className="px-8 py-4 bg-transparent border border-white text-white font-mono uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors" data-magnetic>
          Enviar Email
        </a>
      </div>
    </footer>
  );
}
