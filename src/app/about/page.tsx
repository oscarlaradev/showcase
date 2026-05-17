"use client";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-40 px-8 max-w-4xl mx-auto">
      <h1 className="font-display text-6xl md:text-9xl font-bold uppercase tracking-tighter text-outline mb-16 leading-none">
        Más Allá<br/>Del Código
      </h1>
      
      <div className="font-mono text-xl md:text-2xl text-gray-400 leading-relaxed space-y-8">
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

      <div className="mt-32 border-t border-white/10 pt-16 grid grid-cols-1 md:grid-cols-2 gap-16 pb-32">
        <div>
          <h3 className="font-display text-3xl font-bold uppercase mb-6">Stack & Lenguajes</h3>
          <ul className="font-mono text-gray-400 space-y-2">
            <li>Next.js / React / GSAP</li>
            <li>Python / Ciencia de Datos / IA</li>
            <li>C++ / C# / Node.js</li>
            <li>MySQL / Bases de Datos</li>
            <li>Figma / UX & UI</li>
          </ul>
        </div>
        <div>
          <h3 className="font-display text-3xl font-bold uppercase mb-6">Contacto Directo</h3>
          <ul className="font-mono text-gray-400 space-y-4">
            <li>
              <a href="https://wa.me/5218331119884" target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors block" data-magnetic>
                [ Iniciar WhatsApp ] <br/><span className="text-sm text-gray-500">833-111-9884</span>
              </a>
            </li>
            <li>
              <a href="https://wa.me/5218331119884?text=Hola%20Oscar%2C%20quiero%20agregarte%20a%20mis%20contactos" target="_blank" rel="noreferrer" className="hover:text-white transition-colors block text-sm" data-magnetic>
                + Agregar a Contactos
              </a>
            </li>
            <li className="pt-4 border-t border-white/10">
              <a href="mailto:oscarserafin201@gmail.com" className="hover:text-white transition-colors block" data-magnetic>
                oscarserafin201@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
