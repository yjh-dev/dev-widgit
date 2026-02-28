"use client";

import { Suspense } from "react";
import { useWidgetParams } from "@/lib/use-widget-params";
import MatrixPreview from "@/components/widget/MatrixPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { deserializeItems, deserializeLabels, DEFAULT_LABELS, QUADRANT_COLORS } from "@/lib/matrix";

function MatrixWidgetContent() {
  const searchParams = useWidgetParams();

  const items = deserializeItems(searchParams.get("items") || "");
  const parsedLabels = deserializeLabels(searchParams.get("labels") || "");
  const labels = parsedLabels || [...DEFAULT_LABELS] as [string, string, string, string];

  const showLabels = searchParams.get("showLabels") !== "false";
  const showAxes = searchParams.get("showAxes") !== "false";
  const axisX = searchParams.get("axisX") || "긴급도";
  const axisY = searchParams.get("axisY") || "중요도";

  const color0 = parseHexColor(searchParams.get("color0"), QUADRANT_COLORS[0]);
  const color1 = parseHexColor(searchParams.get("color1"), QUADRANT_COLORS[1]);
  const color2 = parseHexColor(searchParams.get("color2"), QUADRANT_COLORS[2]);
  const color3 = parseHexColor(searchParams.get("color3"), QUADRANT_COLORS[3]);
  const textColor = parseHexColor(searchParams.get("textColor"), "");

  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <MatrixPreview
        items={items}
        labels={labels}
        showLabels={showLabels}
        showAxes={showAxes}
        axisX={axisX}
        axisY={axisY}
        color0={color0}
        color1={color1}
        color2={color2}
        color3={color3}
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

export default function WidgetMatrixPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <MatrixWidgetContent />
    </Suspense>
  );
}
