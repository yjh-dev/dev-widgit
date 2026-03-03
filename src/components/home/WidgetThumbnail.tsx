"use client";

import { useEffect, useState, useRef, Component, type ReactNode } from "react";
import WidgetRenderer from "@/components/widget/WidgetRenderer";
import { getHomeThumbnailProps, type WidgetType } from "@/lib/templates";
import { Skeleton } from "@/components/ui/skeleton";

class ThumbnailErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <span className="text-xs text-muted-foreground">미리보기 불가</span>
        </div>
      );
    }
    return this.props.children;
  }
}

interface WidgetThumbnailProps {
  type: WidgetType;
}

export default function WidgetThumbnail({ type }: WidgetThumbnailProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const props = getHomeThumbnailProps(type);

  return (
    <div ref={ref} className="relative w-full aspect-[4/3] overflow-hidden rounded-t-xl bg-muted" aria-hidden="true">
      {!visible && (
        <Skeleton className="absolute inset-0 rounded-none" />
      )}
      {visible && (
        <div
          className="absolute inset-0 origin-top-left transition-opacity duration-400 ease-in"
          style={{
            width: "200%",
            height: "200%",
            transform: "scale(0.5)",
            pointerEvents: "none",
          }}
        >
          <ThumbnailErrorBoundary>
            {type === "weather" ? (
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-1"
                style={{ backgroundColor: "#FFFFFF", color: "#1E1E1E" }}
              >
                <span className="text-xs opacity-60 font-medium">서울</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl">☀️</span>
                  <span className="text-2xl font-bold">22°C</span>
                </div>
                <span className="text-xs opacity-70">맑음</span>
              </div>
            ) : (
              <WidgetRenderer type={type} props={props} />
            )}
          </ThumbnailErrorBoundary>
        </div>
      )}
    </div>
  );
}
