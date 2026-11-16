"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Play, RotateCcw, Trophy, Star, Crown } from "lucide-react";
import { soundManager } from "@/utils/soundEffects";

interface HeartCatchGameProps {
  id?: string;
}

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: "heart" | "star" | "cupcake";
  points: number;
  emoji: string;
}

export default function HeartCatchGame({ id = "game-section" }: HeartCatchGameProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [basketX, setBasketX] = useState(50);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<FallingItem[]>([]);
  const [, setRenderTrigger] = useState(0);

  // Load high score from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("akankshya_heart_game_highscore");
      if (saved) {
        setHighScore(parseInt(saved, 10) || 0);
      }
    }
  }, []);

  // Game Loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          handleGameOver();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const spawnInterval = setInterval(() => {
      const types: Array<{ type: "heart" | "star" | "cupcake"; points: number; emoji: string }> = [
        { type: "heart", points: 10, emoji: "💖" },
        { type: "heart", points: 10, emoji: "🌸" },
        { type: "star", points: 25, emoji: "⭐" },
        { type: "cupcake", points: 50, emoji: "🎂" },
      ];
      const selected = types[Math.floor(Math.random() * types.length)];

      const newItem: FallingItem = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        y: -30,
        speed: Math.random() * 3 + 2.5,
        type: selected.type,
        points: selected.points,
        emoji: selected.emoji,
      };

      itemsRef.current.push(newItem);
    }, 500);

    let animId: number;
    const updatePhysics = () => {
      const containerHeight = containerRef.current?.clientHeight || 360;
      const catcherY = containerHeight - 60;

      itemsRef.current = itemsRef.current
        .map((item) => ({ ...item, y: item.y + item.speed }))
        .filter((item) => {
          const basketMin = basketX - 12;
          const basketMax = basketX + 12;

          if (
            item.y >= catcherY - 20 &&
            item.y <= catcherY + 20 &&
            item.x >= basketMin &&
            item.x <= basketMax
          ) {
            soundManager.playHeartPop();
            setScore((s) => {
              const newScore = s + item.points;
              return newScore;
            });
            return false;
          }

          return item.y < containerHeight;
        });

      setRenderTrigger((r) => r + 1);
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);

    return () => {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, gameOver, basketX]);

  const handleGameOver = () => {
    setIsPlaying(false);
    setGameOver(true);
    soundManager.playSparkle();

    setScore((currentScore) => {
      if (currentScore > highScore) {
        setHighScore(currentScore);
        if (typeof window !== "undefined") {
          localStorage.setItem("akankshya_heart_game_highscore", String(currentScore));
        }
      }
      return currentScore;
    });

    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#fb7185", "#f43f5e", "#fbbf24", "#a855f7"],
      });
    } catch (e) {}
  };

  const startGame = () => {
    soundManager.playChime(587.33, 0.4);
    itemsRef.current = [];
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setIsPlaying(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setBasketX(Math.max(10, Math.min(90, percent)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current || e.touches.length === 0) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setBasketX(Math.max(10, Math.min(90, percent)));
  };

  return (
    <section id={id} className="relative py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Header */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-pink-400/20 text-pink-300 text-xs font-medium uppercase tracking-widest mb-4">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>Celebration Mini-Game</span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-serif text-white mb-4">
        Catch The Birthday Stars & Hearts
      </h2>
      <p className="text-slate-300/80 text-sm sm:text-base max-w-lg mx-auto mb-8">
        Slide your basket to catch falling hearts, stars, and cupcakes for Akankshya!
      </p>

      {/* Game Stage Area */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[360px] sm:h-[400px] rounded-3xl glass-panel border border-pink-500/30 overflow-hidden shadow-glow-pink select-none touch-none"
      >
        {/* Status Bar */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white font-mono text-xs sm:text-sm">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Score: {score}</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-400/30 text-amber-300 font-mono text-xs sm:text-sm">
            <Crown className="w-3.5 h-3.5" />
            <span>Best: {highScore}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-amber-300 font-mono text-xs sm:text-sm">
            <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>Time: {timeLeft}s</span>
          </div>
        </div>

        {/* Falling Items */}
        {isPlaying &&
          itemsRef.current.map((item) => (
            <div
              key={item.id}
              style={{
                left: `${item.x}%`,
                top: `${item.y}px`,
              }}
              className="absolute pointer-events-none transform -translate-x-1/2 text-2xl filter drop-shadow-md transition-none"
            >
              {item.emoji}
            </div>
          ))}

        {/* Moving Basket */}
        <div
          style={{ left: `${basketX}%` }}
          className="absolute bottom-6 transform -translate-x-1/2 flex flex-col items-center pointer-events-none transition-transform duration-75"
        >
          <div className="w-18 sm:w-22 h-9 sm:h-10 rounded-b-2xl bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 border-2 border-amber-200/60 shadow-lg shadow-amber-400/40 flex items-center justify-center text-xs font-bold text-slate-900 px-3">
            🧺 A ❤️ A
          </div>
        </div>

        {/* Pre-game Overlay */}
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-30">
            <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-400/30 flex items-center justify-center mb-4 text-pink-300">
              <Heart className="w-8 h-8 fill-rose-500 text-rose-500 animate-bounce" />
            </div>
            <h3 className="text-2xl font-serif text-white mb-2">
              Catch Love For Akankshya
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-sm mb-6 text-center">
              Slide your mouse or touch across the screen to control the basket.
            </p>
            <button
              onClick={startGame}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-medium text-sm sm:text-base shadow-glow-pink hover:shadow-glow-lg transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 ml-0.5" />
              <span>Start Game</span>
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 z-30 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mb-3 text-amber-300">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white mb-1">
              Fabulous Job, Akankshya!
            </h3>
            <p className="text-pink-300 text-sm font-medium mb-1">
              You gathered {score} Points of Birthday Joy! ✨
            </p>
            {score >= highScore && score > 0 && (
              <span className="text-xs text-amber-300 font-bold mb-2 block">
                👑 NEW PERSONAL HIGH SCORE! 👑
              </span>
            )}
            <p className="text-slate-400 text-xs max-w-xs mb-6 text-center">
              A shower of blessings, laughter, and sweet memories for chapter 23.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium text-sm shadow-glow-pink transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
