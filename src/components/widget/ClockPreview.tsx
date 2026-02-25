"use client";

import { useEffect, useState } from "react";
import {
  getClockTime,
  FONT_FAMILY_MAP,
  type ClockFormat,
  type ClockFont,
  type ClockTime,
} from "@/lib/clock";

interface ClockPreviewProps {
  timezone?: string;
  format?: ClockFormat;
  font?: ClockFont;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
}

export default function ClockPreview({
  timezone = "Asia/Seoul",
  format = "24h",
  font = "mono",
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
}: ClockPreviewProps) {
  const [time, setTime] = useState<ClockTime>(() =>
    getClockTime(timezone, format),
  );

  useEffect(() => {
    setTime(getClockTime(timezone, format));
    const interval = setInterval(() => {
      setTime(getClockTime(timezone, format));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezone, format]);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        fontFamily: FONT_FAMILY_MAP[font],
      }}
    >
      <div className="flex items-baseline gap-1" style={{ color: `#${color}` }}>
        <span className="text-5xl font-light tracking-tight tabular-nums">
          {time.hours}
        </span>
        <span className="text-5xl font-light animate-pulse">:</span>
        <span className="text-5xl font-light tracking-tight tabular-nums">
          {time.minutes}
        </span>
        <span className="text-5xl font-light animate-pulse">:</span>
        <span className="text-5xl font-light tracking-tight tabular-nums">
          {time.seconds}
        </span>
        {time.ampm && (
          <span className="text-lg font-medium ml-1 opacity-60">
            {time.ampm}
          </span>
        )}
      </div>
    </div>
  );
}
