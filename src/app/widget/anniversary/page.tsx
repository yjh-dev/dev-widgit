"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import AnniversaryPreview from "@/components/widget/AnniversaryPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function AnniversaryWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";
  const date = searchParams.get("date") || "";
  const color = parseHexColor(searchParams.get("color"), "E11D48");
  const textColor = parseHexColor(searchParams.get("textColor"), "FFFFFF");
  const showDays = searchParams.get("showDays") !== "false";
  const showWeeks = searchParams.get("showWeeks") === "true";
  const showMonths = searchParams.get("showMonths") === "true";
  const font = searchParams.get("font") || "sans";
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <AnniversaryPreview
        title={title}
        date={date}
        color={color}
        textColor={textColor}
        showDays={showDays}
        showWeeks={showWeeks}
        showMonths={showMonths}
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

export default function WidgetAnniversaryPage() {
  return (
    <WidgetPage>
      <AnniversaryWidgetContent />
    </WidgetPage>
  );
}
