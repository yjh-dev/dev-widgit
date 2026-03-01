"use client";

import { Suspense, type ReactNode } from "react";

function Fallback() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <p className="text-muted-foreground text-sm">로딩 중...</p>
    </div>
  );
}

/**
 * 위젯 렌더링 페이지의 공통 래퍼.
 * Suspense + 풀스크린 컨테이너 + 로딩 폴백을 한 번에 제공한다.
 */
export default function WidgetPage({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<Fallback />}>
      {children}
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
