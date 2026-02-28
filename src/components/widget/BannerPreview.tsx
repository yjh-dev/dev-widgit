"use client";

import { useEffect, useState } from "react";
import { resolveFontStyle } from "@/lib/fonts";
import type { BannerAnimation, BannerAlign } from "@/lib/banner";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

interface BannerPreviewProps {
  texts?: string[];
  animation?: BannerAnimation;
  speed?: number;
  align?: BannerAlign;
  bold?: boolean;
  font?: string;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function BannerPreview({
  texts = ["오늘도 화이팅! 💪"],
  animation = "none",
  speed = 3,
  align = "center",
  bold = true,
  font = "sans",
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "lg",
}: BannerPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const displayTexts = texts.filter(Boolean);
  if (displayTexts.length === 0) displayTexts.push("텍스트를 입력하세요");

  useEffect(() => {
    if (animation !== "fade" || displayTexts.length <= 1) return;

    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % displayTexts.length);
        setFadeIn(true);
      }, 500);
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [animation, speed, displayTexts.length]);

  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  const fontStyle = resolveFontStyle(font);

  const scrollDuration = Math.max(3, speed * 2);

  return (
    <div
      className={`w-full h-full flex items-center justify-center overflow-hidden ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        fontFamily: fontStyle.fontFamily,
        borderRadius,
        padding,
      }}
    >
      {animation === "scroll" ? (
        <div className="w-full overflow-hidden">
          <p
            className={`${FONT_SIZE_MAP[fontSize]} ${bold ? "font-bold" : "font-normal"} whitespace-nowrap animate-marquee`}
            style={{
              color: `#${color}`,
              animationDuration: `${scrollDuration}s`,
            }}
          >
            {displayTexts.join("   ·   ")}
          </p>
          <style jsx>{`
            @keyframes marquee {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
            .animate-marquee {
              animation: marquee linear infinite;
            }
          `}</style>
        </div>
      ) : animation === "fade" ? (
        <div className={`w-full ${alignClass}`}>
          <p
            className={`${FONT_SIZE_MAP[fontSize]} ${bold ? "font-bold" : "font-normal"} transition-opacity duration-500`}
            style={{
              color: `#${color}`,
              opacity: fadeIn ? 1 : 0,
            }}
          >
            {displayTexts[currentIndex % displayTexts.length]}
          </p>
        </div>
      ) : (
        <div className={`w-full ${alignClass}`}>
          {displayTexts.map((text, i) => (
            <p
              key={i}
              className={`${FONT_SIZE_MAP[fontSize]} ${bold ? "font-bold" : "font-normal"}`}
              style={{ color: `#${color}` }}
            >
              {text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
