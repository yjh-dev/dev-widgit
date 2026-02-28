export type GradientType = "linear" | "radial" | "conic";

export interface GradientPresetItem {
  id: string;
  name: string;
  colors: string[];
  dir: number;
}

export const GRADIENT_PRESETS: GradientPresetItem[] = [
  { id: "sunset", name: "선셋", colors: ["FF512F", "DD2476"], dir: 135 },
  { id: "ocean", name: "오션", colors: ["2193B0", "6DD5ED"], dir: 135 },
  { id: "aurora", name: "오로라", colors: ["00C9FF", "92FE9D"], dir: 135 },
  { id: "candy", name: "캔디", colors: ["A18CD1", "FBC2EB"], dir: 135 },
  { id: "forest", name: "포레스트", colors: ["134E5E", "71B280"], dir: 135 },
  { id: "midnight", name: "미드나이트", colors: ["0F2027", "203A43", "2C5364"], dir: 135 },
  { id: "fire", name: "파이어", colors: ["F12711", "F5AF19"], dir: 135 },
  { id: "lavender", name: "라벤더", colors: ["E6DEE9", "BDC2E8", "E6DEE9"], dir: 135 },
];

export function buildGradientCSS(
  colors: string[],
  dir: number,
  type: GradientType,
): string {
  const stops = colors.map((c) => `#${c}`).join(", ");
  switch (type) {
    case "radial":
      return `radial-gradient(circle, ${stops})`;
    case "conic":
      return `conic-gradient(from ${dir}deg, ${stops})`;
    default:
      return `linear-gradient(${dir}deg, ${stops})`;
  }
}
