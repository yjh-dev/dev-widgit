"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Copy, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ThemeToggle from "@/components/ui/theme-toggle";
import {
  galleryShowcase,
  galleryCategories,
  type GalleryCategory,
} from "@/lib/gallery-data";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | null>(null);

  const filtered = useMemo(() => {
    if (!activeCategory) return galleryShowcase;
    return galleryShowcase.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

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

        {/* Category filter */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            전체 ({galleryShowcase.length})
          </button>
          {galleryCategories.map((cat) => {
            const count = galleryShowcase.filter((s) => s.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
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

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">해당 카테고리의 갤러리 항목이 없습니다.</p>
          </div>
        ) : (
          filtered.map((item) => (
            <section key={item.id} className="space-y-4">
              <div className="flex items-center gap-2">
                <div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">
                  {item.category}
                </span>
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
          ))
        )}
      </main>
    </div>
  );
}
