"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function AboutPage() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Mount stagger animation
    gsap.fromTo(".about-fade-in",
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: "power3.out" 
      }
    );

    // Glowing line reveal
    gsap.fromTo(".about-reveal-line",
      { scaleX: 0 },
      { 
        scaleX: 1, 
        duration: 1.5, 
        ease: "power3.inOut", 
        delay: 0.5 
      }
    );
  }, { scope: container });

  return (
    <main ref={container} className="relative min-h-screen bg-black text-white pt-40 px-8 pb-32 overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none z-0" />
      
      {/* Cinematic Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#D8BFC5]/5 filter blur-[120px] pointer-events-none z-0" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Dossier Heading */}
        <div className="about-fade-in flex flex-col mb-16">
          <div className="flex items-center gap-3 font-mono text-[9px] text-[#D8BFC5] tracking-[0.3em] uppercase mb-4 text-glow">
            <span className="w-1.5 h-1.5 rounded-full bg-dusty-rose animate-ping" />
            <span>DOSSIER // ACCESS_GRANTED // ID-2026</span>
          </div>
          <h1 className="font-display text-6xl md:text-9xl font-bold uppercase tracking-tighter text-outline leading-none select-none hover:text-white transition-colors duration-500">
            Más Allá<br/>Del Código
          </h1>
        </div>

        {/* Dynamic Dossier Text Column */}
        <div className="about-fade-in font-mono text-base md:text-lg text-white/70 leading-relaxed space-y-8 max-w-3xl border-l-2 border-white/5 pl-6 md:pl-8 py-2 relative">
          <div className="absolute top-0 left-[-2px] w-[2px] h-20 bg-soft-mauve text-glow" />
          <p>
            Soy Oscar Lara, un desarrollador Front-End de 19 años apasionado por empujar los límites de lo posible en la web.
          </p>
          <p>
            Estudiante de Ingeniería en la Universidad Autónoma de Tamaulipas (UAT), con un enfoque en Ciencia de Datos e Inteligencia Artificial, fusiono la lógica pura de la programación con estéticas brutalistas y ultra-creativas.
          </p>
          <p>
            Arquitecto vacíos digitales, mezclando tecnologías vanguardistas para construir arte interactivo y productos de altísimo rendimiento para marcas que exigen la excelencia.
          </p>
        </div>

        {/* Decorative Glowing Rules */}
        <div className="about-reveal-line w-full h-[1px] bg-white/10 my-24 origin-left transform scale-x-0" />

        {/* Grid Stack & Contacts Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pb-12">
          {/* Tech stack card */}
          <div className="about-fade-in p-8 border border-white/5 bg-white/3 glass-blur backdrop-blur-md rounded-2xl flex flex-col gap-6 relative transition-all duration-300 hover:border-dusty-rose/20">
            <div className="absolute top-0 left-6 h-[2px] w-20 bg-soft-mauve text-glow" />
            <h3 className="font-display text-2xl font-extrabold uppercase text-white tracking-tight">Stack & Lenguajes</h3>
            <ul className="font-mono text-xs text-white/50 space-y-3.5 pl-1.5">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-soft-mauve/60 animate-pulse text-glow-green" />
                <span>Next.js / React / GSAP</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-soft-mauve/60 animate-pulse text-glow-green" />
                <span>Python / Ciencia de Datos / IA</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-soft-mauve/60 animate-pulse text-glow-green" />
                <span>C++ / C# / Node.js</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-soft-mauve/60 animate-pulse text-glow-green" />
                <span>MySQL / Bases de Datos</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-soft-mauve/60 animate-pulse text-glow-green" />
                <span>Figma / UX & UI Design</span>
              </li>
            </ul>
          </div>

          {/* Contact deck card */}
          <div className="about-fade-in p-8 border border-white/5 bg-white/3 glass-blur backdrop-blur-md rounded-2xl flex flex-col gap-6 relative transition-all duration-300 hover:border-dusty-rose/20">
            <div className="absolute top-0 left-6 h-[2px] w-20 bg-soft-mauve text-glow" />
            <h3 className="font-display text-2xl font-extrabold uppercase text-white tracking-tight">Contacto Directo</h3>
            <ul className="font-mono text-xs text-white/50 space-y-6">
              <li>
                <a href="https://wa.me/5218331119884" target="_blank" rel="noreferrer" className="hover:text-dusty-rose transition-colors block group" data-magnetic>
                  <span className="text-white font-bold tracking-wider group-hover:text-dusty-rose transition-colors">[ Iniciar WhatsApp ]</span> 
                  <span className="text-[10px] text-white/30 block mt-1">833-111-9884</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/5218331119884?text=Hola%20Oscar%2C%20quiero%20agregarte%20a%20mis%20contactos" target="_blank" rel="noreferrer" className="hover:text-dusty-rose transition-colors block text-[10px] border border-white/10 px-3 py-1.5 rounded-lg w-max bg-white/5" data-magnetic>
                  + Agregar a Contactos
                </a>
              </li>
              <li className="pt-4 border-t border-white/5">
                <a href="mailto:oscarserafin201@gmail.com" className="hover:text-dusty-rose transition-colors block tracking-wide" data-magnetic>
                  oscarserafin201@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

