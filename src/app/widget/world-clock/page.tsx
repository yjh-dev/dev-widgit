"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import WorldClockPreview from "@/components/widget/WorldClockPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { deserializeZones, deserializeLabels } from "@/lib/world-clock";
import type { WorldClockFormat } from "@/lib/world-clock";

const VALID_FORMATS: WorldClockFormat[] = ["12h", "24h"];

function WorldClockWidgetContent() {
  const searchParams = useWidgetParams();

  const zonesRaw = searchParams.get("zones") || "";
  const zones = deserializeZones(zonesRaw);

  const labelsRaw = searchParams.get("labels") || "";
  const labels = deserializeLabels(labelsRaw);

  const rawFormat = searchParams.get("format");
  const format: WorldClockFormat = VALID_FORMATS.includes(rawFormat as WorldClockFormat)
    ? (rawFormat as WorldClockFormat)
    : "24h";

  const showLabel = searchParams.get("showLabel") !== "false";
  const showSeconds = searchParams.get("showSec") === "true";
  const showDate = searchParams.get("showDate") === "true";

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
        showLabel={showLabel}
        showSeconds={showSeconds}
        showDate={showDate}
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

export default function WidgetWorldClockPage() {
  return (
    <WidgetPage>
      <WorldClockWidgetContent />
    </WidgetPage>
  );
}
