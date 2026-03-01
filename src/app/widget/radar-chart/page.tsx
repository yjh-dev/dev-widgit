"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import RadarChartPreview from "@/components/widget/RadarChartPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
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
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
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
    </WidgetScreen>
  );
}

export default function WidgetRadarChartPage() {
  return (
    <WidgetPage>
      <RadarChartWidgetContent />
    </WidgetPage>
  );
}
