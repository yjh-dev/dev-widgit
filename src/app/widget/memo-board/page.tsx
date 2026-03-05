"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import MemoBoardPreview from "@/components/widget/MemoBoardPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseMemos } from "@/lib/memo-board";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function MemoBoardWidgetContent() {
  const searchParams = useWidgetParams();

  const rawMemos = searchParams.get("memos") || "";
  const initialMemos = parseMemos(rawMemos);
  const cols = Math.min(Math.max(Number(searchParams.get("cols")) || 3, 2), 4);

  const noteColor = parseHexColor(searchParams.get("noteColor"), "FBBF24");
  const textColor = parseHexColor(searchParams.get("textColor"), "1E1E1E");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));
  const font = searchParams.get("font") || "sans";

  // widgetId for localStorage persistence
  const widgetId = rawMemos ? btoa(rawMemos).slice(0, 12) : "default";

  return (
    <WidgetScreen>
      <MemoBoardPreview
        initialMemos={initialMemos}
        interactive={true}
        cols={cols}
        noteColor={noteColor}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        font={font}
        widgetId={widgetId}
      />
    </WidgetScreen>
  );
}

export default function WidgetMemoBoardPage() {
  return (
    <WidgetPage>
      <MemoBoardWidgetContent />
    </WidgetPage>
  );
}
