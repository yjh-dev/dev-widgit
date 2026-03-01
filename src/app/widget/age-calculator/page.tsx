"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import AgeCalculatorPreview from "@/components/widget/AgeCalculatorPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { AgeStyle } from "@/lib/age-calculator";

const VALID_STYLES: AgeStyle[] = ["full", "compact", "years-only"];

function AgeCalculatorWidgetContent() {
  const searchParams = useWidgetParams();

  const birthdate = searchParams.get("birthdate") || "1995-01-01";
  const showTime = searchParams.get("showTime") !== "false";
  const showLabel = searchParams.get("showLabel") !== "false";

  const rawStyle = searchParams.get("style");
  const style: AgeStyle = VALID_STYLES.includes(rawStyle as AgeStyle)
    ? (rawStyle as AgeStyle)
    : "full";

  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <AgeCalculatorPreview
        birthdate={birthdate}
        showTime={showTime}
        showLabel={showLabel}
        style={style}
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

export default function WidgetAgeCalculatorPage() {
  return (
    <WidgetPage>
      <AgeCalculatorWidgetContent />
    </WidgetPage>
  );
}
