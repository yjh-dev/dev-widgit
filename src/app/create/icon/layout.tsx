import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "아이콘 만들기 — Wiget-Tree",
  description:
    "노션 페이지 아이콘을 URL로 생성합니다. 글자, 이모지, 그라데이션 아이콘을 무료로 만들어보세요.",
  openGraph: {
    title: "아이콘 만들기 — Wiget-Tree",
    description:
      "노션 페이지 아이콘을 URL로 생성합니다. 글자, 이모지, 그라데이션 아이콘을 무료로 만들어보세요.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
