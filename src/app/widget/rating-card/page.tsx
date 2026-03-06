"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import TestimonialPreview from "@/components/widget/TestimonialPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function RatingCardCompatContent() {
  const searchParams = useWidgetParams();

  // Map rating-card params → testimonial params
  const quote = searchParams.get("title") || "";
  const role = searchParams.get("label") || "";
  const rating = Math.max(0, Math.min(Number(searchParams.get("rating")) || 4.5, 10));
  const maxStars = Math.max(1, Math.min(Number(searchParams.get("maxStars")) || 5, 10));

  const color = parseHexColor(searchParams.get("color"), "F59E0B");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <TestimonialPreview
        quote={quote}
        author=""
        role={role}
        showAvatar={false}
        showRole={!!role}
        showQuoteMarks={false}
        showRating={true}
        rating={rating}
        maxStars={maxStars}
        layout="centered"
        accentColor={color}
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

export default function WidgetRatingCardPage() {
  return (
    <WidgetPage>
      <RatingCardCompatContent />
    </WidgetPage>
  );
}
