"use client";
import { useEffect, useRef, useState } from "react";

export function AudioPlayer() {
  const audioRef      = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [vol,     setVol]     = useState(0.22);

  useEffect(() => {
    const audio    = new Audio("/assets/musica.mp3");
    audio.loop     = true;
    audio.volume   = vol;
    audioRef.current = audio;

    const tryPlay = () => {
      offAll();
      if (audio.paused) {
        audio.play()
          .then(() => setPlaying(true))
          .catch(() => {/* silently ignore autoplay block */});
      }
    };
    const offAll = () => {
      window.removeEventListener("click",      tryPlay);
      window.removeEventListener("scroll",     tryPlay);
      window.removeEventListener("touchstart", tryPlay);
    };

    window.addEventListener("click",      tryPlay, { once: true });
    window.addEventListener("scroll",     tryPlay, { once: true });
    window.addEventListener("touchstart", tryPlay, { once: true, passive: true });

    return () => { offAll(); audio.pause(); audioRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(console.error); }
  };

  const onVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVol(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div
      className="fixed bottom-7 right-7 z-50 flex items-center gap-3 px-4 py-2.5 glass rounded-full select-none"
      style={{ cursor: "none" }}
      data-magnetic
    >
      {/* Volume slider (visible when playing) */}
      <div
        className="flex items-center overflow-hidden transition-all duration-400"
        style={{ maxWidth: playing ? "78px" : "0px", opacity: playing ? 1 : 0 }}
      >
        <input
          type="range" min={0} max={1} step={0.01}
          value={vol}
          onChange={onVol}
          className="w-[70px]"
          style={{ background: `linear-gradient(to right, #D8BFC5 ${vol * 100}%, rgba(255,255,255,0.08) ${vol * 100}%)` }}
        />
      </div>

      {/* Equalizer bars */}
      <div className="flex items-end gap-[3px] h-[14px] w-[18px] flex-shrink-0" onClick={toggle}>
        {[14, 20, 12, 18].map((h, n) => (
          <div
            key={n}
            className={`flex-1 rounded-full origin-bottom ${playing ? `audio-bar` : ""}`}
            style={{
              height: playing ? `${h}px` : `${[6, 10, 5, 8][n]}px`,
              background: playing ? "#C9C1D9" : "rgba(255,255,255,0.18)",
              animationDelay: `${[0, 0.15, 0.08, 0.27][n]}s`,
            }}
          />
        ))}
      </div>

      {/* Label */}
      <div className="flex flex-col" onClick={toggle}>
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase font-semibold text-white/55">
          {playing ? "TRANSMITIENDO" : "SILENCIADO"}
        </span>
        <span className="font-mono text-[7px] tracking-widest uppercase text-white/20">
          AMBIENTE · {Math.round(vol * 100)}%
        </span>
      </div>

      {/* LED */}
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
        style={{
          background: playing ? "#D8BFC5" : "rgba(255,255,255,0.1)",
          boxShadow:  playing ? "0 0 8px rgba(216,191,197,0.55)" : "none",
        }}
      />
    </div>
  );
}
