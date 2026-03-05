import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "뱃지 만들기 — Wiget-Tree",
  description:
    "노션용 상태 뱃지를 URL로 생성합니다. 상태, 진행률, 버전 뱃지를 무료로 만들어보세요.",
  openGraph: {
    title: "뱃지 만들기 — Wiget-Tree",
    description:
      "노션용 상태 뱃지를 URL로 생성합니다. 상태, 진행률, 버전 뱃지를 무료로 만들어보세요.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
