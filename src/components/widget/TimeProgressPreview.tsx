"use client";

import { useEffect, useState, startTransition } from "react";
import {
  calculateTimeProgress,
  type ProgressType,
  type WeekStart,
} from "@/lib/time-progress";
import type { FontSizeKey } from "@/lib/common-widget-options";

export type BarStyle = "bar" | "ring";
export type BarHeight = "thin" | "default" | "thick";
export type RingSize = "sm" | "md" | "lg";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
  xl: "text-6xl",
};

const BAR_HEIGHT_MAP: Record<BarHeight, string> = {
  thin: "h-1.5",
  default: "h-3",
  thick: "h-5",
};

const RING_SIZE_MAP: Record<RingSize, number> = {
  sm: 80,
  md: 120,
  lg: 160,
};

interface TimeProgressPreviewProps {
  type?: ProgressType;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  style?: BarStyle;
  showLabel?: boolean;
  showPercent?: boolean;
  barHeight?: BarHeight;
  textColor?: string;
  weekStart?: WeekStart;
  ringSize?: RingSize;
  showRemain?: boolean;
}

export default function TimeProgressPreview({
  type = "day",
  color = "2563EB",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  style = "bar",
  showLabel = true,
  showPercent = true,
  barHeight = "default",
  textColor = "",
  weekStart = "sun",
  ringSize = "md",
  showRemain = false,
}: TimeProgressPreviewProps) {
  const [progress, setProgress] = useState(() => calculateTimeProgress(type, weekStart));

  useEffect(() => {
    startTransition(() => setProgress(calculateTimeProgress(type, weekStart)));
    const interval = setInterval(() => {
      setProgress(calculateTimeProgress(type, weekStart));
    }, 1000);
    return () => clearInterval(interval);
  }, [type, weekStart]);

  const pct = Math.min(progress.percentage, 100);
  const resolvedTextColor = textColor || color;
  const ringSizePx = RING_SIZE_MAP[ringSize];
  const circumference = 2 * Math.PI * 54;

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      {style === "ring" ? (
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 120 120" width={ringSizePx} height={ringSizePx} role="img" aria-label={`${progress.label} ${pct.toFixed(1)}%`}>
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={`#${color}20`}
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={`#${color}`}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - pct / 100)}
              transform="rotate(-90 60 60)"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {showLabel && (
              <p
                className="text-xs font-medium opacity-70"
                style={{ color: `#${resolvedTextColor}` }}
              >
                {progress.label}
              </p>
            )}
            {showPercent && (
              <p
                className="text-lg font-bold tabular-nums"
                style={{ color: `#${resolvedTextColor}` }}
              >
                {pct.toFixed(1)}%
              </p>
            )}
          </div>
        </div>
      ) : (
        <>
          {showLabel && (
            <p
              className="text-sm font-medium mb-1 opacity-70"
              style={{ color: `#${resolvedTextColor}` }}
            >
              {progress.label}
            </p>
          )}
          {showPercent && (
            <p
              className={`${FONT_SIZE_MAP[fontSize]} font-bold tabular-nums mb-4`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              {pct.toFixed(1)}%
            </p>
          )}
          <div className="w-full max-w-[260px]">
            <div
              className={`w-full ${BAR_HEIGHT_MAP[barHeight]} rounded-full overflow-hidden`}
              style={{ backgroundColor: `#${color}20` }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${pct}%`,
                  backgroundColor: `#${color}`,
                }}
              />
            </div>
          </div>
        </>
      )}
      {showRemain && (
        <p
          className="text-xs font-medium mt-2 opacity-50"
          style={{ color: `#${resolvedTextColor}` }}
        >
          {progress.remaining} 남음
        </p>
      )}
    </div>
  );
}
