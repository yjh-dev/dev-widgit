"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import TodoPreview from "@/components/widget/TodoPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";
import { parseTodoItems } from "@/lib/todo";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function TodoWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";
  const rawItems = searchParams.get("items") || "";
  const initialItems = parseTodoItems(rawItems);

  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const { bg, transparentBg } = parseBgParam(searchParams.get("bg"));

  const showProgress = searchParams.get("progress") !== "false";
  const strikethrough = searchParams.get("strike") !== "false";

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  // widgetId for localStorage persistence (hash of items param)
  const widgetId = rawItems ? btoa(rawItems).slice(0, 12) : "default";

  return (
    <WidgetScreen>
      <TodoPreview
        title={title}
        initialItems={initialItems}
        interactive={true}
        color={color}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
        showProgress={showProgress}
        strikethrough={strikethrough}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
        widgetId={widgetId}
      />
    </WidgetScreen>
  );
}

export default function WidgetTodoPage() {
  return (
    <WidgetPage>
      <TodoWidgetContent />
    </WidgetPage>
  );
}
