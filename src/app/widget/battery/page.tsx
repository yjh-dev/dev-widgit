"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import BatteryPreview from "@/components/widget/BatteryPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function BatteryWidgetContent() {
  const searchParams = useWidgetParams();

  const level = Math.max(0, Math.min(100, Number(searchParams.get("level")) || 75));
  const label = searchParams.get("label") || "";
  const showPercent = searchParams.get("showPercent") !== "false";
  const animate = searchParams.get("animate") === "true";
  const autoColor = searchParams.get("autoColor") !== "false";
  const color = parseHexColor(searchParams.get("color"), "22C55E");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <BatteryPreview
        level={level}
        label={label}
        showPercent={showPercent}
        animate={animate}
        autoColor={autoColor}
        color={color}
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

export default function WidgetBatteryPage() {
  return (
    <WidgetPage>
      <BatteryWidgetContent />
    </WidgetPage>
  );
}
