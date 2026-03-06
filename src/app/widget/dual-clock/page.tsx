"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import WorldClockPreview from "@/components/widget/WorldClockPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { WorldClockFormat } from "@/lib/world-clock";

const VALID_FORMATS: WorldClockFormat[] = ["12h", "24h"];

function DualClockCompatContent() {
  const searchParams = useWidgetParams();

  // Map dual-clock params (tz1, tz2) → world-clock zones array
  const tz1 = searchParams.get("tz1") || "Asia/Seoul";
  const tz2 = searchParams.get("tz2") || "America/New_York";
  const zones = [tz1, tz2];

  // Map label1, label2 → labels array
  const label1 = searchParams.get("label1") || "";
  const label2 = searchParams.get("label2") || "";
  const labels = (label1 || label2) ? [label1, label2] : [];

  const rawFormat = searchParams.get("format");
  const format: WorldClockFormat = VALID_FORMATS.includes(rawFormat as WorldClockFormat)
    ? (rawFormat as WorldClockFormat)
    : "24h";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const font = searchParams.get("font") || "mono";

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <WorldClockPreview
        zones={zones}
        labels={labels}
        format={format}
        showLabel={true}
        showSeconds={false}
        showDate={true}
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

export default function WidgetDualClockPage() {
  return (
    <WidgetPage>
      <DualClockCompatContent />
    </WidgetPage>
  );
}
