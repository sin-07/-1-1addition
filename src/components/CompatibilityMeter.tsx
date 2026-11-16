"use client";

import React, { useState, useEffect, useRef } from "react";
import { Heart, Sparkles, Activity, Award } from "lucide-react";
import { birthdayData } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";
import { gsap, ScrollTrigger } from "@/utils/gsapSetup";

interface CompatibilityMeterProps {
  id?: string;
}

export default function CompatibilityMeter({ id = "compatibility-section" }: CompatibilityMeterProps) {
  const comp = birthdayData.compatibility;
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Counter animation
      const scoreObj = { val: 0 };

      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(scoreObj, {
            val: 100,
            duration: 1.8,
            ease: "power2.out",
            onUpdate: () => {
              setDisplayScore(Math.round(scoreObj.val));
            },
          });

          // Animate progress bars
          gsap.from(".compat-bar", {
            width: "0%",
            duration: 1.5,
            stagger: 0.1,
            ease: "elastic.out(1, 0.4)",
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePulse = () => {
    soundManager.playSparkle();
  };

  return (
    <section ref={sectionRef} id={id} className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/20 text-rose-300 text-xs font-medium uppercase tracking-widest mb-4">
        <Activity className="w-3.5 h-3.5 text-rose-400" />
        <span>Cosmic Alignment</span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4">
        Vicky & Akankshya Compatibility
      </h2>
      <p className="text-slate-300/80 text-sm sm:text-base max-w-xl mx-auto mb-12">
        {comp.summary}
      </p>

      {/* Main Radar Card */}
      <div
        ref={cardRef}
        className="relative p-8 sm:p-12 rounded-3xl glass-panel border border-pink-400/30 max-w-2xl mx-auto shadow-glow-pink select-none"
      >
        {/* Big Percentage Gauge */}
        <div
          onClick={handlePulse}
          className="relative w-36 h-36 mx-auto mb-8 flex items-center justify-center cursor-pointer group"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse-glow" />
          <div className="relative z-10 w-32 h-32 rounded-full bg-[#0d0a1f] border-2 border-pink-400/60 flex flex-col items-center justify-center">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 mb-0.5 animate-bounce" />
            <span className="text-3xl font-serif font-bold text-white tracking-tight">
              {displayScore}%
            </span>
            <span className="text-[10px] text-pink-300 uppercase tracking-widest font-semibold">
              Soulmates
            </span>
          </div>
        </div>

        {/* Breakdown Metric Rows */}
        <div className="space-y-4 text-left mb-8">
          {comp.metrics.map((m, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-white font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  {m.name}
                </span>
                <span className="text-pink-300 font-mono font-semibold">
                  {m.score}% • {m.comment}
                </span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="compat-bar bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 h-full rounded-full"
                  style={{ width: `${Math.min(100, m.score)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Verdict Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 text-xs text-amber-200 font-medium">
          <Award className="w-4 h-4 text-amber-300" />
          <span>Verdict: Inseparable, Cosmic, and Destined for Eternity ❤️</span>
        </div>
      </div>
    </section>
  );
}
