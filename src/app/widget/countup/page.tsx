"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import CountupPreview from "@/components/widget/CountupPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function CountupWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";
  const date = searchParams.get("date") || "";
  const showSeconds = searchParams.get("showSeconds") !== "false";
  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const font = searchParams.get("font") || "sans";
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <CountupPreview
        title={title}
        date={date}
        showSeconds={showSeconds}
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

export default function WidgetCountupPage() {
  return (
    <WidgetPage>
      <CountupWidgetContent />
    </WidgetPage>
  );
}
