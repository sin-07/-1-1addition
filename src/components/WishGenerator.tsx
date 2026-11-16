"use client";

import React, { useState } from "react";
import { Sparkles, Dices, Copy, Check, Stars } from "lucide-react";
import { birthdayData } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";

interface WishGeneratorProps {
  id?: string;
}

export default function WishGenerator({ id = "wishes-section" }: WishGeneratorProps) {
  const wishes = birthdayData.wishesPool;
  const [currentWishIndex, setCurrentWishIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateWish = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    soundManager.playSparkle();

    // Roll through quick randoms
    let counter = 0;
    const interval = setInterval(() => {
      setCurrentWishIndex(Math.floor(Math.random() * wishes.length));
      counter++;
      if (counter > 6) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 80);
  };

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(wishes[currentWishIndex]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id={id} className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/20 text-amber-200 text-xs font-medium uppercase tracking-widest mb-4">
        <Stars className="w-3.5 h-3.5 text-amber-300" />
        <span>Celestial Fortune</span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4">
        Magical Birthday Wish Generator
      </h2>
      <p className="text-slate-300/80 text-sm sm:text-base max-w-lg mx-auto mb-10">
        Spin the celestial wishing sphere to draw a special poetic blessing crafted exclusively for Akankshya.
      </p>

      {/* Interactive Wishing Sphere Card */}
      <div className="relative p-8 sm:p-12 rounded-3xl glass-panel border border-pink-400/30 max-w-2xl mx-auto shadow-glow-purple">
        {/* Glowing Orb Animation */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-purple-500 to-amber-400 blur-xl opacity-75 ${
              isSpinning ? "animate-spin scale-125" : "animate-pulse"
            }`}
          />
          <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-[#2d1b4d] to-[#451f63] border-2 border-pink-300/60 flex items-center justify-center shadow-inner">
            <Sparkles
              className={`w-9 h-9 text-amber-300 ${
                isSpinning ? "animate-spin" : ""
              }`}
            />
          </div>
        </div>

        {/* Current Wish Quote Display */}
        <div className="min-h-[90px] flex items-center justify-center mb-8 px-4">
          <p
            className={`text-lg sm:text-2xl font-serif text-white italic leading-relaxed transition-all duration-300 ${
              isSpinning ? "opacity-30 scale-95" : "opacity-100 scale-100"
            }`}
          >
            &ldquo;{wishes[currentWishIndex]}&rdquo;
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleGenerateWish}
            disabled={isSpinning}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-medium text-sm sm:text-base shadow-glow-pink hover:shadow-glow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <Dices className={`w-4 h-4 ${isSpinning ? "animate-spin" : ""}`} />
            <span>Draw Another Wish</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-5 py-3 rounded-full glass-panel border border-white/10 hover:border-pink-400/40 text-slate-300 hover:text-white text-sm font-medium transition-all flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-pink-300" />
                <span>Copy Wish</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
