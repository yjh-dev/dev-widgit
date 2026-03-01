import { createWidgetMetadata } from "@/lib/widget-metadata";

export const metadata = createWidgetMetadata("testimonial");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
