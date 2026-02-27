"use client";

import { useMemo } from "react";
import { calculateTimeline, type TimelineEvent } from "@/lib/timeline";
import type { FontSizeKey } from "@/lib/common-widget-options";

const DDAY_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

interface TimelinePreviewProps {
  events?: TimelineEvent[];
  showPast?: boolean;
  color?: string;
  pastColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function TimelinePreview({
  events = [],
  showPast = false,
  color = "2563EB",
  pastColor = "999999",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: TimelinePreviewProps) {
  const timeline = useMemo(() => calculateTimeline(events), [events]);
  const filtered = showPast ? timeline : timeline.filter((e) => !e.isPast);

  const ddaySizeClass = DDAY_SIZE_MAP[fontSize];

  if (filtered.length === 0) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          backgroundColor: transparentBg ? "transparent" : `#${bg}`,
          borderRadius,
          padding,
        }}
      >
        <p className="text-sm opacity-50" style={{ color: `#${color}` }}>
          일정을 추가해주세요
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <div className="space-y-0">
        {filtered.map((event, i) => {
          const dotColor = event.isPast ? pastColor : color;
          const isLast = i === filtered.length - 1;
          return (
            <div key={`${event.title}-${event.date}`} className="flex gap-3">
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
                  style={{
                    backgroundColor: `#${dotColor}`,
                    opacity: event.isPast ? 0.5 : 1,
                  }}
                />
                {!isLast && (
                  <div
                    className="w-px flex-1 my-1"
                    style={{ backgroundColor: `#${color}30` }}
                  />
                )}
              </div>
              {/* Content */}
              <div className={`pb-4 ${isLast ? "pb-0" : ""}`}>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`${ddaySizeClass} font-bold`}
                    style={{
                      color: `#${dotColor}`,
                      opacity: event.isPast ? 0.5 : 1,
                    }}
                  >
                    {event.ddayLabel}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: `#${dotColor}`,
                      opacity: event.isPast ? 0.5 : 0.7,
                    }}
                  >
                    {event.title}
                  </span>
                </div>
                <p
                  className="text-xs opacity-40 mt-0.5"
                  style={{ color: `#${dotColor}` }}
                >
                  {event.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
