import { createWidgetMetadata } from "@/lib/widget-metadata";

export const metadata = createWidgetMetadata("time-progress");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
