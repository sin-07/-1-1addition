"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, X, Gift } from "lucide-react";
import { birthdayData } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";

export default function EasterEggs() {
  const [showSecretModal, setShowSecretModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If user presses 'a' or 'A'
      if (e.key.toLowerCase() === "a" && !showSecretModal) {
        triggerEasterEgg();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSecretModal]);

  const triggerEasterEgg = () => {
    soundManager.playSparkle();
    setShowSecretModal(true);

    try {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#f472b6", "#fb7185", "#fbbf24", "#ffffff"],
      });
    } catch (e) {}
  };

  return (
    <>
      {/* Hidden small trigger button in corner for touch/mobile users */}
      <div className="fixed bottom-6 left-6 z-30 opacity-40 hover:opacity-100 transition-opacity">
        <button
          onClick={triggerEasterEgg}
          className="w-7 h-7 rounded-full bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-[10px] text-pink-300 hover:scale-110 transition-transform"
          title="Secret Easter Egg (Press 'A' on keyboard)"
        >
          ❤️
        </button>
      </div>

      {/* Easter Egg Modal */}
      {showSecretModal && (
        <div
          onClick={() => setShowSecretModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-[#221035] to-[#12071f] border-2 border-pink-400/50 shadow-glow-pink text-center animate-scaleUp"
          >
            <button
              onClick={() => setShowSecretModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 mx-auto rounded-full bg-pink-500/20 flex items-center justify-center text-pink-300 mb-4 animate-bounce">
              <Gift className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-serif text-white font-bold mb-2">
              Secret Easter Egg Found!
            </h3>
            <p className="text-pink-300 text-xs font-mono uppercase tracking-wider mb-4">
              Akankshya ❤️ Vicky Secret Chamber
            </p>

            <div className="p-4 rounded-2xl bg-black/40 border border-pink-400/20 text-slate-200 text-xs sm:text-sm leading-relaxed mb-6 italic whitespace-pre-line text-left">
              {birthdayData.easterEggs.secretMessage}
            </div>

            <button
              onClick={() => setShowSecretModal(false)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold shadow-glow-pink hover:scale-105 transition-transform"
            >
              Close & Keep Secret 🤫
            </button>
          </div>
        </div>
      )}
    </>
  );
}
