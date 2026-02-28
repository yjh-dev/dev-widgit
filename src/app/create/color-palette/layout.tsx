import type { Metadata } from "next";
import { widgetMetadata } from "@/lib/widget-metadata";

const WIDGET_TYPE = "color-palette";
const meta = widgetMetadata[WIDGET_TYPE];

export const metadata: Metadata = {
  title: `${meta.name} 만들기 — Widgit`,
  description: meta.desc,
  openGraph: {
    title: `${meta.name} 만들기 — Widgit`,
    description: meta.desc,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
