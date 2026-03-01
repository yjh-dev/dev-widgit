"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import ColorPalettePreview from "@/components/widget/ColorPalettePreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { deserializeColors } from "@/lib/color-palette";
import type { PaletteLayout } from "@/lib/color-palette";

const VALID_LAYOUTS: PaletteLayout[] = ["horizontal", "vertical", "grid"];

function ColorPaletteWidgetContent() {
  const searchParams = useWidgetParams();

  const rawColors = searchParams.get("colors") || "";
  let colors = deserializeColors(rawColors).filter((c) => /^[0-9a-fA-F]{6}$/.test(c));
  if (colors.length < 2) colors = ["2563EB", "7C3AED", "EC4899", "F59E0B"];
  if (colors.length > 6) colors = colors.slice(0, 6);

  const rawLayout = searchParams.get("layout");
  const layout: PaletteLayout = VALID_LAYOUTS.includes(rawLayout as PaletteLayout)
    ? (rawLayout as PaletteLayout)
    : "horizontal";

  const showHex = searchParams.get("showHex") !== "false";
  const color = parseHexColor(searchParams.get("color"), "1E1E1E");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <ColorPalettePreview
        colors={colors}
        layout={layout}
        showHex={showHex}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </WidgetScreen>
  );
}

export default function WidgetColorPalettePage() {
  return (
    <WidgetPage>
      <ColorPaletteWidgetContent />
    </WidgetPage>
  );
}
