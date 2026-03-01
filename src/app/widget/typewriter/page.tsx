"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import TypewriterPreview from "@/components/widget/TypewriterPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
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
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));
  const cursorColor = parseHexColor(searchParams.get("cursorColor"), "");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = searchParams.get("fsize") ? parseFontSize(searchParams.get("fsize")) : "lg";

  return (
    <WidgetScreen>
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
    </WidgetScreen>
  );
}

export default function WidgetTypewriterPage() {
  return (
    <WidgetPage>
      <TypewriterWidgetContent />
    </WidgetPage>
  );
}
