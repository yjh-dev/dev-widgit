"use client";

import { useEffect, useState } from "react";
import {
  getWorldClockTime,
  getTimezoneLabel,
  getTimezoneShort,
} from "@/lib/world-clock";
import type { WorldClockFormat } from "@/lib/world-clock";
import type { FontSizeKey } from "@/lib/common-widget-options";

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
  format?: WorldClockFormat;
  showLabel?: boolean;
  showSeconds?: boolean;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function WorldClockPreview({
  zones = ["Asia/Seoul", "America/New_York"],
  format = "24h",
  showLabel = true,
  showSeconds = false,
  color = "1E1E1E",
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

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setTimes(zones.map((tz) => getWorldClockTime(tz, format)));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [zones, format]);

  if (!mounted) return <div className="w-full h-full" />;

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        color: `#${color}`,
      }}
    >
      <div className="flex items-stretch justify-center gap-0 w-full">
        {zones.map((tz, idx) => {
          const t = times[idx];
          if (!t) return null;
          const timeStr = showSeconds
            ? `${t.hours}:${t.minutes}:${t.seconds}`
            : `${t.hours}:${t.minutes}`;
          return (
            <div key={tz} className="flex items-stretch flex-1 min-w-0">
              {idx > 0 && (
                <div
                  className="w-px self-stretch shrink-0 mx-3"
                  style={{ backgroundColor: `#${color}20` }}
                />
              )}
              <div className="flex flex-col items-center justify-center flex-1 min-w-0 gap-0.5">
                {showLabel && (
                  <span
                    className={`${LABEL_SIZE_MAP[fontSize]} font-medium truncate max-w-full`}
                    style={{ opacity: 0.7 }}
                  >
                    {getTimezoneLabel(tz)}
                  </span>
                )}
                <span
                  className={`${TIME_SIZE_MAP[fontSize]} font-bold tabular-nums font-mono whitespace-nowrap`}
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
                {showLabel && (
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
