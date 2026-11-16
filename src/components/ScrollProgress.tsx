"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 pointer-events-none bg-white/5">
      <div
        className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 shadow-[0_0_12px_rgba(244,114,182,0.8)] transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
