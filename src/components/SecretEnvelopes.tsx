"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mail, X, Heart, Lock, Unlock } from "lucide-react";
import { birthdayData, SecretEnvelope } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";
import { gsap, ScrollTrigger } from "@/utils/gsapSetup";

interface SecretEnvelopesProps {
  id?: string;
}

export default function SecretEnvelopes({ id = "envelopes-section" }: SecretEnvelopesProps) {
  const [openedEnvelope, setOpenedEnvelope] = useState<SecretEnvelope | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());

  const sectionRef = useRef<HTMLElement | null>(null);
  const envelopesGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".envelope-card", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: envelopesGridRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleOpenEnvelope = (letter: SecretEnvelope, index: number) => {
    soundManager.playSparkle();

    // GSAP 3D flap open animation
    const card = document.querySelectorAll(".envelope-card")[index];
    if (card) {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.25,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
      });
    }

    setUnlockedIds((prev) => new Set(prev).add(letter.id));
    setTimeout(() => {
      setOpenedEnvelope(letter);
    }, 250);
  };

  return (
    <section ref={sectionRef} id={id} className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/20 text-amber-200 text-xs font-medium uppercase tracking-widest mb-4">
          <Mail className="w-3.5 h-3.5 text-amber-300" />
          <span>Wax-Sealed Keepsakes</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4">
          Secret Letters for Akankshya
        </h2>
        <p className="text-slate-300/80 text-sm sm:text-base">
          Five private letters sealed with love. Open them whenever your heart needs a gentle reminder of our bond.
        </p>
      </div>

      {/* Envelope Cards Grid */}
      <div ref={envelopesGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {birthdayData.secretEnvelopes.map((env: SecretEnvelope, index: number) => {
          const isUnlocked = unlockedIds.has(env.id);

          return (
            <div
              key={env.id}
              onClick={() => handleOpenEnvelope(env, index)}
              className="envelope-card relative p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 hover:border-pink-400/40 cursor-pointer group transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-glow-pink flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-pink-500/10 border border-pink-400/20 flex items-center justify-center text-pink-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-xs text-pink-300/70 font-mono">
                      Envelope #{env.id.replace("env-", "")}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Unlock className="w-3.5 h-3.5" />
                        Unsealed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-400/80">
                        <Lock className="w-3.5 h-3.5" />
                        Wax Sealed
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-serif font-bold text-white group-hover:text-pink-300 transition-colors mb-1.5">
                  {env.title}
                </h3>
                <p className="text-slate-300/70 text-xs mb-6">
                  {env.triggerMood}
                </p>
              </div>

              {/* Center Wax Seal Stamp */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-[11px] text-pink-300/80 font-medium tracking-wider uppercase">
                  Break Seal & Read
                </span>

                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-serif font-bold text-xs shadow-md border border-white/30 transform group-hover:scale-110 group-hover:rotate-12 transition-transform"
                  style={{
                    backgroundColor: env.color,
                    boxShadow: `0 0 15px ${env.color}55`,
                  }}
                >
                  A❤️A
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Letter Reading Modal with GSAP */}
      {openedEnvelope && (
        <div
          onClick={() => setOpenedEnvelope(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl p-5 sm:p-10 max-h-[90vh] overflow-y-auto rounded-3xl bg-gradient-to-b from-[#18112b] via-[#1f1338] to-[#120a22] border-2 border-pink-400/40 shadow-2xl animate-scaleUp"
          >
            <button
              onClick={() => setOpenedEnvelope(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-serif font-bold text-xs shadow-md border border-white/30"
                style={{ backgroundColor: openedEnvelope.color }}
              >
                A❤️A
              </div>
              <div>
                <span className="text-xs text-pink-300 tracking-wider uppercase font-semibold block">
                  A Love Note For You
                </span>
                <h3 className="text-2xl font-serif text-white">
                  {openedEnvelope.title}
                </h3>
              </div>
            </div>

            <div className="relative p-6 sm:p-8 rounded-2xl bg-black/40 border border-white/10 mb-6">
              <p className="text-slate-200 font-serif text-base sm:text-lg leading-relaxed italic whitespace-pre-line">
                &ldquo;{openedEnvelope.message}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Akankshya & Vicky • Chapter 23</span>
              </div>
              <span className="text-sm font-cursive text-pink-300 text-base">
                {openedEnvelope.signature}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
