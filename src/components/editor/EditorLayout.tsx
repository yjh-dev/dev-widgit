"use client";

import { type ReactNode, Children, Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import { EditorActionsProvider } from "./EditorActionsContext";
import MobileBottomBar from "./MobileBottomBar";
import MobilePreviewFab from "./MobilePreviewFab";
import { addRecentWidget } from "@/lib/recent-widgets";

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

  useEffect(() => {
    // /create/dday → dday
    const type = pathname.replace("/create/", "");
    if (type && type !== pathname) addRecentWidget(type);
  }, [pathname]);

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
            <div className="hidden md:block" id="widget-preview">{previewPanel}</div>
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
