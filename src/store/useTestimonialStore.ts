import { create } from "zustand";
import type { TestimonialLayout } from "@/lib/testimonial";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface TestimonialState {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
  showAvatar: boolean;
  showRole: boolean;
  showQuoteMarks: boolean;
  layout: TestimonialLayout;
  accentColor: string;
  textColor: string;
  bg: string;
  transparentBg: boolean;
  borderRadius: number;
  padding: number;
  fontSize: FontSizeKey;

  setQuote: (v: string) => void;
  setAuthor: (v: string) => void;
  setRole: (v: string) => void;
  setAvatarUrl: (v: string) => void;
  setShowAvatar: (v: boolean) => void;
  setShowRole: (v: boolean) => void;
  setShowQuoteMarks: (v: boolean) => void;
  setLayout: (v: TestimonialLayout) => void;
  setAccentColor: (v: string) => void;
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
  quote: "이 서비스를 사용한 후 생산성이 크게 향상되었습니다. 강력히 추천합니다!",
  author: "김지수",
  role: "프로덕트 매니저",
  avatarUrl: "",
  showAvatar: true,
  showRole: true,
  showQuoteMarks: true,
  layout: "card" as TestimonialLayout,
  accentColor: "6366F1",
  textColor: "",
  bg: "FFFFFF",
  transparentBg: false,
  borderRadius: 16,
  padding: 24,
  fontSize: "md" as FontSizeKey,
};

export const useTestimonialStore = create<TestimonialState>((set) => ({
  ...initialState,

  setQuote: (quote) => set({ quote }),
  setAuthor: (author) => set({ author }),
  setRole: (role) => set({ role }),
  setAvatarUrl: (avatarUrl) => set({ avatarUrl }),
  setShowAvatar: (showAvatar) => set({ showAvatar }),
  setShowRole: (showRole) => set({ showRole }),
  setShowQuoteMarks: (showQuoteMarks) => set({ showQuoteMarks }),
  setLayout: (layout) => set({ layout }),
  setAccentColor: (accentColor) => set({ accentColor }),
  setTextColor: (textColor) => set({ textColor }),
  setBg: (bg) => set({ bg }),
  setTransparentBg: (transparentBg) => set({ transparentBg }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setPadding: (padding) => set({ padding }),
  setFontSize: (fontSize) => set({ fontSize }),
  loadPreset: (preset) => set({ ...initialState, ...preset }),
  reset: () => set(initialState),
}));
