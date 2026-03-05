"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import DualClockPreview from "@/components/widget/DualClockPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { DualClockFormat } from "@/lib/dual-clock";

const VALID_FORMATS: DualClockFormat[] = ["12h", "24h"];

function DualClockWidgetContent() {
  const searchParams = useWidgetParams();

  const tz1 = searchParams.get("tz1") || "Asia/Seoul";
  const tz2 = searchParams.get("tz2") || "America/New_York";
  const label1 = searchParams.get("label1") || "서울";
  const label2 = searchParams.get("label2") || "뉴욕";

  const rawFormat = searchParams.get("format");
  const format: DualClockFormat = VALID_FORMATS.includes(rawFormat as DualClockFormat)
    ? (rawFormat as DualClockFormat)
    : "24h";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "mono";

  return (
    <WidgetScreen>
      <DualClockPreview
        tz1={tz1}
        tz2={tz2}
        label1={label1}
        label2={label2}
        format={format}
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
      <DualClockWidgetContent />
    </WidgetPage>
  );
}
