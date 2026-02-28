"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import RadarChartPreview from "@/components/widget/RadarChartPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { deserializeItems } from "@/lib/radar-chart";

const VALID_GRID_LEVELS = [3, 4, 5];

function RadarChartWidgetContent() {
  const searchParams = useWidgetParams();

  const rawItems = searchParams.get("items") || "";
  const items = deserializeItems(rawItems);

  const showValues = searchParams.get("showValues") === "true";
  const showGrid = searchParams.get("showGrid") !== "false";

  const rawGridLevels = Number(searchParams.get("gridLevels"));
  const gridLevels = VALID_GRID_LEVELS.includes(rawGridLevels) ? rawGridLevels : 4;

  const rawFillOpacity = Number(searchParams.get("fillOpacity"));
  const fillOpacity =
    !isNaN(rawFillOpacity) && rawFillOpacity >= 0 && rawFillOpacity <= 100
      ? rawFillOpacity
      : 30;

  const color = parseHexColor(searchParams.get("color"), "6366F1");
  const gridColor = parseHexColor(searchParams.get("gridColor"), "E5E7EB");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <RadarChartPreview
        items={items}
        showValues={showValues}
        showGrid={showGrid}
        gridLevels={gridLevels}
        fillOpacity={fillOpacity}
        color={color}
        gridColor={gridColor}
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

export default function WidgetRadarChartPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <RadarChartWidgetContent />
    </Suspense>
  );
}
