"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import AsciiArtPreview from "@/components/widget/AsciiArtPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { AsciiFont } from "@/lib/ascii-art";

const VALID_FONTS: AsciiFont[] = ["standard", "banner", "big"];

function AsciiArtWidgetContent() {
  const searchParams = useWidgetParams();

  const text = searchParams.get("text") || "HELLO";

  const rawFont = searchParams.get("font");
  const font: AsciiFont = VALID_FONTS.includes(rawFont as AsciiFont)
    ? (rawFont as AsciiFont)
    : "standard";

  const color = parseHexColor(searchParams.get("color"), "22C55E");
  const textColor = parseHexColor(searchParams.get("textColor"), "");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg") ?? "0F172A");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <AsciiArtPreview
        text={text}
        font={font}
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

export default function WidgetAsciiArtPage() {
  return (
    <WidgetPage>
      <AsciiArtWidgetContent />
    </WidgetPage>
  );
}
