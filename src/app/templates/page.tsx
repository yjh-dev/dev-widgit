"use client";

import { useEffect, useState, startTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, ExternalLink, ChevronDown, ChevronUp, BookOpen, Link2, ShoppingBag, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeToggle from "@/components/ui/theme-toggle";
import WidgetRenderer from "@/components/widget/WidgetRenderer";
import {
  templates,
  getThemeById,
  applyThemeToWidget,
  buildThemedWidgetUrl,
  type Template,
} from "@/lib/templates";
import { copyToClipboard } from "@/lib/clipboard";
import { compressWidgetUrl } from "@/lib/url-compression";
import { toast } from "sonner";
import { trackTemplateCopy } from "@/lib/analytics";

function getTemplateWidgetPreviewProps(template: Template) {
  const theme = getThemeById(template.themeId);
  return template.widgets.map((w) => applyThemeToWidget(w.type, theme, w.widgetConfig));
}

function handleCopySingle(template: Template, widgetIndex: number, short: boolean) {
  const theme = getThemeById(template.themeId);
  const w = template.widgets[widgetIndex];
  const url = buildThemedWidgetUrl(w.type, theme, w.widgetConfig);
  const fullUrl = `${window.location.origin}${url}`;
  copyToClipboard(short ? compressWidgetUrl(fullUrl) : fullUrl);
  trackTemplateCopy(template.id, w.name);
  toast.success("URL이 클립보드에 복사되었습니다!");
}

function getEditUrl(template: Template, widgetIndex: number): string {
  const theme = getThemeById(template.themeId);
  const w = template.widgets[widgetIndex];
  const widgetUrl = buildThemedWidgetUrl(w.type, theme, w.widgetConfig);
  // /widget/dday?title=... → /create/dday?title=...&from=templates
  const createUrl = widgetUrl.replace("/widget/", "/create/");
  const separator = createUrl.includes("?") ? "&" : "?";
  return `${createUrl}${separator}from=templates`;
}

function ThemeSwatchBadge({ themeId }: { themeId: string }) {
  const theme = getThemeById(themeId);
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted text-xs font-medium">
      <div className="flex gap-0.5">
        {[theme.bg, theme.accent, theme.secondary].map((c, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full border border-black/10"
            style={{ backgroundColor: `#${c}` }}
          />
        ))}
      </div>
      {theme.name}
    </div>
  );
}

function NotionEmbedInstructions({ notionTip }: { notionTip: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border bg-muted/50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-left cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          노션에 임베드하기
        </span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3 text-sm text-muted-foreground">
          <ol className="list-decimal list-inside space-y-1.5">
            <li>노션에서 <kbd className="px-1 py-0.5 rounded bg-muted text-xs font-mono">/embed</kbd> 입력</li>
            <li>복사한 URL 붙여넣기</li>
            <li>여러 위젯을 나란히 배치하려면 드래그해서 columns로 배치</li>
            <li>위젯 블록 가장자리를 드래그해 크기 조절</li>
          </ol>
          <div className="p-3 rounded-md bg-muted border text-foreground/80">
            <strong>배치 팁:</strong> {notionTip}
          </div>
        </div>
      )}
    </div>
  );
}

function CompositeLayoutPreview({ template }: { template: Template }) {
  const theme = getThemeById(template.themeId);
  const previewPropsArray = getTemplateWidgetPreviewProps(template);

  return (
    <div className="flex justify-center">
      <div
        className="w-full max-w-[600px] rounded-xl border p-4 overflow-hidden bg-background"
        style={{ transform: "scale(1)", transformOrigin: "top center" }}
      >
        <div className="flex flex-col gap-3">
          {template.layout.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-3">
              {row.map((widgetIdx) => {
                const widget = template.widgets[widgetIdx];
                if (!widget) return null;
                return (
                  <div
                    key={widgetIdx}
                    className="flex-1 min-w-0 overflow-hidden"
                  >
                    <div
                      className="relative w-full overflow-hidden rounded-lg"
                      style={{ height: 140, backgroundColor: `#${theme.bg}` }}
                    >
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
                          type={widget.type}
                          props={previewPropsArray[widgetIdx]}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const LS_KEY = "widgit-short-url";

export default function TemplatesPage() {
  const [mounted, setMounted] = useState(false);
  const [shortUrl, setShortUrl] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
      try {
        if (localStorage.getItem(LS_KEY) === "true") setShortUrl(true);
      } catch { /* 무시 */ }
    });
  }, []);

  const toggleShortUrl = () => {
    const next = !shortUrl;
    setShortUrl(next);
    try { localStorage.setItem(LS_KEY, String(next)); } catch { /* 무시 */ }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-12 pb-8 px-6 text-center">
        <div className="max-w-5xl mx-auto flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleShortUrl}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                shortUrl
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              title="짧은 URL로 복사"
            >
              <Link2 className="w-3.5 h-3.5" />
              짧은 URL
            </button>
            <ThemeToggle />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">추천 조합</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          테마별로 어울리는 위젯 조합을 모았습니다.
          <br />
          URL을 복사해 노션에 바로 임베드하세요.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-20 space-y-10">
        {/* Templates */}
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <div className="flex items-center gap-3 flex-wrap">
                <CardTitle className="text-xl">{template.title}</CardTitle>
                <ThemeSwatchBadge themeId={template.themeId} />
              </div>
              <CardDescription>{template.desc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Composite layout preview */}
              {mounted && <CompositeLayoutPreview template={template} />}

              {/* Individual widget URL list */}
              <div className="rounded-lg border divide-y">
                {template.widgets.map((widget, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-sm font-medium truncate mr-3">
                      {widget.name}
                    </span>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleCopySingle(template, i, shortUrl)}
                      >
                        <Copy className="w-3.5 h-3.5 mr-1.5" />
                        URL 복사
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        asChild
                      >
                        <Link href={getEditUrl(template, i)}>
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                          수정
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Notion embed guide */}
              <NotionEmbedInstructions notionTip={template.notionTip} />

              {/* Notion template duplicate button */}
              {template.notionTemplateUrl && !template.notionTemplateUrl.includes("PLACEHOLDER") && (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(template.notionTemplateUrl, "_blank")}
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  노션에 복제하기
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </main>

      {/* Premium Notion Templates */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">프리미엄 노션 템플릿</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Widgit 위젯이 미리 세팅된 노션 템플릿을 구매하면 바로 사용할 수 있습니다.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "학생 대시보드",
              desc: "D-Day · 시간표 · 투두리스트 · 뽀모도로가 세팅된 학생용 노션 템플릿",
              price: "₩3,900",
              url: "https://widgit.lemonsqueezy.com",
              emoji: "📚",
            },
            {
              title: "독서 관리 시스템",
              desc: "읽기 진행률 · 목표 · 타임라인으로 독서 습관을 관리하는 템플릿",
              price: "₩3,900",
              url: "https://widgit.lemonsqueezy.com",
              emoji: "📖",
            },
            {
              title: "프로젝트 트래커",
              desc: "목표 진행률 · 타임라인 · 습관 트래커 · 카운터로 프로젝트를 관리하는 템플릿",
              price: "₩4,900",
              url: "https://widgit.lemonsqueezy.com",
              emoji: "🎯",
            },
            {
              title: "미니멀 홈 화면",
              desc: "시계 · 날씨 · 명언 · 미니 캘린더를 조합한 깔끔한 노션 홈 화면",
              price: "₩3,900",
              url: "https://widgit.lemonsqueezy.com",
              emoji: "🏠",
            },
            {
              title: "감성 다이어리",
              desc: "메모지 · 명언 · 그라데이션 · 타이프라이터로 꾸민 감성 일기장",
              price: "₩3,900",
              url: "https://widgit.lemonsqueezy.com",
              emoji: "🌸",
            },
            {
              title: "개발자 대시보드",
              desc: "GitHub 잔디 · 뽀모도로 · 스톱워치 · 플립 시계가 세팅된 개발자 홈 화면",
              price: "₩4,900",
              url: "https://widgit.lemonsqueezy.com",
              emoji: "💻",
            },
          ].map((template) => (
            <a
              key={template.title}
              href={template.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border bg-card p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="text-3xl mb-3">{template.emoji}</div>
              <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                {template.title}
              </h3>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {template.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">{template.price}</span>
                <span className="text-xs text-primary flex items-center gap-1">
                  구매하기
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
