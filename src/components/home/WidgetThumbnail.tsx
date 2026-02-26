"use client";

import { useEffect, useState } from "react";
import ClockPreview from "@/components/widget/ClockPreview";
import DdayWidgetPreview from "@/components/widget/DdayWidgetPreview";
import TimeProgressPreview from "@/components/widget/TimeProgressPreview";
import LifeCalendarPreview from "@/components/widget/LifeCalendarPreview";
import QuotePreview from "@/components/widget/QuotePreview";
import PomodoroPreview from "@/components/widget/PomodoroPreview";
import MiniCalendarPreview from "@/components/widget/MiniCalendarPreview";
import AnalogClockPreview from "@/components/widget/AnalogClockPreview";
import CounterPreview from "@/components/widget/CounterPreview";

type WidgetType =
  | "dday"
  | "life-calendar"
  | "time-progress"
  | "clock"
  | "quote"
  | "pomodoro"
  | "mini-calendar"
  | "analog-clock"
  | "counter"
  | "weather";

interface WidgetThumbnailProps {
  type: WidgetType;
}

function WidgetContent({ type }: { type: WidgetType }) {
  switch (type) {
    case "dday":
      return (
        <div className="w-full h-full flex items-center justify-center">
          <DdayWidgetPreview
            title="수능"
            targetDate="2026-11-19"
            bgColor="1E1E1E"
            textColor="FFFFFF"
            borderRadius={0}
            padding={24}
            fontSize="sm"
          />
        </div>
      );
    case "life-calendar":
      return (
        <LifeCalendarPreview
          birthdate="2000-01-01"
          lifespan={80}
          color="2563EB"
          bg="FFFFFF"
          showStats={false}
          borderRadius={0}
          padding={12}
          fontSize="sm"
          cellSize="sm"
        />
      );
    case "time-progress":
      return (
        <TimeProgressPreview
          type="year"
          color="2563EB"
          bg="FFFFFF"
          borderRadius={0}
          padding={24}
          fontSize="sm"
        />
      );
    case "clock":
      return (
        <ClockPreview
          timezone="Asia/Seoul"
          format="24h"
          font="mono"
          color="1E1E1E"
          bg="FFFFFF"
          borderRadius={0}
          padding={24}
          fontSize="sm"
          showSeconds={false}
          blink={false}
        />
      );
    case "quote":
      return (
        <QuotePreview
          text="오늘이 가장 젊은 날이다"
          author="작자미상"
          font="serif"
          textColor="1E1E1E"
          bg="FFFFFF"
          borderRadius={0}
          padding={24}
          fontSize="sm"
        />
      );
    case "pomodoro":
      return (
        <PomodoroPreview
          workTime={25}
          breakTime={5}
          color="E11D48"
          bg="FFFFFF"
          borderRadius={0}
          padding={16}
          fontSize="sm"
        />
      );
    case "mini-calendar":
      return (
        <MiniCalendarPreview
          weekStart="mon"
          lang="ko"
          color="1E1E1E"
          highlight="2563EB"
          bg="FFFFFF"
          borderRadius={0}
          padding={12}
          fontSize="sm"
          showNav={false}
        />
      );
    case "analog-clock":
      return (
        <AnalogClockPreview
          timezone="Asia/Seoul"
          bg="FFFFFF"
          borderRadius={0}
          padding={12}
          fontSize="sm"
        />
      );
    case "counter":
      return (
        <CounterPreview
          label="카운터"
          initial={42}
          color="1E1E1E"
          btnColor="2563EB"
          bg="FFFFFF"
          borderRadius={0}
          padding={16}
          fontSize="sm"
          showReset={false}
        />
      );
    case "weather":
      return (
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-1"
          style={{ backgroundColor: "#FFFFFF", color: "#1E1E1E" }}
        >
          <span className="text-xs opacity-60 font-medium">서울</span>
          <div className="flex items-center gap-1.5">
            <span className="text-2xl">☀️</span>
            <span className="text-2xl font-bold">22°C</span>
          </div>
          <span className="text-xs opacity-70">맑음</span>
        </div>
      );
    default:
      return null;
  }
}

export default function WidgetThumbnail({ type }: WidgetThumbnailProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-xl bg-muted">
      {mounted && (
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            width: "200%",
            height: "200%",
            transform: "scale(0.5)",
            pointerEvents: "none",
          }}
        >
          <WidgetContent type={type} />
        </div>
      )}
    </div>
  );
}
