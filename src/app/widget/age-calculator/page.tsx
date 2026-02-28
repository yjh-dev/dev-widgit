"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import AgeCalculatorPreview from "@/components/widget/AgeCalculatorPreview";
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
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
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
    </div>
  );
}

export default function WidgetAgeCalculatorPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <AgeCalculatorWidgetContent />
    </Suspense>
  );
}
