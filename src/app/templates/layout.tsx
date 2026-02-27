import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "추천 조합 — Widgit",
  description: "테마별로 어울리는 노션 위젯 조합을 모았습니다. URL을 복사해 바로 임베드하세요.",
  openGraph: {
    title: "추천 조합 — Widgit",
    description: "테마별로 어울리는 노션 위젯 조합을 모았습니다.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
