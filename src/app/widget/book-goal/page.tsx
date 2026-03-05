"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import BookGoalPreview from "@/components/widget/BookGoalPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function BookGoalWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";
  const current = Math.max(0, Number(searchParams.get("current")) || 0);
  const target = Math.max(1, Number(searchParams.get("target")) || 24);
  const year = searchParams.get("year") || new Date().getFullYear().toString();

  const color = parseHexColor(searchParams.get("color"), "F59E0B");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";

  return (
    <WidgetScreen>
      <BookGoalPreview
        title={title}
        current={current}
        target={target}
        year={year}
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

export default function WidgetBookGoalPage() {
  return (
    <WidgetPage>
      <BookGoalWidgetContent />
    </WidgetPage>
  );
}
