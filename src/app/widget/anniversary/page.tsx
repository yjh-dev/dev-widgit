"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import DdayWidgetPreview from "@/components/widget/DdayWidgetPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { parseBgParam } from "@/lib/common-params";
import type { FontKey } from "@/lib/fonts";

const VALID_FONTS: FontKey[] = [
  "noto-sans-kr",
  "jua",
  "do-hyeon",
  "gothic-a1",
  "gaegu",
  "black-han-sans",
];

function AnniversaryWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";
  const date = searchParams.get("date") || "";
  const color = parseHexColor(searchParams.get("color"), "E11D48");
  const textColor = parseHexColor(searchParams.get("textColor"), "FFFFFF");
  const showWeeks = searchParams.get("showWeeks") === "true";
  const showMonths = searchParams.get("showMonths") === "true";
  const rawFont = searchParams.get("font") || "noto-sans-kr";
  const font = VALID_FONTS.includes(rawFont as FontKey)
    ? (rawFont as FontKey)
    : "noto-sans-kr";
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <DdayWidgetPreview
        title={title}
        targetDate={date}
        bgColor={bg}
        textColor={textColor}
        isTransparent={transparentBg}
        font={font}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        displayMode="anniversary"
        calcType="up"
        accentColor={color}
        showWeeks={showWeeks}
        showMonths={showMonths}
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
