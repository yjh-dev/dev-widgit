"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ClockPreview from "@/components/widget/ClockPreview";
import type { ClockFormat, ClockFont } from "@/lib/clock";

const VALID_FORMATS: ClockFormat[] = ["12h", "24h"];
const VALID_FONTS: ClockFont[] = ["sans", "serif", "mono"];

function ClockWidgetContent() {
  const searchParams = useSearchParams();

  const timezone = searchParams.get("timezone") || "Asia/Seoul";

  const rawFormat = searchParams.get("format");
  const format: ClockFormat = VALID_FORMATS.includes(rawFormat as ClockFormat)
    ? (rawFormat as ClockFormat)
    : "24h";

  const rawFont = searchParams.get("font");
  const font: ClockFont = VALID_FONTS.includes(rawFont as ClockFont)
    ? (rawFont as ClockFont)
    : "mono";

  const color = searchParams.get("color") || "1E1E1E";
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : rawBg;

  return (
    <div className="w-screen h-screen bg-transparent">
      <ClockPreview
        timezone={timezone}
        format={format}
        font={font}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
      />
    </div>
  );
}

export default function WidgetClockPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <ClockWidgetContent />
    </Suspense>
  );
}
