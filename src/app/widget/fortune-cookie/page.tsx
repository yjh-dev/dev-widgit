"use client";

import { Suspense } from "react";
import { useWidgetParams } from "@/lib/use-widget-params";
import FortuneCookiePreview from "@/components/widget/FortuneCookiePreview";
import { parseBorderRadius, parsePadding, parseFontSize } from "@/lib/common-widget-options";

function Content() {
  const params = useWidgetParams();

  const customMessage = params.get("message") || "";
  const lang = (params.get("lang") as "ko" | "en") || "ko";
  const style = (params.get("style") as "classic" | "modern" | "paper") || "classic";
  const cookieColor = params.get("cookieColor") || "D97706";
  const textColor = params.get("textColor") || "";
  const bgParam = params.get("bg");
  const transparentBg = bgParam === "transparent";
  const bg = transparentBg ? "FFFFFF" : bgParam || "FFFFFF";

  return (
    <FortuneCookiePreview
      customMessage={customMessage}
      lang={lang}
      style={style}
      cookieColor={cookieColor}
      textColor={textColor}
      bg={bg}
      transparentBg={transparentBg}
      borderRadius={parseBorderRadius(params.get("radius"))}
      padding={parsePadding(params.get("pad"))}
      fontSize={parseFontSize(params.get("fsize"))}
    />
  );
}

export default function FortuneCookieWidgetPage() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
