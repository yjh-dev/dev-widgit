"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import StickyNotePreview from "@/components/widget/StickyNotePreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { StickyPinType, StickyLineHeight } from "@/lib/sticky-note";

const VALID_PINS: StickyPinType[] = ["none", "pin", "tape"];
const VALID_LH: StickyLineHeight[] = ["tight", "normal", "relaxed"];

function StickyNoteWidgetContent() {
  const searchParams = useWidgetParams();

  const text = searchParams.get("text") || "메모를 입력하세요";
  const noteColor = parseHexColor(searchParams.get("noteColor"), "FBBF24");
  const textColor = parseHexColor(searchParams.get("textColor"), "1E1E1E");

  const rawPin = searchParams.get("pin");
  const pin: StickyPinType = VALID_PINS.includes(rawPin as StickyPinType)
    ? (rawPin as StickyPinType)
    : "pin";

  const rawRotation = searchParams.get("rotation");
  const rotation = rawRotation !== null ? Math.max(-5, Math.min(5, Number(rawRotation))) : 2;
  const font = searchParams.get("font") || "gaegu";

  const rawLh = searchParams.get("lh");
  const lh: StickyLineHeight = VALID_LH.includes(rawLh as StickyLineHeight)
    ? (rawLh as StickyLineHeight)
    : "normal";

  const shadow = searchParams.get("shadow") !== "false";

  const rawRadius = searchParams.get("radius");
  const borderRadius = rawRadius !== null ? Math.max(0, Math.min(9999, Number(rawRadius) || 0)) : 4;
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <StickyNotePreview
        text={text}
        noteColor={noteColor}
        textColor={textColor}
        pin={pin}
        rotation={rotation}
        font={font}
        lh={lh}
        shadow={shadow}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetStickyNotePage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <StickyNoteWidgetContent />
    </Suspense>
  );
}
