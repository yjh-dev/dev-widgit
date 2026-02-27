"use client";

import { type ReactNode, Children, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { ArrowLeft, LayoutGrid, RectangleHorizontal, Square, RectangleVertical, Maximize } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import { EditorActionsProvider } from "./EditorActionsContext";
import MobileBottomBar from "./MobileBottomBar";
import MobilePreviewFab from "./MobilePreviewFab";
import { addRecentWidget } from "@/lib/recent-widgets";

type PreviewSize = "free" | "square" | "wide" | "tall";
const previewSizes: { key: PreviewSize; label: string; icon: typeof Square; aspect?: string }[] = [
  { key: "free", label: "자유", icon: Maximize },
  { key: "square", label: "1:1", icon: Square, aspect: "1/1" },
  { key: "wide", label: "2:1", icon: RectangleHorizontal, aspect: "2/1" },
  { key: "tall", label: "1:2", icon: RectangleVertical, aspect: "1/2" },
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

export default function EditorLayout({ title, children }: EditorLayoutProps) {
  const childArray = Children.toArray(children);
  const formPanel = childArray[0];
  const previewPanel = childArray[1];
  const pathname = usePathname();
  const [previewSize, setPreviewSize] = useState<PreviewSize>("free");

  useEffect(() => {
    // /create/dday → dday
    const type = pathname.replace("/create/", "");
    if (type && type !== pathname) addRecentWidget(type);
  }, [pathname]);

  const sizeConfig = previewSizes.find((s) => s.key === previewSize)!;

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {formPanel}
            {/* Desktop: show preview inline; Mobile: hidden (use FAB instead) */}
            <div className="hidden md:block md:sticky md:top-8" id="widget-preview">
              {/* Preview size selector */}
              <div className="flex items-center gap-1 mb-2 justify-end">
                {previewSizes.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setPreviewSize(s.key)}
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
              <div
                className="overflow-hidden transition-all"
                style={sizeConfig.aspect ? { aspectRatio: sizeConfig.aspect } : undefined}
              >
                {previewPanel}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only: FAB + bottom sheet preview */}
        <MobilePreviewFab>{previewPanel}</MobilePreviewFab>

        {/* Mobile-only: fixed bottom action bar */}
        <MobileBottomBar />
      </div>
    </EditorActionsProvider>
  );
}
