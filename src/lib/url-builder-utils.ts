/**
 * 에디터 URL 빌더 공통 유틸리티.
 * 위젯별 비기본값 파라미터만 URL에 추가하는 패턴을 공통화한다.
 */

/** 투명 배경 / 배경색 파라미터를 URL에 추가한다. */
export function addBgParam(
  params: URLSearchParams,
  transparentBg: boolean,
  bg: string,
  defaultBg = "FFFFFF",
) {
  if (transparentBg) {
    params.set("bg", "transparent");
  } else if (bg !== defaultBg) {
    params.set("bg", bg);
  }
}

/** 공통 스타일(radius, pad, fsize) 파라미터를 URL에 추가한다. */
export function addCommonStyleParams(
  params: URLSearchParams,
  borderRadius: number,
  padding: number,
  fontSize: string,
) {
  if (borderRadius !== 16) params.set("radius", String(borderRadius));
  if (padding !== 24) params.set("pad", String(padding));
  if (fontSize !== "md") params.set("fsize", fontSize);
}

import type { EffectType, EffectIntensity, BoxShadowPreset } from "@/lib/widget-effects";

/** 효과 파라미터를 URL에 추가한다. 기본값이면 생략. */
export function addEffectParams(
  params: URLSearchParams,
  fx: EffectType,
  fxInt: EffectIntensity,
  gbg: string,
  gbgDir: number,
  neonColor: string,
  bshadow: BoxShadowPreset,
) {
  if (fx !== "none") params.set("fx", fx);
  if (fx !== "none" && fxInt !== 2) params.set("fxInt", String(fxInt));
  if (gbg) params.set("gbg", gbg);
  if (gbg && gbgDir !== 135) params.set("gbgDir", String(gbgDir));
  if (neonColor) params.set("neonColor", neonColor);
  if (bshadow !== "none") params.set("bshadow", bshadow);
}

/** base + params를 합쳐 최종 URL을 반환한다. */
export function buildUrl(base: string, params: URLSearchParams): string {
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}
