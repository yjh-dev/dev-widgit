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
