"use client";

import dynamic from "next/dynamic";
import type { WidgetType } from "@/lib/templates";

const DdayWidgetPreview = dynamic(() => import("./DdayWidgetPreview"));
const ClockPreview = dynamic(() => import("./ClockPreview"));
const QuotePreview = dynamic(() => import("./QuotePreview"));
const PomodoroPreview = dynamic(() => import("./PomodoroPreview"));
const TimeProgressPreview = dynamic(() => import("./TimeProgressPreview"));
const LifeCalendarPreview = dynamic(() => import("./LifeCalendarPreview"));
const MiniCalendarPreview = dynamic(() => import("./MiniCalendarPreview"));
const AnalogClockPreview = dynamic(() => import("./AnalogClockPreview"));
const CounterPreview = dynamic(() => import("./CounterPreview"));
const WeatherPreview = dynamic(() => import("./WeatherPreview"));
const ReadingPreview = dynamic(() => import("./ReadingPreview"));
const HabitPreview = dynamic(() => import("./HabitPreview"));
const TimelinePreview = dynamic(() => import("./TimelinePreview"));
const BannerPreview = dynamic(() => import("./BannerPreview"));
const BookmarkPreview = dynamic(() => import("./BookmarkPreview"));
const GoalPreview = dynamic(() => import("./GoalPreview"));
const StopwatchPreview = dynamic(() => import("./StopwatchPreview"));
const MusicPreview = dynamic(() => import("./MusicPreview"));
const GradientPreview = dynamic(() => import("./GradientPreview"));
const StickyNotePreview = dynamic(() => import("./StickyNotePreview"));
const FlipClockPreview = dynamic(() => import("./FlipClockPreview"));
const MoonPhasePreview = dynamic(() => import("./MoonPhasePreview"));
const DicePreview = dynamic(() => import("./DicePreview"));
const QRCodePreview = dynamic(() => import("./QRCodePreview"));
const TypewriterPreview = dynamic(() => import("./TypewriterPreview"));
const TodoPreview = dynamic(() => import("./TodoPreview"));
const GithubContributionPreview = dynamic(() => import("./GithubContributionPreview"));
const ProfileCardPreview = dynamic(() => import("./ProfileCardPreview"));
const LinkTreePreview = dynamic(() => import("./LinkTreePreview"));
const BreathingPreview = dynamic(() => import("./BreathingPreview"));
const WorldClockPreview = dynamic(() => import("./WorldClockPreview"));
const CountdownPreview = dynamic(() => import("./CountdownPreview"));
const StatsCardPreview = dynamic(() => import("./StatsCardPreview"));
const ColorPalettePreview = dynamic(() => import("./ColorPalettePreview"));
const DividerPreview = dynamic(() => import("./DividerPreview"));
const TimetablePreview = dynamic(() => import("./TimetablePreview"));
const FlashcardPreview = dynamic(() => import("./FlashcardPreview"));
const WaterTrackerPreview = dynamic(() => import("./WaterTrackerPreview"));
const ImageCardPreview = dynamic(() => import("./ImageCardPreview"));
const CurrencyPreview = dynamic(() => import("./CurrencyPreview"));
const AgeCalculatorPreview = dynamic(() => import("./AgeCalculatorPreview"));
const RadarChartPreview = dynamic(() => import("./RadarChartPreview"));
const PieChartPreview = dynamic(() => import("./PieChartPreview"));
const StepperPreview = dynamic(() => import("./StepperPreview"));
const BatteryPreview = dynamic(() => import("./BatteryPreview"));
const TestimonialPreview = dynamic(() => import("./TestimonialPreview"));
const EmojiRainPreview = dynamic(() => import("./EmojiRainPreview"));
const ChangelogPreview = dynamic(() => import("./ChangelogPreview"));
const MatrixPreview = dynamic(() => import("./MatrixPreview"));
const MultiProgressPreview = dynamic(() => import("./MultiProgressPreview"));
const FortuneCookiePreview = dynamic(() => import("./FortuneCookiePreview"));
const AnniversaryPreview = dynamic(() => import("./AnniversaryPreview"));
const SeasonCountdownPreview = dynamic(() => import("./SeasonCountdownPreview"));
const DualClockPreview = dynamic(() => import("./DualClockPreview"));
const GpaCalculatorPreview = dynamic(() => import("./GpaCalculatorPreview"));
const SavingsGoalPreview = dynamic(() => import("./SavingsGoalPreview"));
const BookGoalPreview = dynamic(() => import("./BookGoalPreview"));
const KanbanPreview = dynamic(() => import("./KanbanPreview"));
const RoutineTimerPreview = dynamic(() => import("./RoutineTimerPreview"));
const MemoBoardPreview = dynamic(() => import("./MemoBoardPreview"));
const PasswordGenPreview = dynamic(() => import("./PasswordGenPreview"));
const SocialCounterPreview = dynamic(() => import("./SocialCounterPreview"));
const GuestbookPreview = dynamic(() => import("./GuestbookPreview"));
const PollPreview = dynamic(() => import("./PollPreview"));
const VocabularyPreview = dynamic(() => import("./VocabularyPreview"));
const MiniGalleryPreview = dynamic(() => import("./MiniGalleryPreview"));
const AsciiArtPreview = dynamic(() => import("./AsciiArtPreview"));
const NoiseBgPreview = dynamic(() => import("./NoiseBgPreview"));
const DailyColorPreview = dynamic(() => import("./DailyColorPreview"));
const CountupPreview = dynamic(() => import("./CountupPreview"));
const MiniMapPreview = dynamic(() => import("./MiniMapPreview"));
const RatingCardPreview = dynamic(() => import("./RatingCardPreview"));

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
    case "todo":
      return <TodoPreview {...a} />;
    case "github-contribution":
      return <GithubContributionPreview {...a} />;
    case "profile-card":
      return <ProfileCardPreview {...a} />;
    case "link-tree":
      return <LinkTreePreview {...a} />;
    case "breathing":
      return <BreathingPreview {...a} />;
    case "world-clock":
      return <WorldClockPreview {...a} />;
    case "countdown":
      return <CountdownPreview {...a} />;
    case "stats-card":
      return <StatsCardPreview {...a} />;
    case "color-palette":
      return <ColorPalettePreview {...a} />;
    case "divider":
      return <DividerPreview {...a} />;
    case "timetable":
      return <TimetablePreview {...a} />;
    case "flashcard":
      return <FlashcardPreview {...a} />;
    case "water-tracker":
      return <WaterTrackerPreview {...a} />;
    case "image-card":
      return <ImageCardPreview {...a} />;
    case "currency":
      return <CurrencyPreview {...a} />;
    case "age-calculator":
      return <AgeCalculatorPreview {...a} />;
    case "radar-chart":
      return <RadarChartPreview {...a} />;
    case "pie-chart":
      return <PieChartPreview {...a} />;
    case "stepper":
      return <StepperPreview {...a} />;
    case "battery":
      return <BatteryPreview {...a} />;
    case "testimonial":
      return <TestimonialPreview {...a} />;
    case "emoji-rain":
      return <EmojiRainPreview {...a} />;
    case "changelog":
      return <ChangelogPreview {...a} />;
    case "matrix":
      return <MatrixPreview {...a} />;
    case "multi-progress":
      return <MultiProgressPreview {...a} />;
    case "fortune-cookie":
      return <FortuneCookiePreview {...a} />;
    case "anniversary":
      return <AnniversaryPreview {...a} />;
    case "season-countdown":
      return <SeasonCountdownPreview {...a} />;
    case "dual-clock":
      return <DualClockPreview {...a} />;
    case "gpa-calculator":
      return <GpaCalculatorPreview {...a} />;
    case "savings-goal":
      return <SavingsGoalPreview {...a} />;
    case "book-goal":
      return <BookGoalPreview {...a} />;
    case "kanban":
      return <KanbanPreview {...a} />;
    case "routine-timer":
      return <RoutineTimerPreview {...a} />;
    case "memo-board":
      return <MemoBoardPreview {...a} />;
    case "password-gen":
      return <PasswordGenPreview {...a} />;
    case "social-counter":
      return <SocialCounterPreview {...a} />;
    case "guestbook":
      return <GuestbookPreview {...a} />;
    case "poll":
      return <PollPreview {...a} />;
    case "vocabulary":
      return <VocabularyPreview {...a} />;
    case "mini-gallery":
      return <MiniGalleryPreview {...a} />;
    case "ascii-art":
      return <AsciiArtPreview {...a} />;
    case "noise-bg":
      return <NoiseBgPreview {...a} />;
    case "daily-color":
      return <DailyColorPreview {...a} />;
    case "countup":
      return <CountupPreview {...a} />;
    case "mini-map":
      return <MiniMapPreview {...a} />;
    case "rating-card":
      return <RatingCardPreview {...a} />;
    default:
      return null;
  }
}
