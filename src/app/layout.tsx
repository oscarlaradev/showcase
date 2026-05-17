import type { Metadata } from "next";
import { Inter, Space_Grotesk, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ReactLenis } from 'lenis/react';
import { CustomCursor } from "@/components/CustomCursor";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });

export const metadata: Metadata = {
  title: "Oscar Lara | Desarrollador Front-End & Científico de Datos",
  description: "Portafolio de Oscar Lara, desarrollador Front-End hiper-creativo de 19 años. Especializado en experiencias web inmersivas, WebGL, Inteligencia Artificial, Python y React. Creador de páginas web premium para negocios.",
  keywords: ["Oscar Lara", "desarrollo web", "páginas web premium", "ciencia de datos", "inteligencia artificial", "python", "react", "nextjs", "crear sitio web para negocio", "diseño web profesional", "UAT", "desarrollador frontend"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} ${robotoMono.variable}`}>
      <body className="antialiased bg-black selection:bg-white selection:text-black">
        <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
          <CustomCursor />
          {/* Navigation */}
          <nav className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference">
            <div className="font-display font-bold text-2xl tracking-tighter uppercase" data-magnetic>
              <Link href="/">OSLR.SYS</Link>
            </div>
            <div className="flex gap-8 font-sans text-sm uppercase tracking-widest items-center">
              <Link href="/#work" data-magnetic>Portafolio</Link>
              <Link href="/about" data-magnetic>Nosotros</Link>
              <a href="https://wa.me/5218331119884" target="_blank" rel="noreferrer" data-magnetic className="text-green-400 font-bold hidden md:block">WhatsApp</a>
            </div>
          </nav>
          
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
