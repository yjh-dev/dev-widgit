"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import GuestbookPreview from "@/components/widget/GuestbookPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function GuestbookWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "방명록";
  const maxItems = Math.max(1, Math.min(50, Number(searchParams.get("maxItems")) || 10));

  const color = parseHexColor(searchParams.get("color"), "6366F1");
  const textColor = parseHexColor(searchParams.get("textColor"), "");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";

  return (
    <WidgetScreen>
      <GuestbookPreview
        title={title}
        maxItems={maxItems}
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

export default function WidgetGuestbookPage() {
  return (
    <WidgetPage>
      <GuestbookWidgetContent />
    </WidgetPage>
  );
}
