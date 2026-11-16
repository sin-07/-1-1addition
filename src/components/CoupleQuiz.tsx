"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { HelpCircle, CheckCircle2, XCircle, Trophy, RotateCcw, Sparkles, Heart } from "lucide-react";
import { birthdayData, QuizQuestion } from "@/data/birthdayData";
import { soundManager } from "@/utils/soundEffects";

interface CoupleQuizProps {
  id?: string;
}

export default function CoupleQuiz({ id = "quiz-section" }: CoupleQuizProps) {
  const questions = birthdayData.coupleQuiz;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ: QuizQuestion = questions[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      soundManager.playSparkle();
      setScore((s) => s + 1);
    } else {
      soundManager.playChime(329.63, 0.4);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      soundManager.playSparkle();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f472b6", "#fbbf24", "#a855f7"],
        });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsFinished(false);
    setScore(0);
  };

  return (
    <section id={id} className="relative py-24 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/20 text-amber-200 text-xs font-medium uppercase tracking-widest mb-4">
          <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
          <span>Interactive Couple Quiz</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-white mb-3">
          How Well Do You Know Us?
        </h2>
        <p className="text-slate-300/80 text-xs sm:text-sm">
          A playful 5-question test crafted by Aniket to celebrate our favorite memories and quirks.
        </p>
      </div>

      {/* Quiz Card */}
      <div className="relative p-6 sm:p-10 rounded-3xl glass-panel border border-pink-400/30 shadow-glow-purple">
        {!isFinished ? (
          <div>
            {/* Progress Bar */}
            <div className="flex items-center justify-between text-xs text-pink-300 mb-4 font-mono">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-8">
              <div
                className="bg-gradient-to-r from-pink-500 to-amber-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-xl sm:text-2xl font-serif text-white font-bold mb-6">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let btnStyles = "glass-panel border-white/10 text-slate-200 hover:border-pink-400/40 hover:bg-white/10";
                if (isAnswered) {
                  if (isCorrect) {
                    btnStyles = "bg-emerald-600/30 border-emerald-400 text-emerald-100 shadow-md";
                  } else if (isSelected && !isCorrect) {
                    btnStyles = "bg-rose-600/30 border-rose-400 text-rose-100";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between ${btnStyles}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Aniket's Note */}
            {isAnswered && (
              <div className="p-4 rounded-2xl bg-black/40 border border-amber-400/20 mb-6 animate-fadeIn text-xs sm:text-sm text-amber-200 italic flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span>Aniket&apos;s Commentary: &ldquo;{currentQ.aniketNote}&rdquo;</span>
              </div>
            )}

            {/* Next Question Button */}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium text-sm shadow-glow-pink hover:shadow-glow-lg transition-all"
              >
                {currentIdx + 1 === questions.length ? "View Final Result 🎉" : "Next Question →"}
              </button>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center mb-4 text-amber-300">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold mb-2">
              Quiz Completed, My Love!
            </h3>
            <p className="text-pink-300 font-medium text-base mb-2">
              You scored {score} out of {questions.length}!
            </p>
            <p className="text-slate-300/80 text-xs sm:text-sm max-w-md mx-auto mb-8">
              {score >= 4
                ? "Perfect score! We are so in sync it's scary. You know my heart inside out, Akku! ❤️"
                : "A delightful score! Every memory we make is etched in our hearts forever."}
            </p>

            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-full glass-panel border border-white/20 text-slate-200 hover:text-white text-xs font-medium transition-all inline-flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
