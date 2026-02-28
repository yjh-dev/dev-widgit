import { create } from "zustand";
import type { QRErrorCorrection, QRModuleStyle, QRSize } from "@/lib/qr-code";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface QRCodeState {
  data: string;
  label: string;
  fgColor: string;
  bgColor: string;
  size: QRSize;
  ec: QRErrorCorrection;
  module: QRModuleStyle;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setData: (v: string) => void;
  setLabel: (v: string) => void;
  setFgColor: (v: string) => void;
  setBgColor: (v: string) => void;
  setSize: (v: QRSize) => void;
  setEc: (v: QRErrorCorrection) => void;
  setModule: (v: QRModuleStyle) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  data: "",
  label: "",
  fgColor: "1E1E1E",
  bgColor: "FFFFFF",
  size: "md" as QRSize,
  ec: "M" as QRErrorCorrection,
  module: "square" as QRModuleStyle,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useQRCodeStore = create<QRCodeState>((set) => ({
  ...initialState,

  setData: (data) => set({ data }),
  setLabel: (label) => set({ label }),
  setFgColor: (fgColor) => set({ fgColor }),
  setBgColor: (bgColor) => set({ bgColor }),
  setSize: (size) => set({ size }),
  setEc: (ec) => set({ ec }),
  setModule: (module) => set({ module }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
