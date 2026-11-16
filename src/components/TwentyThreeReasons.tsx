"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Heart,
  Eye,
  HeartHandshake,
  Compass,
  Flame,
  Search,
  Mic,
  Coffee,
  Shield,
  Crown,
  Gift,
  Smile,
  Lock,
  Sun,
  Gem,
  Music,
  Hand,
  TrendingUp,
  Moon,
  Award,
  Users,
  Star,
  RotateCw,
} from "lucide-react";
import { birthdayData, ReasonItem } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";
import { gsap, ScrollTrigger } from "@/utils/gsapSetup";

interface TwentyThreeReasonsProps {
  id?: string;
}

const iconMap: Record<string, any> = {
  Sparkles,
  Eye,
  HeartHandshake,
  Heart,
  Compass,
  Flame,
  Search,
  Mic,
  Coffee,
  Shield,
  Crown,
  Gift,
  Smile,
  Lock,
  Sun,
  Gem,
  Music,
  Hand,
  TrendingUp,
  Moon,
  Award,
  Users,
  Star,
};

export default function TwentyThreeReasons({ id = "reasons-section" }: TwentyThreeReasonsProps) {
  const reasons = birthdayData.twentyThreeReasons;
  const [flippedNumbers, setFlippedNumbers] = useState<Set<number>>(new Set());
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Cascade Wave entrance with ScrollTrigger
      gsap.from(cardRefs.current, {
        y: 80,
        opacity: 0,
        rotationX: 35,
        stagger: 0.04,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  const toggleFlip = (num: number) => {
    soundManager.playChime(659.25, 0.35);
    setFlippedNumbers((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  const flipAll = () => {
    soundManager.playSparkle();
    if (flippedNumbers.size === reasons.length) {
      setFlippedNumbers(new Set());
    } else {
      setFlippedNumbers(new Set(reasons.map((r) => r.number)));
    }
  };

  return (
    <section id={id} className="relative py-28 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-pink-400/20 text-pink-300 text-xs font-medium uppercase tracking-widest mb-4">
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          <span>One For Every Year of Your Life</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4">
          23 Reasons Why You Are So Deeply Loved
        </h2>
        <p className="text-slate-300/80 text-sm sm:text-base mb-6">
          I could list a million reasons, but here are twenty-three heartfelt truths celebrating every single year of your existence.
        </p>

        <button
          onClick={flipAll}
          className="px-5 py-2 rounded-full glass-panel border border-pink-400/30 text-pink-200 hover:text-white text-xs font-medium transition-all hover:bg-pink-500/20 inline-flex items-center gap-2"
        >
          <RotateCw className="w-3.5 h-3.5 text-pink-300" />
          <span>{flippedNumbers.size === reasons.length ? "Flip All to Front" : "Flip All Cards"}</span>
        </button>
      </div>

      {/* Grid of 23 Interactive Cards with GSAP Wave */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {reasons.map((reason: ReasonItem, index: number) => {
          const Icon = iconMap[reason.iconName] || Heart;
          const isFlipped = flippedNumbers.has(reason.number);

          return (
            <div
              key={reason.number}
              ref={(el) => {
                if (el) cardRefs.current[index] = el;
              }}
              onClick={() => toggleFlip(reason.number)}
              className="relative h-64 cursor-pointer [perspective:1000px] select-none group"
            >
              <div
                className={`relative w-full h-full duration-500 [transform-style:preserve-3d] transition-transform ${
                  isFlipped ? "[transform:rotateY(180deg)]" : ""
                }`}
              >
                {/* FRONT FACE */}
                <div className="absolute inset-0 [backface-visibility:hidden] p-5 rounded-3xl glass-panel border border-white/10 hover:border-pink-400/40 transition-all flex flex-col justify-between shadow-lg group-hover:shadow-glow-pink">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300 font-mono text-xs font-bold flex items-center justify-center">
                      #{reason.number}
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 flex items-center justify-center text-pink-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-amber-300/80 font-medium block mb-1">
                      {reason.category}
                    </span>
                    <h3 className="text-base font-serif font-bold text-white group-hover:text-pink-300 transition-colors leading-snug">
                      {reason.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-white/5">
                    <span>Tap to reveal note</span>
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400/50" />
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-5 rounded-3xl bg-gradient-to-br from-[#1c1130] via-[#24133b] to-[#140b24] border border-pink-400/40 flex flex-col justify-between shadow-glow-purple">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-pink-300 uppercase tracking-widest font-semibold">
                      Reason #{reason.number}
                    </span>
                    <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                  </div>

                  <div className="my-auto text-center">
                    <p className="text-white font-serif text-sm italic leading-relaxed">
                      &ldquo;{reason.description}&rdquo;
                    </p>
                  </div>

                  <div className="text-center text-[10px] text-slate-400">
                    With all my love, Vicky ❤️
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
