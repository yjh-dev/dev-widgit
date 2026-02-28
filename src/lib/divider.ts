export type DividerStyle = "solid" | "dashed" | "dotted" | "wave" | "zigzag" | "gradient" | "double";
export type DividerWeight = "thin" | "medium" | "thick";

export const WEIGHT_PX: Record<DividerWeight, number> = {
  thin: 1,
  medium: 2,
  thick: 4,
};

export const DIVIDER_STYLE_OPTIONS: { value: DividerStyle; label: string }[] = [
  { value: "solid", label: "실선" },
  { value: "dashed", label: "대시" },
  { value: "dotted", label: "점선" },
  { value: "wave", label: "물결" },
  { value: "zigzag", label: "지그재그" },
  { value: "gradient", label: "그라데이션" },
  { value: "double", label: "이중선" },
];

export const DIVIDER_WEIGHT_OPTIONS: { value: DividerWeight; label: string }[] = [
  { value: "thin", label: "가늘게" },
  { value: "medium", label: "보통" },
  { value: "thick", label: "굵게" },
];
