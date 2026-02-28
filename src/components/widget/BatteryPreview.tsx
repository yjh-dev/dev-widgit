"use client";

import { clampLevel, getBatteryColor } from "@/lib/battery";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const BATTERY_WIDTH_MAP: Record<FontSizeKey, number> = {
  sm: 120,
  md: 160,
  lg: 200,
  xl: 240,
};

const BATTERY_HEIGHT_MAP: Record<FontSizeKey, number> = {
  sm: 56,
  md: 72,
  lg: 88,
  xl: 104,
};

interface BatteryPreviewProps {
  level?: number;
  label?: string;
  showPercent?: boolean;
  animate?: boolean;
  autoColor?: boolean;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function BatteryPreview({
  level = 75,
  label = "",
  showPercent = true,
  animate = false,
  autoColor = true,
  color = "22C55E",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: BatteryPreviewProps) {
  const clamped = clampLevel(level);
  const fillColor = autoColor ? getBatteryColor(clamped) : color;
  const resolvedTextColor = textColor || fillColor;

  const bw = BATTERY_WIDTH_MAP[fontSize];
  const bh = BATTERY_HEIGHT_MAP[fontSize];
  const bodyRadius = Math.min(bh * 0.15, 12);
  const termW = bw * 0.04;
  const termH = bh * 0.35;
  const fillPad = 4;
  const fillMaxW = bw - fillPad * 2;
  const fillW = fillMaxW * (clamped / 100);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      {/* Battery SVG */}
      <div className="relative" style={{ width: bw + termW + 2, height: bh }}>
        <svg
          width={bw + termW + 2}
          height={bh}
          viewBox={`0 0 ${bw + termW + 2} ${bh}`}
          fill="none"
        >
          {/* Battery body outline */}
          <rect
            x={0.5}
            y={0.5}
            width={bw - 1}
            height={bh - 1}
            rx={bodyRadius}
            ry={bodyRadius}
            stroke={`#${fillColor}`}
            strokeWidth={2}
            fill="none"
            strokeOpacity={0.3}
          />
          {/* Terminal nub */}
          <rect
            x={bw + 1}
            y={(bh - termH) / 2}
            width={termW}
            height={termH}
            rx={termW / 2}
            fill={`#${fillColor}`}
            fillOpacity={0.4}
          />
          {/* Fill */}
          <rect
            x={fillPad}
            y={fillPad}
            width={Math.max(0, fillW)}
            height={bh - fillPad * 2}
            rx={Math.max(0, bodyRadius - 2)}
            ry={Math.max(0, bodyRadius - 2)}
            fill={`#${fillColor}`}
          >
            {animate && (
              <animate
                attributeName="opacity"
                values="1;0.5;1"
                dur="1.5s"
                repeatCount="indefinite"
              />
            )}
          </rect>
        </svg>

        {/* Percentage text inside battery */}
        {showPercent && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ width: bw }}
          >
            <span
              className={`${FONT_SIZE_MAP[fontSize]} font-bold tabular-nums`}
              style={{
                color: clamped > 45 ? `#${bg === "FFFFFF" && !transparentBg ? "FFFFFF" : resolvedTextColor}` : `#${resolvedTextColor}`,
                textShadow: clamped > 45 ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
              }}
            >
              {clamped}%
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      {label && (
        <p
          className={`${LABEL_SIZE_MAP[fontSize]} font-medium mt-2 opacity-70`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          {label}
        </p>
      )}
    </div>
  );
}
