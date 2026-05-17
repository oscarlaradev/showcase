"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ExpertiseSection() {
  const container = useRef<HTMLElement>(null);
  const leftCol = useRef<HTMLDivElement>(null);
  const rightCol = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pin the left column while right column scrolls
    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "bottom bottom",
      pin: leftCol.current,
    });

    // Fade in right column items
    const items = gsap.utils.toArray(".expertise-item");
    items.forEach((item: any) => {
      gsap.fromTo(item, 
        { opacity: 0.1, x: 50 },
        { 
          opacity: 1, 
          x: 0,
          scrollTrigger: {
            trigger: item,
            start: "top center",
            end: "bottom center",
            scrub: true
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full z-10 bg-black text-white px-8 py-32 flex flex-col md:flex-row gap-16 min-h-[200vh]">
      <div ref={leftCol} className="w-full md:w-1/2 h-screen flex flex-col justify-center">
        <h2 className="font-display text-5xl md:text-7xl font-bold uppercase tracking-tighter">
          Nuestra<br/>Especialidad
        </h2>
        <p className="font-mono mt-8 text-gray-400 max-w-md uppercase tracking-widest text-sm leading-relaxed">
          No hacemos simples páginas. Arquitectamos plataformas de élite orientadas a conversiones, usando el mismo stack tecnológico que las empresas multimillonarias.
        </p>
      </div>

      <div ref={rightCol} className="w-full md:w-1/2 flex flex-col gap-32 pt-[50vh] pb-[50vh]">
        <div className="expertise-item">
          <h3 className="font-display text-4xl font-bold uppercase border-b border-white/20 pb-4">01. Páginas para Negocios</h3>
          <p className="font-mono text-gray-400 mt-4 leading-relaxed">Soluciones digitales completas para empresas. Desde Landing Pages ultra rápidas hasta E-Commerce seguros. Atrae clientes con una presencia impecable.</p>
        </div>
        <div className="expertise-item">
          <h3 className="font-display text-4xl font-bold uppercase border-b border-white/20 pb-4">02. Experiencias WebGL</h3>
          <p className="font-mono text-gray-400 mt-4 leading-relaxed">Integraciones 3D, entornos inmersivos y matemáticas visuales. Diferénciate de la competencia con sitios web que parecen del futuro.</p>
        </div>
        <div className="expertise-item">
          <h3 className="font-display text-4xl font-bold uppercase border-b border-white/20 pb-4">03. Optimización SEO</h3>
          <p className="font-mono text-gray-400 mt-4 leading-relaxed">Posicionamiento implacable. Arquitectura diseñada para que los clientes te encuentren en Google antes que a nadie.</p>
        </div>
      </div>
    </section>
  );
}
