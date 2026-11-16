"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Heart,
  Cake,
  BookOpen,
  Mail,
  Gift,
  Mic,
  HelpCircle,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Menu,
  X,
  Camera,
} from "lucide-react";
import { birthdayData } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";

interface NavBarProps {
  onNavigate: (sectionId: string) => void;
}

export default function NavBar({ onNavigate }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileNav = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const toggleSound = () => {
    const state = soundManager.toggleMute();
    setIsMuted(state);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 flex items-center justify-between px-4 sm:px-8 py-3 ${
        scrolled
          ? "bg-[#060713]/90 backdrop-blur-xl border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Brand logo / Monogram */}
      <div
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-2.5 cursor-pointer group select-none"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-600 flex items-center justify-center text-white font-serif font-bold text-xs shadow-md shadow-pink-500/30 group-hover:scale-105 transition-transform">
          A❤️A
        </div>
        <div className="flex flex-col">
          <span className="text-xs sm:text-sm font-serif font-bold text-white tracking-wide leading-tight group-hover:text-pink-300 transition-colors">
            {birthdayData.recipient.preferredName}&apos;s 23rd
          </span>
          <span className="text-[9px] sm:text-[10px] text-pink-300/75 uppercase tracking-widest leading-none">
            With Love, Vicky
          </span>
        </div>
      </div>

      {/* Nav Link Buttons */}
      <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => onNavigate("cake-section")}
          className="px-3 py-1.5 rounded-full text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
        >
          <Cake className="w-3.5 h-3.5 text-amber-300" />
          <span>Cake</span>
        </button>

        <button
          onClick={() => onNavigate("story-section")}
          className="px-3 py-1.5 rounded-full text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5 text-pink-300" />
          <span>Our Story</span>
        </button>

        <button
          onClick={() => onNavigate("reasons-section")}
          className="px-3 py-1.5 rounded-full text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
        >
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>23 Reasons</span>
        </button>

        <button
          onClick={() => onNavigate("voice-section")}
          className="px-3 py-1.5 rounded-full text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
        >
          <Mic className="w-3.5 h-3.5 text-purple-300" />
          <span>Voice Note</span>
        </button>

        <button
          onClick={() => onNavigate("envelopes-section")}
          className="px-3 py-1.5 rounded-full text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
        >
          <Mail className="w-3.5 h-3.5 text-amber-300" />
          <span>Secret Letters</span>
        </button>

        <button
          onClick={() => onNavigate("quiz-section")}
          className="px-3 py-1.5 rounded-full text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
        >
          <HelpCircle className="w-3.5 h-3.5 text-emerald-300" />
          <span>Quiz</span>
        </button>

        <button
          onClick={() => onNavigate("final-section")}
          className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 text-pink-200 hover:bg-pink-500/30 text-xs font-medium transition-all flex items-center gap-1.5"
        >
          <Gift className="w-3.5 h-3.5 text-amber-300" />
          <span>Final Surprise</span>
        </button>
      </nav>

      {/* Right Controls: Sound, Fullscreen & Love Meter */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSound}
          className="w-8 h-8 rounded-full glass-panel border border-white/10 hover:border-pink-400/30 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={toggleFullscreen}
          className="hidden sm:flex w-8 h-8 rounded-full glass-panel border border-white/10 hover:border-pink-400/30 items-center justify-center text-slate-300 hover:text-white transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>

        <button
          onClick={() => onNavigate("happiness-section")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-rose-500/30 text-rose-300 text-xs font-medium hover:bg-rose-500/20 transition-colors"
        >
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          <span className="hidden sm:inline">Love Meter</span>
        </button>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden w-8 h-8 rounded-full glass-panel border border-white/10 hover:border-pink-400/30 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-4 h-4 text-pink-300" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[54px] inset-x-0 bg-[#070817]/95 backdrop-blur-2xl border-b border-pink-400/20 shadow-2xl p-5 flex flex-col gap-2 animate-fadeIn z-50">
          <div className="text-[11px] font-mono text-pink-300/80 uppercase tracking-widest mb-1 px-3">
            Jump to Section
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleMobileNav("cake-section")}
              className="p-3 rounded-2xl glass-panel border border-white/10 hover:border-pink-400/40 text-left text-xs font-medium text-slate-200 flex items-center gap-2"
            >
              <Cake className="w-4 h-4 text-amber-300" />
              <span>Birthday Cake</span>
            </button>
            <button
              onClick={() => handleMobileNav("memories-section")}
              className="p-3 rounded-2xl glass-panel border border-white/10 hover:border-pink-400/40 text-left text-xs font-medium text-slate-200 flex items-center gap-2"
            >
              <Camera className="w-4 h-4 text-pink-300" />
              <span>Memories (12)</span>
            </button>
            <button
              onClick={() => handleMobileNav("story-section")}
              className="p-3 rounded-2xl glass-panel border border-white/10 hover:border-pink-400/40 text-left text-xs font-medium text-slate-200 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-purple-300" />
              <span>Our Story</span>
            </button>
            <button
              onClick={() => handleMobileNav("reasons-section")}
              className="p-3 rounded-2xl glass-panel border border-white/10 hover:border-pink-400/40 text-left text-xs font-medium text-slate-200 flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>23 Reasons</span>
            </button>
            <button
              onClick={() => handleMobileNav("voice-section")}
              className="p-3 rounded-2xl glass-panel border border-white/10 hover:border-pink-400/40 text-left text-xs font-medium text-slate-200 flex items-center gap-2"
            >
              <Mic className="w-4 h-4 text-amber-300" />
              <span>Voice Note</span>
            </button>
            <button
              onClick={() => handleMobileNav("envelopes-section")}
              className="p-3 rounded-2xl glass-panel border border-white/10 hover:border-pink-400/40 text-left text-xs font-medium text-slate-200 flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-pink-300" />
              <span>Secret Letters</span>
            </button>
            <button
              onClick={() => handleMobileNav("quiz-section")}
              className="p-3 rounded-2xl glass-panel border border-white/10 hover:border-pink-400/40 text-left text-xs font-medium text-slate-200 flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-emerald-300" />
              <span>Couple Quiz</span>
            </button>
            <button
              onClick={() => handleMobileNav("final-section")}
              className="p-3 rounded-2xl bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-400/40 text-left text-xs font-medium text-amber-200 flex items-center gap-2"
            >
              <Gift className="w-4 h-4 text-amber-300" />
              <span>Final Surprise</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
