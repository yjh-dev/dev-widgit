import { createWidgetMetadata } from "@/lib/widget-metadata";

export const metadata = createWidgetMetadata("multi-progress");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
