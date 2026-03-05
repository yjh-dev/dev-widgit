"use client";

import { useState, useEffect } from "react";
import { resolveFontStyle } from "@/lib/fonts";
import { getNextEvent } from "@/lib/season-countdown";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, { emoji: string; name: string; dday: string; date: string }> = {
  sm: { emoji: "text-3xl", name: "text-sm", dday: "text-2xl", date: "text-xs" },
  md: { emoji: "text-4xl", name: "text-base", dday: "text-3xl", date: "text-sm" },
  lg: { emoji: "text-5xl", name: "text-lg", dday: "text-4xl", date: "text-base" },
  xl: { emoji: "text-6xl", name: "text-xl", dday: "text-5xl", date: "text-lg" },
};

interface SeasonCountdownPreviewProps {
  showIcon?: boolean;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

export default function SeasonCountdownPreview({
  showIcon = true,
  color = "2563EB",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
}: SeasonCountdownPreviewProps) {
  const [nextEvent, setNextEvent] = useState(() => getNextEvent());

  useEffect(() => {
    // Update every minute
    const timer = setInterval(() => {
      setNextEvent(getNextEvent());
    }, 60_000);
    return () => clearInterval(timer);
  }, []);

  const effectiveTextColor = textColor || color;
  const sizeConfig = FONT_SIZE_MAP[fontSize];
  const fontStyle = resolveFontStyle(font);

  const formatDate = (d: Date) => {
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    return `${y}. ${m}. ${day}.`;
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-2 ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      {showIcon && (
        <span className={`${sizeConfig.emoji} leading-none`}>
          {nextEvent.event.emoji}
        </span>
      )}

      <p
        className={`${sizeConfig.name} font-medium`}
        style={{ color: `#${effectiveTextColor}` }}
      >
        {nextEvent.event.name}
      </p>

      <p
        className={`${sizeConfig.dday} font-bold`}
        style={{ color: `#${color}` }}
      >
        {nextEvent.daysLeft === 0 ? "D-Day" : `D-${nextEvent.daysLeft}`}
      </p>

      <p
        className={`${sizeConfig.date} opacity-60`}
        style={{ color: `#${effectiveTextColor}` }}
      >
        {formatDate(nextEvent.targetDate)}
      </p>
    </div>
  );
}
