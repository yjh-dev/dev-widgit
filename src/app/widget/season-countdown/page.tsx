"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import SeasonCountdownPreview from "@/components/widget/SeasonCountdownPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function SeasonCountdownWidgetContent() {
  const searchParams = useWidgetParams();

  const showIcon = searchParams.get("showIcon") !== "false";
  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const textColor = parseHexColor(searchParams.get("textColor"), "");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";

  return (
    <WidgetScreen>
      <SeasonCountdownPreview
        showIcon={showIcon}
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

export default function WidgetSeasonCountdownPage() {
  return (
    <WidgetPage>
      <SeasonCountdownWidgetContent />
    </WidgetPage>
  );
}
