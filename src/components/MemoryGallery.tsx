"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Sparkles, Heart, Calendar, MapPin, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { birthdayData, MemoryItem } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";
import { gsap, ScrollTrigger } from "@/utils/gsapSetup";

interface MemoryGalleryProps {
  id?: string;
}

export default function MemoryGallery({ id = "memories-section" }: MemoryGalleryProps) {
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState<number | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    birthdayData.memories.forEach((m: MemoryItem) => {
      initial[m.id] = m.likes;
    });
    return initial;
  });
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleLike = (e: React.MouseEvent, memId: string) => {
    e.stopPropagation();
    soundManager.playHeartPop();

    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(memId)) {
        next.delete(memId);
        setLikesMap((lm) => ({ ...lm, [memId]: lm[memId] - 1 }));
      } else {
        next.add(memId);
        setLikesMap((lm) => ({ ...lm, [memId]: lm[memId] + 1 }));
      }
      return next;
    });
  };

  const handleOpenModal = (index: number) => {
    soundManager.playChime(523.25, 0.4);
    setSelectedMemoryIndex(index);
  };

  const selectedMemory: MemoryItem | null =
    selectedMemoryIndex !== null ? birthdayData.memories[selectedMemoryIndex] : null;

  const nextMemory = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playChime(587.33, 0.25);
    if (selectedMemoryIndex !== null) {
      setSelectedMemoryIndex((selectedMemoryIndex + 1) % birthdayData.memories.length);
    }
  };

  const prevMemory = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playChime(523.25, 0.25);
    if (selectedMemoryIndex !== null) {
      setSelectedMemoryIndex(
        (selectedMemoryIndex - 1 + birthdayData.memories.length) % birthdayData.memories.length
      );
    }
  };

  return (
    <section ref={sectionRef} id={id} className="relative py-28 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-pink-400/20 text-pink-300 text-xs font-medium uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Cherished Chapters</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4">
          The Gallery of Memories
        </h2>
        <p className="text-slate-300/80 text-sm sm:text-base">
          Moments frozen in time, capturing the elegance, warmth, and pure joy that Akankshya brings everywhere.
        </p>
      </div>

      {/* Grid of Polaroid Cards with GSAP Stagger */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {birthdayData.memories.map((mem: MemoryItem, index: number) => {
          const isLiked = likedIds.has(mem.id);
          const count = likesMap[mem.id] ?? mem.likes;

          return (
            <div
              key={mem.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <TiltCard onClick={() => handleOpenModal(index)}>
                <div className="relative p-4 rounded-3xl glass-panel border border-white/10 hover:border-pink-400/40 transition-all duration-300 group shadow-lg flex flex-col h-full">
                  {/* Image Container */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800/80 mb-4">
                    <Image
                      src={mem.image}
                      alt={mem.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] text-pink-200 font-medium">
                      {mem.tag}
                    </div>

                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col flex-grow justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-slate-400 text-xs mb-1.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-pink-400" />
                          {mem.date}
                        </span>
                        {mem.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            {mem.location}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-serif font-semibold text-white group-hover:text-pink-300 transition-colors mb-2">
                        {mem.title}
                      </h3>
                      <p className="text-slate-300/80 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {mem.caption}
                      </p>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] text-pink-300/70 uppercase tracking-wider font-medium">
                        Tap to zoom
                      </span>

                      <button
                        onClick={(e) => handleLike(e, mem.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                          isLiked
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : "bg-white/5 text-slate-400 hover:text-rose-300 border border-white/10"
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-transform active:scale-125 ${
                            isLiked ? "fill-rose-400 text-rose-400" : ""
                          }`}
                        />
                        <span>{count}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal with Next / Prev */}
      {selectedMemory && (
        <div
          onClick={() => setSelectedMemoryIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl glass-panel border border-pink-400/30 overflow-hidden shadow-2xl animate-scaleUp"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMemoryIndex(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-slate-900">
              <Image
                src={selectedMemory.image}
                alt={selectedMemory.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e24] via-transparent to-transparent" />

              {/* Prev / Next Arrows */}
              <button
                onClick={prevMemory}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white/20"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextMemory}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white/20"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 bg-[#0d0e24]">
              <div className="flex items-center gap-3 text-xs text-pink-300 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/30 font-medium">
                  {selectedMemory.tag}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-amber-400" />
                  {selectedMemory.date}
                </span>
                {selectedMemory.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {selectedMemory.location}
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-serif text-white mb-3">
                {selectedMemory.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {selectedMemory.caption}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="text-xs text-slate-400">
                  A cherished celebration memory for Akankshya ❤️
                </div>
                <button
                  onClick={(e) => handleLike(e, selectedMemory.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs font-medium hover:bg-pink-500/30 transition-all"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likedIds.has(selectedMemory.id) ? "fill-rose-400 text-rose-400" : ""
                    }`}
                  />
                  <span>
                    {(likesMap[selectedMemory.id] ?? selectedMemory.likes)} Hearts
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// 3D Card Tilt on Mouse Move
function TiltCard({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 12;
    const rotateY = (x / rect.width) * 12;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer transition-transform duration-200 ease-out h-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
