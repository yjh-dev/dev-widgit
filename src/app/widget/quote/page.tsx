"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import QuotePreview from "@/components/widget/QuotePreview";
import type { QuoteFont } from "@/lib/quote";

const VALID_FONTS: QuoteFont[] = ["sans", "serif", "script"];

function QuoteWidgetContent() {
  const searchParams = useSearchParams();

  const text = searchParams.get("text") || "";
  const author = searchParams.get("author") || "";

  const rawFont = searchParams.get("font");
  const font: QuoteFont = VALID_FONTS.includes(rawFont as QuoteFont)
    ? (rawFont as QuoteFont)
    : "serif";

  const textColor = searchParams.get("textColor") || "1E1E1E";
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : rawBg;

  return (
    <div className="w-screen h-screen bg-transparent">
      <QuotePreview
        text={text}
        author={author}
        font={font}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
      />
    </div>
  );
}

export default function WidgetQuotePage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <QuoteWidgetContent />
    </Suspense>
  );
}
