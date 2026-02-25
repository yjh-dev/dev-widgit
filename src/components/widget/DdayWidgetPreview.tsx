"use client";

import { format, isValid, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { calculateDday, calculateProgress } from "@/lib/dday";
import { fontMap, type FontKey } from "@/lib/fonts";
import DdayProgressBar from "./DdayProgressBar";

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
}: DdayWidgetPreviewProps) {
  const { ddayLabel, effectiveDate } = calculateDday(
    targetDate,
    calcType,
    isAnnual,
  );

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

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl p-8 w-[320px] ${showProgress ? "h-[240px]" : "h-[200px]"} transition-colors ${fontClassName}`}
      style={{
        backgroundColor: isTransparent ? "transparent" : `#${bgColor}`,
        color: `#${textColor}`,
        boxShadow: isTransparent ? "none" : undefined,
      }}
    >
      <p className="text-sm font-medium opacity-70 mb-1">{title}</p>
      <p className="text-5xl font-extrabold tracking-tight">{ddayLabel}</p>
      {formattedDate && (
        <p className="text-xs opacity-50 mt-3">{formattedDate}</p>
      )}
      {showProgress && (
        <DdayProgressBar percentage={percentage} textColor={textColor} />
      )}
    </div>
  );
}
