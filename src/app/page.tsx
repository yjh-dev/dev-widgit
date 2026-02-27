"use client";

import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  Clock,
  CloudSun,
  Gauge,
  Grid3X3,
  Hash,
  Calendar,
  Hourglass,
  Link as LinkIcon,
  ListTodo,
  Music,
  Quote,
  Target,
  Timer,
  TrendingUp,
  Type,
  MousePointerClick,
  Palette,
  Copy,
  Code,
  LayoutGrid,
  BookOpenCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import WidgetThumbnail from "@/components/home/WidgetThumbnail";

type WidgetType =
  | "dday" | "life-calendar" | "time-progress" | "clock" | "quote"
  | "pomodoro" | "mini-calendar" | "analog-clock" | "counter" | "weather"
  | "reading" | "habit" | "timeline" | "banner"
  | "bookmark" | "goal" | "stopwatch" | "music";

interface Widget {
  href: string;
  type: WidgetType;
  icon: LucideIcon;
  name: string;
  desc: string;
}

interface WidgetCategory {
  title: string;
  widgets: Widget[];
}

const categories: WidgetCategory[] = [
  {
    title: "시간 & 날짜",
    widgets: [
      { href: "/create/dday", type: "dday", icon: CalendarDays, name: "D-Day 위젯", desc: "목표일까지 남은 일수를 표시합니다" },
      { href: "/create/clock", type: "clock", icon: Clock, name: "미니멀 시계", desc: "미니멀한 타이포그래피 시계를 표시합니다" },
      { href: "/create/analog-clock", type: "analog-clock", icon: Gauge, name: "아날로그 시계", desc: "클래식한 아날로그 시계를 표시합니다" },
      { href: "/create/mini-calendar", type: "mini-calendar", icon: Calendar, name: "미니 캘린더", desc: "깔끔한 월간 캘린더를 표시합니다" },
      { href: "/create/timeline", type: "timeline", icon: ListTodo, name: "타임라인", desc: "여러 일정을 타임라인으로 나열합니다" },
    ],
  },
  {
    title: "진행률 & 목표",
    widgets: [
      { href: "/create/time-progress", type: "time-progress", icon: TrendingUp, name: "시간 진행률 바", desc: "오늘·이번 달·올해의 진행률을 표시합니다" },
      { href: "/create/life-calendar", type: "life-calendar", icon: Grid3X3, name: "인생 달력 위젯", desc: "기대수명을 주 단위로 시각화합니다" },
      { href: "/create/reading", type: "reading", icon: BookOpen, name: "읽기 진행률", desc: "책 읽기 목표 진행률을 표시합니다" },
      { href: "/create/goal", type: "goal", icon: Target, name: "목표 진행률", desc: "자유 단위의 목표 진행률을 표시합니다" },
    ],
  },
  {
    title: "생산성 & 도구",
    widgets: [
      { href: "/create/pomodoro", type: "pomodoro", icon: Timer, name: "뽀모도로 타이머", desc: "집중·휴식을 번갈아 관리하는 타이머입니다" },
      { href: "/create/stopwatch", type: "stopwatch", icon: Hourglass, name: "스톱워치", desc: "경과 시간을 측정하는 스톱워치입니다" },
      { href: "/create/counter", type: "counter", icon: Hash, name: "카운터", desc: "숫자를 세고 기록하는 카운터입니다" },
      { href: "/create/habit", type: "habit", icon: CheckSquare, name: "습관 트래커", desc: "주간·월간 습관 체크를 관리합니다" },
    ],
  },
  {
    title: "콘텐츠 & 장식",
    widgets: [
      { href: "/create/quote", type: "quote", icon: Quote, name: "명언 카드", desc: "감성 명언 텍스트 카드를 만듭니다" },
      { href: "/create/banner", type: "banner", icon: Type, name: "텍스트 배너", desc: "애니메이션 텍스트 배너를 만듭니다" },
      { href: "/create/bookmark", type: "bookmark", icon: LinkIcon, name: "북마크", desc: "링크 카드를 만들어 표시합니다" },
      { href: "/create/music", type: "music", icon: Music, name: "음악 플레이어", desc: "장식용 음악 플레이어 카드입니다" },
      { href: "/create/weather", type: "weather", icon: CloudSun, name: "날씨", desc: "현재 날씨와 예보를 표시합니다" },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="pt-16 pb-12 px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h1 className="text-4xl font-bold tracking-tight">Widgit</h1>
          <ThemeToggle />
        </div>
        <p className="text-muted-foreground max-w-md mx-auto">
          URL 하나로 동작하는 노션 전용 위젯을 만들어보세요.
          <br />
          서버 없이, 무한히 커스터마이징 가능합니다.
        </p>
      </header>

      {/* How to use */}
      <section className="max-w-3xl mx-auto px-6 pb-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { icon: MousePointerClick, label: "위젯 선택", desc: "원하는 위젯 고르기" },
            { icon: Palette, label: "커스터마이징", desc: "색상·스타일 설정" },
            { icon: Copy, label: "URL 복사", desc: "생성된 URL 복사" },
            { icon: Code, label: "노션 임베드", desc: "/embed로 붙여넣기" },
          ].map((step, i) => {
            const StepIcon = step.icon;
            return (
              <div key={i} className="flex flex-col items-center gap-2 p-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <StepIcon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Navigation links */}
      <section className="max-w-3xl mx-auto px-6 pb-14 flex justify-center gap-3">
        <Button variant="outline" asChild>
          <Link href="/templates">
            <LayoutGrid className="w-4 h-4 mr-2" />
            추천 조합 보기
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/guide">
            <BookOpenCheck className="w-4 h-4 mr-2" />
            임베드 가이드
          </Link>
        </Button>
      </section>

      {/* Categories */}
      <main className="max-w-5xl mx-auto px-6 pb-20 space-y-12">
        {categories.map((category) => (
          <section key={category.title}>
            <h2 className="text-lg font-semibold mb-4">{category.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {category.widgets.map((w) => {
                const Icon = w.icon;
                return (
                  <Link
                    key={w.href}
                    href={w.href}
                    className="group rounded-xl border bg-card overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <WidgetThumbnail type={w.type} />
                    <div className="p-4 flex items-start gap-3">
                      <Icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-card-foreground">{w.name}</p>
                        <p className="text-sm text-muted-foreground">{w.desc}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
