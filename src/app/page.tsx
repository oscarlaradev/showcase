import { WebGLBackground } from "@/components/WebGLBackground";
import { HeroSection } from "@/components/HeroSection";
import { ShowcaseSection } from "@/components/ShowcaseSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { FooterSection } from "@/components/FooterSection";

export default function Home() {
  return (
    <main className="relative">
      <WebGLBackground />
      <HeroSection />
      <ExpertiseSection />
      <ShowcaseSection />
      <FooterSection />
    </main>
  );
}
