import { createWidgetMetadata } from "@/lib/widget-metadata";

export const metadata = createWidgetMetadata("profile-card");

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
