"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import AnalogClockPreview from "@/components/widget/AnalogClockPreview";
import type { NumberStyle } from "@/lib/analog-clock";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

const VALID_NUM_STYLE: NumberStyle[] = ["quarter", "all"];

function AnalogClockWidgetContent() {
  const searchParams = useWidgetParams();

  const timezone = searchParams.get("timezone") || "Asia/Seoul";

  const showNumbers = searchParams.get("numbers") !== "false";

  const rawNumStyle = searchParams.get("numStyle");
  const numStyle: NumberStyle = VALID_NUM_STYLE.includes(rawNumStyle as NumberStyle)
    ? (rawNumStyle as NumberStyle)
    : "quarter";

  const showSeconds = searchParams.get("seconds") !== "false";
  const showTicks = searchParams.get("ticks") !== "false";
  const showBorder = searchParams.get("showBorder") !== "false";

  const handColor = parseHexColor(searchParams.get("hand"), "1E1E1E");
  const secHandColor = parseHexColor(searchParams.get("secHand"), "E11D48");
  const faceColor = parseHexColor(searchParams.get("face"), "FFFFFF");
  const tickColor = parseHexColor(searchParams.get("tick"), "999999");
  const borderColor = parseHexColor(searchParams.get("border"), "1E1E1E");

  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <AnalogClockPreview
        timezone={timezone}
        showNumbers={showNumbers}
        numStyle={numStyle}
        showSeconds={showSeconds}
        showTicks={showTicks}
        showBorder={showBorder}
        handColor={handColor}
        secHandColor={secHandColor}
        faceColor={faceColor}
        tickColor={tickColor}
        borderColor={borderColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetAnalogClockPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <AnalogClockWidgetContent />
    </Suspense>
  );
}
