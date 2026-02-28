import { create } from "zustand";
import type { MatrixItem } from "@/lib/matrix";
import { DEFAULT_LABELS, QUADRANT_COLORS } from "@/lib/matrix";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface MatrixState {
  items: MatrixItem[];
  labels: [string, string, string, string];
  showLabels: boolean;
  showAxes: boolean;
  axisX: string;
  axisY: string;
  color0: string;
  color1: string;
  color2: string;
  color3: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setItems: (v: MatrixItem[]) => void;
  addItem: (item: MatrixItem) => void;
  removeItem: (index: number) => void;
  setLabels: (v: [string, string, string, string]) => void;
  setLabel: (index: number, value: string) => void;
  setShowLabels: (v: boolean) => void;
  setShowAxes: (v: boolean) => void;
  setAxisX: (v: string) => void;
  setAxisY: (v: string) => void;
  setColor0: (v: string) => void;
  setColor1: (v: string) => void;
  setColor2: (v: string) => void;
  setColor3: (v: string) => void;
  setTextColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  items: [
    { text: "프로젝트 마감", quadrant: 0 },
    { text: "운동 계획", quadrant: 1 },
    { text: "이메일 답장", quadrant: 2 },
    { text: "SNS 확인", quadrant: 3 },
  ] as MatrixItem[],
  labels: [...DEFAULT_LABELS] as [string, string, string, string],
  showLabels: true,
  showAxes: true,
  axisX: "긴급도",
  axisY: "중요도",
  color0: QUADRANT_COLORS[0],
  color1: QUADRANT_COLORS[1],
  color2: QUADRANT_COLORS[2],
  color3: QUADRANT_COLORS[3],
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useMatrixStore = create<MatrixState>((set) => ({
  ...initialState,

  setItems: (items) => set({ items }),
  addItem: (item) =>
    set((s) => ({ items: [...s.items, item] })),
  removeItem: (index) =>
    set((s) => ({ items: s.items.filter((_, i) => i !== index) })),
  setLabels: (labels) => set({ labels }),
  setLabel: (index, value) =>
    set((s) => {
      const next = [...s.labels] as [string, string, string, string];
      next[index] = value;
      return { labels: next };
    }),
  setShowLabels: (showLabels) => set({ showLabels }),
  setShowAxes: (showAxes) => set({ showAxes }),
  setAxisX: (axisX) => set({ axisX }),
  setAxisY: (axisY) => set({ axisY }),
  setColor0: (color0) => set({ color0 }),
  setColor1: (color1) => set({ color1 }),
  setColor2: (color2) => set({ color2 }),
  setColor3: (color3) => set({ color3 }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
