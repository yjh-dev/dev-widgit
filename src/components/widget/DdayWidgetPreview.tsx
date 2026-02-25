"use client";

import { useEffect, useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { calculateDday, calculateDdayWithTime, calculateProgress } from "@/lib/dday";
import { fontMap, type FontKey } from "@/lib/fonts";
import type { FontSizeKey } from "@/lib/common-widget-options";
import DdayProgressBar from "./DdayProgressBar";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-3xl",
  md: "text-5xl",
  lg: "text-6xl",
  xl: "text-7xl",
};

interface DdayWidgetPreviewProps {
  title: string;
  targetDate: string;
  bgColor: string;
  textColor: string;
  calcType?: "down" | "up";
  isAnnual?: boolean;
  layout?: "default" | "progress";
  startDate?: string;
  isTransparent?: boolean;
  font?: FontKey;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  showTime?: boolean;
  blink?: boolean;
  doneMsg?: string;
}

export default function DdayWidgetPreview({
  title,
  targetDate,
  bgColor,
  textColor,
  calcType = "down",
  isAnnual = false,
  layout = "default",
  startDate = "",
  isTransparent = false,
  font = "noto-sans-kr",
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  showTime = false,
  blink = true,
  doneMsg = "",
}: DdayWidgetPreviewProps) {
  const { dday, ddayLabel, effectiveDate } = calculateDday(
    targetDate,
    calcType,
    isAnnual,
  );

  const [timeResult, setTimeResult] = useState(() =>
    showTime ? calculateDdayWithTime(targetDate, isAnnual) : null,
  );

  useEffect(() => {
    if (!showTime) {
      setTimeResult(null);
      return;
    }
    setTimeResult(calculateDdayWithTime(targetDate, isAnnual));
    const interval = setInterval(() => {
      setTimeResult(calculateDdayWithTime(targetDate, isAnnual));
    }, 1000);
    return () => clearInterval(interval);
  }, [showTime, targetDate, isAnnual]);

  const parsed = effectiveDate ? parseISO(effectiveDate) : null;
  const formattedDate =
    parsed && isValid(parsed)
      ? format(parsed, "yyyy.MM.dd (EEE)", { locale: ko })
      : "";

  const showProgress = layout === "progress";
  const percentage = showProgress
    ? calculateProgress(startDate, effectiveDate)
    : 0;

  const fontClassName = fontMap[font]?.className ?? fontMap["noto-sans-kr"].className;

  const isDone = dday !== null && dday <= 0 && calcType === "down";
  const displayLabel = isDone && doneMsg ? doneMsg : ddayLabel;

  const colonClass = blink ? "animate-pulse" : "";

  return (
    <div
      className={`flex flex-col items-center justify-center w-[320px] ${showProgress ? "min-h-[240px]" : "min-h-[200px]"} transition-colors ${fontClassName}`}
      style={{
        backgroundColor: isTransparent ? "transparent" : `#${bgColor}`,
        color: `#${textColor}`,
        boxShadow: isTransparent ? "none" : undefined,
        borderRadius,
        padding,
      }}
    >
      <p className="text-sm font-medium opacity-70 mb-1">{title}</p>
      <p className={`${FONT_SIZE_MAP[fontSize]} font-extrabold tracking-tight`}>
        {displayLabel}
      </p>
      {showTime && timeResult && (
        <p className="text-lg font-light tabular-nums mt-1 opacity-80" style={{ fontFamily: "ui-monospace, SFMono-Regular, monospace" }}>
          {timeResult.hours}
          <span className={colonClass}>:</span>
          {timeResult.minutes}
          <span className={colonClass}>:</span>
          {timeResult.seconds}
        </p>
      )}
      {formattedDate && (
        <p className="text-xs opacity-50 mt-3">{formattedDate}</p>
      )}
      {showProgress && (
        <DdayProgressBar percentage={percentage} textColor={textColor} />
      )}
    </div>
  );
}
