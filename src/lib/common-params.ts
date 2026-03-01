/**
 * 에디터 useInitFromUrl 콜백에서 공통 파라미터를 파싱하는 유틸리티.
 * bg/transparent, radius, pad, fsize 파라미터를 Record로 반환한다.
 */

import type { FontSizeKey } from "@/lib/common-widget-options";
import type { EffectType, EffectIntensity, BoxShadowPreset } from "@/lib/widget-effects";

export function parseCommonParams(p: URLSearchParams): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  if (p.has("bg")) {
    if (p.get("bg") === "transparent") {
      result.transparentBg = true;
    } else {
      result.bg = p.get("bg")!;
    }
  }
  if (p.has("radius")) result.borderRadius = Number(p.get("radius"));
  if (p.has("pad")) result.padding = Number(p.get("pad"));
  if (p.has("fsize")) result.fontSize = p.get("fsize") as FontSizeKey;

  // Effect params
  if (p.has("fx")) result.fx = p.get("fx") as EffectType;
  if (p.has("fxInt")) result.fxInt = Number(p.get("fxInt")) as EffectIntensity;
  if (p.has("gbg")) result.gbg = p.get("gbg")!;
  if (p.has("gbgDir")) result.gbgDir = Number(p.get("gbgDir"));
  if (p.has("neonColor")) result.neonColor = p.get("neonColor")!;
  if (p.has("bshadow")) result.bshadow = p.get("bshadow") as BoxShadowPreset;

  return result;
}

/**
 * 위젯 렌더링 페이지에서 bg 파라미터를 파싱한다.
 * "transparent" → transparentBg=true + bg="FFFFFF"
 */
export function parseBgParam(raw: string | null): {
  bg: string;
  transparentBg: boolean;
} {
  const bgValue = raw || "FFFFFF";
  const transparentBg = bgValue === "transparent";
  const bg = transparentBg ? "FFFFFF" : bgValue;
  return { bg, transparentBg };
}
