"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import ImageCardPreview from "@/components/widget/ImageCardPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { ImageFit, CaptionPosition } from "@/lib/image-card";

const VALID_FITS: ImageFit[] = ["cover", "contain", "fill"];
const VALID_CAPTION_POS: CaptionPosition[] = ["top", "bottom", "overlay"];

function ImageCardWidgetContent() {
  const searchParams = useWidgetParams();

  const imageUrl = searchParams.get("img") || "";
  const caption = searchParams.get("caption") || "";
  const linkUrl = searchParams.get("link") || "";

  const rawFit = searchParams.get("fit");
  const fit: ImageFit = VALID_FITS.includes(rawFit as ImageFit)
    ? (rawFit as ImageFit)
    : "cover";

  const rawCaptionPos = searchParams.get("captionPos");
  const captionPos: CaptionPosition = VALID_CAPTION_POS.includes(rawCaptionPos as CaptionPosition)
    ? (rawCaptionPos as CaptionPosition)
    : "bottom";

  const showCaption = searchParams.get("showCaption") !== "false";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <ImageCardPreview
        imageUrl={imageUrl}
        caption={caption}
        linkUrl={linkUrl}
        fit={fit}
        captionPos={captionPos}
        showCaption={showCaption}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        linkable={true}
      />
    </WidgetScreen>
  );
}

export default function WidgetImageCardPage() {
  return (
    <WidgetPage>
      <ImageCardWidgetContent />
    </WidgetPage>
  );
}
