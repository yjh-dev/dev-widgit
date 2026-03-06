"use client";

import { useState } from "react";
import { calculateProgress, formatMl, formatTotalMl } from "@/lib/water-tracker";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { useCelebration } from "@/hooks/useCelebration";
import Celebration from "@/components/widget/Celebration";

const FONT_SIZE_MAP: Record<FontSizeKey, { title: string; progress: string; label: string }> = {
  sm: { title: "text-sm", progress: "text-xs", label: "text-xs" },
  md: { title: "text-base", progress: "text-sm", label: "text-xs" },
  lg: { title: "text-lg", progress: "text-sm", label: "text-sm" },
  xl: { title: "text-xl", progress: "text-base", label: "text-sm" },
};

function GlassIcon({ filled, color, size }: { filled: boolean; color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      {filled ? (
        <>
          <path
            d="M8 6 L10 34 Q10 36 12 36 L28 36 Q30 36 30 34 L32 6 Z"
            fill={`#${color}`}
            opacity="0.9"
          />
          <path
            d="M8 6 L10 34 Q10 36 12 36 L28 36 Q30 36 30 34 L32 6 Z"
            fill="none"
            stroke={`#${color}`}
            strokeWidth="1.5"
          />
          {/* Water ripple highlights */}
          <ellipse cx="20" cy="14" rx="8" ry="2" fill="white" opacity="0.3" />
        </>
      ) : (
        <path
          d="M8 6 L10 34 Q10 36 12 36 L28 36 Q30 36 30 34 L32 6 Z"
          fill="none"
          stroke={`#${color}`}
          strokeWidth="1.5"
          opacity="0.3"
          strokeDasharray="3 2"
        />
      )}
    </svg>
  );
}

interface WaterTrackerPreviewProps {
  goal?: number;
  glassSize?: number;
  color?: string;
  showMl?: boolean;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  celebrate?: boolean;
}

export default function WaterTrackerPreview({
  goal = 8,
  glassSize = 250,
  color = "3B82F6",
  showMl = true,
  textColor = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  celebrate = true,
}: WaterTrackerPreviewProps) {
  const [filled, setFilled] = useState(0);

  const handleGlassClick = (index: number) => {
    // Toggle: if clicking the last filled glass, unfill it; otherwise fill up to that glass
    if (index + 1 === filled) {
      setFilled(index);
    } else {
      setFilled(index + 1);
    }
  };

  const pct = calculateProgress(filled, goal);
  const showCelebration = useCelebration(filled >= goal, celebrate);
  const sizeConfig = FONT_SIZE_MAP[fontSize];
  const iconSize = fontSize === "sm" ? 32 : fontSize === "xl" ? 44 : 38;

  // Grid columns: max 4 per row
  const cols = Math.min(goal, 4);

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center gap-3"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <Celebration active={showCelebration} color={color} />
      {/* Title */}
      <p
        className={`${sizeConfig.title} font-bold`}
        style={{ color: `#${textColor}` }}
      >
        💧 물 마시기
      </p>

      {/* Glass grid */}
      <div
        className="grid gap-1.5 justify-center"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${iconSize}px)`,
        }}
      >
        {Array.from({ length: goal }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleGlassClick(i)}
            className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
            aria-label={`${i + 1}잔${i < filled ? " (완료)" : ""}`}
            title={`${i + 1}잔`}
          >
            <GlassIcon filled={i < filled} color={color} size={iconSize} />
          </button>
        ))}
      </div>

      {/* Progress text */}
      <p
        className={`${sizeConfig.progress} font-medium tabular-nums`}
        style={{ color: `#${textColor}` }}
      >
        {filled}/{goal}잔
        {showMl && (
          <span className="opacity-60">
            {" "}({formatMl(filled, glassSize)} / {formatTotalMl(goal, glassSize)})
          </span>
        )}
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-[240px]">
        <div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: `#${color}20` }}
        >
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${pct}%`,
              backgroundColor: `#${color}`,
            }}
          />
        </div>
        <p
          className={`${sizeConfig.label} text-center mt-1 tabular-nums opacity-50`}
          style={{ color: `#${textColor}` }}
        >
          {pct.toFixed(0)}%
        </p>
      </div>
    </div>
  );
}
