import { createWidgetMetadata } from "@/lib/widget-metadata";

export const metadata = createWidgetMetadata("weather");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
