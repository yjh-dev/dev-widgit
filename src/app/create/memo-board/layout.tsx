import { createWidgetMetadata } from "@/lib/widget-metadata";

export const metadata = createWidgetMetadata("memo-board");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
