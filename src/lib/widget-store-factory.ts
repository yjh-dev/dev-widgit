import type { FontSizeKey } from "@/lib/common-widget-options";

/* ─── Common Style State ─── */

export interface CommonStyleState {
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;
  setBg: (bg: string) => void;
  setTransparentBg: (transparentBg: boolean) => void;
  setBorderRadius: (borderRadius: number) => void;
  setPadding: (padding: number) => void;
  setFontSize: (fontSize: FontSizeKey) => void;
}

export const commonStyleDefaults = {
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

/* ─── Simple Factory ─── */

/**
 * 위젯 스토어의 initialState + 공통 setter를 결합하여
 * Zustand `create()` 에 전달할 StateCreator 함수를 반환한다.
 *
 * Usage:
 * ```ts
 * const widgetDefaults = { color: "1E1E1E", ... };
 * export const useMyStore = create<MyState>(
 *   widgetStoreCreator(widgetDefaults, (set) => ({
 *     setColor: (v: string) => set({ color: v }),
 *   })),
 * );
 * ```
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function widgetStoreCreator<D extends Record<string, any>, S extends Record<string, any>>(
  widgetDefaults: D,
  widgetSetters: (set: ((partial: Partial<D & typeof commonStyleDefaults>) => void) & ((fn: (state: any) => Partial<D & typeof commonStyleDefaults>) => void)) => S,
) {
/* eslint-enable @typescript-eslint/no-explicit-any */
  const initialState = { ...commonStyleDefaults, ...widgetDefaults };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (set: any) => ({
    ...initialState,
    // Common style setters
    setBg: (bg: string) => set({ bg }),
    setTransparentBg: (transparentBg: boolean) => set({ transparentBg }),
    setBorderRadius: (borderRadius: number) => set({ borderRadius }),
    setPadding: (padding: number) => set({ padding }),
    setFontSize: (fontSize: FontSizeKey) => set({ fontSize }),
    // Widget-specific setters
    ...widgetSetters(set),
    // loadPreset / reset
    loadPreset: (preset: Record<string, unknown>) =>
      set({ ...initialState, ...preset }),
    reset: () => set(initialState),
  });
}
