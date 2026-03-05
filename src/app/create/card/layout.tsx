import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "카드 이미지 만들기 — Wiget-Tree",
  description:
    "노션용 동적 카드 이미지를 URL로 생성합니다. 명언, 통계, 프로필 카드를 무료로 만들어보세요.",
  openGraph: {
    title: "카드 이미지 만들기 — Wiget-Tree",
    description:
      "노션용 동적 카드 이미지를 URL로 생성합니다. 명언, 통계, 프로필 카드를 무료로 만들어보세요.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
