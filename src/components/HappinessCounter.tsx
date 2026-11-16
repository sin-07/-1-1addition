"use client";

import React, { useState } from "react";
import { Heart, Sparkles, Award, Trophy } from "lucide-react";
import { soundManager } from "@/utils/soundEffects";

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  text: string;
}

const affirmations = [
  "+1 Happiness",
  "Radiant Smile! ✨",
  "Adored ❤️",
  "Sweet 17 🌸",
  "Pure Sunshine ☀️",
  "Incomparable 💫",
  "Kind Heart 💖",
  "Star Soul 🌟",
];

interface HappinessCounterProps {
  id?: string;
}

export default function HappinessCounter({ id = "happiness-section" }: HappinessCounterProps) {
  const [count, setCount] = useState(17);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [isBeating, setIsBeating] = useState(false);

  const handleHeartClick = (e: React.MouseEvent<HTMLDivElement>) => {
    soundManager.playHeartPop();
    setCount((prev) => prev + 1);
    setIsBeating(true);
    setTimeout(() => setIsBeating(false), 200);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + (Math.random() * 40 - 20);
    const y = e.clientY - rect.top;

    const randomAffirmation =
      affirmations[Math.floor(Math.random() * affirmations.length)];

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
      text: randomAffirmation,
    };

    setFloatingHearts((prev) => [...prev.slice(-12), newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);
  };

  // Milestone tier
  const getMilestone = () => {
    if (count >= 100) return { title: "Cosmic Adoration", desc: "Infinite love level unlocked!", icon: Trophy };
    if (count >= 50) return { title: "Golden Sunshine", desc: "Superstar energy overflowing!", icon: Award };
    if (count >= 30) return { title: "Pure Joy Radiator", desc: "Spreading unconditional smiles!", icon: Sparkles };
    return { title: "Sweet Seventeen", desc: "Tap the heart to pump the happiness meter!", icon: Heart };
  };

  const milestone = getMilestone();
  const MilestoneIcon = milestone.icon;

  return (
    <section id={id} className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/20 text-rose-300 text-xs font-medium uppercase tracking-widest mb-4">
        <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
        <span>Happiness & Love Meter</span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4">
        Tap To Send Akankshya Love
      </h2>
      <p className="text-slate-300/80 text-sm sm:text-base max-w-lg mx-auto mb-10">
        Every click represents a wish for happiness, a shower of joy, and a warm blessing for her seventeenth year.
      </p>

      {/* Main Interactive Heart Box */}
      <div className="relative flex flex-col items-center justify-center p-8 sm:p-12 rounded-3xl glass-panel border border-pink-500/30 max-w-md mx-auto shadow-glow-pink">
        {/* Floating Particles Area */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
          {floatingHearts.map((fh) => (
            <div
              key={fh.id}
              style={{ left: fh.x, top: fh.y }}
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-pink-300 animate-floatUp whitespace-nowrap"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>{fh.text}</span>
            </div>
          ))}
        </div>

        {/* Big Beating Heart */}
        <div
          onClick={handleHeartClick}
          className={`relative cursor-pointer transition-transform duration-150 select-none group p-4 ${
            isBeating ? "scale-125" : "hover:scale-110"
          }`}
        >
          <div className="absolute inset-0 rounded-full bg-rose-500/30 blur-2xl group-hover:blur-3xl transition-all" />
          <Heart className="w-28 h-28 sm:w-32 sm:h-32 text-rose-500 fill-rose-500 filter drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]" />
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl font-serif">
            {count}
          </span>
        </div>

        {/* Counter Display */}
        <div className="mt-6">
          <span className="text-3xl sm:text-4xl font-serif font-bold text-white block">
            {count.toLocaleString()}
          </span>
          <span className="text-xs text-pink-300/80 tracking-widest uppercase font-medium">
            Hearts Given to Akankshya
          </span>
        </div>

        {/* Milestone Indicator */}
        <div className="mt-6 pt-4 border-t border-white/10 w-full flex items-center justify-center gap-2 text-xs text-amber-300">
          <MilestoneIcon className="w-4 h-4 text-amber-400" />
          <span className="font-semibold">{milestone.title}:</span>
          <span className="text-slate-300">{milestone.desc}</span>
        </div>
      </div>
    </section>
  );
}
