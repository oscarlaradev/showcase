"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Project = {
  id: string;
  title: string;
  role: string;
  image: string;
  url?: string;
};

export function ShowcaseSection() {
  const container = useRef<HTMLElement>(null);
  const scrollWrapper = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  // Fetch projects from our API
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error fetching projects", err));
  }, []);

  useGSAP(() => {
    if (!projects.length) return;
    
    const panels = gsap.utils.toArray(".showcase-panel");
    
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1,
        snap: 1 / (panels.length - 1),
        end: () => "+=" + (scrollWrapper.current?.offsetWidth || 0)
      }
    });
  }, { scope: container, dependencies: [projects] });

  return (
    <section id="work" ref={container} className="relative w-full h-screen overflow-hidden z-10 bg-black">
      <div ref={scrollWrapper} className="flex h-full w-[300vw]">
        {projects.length > 0 ? projects.map((p, i) => (
          <div key={p.id} className="showcase-panel w-screen h-full flex flex-col justify-center items-center relative flex-shrink-0">
            <div className="absolute inset-0 w-full h-full opacity-40">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-center mix-blend-difference">
              <h2 className="font-display font-bold text-[8vw] leading-none uppercase tracking-tighter text-white">
                {p.title}
              </h2>
              <p className="font-mono text-xl tracking-widest uppercase mt-4 text-gray-300">
                {p.role}
              </p>
              {p.url && p.url !== "#" && (
                <div className="mt-8">
                  <a href={p.url} target="_blank" rel="noreferrer" className="px-6 py-3 border border-white text-white font-mono uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors" data-magnetic>
                    Ver Proyecto
                  </a>
                </div>
              )}
            </div>
          </div>
        )) : (
          <div className="w-screen h-full flex items-center justify-center font-mono">CARGANDO EL VACÍO...</div>
        )}
      </div>
    </section>
  );
}
