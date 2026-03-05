import { createWidgetMetadata } from "@/lib/widget-metadata";

export const metadata = createWidgetMetadata("routine-timer");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
