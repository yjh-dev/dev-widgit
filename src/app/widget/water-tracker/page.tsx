"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import WaterTrackerPreview from "@/components/widget/WaterTrackerPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function WaterTrackerWidgetContent() {
  const searchParams = useWidgetParams();

  const goal = Math.max(1, Math.min(20, Number(searchParams.get("goal")) || 8));
  const glassSize = Math.max(50, Math.min(1000, Number(searchParams.get("glass")) || 250));

  const color = parseHexColor(searchParams.get("color"), "3B82F6");
  const showMl = searchParams.get("showMl") !== "false";
  const textColor = parseHexColor(searchParams.get("textColor"), "1E1E1E");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const celebrate = searchParams.get("celebrate") !== "false";

  return (
    <WidgetScreen>
      <WaterTrackerPreview
        goal={goal}
        glassSize={glassSize}
        color={color}
        showMl={showMl}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        celebrate={celebrate}
      />
    </WidgetScreen>
  );
}

export default function WidgetWaterTrackerPage() {
  return (
    <WidgetPage>
      <WaterTrackerWidgetContent />
    </WidgetPage>
  );
}
