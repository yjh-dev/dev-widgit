"use client";

import { Suspense, type ReactNode } from "react";
import WidgetWatermark from "@/components/widget/WidgetWatermark";
import WidgetEffectsWrapper from "@/components/widget/WidgetEffectsWrapper";
import type { ExtraStyleConfig } from "@/components/widget/WidgetEffectsWrapper";
import { useWidgetParams } from "@/lib/use-widget-params";
import { parseEffectParams, hasActiveEffects } from "@/lib/widget-effects";
import {
  parseBorderRadius,
  parseTextShadow,
  parseBorderWidth,
  parseHexColor,
  parseOpacity,
  parseLetterSpacing,
  parseEntrance,
  parseEntranceDelay,
  type EntranceType,
} from "@/lib/common-widget-options";
import { useScheduleVisibility } from "@/lib/widget-schedule";

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

/** URL에서 추가 스타일 파라미터를 파싱한다. */
function parseExtraStyle(searchParams: URLSearchParams): ExtraStyleConfig {
  return {
    tshadow: parseTextShadow(searchParams.get("tshadow")),
    bw: parseBorderWidth(searchParams.get("bw")),
    bc: parseHexColor(searchParams.get("bc"), "D1D5DB"),
    opacity: parseOpacity(searchParams.get("opacity")),
    ls: parseLetterSpacing(searchParams.get("ls")),
  };
}

/** 진입 애니메이션 CSS animation 값을 반환한다. */
function getEntranceAnimation(entrance: EntranceType, delay: string): string | undefined {
  if (entrance === "none") return undefined;
  const name = entrance === "fade" ? "wg-fade-in" : entrance === "slide-up" ? "wg-slide-up" : "wg-scale-in";
  return `${name} 0.6s ease-out ${delay}ms both`;
}

/** 추가 스타일이 활성 상태인지 확인한다. */
function hasActiveExtraStyle(es: ExtraStyleConfig): boolean {
  return es.tshadow !== "none" || es.bw !== "none" || es.opacity !== "100" || es.ls !== "normal";
}

/** 위젯 콘텐츠를 풀스크린으로 감싸는 컨테이너. 효과 파라미터를 자동 파싱하여 적용한다. */
export function WidgetScreen({ children }: { children: ReactNode }) {
  const searchParams = useWidgetParams();
  const effectConfig = parseEffectParams(searchParams);
  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const extraStyle = parseExtraStyle(searchParams);
  const active = hasActiveEffects(effectConfig) || hasActiveExtraStyle(extraStyle);

  // Entrance animation
  const entrance = parseEntrance(searchParams.get("entrance"));
  const entranceDelay = parseEntranceDelay(searchParams.get("ed"));

  // Schedule visibility
  const showFrom = searchParams.get("showFrom") || undefined;
  const showUntil = searchParams.get("showUntil") || undefined;
  const expireMsg = searchParams.get("expireMsg") || "";
  const scheduleStatus = useScheduleVisibility(showFrom, showUntil);

  if (scheduleStatus === "before") {
    return <div className="w-screen h-screen" />;
  }

  if (scheduleStatus === "after") {
    if (expireMsg) {
      return (
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">{expireMsg}</p>
        </div>
      );
    }
    return <div className="w-screen h-screen" />;
  }

  const animStyle = getEntranceAnimation(entrance, entranceDelay);

  return (
    <div
      className="w-screen h-screen"
      style={{
        background: active ? "transparent" : undefined,
        animation: animStyle,
      }}
    >
      <WidgetEffectsWrapper config={effectConfig} borderRadius={borderRadius} extraStyle={extraStyle}>
        {children}
      </WidgetEffectsWrapper>
    </div>
  );
}
