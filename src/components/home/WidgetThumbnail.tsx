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
import ReadingPreview from "@/components/widget/ReadingPreview";
import HabitPreview from "@/components/widget/HabitPreview";
import TimelinePreview from "@/components/widget/TimelinePreview";
import BannerPreview from "@/components/widget/BannerPreview";
import BookmarkPreview from "@/components/widget/BookmarkPreview";
import GoalPreview from "@/components/widget/GoalPreview";
import StopwatchPreview from "@/components/widget/StopwatchPreview";
import MusicPreview from "@/components/widget/MusicPreview";

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
  | "weather"
  | "reading"
  | "habit"
  | "timeline"
  | "banner"
  | "bookmark"
  | "goal"
  | "stopwatch"
  | "music";

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
    case "reading":
      return (
        <ReadingPreview
          title="클린 코드"
          currentPage={180}
          totalPages={300}
          color="2563EB"
          bg="FFFFFF"
          borderRadius={0}
          padding={24}
          fontSize="sm"
        />
      );
    case "habit":
      return (
        <HabitPreview
          title="운동"
          view="week"
          weekStart="mon"
          checkedDates={new Set(["2026-02-23", "2026-02-24", "2026-02-25"])}
          interactive={false}
          color="22C55E"
          bg="FFFFFF"
          borderRadius={0}
          padding={16}
        />
      );
    case "timeline":
      return (
        <TimelinePreview
          events={[
            { title: "기말고사", date: "2026-06-15" },
            { title: "여름방학", date: "2026-07-20" },
            { title: "수능", date: "2026-11-19" },
          ]}
          color="2563EB"
          bg="FFFFFF"
          borderRadius={0}
          padding={16}
          fontSize="sm"
        />
      );
    case "banner":
      return (
        <BannerPreview
          texts={["오늘도 화이팅! 💪"]}
          animation="none"
          bold={true}
          color="1E1E1E"
          bg="FFFFFF"
          borderRadius={0}
          padding={24}
          fontSize="md"
        />
      );
    case "bookmark":
      return (
        <BookmarkPreview
          url="https://github.com"
          title="GitHub"
          desc="내 깃허브 프로필"
          color="1E1E1E"
          bg="FFFFFF"
          borderRadius={0}
          padding={24}
          fontSize="sm"
        />
      );
    case "goal":
      return (
        <GoalPreview
          title="저축 목표"
          current={35}
          target={100}
          unit="만원"
          color="22C55E"
          bg="FFFFFF"
          borderRadius={0}
          padding={24}
          fontSize="sm"
        />
      );
    case "stopwatch":
      return (
        <StopwatchPreview
          color="1E1E1E"
          btnColor="2563EB"
          bg="FFFFFF"
          borderRadius={0}
          padding={16}
          fontSize="sm"
        />
      );
    case "music":
      return (
        <MusicPreview
          title="Chill Beats"
          artist="Lo-Fi Radio"
          progress={45}
          artColor="6366F1"
          color="1E1E1E"
          bg="FFFFFF"
          borderRadius={0}
          padding={16}
          fontSize="sm"
        />
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
