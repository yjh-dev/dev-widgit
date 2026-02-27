"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import TypewriterPreview from "@/components/widget/TypewriterPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { CursorStyle, TypewriterAlign } from "@/lib/typewriter";

const VALID_CURSORS: CursorStyle[] = ["bar", "block", "underscore", "none"];
const VALID_ALIGNS: TypewriterAlign[] = ["left", "center", "right"];

function TypewriterWidgetContent() {
  const searchParams = useWidgetParams();

  const rawTexts = searchParams.get("texts") || "";
  const texts = rawTexts ? rawTexts.split("|").map(decodeURIComponent) : ["타이핑 효과 위젯"];

  const speed = Math.max(30, Math.min(200, Number(searchParams.get("speed")) || 80));
  const pause = Math.max(500, Math.min(5000, Number(searchParams.get("pause")) || 2000));

  const rawCursor = searchParams.get("cursor");
  const cursor: CursorStyle = VALID_CURSORS.includes(rawCursor as CursorStyle)
    ? (rawCursor as CursorStyle)
    : "bar";

  const loop = searchParams.get("loop") !== "false";
  const deleteAnim = searchParams.get("deleteAnim") !== "false";

  const rawAlign = searchParams.get("align");
  const align: TypewriterAlign = VALID_ALIGNS.includes(rawAlign as TypewriterAlign)
    ? (rawAlign as TypewriterAlign)
    : "center";

  const bold = searchParams.get("bold") !== "false";
  const font = searchParams.get("font") || "sans";

  const color = parseHexColor(searchParams.get("text"), "1E1E1E");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");
  const cursorColor = parseHexColor(searchParams.get("cursorColor"), "");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <TypewriterPreview
        texts={texts}
        speed={speed}
        pause={pause}
        cursor={cursor}
        loop={loop}
        deleteAnim={deleteAnim}
        align={align}
        bold={bold}
        font={font}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        cursorColor={cursorColor}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetTypewriterPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <TypewriterWidgetContent />
    </Suspense>
  );
}
