import { createWidgetMetadata } from "@/lib/widget-metadata";

export const metadata = createWidgetMetadata("radar-chart");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
