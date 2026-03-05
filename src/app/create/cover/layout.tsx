import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "커버 이미지 만들기 — Wiget-Tree",
  description:
    "노션 페이지 커버 이미지를 URL로 생성합니다. 그라데이션, 패턴, 텍스트 커버를 무료로 만들어보세요.",
  openGraph: {
    title: "커버 이미지 만들기 — Wiget-Tree",
    description:
      "노션 페이지 커버 이미지를 URL로 생성합니다. 그라데이션, 패턴, 텍스트 커버를 무료로 만들어보세요.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
