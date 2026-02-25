"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DdayWidgetPreview from "@/components/widget/DdayWidgetPreview";

function DdayWidgetContent() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "D-Day";
  const targetDate = searchParams.get("date") || "";
  const bgColor = searchParams.get("bg") || "1E1E1E";
  const textColor = searchParams.get("text") || "FFFFFF";

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-transparent">
      <DdayWidgetPreview
        title={title}
        targetDate={targetDate}
        bgColor={bgColor}
        textColor={textColor}
      />
    </div>
  );
}

export default function WidgetDdayPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <DdayWidgetContent />
    </Suspense>
  );
}
