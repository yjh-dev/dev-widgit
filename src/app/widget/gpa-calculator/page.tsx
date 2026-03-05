"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import GpaCalculatorPreview from "@/components/widget/GpaCalculatorPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { GpaStyle } from "@/lib/gpa-calculator";

const VALID_STYLES: GpaStyle[] = ["bar", "ring"];

function GpaCalculatorWidgetContent() {
  const searchParams = useWidgetParams();

  const current = Math.max(0, Number(searchParams.get("current")) || 3.5);
  const max = Math.max(0.1, Number(searchParams.get("max")) || 4.5);
  const target = Math.max(0, Number(searchParams.get("target")) || max);

  const rawStyle = searchParams.get("style");
  const style: GpaStyle = VALID_STYLES.includes(rawStyle as GpaStyle)
    ? (rawStyle as GpaStyle)
    : "ring";

  const color = parseHexColor(searchParams.get("color"), "6366F1");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";

  return (
    <WidgetScreen>
      <GpaCalculatorPreview
        current={current}
        max={max}
        target={target}
        style={style}
        color={color}
        textColor={textColor}
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

export default function WidgetGpaCalculatorPage() {
  return (
    <WidgetPage>
      <GpaCalculatorWidgetContent />
    </WidgetPage>
  );
}
