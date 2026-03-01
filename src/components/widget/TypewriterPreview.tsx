"use client";

import { useEffect, useState, useRef } from "react";
import { resolveFontStyle } from "@/lib/fonts";
import type { CursorStyle, TypewriterAlign } from "@/lib/typewriter";
import type { FontSizeKey } from "@/lib/common-widget-options";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

interface TypewriterPreviewProps {
  texts?: string[];
  speed?: number;
  pause?: number;
  cursor?: CursorStyle;
  loop?: boolean;
  deleteAnim?: boolean;
  align?: TypewriterAlign;
  bold?: boolean;
  font?: string;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  cursorColor?: string;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function TypewriterPreview({
  texts = ["타이핑 효과 위젯"],
  speed = 80,
  pause = 2000,
  cursor = "bar",
  loop = true,
  deleteAnim = true,
  align = "center",
  bold = true,
  font = "sans",
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  cursorColor = "",
  borderRadius = 16,
  padding = 24,
  fontSize = "lg",
}: TypewriterPreviewProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const textIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const displayTexts = texts.filter(Boolean);
  if (displayTexts.length === 0) displayTexts.push("타이핑 효과 위젯");

  const propsRef = useRef({ displayTexts, speed, pause, loop, deleteAnim });
  useEffect(() => { propsRef.current = { displayTexts, speed, pause, loop, deleteAnim }; });

  // Reset & restart animation when props change
  useEffect(() => {
    textIndexRef.current = 0;
    charIndexRef.current = 0;
    isDeletingRef.current = false;
    setDisplayText("");

    const tick = () => {
      const { displayTexts: dt, speed: spd, pause: pse, loop: lp, deleteAnim: da } = propsRef.current;
      const currentText = dt[textIndexRef.current % dt.length];

      if (!isDeletingRef.current) {
        if (charIndexRef.current < currentText.length) {
          charIndexRef.current++;
          setDisplayText(currentText.slice(0, charIndexRef.current));
          timerRef.current = setTimeout(tick, spd);
        } else {
          if (dt.length === 1 && !lp) return;
          timerRef.current = setTimeout(() => {
            if (da) {
              isDeletingRef.current = true;
              tick();
            } else {
              textIndexRef.current++;
              if (!lp && textIndexRef.current >= dt.length) return;
              charIndexRef.current = 0;
              setDisplayText("");
              timerRef.current = setTimeout(tick, spd);
            }
          }, pse);
        }
      } else {
        if (charIndexRef.current > 0) {
          charIndexRef.current--;
          setDisplayText(currentText.slice(0, charIndexRef.current));
          timerRef.current = setTimeout(tick, spd / 2);
        } else {
          isDeletingRef.current = false;
          textIndexRef.current++;
          if (!lp && textIndexRef.current >= dt.length) return;
          timerRef.current = setTimeout(tick, spd);
        }
      }
    };

    timerRef.current = setTimeout(tick, speed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texts.join("|"), speed, pause, loop, deleteAnim]);

  // Cursor blink
  useEffect(() => {
    if (cursor === "none") return;

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [cursor]);

  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";

  const fontStyle = resolveFontStyle(font);

  const effectiveCursorColor = cursorColor || color;

  const renderCursor = () => {
    if (cursor === "none") return null;

    const opacity = showCursor ? 1 : 0;

    if (cursor === "block") {
      return (
        <span
          style={{
            backgroundColor: `#${effectiveCursorColor}`,
            opacity,
            width: "0.55em",
            height: "1.1em",
            display: "inline-block",
            verticalAlign: "text-bottom",
            transition: "opacity 0.1s",
          }}
        />
      );
    }

    if (cursor === "underscore") {
      return (
        <span
          style={{
            borderBottom: `3px solid #${effectiveCursorColor}`,
            opacity,
            width: "0.55em",
            display: "inline-block",
            transition: "opacity 0.1s",
          }}
        >
          &nbsp;
        </span>
      );
    }

    // bar (default)
    return (
      <span
        style={{
          borderRight: `3px solid #${effectiveCursorColor}`,
          opacity,
          marginLeft: "2px",
          transition: "opacity 0.1s",
        }}
      >
        &nbsp;
      </span>
    );
  };

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
      <div className={`w-full ${alignClass}`}>
        <p
          className={`${FONT_SIZE_MAP[fontSize]} ${bold ? "font-bold" : "font-normal"} inline`}
          style={{ color: `#${color}` }}
        >
          {displayText}
          {renderCursor()}
        </p>
      </div>
    </div>
  );
}
