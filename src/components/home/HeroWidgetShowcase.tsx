"use client";

import { useState, useEffect, useCallback } from "react";
import WidgetRenderer from "@/components/widget/WidgetRenderer";
import type { WidgetType } from "@/lib/templates";

/** Hero에서 순환 표시할 위젯과 그 props */
const showcaseWidgets: { type: WidgetType; label: string; props: Record<string, string> }[] = [
  {
    type: "dday",
    label: "D-Day",
    props: { title: "수능 D-Day", date: "2026-11-19", bg: "1E1E2E", text: "FFFFFF", color: "818CF8", dateFmt: "dot" },
  },
  {
    type: "clock",
    label: "시계",
    props: { timezone: "Asia/Seoul", format: "24h", bg: "FFFFFF", color: "1E1E1E", font: "mono", seconds: "true", blink: "true" },
  },
  {
    type: "quote",
    label: "명언",
    props: { text: "오늘 할 수 있는 일에 최선을 다하자", author: "벤자민 프랭클린", bg: "FEF3C7", color: "92400E", font: "serif", marks: "true" },
  },
  {
    type: "pomodoro",
    label: "뽀모도로",
    props: { work: "25", break: "5", color: "E11D48", bg: "FFFFFF", text: "1E1E1E", pStyle: "ring" },
  },
  {
    type: "habit",
    label: "습관 트래커",
    props: { title: "운동", view: "week", color: "22C55E", bg: "FFFFFF", text: "1E1E1E" },
  },
  {
    type: "moon-phase",
    label: "달 위상",
    props: { style: "realistic", moonColor: "F5F5DC", bg: "0F172A", color: "CBD5E1", showName: "true" },
  },
];

export default function HeroWidgetShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 200);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((activeIndex + 1) % showcaseWidgets.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeIndex, goTo]);

  const current = showcaseWidgets[activeIndex];

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Widget preview */}
      <div
        className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden border shadow-xl bg-muted transition-opacity duration-200 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            width: "200%",
            height: "200%",
            transform: "scale(0.5)",
            pointerEvents: "none",
          }}
        >
          <WidgetRenderer type={current.type} props={current.props} />
        </div>
      </div>

      {/* Indicator dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {showcaseWidgets.map((w, i) => (
          <button
            key={w.type}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${w.label} 미리보기`}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-6 h-2 bg-primary"
                : "w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2">
        {current.label} 위젯 미리보기
      </p>
    </div>
  );
}
