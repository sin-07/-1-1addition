"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Gift, Sparkles, Heart, Stars, RotateCcw, X } from "lucide-react";
import { birthdayData } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";
import { gsap } from "@/utils/gsapSetup";

interface FinalSurpriseProps {
  id?: string;
  onReplay: () => void;
}

export default function FinalSurprise({ id = "final-section", onReplay }: FinalSurpriseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const boxLidRef = useRef<HTMLDivElement | null>(null);
  const boxBodyRef = useRef<HTMLDivElement | null>(null);

  const handleOpenBox = () => {
    if (isOpen) {
      setShowModal(true);
      return;
    }

    setIsOpen(true);
    soundManager.playUnboxFanfare();

    // GSAP 3D Lid Launch Animation
    if (boxLidRef.current) {
      gsap.to(boxLidRef.current, {
        y: -160,
        rotation: -25,
        opacity: 0,
        scale: 1.15,
        duration: 0.9,
        ease: "power3.out",
      });
    }

    if (boxBodyRef.current) {
      gsap.to(boxBodyRef.current, {
        scale: 1.1,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
    }

    // Explosive multi-stage confetti
    const count = 250;
    const defaults = { origin: { y: 0.65 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      try {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      } catch (e) {}
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ["#fbbf24", "#f59e0b", "#ffffff"] });
    fire(0.2, { spread: 60, colors: ["#f472b6", "#fb7185", "#ec4899"] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ["#c084fc", "#a855f7", "#ffffff"] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ["#fde68a", "#fda4af"] });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ["#ffffff", "#f43f5e"] });

    setTimeout(() => {
      setShowModal(true);
    }, 700);
  };

  // Continuous Fireworks Canvas Engine
  useEffect(() => {
    if (!showModal) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    interface FireworkParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
      decay: number;
    }

    const particles: FireworkParticle[] = [];
    const colors = ["#fbbf24", "#f472b6", "#c084fc", "#38bdf8", "#4ade80", "#fb7185", "#ffffff"];

    const createExplosion = (x: number, y: number) => {
      soundManager.playFireworkPop();
      const count = 45;
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: Math.random() > 0.3 ? baseColor : "#ffffff",
          size: Math.random() * 2.5 + 1.5,
          decay: Math.random() * 0.015 + 0.012,
        });
      }
    };

    const explosionInterval = setInterval(() => {
      createExplosion(
        Math.random() * width * 0.8 + width * 0.1,
        Math.random() * height * 0.5 + height * 0.1
      );
    }, 850);

    createExplosion(width / 2, height * 0.3);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      clearInterval(explosionInterval);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [showModal]);

  return (
    <section id={id} className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-amber-300 text-xs font-medium uppercase tracking-widest mb-4 badge-glow">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>The Final Chapter</span>
      </div>

      <h2 className="text-3xl sm:text-6xl font-serif text-white mb-4">
        {birthdayData.finalSurprise.teaserTitle}
      </h2>
      <p className="text-slate-300/80 text-sm sm:text-base max-w-xl mx-auto mb-12">
        {birthdayData.finalSurprise.teaserSubtitle}
      </p>

      {/* Royal 3D Gift Box with GSAP Animated Lid */}
      <div className="relative flex flex-col items-center justify-center my-6">
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-amber-500/25 via-pink-500/25 to-purple-600/25 blur-3xl pointer-events-none animate-pulse-glow" />

        <div
          onClick={handleOpenBox}
          className="relative cursor-pointer group p-8 transition-transform duration-300 transform hover:scale-105 select-none"
        >
          <div
            ref={boxBodyRef}
            className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-3xl bg-gradient-to-br from-[#2a1745] via-[#1c1033] to-[#110722] border-2 border-amber-400/50 shadow-2xl shadow-amber-500/20 flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Ribbons */}
            <div className="absolute top-0 bottom-0 w-9 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 shadow-md opacity-90" />
            <div className="absolute left-0 right-0 h-9 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 shadow-md opacity-90" />

            {/* Top Bow / Lid with GSAP Ref */}
            <div ref={boxLidRef} className="absolute -top-3 flex items-center justify-center z-20">
              <div className="w-12 h-12 rounded-full bg-amber-400 border-2 border-amber-100 flex items-center justify-center shadow-lg shadow-amber-500/50">
                <Heart className="w-6 h-6 text-rose-600 fill-rose-600 animate-pulse" />
              </div>
            </div>

            {/* Inner Icon */}
            <div className="relative z-10 w-24 h-24 rounded-2xl bg-gradient-to-tr from-pink-600 to-amber-500 flex items-center justify-center shadow-xl transform group-hover:rotate-6 transition-transform">
              <Gift className="w-12 h-12 text-white" />
            </div>

            <div className="relative z-10 mt-4 text-xs font-bold tracking-wider text-amber-200 uppercase flex items-center gap-1.5">
              <span>{isOpen ? "Open Again" : "Tap to Unlock"}</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleOpenBox}
          className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white font-semibold text-sm sm:text-base shadow-glow-gold hover:shadow-glow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
        >
          <Gift className="w-5 h-5 text-amber-200" />
          <span>{birthdayData.finalSurprise.boxPrompt}</span>
        </button>
      </div>

      {/* Full-Screen Grand Finale Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fadeIn overflow-y-auto">
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 w-full h-full" />

          <div className="relative z-10 w-full max-w-2xl p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#1b102f]/95 via-[#180d2b]/95 to-[#0e071c]/95 border-2 border-amber-400/50 shadow-2xl shadow-pink-500/30 text-center animate-scaleUp my-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center mb-6 shadow-lg shadow-amber-400/30 animate-bounce">
              <Stars className="w-8 h-8 text-white" />
            </div>

            <span className="text-xs text-amber-300 uppercase tracking-widest font-semibold block mb-2">
              From Aniket To Akankshya
            </span>

            <h3 className="text-2xl sm:text-4xl font-serif text-white font-bold mb-4">
              {birthdayData.finalSurprise.headline}
            </h3>

            {/* Special Photo Highlight */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[16/10] max-h-[50vh] rounded-2xl overflow-hidden mb-6 border-2 border-amber-400/50 shadow-2xl shadow-pink-500/30">
              <Image
                src="/memories/akku-temple-grace.jpg"
                alt="Akankshya & Aniket Forever"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-4">
                <span className="text-amber-200 font-serif text-xl sm:text-2xl drop-shadow-md">
                  Aniket ❤️ Akankshya • Destined Forever
                </span>
              </div>
            </div>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 font-light">
              {birthdayData.finalSurprise.message}
            </p>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-amber-500/15 border border-amber-300/30 mb-8">
              <h4 className="text-xl sm:text-2xl font-serif text-amber-200 font-semibold mb-2">
                {birthdayData.finalSurprise.grandCelebrationWish}
              </h4>
              <p className="text-xs text-pink-300 italic">
                {birthdayData.finalSurprise.signOff}
              </p>
            </div>

            {/* Modal Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  soundManager.playSparkle();
                  try {
                    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
                  } catch (e) {}
                }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs sm:text-sm font-medium shadow-glow-pink hover:scale-105 transition-transform flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>More Fireworks!</span>
              </button>

              <button
                onClick={() => {
                  setShowModal(false);
                  onReplay();
                }}
                className="px-6 py-2.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 hover:bg-amber-500/30 text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4 text-amber-300" />
                <span>🔄 Replay Surprise</span>
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-full glass-panel border border-white/15 text-slate-300 hover:text-white text-xs sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
