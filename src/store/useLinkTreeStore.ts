import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";
import type { LinkItem, LinkStyle } from "@/lib/link-tree";

interface LinkTreeState {
  title: string;
  links: LinkItem[];
  linkStyle: LinkStyle;
  accentColor: string;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setTitle: (v: string) => void;
  setLinks: (v: LinkItem[]) => void;
  setLinkStyle: (v: LinkStyle) => void;
  setAccentColor: (v: string) => void;
  setColor: (v: string) => void;
  setBg: (v: string) => void;
  setTransparentBg: (v: boolean) => void;
  setBorderRadius: (v: number) => void;
  setPadding: (v: number) => void;
  setFontSize: (v: FontSizeKey) => void;
  loadPreset: (preset: Partial<typeof initialState>) => void;
  reset: () => void;
}

const initialState = {
  title: "",
  links: [] as LinkItem[],
  linkStyle: "filled" as LinkStyle,
  accentColor: "2563EB",
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useLinkTreeStore = create<LinkTreeState>((set) => ({
  ...initialState,

  setTitle: (title) => set({ title }),
  setLinks: (links) => set({ links }),
  setLinkStyle: (linkStyle) => set({ linkStyle }),
  setAccentColor: (accentColor) => set({ accentColor }),
  setColor: (color) => set({ color }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
