"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PomodoroPreview from "@/components/widget/PomodoroPreview";
import type { PomodoroProgressStyle } from "@/components/widget/PomodoroPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

const VALID_PSTYLES: PomodoroProgressStyle[] = ["bar", "ring"];

function PomodoroWidgetContent() {
  const searchParams = useSearchParams();

  const rawWork = Number(searchParams.get("work"));
  const workTime = rawWork > 0 && rawWork <= 120 ? rawWork : 25;

  const rawBreak = Number(searchParams.get("break"));
  const breakTime = rawBreak > 0 && rawBreak <= 60 ? rawBreak : 5;

  const color = parseHexColor(searchParams.get("color"), "E11D48");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  const rawLongBreak = Number(searchParams.get("longBreak"));
  const longBreak = rawLongBreak > 0 && rawLongBreak <= 60 ? rawLongBreak : 15;

  const rawRounds = Number(searchParams.get("rounds"));
  const rounds = rawRounds > 0 && rawRounds <= 10 ? rawRounds : 4;

  const showRounds = searchParams.get("showRounds") !== "false";
  const breakColor = parseHexColor(searchParams.get("breakColor"), "22C55E");
  const autoStart = searchParams.get("autoStart") === "true";

  const rawPStyle = searchParams.get("pStyle");
  const pStyle: PomodoroProgressStyle = VALID_PSTYLES.includes(rawPStyle as PomodoroProgressStyle)
    ? (rawPStyle as PomodoroProgressStyle)
    : "bar";

  return (
    <div className="w-screen h-screen bg-transparent">
      <PomodoroPreview
        workTime={workTime}
        breakTime={breakTime}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        longBreak={longBreak}
        rounds={rounds}
        showRounds={showRounds}
        breakColor={breakColor}
        autoStart={autoStart}
        pStyle={pStyle}
      />
    </div>
  );
}

export default function WidgetPomodoroPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <PomodoroWidgetContent />
    </Suspense>
  );
}
