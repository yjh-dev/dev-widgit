"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import StopwatchPreview from "@/components/widget/StopwatchPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function StopwatchWidgetContent() {
  const searchParams = useSearchParams();

  const showMs = searchParams.get("showMs") === "true";
  const showLap = searchParams.get("showLap") === "true";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const btnColor = parseHexColor(searchParams.get("btnColor"), "2563EB");

  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <StopwatchPreview
        showMs={showMs}
        showLap={showLap}
        color={color}
        btnColor={btnColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetStopwatchPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <StopwatchWidgetContent />
    </Suspense>
  );
}
