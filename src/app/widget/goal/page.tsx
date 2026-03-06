"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import GoalPreview from "@/components/widget/GoalPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { VALID_STYLES, VALID_ICONS, type GoalStyle, type GoalIcon } from "@/lib/goal";

function GoalWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";
  const current = Math.max(0, Number(searchParams.get("current")) || 0);
  const target = Math.max(1, Number(searchParams.get("target")) || 100);
  const unit = searchParams.get("unit") || "";

  const rawStyle = searchParams.get("style");
  const style: GoalStyle = VALID_STYLES.includes(rawStyle as GoalStyle)
    ? (rawStyle as GoalStyle)
    : "bar";

  const rawIcon = searchParams.get("icon");
  const icon: GoalIcon = VALID_ICONS.includes(rawIcon as GoalIcon)
    ? (rawIcon as GoalIcon)
    : "";

  const showValue = searchParams.get("showValue") !== "false";
  const year = searchParams.get("year") || "";

  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";
  const celebrate = searchParams.get("celebrate") !== "false";

  return (
    <WidgetScreen>
      <GoalPreview
        title={title}
        current={current}
        target={target}
        unit={unit}
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
        icon={icon}
        year={year}
        celebrate={celebrate}
      />
    </WidgetScreen>
  );
}

export default function WidgetGoalPage() {
  return (
    <WidgetPage>
      <GoalWidgetContent />
    </WidgetPage>
  );
}
