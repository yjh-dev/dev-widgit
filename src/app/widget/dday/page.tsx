"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import DdayWidgetPreview from "@/components/widget/DdayWidgetPreview";
import type { DdayDateFormat } from "@/components/widget/DdayWidgetPreview";
import type { FontKey } from "@/lib/fonts";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

const VALID_CALC_TYPES = ["down", "up"] as const;
const VALID_LAYOUTS = ["default", "progress"] as const;
const VALID_FONTS: FontKey[] = [
  "noto-sans-kr",
  "jua",
  "do-hyeon",
  "gothic-a1",
  "gaegu",
  "black-han-sans",
];
const VALID_DATE_FORMATS: DdayDateFormat[] = ["full", "short", "dot", "none"];

function DdayWidgetContent() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "D-Day";
  const targetDate = searchParams.get("date") || "";
  const bgColor = parseHexColor(searchParams.get("bg"), "1E1E1E");
  const textColor = parseHexColor(searchParams.get("text"), "FFFFFF");

  const rawCalcType = searchParams.get("calcType");
  const calcType = VALID_CALC_TYPES.includes(rawCalcType as "down" | "up")
    ? (rawCalcType as "down" | "up")
    : "down";

  const isAnnual = searchParams.get("annual") === "true";

  const rawLayout = searchParams.get("layout");
  const layout = VALID_LAYOUTS.includes(rawLayout as "default" | "progress")
    ? (rawLayout as "default" | "progress")
    : "default";

  const startDate = searchParams.get("start") || "";
  const isTransparent = searchParams.get("transparent") === "true";

  const rawFont = searchParams.get("font");
  const font = VALID_FONTS.includes(rawFont as FontKey)
    ? (rawFont as FontKey)
    : "noto-sans-kr";

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  const showTime = searchParams.get("showTime") === "true";
  const blink = searchParams.get("blink") !== "false";
  const doneMsg = searchParams.get("doneMsg") || "";

  const barColor = parseHexColor(searchParams.get("barColor"), "");

  const rawDateFmt = searchParams.get("dateFmt");
  const dateFmt: DdayDateFormat = VALID_DATE_FORMATS.includes(rawDateFmt as DdayDateFormat)
    ? (rawDateFmt as DdayDateFormat)
    : "full";

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-transparent">
      <DdayWidgetPreview
        title={title}
        targetDate={targetDate}
        bgColor={bgColor}
        textColor={textColor}
        calcType={calcType}
        isAnnual={isAnnual}
        layout={layout}
        startDate={startDate}
        isTransparent={isTransparent}
        font={font}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        showTime={showTime}
        blink={blink}
        doneMsg={doneMsg}
        barColor={barColor}
        dateFmt={dateFmt}
      />
    </div>
  );
}

export default function WidgetDdayPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <DdayWidgetContent />
    </Suspense>
  );
}
