/**
 * 공통 시각 효과 시스템 — 타입, 파서, CSS 빌더.
 * 모든 위젯에 URL 파라미터로 글래스모피즘, 네온, 글로우, 그라데이션 배경, 그림자를 적용한다.
 */

/* ─── Types ─── */

export type EffectType = "none" | "glass" | "neon" | "glow";
export type EffectIntensity = 1 | 2 | 3;
export type BoxShadowPreset = "none" | "sm" | "md" | "lg";

export interface WidgetEffectConfig {
  fx: EffectType;
  fxInt: EffectIntensity;
  gbg: string; // pipe-separated hex colors (e.g. "6366F1|EC4899")
  gbgDir: number;
  neonColor: string; // hex without #
  bshadow: BoxShadowPreset;
}

/* ─── Defaults ─── */

export const EFFECT_DEFAULTS: WidgetEffectConfig = {
  fx: "none",
  fxInt: 2,
  gbg: "",
  gbgDir: 135,
  neonColor: "",
  bshadow: "none",
};

/* ─── Options for editor Select UI ─── */

export const EFFECT_TYPE_OPTIONS: { value: EffectType; label: string }[] = [
  { value: "none", label: "없음" },
  { value: "glass", label: "글라스" },
  { value: "neon", label: "네온" },
  { value: "glow", label: "글로우" },
];

export const EFFECT_INTENSITY_OPTIONS: { value: EffectIntensity; label: string }[] = [
  { value: 1, label: "약하게" },
  { value: 2, label: "보통" },
  { value: 3, label: "강하게" },
];

export const SHADOW_OPTIONS: { value: BoxShadowPreset; label: string }[] = [
  { value: "none", label: "없음" },
  { value: "sm", label: "작게" },
  { value: "md", label: "보통" },
  { value: "lg", label: "크게" },
];

export const GBG_DIR_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: "위 → 아래" },
  { value: 45, label: "↗ 대각선" },
  { value: 90, label: "왼쪽 → 오른쪽" },
  { value: 135, label: "↘ 대각선" },
  { value: 180, label: "아래 → 위" },
  { value: 225, label: "↙ 대각선" },
  { value: 270, label: "오른쪽 → 왼쪽" },
  { value: 315, label: "↖ 대각선" },
];

/* ─── Parser ─── */

const VALID_FX: EffectType[] = ["none", "glass", "neon", "glow"];
const VALID_INT: EffectIntensity[] = [1, 2, 3];
const VALID_SHADOW: BoxShadowPreset[] = ["none", "sm", "md", "lg"];

export function parseEffectParams(p: URLSearchParams): WidgetEffectConfig {
  const rawFx = p.get("fx");
  const fx: EffectType = VALID_FX.includes(rawFx as EffectType) ? (rawFx as EffectType) : "none";

  const rawInt = Number(p.get("fxInt"));
  const fxInt: EffectIntensity = VALID_INT.includes(rawInt as EffectIntensity) ? (rawInt as EffectIntensity) : 2;

  const gbg = p.get("gbg") || "";
  const gbgDir = p.has("gbgDir") ? Number(p.get("gbgDir")) || 135 : 135;

  const neonColor = p.get("neonColor") || "";

  const rawShadow = p.get("bshadow");
  const bshadow: BoxShadowPreset = VALID_SHADOW.includes(rawShadow as BoxShadowPreset) ? (rawShadow as BoxShadowPreset) : "none";

  return { fx, fxInt, gbg, gbgDir, neonColor, bshadow };
}

/** 효과가 하나라도 활성화되어 있는지 */
export function hasActiveEffects(config: WidgetEffectConfig): boolean {
  return config.fx !== "none" || config.gbg !== "" || config.bshadow !== "none";
}

/* ─── CSS Builders ─── */

/** hex 문자열을 r, g, b 숫자로 파싱 */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/** 그라데이션 배경 CSS 문자열 */
export function buildGradientCSS(colors: string[], dir: number): string {
  if (colors.length < 2) return "";
  const stops = colors.map((c) => `#${c}`).join(", ");
  return `linear-gradient(${dir}deg, ${stops})`;
}

/** Glass 효과 CSS 스타일 객체 */
export function buildGlassStyles(intensity: EffectIntensity): React.CSSProperties {
  const blur = [8, 16, 24][intensity - 1];
  const alpha = [0.08, 0.12, 0.18][intensity - 1];
  const borderAlpha = [0.15, 0.2, 0.25][intensity - 1];
  return {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    backgroundColor: `rgba(255, 255, 255, ${alpha})`,
    border: `1px solid rgba(255, 255, 255, ${borderAlpha})`,
  };
}

/** Neon 효과 box-shadow + border */
export function buildNeonStyles(color: string, intensity: EffectIntensity): React.CSSProperties {
  const c = color || "6366F1";
  const [r, g, b] = hexToRgb(c);
  if (intensity === 1) {
    return {
      boxShadow: `0 0 10px rgba(${r},${g},${b},0.7), 0 0 20px rgba(${r},${g},${b},0.4)`,
      border: `1px solid #${c}`,
    };
  }
  if (intensity === 2) {
    return {
      boxShadow: `0 0 15px rgba(${r},${g},${b},0.7), 0 0 40px rgba(${r},${g},${b},0.4)`,
      border: `1.5px solid #${c}`,
    };
  }
  return {
    boxShadow: `0 0 20px rgba(${r},${g},${b},0.7), 0 0 60px rgba(${r},${g},${b},0.4), 0 0 100px rgba(${r},${g},${b},0.2)`,
    border: `2px solid #${c}`,
  };
}

/** Glow 효과 box-shadow */
export function buildGlowShadow(color: string, intensity: EffectIntensity): string {
  const c = color || "6366F1";
  const [r, g, b] = hexToRgb(c);
  if (intensity === 1) return `0 4px 15px rgba(${r},${g},${b},0.25)`;
  if (intensity === 2) return `0 4px 25px rgba(${r},${g},${b},0.35)`;
  return `0 8px 40px rgba(${r},${g},${b},0.5)`;
}

/** Box shadow 프리셋 */
export function buildBoxShadow(preset: BoxShadowPreset): string {
  switch (preset) {
    case "sm": return "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)";
    case "md": return "0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)";
    case "lg": return "0 10px 30px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.1)";
    default: return "";
  }
}
