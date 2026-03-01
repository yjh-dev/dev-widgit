import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { MatrixItem } from "@/lib/matrix";
import { DEFAULT_LABELS, QUADRANT_COLORS } from "@/lib/matrix";

const widgetDefaults = {
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
};

interface MatrixState extends CommonStyleState {
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
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useMatrixStore = create<MatrixState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setItems: (v: MatrixItem[]) => set({ items: v }),
    addItem: (item: MatrixItem) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: MatrixState) => ({ items: [...s.items, item] })),
    removeItem: (index: number) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: MatrixState) => ({ items: s.items.filter((_: MatrixItem, i: number) => i !== index) })),
    setLabels: (v: [string, string, string, string]) => set({ labels: v }),
    setLabel: (index: number, value: string) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (set as any)((s: MatrixState) => {
        const next = [...s.labels] as [string, string, string, string];
        next[index] = value;
        return { labels: next };
      }),
    setShowLabels: (v: boolean) => set({ showLabels: v }),
    setShowAxes: (v: boolean) => set({ showAxes: v }),
    setAxisX: (v: string) => set({ axisX: v }),
    setAxisY: (v: string) => set({ axisY: v }),
    setColor0: (v: string) => set({ color0: v }),
    setColor1: (v: string) => set({ color1: v }),
    setColor2: (v: string) => set({ color2: v }),
    setColor3: (v: string) => set({ color3: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
