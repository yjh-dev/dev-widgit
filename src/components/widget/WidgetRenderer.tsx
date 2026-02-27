"use client";

import type { WidgetType } from "@/lib/templates";
import DdayWidgetPreview from "./DdayWidgetPreview";
import ClockPreview from "./ClockPreview";
import QuotePreview from "./QuotePreview";
import PomodoroPreview from "./PomodoroPreview";
import TimeProgressPreview from "./TimeProgressPreview";
import LifeCalendarPreview from "./LifeCalendarPreview";
import MiniCalendarPreview from "./MiniCalendarPreview";
import AnalogClockPreview from "./AnalogClockPreview";
import CounterPreview from "./CounterPreview";
import WeatherPreview from "./WeatherPreview";
import ReadingPreview from "./ReadingPreview";
import HabitPreview from "./HabitPreview";
import TimelinePreview from "./TimelinePreview";
import BannerPreview from "./BannerPreview";
import BookmarkPreview from "./BookmarkPreview";
import GoalPreview from "./GoalPreview";
import StopwatchPreview from "./StopwatchPreview";
import MusicPreview from "./MusicPreview";
import GradientPreview from "./GradientPreview";
import StickyNotePreview from "./StickyNotePreview";
import FlipClockPreview from "./FlipClockPreview";
import MoonPhasePreview from "./MoonPhasePreview";
import DicePreview from "./DicePreview";
import QRCodePreview from "./QRCodePreview";
import TypewriterPreview from "./TypewriterPreview";

interface WidgetRendererProps {
  type: WidgetType;
  props: Record<string, unknown>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function WidgetRenderer({ type, props: p }: WidgetRendererProps) {
  const a = p as any;
  switch (type) {
    case "dday":
      return <DdayWidgetPreview {...a} />;
    case "clock":
      return <ClockPreview {...a} />;
    case "quote":
      return <QuotePreview {...a} />;
    case "pomodoro":
      return <PomodoroPreview {...a} />;
    case "time-progress":
      return <TimeProgressPreview {...a} />;
    case "life-calendar":
      return <LifeCalendarPreview {...a} />;
    case "mini-calendar":
      return <MiniCalendarPreview {...a} />;
    case "analog-clock":
      return <AnalogClockPreview {...a} />;
    case "counter":
      return <CounterPreview {...a} />;
    case "weather":
      return <WeatherPreview {...a} />;
    case "reading":
      return <ReadingPreview {...a} />;
    case "habit":
      return <HabitPreview {...a} />;
    case "timeline":
      return <TimelinePreview {...a} />;
    case "banner":
      return <BannerPreview {...a} />;
    case "bookmark":
      return <BookmarkPreview {...a} />;
    case "goal":
      return <GoalPreview {...a} />;
    case "stopwatch":
      return <StopwatchPreview {...a} />;
    case "music":
      return <MusicPreview {...a} />;
    case "gradient":
      return <GradientPreview {...a} />;
    case "sticky-note":
      return <StickyNotePreview {...a} />;
    case "flip-clock":
      return <FlipClockPreview {...a} />;
    case "moon-phase":
      return <MoonPhasePreview {...a} />;
    case "dice":
      return <DicePreview {...a} />;
    case "qr-code":
      return <QRCodePreview {...a} />;
    case "typewriter":
      return <TypewriterPreview {...a} />;
    default:
      return null;
  }
}
