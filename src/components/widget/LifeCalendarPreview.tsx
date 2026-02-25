"use client";

import { useMemo } from "react";
import { calculateLifeCalendar } from "@/lib/life-calendar";

interface LifeCalendarPreviewProps {
  birthdate: string;
  lifespan?: number;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  showStats?: boolean;
}

export default function LifeCalendarPreview({
  birthdate,
  lifespan = 80,
  color = "2563EB",
  bg = "FFFFFF",
  transparentBg = false,
  showStats = true,
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

  return (
    <div
      className="w-full h-full overflow-hidden p-2"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
      }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(52, 1fr)",
          gap: "1px",
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
                borderRadius: "1px",
                ...(isCurrentWeek
                  ? { backgroundColor: `#${color}`, opacity: 0.7 }
                  : lived
                    ? { backgroundColor: `#${color}` }
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
          style={{ color: `#${color}`, fontSize: "clamp(6px, 1.5vw, 12px)" }}
        >
          {livedYears}년 {livedRemainWeeks}주째 ({percentage.toFixed(1)}%)
        </p>
      )}
    </div>
  );
}
