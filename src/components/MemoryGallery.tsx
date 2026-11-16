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
  const [activeCategory, setActiveCategory] = useState<string>("All");
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

  const categories = ["All", "Traditional", "Golden Hour", "Cuteness", "Style", "Magic"];

  const filteredMemories =
    activeCategory === "All"
      ? birthdayData.memories
      : birthdayData.memories.filter((m: MemoryItem) => m.tag.includes(activeCategory));

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

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedMemoryIndex === null) return;
      if (e.key === "Escape") setSelectedMemoryIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedMemoryIndex((selectedMemoryIndex + 1) % birthdayData.memories.length);
      }
      if (e.key === "ArrowLeft") {
        setSelectedMemoryIndex(
          (selectedMemoryIndex - 1 + birthdayData.memories.length) % birthdayData.memories.length
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMemoryIndex]);

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
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-pink-400/20 text-pink-300 text-xs font-medium uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Cherished Chapters • 12 Memories</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4">
          The Gallery of Memories
        </h2>
        <p className="text-slate-300/80 text-sm sm:text-base">
          Moments frozen in time, capturing the elegance, warmth, and pure joy that Akankshya brings everywhere.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              soundManager.playChime(600, 0.1);
              setActiveCategory(cat);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat
                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30 scale-105"
                : "glass-panel border border-white/10 text-slate-300 hover:text-white hover:border-pink-400/40"
            }`}
          >
            {cat} {cat === "All" ? `(${birthdayData.memories.length})` : ""}
          </button>
        ))}
      </div>

      {/* Grid of Polaroid Cards with GSAP Stagger */}
      <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMemories.map((mem: MemoryItem, index: number) => {
          const isLiked = likedIds.has(mem.id);
          const count = likesMap[mem.id] ?? mem.likes;
          const globalIndex = birthdayData.memories.findIndex((m: MemoryItem) => m.id === mem.id);

          return (
            <div
              key={mem.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <TiltCard onClick={() => handleOpenModal(globalIndex !== -1 ? globalIndex : index)}>
                <div className="relative p-4 rounded-3xl glass-panel border border-white/10 hover:border-pink-400/40 transition-all duration-300 group shadow-lg flex flex-col h-full">
                  {/* Portrait Image Container */}
                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-slate-800/80 mb-4">
                    <Image
                      src={mem.image}
                      alt={mem.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] text-pink-200 font-medium">
                      {mem.tag}
                    </div>

                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl glass-panel border border-pink-400/40 overflow-hidden shadow-2xl animate-scaleUp max-h-[92vh] flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMemoryIndex(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image (Portrait-friendly) */}
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] bg-slate-950 flex-shrink-0">
              <Image
                src={selectedMemory.image}
                alt={selectedMemory.title}
                fill
                priority
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e24] via-transparent to-transparent opacity-80" />

              {/* Prev / Next Arrows */}
              <button
                onClick={prevMemory}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextMemory}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110 shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 bg-[#0d0e24] overflow-y-auto">
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

              <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">
                {selectedMemory.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {selectedMemory.caption}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-400">
                <span>Photo {(selectedMemoryIndex ?? 0) + 1} of {birthdayData.memories.length}</span>
                <button
                  onClick={(e) => handleLike(e, selectedMemory.id)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs hover:bg-rose-500/30"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                  <span>{likesMap[selectedMemory.id] ?? selectedMemory.likes} Love</span>
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
