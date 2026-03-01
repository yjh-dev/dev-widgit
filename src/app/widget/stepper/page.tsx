"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import StepperPreview from "@/components/widget/StepperPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { deserializeSteps, type StepperLayout } from "@/lib/stepper";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

const VALID_LAYOUTS: StepperLayout[] = ["horizontal", "vertical"];

function StepperWidgetContent() {
  const searchParams = useWidgetParams();

  const steps = deserializeSteps(searchParams.get("steps") || "");

  const rawCurrentStep = Number(searchParams.get("current"));
  const currentStep = rawCurrentStep >= 0 ? rawCurrentStep : 1;

  const rawLayout = searchParams.get("layout");
  const layout: StepperLayout = VALID_LAYOUTS.includes(rawLayout as StepperLayout)
    ? (rawLayout as StepperLayout)
    : "horizontal";

  const showDesc = searchParams.get("showDesc") !== "false";
  const showNumbers = searchParams.get("showNumbers") !== "false";

  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const completedColor = parseHexColor(searchParams.get("completedColor"), "22C55E");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <WidgetScreen>
      <StepperPreview
        steps={steps}
        currentStep={currentStep}
        layout={layout}
        showDesc={showDesc}
        showNumbers={showNumbers}
        color={color}
        completedColor={completedColor}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </WidgetScreen>
  );
}

export default function WidgetStepperPage() {
  return (
    <WidgetPage>
      <StepperWidgetContent />
    </WidgetPage>
  );
}
