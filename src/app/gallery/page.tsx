"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ThemeToggle from "@/components/ui/theme-toggle";

interface ShowcaseItem {
  title: string;
  desc: string;
  widgets: { label: string; url: string }[];
  layout: string; // CSS grid class
}

const showcase: ShowcaseItem[] = [
  {
    title: "미니멀 학생 대시보드",
    desc: "수능 D-Day, 시간표, 뽀모도로를 조합한 학생 필수 세트",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "수능 D-Day", url: "/widget/dday?title=%EC%88%98%EB%8A%A5&date=2026-11-19&bg=1E1E1E&text=FFFFFF&color=6366F1" },
      { label: "시간표", url: "/widget/timetable?bg=1E1E1E&text=FFFFFF&color=6366F1" },
      { label: "뽀모도로", url: "/widget/pomodoro?work=25&break=5&color=6366F1&bg=1E1E1E&text=FFFFFF" },
    ],
  },
  {
    title: "감성 노트 꾸미기",
    desc: "명언, 메모지, 그라데이션으로 노션을 감성적으로",
    layout: "grid-cols-1 sm:grid-cols-2",
    widgets: [
      { label: "명언 카드", url: "/widget/quote?text=%EC%98%A4%EB%8A%98%EB%8F%84+%ED%99%94%EC%9D%B4%ED%8C%85&author=%EB%82%98&font=serif&bg=FFF7ED&color=EA580C" },
      { label: "그라데이션", url: "/widget/gradient?colors=F472B6|A78BFA&dir=135&type=linear" },
      { label: "메모지", url: "/widget/sticky-note?text=%EC%98%A4%EB%8A%98+%ED%95%A0+%EC%9D%BC&noteColor=FBBF24&pin=pin" },
      { label: "타이핑 효과", url: "/widget/typewriter?texts=%EC%98%A4%EB%8A%98%EB%8F%84+%EC%A2%8B%EC%9D%80+%ED%95%98%EB%A3%A8|%ED%99%94%EC%9D%B4%ED%8C%85!&speed=60&cursor=bar&color=EA580C&bg=FFF7ED" },
    ],
  },
  {
    title: "목표 관리 세트",
    desc: "올해 진행률, 독서 목표, 습관 트래커를 한 곳에",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "올해 진행률", url: "/widget/time-progress?type=year&color=22C55E&style=ring" },
      { label: "독서 목표", url: "/widget/reading?title=%ED%81%B4%EB%A6%B0%EC%BD%94%EB%93%9C&current=180&total=300&color=22C55E" },
      { label: "습관 트래커", url: "/widget/habit?title=%EC%9A%B4%EB%8F%99&view=week&color=22C55E" },
    ],
  },
  {
    title: "다크 모드 생산성",
    desc: "어두운 테마의 시계, 카운트다운, 투두리스트",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "플립 시계", url: "/widget/flip-clock?flipColor=1E1E1E&textColor=FFFFFF&bg=0F172A" },
      { label: "투두리스트", url: "/widget/todo?title=%EC%98%A4%EB%8A%98+%ED%95%A0+%EC%9D%BC&items=%EB%AF%B8%ED%8C%85|%EC%BD%94%EB%94%A9|!%EB%A6%AC%EB%B7%B0&color=7C3AED&bg=1E1E1E&textColor=E2E8F0" },
      { label: "스톱워치", url: "/widget/stopwatch?btnColor=7C3AED&bg=1E1E1E&text=FFFFFF" },
    ],
  },
  {
    title: "개발자 프로필",
    desc: "GitHub 잔디, 프로필 카드, QR 코드로 나만의 포트폴리오",
    layout: "grid-cols-1 sm:grid-cols-2",
    widgets: [
      { label: "GitHub 잔디", url: "/widget/github-contribution?username=torvalds&year=last&color=22C55E&bg=0F172A&text=E2E8F0" },
      { label: "프로필 카드", url: "/widget/profile-card?bg=0F172A&text=E2E8F0&color=22C55E" },
      { label: "QR 코드", url: "/widget/qr-code?data=https://github.com&label=GitHub&fgColor=22C55E&bg=0F172A" },
      { label: "통계 카드", url: "/widget/stats-card?bg=0F172A&text=E2E8F0&color=22C55E" },
    ],
  },
  {
    title: "건강 & 웰빙",
    desc: "호흡 타이머, 물 마시기, 달 위상으로 웰빙 루틴",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "호흡 타이머", url: "/widget/breathing?color=38BDF8&bg=0F172A&text=E2E8F0" },
      { label: "물 마시기", url: "/widget/water-tracker?color=38BDF8&bg=F0F9FF" },
      { label: "달 위상", url: "/widget/moon-phase?style=realistic&moonColor=F5F5DC&bg=0F172A&text=E2E8F0" },
    ],
  },
];

export default function GalleryPage() {
  const handleCopyUrl = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      toast.success("URL이 복사되었습니다!");
    });
  };

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
        <h1 className="text-2xl font-bold">갤러리</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Widgit으로 만든 다양한 위젯 조합 예시입니다. URL을 복사해 바로 사용해보세요.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-20 space-y-12">
        {/* Community submission CTA */}
        <div className="rounded-xl border bg-gradient-to-r from-primary/5 to-primary/10 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="text-base font-semibold">나만의 위젯을 공유해보세요!</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Widgit 에디터에서 만든 위젯을 갤러리에 제출하면 다른 사용자와 공유할 수 있습니다.
            </p>
          </div>
          <Link href="/">
            <Button size="sm">
              <Sparkles className="w-4 h-4 mr-1.5" />
              위젯 만들기
            </Button>
          </Link>
        </div>

        {showcase.map((item) => (
          <section key={item.title} className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>

            <div className={`grid ${item.layout} gap-4`}>
              {item.widgets.map((w) => (
                <div key={w.label} className="rounded-xl border bg-card overflow-hidden">
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted" aria-hidden="true">
                    <iframe
                      src={w.url}
                      className="absolute inset-0 origin-top-left border-0"
                      style={{
                        width: "200%",
                        height: "200%",
                        transform: "scale(0.5)",
                        pointerEvents: "none",
                      }}
                      loading="lazy"
                      title={w.label}
                    />
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <span className="text-sm font-medium">{w.label}</span>
                    <div className="flex gap-1.5">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleCopyUrl(w.url)}
                        title="URL 복사"
                        aria-label="URL 복사"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => window.open(w.url, "_blank")}
                        title="새 탭에서 열기"
                        aria-label="새 탭에서 열기"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Copy all URLs */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => {
                  const urls = item.widgets.map((w) => `${window.location.origin}${w.url}`).join("\n");
                  navigator.clipboard.writeText(urls).then(() => {
                    toast.success(`${item.title} — ${item.widgets.length}개 URL 복사 완료!`);
                  });
                }}
              >
                <Copy className="w-3.5 h-3.5 mr-1" />
                전체 URL 복사
              </Button>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
