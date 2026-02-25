"use client";

import { useEffect, useState } from "react";
import {
  calculateTimeProgress,
  type ProgressType,
} from "@/lib/time-progress";

interface TimeProgressPreviewProps {
  type?: ProgressType;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
}

export default function TimeProgressPreview({
  type = "day",
  color = "2563EB",
  bg = "FFFFFF",
  transparentBg = false,
}: TimeProgressPreviewProps) {
  const [progress, setProgress] = useState(() => calculateTimeProgress(type));

  useEffect(() => {
    setProgress(calculateTimeProgress(type));
    const interval = setInterval(() => {
      setProgress(calculateTimeProgress(type));
    }, 1000);
    return () => clearInterval(interval);
  }, [type]);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-6"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
      }}
    >
      <p
        className="text-sm font-medium mb-1 opacity-70"
        style={{ color: `#${color}` }}
      >
        {progress.label}
      </p>
      <p
        className="text-4xl font-bold tabular-nums mb-4"
        style={{ color: `#${color}` }}
      >
        {progress.percentage.toFixed(1)}%
      </p>
      <div className="w-full max-w-[260px]">
        <div
          className="w-full h-3 rounded-full overflow-hidden"
          style={{ backgroundColor: `#${color}20` }}
        >
          <div
            className="h-full rounded-full transition-all duration-1000 ease-linear"
            style={{
              width: `${Math.min(progress.percentage, 100)}%`,
              backgroundColor: `#${color}`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
