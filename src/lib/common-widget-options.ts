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
