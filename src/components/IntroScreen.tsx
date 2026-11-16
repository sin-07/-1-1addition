"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Image from "next/image";
import { Sparkles, Gift, Heart, Stars } from "lucide-react";
import { birthdayData } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";

interface IntroScreenProps {
  onEnter: () => void;
}

export default function IntroScreen({ onEnter }: IntroScreenProps) {
  const [phase, setPhase] = useState<"teaser" | "readyToUnbox" | "unboxing" | "unveiled">("teaser");
  const [typedText, setTypedText] = useState("");
  const fullText = "A surprise for someone special…";

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx <= fullText.length) {
        setTypedText(fullText.slice(0, currentIdx));
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setPhase("readyToUnbox");
        }, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleOpenGift = () => {
    if (phase !== "readyToUnbox") return;
    setPhase("unboxing");

    // Sound effect & start romantic background melody
    soundManager.playUnboxFanfare();
    soundManager.startBackgroundMusic();

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#fb7185", "#f43f5e", "#fbbf24", "#c084fc", "#ffffff"],
      });
    } catch (e) {}

    setTimeout(() => {
      setPhase("unveiled");
      setTimeout(() => {
        onEnter();
      }, 700);
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050611] px-4 transition-all duration-1000 ${
        phase === "unveiled" ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-float-slow pointer-events-none" />

      {/* Teaser Phase */}
      {/* Intro Images */}
<div className="flex flex-wrap justify-center gap-4 mb-6">
  <Image src="/images/first.jpg" alt="First birthday image" width={300} height={200} className="rounded-lg object-cover w-1/2 max-w-xs" />
  <Image src="/images/second.jpg" alt="Second birthday image" width={300} height={200} className="rounded-lg object-cover w-1/2 max-w-xs" />
</div>
{phase === "teaser" && (
        <div className="flex flex-col items-center text-center max-w-lg">
          <div className="w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-6 animate-pulse">
            <Stars className="w-8 h-8 text-pink-300" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-pink-100 tracking-wide leading-relaxed min-h-[4rem]">
            {typedText}
            <span className="inline-block w-1.5 h-7 ml-1 bg-pink-400 animate-pulse" />
          </h2>
          <p className="text-sm text-pink-200/50 mt-4 tracking-widest uppercase text-xs">
            Packed with infinite love just for you ❤️
          </p>
        </div>
      )}

      {/* Ready To Unbox Phase */}
      {(phase === "readyToUnbox" || phase === "unboxing") && (
        <div className="flex flex-col items-center text-center animate-fadeIn max-w-md w-full">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-400/20 text-pink-300 text-xs font-medium uppercase tracking-widest mb-6 badge-glow">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Special Delivery for {birthdayData.recipient.fullName}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif text-white mb-2">
            A 23rd Birthday Surprise ✨
          </h1>
          <p className="text-slate-300/80 text-sm mb-8">
            Turning 23 on 17 November 2026. Packed with memories, surprises, and endless love.
          </p>

          {/* Interactive Gift Box */}
          <div
            onClick={handleOpenGift}
            className={`relative group cursor-pointer p-6 transition-all duration-500 transform hover:scale-105 ${
              phase === "unboxing" ? "scale-110" : ""
            }`}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 blur-xl group-hover:blur-2xl transition-all" />

            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl glass-panel border border-pink-400/30 flex flex-col items-center justify-center shadow-glow-pink">
              {/* Ribbon */}
              <div className="absolute top-0 bottom-0 w-8 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-500 opacity-80 shadow-md" />
              <div className="absolute left-0 right-0 h-8 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 opacity-80 shadow-md" />

              {/* Bow on Top */}
              <div className="absolute -top-4 w-14 h-14 flex items-center justify-center z-10 animate-bounce">
                <div className="w-7 h-7 rounded-full bg-amber-400 border-2 border-amber-200 shadow-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                </div>
              </div>

              {/* Center Gift Icon */}
              <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center shadow-lg transform transition-transform group-hover:rotate-6">
                <Gift className="w-10 h-10 text-white" />
              </div>

              <div className="relative z-10 mt-3 text-xs font-semibold tracking-wider text-amber-200 uppercase flex items-center gap-1.5">
                <span>Tap to Open</span>
                <Sparkles className="w-3 h-3 text-amber-300" />
              </div>
            </div>
          </div>

          <button
            onClick={handleOpenGift}
            className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-semibold text-sm sm:text-base shadow-glow-pink hover:shadow-glow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Open Birthday Surprise</span>
          </button>
        </div>
      )}
    </div>
  );
}
