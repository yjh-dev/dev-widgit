"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import DailyColorPreview from "@/components/widget/DailyColorPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize } from "@/lib/common-widget-options";

function DailyColorWidgetContent() {
  const searchParams = useWidgetParams();

  const showHex = searchParams.get("showHex") !== "false";
  const showRgb = searchParams.get("showRgb") === "true";
  const showName = searchParams.get("showName") !== "false";
  const font = searchParams.get("font") || "sans";
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <DailyColorPreview
        showHex={showHex}
        showRgb={showRgb}
        showName={showName}
        font={font}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </WidgetScreen>
  );
}

export default function WidgetDailyColorPage() {
  return (
    <WidgetPage>
      <DailyColorWidgetContent />
    </WidgetPage>
  );
}
