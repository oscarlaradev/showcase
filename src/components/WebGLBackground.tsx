"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";

/* ─────────────────────────────────────────────────────────────
   FULL-PAGE STARFIELD + NEBULA DUST
   • Extends across all scroll height (not just viewport)
   • Layers: scattered stars + denser arm bands + soft nebula
   • Mouse parallax with very gentle damping
───────────────────────────────────────────────────────────── */

function Starfield() {
  const starsRef  = useRef<THREE.Points>(null);
  const nebulaRef = useRef<THREE.Points>(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  // Soft circular particle texture
  const tex = useMemo(() => {
    if (typeof window === "undefined") return null;
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0,    "rgba(255,255,255,1)");
    g.addColorStop(0.15, "rgba(255,255,255,0.9)");
    g.addColorStop(0.5,  "rgba(255,255,255,0.25)");
    g.addColorStop(1,    "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  // ── Stars: 6 000 points spread across a wide 3D volume ──
  const [starPos, starCol] = useMemo(() => {
    const N   = 6000;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);

    const palA = new THREE.Color("#D9D5E8"); // pearl lavender
    const palB = new THREE.Color("#D8BFC5"); // dusty rose
    const palC = new THREE.Color("#ffffff"); // bright white

    for (let i = 0; i < N; i++) {
      // Wide box distribution: X [-30,30], Y [-60,60], Z [-20,-2]
      // Y is extra tall so stars cover the full scroll height
      pos[i*3]   = (Math.random() - 0.5) * 60;
      pos[i*3+1] = (Math.random() - 0.5) * 120;
      pos[i*3+2] = -(Math.random() * 18 + 2);

      // Color: mostly white, some tinted
      const r = Math.random();
      const c = r < 0.55 ? palC : (r < 0.78 ? palA : palB);
      // Slight variation per star
      col[i*3]   = Math.min(1, c.r + (Math.random() - 0.5) * 0.15);
      col[i*3+1] = Math.min(1, c.g + (Math.random() - 0.5) * 0.15);
      col[i*3+2] = Math.min(1, c.b + (Math.random() - 0.5) * 0.15);
    }
    return [pos, col];
  }, []);

  // ── Nebula dust: 2 500 larger, dimmer particles ──────────
  const [nebPos, nebCol] = useMemo(() => {
    const N   = 2500;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);

    for (let i = 0; i < N; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r     = Math.pow(Math.random(), 0.6) * 28;
      pos[i*3]   = Math.cos(theta) * r;
      pos[i*3+1] = (Math.random() - 0.5) * 110;
      pos[i*3+2] = -(Math.random() * 14 + 6);

      // Soft rose/mauve nebula tones
      const mix = Math.random();
      col[i*3]   = 0.85 + mix * 0.15;   // R
      col[i*3+1] = 0.75 + mix * 0.1;    // G
      col[i*3+2] = 0.77 + mix * 0.2;    // B
    }
    return [pos, col];
  }, []);

  // Mouse tracking (very gentle — just 0.4 max offset)
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 0.4;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    // Very gentle mouse parallax (lerp factor 0.018)
    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, mouse.current.x, 0.018);
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, mouse.current.y, 0.018);

    if (starsRef.current) {
      // Slow drift rotation
      starsRef.current.rotation.z += delta * 0.006;
      // Very subtle mouse tilt
      starsRef.current.rotation.x = THREE.MathUtils.lerp(starsRef.current.rotation.x, smoothMouse.current.y * 0.12, 0.02);
      starsRef.current.rotation.y = THREE.MathUtils.lerp(starsRef.current.rotation.y, smoothMouse.current.x * 0.12, 0.02);
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.z += delta * 0.003;
      nebulaRef.current.rotation.x = starsRef.current?.rotation.x ?? 0;
      nebulaRef.current.rotation.y = starsRef.current?.rotation.y ?? 0;
    }
  });

  return (
    <>
      {/* Stars layer */}
      <points ref={starsRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[starPos, 3]} />
          <bufferAttribute attach="attributes-color"    args={[starCol, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          map={tex ?? undefined}
        />
      </points>

      {/* Nebula dust layer */}
      <points ref={nebulaRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nebPos, 3]} />
          <bufferAttribute attach="attributes-color"    args={[nebCol, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.22}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          map={tex ?? undefined}
        />
      </points>
    </>
  );
}

export function WebGLBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 58 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: false }}
      >
        <color attach="background" args={["#080808"]} />
        <Starfield />
      </Canvas>
    </div>
  );
}
