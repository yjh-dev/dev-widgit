import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "위젯 그룹 만들기 — Widgit",
  description: "여러 위젯을 하나의 URL로 묶어 노션에 한 번에 임베드합니다.",
  openGraph: {
    title: "위젯 그룹 만들기 — Widgit",
    description: "여러 위젯을 하나의 URL로 묶어 노션에 한 번에 임베드합니다.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
