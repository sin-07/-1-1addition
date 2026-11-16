"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, Heart, Gift, Cake, BookOpen, ChevronDown } from "lucide-react";
import { birthdayData } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";
import CountdownTimer from "@/components/CountdownTimer";
import { gsap, applyMagneticEffect } from "@/utils/gsapSetup";

interface HeroSectionProps {
  onScrollToCake: () => void;
  onScrollToStory: () => void;
  onScrollToReasons: () => void;
  onScrollToFinal: () => void;
}

export default function HeroSection({
  onScrollToCake,
  onScrollToStory,
  onScrollToReasons,
  onScrollToFinal,
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const bylineRef = useRef<HTMLDivElement | null>(null);

  // Button refs for magnetic attraction
  const btn1Ref = useRef<HTMLButtonElement | null>(null);
  const btn2Ref = useRef<HTMLButtonElement | null>(null);
  const btn3Ref = useRef<HTMLButtonElement | null>(null);
  const btn4Ref = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Staggered cinematic reveal
      tl.from(badgeRef.current, {
        y: -40,
        opacity: 0,
        scale: 0.8,
        duration: 1,
      })
        .from(
          titleRef.current,
          {
            y: 60,
            opacity: 0,
            rotateX: 20,
            duration: 1.2,
          },
          "-=0.6"
        )
        .from(
          bylineRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.7"
        )
        .from(
          subtitleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 1,
          },
          "-=0.6"
        );

      // 3D Parallax effect on mouse move
      const container = containerRef.current;
      if (container) {
        const handleParallax = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(titleRef.current, {
            rotateY: x * 15,
            rotateX: -y * 15,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(badgeRef.current, {
            x: x * 20,
            y: y * 20,
            duration: 0.6,
            ease: "power2.out",
          });
        };

        container.addEventListener("mousemove", handleParallax);
        return () => container.removeEventListener("mousemove", handleParallax);
      }
    }, containerRef);

    // Apply magnetic attraction to action buttons
    const cleanups: Array<() => void> = [];
    if (btn1Ref.current) cleanups.push(applyMagneticEffect(btn1Ref.current, 0.3));
    if (btn2Ref.current) cleanups.push(applyMagneticEffect(btn2Ref.current, 0.3));
    if (btn3Ref.current) cleanups.push(applyMagneticEffect(btn3Ref.current, 0.3));
    if (btn4Ref.current) cleanups.push(applyMagneticEffect(btn4Ref.current, 0.3));

    return () => {
      ctx.revert();
      cleanups.forEach((c) => c());
    };
  }, []);

  const handleHeartClick = () => {
    soundManager.playHeartPop();
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-24 pb-20 overflow-hidden [perspective:1200px]"
    >
      {/* Background radial glow */}
      <div className="absolute w-[360px] sm:w-[700px] h-[360px] sm:h-[500px] rounded-full bg-gradient-to-tr from-pink-600/20 via-purple-600/20 to-amber-400/15 blur-[100px] pointer-events-none -z-10" />

      {/* Chapter 23 Badge */}
      <div
        ref={badgeRef}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel border border-pink-500/30 text-pink-200 text-xs sm:text-sm font-medium tracking-wider mb-4 badge-glow cursor-default transition-shadow"
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: "8s" }} />
        <span>{birthdayData.hero.badge}</span>
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-pulse" />
      </div>

      {/* Centerpiece Spotlight Portrait of Akankshya */}
      <div
        onClick={handleHeartClick}
        className="relative my-4 group cursor-pointer select-none transition-transform duration-500 hover:scale-105"
        title="Tap to send love to Akku ❤️"
      >
        {/* Animated Multi-layer Halo Ring */}
        <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-300 opacity-70 blur-xl group-hover:opacity-100 transition-opacity duration-700 animate-pulse-glow" />
        <div
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 animate-spin"
          style={{ animationDuration: "16s" }}
        />

        {/* Circular Avatar Frame */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#080916] shadow-2xl shadow-pink-500/40 bg-slate-900">
          <Image
            src="/memories/akku-festive-red-smile.jpg"
            alt={birthdayData.recipient.fullName}
            fill
            priority
            sizes="(max-width: 768px) 176px, 192px"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Floating Crown Pill */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#0d0f22]/95 backdrop-blur-md border border-amber-400/50 text-[11px] sm:text-xs text-amber-300 font-serif font-semibold tracking-wide whitespace-nowrap shadow-lg flex items-center gap-1.5 group-hover:border-pink-400 transition-colors">
          <span>👑</span>
          <span>Akankshya • 23</span>
          <Sparkles className="w-3 h-3 text-pink-300" />
        </div>
      </div>

      {/* Main Heading with 3D Tilt */}
      <h1
        ref={titleRef}
        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight max-w-5xl leading-[1.1] mb-4 [transform-style:preserve-3d]"
      >
        <span className="block text-slate-200 text-xl sm:text-3xl md:text-4xl font-light font-sans tracking-widest uppercase mb-2 opacity-90">
          Happy 23rd Birthday,
        </span>
        <span className="text-magic-gradient drop-shadow-sm inline-block">
          {birthdayData.recipient.fullName}
        </span>
        <span
          onClick={handleHeartClick}
          className="inline-block ml-3 text-rose-500 cursor-pointer hover:scale-125 transition-transform select-none"
          title="Send love"
        >
          ❤️
        </span>
      </h1>

      {/* Byline: With love, Aniket */}
      <div
        ref={bylineRef}
        className="text-xl sm:text-2xl font-serif text-amber-200 font-semibold mb-6 flex items-center justify-center gap-2"
      >
        <span>{birthdayData.hero.byline}</span>
      </div>

      {/* Subtitle / Description */}
      <div ref={subtitleRef} className="max-w-2xl mx-auto mb-8 space-y-6">
        <p className="text-slate-300/90 text-sm sm:text-base md:text-lg font-light leading-relaxed">
          {birthdayData.hero.subtitle}
        </p>

        {/* Live Countdown to 17 Nov 2026 */}
        <div className="pt-2">
          <CountdownTimer />
        </div>
      </div>

      {/* Action Buttons with GSAP Magnetic Attraction */}
      <div className="flex flex-wrap items-center justify-center gap-3.5 max-w-2xl w-full mt-4">
        <button
          ref={btn1Ref}
          onClick={onScrollToCake}
          className="flex-1 min-w-[170px] px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-medium text-sm sm:text-base shadow-glow-pink hover:shadow-glow-lg transition-all flex items-center justify-center gap-2"
        >
          <Cake className="w-4 h-4 text-amber-200" />
          <span>23 Birthday Candles</span>
        </button>

        <button
          ref={btn2Ref}
          onClick={onScrollToStory}
          className="flex-1 min-w-[170px] px-6 py-3.5 rounded-full glass-panel border border-white/15 text-slate-200 hover:text-white hover:border-pink-400/40 font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4 text-pink-300" />
          <span>Our Story Timeline</span>
        </button>

        <button
          ref={btn3Ref}
          onClick={onScrollToReasons}
          className="flex-1 min-w-[170px] px-6 py-3.5 rounded-full glass-panel border border-white/15 text-purple-200 hover:text-white hover:border-purple-400/40 font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2"
        >
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <span>23 Reasons I Love You</span>
        </button>

        <button
          ref={btn4Ref}
          onClick={onScrollToFinal}
          className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-panel border border-amber-400/30 text-amber-200 hover:text-amber-100 hover:border-amber-400/60 font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-2"
        >
          <Gift className="w-4 h-4 text-amber-300" />
          <span>Aniket&apos;s Final Surprise</span>
        </button>
      </div>

      {/* Scroll Down Hint */}
      <div
        onClick={onScrollToCake}
        className="absolute bottom-6 flex flex-col items-center gap-1 cursor-pointer text-slate-400 hover:text-pink-300 transition-colors animate-bounce"
      >
        <span className="text-[11px] tracking-widest uppercase">Explore Your Gift</span>
        <ChevronDown className="w-4 h-4" />
      </div>
    </section>
  );
}
