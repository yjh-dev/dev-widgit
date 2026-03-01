"use client";

import { calculateGoalProgress, type GoalStyle } from "@/lib/goal";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
  xl: "text-6xl",
};

const BAR_HEIGHT = "h-3";

interface GoalPreviewProps {
  title?: string;
  current?: number;
  target?: number;
  unit?: string;
  style?: GoalStyle;
  showValue?: boolean;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

export default function GoalPreview({
  title = "",
  current = 0,
  target = 100,
  unit = "",
  style = "bar",
  showValue = true,
  color = "2563EB",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
}: GoalPreviewProps) {
  const { percentage } = calculateGoalProgress(current, target);
  const pct = Math.min(percentage, 100);
  const resolvedTextColor = textColor || color;
  const circumference = 2 * Math.PI * 54;
  const fontStyle = resolveFontStyle(font);

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
      {title && (
        <p
          className="text-sm font-medium mb-1 opacity-70"
          style={{ color: `#${resolvedTextColor}` }}
        >
          {title}
        </p>
      )}

      {style === "ring" ? (
        <div className="relative flex items-center justify-center">
          <svg viewBox="0 0 120 120" width={120} height={120}>
            <circle
              cx="60" cy="60" r="54"
              fill="none" stroke={`#${color}20`} strokeWidth="8"
            />
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
              {pct.toFixed(1)}%
            </p>
          </div>
        </div>
      ) : (
        <>
          <p
            className={`${FONT_SIZE_MAP[fontSize]} font-bold tabular-nums mb-4`}
            style={{ color: `#${resolvedTextColor}` }}
          >
            {pct.toFixed(1)}%
          </p>
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

      {showValue && (
        <p
          className="text-xs font-medium mt-2 opacity-50"
          style={{ color: `#${resolvedTextColor}` }}
        >
          {current} / {target}{unit ? ` ${unit}` : ""}
        </p>
      )}
    </div>
  );
}
