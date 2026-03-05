import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 위젯 — Wiget-Tree",
  description: "저장한 노션 위젯을 관리합니다. URL 복사, 수정, 삭제, 복제를 한 곳에서.",
  openGraph: {
    title: "내 위젯 — Wiget-Tree",
    description: "저장한 노션 위젯을 관리합니다.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
