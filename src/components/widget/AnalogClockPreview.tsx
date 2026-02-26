"use client";

import { useEffect, useState } from "react";
import {
  getHandAngles,
  getQuarterNumbers,
  getAllNumbers,
  getTickMarks,
  type NumberStyle,
  type HandAngles,
} from "@/lib/analog-clock";
import type { FontSizeKey } from "@/lib/common-widget-options";

const CLOCK_SIZE_MAP: Record<FontSizeKey, number> = {
  sm: 140,
  md: 180,
  lg: 220,
  xl: 260,
};

interface AnalogClockPreviewProps {
  timezone?: string;
  showNumbers?: boolean;
  numStyle?: NumberStyle;
  showSeconds?: boolean;
  showTicks?: boolean;
  showBorder?: boolean;
  handColor?: string;
  secHandColor?: string;
  faceColor?: string;
  tickColor?: string;
  borderColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function AnalogClockPreview({
  timezone = "Asia/Seoul",
  showNumbers = true,
  numStyle = "quarter",
  showSeconds = true,
  showTicks = true,
  showBorder = true,
  handColor = "1E1E1E",
  secHandColor = "E11D48",
  faceColor = "FFFFFF",
  tickColor = "999999",
  borderColor = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: AnalogClockPreviewProps) {
  const [angles, setAngles] = useState<HandAngles>(() => getHandAngles(timezone));

  useEffect(() => {
    setAngles(getHandAngles(timezone));
    const interval = setInterval(() => {
      setAngles(getHandAngles(timezone));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  const numbers = showNumbers
    ? numStyle === "all" ? getAllNumbers() : getQuarterNumbers()
    : [];

  const ticks = showTicks ? getTickMarks() : [];
  const size = CLOCK_SIZE_MAP[fontSize];

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
      >
        {/* Face */}
        <circle
          cx="100"
          cy="100"
          r="96"
          fill={`#${faceColor}`}
          stroke={showBorder ? `#${borderColor}` : "none"}
          strokeWidth={showBorder ? 3 : 0}
        />

        {/* Ticks */}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={`#${tickColor}`}
            strokeWidth={t.isHour ? 2 : 1}
          />
        ))}

        {/* Numbers */}
        {numbers.map((n) => (
          <text
            key={n.num}
            x={n.x}
            y={n.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill={`#${handColor}`}
            fontSize="14"
            fontWeight="600"
          >
            {n.num}
          </text>
        ))}

        {/* Hour hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="40"
          stroke={`#${handColor}`}
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${angles.hour} 100 100)`}
        />

        {/* Minute hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="25"
          stroke={`#${handColor}`}
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${angles.minute} 100 100)`}
        />

        {/* Second hand */}
        {showSeconds && (
          <line
            x1="100"
            y1="115"
            x2="100"
            y2="20"
            stroke={`#${secHandColor}`}
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${angles.second} 100 100)`}
          />
        )}

        {/* Center dot */}
        <circle cx="100" cy="100" r="4" fill={`#${handColor}`} />
        {showSeconds && (
          <circle cx="100" cy="100" r="2" fill={`#${secHandColor}`} />
        )}
      </svg>
    </div>
  );
}
