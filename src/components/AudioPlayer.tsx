"use client";
import { useEffect, useRef, useState } from "react";

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Create audio instance exactly once on mount
    const audio = new Audio("/assets/musica.mp3");
    audio.loop = true;
    audio.volume = 0.25; // Clean, atmospheric ambient volume level
    audioRef.current = audio;

    // Autoplay on first user interaction to bypass browser restrictions
    const startAudioOnInteraction = () => {
      // Remove listeners on the very first interaction event
      cleanupListeners();

      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch((err) => {
            console.log("Autoplay blocked by browser policy, waiting for direct user click.", err);
          });
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", startAudioOnInteraction);
      window.removeEventListener("scroll", startAudioOnInteraction);
      window.removeEventListener("touchstart", startAudioOnInteraction);
    };

    window.addEventListener("click", startAudioOnInteraction);
    window.addEventListener("scroll", startAudioOnInteraction);
    window.addEventListener("touchstart", startAudioOnInteraction);

    return () => {
      cleanupListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => console.error("Error playing background music:", err));
    }
  };

  return (
    <>
      <div 
        onClick={togglePlay}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-4 py-3 bg-black/60 border border-white/10 backdrop-blur-md rounded-full cursor-pointer hover:border-white/30 hover:scale-105 transition-all select-none"
        style={{ cursor: "none" }} /* custom cursor compatibility */
      >
        {/* Equalizer Visualizer */}
        <div className="flex items-end gap-[3px] h-3 w-5">
          <div className={`w-[2px] bg-white rounded-full transition-all duration-300 ${isPlaying ? 'animate-bar-1' : 'h-1'}`} />
          <div className={`w-[2px] bg-white rounded-full transition-all duration-300 ${isPlaying ? 'animate-bar-2' : 'h-[6px]'}`} />
          <div className={`w-[2px] bg-white rounded-full transition-all duration-300 ${isPlaying ? 'animate-bar-3' : 'h-[3px]'}`} />
          <div className={`w-[2px] bg-white rounded-full transition-all duration-300 ${isPlaying ? 'animate-bar-4' : 'h-[8px]'}`} />
        </div>

        {/* Text Toggle */}
        <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-white font-semibold">
          {isPlaying ? "SOUND ON" : "SOUND OFF"}
        </span>
      </div>

      <style>{`
        @keyframes bounceBar {
          0%, 100% { height: 3px; }
          50% { height: 14px; }
        }
        .animate-bar-1 { animation: bounceBar 0.8s ease-in-out infinite; }
        .animate-bar-2 { animation: bounceBar 0.5s ease-in-out infinite 0.2s; }
        .animate-bar-3 { animation: bounceBar 0.9s ease-in-out infinite 0.1s; }
        .animate-bar-4 { animation: bounceBar 0.6s ease-in-out infinite 0.3s; }
      `}</style>
    </>
  );
}
