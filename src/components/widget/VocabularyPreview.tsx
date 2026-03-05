"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { BUILTIN_WORDS, getWordByMode, type VocabWord, type VocabMode } from "@/lib/vocabulary";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const FONT_SIZE_MAP: Record<FontSizeKey, { word: string; meaning: string; label: string }> = {
  sm: { word: "text-lg", meaning: "text-sm", label: "text-xs" },
  md: { word: "text-2xl", meaning: "text-base", label: "text-xs" },
  lg: { word: "text-3xl", meaning: "text-lg", label: "text-sm" },
  xl: { word: "text-4xl", meaning: "text-xl", label: "text-sm" },
};

const MODE_LABELS: Record<VocabMode, string> = {
  daily: "오늘의 단어",
  random: "랜덤",
  sequential: "순서대로",
};

interface VocabularyPreviewProps {
  words?: VocabWord[];
  mode?: VocabMode;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

export default function VocabularyPreview({
  words = [],
  mode = "daily",
  color = "7C3AED",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
}: VocabularyPreviewProps) {
  const activeWords = words.length > 0 ? words : BUILTIN_WORDS;
  const [index, setIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState<VocabWord>({ word: "", meaning: "" });

  const updateWord = useCallback(() => {
    const w = getWordByMode(activeWords, mode, index);
    setCurrentWord(w);
  }, [activeWords, mode, index]);

  useEffect(() => {
    startTransition(() => updateWord());
  }, [updateWord]);

  const handlePrev = () => {
    const newIdx = (index - 1 + activeWords.length) % activeWords.length;
    setIndex(newIdx);
  };

  const handleNext = () => {
    const newIdx = (index + 1) % activeWords.length;
    setIndex(newIdx);
  };

  const handleRandom = () => {
    const w = activeWords[Math.floor(Math.random() * activeWords.length)];
    setCurrentWord(w);
  };

  const resolvedTextColor = textColor || (color === "FFFFFF" ? "1E1E1E" : color);
  const sizeConfig = FONT_SIZE_MAP[fontSize];
  const fontStyle = resolveFontStyle(font);

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-4 ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      {/* Word */}
      <div className="text-center space-y-2">
        <p
          className={`${sizeConfig.word} font-bold`}
          style={{ color: `#${color}` }}
        >
          {currentWord.word || "-"}
        </p>
        <p
          className={`${sizeConfig.meaning}`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          {currentWord.meaning || "-"}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {mode === "sequential" && (
          <button
            type="button"
            onClick={handlePrev}
            aria-label="이전 단어"
            className="p-1.5 rounded-md transition-colors hover:opacity-70"
            style={{ color: `#${color}` }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {mode === "random" && (
          <button
            type="button"
            onClick={handleRandom}
            aria-label="랜덤 단어"
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:opacity-80 active:scale-95 inline-flex items-center gap-1.5"
            style={{ backgroundColor: `#${color}`, color: `#${bg}` }}
          >
            <Shuffle className="w-3.5 h-3.5" />
            다음
          </button>
        )}

        {mode === "sequential" && (
          <button
            type="button"
            onClick={handleNext}
            aria-label="다음 단어"
            className="p-1.5 rounded-md transition-colors hover:opacity-70"
            style={{ color: `#${color}` }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mode indicator */}
      <p
        className={`${sizeConfig.label} opacity-50`}
        style={{ color: `#${resolvedTextColor}` }}
      >
        {MODE_LABELS[mode]} ({activeWords.length}개)
      </p>
    </div>
  );
}
