"use client";

import { useEffect, useState, useRef } from "react";
import WidgetRenderer from "@/components/widget/WidgetRenderer";
import { getHomeThumbnailProps, type WidgetType } from "@/lib/templates";

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
        </div>
      )}
    </div>
  );
}
