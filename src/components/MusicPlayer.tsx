"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Music, SkipForward } from "lucide-react";
import { birthdayData, MusicTrack } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(25);
  const [isExpanded, setIsExpanded] = useState(false);

  const tracks = birthdayData.music.tracks;
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Sync state with soundManager
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPlaying(soundManager.getIsPlaying());
      setIsMuted(soundManager.getIsMuted());
      if (soundManager.getIsPlaying()) {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.8));
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const handleTogglePlay = () => {
    const state = soundManager.toggleMusic();
    setIsPlaying(state);
  };

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleNextTrack = () => {
    soundManager.playChime(659.25, 0.3);
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setProgress(0);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      {/* Expanded Music Card */}
      {isExpanded && (
        <div className="mb-3 p-4 rounded-3xl glass-panel border border-pink-400/30 w-72 sm:w-80 shadow-2xl backdrop-blur-xl animate-fadeIn">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] text-pink-300 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Music className="w-3 h-3 text-pink-400" />
              Birthday Melody
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white text-xs px-2 py-0.5 rounded-full bg-white/5"
            >
              Minimize
            </button>
          </div>

          <div className="mb-3">
            <h4 className="text-sm font-serif font-semibold text-white truncate">
              {currentTrack.title}
            </h4>
            <p className="text-xs text-slate-400 truncate">
              {currentTrack.artist}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-3 cursor-pointer">
            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleToggleMute}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-slate-300" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePlay}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-glow-pink hover:scale-105 transition-transform"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                onClick={handleNextTrack}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Live Equalizer Animation */}
            <div className="flex items-end gap-1 h-5 w-6 justify-end">
              <span className={`w-1 rounded-full bg-pink-400 ${isPlaying ? "eq-bar-1" : "h-1"}`} />
              <span className={`w-1 rounded-full bg-purple-400 ${isPlaying ? "eq-bar-2" : "h-1"}`} />
              <span className={`w-1 rounded-full bg-amber-400 ${isPlaying ? "eq-bar-3" : "h-1"}`} />
              <span className={`w-1 rounded-full bg-rose-400 ${isPlaying ? "eq-bar-4" : "h-1"}`} />
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Dock Button */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full glass-panel border border-pink-400/30 hover:border-pink-400/60 shadow-glow-pink cursor-pointer backdrop-blur-xl group transition-all transform hover:scale-105"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleTogglePlay();
          }}
          className="w-7 h-7 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-sm"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>

        <div className="flex flex-col text-left">
          <span className="text-xs font-serif font-medium text-white max-w-[110px] truncate leading-tight">
            {currentTrack.title}
          </span>
          <span className="text-[10px] text-pink-300/80">
            {isPlaying ? "Playing Romantic Tunes" : "Tap to Play Music"}
          </span>
        </div>

        {/* Mini Equalizer */}
        <div className="flex items-end gap-0.5 h-4 ml-1">
          <span className={`w-0.5 rounded-full bg-pink-400 ${isPlaying ? "eq-bar-1" : "h-1"}`} />
          <span className={`w-0.5 rounded-full bg-amber-400 ${isPlaying ? "eq-bar-2" : "h-1"}`} />
          <span className={`w-0.5 rounded-full bg-purple-400 ${isPlaying ? "eq-bar-3" : "h-1"}`} />
        </div>
      </div>
    </div>
  );
}
