import { createWidgetMetadata } from "@/lib/widget-metadata";

export const metadata = createWidgetMetadata("emoji-rain");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
