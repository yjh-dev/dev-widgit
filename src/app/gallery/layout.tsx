import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "갤러리 — Widgit",
  description: "Widgit으로 만든 다양한 위젯 활용 예시를 구경해보세요.",
  openGraph: {
    title: "갤러리 — Widgit",
    description: "Widgit으로 만든 다양한 위젯 활용 예시를 구경해보세요.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
