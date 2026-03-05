"use client";

import { calculateGpaProgress, type GpaStyle } from "@/lib/gpa-calculator";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";
import { GraduationCap } from "lucide-react";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
  xl: "text-6xl",
};

const BAR_HEIGHT = "h-3";

interface GpaCalculatorPreviewProps {
  current?: number;
  max?: number;
  target?: number;
  style?: GpaStyle;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

export default function GpaCalculatorPreview({
  current = 3.5,
  max = 4.5,
  target = 4.5,
  style = "ring",
  color = "6366F1",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
}: GpaCalculatorPreviewProps) {
  const { percentage, grade } = calculateGpaProgress(current, max);
  const pct = Math.min(percentage, 100);
  const resolvedTextColor = textColor || color;
  const circumference = 2 * Math.PI * 54;
  const fontStyle = resolveFontStyle(font);
  const targetPct = Math.min((target / max) * 100, 100);

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      <GraduationCap
        size={20}
        className="mb-1 opacity-60"
        style={{ color: `#${resolvedTextColor}` }}
      />

      {style === "ring" ? (
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 120 120" width={120} height={120}>
            <circle
              cx="60" cy="60" r="54"
              fill="none" stroke={`#${color}20`} strokeWidth="8"
            />
            {/* Target line */}
            {target < max && (
              <circle
                cx="60" cy="60" r="54"
                fill="none" stroke={`#${color}40`} strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - targetPct / 100)}
                transform="rotate(-90 60 60)"
              />
            )}
            <circle
              cx="60" cy="60" r="54"
              fill="none" stroke={`#${color}`} strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - pct / 100)}
              transform="rotate(-90 60 60)"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p
              className="text-lg font-bold tabular-nums"
              style={{ color: `#${resolvedTextColor}` }}
            >
              {current.toFixed(2)}
            </p>
            <span
              className="text-xs font-semibold px-1.5 py-0.5 rounded-full mt-0.5"
              style={{
                backgroundColor: `#${color}20`,
                color: `#${color}`,
              }}
            >
              {grade}
            </span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-baseline gap-2 mb-4">
            <p
              className={`${FONT_SIZE_MAP[fontSize]} font-bold tabular-nums`}
              style={{ color: `#${resolvedTextColor}` }}
            >
              {current.toFixed(2)}
            </p>
            <span
              className="text-sm font-semibold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `#${color}20`,
                color: `#${color}`,
              }}
            >
              {grade}
            </span>
          </div>
          <div className="w-full max-w-[260px]">
            <div
              className={`w-full ${BAR_HEIGHT} rounded-full overflow-hidden`}
              style={{ backgroundColor: `#${color}20` }}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  backgroundColor: `#${color}`,
                }}
              />
            </div>
          </div>
        </>
      )}

      <p
        className="text-xs font-medium mt-2 opacity-50"
        style={{ color: `#${resolvedTextColor}` }}
      >
        {current.toFixed(2)} / {max.toFixed(1)}
      </p>
    </div>
  );
}
