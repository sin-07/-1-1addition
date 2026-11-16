"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Flame, RotateCcw, CheckCircle2 } from "lucide-react";
import { soundManager } from "@/utils/soundEffects";
import { gsap } from "@/utils/gsapSetup";

interface BirthdayCakeProps {
  id?: string;
}

export default function BirthdayCake({ id = "cake-section" }: BirthdayCakeProps) {
  const [candles, setCandles] = useState<boolean[]>(Array(23).fill(true));
  const [isBlowingAll, setIsBlowingAll] = useState(false);
  const [wishMade, setWishMade] = useState(false);
  const [customWish, setCustomWish] = useState("");
  const [showWishModal, setShowWishModal] = useState(false);
  const [recordedWishes, setRecordedWishes] = useState<string[]>([]);

  const cakeRef = useRef<HTMLDivElement | null>(null);

  const litCount = candles.filter(Boolean).length;

  const blowSingleCandle = (index: number) => {
    if (!candles[index]) return;
    soundManager.playBlowing();
    setCandles((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });

    if (litCount <= 1) {
      triggerWishCelebration();
    }
  };

  const blowAllCandles = () => {
    if (litCount === 0 || isBlowingAll) return;
    setIsBlowingAll(true);
    soundManager.playBlowing();

    setTimeout(() => {
      setCandles(Array(23).fill(false));
      setIsBlowingAll(false);
      triggerWishCelebration();
    }, 600);
  };

  const triggerWishCelebration = () => {
    setWishMade(true);
    soundManager.playSparkle();

    // GSAP subtle celebratory shake on the cake
    if (cakeRef.current) {
      gsap.fromTo(
        cakeRef.current,
        { scale: 0.98, y: 4 },
        { scale: 1, y: 0, duration: 0.8, ease: "elastic.out(1.2, 0.4)" }
      );
    }

    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.65 },
        colors: ["#fb7185", "#f43f5e", "#fbbf24", "#a855f7", "#ffffff"],
      });
    } catch (e) {}
  };

  const relightCandles = () => {
    soundManager.playChime(659.25, 0.4);
    setCandles(Array(23).fill(true));
    setWishMade(false);

    if (cakeRef.current) {
      gsap.from(cakeRef.current, {
        scale: 0.95,
        duration: 0.6,
        ease: "back.out(1.5)",
      });
    }
  };

  const saveCustomWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWish.trim()) return;
    setRecordedWishes((prev) => [customWish.trim(), ...prev]);
    setCustomWish("");
    setShowWishModal(false);
    blowAllCandles();
  };

  return (
    <section
      id={id}
      className="relative py-28 px-4 sm:px-6 flex flex-col items-center justify-center max-w-5xl mx-auto text-center"
    >
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/20 text-amber-200 text-xs font-medium uppercase tracking-widest mb-4">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Chapter 23 Tradition</span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4">
        Blow Out Your 23 Birthday Candles
      </h2>
      <p className="text-slate-300/80 text-sm sm:text-base max-w-xl mx-auto mb-10">
        Twenty-three candles glowing for twenty-three beautiful years. Click individual flames or blow them all together to seal your secret wish in the stars!
      </p>

      {/* Status Bar */}
      <div className="mb-8 px-5 py-2 rounded-full glass-panel border border-pink-400/20 text-xs text-pink-300 font-mono">
        Candles Glowing: <span className="text-amber-300 font-bold">{litCount} / 23</span>
      </div>

      {/* Birthday Cake Container with GSAP Ref */}
      <div ref={cakeRef} className="relative flex flex-col items-center justify-center my-4 select-none">
        {/* Glow halo */}
        <div
          className={`absolute w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full transition-all duration-700 pointer-events-none ${
            litCount > 0
              ? "bg-gradient-to-t from-amber-500/25 via-pink-500/20 to-transparent blur-3xl opacity-100"
              : "opacity-20 blur-xl"
          }`}
        />

        {/* 23 Candles Arrangement */}
        {/* Tier 1 Candles (Top Row: 7 Candles) */}
        <div className="relative z-10 flex items-end justify-center gap-2 sm:gap-3 mb-1">
          {candles.slice(0, 7).map((isLit, idx) => (
            <CandleItem
              key={idx}
              isLit={isLit}
              onClick={() => blowSingleCandle(idx)}
              height="h-10 sm:h-12"
              color="from-amber-200 to-amber-400"
            />
          ))}
        </div>

        {/* Top Cake Tier */}
        <div className="w-44 sm:w-60 h-16 sm:h-18 rounded-t-2xl bg-gradient-to-r from-[#2c1740] via-[#4d215e] to-[#2c1740] border-t-4 border-pink-300/60 shadow-inner relative flex flex-col items-center justify-center">
          <div className="absolute top-0 inset-x-0 flex justify-around">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-3.5 h-4 bg-pink-300 rounded-b-full shadow-sm" />
            ))}
          </div>

          <span className="text-xs tracking-widest text-pink-200/80 uppercase font-semibold">
            ✨ Sweet 23 ✨
          </span>
        </div>

        {/* Tier 2 Candles (Middle Row: 8 Candles on ledge) */}
        <div className="relative z-10 flex items-end justify-center gap-1.5 sm:gap-4 -my-2">
          {candles.slice(7, 15).map((isLit, idx) => (
            <CandleItem
              key={idx + 7}
              isLit={isLit}
              onClick={() => blowSingleCandle(idx + 7)}
              height="h-8 sm:h-10"
              color="from-pink-300 to-rose-400"
            />
          ))}
        </div>

        {/* Middle Cake Tier */}
        <div className="w-60 sm:w-80 h-20 sm:h-24 bg-gradient-to-r from-[#201133] via-[#3d1852] to-[#201133] border-t-4 border-amber-300/70 shadow-md relative flex items-center justify-center">
          <div className="text-center px-2">
            <span className="text-sm sm:text-base font-serif text-amber-200 tracking-wider font-bold block truncate max-w-[220px] sm:max-w-none">
              Akankshya Mishra
            </span>
            <span className="text-[10px] text-pink-300/80 tracking-widest uppercase">
              17 November 2026
            </span>
          </div>
        </div>

        {/* Tier 3 Candles (Bottom Row: 8 Candles on base ledge) */}
        <div className="relative z-10 flex items-end justify-center gap-1.5 sm:gap-4 -my-2">
          {candles.slice(15, 23).map((isLit, idx) => (
            <CandleItem
              key={idx + 15}
              isLit={isLit}
              onClick={() => blowSingleCandle(idx + 15)}
              height="h-8 sm:h-10"
              color="from-purple-300 to-indigo-400"
            />
          ))}
        </div>

        {/* Bottom Cake Tier */}
        <div className="w-72 sm:w-96 max-w-[92vw] h-20 sm:h-28 rounded-b-3xl bg-gradient-to-r from-[#170a26] via-[#2a0e3f] to-[#170a26] border-t-4 border-pink-400/80 shadow-2xl relative flex items-center justify-center px-3">
          <div className="flex items-center gap-1.5 text-pink-300/80 text-xs sm:text-sm font-serif text-center">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 flex-shrink-0" />
            <span>Forever Loved by Aniket Singh</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 flex-shrink-0" />
          </div>
        </div>

        {/* Golden Cake Stand */}
        <div className="w-76 sm:w-[410px] max-w-[95vw] h-5 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 rounded-full shadow-xl shadow-amber-500/20 -mt-1" />
        <div className="w-36 sm:w-48 h-4 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 rounded-b-xl shadow-md" />
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 max-w-md w-full">
        {litCount > 0 ? (
          <button
            onClick={blowAllCandles}
            disabled={isBlowingAll}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white font-semibold text-sm sm:text-base shadow-glow-pink hover:shadow-glow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 text-amber-200" />
            <span>{isBlowingAll ? "Blowing Out Candles…" : "Blow Out All 23 Candles & Make a Wish"}</span>
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
            <button
              onClick={relightCandles}
              className="px-6 py-2.5 rounded-full glass-panel border border-amber-400/30 text-amber-200 hover:text-white hover:border-amber-300 text-xs sm:text-sm font-medium transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-amber-300" />
              <span>Light All 23 Candles Again</span>
            </button>
            <button
              onClick={() => setShowWishModal(true)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs sm:text-sm font-medium shadow-glow-pink hover:shadow-glow-lg transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Record a Secret 23rd Wish</span>
            </button>
          </div>
        )}
      </div>

      {/* Wish Recorded Box */}
      {wishMade && litCount === 0 && (
        <div className="mt-8 p-6 rounded-2xl glass-panel border border-pink-400/30 max-w-lg w-full text-center animate-fadeIn shadow-glow-pink">
          <div className="w-12 h-12 mx-auto rounded-full bg-pink-500/20 flex items-center justify-center mb-3">
            <Sparkles className="w-6 h-6 text-pink-300" />
          </div>
          <h3 className="text-xl font-serif text-white mb-2">
            Your 23rd Birthday Wish Has Been Recorded ✨
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
            &ldquo;May every dream you dare to envision blossom into reality in this 23rd year, Akankshya. Aniket is right beside you cheering for every step.&rdquo;
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Wish sealed with 100% eternal love</span>
          </div>
        </div>
      )}

      {/* Recorded Wishes Tags */}
      {recordedWishes.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-lg">
          {recordedWishes.map((w, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full bg-purple-900/40 border border-purple-500/30 text-purple-200 text-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>&ldquo;{w}&rdquo;</span>
            </span>
          ))}
        </div>
      )}

      {/* Custom Wish Modal */}
      {showWishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel border border-pink-400/40 shadow-glow-pink">
            <h3 className="text-2xl font-serif text-white mb-2 text-center">
              Write Your 23rd Wish
            </h3>
            <p className="text-slate-300/80 text-xs sm:text-sm text-center mb-6">
              Write down your deepest heart&apos;s desire for your 23rd year.
            </p>

            <form onSubmit={saveCustomWish} className="flex flex-col gap-4">
              <textarea
                value={customWish}
                onChange={(e) => setCustomWish(e.target.value)}
                placeholder="e.g. Endless love with Aniket, laughter, dream career milestones & wonderful travels…"
                rows={4}
                className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-pink-400/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-pink-400 resize-none"
                autoFocus
              />

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowWishModal(false)}
                  className="flex-1 py-2.5 rounded-full glass-panel border border-white/10 text-slate-300 text-sm font-medium hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!customWish.trim()}
                  className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium shadow-glow-pink disabled:opacity-50"
                >
                  Seal Wish ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

function CandleItem({
  isLit,
  onClick,
  height,
  color,
}: {
  isLit: boolean;
  onClick: () => void;
  height: string;
  color: string;
}) {
  return (
    <div onClick={onClick} className="flex flex-col items-center cursor-pointer group">
      {isLit ? (
        <div className="w-3 h-6 candle-flame bg-gradient-to-t from-amber-500 via-yellow-200 to-white rounded-full mb-0.5 shadow-md shadow-amber-400/80 group-hover:scale-125 transition-transform" />
      ) : (
        <div className="w-1 h-3 bg-stone-500/60 rounded-full mb-0.5 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-stone-400/40 rounded-full animate-ping" />
        </div>
      )}
      <div className={`w-2.5 ${height} bg-gradient-to-b ${color} rounded-t-sm border-x border-white/30`} />
    </div>
  );
}
