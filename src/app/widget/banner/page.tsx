"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import BannerPreview from "@/components/widget/BannerPreview";
import { parseBorderRadius, parsePadding, parseFontSize, parseHexColor } from "@/lib/common-widget-options";
import type { BannerAnimation, BannerAlign } from "@/lib/banner";

const VALID_ANIMATIONS: BannerAnimation[] = ["none", "scroll", "fade"];
const VALID_ALIGNS: BannerAlign[] = ["left", "center", "right"];

function BannerWidgetContent() {
  const searchParams = useSearchParams();

  const rawTexts = searchParams.get("texts") || "";
  const texts = rawTexts ? rawTexts.split("|").map(decodeURIComponent) : ["텍스트를 입력하세요"];

  const rawAnim = searchParams.get("anim");
  const animation: BannerAnimation = VALID_ANIMATIONS.includes(rawAnim as BannerAnimation)
    ? (rawAnim as BannerAnimation)
    : "none";

  const speed = Math.max(1, Math.min(10, Number(searchParams.get("speed")) || 3));

  const rawAlign = searchParams.get("align");
  const align: BannerAlign = VALID_ALIGNS.includes(rawAlign as BannerAlign)
    ? (rawAlign as BannerAlign)
    : "center";

  const bold = searchParams.get("bold") !== "false";
  const font = searchParams.get("font") || "sans";

  const color = parseHexColor(searchParams.get("color"), "1E1E1E");
  const rawBg = searchParams.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(searchParams.get("radius"));
  const padding = parsePadding(searchParams.get("pad"));
  const fontSize = parseFontSize(searchParams.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <BannerPreview
        texts={texts}
        animation={animation}
        speed={speed}
        align={align}
        bold={bold}
        font={font}
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

export default function WidgetBannerPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <BannerWidgetContent />
    </Suspense>
  );
}
