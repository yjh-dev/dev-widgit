"use client";

import { ImageIcon } from "lucide-react";
import type { ImageFit, CaptionPosition } from "@/lib/image-card";
import type { FontSizeKey } from "@/lib/common-widget-options";

const CAPTION_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const PLACEHOLDER_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

interface ImageCardPreviewProps {
  imageUrl?: string;
  caption?: string;
  linkUrl?: string;
  fit?: ImageFit;
  captionPos?: CaptionPosition;
  showCaption?: boolean;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  linkable?: boolean;
}

export default function ImageCardPreview({
  imageUrl = "",
  caption = "",
  linkUrl = "",
  fit = "cover",
  captionPos = "bottom",
  showCaption = true,
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  linkable = true,
}: ImageCardPreviewProps) {
  const hasImage = imageUrl.trim().length > 0;
  const hasCaption = showCaption && caption.trim().length > 0;

  const content = (
    <div
      className="w-full h-full flex flex-col items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        color: `#${color}`,
      }}
    >
      {!hasImage ? (
        /* Placeholder */
        <div className="flex flex-col items-center justify-center gap-2 opacity-40">
          <ImageIcon className="w-12 h-12" />
          <p className={PLACEHOLDER_SIZE_MAP[fontSize]}>이미지 URL을 입력하세요</p>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col overflow-hidden" style={{ borderRadius: Math.max(0, borderRadius - 4) }}>
          {/* Top caption */}
          {hasCaption && captionPos === "top" && (
            <p className={`${CAPTION_SIZE_MAP[fontSize]} font-medium shrink-0 pb-2 text-center`}>
              {caption}
            </p>
          )}

          {/* Image area */}
          <div className="relative flex-1 min-h-0 overflow-hidden" style={{ borderRadius: Math.max(0, borderRadius - 4) }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={caption || ""}
              className="w-full h-full"
              style={{ objectFit: fit }}
            />

            {/* Overlay caption */}
            {hasCaption && captionPos === "overlay" && (
              <div
                className="absolute bottom-0 left-0 right-0 px-3 py-2"
                style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
              >
                <p className={`${CAPTION_SIZE_MAP[fontSize]} text-white font-medium`}>
                  {caption}
                </p>
              </div>
            )}
          </div>

          {/* Bottom caption */}
          {hasCaption && captionPos === "bottom" && (
            <p className={`${CAPTION_SIZE_MAP[fontSize]} font-medium shrink-0 pt-2 text-center`}>
              {caption}
            </p>
          )}
        </div>
      )}
    </div>
  );

  if (linkable && linkUrl.trim()) {
    return (
      <a
        href={linkUrl}
        target="_top"
        rel="noopener noreferrer"
        className="block w-full h-full no-underline"
        style={{ color: "inherit" }}
      >
        {content}
      </a>
    );
  }

  return content;
}
