"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import StickyNotePreview from "@/components/widget/StickyNotePreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { parseMemos } from "@/lib/sticky-note";

/**
 * Compatibility page: renders memo-board URLs via StickyNotePreview mode="board".
 * Parses legacy memo-board URL params and delegates to the unified sticky-note component.
 */
function MemoBoardWidgetContent() {
  const searchParams = useWidgetParams();

  const rawMemos = searchParams.get("memos") || "";
  const initialMemos = parseMemos(rawMemos);
  const cols = Math.min(Math.max(Number(searchParams.get("cols")) || 3, 2), 4);

  const noteColor = parseHexColor(searchParams.get("noteColor"), "FBBF24");
  const textColor = parseHexColor(searchParams.get("textColor"), "1E1E1E");
  const font = searchParams.get("font") || "sans";

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  // widgetId for localStorage persistence
  const widgetId = rawMemos ? btoa(rawMemos).slice(0, 12) : "default";

  return (
    <WidgetScreen>
      <StickyNotePreview
        mode="board"
        initialMemos={initialMemos}
        interactive={true}
        cols={cols}
        noteColor={noteColor}
        textColor={textColor}
        font={font}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
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
