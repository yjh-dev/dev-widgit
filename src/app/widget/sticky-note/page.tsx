"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import StickyNotePreview from "@/components/widget/StickyNotePreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { StickyPinType, StickyLineHeight, StickyNoteMode } from "@/lib/sticky-note";
import { parseMemos } from "@/lib/sticky-note";

const VALID_PINS: StickyPinType[] = ["none", "pin", "tape"];
const VALID_LH: StickyLineHeight[] = ["tight", "normal", "relaxed"];
const VALID_MODES: StickyNoteMode[] = ["single", "board"];

function StickyNoteWidgetContent() {
  const searchParams = useWidgetParams();

  const rawMode = searchParams.get("mode");
  const mode: StickyNoteMode = VALID_MODES.includes(rawMode as StickyNoteMode)
    ? (rawMode as StickyNoteMode)
    : "single";

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

  /* board mode params */
  const rawMemos = searchParams.get("memos") || "";
  const initialMemos = parseMemos(rawMemos);
  const cols = Math.min(Math.max(Number(searchParams.get("cols")) || 3, 2), 4);
  const interactive = searchParams.get("interactive") !== "false";
  const widgetId = rawMemos ? btoa(rawMemos).slice(0, 12) : "default";

  return (
    <WidgetScreen>
      <StickyNotePreview
        mode={mode}
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
        initialMemos={initialMemos}
        cols={cols}
        interactive={interactive}
        widgetId={widgetId}
      />
    </WidgetScreen>
  );
}

export default function WidgetStickyNotePage() {
  return (
    <WidgetPage>
      <StickyNoteWidgetContent />
    </WidgetPage>
  );
}
