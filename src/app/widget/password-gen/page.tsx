"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import PasswordGenPreview from "@/components/widget/PasswordGenPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function PasswordGenWidgetContent() {
  const searchParams = useWidgetParams();

  const length = Math.max(4, Math.min(64, Number(searchParams.get("length")) || 16));
  const upper = searchParams.get("upper") !== "false";
  const lower = searchParams.get("lower") !== "false";
  const numbers = searchParams.get("numbers") !== "false";
  const symbols = searchParams.get("symbols") === "true";

  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const textColor = parseHexColor(searchParams.get("textColor"), "");

  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "mono";

  return (
    <WidgetScreen>
      <PasswordGenPreview
        length={length}
        upper={upper}
        lower={lower}
        numbers={numbers}
        symbols={symbols}
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

export default function WidgetPasswordGenPage() {
  return (
    <WidgetPage>
      <PasswordGenWidgetContent />
    </WidgetPage>
  );
}
