"use client";

import { useState, useEffect, useRef } from "react";
import type { FontSizeKey } from "@/lib/common-widget-options";
import {
  fetchContributions,
  groupByWeeks,
  levelColor,
  generatePlaceholderData,
  getMonthLabels,
  type ContributionDay,
} from "@/lib/github-contribution";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "0.75rem",
  md: "0.875rem",
  lg: "1rem",
  xl: "1.25rem",
};

const CELL_SIZE_MAP = { sm: 10, md: 13, lg: 16 };
const CELL_GAP = 2;

const CELL_RADIUS_MAP = {
  square: "0",
  rounded: "2px",
  circle: "50%",
};

const DAY_LABELS_KO = ["일", "월", "화", "수", "목", "금", "토"];
const DAY_LABELS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Only show Mon, Wed, Fri labels to save space
const VISIBLE_DAYS = new Set([1, 3, 5]);

interface GithubContributionPreviewProps {
  username: string;
  year: string;
  showTotal: boolean;
  showUsername: boolean;
  lang: "ko" | "en";
  cellSize: "sm" | "md" | "lg";
  cellRadius: "square" | "rounded" | "circle";
  color: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
}

export default function GithubContributionPreview({
  username,
  year,
  showTotal,
  showUsername,
  lang,
  cellSize,
  cellRadius,
  color,
  textColor,
  bg,
  transparentBg,
  borderRadius,
  padding,
  fontSize,
}: GithubContributionPreviewProps) {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Fetch or use placeholder
  useEffect(() => {
    if (!username.trim()) {
      const yr = year === "last" ? new Date().getFullYear() : parseInt(year, 10) || new Date().getFullYear();
      const placeholder = generatePlaceholderData(yr);
      setContributions(placeholder);
      setTotal(placeholder.reduce((s, d) => s + d.count, 0));
      setError("");
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError("");

    const yr = year === "last" ? undefined : parseInt(year, 10) || undefined;
    fetchContributions(username.trim(), yr)
      .then((data) => {
        if (cancelled) return;
        setContributions(data.contributions);
        setTotal(data.total);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e.message || "데이터를 불러올 수 없습니다");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username, year]);

  // Auto-scale to fit container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;
      const cs = CELL_SIZE_MAP[cellSize];
      // 53 weeks × (cellSize + gap) + day label column (~28px)
      const naturalWidth = 53 * (cs + CELL_GAP) + 32;
      if (width < naturalWidth) {
        setScale(width / naturalWidth);
      } else {
        setScale(1);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [cellSize]);

  const weeks = groupByWeeks(contributions);
  const cs = CELL_SIZE_MAP[cellSize];
  const cr = CELL_RADIUS_MAP[cellRadius];
  const fSize = FONT_SIZE_MAP[fontSize];
  const resolvedText = textColor || (transparentBg ? "" : "1E1E1E");
  const dayLabels = lang === "ko" ? DAY_LABELS_KO : DAY_LABELS_EN;
  const monthLabels = getMonthLabels(lang);

  // Calculate month positions for labels
  const monthPositions: { label: string; col: number }[] = [];
  if (weeks.length > 0) {
    let lastMonth = -1;
    weeks.forEach((week, colIdx) => {
      // Find first non-null day in this week
      const firstDay = week.find((d): d is ContributionDay => d !== null);
      if (firstDay) {
        const m = new Date(firstDay.date).getMonth();
        if (m !== lastMonth) {
          monthPositions.push({ label: monthLabels[m], col: colIdx });
          lastMonth = m;
        }
      }
    });
  }

  const labelFontSize = Math.max(9, cs - 1);

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        color: resolvedText ? `#${resolvedText}` : undefined,
      }}
    >
      <div
        style={{ borderRadius, padding, fontSize: fSize }}
        className="w-full"
      >
        {/* Header */}
        {(showUsername || showTotal) && (
          <div className="mb-2 flex items-baseline gap-2 flex-wrap">
            {showUsername && username && (
              <span className="font-semibold" style={{ fontSize: `calc(${fSize} * 1.1)` }}>
                {username}
              </span>
            )}
            {showTotal && (
              <span className="opacity-60" style={{ fontSize: `calc(${fSize} * 0.85)` }}>
                {loading
                  ? "로딩 중..."
                  : error
                    ? error
                    : lang === "ko"
                      ? `${total.toLocaleString()}개 기여`
                      : `${total.toLocaleString()} contributions`}
              </span>
            )}
          </div>
        )}

        {/* Heatmap grid */}
        <div ref={containerRef} className="w-full overflow-hidden">
          <div
            style={{
              transformOrigin: "top left",
              transform: scale < 1 ? `scale(${scale})` : undefined,
            }}
          >
            {/* Month labels row */}
            <div
              style={{
                display: "flex",
                paddingLeft: 30,
                marginBottom: 2,
                gap: CELL_GAP,
              }}
            >
              {weeks.map((week, colIdx) => {
                const mp = monthPositions.find((m) => m.col === colIdx);
                return (
                  <div
                    key={colIdx}
                    style={{
                      width: cs,
                      flexShrink: 0,
                      fontSize: `${labelFontSize}px`,
                      overflow: "visible",
                      whiteSpace: "nowrap",
                    }}
                    className="opacity-50"
                  >
                    {mp ? mp.label : ""}
                  </div>
                );
              })}
            </div>

            {/* Grid: day labels + cells */}
            <div style={{ display: "flex", gap: CELL_GAP }}>
              {/* Day-of-week labels */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: CELL_GAP,
                  width: 26,
                  flexShrink: 0,
                }}
              >
                {dayLabels.map((label, i) => (
                  <div
                    key={i}
                    className="opacity-40"
                    style={{
                      height: cs,
                      display: "flex",
                      alignItems: "center",
                      fontSize: `${Math.max(8, cs - 3)}px`,
                    }}
                  >
                    {VISIBLE_DAYS.has(i) ? label : ""}
                  </div>
                ))}
              </div>

              {/* Week columns */}
              {weeks.map((week, colIdx) => (
                <div
                  key={colIdx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: CELL_GAP,
                  }}
                >
                  {/* Each week has exactly 7 rows (some may be null for padding) */}
                  {week.map((day, rowIdx) =>
                    day ? (
                      <div
                        key={day.date}
                        title={`${day.date}: ${day.count}${lang === "ko" ? "개 기여" : " contributions"}`}
                        style={{
                          width: cs,
                          height: cs,
                          borderRadius: cr,
                          backgroundColor: levelColor(day.level, color),
                        }}
                      />
                    ) : (
                      <div
                        key={`empty-${colIdx}-${rowIdx}`}
                        style={{ width: cs, height: cs }}
                      />
                    ),
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div
              className="flex items-center justify-end gap-1 mt-2 opacity-50"
              style={{ fontSize: `${labelFontSize}px` }}
            >
              <span>{lang === "ko" ? "적음" : "Less"}</span>
              {([0, 1, 2, 3, 4] as const).map((lv) => (
                <div
                  key={lv}
                  style={{
                    width: cs,
                    height: cs,
                    borderRadius: cr,
                    backgroundColor: levelColor(lv, color),
                  }}
                />
              ))}
              <span>{lang === "ko" ? "많음" : "More"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
