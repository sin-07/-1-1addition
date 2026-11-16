"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BookOpen, Sparkles, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { birthdayData, ScrapbookItem } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";

interface DigitalScrapbookProps {
  id?: string;
}

export default function DigitalScrapbook({ id = "scrapbook-section" }: DigitalScrapbookProps) {
  const pages = birthdayData.scrapbook;
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    soundManager.playChime(587.33, 0.3);
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  const prevPage = () => {
    soundManager.playChime(523.25, 0.3);
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const currentItem: ScrapbookItem = pages[currentPage];

  return (
    <section id={id} className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-pink-400/20 text-pink-300 text-xs font-medium uppercase tracking-widest mb-4">
          <BookOpen className="w-3.5 h-3.5 text-pink-300" />
          <span>Keepsake Album</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white mb-3">
          Our Digital Scrapbook
        </h2>
        <p className="text-slate-300/80 text-xs sm:text-sm">
          Snapshots taped with love, handwritten sticky notes, and cherished memories.
        </p>
      </div>

      {/* Scrapbook Open Book / Polaroid Frame */}
      <div className="relative max-w-xl mx-auto p-4 sm:p-12 rounded-3xl bg-[#130f24] border-2 border-amber-300/30 shadow-2xl shadow-purple-900/30">
        {/* Washi Tape Accent at Top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-amber-200/40 backdrop-blur-md border border-white/20 rotate-1 shadow-sm" />

        {/* Polaroid Card */}
        <div className={`relative bg-[#fcfaf7] text-slate-900 p-4 sm:p-6 rounded-2xl shadow-xl transform ${currentItem.rotation} transition-transform duration-500`}>
          {/* Polaroid Image */}
          <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-xl overflow-hidden bg-slate-200 mb-4 shadow-inner">
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              fill
              priority
              className="object-cover object-top"
            />
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-white font-medium shadow-md">
              {currentItem.sticker}
            </div>
          </div>

          {/* Handwritten Style Caption */}
          <div className="text-left font-serif pt-2">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-1">
              <span>{currentItem.date}</span>
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-1">
              {currentItem.title}
            </h4>
            <p className="text-sm font-cursive text-slate-700 text-base leading-relaxed">
              &ldquo;{currentItem.caption}&rdquo;
            </p>
          </div>
        </div>

        {/* Page Flip Navigation Controls */}
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/10">
          <button
            onClick={prevPage}
            className="w-10 h-10 rounded-full glass-panel border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs text-pink-300 font-mono">
            Page {currentPage + 1} of {pages.length}
          </span>

          <button
            onClick={nextPage}
            className="w-10 h-10 rounded-full glass-panel border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
