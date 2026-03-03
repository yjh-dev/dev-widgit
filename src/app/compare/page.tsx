"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ThemeToggle from "@/components/ui/theme-toggle";
import WidgetRenderer from "@/components/widget/WidgetRenderer";
import type { WidgetType } from "@/lib/templates";
import type { Preset } from "@/lib/presets";
import { getWidgetName } from "@/lib/widget-names";
import {
  ddayPresets,
  clockPresets,
  timeProgressPresets,
  flipClockPresets,
  moonPhasePresets,
  worldClockPresets,
  countdownPresets,
  miniCalendarPresets,
  analogClockPresets,
  timelinePresets,
  pomodoroPresets,
  todoPresets,
  dicePresets,
  flashcardPresets,
  waterTrackerPresets,
  breathingPresets,
  ageCalculatorPresets,
  stepperPresets,
  matrixPresets,
  multiProgressPresets,
  counterPresets,
  weatherPresets,
  readingPresets,
  habitPresets,
  stopwatchPresets,
  quotePresets,
  lifeCalendarPresets,
  bannerPresets,
  bookmarkPresets,
  goalPresets,
  musicPresets,
  gradientPresets,
  stickyNotePresets,
  qrCodePresets,
  typewriterPresets,
  githubContributionPresets,
  profileCardPresets,
  linkTreePresets,
  imageCardPresets,
  currencyPresets,
  radarChartPresets,
  pieChartPresets,
  batteryPresets,
  testimonialPresets,
  emojiRainPresets,
  fortuneCookiePresets,
  changelogPresets,
} from "@/lib/presets";

interface PresetEntry {
  type: WidgetType;
  label: string;
  presets: Preset[];
}

const presetEntries: PresetEntry[] = [
  { type: "dday", label: "D-Day", presets: ddayPresets },
  { type: "clock", label: "시계", presets: clockPresets },
  { type: "analog-clock", label: "아날로그 시계", presets: analogClockPresets },
  { type: "flip-clock", label: "플립 시계", presets: flipClockPresets },
  { type: "mini-calendar", label: "미니 캘린더", presets: miniCalendarPresets },
  { type: "time-progress", label: "시간 진행률", presets: timeProgressPresets },
  { type: "life-calendar", label: "인생 달력", presets: lifeCalendarPresets },
  { type: "pomodoro", label: "뽀모도로", presets: pomodoroPresets },
  { type: "stopwatch", label: "스톱워치", presets: stopwatchPresets },
  { type: "counter", label: "카운터", presets: counterPresets },
  { type: "weather", label: "날씨", presets: weatherPresets },
  { type: "reading", label: "읽기 진행률", presets: readingPresets },
  { type: "habit", label: "습관 트래커", presets: habitPresets },
  { type: "timeline", label: "타임라인", presets: timelinePresets },
  { type: "quote", label: "명언", presets: quotePresets },
  { type: "banner", label: "배너", presets: bannerPresets },
  { type: "bookmark", label: "북마크", presets: bookmarkPresets },
  { type: "goal", label: "목표", presets: goalPresets },
  { type: "music", label: "음악 플레이어", presets: musicPresets },
  { type: "gradient", label: "그라데이션", presets: gradientPresets },
  { type: "sticky-note", label: "메모지", presets: stickyNotePresets },
  { type: "moon-phase", label: "달 위상", presets: moonPhasePresets },
  { type: "dice", label: "주사위", presets: dicePresets },
  { type: "qr-code", label: "QR 코드", presets: qrCodePresets },
  { type: "typewriter", label: "타이핑 효과", presets: typewriterPresets },
  { type: "todo", label: "투두리스트", presets: todoPresets },
  { type: "github-contribution", label: "GitHub 잔디", presets: githubContributionPresets },
  { type: "profile-card", label: "프로필 카드", presets: profileCardPresets },
  { type: "link-tree", label: "링크 트리", presets: linkTreePresets },
  { type: "breathing", label: "호흡 타이머", presets: breathingPresets },
  { type: "world-clock", label: "세계 시계", presets: worldClockPresets },
  { type: "countdown", label: "카운트다운", presets: countdownPresets },
  { type: "flashcard", label: "플래시카드", presets: flashcardPresets },
  { type: "water-tracker", label: "물 마시기", presets: waterTrackerPresets },
  { type: "image-card", label: "이미지 카드", presets: imageCardPresets },
  { type: "currency", label: "환율", presets: currencyPresets },
  { type: "age-calculator", label: "나이 계산기", presets: ageCalculatorPresets },
  { type: "radar-chart", label: "레이더 차트", presets: radarChartPresets },
  { type: "pie-chart", label: "도넛 차트", presets: pieChartPresets },
  { type: "stepper", label: "단계 진행", presets: stepperPresets },
  { type: "battery", label: "배터리", presets: batteryPresets },
  { type: "testimonial", label: "후기 카드", presets: testimonialPresets },
  { type: "emoji-rain", label: "이모지 비", presets: emojiRainPresets },
  { type: "fortune-cookie", label: "포춘 쿠키", presets: fortuneCookiePresets },
  { type: "changelog", label: "변경 로그", presets: changelogPresets },
  { type: "matrix", label: "매트릭스", presets: matrixPresets },
  { type: "multi-progress", label: "멀티 프로그레스", presets: multiProgressPresets },
];

export default function ComparePage() {
  const [selectedType, setSelectedType] = useState<string>(presetEntries[0].type);

  const entry = presetEntries.find((e) => e.type === selectedType) ?? presetEntries[0];

  return (
    <div className="min-h-screen bg-background">
      <header className="max-w-5xl mx-auto px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
          <ThemeToggle />
        </div>
        <h1 className="text-2xl font-bold">프리셋 비교</h1>
        <p className="text-sm text-muted-foreground mt-1">
          위젯 타입을 선택하면 다양한 프리셋을 나란히 비교할 수 있습니다.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-20">
        {/* Widget type selector */}
        <div className="mb-8">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full max-w-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {presetEntries.map((e) => (
                <SelectItem key={e.type} value={e.type}>
                  {e.label} ({e.presets.length}개 프리셋)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Preset comparison grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {entry.presets.map((preset) => (
            <div key={preset.id} className="rounded-xl border bg-card overflow-hidden">
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted" aria-hidden="true">
                <div
                  className="absolute inset-0 origin-top-left"
                  style={{
                    width: "200%",
                    height: "200%",
                    transform: "scale(0.5)",
                    pointerEvents: "none",
                  }}
                >
                  <WidgetRenderer
                    type={entry.type as WidgetType}
                    props={preset.data}
                  />
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{preset.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {getWidgetName(entry.type as WidgetType)}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="text-xs" asChild>
                  <Link href={`/create/${entry.type}`}>
                    <ExternalLink className="w-3.5 h-3.5 mr-1" />
                    에디터에서 열기
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
