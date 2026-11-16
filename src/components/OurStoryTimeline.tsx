"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Heart, Calendar } from "lucide-react";
import { birthdayData, StoryMilestone } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";
import { gsap, ScrollTrigger } from "@/utils/gsapSetup";

interface OurStoryTimelineProps {
  id?: string;
}

export default function OurStoryTimeline({ id = "story-section" }: OurStoryTimelineProps) {
  const story = birthdayData.ourStory;
  const sectionRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dynamic central line draw on scroll
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
      }

      // Staggered card entrance from left & right
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const fromLeft = index % 2 === 0;

        gsap.from(card, {
          x: fromLeft ? -70 : 70,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id={id} className="relative py-28 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-rose-400/20 text-rose-300 text-xs font-medium uppercase tracking-widest mb-4">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>Our Love Story</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4">
          How Our Love Story Happened
        </h2>
        <p className="text-slate-300/80 text-sm sm:text-base">
          From the very first spark to this magnificent 23rd birthday milestone—every second with you is my favorite memory.
        </p>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative">
        {/* Dynamic Glowing Center Line (Scrubbed with GSAP ScrollTrigger) */}
        <div
          ref={lineRef}
          className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-amber-400 sm:-translate-x-1/2 shadow-[0_0_12px_rgba(244,114,182,0.8)]"
        />

        <div className="space-y-12 sm:space-y-16">
          {story.map((item: StoryMilestone, index: number) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? "sm:flex-row-reverse" : ""
                } gap-6 sm:gap-12 pl-10 sm:pl-0`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-4 sm:left-1/2 top-4 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 p-0.5 shadow-glow-pink flex items-center justify-center z-10 hover:scale-125 transition-transform">
                  <div className="w-full h-full rounded-full bg-[#080916] flex items-center justify-center">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  </div>
                </div>

                {/* Content Card with GSAP ScrollTrigger ref */}
                <div
                  ref={(el) => {
                    if (el) cardsRef.current[index] = el;
                  }}
                  className="w-full sm:w-[calc(50%-2.5rem)]"
                >
                  <div
                    onClick={() => soundManager.playHeartPop()}
                    className="p-6 sm:p-7 rounded-3xl glass-panel border border-white/10 hover:border-pink-400/40 transition-all duration-300 shadow-xl group hover:shadow-glow-pink cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-800">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] text-pink-200 font-medium">
                        {item.tag}
                      </div>

                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-amber-300 font-mono flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.year}</span>
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="space-y-2">
                      <span className="text-xs text-pink-300 font-mono uppercase tracking-wider block">
                        {item.subtitle}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-white group-hover:text-pink-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-slate-300/80 text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block sm:w-[calc(50%-2.5rem)]" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
