import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { LinkItem, LinkStyle } from "@/lib/link-tree";

const widgetDefaults = {
  title: "",
  links: [] as LinkItem[],
  linkStyle: "filled" as LinkStyle,
  accentColor: "2563EB",
  color: "1E1E1E",
};

interface LinkTreeState extends CommonStyleState {
  title: string;
  links: LinkItem[];
  linkStyle: LinkStyle;
  accentColor: string;
  color: string;

  setTitle: (v: string) => void;
  setLinks: (v: LinkItem[]) => void;
  setLinkStyle: (v: LinkStyle) => void;
  setAccentColor: (v: string) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useLinkTreeStore = create<LinkTreeState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setTitle: (v: string) => set({ title: v }),
    setLinks: (v: LinkItem[]) => set({ links: v }),
    setLinkStyle: (v: LinkStyle) => set({ linkStyle: v }),
    setAccentColor: (v: string) => set({ accentColor: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
