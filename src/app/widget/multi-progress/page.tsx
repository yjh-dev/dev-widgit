"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import MultiProgressPreview from "@/components/widget/MultiProgressPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
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
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
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
    </WidgetScreen>
  );
}

export default function WidgetMultiProgressPage() {
  return (
    <WidgetPage>
      <MultiProgressWidgetContent />
    </WidgetPage>
  );
}
