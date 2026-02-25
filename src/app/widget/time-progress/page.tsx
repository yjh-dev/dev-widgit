"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import TimeProgressPreview from "@/components/widget/TimeProgressPreview";
import type { ProgressType } from "@/lib/time-progress";
import { parseBorderRadius, parsePadding, parseFontSize } from "@/lib/common-widget-options";
import type { BarStyle, BarHeight } from "@/components/widget/TimeProgressPreview";

const VALID_TYPES: ProgressType[] = ["day", "week", "month", "year"];
const VALID_STYLES: BarStyle[] = ["bar", "ring"];
const VALID_BAR_HEIGHTS: BarHeight[] = ["thin", "default", "thick"];

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

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  const rawStyle = searchParams.get("style");
  const style: BarStyle = VALID_STYLES.includes(rawStyle as BarStyle)
    ? (rawStyle as BarStyle)
    : "bar";

  const showLabel = searchParams.get("label") !== "false";
  const showPercent = searchParams.get("percent") !== "false";

  const rawBarH = searchParams.get("barH");
  const barHeight: BarHeight = VALID_BAR_HEIGHTS.includes(rawBarH as BarHeight)
    ? (rawBarH as BarHeight)
    : "default";

  return (
    <div className="w-screen h-screen bg-transparent">
      <TimeProgressPreview
        type={type}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        style={style}
        showLabel={showLabel}
        showPercent={showPercent}
        barHeight={barHeight}
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
