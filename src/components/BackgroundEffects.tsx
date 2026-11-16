"use client";

import React, { useEffect, useRef } from "react";

export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Star / Sparkle particles
    const numStars = Math.min(65, Math.floor((width * height) / 18000));
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      pulseSpeed: number;
      color: string;
      vy: number;
    }> = [];

    const colors = ["#fbcfe8", "#fde68a", "#c084fc", "#93c5fd", "#ffffff"];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.7 + 0.2,
        pulseSpeed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        color: colors[Math.floor(Math.random() * colors.length)],
        vy: -(Math.random() * 0.25 + 0.08), // Gentle upward drift
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.opacity += star.pulseSpeed;
        if (star.opacity > 0.95 || star.opacity < 0.15) {
          star.pulseSpeed = -star.pulseSpeed;
        }

        star.y += star.vy;
        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, star.opacity));
        ctx.shadowBlur = star.size * 3;
        ctx.shadowColor = star.color;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Starfield Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Atmospheric romantic gradient glow orbs */}
      <div className="absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-pink-600/10 blur-[130px] animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-purple-600/12 blur-[150px] animate-float-slow" />
      <div className="absolute bottom-20 left-1/4 w-[480px] h-[480px] rounded-full bg-amber-500/8 blur-[140px] animate-gentle-float" />

      {/* Subtle vignette layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,7,19,0.75)_100%)]" />
    </div>
  );
}
