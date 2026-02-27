"use client";

import { useEffect, useState } from "react";
import WidgetRenderer from "@/components/widget/WidgetRenderer";
import { getHomeThumbnailProps, type WidgetType } from "@/lib/templates";

interface WidgetThumbnailProps {
  type: WidgetType;
}

export default function WidgetThumbnail({ type }: WidgetThumbnailProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const props = getHomeThumbnailProps(type);

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-xl bg-muted">
      {mounted && (
        <div
          className="absolute inset-0 origin-top-left"
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
