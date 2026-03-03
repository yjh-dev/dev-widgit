export interface ColorTheme {
  id: string;
  name: string;
  bg: string;
  text: string;
  accent: string;
  secondary: string;
}

export const colorThemes: ColorTheme[] = [
  { id: "notion-light", name: "노션 라이트", bg: "FFFFFF", text: "37352F", accent: "2383E2", secondary: "6940A5" },
  { id: "notion-dark", name: "노션 다크", bg: "191919", text: "FFFFFF", accent: "529CCA", secondary: "9A6DD7" },
  { id: "light-default", name: "라이트 기본", bg: "FFFFFF", text: "1E1E1E", accent: "2563EB", secondary: "22C55E" },
  { id: "dark-night", name: "다크 나이트", bg: "1A1A2E", text: "E0E0E0", accent: "7C3AED", secondary: "06B6D4" },
  { id: "warm-pastel", name: "웜 파스텔", bg: "FFF7ED", text: "78350F", accent: "F97316", secondary: "FB923C" },
  { id: "cool-pastel", name: "쿨 파스텔", bg: "F0F9FF", text: "1E3A5F", accent: "3B82F6", secondary: "818CF8" },
  { id: "forest", name: "포레스트", bg: "F0FDF4", text: "14532D", accent: "16A34A", secondary: "22D3EE" },
  { id: "midnight", name: "미드나이트", bg: "0F172A", text: "F1F5F9", accent: "3B82F6", secondary: "F59E0B" },
  { id: "rose", name: "로제", bg: "FFF1F2", text: "881337", accent: "E11D48", secondary: "F472B6" },
  { id: "monochrome", name: "모노크롬", bg: "F5F5F5", text: "262626", accent: "525252", secondary: "A3A3A3" },
  { id: "sunset", name: "선셋", bg: "1C1917", text: "FEF3C7", accent: "F59E0B", secondary: "EF4444" },
  { id: "ocean", name: "오션", bg: "0C4A6E", text: "E0F2FE", accent: "06B6D4", secondary: "22D3EE" },
];

export function getThemeById(id: string): ColorTheme {
  return colorThemes.find((t) => t.id === id) ?? colorThemes[0];
}
