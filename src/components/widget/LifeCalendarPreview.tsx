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
}: LifeCalendarPreviewProps) {
  const { totalWeeks, livedWeeks, livedYears, livedRemainWeeks, percentage } =
    useMemo(
      () => calculateLifeCalendar(birthdate, lifespan),
      [birthdate, lifespan],
    );

  const hasBirthdate = birthdate.length > 0 && livedWeeks > 0;

  const cells = useMemo(() => {
    const arr = [];
    for (let i = 0; i < totalWeeks; i++) {
      arr.push(i < livedWeeks);
    }
    return arr;
  }, [totalWeeks, livedWeeks]);

  const sizeConfig = CELL_SIZE_CONFIG[cellSize];
  const cellBorderRadius = shape === "round" ? "50%" : sizeConfig.radius;

  const statsFontSize = fontSize === "sm" ? "clamp(5px, 1.2vw, 10px)"
    : fontSize === "lg" ? "clamp(8px, 2vw, 14px)"
    : fontSize === "xl" ? "clamp(10px, 2.5vw, 16px)"
    : "clamp(6px, 1.5vw, 12px)";

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
        style={{
          gridTemplateColumns: "repeat(52, 1fr)",
          gap: sizeConfig.gap,
        }}
      >
        {cells.map((lived, i) => {
          const isCurrentWeek = hasBirthdate && i === livedWeeks;
          return (
            <div
              key={i}
              className={isCurrentWeek ? "animate-pulse" : ""}
              style={{
                aspectRatio: "1",
                borderRadius: cellBorderRadius,
                ...(isCurrentWeek
                  ? { backgroundColor: `#${color}`, opacity: 0.7 }
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
