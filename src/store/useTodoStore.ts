import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";

const widgetDefaults = {
  title: "",
  items: "",
  color: "2563EB",
  textColor: "",
  showProgress: true,
  strikethrough: true,
};

interface TodoState extends CommonStyleState {
  title: string;
  items: string;
  color: string;
  textColor: string;
  showProgress: boolean;
  strikethrough: boolean;
  setTitle: (v: string) => void;
  setItems: (v: string) => void;
  setColor: (v: string) => void;
  setTextColor: (v: string) => void;
  setShowProgress: (v: boolean) => void;
  setStrikethrough: (v: boolean) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useTodoStore = create<TodoState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTitle: (v: string) => set({ title: v }),
    setItems: (v: string) => set({ items: v }),
    setColor: (v: string) => set({ color: v }),
    setTextColor: (v: string) => set({ textColor: v }),
    setShowProgress: (v: boolean) => set({ showProgress: v }),
    setStrikethrough: (v: boolean) => set({ strikethrough: v }),
  })),
);
