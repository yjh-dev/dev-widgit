"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import { Suspense } from "react";
import TestimonialPreview from "@/components/widget/TestimonialPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import { VALID_LAYOUTS, type TestimonialLayout } from "@/lib/testimonial";

function TestimonialWidgetContent() {
  const searchParams = useWidgetParams();

  const quote = searchParams.get("quote") || "이 서비스를 사용한 후 생산성이 크게 향상되었습니다. 강력히 추천합니다!";
  const author = searchParams.get("author") || "김지수";
  const role = searchParams.get("role") || "프로덕트 매니저";
  const avatarUrl = searchParams.get("avatarUrl") || "";
  const showAvatar = searchParams.get("showAvatar") !== "false";
  const showRole = searchParams.get("showRole") !== "false";
  const showQuoteMarks = searchParams.get("showQuoteMarks") !== "false";

  const rawLayout = searchParams.get("layout");
  const layout: TestimonialLayout = VALID_LAYOUTS.includes(rawLayout as TestimonialLayout)
    ? (rawLayout as TestimonialLayout)
    : "card";

  const accentColor = parseHexColor(searchParams.get("accentColor"), "6366F1");
  const textColor = parseHexColor(searchParams.get("textColor"), "");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <TestimonialPreview
        quote={quote}
        author={author}
        role={role}
        avatarUrl={avatarUrl}
        showAvatar={showAvatar}
        showRole={showRole}
        showQuoteMarks={showQuoteMarks}
        layout={layout}
        accentColor={accentColor}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </div>
  );
}

export default function WidgetTestimonialPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <TestimonialWidgetContent />
    </Suspense>
  );
}
