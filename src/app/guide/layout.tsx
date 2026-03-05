import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "노션 임베드 가이드 — Wiget-Tree",
  description: "Wiget-Tree 위젯을 노션에 임베드하는 방법을 단계별로 안내합니다.",
  openGraph: {
    title: "노션 임베드 가이드 — Wiget-Tree",
    description: "Wiget-Tree 위젯을 노션에 임베드하는 방법을 단계별로 안내합니다.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
