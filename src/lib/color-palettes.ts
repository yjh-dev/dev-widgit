/**
 * 카테고리별 색상 팔레트.
 * ColorPicker 컴포넌트에서 사용한다.
 */

export interface ColorCategory {
  name: string;
  colors: string[];
}

export const COLOR_PALETTES: ColorCategory[] = [
  {
    name: "모노크롬",
    colors: ["000000", "1E1E1E", "374151", "6B7280", "D1D5DB", "FFFFFF"],
  },
  {
    name: "파스텔",
    colors: ["FEC5BB", "FCD5CE", "FAE1DD", "F8EDEB", "D8E2DC", "B5C7D3", "C5DEDD", "ECE4DB"],
  },
  {
    name: "비비드",
    colors: ["EF4444", "F97316", "EAB308", "22C55E", "06B6D4", "3B82F6", "8B5CF6", "EC4899"],
  },
  {
    name: "어스톤",
    colors: ["92400E", "78350F", "365314", "1E3A5F", "4C1D95", "831843"],
  },
  {
    name: "노션 스타일",
    colors: ["2563EB", "E11D48", "16A34A", "CA8A04", "9333EA", "0891B2"],
  },
];
