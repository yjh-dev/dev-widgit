"use client";

import { useState, useEffect, startTransition } from "react";
import { isWatermarkRemoved } from "@/lib/license";

/**
 * 위젯 렌더링 페이지 하단에 표시되는 작은 Widgit 브랜딩.
 * 라이선스 키가 활성화되면 자동으로 숨겨진다.
 */
export default function WidgetWatermark() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setShow(!isWatermarkRemoved());
    });
  }, []);

  if (!show) return null;

  return (
    <a
      href="https://widgit.vercel.app"
      target="_top"
      rel="noopener noreferrer"
      className="fixed bottom-1 right-1.5 z-50 px-1.5 py-0.5 rounded text-[9px] font-medium tracking-wide opacity-30 hover:opacity-60 transition-opacity"
      style={{ color: "inherit", textDecoration: "none" }}
    >
      Widgit
    </a>
  );
}
