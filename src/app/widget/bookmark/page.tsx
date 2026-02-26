"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import BookmarkPreview from "@/components/widget/BookmarkPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";

function BookmarkWidgetContent() {
  const searchParams = useSearchParams();

  const url = searchParams.get("url") || "";
  const title = searchParams.get("title") || "";
  const desc = searchParams.get("desc") || "";
  const showIcon = searchParams.get("showIcon") !== "false";
  const showUrl = searchParams.get("showUrl") !== "false";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <BookmarkPreview
        url={url}
        title={title}
        desc={desc}
        showIcon={showIcon}
        showUrl={showUrl}
        color={color}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetBookmarkPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <BookmarkWidgetContent />
    </Suspense>
  );
}
