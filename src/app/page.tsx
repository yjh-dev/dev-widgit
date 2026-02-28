"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  MousePointerClick,
  Palette,
  Copy,
  Code,
  LayoutGrid,
  BookOpenCheck,
  Search,
  X,
  History,
  FolderHeart,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import WidgetThumbnail from "@/components/home/WidgetThumbnail";
import { getRecentWidgets } from "@/lib/recent-widgets";
import { getWidgetIcon, getWidgetName } from "@/lib/widget-names";
import type { WidgetType } from "@/lib/templates";

function w(type: WidgetType, desc: string) {
  return { href: `/create/${type}`, type, icon: getWidgetIcon(type), name: getWidgetName(type), desc };
}

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
      w("dday", "목표일까지 남은 일수를 표시합니다"),
      w("clock", "미니멀한 타이포그래피 시계를 표시합니다"),
      w("analog-clock", "클래식한 아날로그 시계를 표시합니다"),
      w("mini-calendar", "깔끔한 월간 캘린더를 표시합니다"),
      w("timeline", "여러 일정을 타임라인으로 나열합니다"),
      w("flip-clock", "레트로 스플릿 플랩 스타일 시계입니다"),
      w("world-clock", "여러 타임존을 한눈에 비교합니다"),
      w("timetable", "주간 시간표를 표시합니다"),
      w("age-calculator", "생년월일 기반 정확한 나이를 표시합니다"),
    ],
  },
  {
    title: "진행률 & 목표",
    widgets: [
      w("time-progress", "오늘·이번 달·올해의 진행률을 표시합니다"),
      w("life-calendar", "기대수명을 주 단위로 시각화합니다"),
      w("reading", "책 읽기 목표 진행률을 표시합니다"),
      w("goal", "자유 단위의 목표 진행률을 표시합니다"),
      w("water-tracker", "일일 물 섭취량을 트래킹합니다"),
      w("stepper", "프로젝트 단계별 진행 상태를 표시합니다"),
      w("battery", "배터리 모양의 진행률을 표시합니다"),
      w("multi-progress", "여러 항목의 진행률을 비교합니다"),
    ],
  },
  {
    title: "생산성 & 도구",
    widgets: [
      w("pomodoro", "집중·휴식을 번갈아 관리하는 타이머입니다"),
      w("stopwatch", "경과 시간을 측정하는 스톱워치입니다"),
      w("counter", "숫자를 세고 기록하는 카운터입니다"),
      w("habit", "주간·월간 습관 체크를 관리합니다"),
      w("todo", "할 일 체크리스트를 관리합니다"),
      w("breathing", "명상·호흡 가이드 타이머입니다"),
      w("countdown", "분·초 단위 카운트다운 타이머입니다"),
      w("flashcard", "앞·뒤 카드로 암기를 도와줍니다"),
      w("matrix", "아이젠하워 2×2 우선순위 매트릭스입니다"),
    ],
  },
  {
    title: "소셜 & 링크",
    widgets: [
      w("profile-card", "이름, 소개, SNS 링크가 포함된 명함 카드입니다"),
      w("link-tree", "여러 링크를 세로로 나열한 버튼 목록입니다"),
      w("bookmark", "링크 카드를 만들어 표시합니다"),
      w("github-contribution", "GitHub 기여 잔디 히트맵을 표시합니다"),
      w("testimonial", "리뷰·추천사 카드를 만듭니다"),
    ],
  },
  {
    title: "콘텐츠 & 장식",
    widgets: [
      w("quote", "감성 명언 텍스트 카드를 만듭니다"),
      w("banner", "애니메이션 텍스트 배너를 만듭니다"),
      w("music", "장식용 음악 플레이어 카드입니다"),
      w("weather", "현재 날씨와 예보를 표시합니다"),
      w("moon-phase", "현재 달 모양과 조도를 표시합니다"),
      w("sticky-note", "포스트잇 스타일 메모 카드입니다"),
      w("gradient", "CSS 그라데이션 배너/구분선입니다"),
      w("typewriter", "텍스트가 타이핑되는 애니메이션 위젯입니다"),
      w("qr-code", "URL이나 텍스트를 QR 코드로 생성합니다"),
      w("dice", "주사위·동전·랜덤 뽑기 도구입니다"),
      w("stats-card", "KPI·통계 숫자를 표시합니다"),
      w("color-palette", "컬러 스워치 팔레트를 표시합니다"),
      w("divider", "장식 구분선을 만듭니다"),
      w("image-card", "외부 이미지를 캡션과 함께 표시합니다"),
      w("currency", "실시간 환율 정보를 표시합니다"),
      w("radar-chart", "스킬·능력치를 거미줄 차트로 시각화합니다"),
      w("pie-chart", "도넛/파이 차트로 비율을 시각화합니다"),
      w("emoji-rain", "이모지가 떨어지는 장식 애니메이션입니다"),
      w("changelog", "버전별 변경 이력을 표시합니다"),
    ],
  },
];

const CATEGORY_ALL = "전체";
const categoryNames = [CATEGORY_ALL, ...categories.map((c) => c.title)];

const allWidgets = categories.flatMap((c) =>
  c.widgets.map((w) => ({ ...w, category: c.title })),
);

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(CATEGORY_ALL);
  const [recentTypes, setRecentTypes] = useState<string[]>([]);

  useEffect(() => {
    setRecentTypes(getRecentWidgets().map((r) => r.type));
  }, []);

  const recentWidgets = useMemo(
    () => recentTypes
      .map((type) => allWidgets.find((w) => w.type === type))
      .filter(Boolean) as (typeof allWidgets)[number][],
    [recentTypes],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 카테고리 필터
    const byCat =
      activeCategory === CATEGORY_ALL
        ? categories
        : categories.filter((c) => c.title === activeCategory);

    if (!q) return byCat;

    // 검색 필터: 카테고리별로 매칭되는 위젯만 남기고 빈 카테고리 제거
    return byCat
      .map((c) => ({
        ...c,
        widgets: c.widgets.filter(
          (w) => w.name.toLowerCase().includes(q) || w.desc.toLowerCase().includes(q),
        ),
      }))
      .filter((c) => c.widgets.length > 0);
  }, [query, activeCategory]);

  const totalCount = filtered.reduce((sum, c) => sum + c.widgets.length, 0);

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
      <section className="max-w-3xl mx-auto px-6 pb-14 flex flex-wrap justify-center gap-3">
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
        <Button variant="outline" asChild>
          <Link href="/my-widgets">
            <FolderHeart className="w-4 h-4 mr-2" />
            내 위젯
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/create/icon">
            <Sparkles className="w-4 h-4 mr-2" />
            아이콘 만들기
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/create/cover">
            <ImageIcon className="w-4 h-4 mr-2" />
            커버 이미지 만들기
          </Link>
        </Button>
      </section>

      {/* Recent widgets */}
      {recentWidgets.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-muted-foreground">최근 사용한 위젯</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {recentWidgets.map((w) => {
              const Icon = w.icon;
              return (
                <Link
                  key={w.type}
                  href={w.href}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-card shrink-0 transition-colors hover:bg-accent"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium whitespace-nowrap">{w.name}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Search & Filter */}
      <section className="max-w-5xl mx-auto px-6 pb-8 space-y-4">
        {/* Search input */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="위젯 검색..."
            className="w-full rounded-lg border bg-background pl-9 pr-9 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {categoryNames.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setActiveCategory(name)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === name
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      {/* Categories */}
      <main className="max-w-5xl mx-auto px-6 pb-20 space-y-12">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">
              &ldquo;{query}&rdquo;에 해당하는 위젯이 없습니다.
            </p>
          </div>
        ) : (
          filtered.map((category) => (
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
          ))
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Widgit</span>
              <span>{allWidgets.length}종 위젯</span>
              <span>서버리스</span>
              <span>무료</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/guide" className="hover:text-foreground transition-colors">
                임베드 가이드
              </Link>
              <Link href="/templates" className="hover:text-foreground transition-colors">
                추천 조합
              </Link>
              <Link href="/my-widgets" className="hover:text-foreground transition-colors">
                내 위젯
              </Link>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            URL 파라미터만으로 동작하는 무상태 노션 위젯. 서버·DB 없이, 무한히 커스터마이징 가능합니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
