"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import AnalogClockPreview from "@/components/widget/AnalogClockPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
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

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
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
    </WidgetScreen>
  );
}

export default function WidgetAnalogClockPage() {
  return (
    <WidgetPage>
      <AnalogClockWidgetContent />
    </WidgetPage>
  );
}
