"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import StopwatchPreview from "@/components/widget/StopwatchPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function StopwatchWidgetContent() {
  const searchParams = useWidgetParams();

  const showMs = searchParams.get("showMs") === "true";
  const showLap = searchParams.get("showLap") === "true";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const btnColor = parseHexColor(searchParams.get("btnColor"), "2563EB");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <StopwatchPreview
        showMs={showMs}
        showLap={showLap}
        color={color}
        btnColor={btnColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </WidgetScreen>
  );
}

export default function WidgetStopwatchPage() {
  return (
    <WidgetPage>
      <StopwatchWidgetContent />
    </WidgetPage>
  );
}
