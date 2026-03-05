import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  title: "",
  columns: "",
  color: "6366F1",
  textColor: "",
  font: "sans",
};

interface KanbanState extends CommonStyleState {
  title: string;
  columns: string;
  color: string;
  textColor: string;
  font: string;
  setTitle: (v: string) => void;
  setColumns: (v: string) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setFont: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useKanbanStore = create<KanbanState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTitle: (v: string) => set({ title: v }),
    setColumns: (v: string) => set({ columns: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setFont: (v: string) => set({ font: v }),
  })),
);
