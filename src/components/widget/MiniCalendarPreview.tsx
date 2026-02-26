"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  getCalendarMonth,
  getDayNames,
  formatHeader,
  todayLocal,
  type WeekStartDay,
  type HeaderFormat,
  type DayNameLang,
} from "@/lib/mini-calendar";
import type { FontSizeKey } from "@/lib/common-widget-options";

const CELL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const HEADER_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

interface MiniCalendarPreviewProps {
  weekStart?: WeekStartDay;
  header?: HeaderFormat;
  showDayNames?: boolean;
  lang?: DayNameLang;
  showOtherDays?: boolean;
  showNav?: boolean;
  highlight?: string;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function MiniCalendarPreview({
  weekStart = "mon",
  header = "full",
  showDayNames = true,
  lang = "ko",
  showOtherDays = true,
  showNav = true,
  highlight = "2563EB",
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: MiniCalendarPreviewProps) {
  const today = todayLocal();
  const [year, setYear] = useState(today.year);
  const [month, setMonth] = useState(today.month);

  const days = getCalendarMonth(year, month, weekStart);
  const dayNames = getDayNames(lang, weekStart);
  const headerText = formatHeader(year, month, lang, header);

  const prevMonth = () => {
    if (month === 0) { setYear(year - 1); setMonth(11); }
    else setMonth(month - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setYear(year + 1); setMonth(0); }
    else setMonth(month + 1);
  };

  const cellClass = CELL_SIZE_MAP[fontSize];
  const headerClass = HEADER_SIZE_MAP[fontSize];

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        color: `#${color}`,
      }}
    >
      {header !== "none" && (
        <div className="flex items-center justify-between mb-2">
          {showNav ? (
            <button type="button" onClick={prevMonth} className="p-1 opacity-50 hover:opacity-100 transition-opacity">
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : <span />}
          <span className={`${headerClass} font-semibold`}>{headerText}</span>
          {showNav ? (
            <button type="button" onClick={nextMonth} className="p-1 opacity-50 hover:opacity-100 transition-opacity">
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : <span />}
        </div>
      )}

      <div className="grid grid-cols-7 gap-0.5 flex-1">
        {showDayNames && dayNames.map((name) => (
          <div
            key={name}
            className={`${cellClass} text-center font-medium opacity-50 py-0.5`}
          >
            {name}
          </div>
        ))}

        {days.map((cell, i) => {
          if (!cell.currentMonth && !showOtherDays) {
            return <div key={i} />;
          }

          return (
            <div
              key={i}
              className={`${cellClass} flex items-center justify-center aspect-square`}
              style={{
                opacity: cell.currentMonth ? 1 : 0.3,
              }}
            >
              {cell.isToday ? (
                <span
                  className="flex items-center justify-center w-[1.8em] h-[1.8em] rounded-full text-white font-semibold"
                  style={{ backgroundColor: `#${highlight}` }}
                >
                  {cell.day}
                </span>
              ) : (
                <span>{cell.day}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
