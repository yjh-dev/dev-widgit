"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import RoutineTimerPreview from "@/components/widget/RoutineTimerPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseSteps } from "@/lib/routine-timer";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function RoutineTimerWidgetContent() {
  const searchParams = useWidgetParams();

  const rawSteps = searchParams.get("steps") || "";
  const steps = parseSteps(rawSteps);

  const autoNext = searchParams.get("autoNext") !== "false";
  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));
  const font = searchParams.get("font") || "sans";

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <RoutineTimerPreview
        steps={steps}
        autoNext={autoNext}
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

export default function WidgetRoutineTimerPage() {
  return (
    <WidgetPage>
      <RoutineTimerWidgetContent />
    </WidgetPage>
  );
}
