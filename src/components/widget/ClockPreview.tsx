"use client";

import { useEffect, useState } from "react";
import {
  getClockTime,
  getClockDate,
  FONT_FAMILY_MAP,
  type ClockFormat,
  type ClockFont,
  type ClockTime,
} from "@/lib/clock";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-3xl",
  md: "text-5xl",
  lg: "text-6xl",
  xl: "text-7xl",
};

const AMPM_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
};

interface ClockPreviewProps {
  timezone?: string;
  format?: ClockFormat;
  font?: ClockFont;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  showSeconds?: boolean;
  showDate?: boolean;
  blink?: boolean;
}

export default function ClockPreview({
  timezone = "Asia/Seoul",
  format = "24h",
  font = "mono",
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  showSeconds = true,
  showDate = false,
  blink = true,
}: ClockPreviewProps) {
  const [time, setTime] = useState<ClockTime>(() =>
    getClockTime(timezone, format),
  );
  const [dateStr, setDateStr] = useState(() =>
    showDate ? getClockDate(timezone) : "",
  );

  useEffect(() => {
    setTime(getClockTime(timezone, format));
    if (showDate) setDateStr(getClockDate(timezone));
    const interval = setInterval(() => {
      setTime(getClockTime(timezone, format));
      if (showDate) setDateStr(getClockDate(timezone));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone, format, showDate]);

  const sizeClass = FONT_SIZE_MAP[fontSize];
  const ampmClass = AMPM_SIZE_MAP[fontSize];
  const colonClass = blink ? `${sizeClass} font-light animate-pulse` : `${sizeClass} font-light`;

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        fontFamily: FONT_FAMILY_MAP[font],
        borderRadius,
        padding,
      }}
    >
      <div className="flex items-baseline gap-1" style={{ color: `#${color}` }}>
        <span className={`${sizeClass} font-light tracking-tight tabular-nums`}>
          {time.hours}
        </span>
        <span className={colonClass}>:</span>
        <span className={`${sizeClass} font-light tracking-tight tabular-nums`}>
          {time.minutes}
        </span>
        {showSeconds && (
          <>
            <span className={colonClass}>:</span>
            <span className={`${sizeClass} font-light tracking-tight tabular-nums`}>
              {time.seconds}
            </span>
          </>
        )}
        {time.ampm && (
          <span className={`${ampmClass} font-medium ml-1 opacity-60`}>
            {time.ampm}
          </span>
        )}
      </div>
      {showDate && dateStr && (
        <p className="text-sm opacity-50 mt-2" style={{ color: `#${color}` }}>
          {dateStr}
        </p>
      )}
    </div>
  );
}
