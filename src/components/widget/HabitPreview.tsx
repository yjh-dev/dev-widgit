"use client";

import { useState, useCallback } from "react";
import { Check } from "lucide-react";
import {
  getWeekDays,
  getMonthGrid,
  type HabitView,
} from "@/lib/habit";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface HabitPreviewProps {
  title?: string;
  view?: HabitView;
  weekStart?: "sun" | "mon";
  checkedDates?: Set<string>;
  interactive?: boolean;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function HabitPreview({
  title = "",
  view = "week",
  weekStart = "mon",
  checkedDates: externalChecked,
  interactive = true,
  color = "22C55E",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
}: HabitPreviewProps) {
  const [internalChecked, setInternalChecked] = useState<Set<string>>(
    () => externalChecked ?? new Set(),
  );

  const checked = externalChecked ?? internalChecked;

  const toggleDate = useCallback(
    (date: string) => {
      if (!interactive) return;
      setInternalChecked((prev) => {
        const next = new Set(prev);
        if (next.has(date)) next.delete(date);
        else next.add(date);
        return next;
      });
    },
    [interactive],
  );

  const days = view === "month" ? getMonthGrid() : getWeekDays(weekStart);
  const resolvedTextColor = textColor || color;

  const totalDays = days.filter((d) => d.isPast || d.isToday).length;
  const completedDays = days.filter(
    (d) => (d.isPast || d.isToday) && checked.has(d.date),
  ).length;

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      {title && (
        <p
          className="text-sm font-medium mb-3 opacity-70"
          style={{ color: `#${resolvedTextColor}` }}
        >
          {title}
        </p>
      )}

      {view === "week" ? (
        <div className="flex items-center gap-2">
          {days.map((day) => {
            const isChecked = checked.has(day.date);
            return (
              <button
                key={day.date}
                type="button"
                onClick={() => toggleDate(day.date)}
                className="flex flex-col items-center gap-1"
                style={{ pointerEvents: interactive ? "auto" : "none" }}
              >
                <span
                  className="text-xs opacity-50"
                  style={{ color: `#${resolvedTextColor}` }}
                >
                  {day.dayLabel}
                </span>
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${day.isToday ? "ring-2" : ""}`}
                  style={{
                    backgroundColor: isChecked ? `#${color}` : `#${color}18`,
                    ...(day.isToday ? { "--tw-ring-color": `#${color}` } as React.CSSProperties : {}),
                  }}
                >
                  {isChecked && <Check className="w-4 h-4 text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1.5 w-full max-w-[280px]">
          {days.map((day) => {
            const isChecked = checked.has(day.date);
            return (
              <button
                key={day.date}
                type="button"
                onClick={() => toggleDate(day.date)}
                className={`aspect-square rounded-md flex items-center justify-center text-xs transition-all ${day.isToday ? "ring-2" : ""}`}
                style={{
                  backgroundColor: isChecked ? `#${color}` : `#${color}18`,
                  color: isChecked ? "#FFFFFF" : `#${resolvedTextColor}`,
                  pointerEvents: interactive ? "auto" : "none",
                  ...(day.isToday ? { "--tw-ring-color": `#${color}` } as React.CSSProperties : {}),
                }}
              >
                {day.date.split("-")[2].replace(/^0/, "")}
              </button>
            );
          })}
        </div>
      )}

      <p
        className="text-xs font-medium mt-3 opacity-50"
        style={{ color: `#${resolvedTextColor}` }}
      >
        {completedDays} / {totalDays}일 완료
      </p>
    </div>
  );
}
