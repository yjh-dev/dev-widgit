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
