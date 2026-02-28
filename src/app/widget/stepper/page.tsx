"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import StepperPreview from "@/components/widget/StepperPreview";
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
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
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
    </div>
  );
}

export default function WidgetStepperPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <StepperWidgetContent />
    </Suspense>
  );
}
