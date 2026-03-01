"use client";

import { useEffect, useState, startTransition } from "react";
import {
  getClockTime,
  getClockDate,
  type ClockFormat,
  type ClockDateFormat,
  type ClockTime,
} from "@/lib/clock";
import { resolveFontStyle } from "@/lib/fonts";
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
  font?: string;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  showSeconds?: boolean;
  showDate?: boolean;
  blink?: boolean;
  dateColor?: string;
  dateFmt?: ClockDateFormat;
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
  dateColor = "",
  dateFmt = "kr",
}: ClockPreviewProps) {
  const [time, setTime] = useState<ClockTime>(() =>
    getClockTime(timezone, format),
  );
  const [dateStr, setDateStr] = useState(() =>
    showDate ? getClockDate(timezone, dateFmt) : "",
  );

  useEffect(() => {
    startTransition(() => {
      setTime(getClockTime(timezone, format));
      if (showDate) setDateStr(getClockDate(timezone, dateFmt));
    });
    const interval = setInterval(() => {
      setTime(getClockTime(timezone, format));
      if (showDate) setDateStr(getClockDate(timezone, dateFmt));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone, format, showDate, dateFmt]);

  const sizeClass = FONT_SIZE_MAP[fontSize];
  const ampmClass = AMPM_SIZE_MAP[fontSize];
  const colonClass = blink ? `${sizeClass} font-light animate-pulse` : `${sizeClass} font-light`;

  const fontStyle = resolveFontStyle(font);
  const resolvedDateColor = dateColor || color;

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        fontFamily: fontStyle.fontFamily,
        borderRadius,
        padding,
      }}
    >
      <div className="flex items-baseline gap-1" style={{ color: `#${color}` }} aria-label={`${time.hours}:${time.minutes}${showSeconds ? `:${time.seconds}` : ""}${time.ampm ? ` ${time.ampm}` : ""}`}>
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
        <p className="text-sm opacity-50 mt-2" style={{ color: `#${resolvedDateColor}` }}>
          {dateStr}
        </p>
      )}
    </div>
  );
}
