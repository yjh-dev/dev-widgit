"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PomodoroPreview from "@/components/widget/PomodoroPreview";

function PomodoroWidgetContent() {
  const searchParams = useSearchParams();

  const rawWork = Number(searchParams.get("work"));
  const workTime = rawWork > 0 && rawWork <= 120 ? rawWork : 25;

  const rawBreak = Number(searchParams.get("break"));
  const breakTime = rawBreak > 0 && rawBreak <= 60 ? rawBreak : 5;

  const color = searchParams.get("color") || "E11D48";
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : rawBg;

  return (
    <div className="w-screen h-screen bg-transparent">
      <PomodoroPreview
        workTime={workTime}
        breakTime={breakTime}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
      />
    </div>
  );
}

export default function WidgetPomodoroPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <PomodoroWidgetContent />
    </Suspense>
  );
}
