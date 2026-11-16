"use client";

import React, { useEffect, useState } from "react";
import { Clock, Sparkles } from "lucide-react";
import { birthdayData } from "@/data/birthdayData";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
  });

  useEffect(() => {
    const target = new Date(birthdayData.recipient.countdownTarget).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isToday: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (timeLeft.isToday) {
    return (
      <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500/25 via-rose-500/25 to-amber-500/25 border border-pink-400/40 shadow-glow-pink">
        <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
        <span className="text-white font-serif font-semibold text-base sm:text-lg">
          IT&apos;S TODAY! Happy 23rd Birthday Akankshya! 🎉🎂
        </span>
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center select-none">
      <div className="flex items-center gap-2 mb-3 text-xs text-amber-300/80 font-medium tracking-widest uppercase">
        <Clock className="w-3.5 h-3.5 text-amber-300" />
        <span>Countdown to 17 November 2026</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {units.map((u, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center w-16 sm:w-20 py-2.5 sm:py-3 rounded-2xl glass-panel border border-white/10 shadow-lg"
          >
            <span className="font-mono text-xl sm:text-3xl font-bold text-white tracking-tight">
              {String(u.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] sm:text-xs text-pink-300/80 uppercase font-medium tracking-wider mt-0.5">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
