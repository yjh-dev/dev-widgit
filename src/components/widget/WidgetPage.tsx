"use client";

import { Suspense, type ReactNode } from "react";
import WidgetWatermark from "@/components/widget/WidgetWatermark";

function Fallback() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 border-3 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
      <p className="text-muted-foreground text-sm animate-pulse">위젯 로딩 중...</p>
    </div>
  );
}

/**
 * 위젯 렌더링 페이지의 공통 래퍼.
 * Suspense + 풀스크린 컨테이너 + 로딩 폴백 + 워터마크를 한 번에 제공한다.
 */
export default function WidgetPage({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Fallback />}>
      {children}
      <WidgetWatermark />
    </Suspense>
  );
}

/** 위젯 콘텐츠를 풀스크린으로 감싸는 컨테이너. */
export function WidgetScreen({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen bg-transparent">
      {children}
    </div>
  );
}
