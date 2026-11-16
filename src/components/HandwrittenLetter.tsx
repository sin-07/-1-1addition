"use client";

import React, { useEffect, useRef } from "react";
import { Sparkles, Heart, Feather } from "lucide-react";
import { birthdayData } from "@/data/birthdayData";
import { gsap, ScrollTrigger } from "@/utils/gsapSetup";

interface HandwrittenLetterProps {
  id?: string;
}

export default function HandwrittenLetter({ id = "letter-section" }: HandwrittenLetterProps) {
  const letter = birthdayData.handwrittenLetter;
  const sectionRef = useRef<HTMLElement | null>(null);
  const parchmentRef = useRef<HTMLDivElement | null>(null);
  const paragraphsRef = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parchment float-in
      gsap.from(parchmentRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: parchmentRef.current,
          start: "top 80%",
        },
      });

      // Progressive ink writing reveal
      paragraphsRef.current.forEach((p, idx) => {
        if (!p) return;
        gsap.from(p, {
          opacity: 0,
          y: 25,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: p,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id={id} className="relative py-28 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-pink-400/20 text-pink-300 text-xs font-medium uppercase tracking-widest mb-4">
          <Feather className="w-3.5 h-3.5 text-pink-300" />
          <span>From Aniket&apos;s Heart</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4">
          A Handwritten Love Letter
        </h2>
        <p className="text-slate-300/80 text-sm sm:text-base">
          Penned with all the sincerity, admiration, and boundless love in my heart on your 23rd birthday.
        </p>
      </div>

      {/* Parchment Letter Container with GSAP Inked Reveal */}
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-amber-400/15 via-pink-400/15 to-purple-400/15 blur-xl pointer-events-none" />

        <div
          ref={parchmentRef}
          className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-[#18152e]/95 via-[#1c1433]/95 to-[#120e26]/95 border border-amber-300/30 shadow-2xl backdrop-blur-xl"
        >
          {/* Header Wax Seal Stamp */}
          <div className="flex items-center justify-between border-b border-amber-200/15 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-600 to-amber-700 border-2 border-amber-200/50 flex items-center justify-center text-white font-serif font-bold text-xs shadow-lg shadow-rose-600/30">
                A❤️A
              </div>
              <div>
                <span className="text-xs text-amber-300/80 uppercase font-semibold tracking-wider block">
                  Dedicated To
                </span>
                <span className="text-base font-serif text-white">
                  {birthdayData.recipient.fullName}
                </span>
              </div>
            </div>

            <span className="text-xs sm:text-sm font-mono text-slate-400 italic">
              {letter.dateStamp}
            </span>
          </div>

          {/* Letter Body with GSAP ink reveals */}
          <div className="space-y-6 text-slate-100">
            <h3 className="font-cursive text-3xl sm:text-4xl text-amber-200 font-semibold tracking-wide">
              {letter.salutation}
            </h3>

            {letter.paragraphs.map((para, idx) => (
              <p
                key={idx}
                ref={(el) => {
                  if (el) paragraphsRef.current[idx] = el;
                }}
                className="font-cursive text-xl sm:text-2xl text-slate-200/90 leading-relaxed sm:leading-loose tracking-wide font-normal"
              >
                {para}
              </p>
            ))}

            <div className="pt-8 border-t border-amber-200/15 mt-8 flex flex-col items-end text-right">
              <p className="font-cursive text-lg sm:text-xl text-slate-300 italic mb-1">
                {letter.closing}
              </p>
              <p className="font-cursive text-2xl sm:text-3xl text-pink-300 font-semibold flex items-center gap-2">
                <span>{letter.signOff}</span>
              </p>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-amber-300/70 font-medium tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Forever Cherished • Chapter 23 • Aniket & Akankshya</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
