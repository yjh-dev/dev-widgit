"use client";

import { type ReactNode, Children, Suspense, useEffect, useState, useRef, useCallback, startTransition } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { ArrowLeft, LayoutGrid, RectangleHorizontal, Square, RectangleVertical, Maximize, AppWindow, Info } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import { EditorActionsProvider } from "./EditorActionsContext";
import MobileBottomBar from "./MobileBottomBar";
import MobilePreviewFab from "./MobilePreviewFab";
import AdBanner from "@/components/AdBanner";
import NotionPageMockup from "./NotionPageMockup";
import { addRecentWidget } from "@/lib/recent-widgets";
import { getSizeGuide } from "@/lib/widget-size-guide";

type PreviewSize = "free" | "square" | "wide" | "tall" | "notion-full" | "notion-half" | "notion";
const previewSizes: { key: PreviewSize; label: string; icon: typeof Square; aspect?: string }[] = [
  { key: "free", label: "자유", icon: Maximize },
  { key: "square", label: "1:1", icon: Square, aspect: "1/1" },
  { key: "wide", label: "2:1", icon: RectangleHorizontal, aspect: "2/1" },
  { key: "tall", label: "1:2", icon: RectangleVertical, aspect: "1/2" },
  { key: "notion-full", label: "전체폭", icon: RectangleHorizontal, aspect: "16/5" },
  { key: "notion-half", label: "반폭", icon: Square, aspect: "4/5" },
  { key: "notion", label: "노션", icon: AppWindow, aspect: "4/3" },
];

interface EditorLayoutProps {
  title: string;
  children: ReactNode;
}

function EditorBackLinks() {
  const searchParams = useSearchParams();
  const fromTemplates = searchParams.get("from") === "templates";

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        홈으로
      </Link>
      {fromTemplates && (
        <Link
          href="/templates"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <LayoutGrid className="w-4 h-4" />
          추천 조합으로
        </Link>
      )}
    </div>
  );
}

/**
 * free: 자연 크기로 렌더
 * 비율 모드: 콘텐츠를 visibility:hidden으로 자연 크기 측정 후
 *   컨테이너에 맞게 scale 축소하여 잘림 없이 표시
 */
function PreviewContainer({ aspect, children }: { aspect?: string; children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [layout, setLayout] = useState({ scale: 1, offsetX: 0, offsetY: 0 });
  const [ready, setReady] = useState(false);

  const measure = useCallback(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // 스케일 초기화해서 자연 크기 측정
    inner.style.transform = "none";
    const ow = outer.clientWidth;
    const oh = outer.clientHeight;
    const iw = inner.scrollWidth;
    const ih = inner.scrollHeight;

    if (iw <= 0 || ih <= 0 || ow <= 0 || oh <= 0) {
      startTransition(() => {
        setLayout({ scale: 1, offsetX: 0, offsetY: 0 });
        setReady(true);
      });
      return;
    }

    const s = Math.min(ow / iw, oh / ih, 1);
    const offsetX = (ow - iw * s) / 2;
    const offsetY = (oh - ih * s) / 2;
    inner.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${s})`;
    startTransition(() => {
      setLayout({ scale: s, offsetX, offsetY });
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (!aspect) { startTransition(() => setReady(true)); return; }
    // 첫 렌더 후 측정
    const frame = requestAnimationFrame(measure);
    const ro = new ResizeObserver(() => measure());
    if (outerRef.current) ro.observe(outerRef.current);
    return () => { cancelAnimationFrame(frame); ro.disconnect(); };
  }, [aspect, measure]);

  if (!aspect) {
    return <div id="widget-preview">{children}</div>;
  }

  return (
    <div
      id="widget-preview"
      ref={outerRef}
      className="relative overflow-hidden"
      style={{ aspectRatio: aspect, opacity: ready ? 1 : 0 }}
    >
      <div
        ref={innerRef}
        className="origin-top-left w-full"
        style={{
          transform: `translate(${layout.offsetX}px, ${layout.offsetY}px) scale(${layout.scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

const LS_PREVIEW_SIZE = "widgit-preview-size";

export default function EditorLayout({ title, children }: EditorLayoutProps) {
  const childArray = Children.toArray(children);
  const formPanel = childArray[0];
  const previewPanel = childArray[1];
  const pathname = usePathname();
  const [previewSize, setPreviewSize] = useState<PreviewSize>("free");

  // localStorage에서 프리뷰 사이즈 복원
  useEffect(() => {
    startTransition(() => {
      try {
        const saved = localStorage.getItem(LS_PREVIEW_SIZE) as PreviewSize | null;
        if (saved && previewSizes.some((s) => s.key === saved)) setPreviewSize(saved);
      } catch { /* 무시 */ }
    });
  }, []);

  const handlePreviewSizeChange = (size: PreviewSize) => {
    setPreviewSize(size);
    try { localStorage.setItem(LS_PREVIEW_SIZE, size); } catch { /* 무시 */ }
  };

  useEffect(() => {
    // /create/dday → dday
    const type = pathname.replace("/create/", "");
    if (type && type !== pathname) addRecentWidget(type);
  }, [pathname]);

  const sizeConfig = previewSizes.find((s) => s.key === previewSize)!;
  const widgetType = pathname.replace("/create/", "");
  const sizeGuide = widgetType !== pathname ? getSizeGuide(widgetType) : undefined;

  const renderPreview = (panel: ReactNode) => {
    if (previewSize === "notion") {
      return (
        <NotionPageMockup>
          <div id="widget-preview">{panel}</div>
        </NotionPageMockup>
      );
    }
    return (
      <PreviewContainer aspect={sizeConfig.aspect}>
        {panel}
      </PreviewContainer>
    );
  };

  return (
    <EditorActionsProvider>
      <div className="min-h-screen bg-background p-6 md:p-12 pb-24 md:pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Suspense
              fallback={
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4" />
                  홈으로
                </Link>
              }
            >
              <EditorBackLinks />
            </Suspense>
            <ThemeToggle />
          </div>
          <h1 className="text-2xl font-bold mb-1">{title}</h1>
          <p className="text-muted-foreground text-sm mb-8">
            설정을 변경하면 프리뷰에 실시간으로 반영됩니다.
          </p>

          <div className="mb-6">
            <AdBanner format="horizontal" className="max-w-5xl mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {formPanel}
            {/* Desktop: show preview inline; Mobile: hidden (use FAB instead) */}
            <div className="hidden md:block md:sticky md:top-8">
              {/* Preview size selector */}
              <div className="flex items-center gap-1 mb-2 justify-end flex-wrap">
                {previewSizes.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => handlePreviewSizeChange(s.key)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                        previewSize === s.key
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                      title={s.label}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {s.label}
                    </button>
                  );
                })}
              </div>
              {sizeGuide && (
                <div className="flex items-start gap-1.5 mb-2 text-xs text-muted-foreground">
                  <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>추천: <strong className="text-foreground">{sizeGuide.recommended}</strong> — {sizeGuide.tip}</span>
                </div>
              )}
              {renderPreview(previewPanel)}
            </div>
          </div>
        </div>

        {/* Mobile-only: FAB + bottom sheet preview */}
        <MobilePreviewFab aspect={sizeConfig.aspect}>{previewPanel}</MobilePreviewFab>

        {/* Mobile-only: fixed bottom action bar */}
        <MobileBottomBar />
      </div>
    </EditorActionsProvider>
  );
}
