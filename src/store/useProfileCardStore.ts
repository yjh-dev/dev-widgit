import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { ProfileLayout, AvatarShape, SocialLink } from "@/lib/profile-card";

const widgetDefaults = {
  name: "",
  bio: "",
  avatarUrl: "",
  layout: "vertical" as ProfileLayout,
  avatarShape: "circle" as AvatarShape,
  showBio: true,
  socials: [] as SocialLink[],
  accentColor: "2563EB",
  color: "1E1E1E",
};

interface ProfileCardState extends CommonStyleState {
  name: string;
  bio: string;
  avatarUrl: string;
  layout: ProfileLayout;
  avatarShape: AvatarShape;
  showBio: boolean;
  socials: SocialLink[];
  accentColor: string;
  color: string;

  setName: (v: string) => void;
  setBio: (v: string) => void;
  setAvatarUrl: (v: string) => void;
  setLayout: (v: ProfileLayout) => void;
  setAvatarShape: (v: AvatarShape) => void;
  setShowBio: (v: boolean) => void;
  setSocials: (v: SocialLink[]) => void;
  setAccentColor: (v: string) => void;
  setColor: (v: string) => void;
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useProfileCardStore = create<ProfileCardState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setName: (v: string) => set({ name: v }),
    setBio: (v: string) => set({ bio: v }),
    setAvatarUrl: (v: string) => set({ avatarUrl: v }),
    setLayout: (v: ProfileLayout) => set({ layout: v }),
    setAvatarShape: (v: AvatarShape) => set({ avatarShape: v }),
    setShowBio: (v: boolean) => set({ showBio: v }),
    setSocials: (v: SocialLink[]) => set({ socials: v }),
    setAccentColor: (v: string) => set({ accentColor: v }),
    setColor: (v: string) => set({ color: v }),
  })),
);
