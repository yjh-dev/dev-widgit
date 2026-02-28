"use client";

import { Suspense } from "react";
import { useWidgetParams } from "@/lib/use-widget-params";
import MultiProgressPreview from "@/components/widget/MultiProgressPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { deserializeItems, type BarHeight, type ProgressLayout } from "@/lib/multi-progress";

const VALID_BAR_HEIGHTS: BarHeight[] = ["thin", "default", "thick"];
const VALID_LAYOUTS: ProgressLayout[] = ["stacked", "grouped"];

function MultiProgressWidgetContent() {
  const searchParams = useWidgetParams();

  const items = deserializeItems(searchParams.get("items") || "");

  const showPercent = searchParams.get("showPercent") !== "false";
  const showValue = searchParams.get("showValue") === "true";

  const rawBarHeight = searchParams.get("barHeight");
  const barHeight: BarHeight = VALID_BAR_HEIGHTS.includes(rawBarHeight as BarHeight)
    ? (rawBarHeight as BarHeight)
    : "default";

  const rawLayout = searchParams.get("layout");
  const layout: ProgressLayout = VALID_LAYOUTS.includes(rawLayout as ProgressLayout)
    ? (rawLayout as ProgressLayout)
    : "stacked";

  const animated = searchParams.get("animated") === "true";

  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <MultiProgressPreview
        items={items}
        showPercent={showPercent}
        showValue={showValue}
        barHeight={barHeight}
        layout={layout}
        animated={animated}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetMultiProgressPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <MultiProgressWidgetContent />
    </Suspense>
  );
}
