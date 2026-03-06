"use client";

import { useEffect, useState, startTransition } from "react";
import {
  getWorldClockTime,
  getWorldClockDate,
  getTimezoneLabel,
  getTimezoneShort,
} from "@/lib/world-clock";
import type { WorldClockFormat } from "@/lib/world-clock";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const TIME_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-base",
};

const SHORT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-[9px]",
  md: "text-[10px]",
  lg: "text-xs",
  xl: "text-sm",
};

interface WorldClockPreviewProps {
  zones?: string[];
  labels?: string[];
  format?: WorldClockFormat;
  showLabel?: boolean;
  showSeconds?: boolean;
  showDate?: boolean;
  color?: string;
  textColor?: string;
  font?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function WorldClockPreview({
  zones = ["Asia/Seoul", "America/New_York"],
  labels = [],
  format = "24h",
  showLabel = true,
  showSeconds = false,
  showDate = false,
  color = "1E1E1E",
  textColor = "",
  font = "mono",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: WorldClockPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [times, setTimes] = useState<
    { hours: string; minutes: string; seconds: string; ampm: string }[]
  >([]);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
      setTimes(zones.map((tz) => getWorldClockTime(tz, format)));
      if (showDate) setDates(zones.map((tz) => getWorldClockDate(tz)));
    });
    const id = setInterval(() => {
      setTimes(zones.map((tz) => getWorldClockTime(tz, format)));
      if (showDate) setDates(zones.map((tz) => getWorldClockDate(tz)));
    }, 1000);
    return () => clearInterval(id);
  }, [zones, format, showDate]);

  const resolvedTextColor = textColor || color;
  const fontStyle = resolveFontStyle(font);

  if (!mounted) return <div className="w-full h-full" />;

  return (
    <div
      className={`w-full h-full flex items-center justify-center ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        color: `#${resolvedTextColor}`,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      <div className="flex items-stretch justify-center gap-0 w-full">
        {zones.map((tz, idx) => {
          const t = times[idx];
          if (!t) return null;
          const timeStr = showSeconds
            ? `${t.hours}:${t.minutes}:${t.seconds}`
            : `${t.hours}:${t.minutes}`;
          const customLabel = labels[idx];
          const displayLabel = customLabel || getTimezoneLabel(tz);
          return (
            <div key={tz + idx} className="flex items-stretch flex-1 min-w-0">
              {idx > 0 && (
                <div
                  className="w-px self-stretch shrink-0 mx-3"
                  style={{ backgroundColor: `#${resolvedTextColor}20` }}
                />
              )}
              <div className="flex flex-col items-center justify-center flex-1 min-w-0 gap-0.5">
                {showLabel && (
                  <span
                    className={`${LABEL_SIZE_MAP[fontSize]} font-medium truncate max-w-full`}
                    style={{ opacity: 0.7 }}
                  >
                    {displayLabel}
                  </span>
                )}
                <span
                  className={`${TIME_SIZE_MAP[fontSize]} font-bold tabular-nums whitespace-nowrap`}
                >
                  {timeStr}
                </span>
                {format === "12h" && t.ampm && (
                  <span
                    className={`${SHORT_SIZE_MAP[fontSize]} font-medium uppercase`}
                    style={{ opacity: 0.5 }}
                  >
                    {t.ampm}
                  </span>
                )}
                {showDate && dates[idx] && (
                  <span
                    className={`${SHORT_SIZE_MAP[fontSize]} tabular-nums`}
                    style={{ opacity: 0.4 }}
                  >
                    {dates[idx]}
                  </span>
                )}
                {showLabel && !showDate && (
                  <span
                    className={`${SHORT_SIZE_MAP[fontSize]} tabular-nums`}
                    style={{ opacity: 0.4 }}
                  >
                    {getTimezoneShort(tz)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
