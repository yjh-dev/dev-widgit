export type QuoteFont = "sans" | "serif" | "script";

export const QUOTE_FONT_FAMILY_MAP: Record<QuoteFont, string> = {
  sans: "ui-sans-serif, system-ui, sans-serif",
  serif: "ui-serif, Georgia, serif",
  script: "'Segoe Script', 'Apple Chancery', cursive",
};

export const QUOTE_FONT_OPTIONS: { value: QuoteFont; label: string }[] = [
  { value: "sans", label: "Sans (고딕)" },
  { value: "serif", label: "Serif (명조)" },
  { value: "script", label: "Script (필기)" },
];

export type TextAlign = "left" | "center" | "right";
export type LineHeight = "tight" | "normal" | "relaxed";

export const ALIGN_OPTIONS: { value: TextAlign; label: string }[] = [
  { value: "left", label: "왼쪽" },
  { value: "center", label: "가운데" },
  { value: "right", label: "오른쪽" },
];

export const LINE_HEIGHT_OPTIONS: { value: LineHeight; label: string }[] = [
  { value: "tight", label: "좁게" },
  { value: "normal", label: "보통" },
  { value: "relaxed", label: "넓게" },
];

export const LINE_HEIGHT_MAP: Record<LineHeight, string> = {
  tight: "1.25",
  normal: "1.5",
  relaxed: "1.75",
};
