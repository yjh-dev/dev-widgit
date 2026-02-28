"use client";

import { Suspense } from "react";
import { useWidgetParams } from "@/lib/use-widget-params";
import TodoPreview from "@/components/widget/TodoPreview";
import { parseTodoItems } from "@/lib/todo";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function TodoWidgetContent() {
  const searchParams = useWidgetParams();

  const title = searchParams.get("title") || "";
  const rawItems = searchParams.get("items") || "";
  const initialItems = parseTodoItems(rawItems);

  const color = parseHexColor(searchParams.get("color"), "2563EB");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const showProgress = searchParams.get("progress") !== "false";
  const strikethrough = searchParams.get("strike") !== "false";

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  // widgetId for localStorage persistence (hash of items param)
  const widgetId = rawItems ? btoa(rawItems).slice(0, 12) : "default";

  return (
    <div className="w-screen h-screen bg-transparent">
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
    </div>
  );
}

export default function WidgetTodoPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <TodoWidgetContent />
    </Suspense>
  );
}
