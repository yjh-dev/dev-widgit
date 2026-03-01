import { createWidgetMetadata } from "@/lib/widget-metadata";

export const metadata = createWidgetMetadata("color-palette");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
