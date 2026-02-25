"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import TimeProgressPreview from "@/components/widget/TimeProgressPreview";
import type { ProgressType } from "@/lib/time-progress";

const VALID_TYPES: ProgressType[] = ["day", "month", "year"];

function TimeProgressWidgetContent() {
  const searchParams = useSearchParams();

  const rawType = searchParams.get("type");
  const type: ProgressType = VALID_TYPES.includes(rawType as ProgressType)
    ? (rawType as ProgressType)
    : "day";

  const color = searchParams.get("color") || "2563EB";
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : rawBg;

  return (
    <div className="w-screen h-screen bg-transparent">
      <TimeProgressPreview
        type={type}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
      />
    </div>
  );
}

export default function WidgetTimeProgressPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <TimeProgressWidgetContent />
    </Suspense>
  );
}
