"use client";

import { differenceInDays, format, isValid, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

interface DdayWidgetPreviewProps {
  title: string;
  targetDate: string;
  bgColor: string;
  textColor: string;
}

export default function DdayWidgetPreview({
  title,
  targetDate,
  bgColor,
  textColor,
}: DdayWidgetPreviewProps) {
  const parsed = targetDate ? parseISO(targetDate) : null;
  const isValidDate = parsed && isValid(parsed);

  const dday = isValidDate
    ? differenceInDays(parsed, new Date())
    : null;

  const ddayLabel =
    dday === null
      ? "날짜를 선택하세요"
      : dday === 0
        ? "D-Day"
        : dday > 0
          ? `D-${dday}`
          : `D+${Math.abs(dday)}`;

  const formattedDate = isValidDate
    ? format(parsed, "yyyy.MM.dd (EEE)", { locale: ko })
    : "";

  return (
    <div
      className="flex flex-col items-center justify-center rounded-2xl p-8 w-[320px] h-[200px] shadow-lg transition-colors"
      style={{
        backgroundColor: `#${bgColor}`,
        color: `#${textColor}`,
      }}
    >
      <p className="text-sm font-medium opacity-70 mb-1">{title}</p>
      <p className="text-5xl font-extrabold tracking-tight">{ddayLabel}</p>
      {formattedDate && (
        <p className="text-xs opacity-50 mt-3">{formattedDate}</p>
      )}
    </div>
  );
}
