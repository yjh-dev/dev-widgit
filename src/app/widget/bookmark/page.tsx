"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import BookmarkPreview from "@/components/widget/BookmarkPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function BookmarkWidgetContent() {
  const searchParams = useWidgetParams();

  const url = searchParams.get("url") || "";
  const title = searchParams.get("title") || "";
  const desc = searchParams.get("desc") || "";
  const showIcon = searchParams.get("showIcon") !== "false";
  const showUrl = searchParams.get("showUrl") !== "false";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <BookmarkPreview
        url={url}
        title={title}
        desc={desc}
        showIcon={showIcon}
        showUrl={showUrl}
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

export default function WidgetBookmarkPage() {
  return (
    <WidgetPage>
      <BookmarkWidgetContent />
    </WidgetPage>
  );
}
