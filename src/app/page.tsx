"use client";

import React, { useState } from "react";
import IntroScreen from "@/components/IntroScreen";
import BackgroundEffects from "@/components/BackgroundEffects";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import BirthdayCake from "@/components/BirthdayCake";
import OurStoryTimeline from "@/components/OurStoryTimeline";
import MemoryGallery from "@/components/MemoryGallery";
import TwentyThreeReasons from "@/components/TwentyThreeReasons";
import SecretEnvelopes from "@/components/SecretEnvelopes";
import VoiceMessagePlayer from "@/components/VoiceMessagePlayer";
import MusicPlayer from "@/components/MusicPlayer";
import HeartCatchGame from "@/components/HeartCatchGame";
import CoupleQuiz from "@/components/CoupleQuiz";
import CompatibilityMeter from "@/components/CompatibilityMeter";
import DigitalScrapbook from "@/components/DigitalScrapbook";
import WishGenerator from "@/components/WishGenerator";
import HappinessCounter from "@/components/HappinessCounter";
import HandwrittenLetter from "@/components/HandwrittenLetter";
import EasterEggs from "@/components/EasterEggs";
import SmoothScroll from "@/components/SmoothScroll";
import FinalSurprise from "@/components/FinalSurprise";
import { birthdayData } from "@/data/birthdayData";
import { Heart, Sparkles } from "lucide-react";

export default function BirthdayPage() {
  const [hasEntered, setHasEntered] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleReplaySurprise = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setHasEntered(false);
  };

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#060713] text-slate-100 overflow-x-hidden select-none">
        {/* Scroll Progress Bar at Top */}
        <ScrollProgress />

      {/* Custom Desktop Trail Cursor */}
      <CustomCursor />

      {/* Background Starfield & Ambient Glows */}
      <BackgroundEffects />

      {/* Hidden Easter Eggs Listener */}
      <EasterEggs />

      {/* Opening Intro & Gift Unbox Screen */}
      {!hasEntered && (
        <IntroScreen onEnter={() => setHasEntered(true)} />
      )}

      {/* Main Experience Layout */}
      <div
        className={`transition-opacity duration-1000 ${
          hasEntered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Navigation Bar */}
        <NavBar onNavigate={scrollToSection} />

        {/* 1. Hero Section with Live Countdown */}
        <HeroSection
          onScrollToCake={() => scrollToSection("cake-section")}
          onScrollToStory={() => scrollToSection("story-section")}
          onScrollToReasons={() => scrollToSection("reasons-section")}
          onScrollToFinal={() => scrollToSection("final-section")}
        />

        {/* 2. Interactive 23-Candle Birthday Cake */}
        <BirthdayCake id="cake-section" />

        <Divider icon="sparkles" />

        {/* 3. Our Story Timeline */}
        <OurStoryTimeline id="story-section" />

        <Divider icon="heart" />

        {/* 4. Memory Gallery with 3D Tilt */}
        <MemoryGallery id="memories-section" />

        <Divider icon="sparkles" />

        {/* 5. 23 Reasons I Love You */}
        <TwentyThreeReasons id="reasons-section" />

        <Divider icon="heart" />

        {/* 6. Secret Wax-Sealed Envelopes */}
        <SecretEnvelopes id="envelopes-section" />

        <Divider icon="sparkles" />

        {/* 7. Personal Voice Message Player from Aniket */}
        <VoiceMessagePlayer id="voice-section" />

        <Divider icon="heart" />

        {/* 8. Couple Activities & Games */}
        <CoupleQuiz id="quiz-section" />
        <CompatibilityMeter id="compatibility-section" />
        <DigitalScrapbook id="scrapbook-section" />
        <HeartCatchGame id="game-section" />

        <Divider icon="sparkles" />

        {/* 9. Happiness Meter & Celestial Wishes */}
        <HappinessCounter id="happiness-section" />
        <WishGenerator id="wishes-section" />

        <Divider icon="heart" />

        {/* 10. Handwritten Love Letter from Aniket */}
        <HandwrittenLetter id="letter-section" />

        <Divider icon="sparkles" />

        {/* 11. Final Cinematic Surprise & Fireworks */}
        <FinalSurprise id="final-section" onReplay={handleReplaySurprise} />

        {/* Persistent Floating Music Player Dock */}
        <MusicPlayer />

        {/* Footer */}
        <footer className="py-14 border-t border-white/10 text-center text-xs text-slate-400 relative z-10 px-4">
          <p className="flex items-center justify-center gap-1.5 text-base font-serif text-slate-200 mb-2">
            <span>Crafted with infinite love by</span>
            <span className="text-pink-300 font-semibold">{birthdayData.sender.fullName}</span>
            <span>for</span>
            <span className="text-amber-300 font-semibold">{birthdayData.recipient.fullName}</span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse inline" />
          </p>
          <p className="text-xs text-slate-400">
            Chapter 23 • 17 November 2026 • Forever and Always ❤️
          </p>
        </footer>
      </div>
    </main>
    </SmoothScroll>
  );
}

function Divider({ icon }: { icon: "heart" | "sparkles" }) {
  return (
    <div className="flex items-center justify-center my-8 select-none">
      <div className="h-px w-28 bg-gradient-to-r from-transparent to-pink-500/40" />
      {icon === "heart" ? (
        <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 mx-3" />
      ) : (
        <Sparkles className="w-3.5 h-3.5 text-amber-300 mx-3" />
      )}
      <div className="h-px w-28 bg-gradient-to-l from-transparent to-pink-500/40" />
    </div>
  );
}
