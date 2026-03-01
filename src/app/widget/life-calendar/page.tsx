"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import LifeCalendarPreview from "@/components/widget/LifeCalendarPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import type { CellShape, CellSize } from "@/components/widget/LifeCalendarPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

const VALID_SHAPES: CellShape[] = ["square", "round"];
const VALID_CELL_SIZES: CellSize[] = ["sm", "md", "lg"];

function LifeCalendarWidgetContent() {
  const searchParams = useWidgetParams();

  const birthdate = searchParams.get("birthdate") || "";
  const rawLifespan = Number(searchParams.get("lifespan"));
  const lifespan = rawLifespan > 0 && rawLifespan <= 120 ? rawLifespan : 80;
  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const futureColor = parseHexColor(searchParams.get("futureColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));
  const showStats = searchParams.get("stats") !== "false";

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  const rawShape = searchParams.get("shape");
  const shape: CellShape = VALID_SHAPES.includes(rawShape as CellShape)
    ? (rawShape as CellShape)
    : "square";

  const rawCellSize = searchParams.get("cellSize");
  const cellSize: CellSize = VALID_CELL_SIZES.includes(rawCellSize as CellSize)
    ? (rawCellSize as CellSize)
    : "sm";

  const showYears = searchParams.get("years") === "true";
  const nowColor = parseHexColor(searchParams.get("nowColor"), "");

  return (
    <WidgetScreen>
      <LifeCalendarPreview
        birthdate={birthdate}
        lifespan={lifespan}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        showStats={showStats}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        shape={shape}
        cellSize={cellSize}
        futureColor={futureColor}
        showYears={showYears}
        nowColor={nowColor}
      />
    </WidgetScreen>
  );
}

export default function WidgetLifeCalendarPage() {
  return (
    <WidgetPage>
      <LifeCalendarWidgetContent />
    </WidgetPage>
  );
}
