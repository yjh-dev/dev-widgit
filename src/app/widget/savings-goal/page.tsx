"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import SavingsGoalPreview from "@/components/widget/SavingsGoalPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { SavingsStyle } from "@/lib/savings-goal";

const VALID_STYLES: SavingsStyle[] = ["bar", "ring"];

function SavingsGoalWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";
  const current = Math.max(0, Number(searchParams.get("current")) || 0);
  const target = Math.max(1, Number(searchParams.get("target")) || 1000000);
  const currency = searchParams.get("currency") || "₩";

  const rawStyle = searchParams.get("style");
  const style: SavingsStyle = VALID_STYLES.includes(rawStyle as SavingsStyle)
    ? (rawStyle as SavingsStyle)
    : "bar";

  const showValue = searchParams.get("showValue") !== "false";

  const color = parseHexColor(searchParams.get("color"), "22C55E");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";

  return (
    <WidgetScreen>
      <SavingsGoalPreview
        title={title}
        current={current}
        target={target}
        currency={currency}
        style={style}
        showValue={showValue}
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

export default function WidgetSavingsGoalPage() {
  return (
    <WidgetPage>
      <SavingsGoalWidgetContent />
    </WidgetPage>
  );
}
