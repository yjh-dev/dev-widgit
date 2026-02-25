"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import LifeCalendarPreview from "@/components/widget/LifeCalendarPreview";

function LifeCalendarWidgetContent() {
  const searchParams = useSearchParams();

  const birthdate = searchParams.get("birthdate") || "";
  const rawLifespan = Number(searchParams.get("lifespan"));
  const lifespan = rawLifespan > 0 && rawLifespan <= 120 ? rawLifespan : 80;
  const color = searchParams.get("color") || "2563EB";
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : rawBg;
  const showStats = searchParams.get("stats") !== "false";

  return (
    <div className="w-screen h-screen bg-transparent">
      <LifeCalendarPreview
        birthdate={birthdate}
        lifespan={lifespan}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        showStats={showStats}
      />
    </div>
  );
}

export default function WidgetLifeCalendarPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <LifeCalendarWidgetContent />
    </Suspense>
  );
}
