"use client";

import { useMemo } from "react";
import { calculateLifeCalendar } from "@/lib/life-calendar";
import type { FontSizeKey } from "@/lib/common-widget-options";

export type CellShape = "square" | "round";
export type CellSize = "sm" | "md" | "lg";

const CELL_SIZE_CONFIG: Record<CellSize, { gap: string; radius: string }> = {
  sm: { gap: "1px", radius: "1px" },
  md: { gap: "2px", radius: "2px" },
  lg: { gap: "3px", radius: "3px" },
};

interface LifeCalendarPreviewProps {
  birthdate: string;
  lifespan?: number;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  showStats?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  shape?: CellShape;
  cellSize?: CellSize;
  futureColor?: string;
  showYears?: boolean;
  nowColor?: string;
}

export default function LifeCalendarPreview({
  birthdate,
  lifespan = 80,
  color = "2563EB",
  bg = "FFFFFF",
  transparentBg = false,
  showStats = true,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  shape = "square",
  cellSize = "sm",
  futureColor = "",
  showYears = false,
  nowColor = "",
}: LifeCalendarPreviewProps) {
  const { totalWeeks, livedWeeks, livedYears, livedRemainWeeks, percentage } =
    useMemo(
      () => calculateLifeCalendar(birthdate, lifespan),
      [birthdate, lifespan],
    );

  const hasBirthdate = birthdate.length > 0 && livedWeeks > 0;

  const sizeConfig = CELL_SIZE_CONFIG[cellSize];
  const cellBorderRadius = shape === "round" ? "50%" : sizeConfig.radius;

  const statsFontSize = fontSize === "sm" ? "clamp(5px, 1.2vw, 10px)"
    : fontSize === "lg" ? "clamp(8px, 2vw, 14px)"
    : fontSize === "xl" ? "clamp(10px, 2.5vw, 16px)"
    : "clamp(6px, 1.5vw, 12px)";

  const labelFontSize = cellSize === "sm" ? "clamp(4px, 1vw, 8px)"
    : cellSize === "lg" ? "clamp(6px, 1.5vw, 12px)"
    : "clamp(5px, 1.2vw, 10px)";

  const resolvedNowColor = nowColor || color;

  const rows = useMemo(() => {
    const result: { year: number; cells: boolean[] }[] = [];
    for (let y = 0; y < lifespan; y++) {
      const startIdx = y * 52;
      const cells: boolean[] = [];
      for (let w = 0; w < 52; w++) {
        cells.push(startIdx + w < livedWeeks);
      }
      result.push({ year: y, cells });
    }
    return result;
  }, [lifespan, livedWeeks]);

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <div
        className="grid"
        role="img"
        aria-label={hasBirthdate ? `인생 달력: ${livedYears}년 ${livedRemainWeeks}주째 (${percentage.toFixed(1)}%)` : "인생 달력"}
        style={{
          gridTemplateColumns: showYears ? `auto repeat(52, 1fr)` : "repeat(52, 1fr)",
          gap: sizeConfig.gap,
          alignItems: "center",
        }}
      >
        {rows.map((row) => {
          const showLabel = showYears && row.year % 10 === 0;
          return (
            <div key={row.year} style={{ display: "contents" }}>
              {showYears && (
                <span
                  style={{
                    fontSize: labelFontSize,
                    color: `#${color}`,
                    opacity: showLabel ? 0.5 : 0,
                    textAlign: "right",
                    paddingRight: sizeConfig.gap,
                    lineHeight: 1,
                    userSelect: "none",
                  }}
                >
                  {showLabel ? row.year : ""}
                </span>
              )}
              {row.cells.map((lived, w) => {
                const globalIdx = row.year * 52 + w;
                const isCurrentWeek = hasBirthdate && globalIdx === livedWeeks;
                return (
                  <div
                    key={w}
                    className={isCurrentWeek ? "animate-pulse" : ""}
                    style={{
                      aspectRatio: "1",
                      borderRadius: cellBorderRadius,
                      ...(isCurrentWeek
                        ? { backgroundColor: `#${resolvedNowColor}`, opacity: 0.7 }
                        : lived
                          ? { backgroundColor: `#${color}` }
                          : futureColor
                            ? { backgroundColor: `#${futureColor}` }
                            : {
                                border: "0.5px solid",
                                borderColor: transparentBg
                                  ? "rgba(0,0,0,0.15)"
                                  : `#${color}33`,
                              }),
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {showStats && hasBirthdate && (
        <p
          className="text-center mt-1"
          style={{ color: `#${color}`, fontSize: statsFontSize }}
        >
          {livedYears}년 {livedRemainWeeks}주째 ({percentage.toFixed(1)}%)
        </p>
      )}
    </div>
  );
}
