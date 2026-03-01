import { createWidgetMetadata } from "@/lib/widget-metadata";

export const metadata = createWidgetMetadata("fortune-cookie");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
