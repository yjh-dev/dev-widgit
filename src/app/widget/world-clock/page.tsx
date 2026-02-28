"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import WorldClockPreview from "@/components/widget/WorldClockPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { deserializeZones } from "@/lib/world-clock";
import type { WorldClockFormat } from "@/lib/world-clock";

const VALID_FORMATS: WorldClockFormat[] = ["12h", "24h"];

function WorldClockWidgetContent() {
  const searchParams = useWidgetParams();

  const zonesRaw = searchParams.get("zones") || "";
  const zones = deserializeZones(zonesRaw);

  const rawFormat = searchParams.get("format");
  const format: WorldClockFormat = VALID_FORMATS.includes(rawFormat as WorldClockFormat)
    ? (rawFormat as WorldClockFormat)
    : "24h";

  const showLabel = searchParams.get("showLabel") !== "false";
  const showSeconds = searchParams.get("showSec") === "true";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");

  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <WorldClockPreview
        zones={zones}
        format={format}
        showLabel={showLabel}
        showSeconds={showSeconds}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetWorldClockPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <WorldClockWidgetContent />
    </Suspense>
  );
}
