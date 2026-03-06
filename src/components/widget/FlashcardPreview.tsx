"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { type FlashCard, type DisplayStyle, type CardMode, SAMPLE_CARDS } from "@/lib/flashcard";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, { card: string; counter: string }> = {
  sm: { card: "text-lg", counter: "text-xs" },
  md: { card: "text-xl", counter: "text-sm" },
  lg: { card: "text-2xl", counter: "text-sm" },
  xl: { card: "text-3xl", counter: "text-base" },
};

const REVEAL_FONT_SIZE_MAP: Record<FontSizeKey, { word: string; meaning: string; label: string }> = {
  sm: { word: "text-lg", meaning: "text-sm", label: "text-xs" },
  md: { word: "text-2xl", meaning: "text-base", label: "text-xs" },
  lg: { word: "text-3xl", meaning: "text-lg", label: "text-sm" },
  xl: { word: "text-4xl", meaning: "text-xl", label: "text-sm" },
};

interface FlashcardPreviewProps {
  cards?: FlashCard[];
  showCount?: boolean;
  autoFlip?: boolean;
  displayStyle?: DisplayStyle;
  mode?: CardMode;
  accentColor?: string;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function FlashcardPreview({
  cards = [],
  showCount = true,
  autoFlip = false,
  displayStyle = "flip",
  mode = "sequential",
  accentColor = "7C3AED",
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: FlashcardPreviewProps) {
  const displayCards = cards.length > 0 ? cards : SAMPLE_CARDS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Reset index when cards change
  useEffect(() => {
    startTransition(() => {
      setCurrentIndex(0);
      setFlipped(false);
    });
  }, [cards]);

  // Keep index in bounds
  useEffect(() => {
    if (currentIndex >= displayCards.length) {
      startTransition(() => {
        setCurrentIndex(Math.max(0, displayCards.length - 1));
      });
    }
  }, [currentIndex, displayCards.length]);

  // Auto-flip (only for flip displayStyle)
  useEffect(() => {
    if (!autoFlip || displayStyle !== "flip") return;
    const timer = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, [autoFlip, currentIndex, displayStyle]);

  const handlePrev = useCallback(() => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + displayCards.length) % displayCards.length);
  }, [displayCards.length]);

  const handleNext = useCallback(() => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % displayCards.length);
  }, [displayCards.length]);

  const handleRandom = useCallback(() => {
    setFlipped(false);
    const newIdx = Math.floor(Math.random() * displayCards.length);
    setCurrentIndex(newIdx);
  }, [displayCards.length]);

  const handleFlip = useCallback(() => {
    setFlipped((prev) => !prev);
  }, []);

  const sizeConfig = FONT_SIZE_MAP[fontSize];
  const revealSizeConfig = REVEAL_FONT_SIZE_MAP[fontSize];
  const card = displayCards[currentIndex];

  // Compute a lighter tint of accentColor for the back side
  const backBg = `#${accentColor}30`;

  if (displayStyle === "reveal") {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-4"
        style={{
          backgroundColor: transparentBg ? "transparent" : `#${bg}`,
          borderRadius,
          padding,
        }}
      >
        {/* Word + Meaning */}
        <div className="text-center space-y-2">
          <p
            className={`${revealSizeConfig.word} font-bold`}
            style={{ color: `#${accentColor}` }}
          >
            {card?.front || "-"}
          </p>
          <p
            className={revealSizeConfig.meaning}
            style={{ color: `#${color}` }}
          >
            {card?.back || "-"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {mode === "sequential" && (
            <button
              type="button"
              onClick={handlePrev}
              aria-label="이전 카드"
              className="p-1.5 rounded-md transition-colors hover:opacity-70"
              style={{ color: `#${accentColor}` }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {mode === "random" && (
            <button
              type="button"
              onClick={handleRandom}
              aria-label="랜덤 카드"
              className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:opacity-80 active:scale-95 inline-flex items-center gap-1.5"
              style={{ backgroundColor: `#${accentColor}`, color: `#${bg}` }}
            >
              <Shuffle className="w-3.5 h-3.5" />
              다음
            </button>
          )}

          {mode === "sequential" && (
            <button
              type="button"
              onClick={handleNext}
              aria-label="다음 카드"
              className="p-1.5 rounded-md transition-colors hover:opacity-70"
              style={{ color: `#${accentColor}` }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Counter */}
        {showCount && (
          <p
            className={`${revealSizeConfig.label} opacity-50`}
            style={{ color: `#${color}` }}
          >
            {currentIndex + 1} / {displayCards.length}
          </p>
        )}
      </div>
    );
  }

  // Flip display style (default)
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      {/* 3D Flip Card */}
      <div
        className="relative cursor-pointer select-none"
        style={{
          width: "100%",
          maxWidth: 300,
          aspectRatio: "3/2",
          perspective: "600px",
        }}
        onClick={handleFlip}
      >
        <div
          className="w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl backface-hidden"
            style={{
              backgroundColor: `#${accentColor}`,
              backfaceVisibility: "hidden",
              borderRadius: Math.min(borderRadius, 16),
            }}
          >
            <p
              className={`${sizeConfig.card} font-bold text-center px-4 leading-snug`}
              style={{ color: "#FFFFFF" }}
            >
              {card?.front || ""}
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl"
            style={{
              backgroundColor: backBg,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: Math.min(borderRadius, 16),
              border: `2px solid #${accentColor}`,
            }}
          >
            <p
              className={`${sizeConfig.card} font-bold text-center px-4 leading-snug`}
              style={{ color: `#${accentColor}` }}
            >
              {card?.back || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Hint text */}
      <p
        className="text-xs opacity-40"
        style={{ color: `#${color}` }}
      >
        클릭하여 뒤집기
      </p>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        {mode === "sequential" && (
          <button
            type="button"
            onClick={handlePrev}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{
              backgroundColor: `#${accentColor}20`,
              color: `#${accentColor}`,
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {mode === "random" && (
          <button
            type="button"
            onClick={handleRandom}
            aria-label="랜덤 카드"
            className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{
              backgroundColor: `#${accentColor}20`,
              color: `#${accentColor}`,
            }}
          >
            <Shuffle className="w-4 h-4" />
          </button>
        )}

        {showCount && (
          <span
            className={`${sizeConfig.counter} tabular-nums font-medium`}
            style={{ color: `#${color}` }}
          >
            {currentIndex + 1} / {displayCards.length}
          </span>
        )}

        {mode === "sequential" && (
          <button
            type="button"
            onClick={handleNext}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{
              backgroundColor: `#${accentColor}20`,
              color: `#${accentColor}`,
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
