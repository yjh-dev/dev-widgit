"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import MiniGalleryPreview from "@/components/widget/MiniGalleryPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { parseImageUrls } from "@/lib/mini-gallery";
import type { GalleryTransition } from "@/lib/mini-gallery";

const VALID_TRANSITIONS: GalleryTransition[] = ["fade", "slide"];

function MiniGalleryWidgetContent() {
  const searchParams = useWidgetParams();

  const images = parseImageUrls(searchParams.get("images") || "");
  const interval = Math.max(1, Math.min(30, Number(searchParams.get("interval")) || 5));

  const rawTransition = searchParams.get("transition");
  const transition: GalleryTransition = VALID_TRANSITIONS.includes(rawTransition as GalleryTransition)
    ? (rawTransition as GalleryTransition)
    : "fade";

  const showDots = searchParams.get("showDots") !== "false";
  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const textColor = parseHexColor(searchParams.get("textColor"), "");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";

  return (
    <WidgetScreen>
      <MiniGalleryPreview
        images={images}
        interval={interval}
        transition={transition}
        showDots={showDots}
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

export default function WidgetMiniGalleryPage() {
  return (
    <WidgetPage>
      <MiniGalleryWidgetContent />
    </WidgetPage>
  );
}
