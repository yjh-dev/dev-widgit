export type FontSizeKey = "sm" | "md" | "lg" | "xl";

export const FONT_SIZE_OPTIONS: { value: FontSizeKey; label: string }[] = [
  { value: "sm", label: "작게" },
  { value: "md", label: "보통" },
  { value: "lg", label: "크게" },
  { value: "xl", label: "매우 크게" },
];

export const BORDER_RADIUS_OPTIONS: { value: number; label: string }[] = [
  { value: 0, label: "없음" },
  { value: 8, label: "작게" },
  { value: 16, label: "보통" },
  { value: 24, label: "크게" },
  { value: 9999, label: "완전 둥글게" },
];

export const PADDING_OPTIONS: { value: number; label: string }[] = [
  { value: 8, label: "좁게" },
  { value: 16, label: "보통" },
  { value: 24, label: "넓게" },
  { value: 32, label: "매우 넓게" },
];

/* ─── 진입 애니메이션 ─── */

export type EntranceType = "none" | "fade" | "slide-up" | "scale";
export type EntranceDelayKey = "0" | "200" | "400" | "600";

export const ENTRANCE_OPTIONS: { value: EntranceType; label: string }[] = [
  { value: "none", label: "없음" },
  { value: "fade", label: "페이드 인" },
  { value: "slide-up", label: "슬라이드 업" },
  { value: "scale", label: "스케일" },
];

export const ENTRANCE_DELAY_OPTIONS: { value: EntranceDelayKey; label: string }[] = [
  { value: "0", label: "즉시" },
  { value: "200", label: "0.2초" },
  { value: "400", label: "0.4초" },
  { value: "600", label: "0.6초" },
];

export function parseEntrance(raw: string | null): EntranceType {
  if (!raw) return "none";
  const valid: EntranceType[] = ["none", "fade", "slide-up", "scale"];
  return valid.includes(raw as EntranceType) ? (raw as EntranceType) : "none";
}

export function parseEntranceDelay(raw: string | null): EntranceDelayKey {
  if (!raw) return "0";
  const valid: EntranceDelayKey[] = ["0", "200", "400", "600"];
  return valid.includes(raw as EntranceDelayKey) ? (raw as EntranceDelayKey) : "0";
}

/* ─── 새로운 공통 스타일 옵션 ─── */

export type TextShadowKey = "none" | "sm" | "md" | "lg";
export type BorderWidthKey = "none" | "thin" | "medium";
export type OpacityKey = "100" | "90" | "80" | "70" | "60";
export type LetterSpacingKey = "tight" | "normal" | "wide";

export const TEXT_SHADOW_OPTIONS: { value: TextShadowKey; label: string }[] = [
  { value: "none", label: "없음" },
  { value: "sm", label: "작게" },
  { value: "md", label: "보통" },
  { value: "lg", label: "크게" },
];

export const BORDER_WIDTH_OPTIONS: { value: BorderWidthKey; label: string }[] = [
  { value: "none", label: "없음" },
  { value: "thin", label: "얇게" },
  { value: "medium", label: "보통" },
];

export const OPACITY_OPTIONS: { value: OpacityKey; label: string }[] = [
  { value: "100", label: "100%" },
  { value: "90", label: "90%" },
  { value: "80", label: "80%" },
  { value: "70", label: "70%" },
  { value: "60", label: "60%" },
];

export const LETTER_SPACING_OPTIONS: { value: LetterSpacingKey; label: string }[] = [
  { value: "tight", label: "좁게" },
  { value: "normal", label: "보통" },
  { value: "wide", label: "넓게" },
];

/* ─── 파서 ─── */

export function parseBorderRadius(raw: string | null): number {
  if (!raw) return 16;
  const n = Number(raw);
  if (BORDER_RADIUS_OPTIONS.some((o) => o.value === n)) return n;
  return 16;
}

export function parsePadding(raw: string | null): number {
  if (!raw) return 24;
  const n = Number(raw);
  if (PADDING_OPTIONS.some((o) => o.value === n)) return n;
  return 24;
}

export function parseFontSize(raw: string | null): FontSizeKey {
  if (!raw) return "md";
  const valid: FontSizeKey[] = ["sm", "md", "lg", "xl"];
  return valid.includes(raw as FontSizeKey) ? (raw as FontSizeKey) : "md";
}

export function parseHexColor(raw: string | null, fallback: string): string {
  if (!raw) return fallback;
  if (raw === "transparent") return raw;
  return /^[0-9a-fA-F]{6}$/.test(raw) ? raw : fallback;
}

export function parseTextShadow(raw: string | null): TextShadowKey {
  if (!raw) return "none";
  const valid: TextShadowKey[] = ["none", "sm", "md", "lg"];
  return valid.includes(raw as TextShadowKey) ? (raw as TextShadowKey) : "none";
}

export function parseBorderWidth(raw: string | null): BorderWidthKey {
  if (!raw) return "none";
  const valid: BorderWidthKey[] = ["none", "thin", "medium"];
  return valid.includes(raw as BorderWidthKey) ? (raw as BorderWidthKey) : "none";
}

export function parseOpacity(raw: string | null): OpacityKey {
  if (!raw) return "100";
  const valid: OpacityKey[] = ["100", "90", "80", "70", "60"];
  return valid.includes(raw as OpacityKey) ? (raw as OpacityKey) : "100";
}

export function parseLetterSpacing(raw: string | null): LetterSpacingKey {
  if (!raw) return "normal";
  const valid: LetterSpacingKey[] = ["tight", "normal", "wide"];
  return valid.includes(raw as LetterSpacingKey) ? (raw as LetterSpacingKey) : "normal";
}

/* ─── CSS 매핑 ─── */

/**
 * 프리뷰 컴포넌트에서 공통으로 사용하는 글자 크기 Tailwind 클래스 맵.
 * 위젯별로 커스텀 맵이 필요하면 이 맵을 참조하지 않아도 된다.
 */
export const FONT_SIZE_CLASS: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

/** 제목용 큰 글자 크기 맵 */
export const TITLE_FONT_SIZE_CLASS: Record<FontSizeKey, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

/** textShadow CSS 값 맵 */
export const TEXT_SHADOW_CSS: Record<TextShadowKey, string> = {
  none: "none",
  sm: "0 1px 2px rgba(0,0,0,0.15)",
  md: "0 2px 4px rgba(0,0,0,0.25)",
  lg: "0 4px 8px rgba(0,0,0,0.35)",
};

/** border-width CSS 값 맵 */
export const BORDER_WIDTH_CSS: Record<BorderWidthKey, string> = {
  none: "0",
  thin: "1px",
  medium: "2px",
};

/** letter-spacing CSS 값 맵 */
export const LETTER_SPACING_CSS: Record<LetterSpacingKey, string> = {
  tight: "-0.025em",
  normal: "0",
  wide: "0.05em",
};
