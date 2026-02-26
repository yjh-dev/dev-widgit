"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import CounterPreview from "@/components/widget/CounterPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function CounterWidgetContent() {
  const searchParams = useSearchParams();

  const label = searchParams.get("label") || "카운터";
  const initial = Number(searchParams.get("initial")) || 0;

  const rawStep = Number(searchParams.get("step"));
  const step = rawStep >= 1 && rawStep <= 100 ? rawStep : 1;

  const rawMin = searchParams.get("min");
  const min = rawMin !== null && rawMin !== "" ? Number(rawMin) : undefined;

  const rawMax = searchParams.get("max");
  const max = rawMax !== null && rawMax !== "" ? Number(rawMax) : undefined;

  const showReset = searchParams.get("showReset") !== "false";

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
      <CounterPreview
        label={label}
        initial={initial}
        step={step}
        min={min}
        max={max}
        showReset={showReset}
        color={color}
        btnColor={btnColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        persist={true}
      />
    </div>
  );
}

export default function WidgetCounterPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <CounterWidgetContent />
    </Suspense>
  );
}
