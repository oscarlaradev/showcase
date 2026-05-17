"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroSection() {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Parallax effect on massive text
    gsap.to(textRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden z-10">
      <div className="relative z-10 text-center flex flex-col items-center">
        <h1 ref={textRef} className="text-massive text-outline leading-none select-none">
          OSLR
        </h1>
        <p className="mt-8 font-mono text-gray-400 max-w-lg uppercase tracking-widest text-sm leading-relaxed">
          Ingeniería Front-End & Ciencia de Datos. <br /> Construyendo plataformas con IA y diseño de élite para negocios que exigen lo extraordinario.
        </p>
      </div>
    </section>
  );
}
