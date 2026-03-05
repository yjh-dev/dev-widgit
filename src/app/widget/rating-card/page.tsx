"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import RatingCardPreview from "@/components/widget/RatingCardPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function RatingCardWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";
  const rating = Math.max(0, Math.min(Number(searchParams.get("rating")) || 4.5, 10));
  const maxStars = Math.max(1, Math.min(Number(searchParams.get("maxStars")) || 5, 10));
  const label = searchParams.get("label") || "";

  const color = parseHexColor(searchParams.get("color"), "F59E0B");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";

  return (
    <WidgetScreen>
      <RatingCardPreview
        title={title}
        rating={rating}
        maxStars={maxStars}
        label={label}
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

export default function WidgetRatingCardPage() {
  return (
    <WidgetPage>
      <RatingCardWidgetContent />
    </WidgetPage>
  );
}
