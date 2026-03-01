export interface LayoutPreset {
  id: string;
  name: string;
  desc: string;
  slots: number;
  grid: number[][];
}

export const layoutPresets: LayoutPreset[] = [
  { id: "single", name: "1열 스택", desc: "세로 나열", slots: 3, grid: [[1], [1], [1]] },
  { id: "two-col", name: "2열 균등", desc: "나란히 2개", slots: 2, grid: [[1, 1]] },
  { id: "three-col", name: "3열 균등", desc: "나란히 3개", slots: 3, grid: [[1, 1, 1]] },
  { id: "header-two", name: "헤더 + 2열", desc: "전폭 헤더 아래 2열", slots: 3, grid: [[1], [1, 1]] },
  { id: "two-footer", name: "2열 + 전폭", desc: "2열 아래 전폭 푸터", slots: 3, grid: [[1, 1], [1]] },
  { id: "grid-2x2", name: "2×2 그리드", desc: "정사각 그리드", slots: 4, grid: [[1, 1], [1, 1]] },
  { id: "header-three", name: "헤더 + 3열", desc: "전폭 + 3열", slots: 4, grid: [[1], [1, 1, 1]] },
  { id: "sandwich", name: "샌드위치", desc: "전폭+2열+전폭", slots: 4, grid: [[1], [1, 1], [1]] },
  { id: "dashboard", name: "대시보드", desc: "2+2+1", slots: 5, grid: [[1, 1], [1, 1], [1]] },
];
