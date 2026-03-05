/**
 * 날짜 기반 결정론적 해시 → HSL 색상을 생성한다.
 * 같은 날짜에는 항상 같은 색상을 반환한다.
 */

const COLOR_NAMES: { min: number; max: number; name: string }[] = [
  { min: 0, max: 15, name: "빨강" },
  { min: 15, max: 45, name: "주황" },
  { min: 45, max: 65, name: "노랑" },
  { min: 65, max: 85, name: "연두" },
  { min: 85, max: 140, name: "초록" },
  { min: 140, max: 175, name: "청록" },
  { min: 175, max: 200, name: "하늘" },
  { min: 200, max: 240, name: "파랑" },
  { min: 240, max: 265, name: "남색" },
  { min: 265, max: 300, name: "보라" },
  { min: 300, max: 330, name: "자주" },
  { min: 330, max: 360, name: "분홍" },
];

function getColorName(hue: number): string {
  const h = ((hue % 360) + 360) % 360;
  for (const c of COLOR_NAMES) {
    if (h >= c.min && h < c.max) return c.name;
  }
  return "빨강";
}

/** 간단한 해시 함수 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

/** HSL → RGB */
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/** RGB → HEX (# 없이) */
function rgbToHex(r: number, g: number, b: number): string {
  return [r, g, b]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

export interface DailyColorResult {
  hex: string;
  rgb: { r: number; g: number; b: number };
  name: string;
  hue: number;
}

/**
 * 주어진 날짜(기본: 오늘)에 대한 오늘의 색을 반환한다.
 * 결정론적: 같은 날짜 → 같은 색.
 */
export function getDailyColor(date?: Date): DailyColorResult {
  const d = date ?? new Date();
  const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const hash = hashString(dateStr);

  const hue = hash % 360;
  const saturation = 55 + (hash % 30); // 55-84
  const lightness = 50 + ((hash >> 8) % 15); // 50-64

  const rgb = hslToRgb(hue, saturation, lightness);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
  const name = getColorName(hue);

  return { hex, rgb, name, hue };
}

/** 색상이 어두운지 판단 (텍스트 색상 결정용) */
export function isColorDark(hex: string): boolean {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}
