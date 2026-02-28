"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import PieChartPreview from "@/components/widget/PieChartPreview";
import { deserializeSlices, type PieChartStyle } from "@/lib/pie-chart";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

const VALID_STYLES: PieChartStyle[] = ["donut", "pie"];

function PieChartWidgetContent() {
  const searchParams = useWidgetParams();

  const slices = deserializeSlices(searchParams.get("slices") || "");

  const rawStyle = searchParams.get("style");
  const style: PieChartStyle = VALID_STYLES.includes(rawStyle as PieChartStyle)
    ? (rawStyle as PieChartStyle)
    : "donut";

  const showLabels = searchParams.get("showLabels") !== "false";
  const showPercent = searchParams.get("showPercent") !== "false";
  const showLegend = searchParams.get("showLegend") !== "false";

  const rawInnerRadius = Number(searchParams.get("innerRadius"));
  const innerRadius = rawInnerRadius >= 0 && rawInnerRadius <= 90 ? rawInnerRadius : 60;

  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <PieChartPreview
        slices={slices}
        style={style}
        showLabels={showLabels}
        showPercent={showPercent}
        showLegend={showLegend}
        innerRadius={innerRadius}
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

export default function WidgetPieChartPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <PieChartWidgetContent />
    </Suspense>
  );
}
