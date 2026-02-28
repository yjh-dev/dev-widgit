import { create } from "zustand";
import type { FontSizeKey } from "@/lib/common-widget-options";
import type { ProfileLayout, AvatarShape, SocialLink } from "@/lib/profile-card";

interface ProfileCardState {
  name: string;
  bio: string;
  avatarUrl: string;
  layout: ProfileLayout;
  avatarShape: AvatarShape;
  showBio: boolean;
  socials: SocialLink[];
  accentColor: string;
  color: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setName: (v: string) => void;
  setBio: (v: string) => void;
  setAvatarUrl: (v: string) => void;
  setLayout: (v: ProfileLayout) => void;
  setAvatarShape: (v: AvatarShape) => void;
  setShowBio: (v: boolean) => void;
  setSocials: (v: SocialLink[]) => void;
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
  name: "",
  bio: "",
  avatarUrl: "",
  layout: "vertical" as ProfileLayout,
  avatarShape: "circle" as AvatarShape,
  showBio: true,
  socials: [] as SocialLink[],
  accentColor: "2563EB",
  color: "1E1E1E",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useProfileCardStore = create<ProfileCardState>((set) => ({
  ...initialState,

  setName: (name) => set({ name }),
  setBio: (bio) => set({ bio }),
  setAvatarUrl: (avatarUrl) => set({ avatarUrl }),
  setLayout: (layout) => set({ layout }),
  setAvatarShape: (avatarShape) => set({ avatarShape }),
  setShowBio: (showBio) => set({ showBio }),
  setSocials: (socials) => set({ socials }),
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
