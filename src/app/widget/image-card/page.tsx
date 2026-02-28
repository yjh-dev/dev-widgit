"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import ImageCardPreview from "@/components/widget/ImageCardPreview";
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

  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
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
    </div>
  );
}

export default function WidgetImageCardPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <ImageCardWidgetContent />
    </Suspense>
  );
}
