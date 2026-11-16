"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/utils/gsapSetup";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [trails, setTrails] = useState<Array<{ id: number; x: number; y: number; char: string }>>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
    ) {
      setIsTouchDevice(true);
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Use GSAP quickTo for ultra-performant, 60fps+ cursor tracking
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });

    const xToRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const chars = ["✨", "❤️", "🌸", "⭐", "💖"];
    let lastTrailTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);

      const now = Date.now();
      if (now - lastTrailTime > 140) {
        lastTrailTime = now;
        const newTrail = {
          id: now,
          x: e.clientX,
          y: e.clientY,
          char: chars[Math.floor(Math.random() * chars.length)],
        };
        setTrails((prev) => [...prev.slice(-6), newTrail]);

        setTimeout(() => {
          setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
        }, 700);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Halo */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-pink-400/50 bg-pink-500/10 pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-glow-pink"
      />
      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-rose-400 pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-sm shadow-rose-300"
      />

      {/* Floating Sparkle Trail */}
      {trails.map((t) => (
        <span
          key={t.id}
          className="fixed text-xs pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-floatUp"
          style={{ left: t.x, top: t.y }}
        >
          {t.char}
        </span>
      ))}
    </div>
  );
}
