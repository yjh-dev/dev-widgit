"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import MiniMapPreview from "@/components/widget/MiniMapPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { MapStyle } from "@/lib/mini-map";

const VALID_STYLES: MapStyle[] = ["standard", "dark"];

function MiniMapWidgetContent() {
  const searchParams = useWidgetParams();

  const lat = Number(searchParams.get("lat")) || 37.5665;
  const lon = Number(searchParams.get("lon")) || 126.978;
  const zoom = Math.max(1, Math.min(18, Number(searchParams.get("zoom")) || 13));
  const label = searchParams.get("label") || "";

  const rawStyle = searchParams.get("style");
  const style: MapStyle = VALID_STYLES.includes(rawStyle as MapStyle)
    ? (rawStyle as MapStyle)
    : "standard";

  const color = parseHexColor(searchParams.get("color"), "E11D48");
  const textColor = parseHexColor(searchParams.get("textColor"), "");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";

  return (
    <WidgetScreen>
      <MiniMapPreview
        lat={lat}
        lon={lon}
        zoom={zoom}
        label={label}
        style={style}
        color={color}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        font={font}
      />
    </WidgetScreen>
  );
}

export default function WidgetMiniMapPage() {
  return (
    <WidgetPage>
      <MiniMapWidgetContent />
    </WidgetPage>
  );
}
