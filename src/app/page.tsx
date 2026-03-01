"use client";

import { useState, useMemo, useEffect, startTransition } from "react";
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
  Award,
  CreditCard,
  GalleryHorizontalEnd,
  Group,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import LocaleToggle from "@/components/ui/locale-toggle";
import WidgetThumbnail from "@/components/home/WidgetThumbnail";
import { getRecentWidgets } from "@/lib/recent-widgets";
import { categories, allWidgets } from "@/lib/widget-categories";

const CATEGORY_ALL = "전체";
const categoryNames = [CATEGORY_ALL, ...categories.map((c) => c.title)];

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(CATEGORY_ALL);
  const [recentTypes, setRecentTypes] = useState<string[]>([]);

  useEffect(() => {
    startTransition(() => {
      setRecentTypes(getRecentWidgets().map((r) => r.type));
    });
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

    // 검색 필터: 이름, 설명, 태그 모두 매칭
    return byCat
      .map((c) => ({
        ...c,
        widgets: c.widgets.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.desc.toLowerCase().includes(q) ||
            w.tags.some((t) => t.toLowerCase().includes(q)),
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
          <LocaleToggle />
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
        <Button variant="outline" asChild>
          <Link href="/gallery">
            <GalleryHorizontalEnd className="w-4 h-4 mr-2" />
            갤러리
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/create/group">
            <Group className="w-4 h-4 mr-2" />
            위젯 그룹 만들기
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/create/badge">
            <Award className="w-4 h-4 mr-2" />
            뱃지 만들기
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/create/card">
            <CreditCard className="w-4 h-4 mr-2" />
            카드 이미지 만들기
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
            aria-label="위젯 검색"
            className="w-full rounded-lg border bg-background pl-9 pr-9 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="검색어 지우기"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="위젯 카테고리">
          {categoryNames.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={activeCategory === name}
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

      {/* Result count */}
      {query.trim() && (
        <div className="max-w-5xl mx-auto px-6 pb-2">
          <p className="text-sm text-muted-foreground">
            {totalCount > 0 ? `${totalCount}개의 위젯을 찾았습니다` : ""}
          </p>
        </div>
      )}

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
              <Link href="/gallery" className="hover:text-foreground transition-colors">
                갤러리
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
