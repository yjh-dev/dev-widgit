"use client";

import { useState, useCallback } from "react";
import { getRandomFortune, type CookieStyle } from "@/lib/fortune-cookie";
import { parseFontSize } from "@/lib/common-widget-options";

interface FortuneCookiePreviewProps {
  customMessage?: string;
  lang?: "ko" | "en";
  style?: CookieStyle;
  cookieColor?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: string;
}

export default function FortuneCookiePreview({
  customMessage = "",
  lang = "ko",
  style = "classic",
  cookieColor = "D97706",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: FortuneCookiePreviewProps) {
  const [fortune, setFortune] = useState(() =>
    customMessage || getRandomFortune(lang),
  );
  const [opened, setOpened] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleClick = useCallback(() => {
    if (!opened) {
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setOpened(true);
        setFortune(customMessage || getRandomFortune(lang));
      }, 600);
    } else {
      setOpened(false);
      setTimeout(() => {
        setFortune(customMessage || getRandomFortune(lang));
      }, 300);
    }
  }, [opened, customMessage, lang]);

  const fs = parseFontSize(fontSize);
  const resolvedText = textColor ? `#${textColor}` : "#1E1E1E";
  const resolvedBg = transparentBg ? "transparent" : `#${bg}`;

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-4"
      style={{
        background: resolvedBg,
        borderRadius,
        padding,
        fontSize: fs,
        color: resolvedText,
      }}
    >
      {/* Cookie */}
      <button
        type="button"
        onClick={handleClick}
        className="transition-transform duration-200 hover:scale-105 focus:outline-none"
        style={{ animation: shaking ? "shake 0.6s ease-in-out" : undefined }}
        aria-label="포춘 쿠키 열기"
      >
        {style === "classic" ? (
          <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="40" cy="40" rx="35" ry="20" fill={`#${cookieColor}`} />
            <path d="M10 35 Q40 10 70 35" stroke={`#${cookieColor}`} strokeWidth="8" fill={`#${cookieColor}`} />
            <path d="M38 20 Q40 5 42 20" stroke="#FEF3C7" strokeWidth="1.5" fill="none" opacity={opened ? 1 : 0} />
            {opened && (
              <rect x="28" y="8" width="24" height="14" rx="2" fill="#FEF9C3" stroke="#D97706" strokeWidth="0.5" />
            )}
          </svg>
        ) : style === "modern" ? (
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ background: `#${cookieColor}20`, border: `2px solid #${cookieColor}` }}
          >
            🥠
          </div>
        ) : (
          <div
            className="w-16 h-16 rounded-lg flex items-center justify-center text-3xl shadow-sm"
            style={{ background: "#FEF9C3" }}
          >
            📜
          </div>
        )}
      </button>

      {/* Fortune message */}
      <div
        className="text-center max-w-[280px] transition-all duration-300"
        style={{
          opacity: opened ? 1 : 0.5,
          transform: opened ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <p className="leading-relaxed" style={{ fontSize: fs }}>
          {opened ? fortune : (lang === "ko" ? "쿠키를 클릭해 보세요!" : "Click the cookie!")}
        </p>
      </div>

      {opened && (
        <button
          type="button"
          onClick={handleClick}
          className="text-xs opacity-50 hover:opacity-80 transition-opacity"
        >
          {lang === "ko" ? "다시 뽑기" : "Try again"}
        </button>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(-8deg); }
          30% { transform: rotate(8deg); }
          45% { transform: rotate(-6deg); }
          60% { transform: rotate(6deg); }
          75% { transform: rotate(-3deg); }
          90% { transform: rotate(3deg); }
        }
      `}</style>
    </div>
  );
}
