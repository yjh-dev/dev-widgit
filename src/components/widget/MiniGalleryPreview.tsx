"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { Images } from "lucide-react";
import { resolveFontStyle } from "@/lib/fonts";
import type { GalleryTransition } from "@/lib/mini-gallery";
import type { FontSizeKey } from "@/lib/common-widget-options";

interface MiniGalleryPreviewProps {
  images?: string[];
  interval?: number;
  transition?: GalleryTransition;
  showDots?: boolean;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

export default function MiniGalleryPreview({
  images = [],
  interval = 5,
  transition = "fade",
  showDots = true,
  color = "1E1E1E",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "sans",
}: MiniGalleryPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const validImages = images.filter((url) => url.trim());
  const fontStyle = resolveFontStyle(font);
  const effectiveTextColor = textColor || color;

  const goToNext = useCallback(() => {
    if (validImages.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
      setIsTransitioning(false);
    }, 400);
  }, [validImages.length]);

  useEffect(() => {
    if (validImages.length <= 1) return;
    const timer = setInterval(goToNext, interval * 1000);
    return () => clearInterval(timer);
  }, [goToNext, interval, validImages.length]);

  // Reset index when images change
  useEffect(() => {
    startTransition(() => setCurrentIndex(0));
  }, [validImages.length]);

  const safeIndex = validImages.length > 0 ? currentIndex % validImages.length : 0;

  const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      {validImages.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 opacity-50">
          <Images className="w-12 h-12" style={{ color: `#${effectiveTextColor}` }} />
          <p className={FONT_SIZE_MAP[fontSize]} style={{ color: `#${effectiveTextColor}` }}>
            이미지 URL을 추가하세요
          </p>
        </div>
      ) : (
        <div className="relative w-full flex-1 overflow-hidden rounded-md">
          {transition === "fade" ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={safeIndex}
              src={validImages[safeIndex]}
              alt={`슬라이드 ${safeIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400"
              style={{ opacity: isTransitioning ? 0 : 1 }}
            />
          ) : (
            <div
              className="flex h-full transition-transform duration-400 ease-in-out"
              style={{
                width: `${validImages.length * 100}%`,
                transform: `translateX(-${(safeIndex * 100) / validImages.length}%)`,
              }}
            >
              {validImages.map((url, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={url}
                  alt={`슬라이드 ${i + 1}`}
                  className="h-full object-cover"
                  style={{ width: `${100 / validImages.length}%` }}
                />
              ))}
            </div>
          )}

          {showDots && validImages.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1.5">
              {validImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`슬라이드 ${i + 1}로 이동`}
                  className="rounded-full transition-all"
                  style={{
                    width: i === safeIndex ? 16 : 6,
                    height: 6,
                    backgroundColor: i === safeIndex ? `#${color}` : "rgba(255,255,255,0.6)",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
