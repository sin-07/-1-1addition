"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, Play, Pause, Volume2 } from "lucide-react";
import { birthdayData } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";
import { gsap } from "@/utils/gsapSetup";

interface VoiceMessagePlayerProps {
  id?: string;
}

export default function VoiceMessagePlayer({ id = "voice-section" }: VoiceMessagePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const voice = birthdayData.voiceNote;
  const waveformRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1.2;
        });
      }, 250);

      // GSAP wave animation on bars
      if (waveformRef.current) {
        const bars = waveformRef.current.querySelectorAll(".wave-bar");
        gsap.to(bars, {
          scaleY: "random(0.3, 1.8)",
          duration: 0.25,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: {
            each: 0.04,
            from: "center",
          },
        });
      }
    } else {
      clearInterval(timer);
      if (waveformRef.current) {
        const bars = waveformRef.current.querySelectorAll(".wave-bar");
        gsap.killTweensOf(bars);
        gsap.to(bars, { scaleY: 1, duration: 0.3, ease: "power2.out" });
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (!isPlaying) {
      soundManager.playChime(440, 1.2);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const barHeights = [40, 65, 85, 45, 30, 75, 95, 60, 40, 80, 100, 70, 50, 85, 90, 65, 40, 75, 55, 35, 60, 80, 45, 30];

  return (
    <section id={id} className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="relative p-6 sm:p-10 rounded-3xl glass-panel border border-pink-400/30 shadow-glow-pink">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-pink-500/30">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-amber-300 font-mono uppercase tracking-wider block">
                {voice.date} • Special Voice Note
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-white font-bold">
                {voice.title}
              </h3>
            </div>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            Duration: {voice.duration}
          </span>
        </div>

        {/* Waveform Player Bar */}
        <div className="flex items-center gap-4 sm:gap-6 my-6 bg-black/40 p-4 sm:p-6 rounded-2xl border border-white/10">
          <button
            onClick={handleTogglePlay}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-glow-pink hover:scale-105 transition-transform flex-shrink-0"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>

          {/* Animated Waveform Bars with GSAP */}
          <div ref={waveformRef} className="flex items-center gap-1 sm:gap-1.5 flex-grow h-12">
            {barHeights.map((height, i) => {
              const barPercent = (i / barHeights.length) * 100;
              const hasPlayed = barPercent <= progress;

              return (
                <div
                  key={i}
                  className="wave-bar flex-1 rounded-full origin-center"
                  style={{
                    height: `${height * 0.7}%`,
                    backgroundColor: hasPlayed ? "#f472b6" : "rgba(255, 255, 255, 0.2)",
                  }}
                />
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-pink-300 font-mono">
            <Volume2 className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline">{isPlaying ? "Playing..." : "0:00"}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-400 italic">
            &ldquo;A little piece of my heart recorded for you, Akankshya.&rdquo;
          </p>

          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-xs text-pink-300 hover:text-white font-medium underline underline-offset-4"
          >
            {showTranscript ? "Hide Transcript" : "Read Transcript"}
          </button>
        </div>

        {/* Transcript Box */}
        {showTranscript && (
          <div className="mt-4 p-4 rounded-2xl bg-black/50 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed animate-fadeIn">
            <span className="text-amber-300 font-semibold block mb-1">
              Transcription from Aniket:
            </span>
            &ldquo;{voice.transcript}&rdquo;
          </div>
        )}
      </div>
    </section>
  );
}
