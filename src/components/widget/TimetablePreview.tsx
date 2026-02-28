"use client";

import { DAY_LABELS, DAY_LABELS_EN, type TimetableEntry } from "@/lib/timetable";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, { header: string; cell: string; hour: string }> = {
  sm: { header: "text-[10px]", cell: "text-[10px]", hour: "text-[9px]" },
  md: { header: "text-xs", cell: "text-xs", hour: "text-[10px]" },
  lg: { header: "text-sm", cell: "text-sm", hour: "text-xs" },
  xl: { header: "text-base", cell: "text-base", hour: "text-sm" },
};

interface TimetablePreviewProps {
  entries?: TimetableEntry[];
  startHour?: number;
  endHour?: number;
  lang?: "ko" | "en";
  showGrid?: boolean;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function TimetablePreview({
  entries = [],
  startHour = 9,
  endHour = 17,
  lang = "ko",
  showGrid = true,
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: TimetablePreviewProps) {
  const dayLabels = lang === "ko" ? DAY_LABELS : DAY_LABELS_EN;
  const hours = [];
  for (let h = startHour; h < endHour; h++) {
    hours.push(h);
  }
  const totalHours = endHour - startHour;
  const sizes = FONT_SIZE_MAP[fontSize];

  // Calculate luminance to determine if text should be light or dark
  function textColorForBg(hex: string): string {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "000000" : "FFFFFF";
  }

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
      {/* Grid container */}
      <div
        className="flex-1 grid"
        style={{
          gridTemplateColumns: "40px repeat(5, 1fr)",
          gridTemplateRows: `auto repeat(${totalHours}, 1fr)`,
          minHeight: 0,
        }}
      >
        {/* Top-left empty cell */}
        <div
          className={`${showGrid ? "border-b border-r" : ""} flex items-center justify-center`}
          style={{ borderColor: `#${color}15` }}
        />

        {/* Day headers */}
        {dayLabels.map((label) => (
          <div
            key={label}
            className={`${sizes.header} font-semibold flex items-center justify-center py-1.5 ${showGrid ? "border-b border-r last:border-r-0" : ""}`}
            style={{ borderColor: `#${color}15` }}
          >
            {label}
          </div>
        ))}

        {/* Hour rows */}
        {hours.map((hour, rowIdx) => (
          <div key={hour} className="contents">
            {/* Hour label */}
            <div
              className={`${sizes.hour} opacity-50 flex items-start justify-center pt-1 ${showGrid ? "border-r border-b" : ""}`}
              style={{ borderColor: `#${color}15` }}
            >
              {hour}
            </div>

            {/* Day cells for this hour */}
            {dayLabels.map((_, dayIdx) => {
              // Find entry that starts at this cell
              const entry = entries.find(
                (e) => e.day === dayIdx && e.hour === hour,
              );
              // Check if this cell is occupied by a multi-hour entry from above
              const coveredBy = !entry
                ? entries.find(
                    (e) =>
                      e.day === dayIdx &&
                      e.hour < hour &&
                      e.hour + e.duration > hour,
                  )
                : null;

              if (coveredBy) {
                // This cell is covered by a multi-hour block above, skip rendering
                return null;
              }

              const isLastRow = rowIdx === hours.length - 1;
              const isLastCol = dayIdx === 4;

              return (
                <div
                  key={`${hour}-${dayIdx}`}
                  className={`relative ${showGrid ? `border-b border-r ${isLastRow ? "border-b-0" : ""} ${isLastCol ? "border-r-0" : ""}` : ""}`}
                  style={{
                    gridRow: entry && entry.duration > 1
                      ? `span ${entry.duration}`
                      : undefined,
                    borderColor: `#${color}15`,
                  }}
                >
                  {entry && (
                    <div
                      className={`absolute inset-0.5 rounded flex items-center justify-center overflow-hidden ${sizes.cell} font-medium`}
                      style={{
                        backgroundColor: `#${entry.color}`,
                        color: `#${textColorForBg(entry.color)}`,
                      }}
                    >
                      <span className="truncate px-0.5">{entry.title}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
