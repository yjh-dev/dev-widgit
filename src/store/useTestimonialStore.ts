import { create } from "zustand";
import { widgetStoreCreator, type CommonStyleState } from "@/lib/widget-store-factory";
import type { TestimonialLayout } from "@/lib/testimonial";

const widgetDefaults = {
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
};

interface TestimonialState extends CommonStyleState {
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
  loadPreset: (preset: Record<string, unknown>) => void;
  reset: () => void;
}

export const useTestimonialStore = create<TestimonialState>(
  widgetStoreCreator(widgetDefaults, (set) => ({
    setQuote: (v: string) => set({ quote: v }),
    setAuthor: (v: string) => set({ author: v }),
    setRole: (v: string) => set({ role: v }),
    setAvatarUrl: (v: string) => set({ avatarUrl: v }),
    setShowAvatar: (v: boolean) => set({ showAvatar: v }),
    setShowRole: (v: boolean) => set({ showRole: v }),
    setShowQuoteMarks: (v: boolean) => set({ showQuoteMarks: v }),
    setLayout: (v: TestimonialLayout) => set({ layout: v }),
    setAccentColor: (v: string) => set({ accentColor: v }),
    setTextColor: (v: string) => set({ textColor: v }),
  })),
);
