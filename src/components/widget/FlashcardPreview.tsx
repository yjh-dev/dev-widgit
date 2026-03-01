"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FlashCard, SAMPLE_CARDS } from "@/lib/flashcard";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, { card: string; counter: string }> = {
  sm: { card: "text-lg", counter: "text-xs" },
  md: { card: "text-xl", counter: "text-sm" },
  lg: { card: "text-2xl", counter: "text-sm" },
  xl: { card: "text-3xl", counter: "text-base" },
};

interface FlashcardPreviewProps {
  cards?: FlashCard[];
  showCount?: boolean;
  autoFlip?: boolean;
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

  // Auto-flip
  useEffect(() => {
    if (!autoFlip) return;
    const timer = setInterval(() => {
      setFlipped((prev) => !prev);
    }, 3000);
    return () => clearInterval(timer);
  }, [autoFlip, currentIndex]);

  const handlePrev = useCallback(() => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + displayCards.length) % displayCards.length);
  }, [displayCards.length]);

  const handleNext = useCallback(() => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % displayCards.length);
  }, [displayCards.length]);

  const handleFlip = useCallback(() => {
    setFlipped((prev) => !prev);
  }, []);

  const sizeConfig = FONT_SIZE_MAP[fontSize];
  const card = displayCards[currentIndex];

  // Compute a lighter tint of accentColor for the back side
  const backBg = `#${accentColor}30`;

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

        {showCount && (
          <span
            className={`${sizeConfig.counter} tabular-nums font-medium`}
            style={{ color: `#${color}` }}
          >
            {currentIndex + 1} / {displayCards.length}
          </span>
        )}

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
      </div>
    </div>
  );
}
