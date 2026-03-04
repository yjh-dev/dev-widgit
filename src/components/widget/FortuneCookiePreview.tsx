"use client";

import { useState, useCallback } from "react";
import { getRandomFortune, type CookieStyle } from "@/lib/fortune-cookie";
import { parseFontSize } from "@/lib/common-widget-options";

interface FortuneCookiePreviewProps {
  customMessages?: string[];
  lang?: "ko" | "en";
  style?: CookieStyle;
  cookieColor?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: string;
  taps?: number;
}

export default function FortuneCookiePreview({
  customMessages = [],
  lang = "ko",
  style = "classic",
  cookieColor = "D97706",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  taps = 1,
}: FortuneCookiePreviewProps) {
  const getFortune = useCallback(
    () => getRandomFortune(lang, undefined, customMessages),
    [lang, customMessages],
  );

  const [fortune, setFortune] = useState(() => getFortune());
  const [opened, setOpened] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [tapCount, setTapCount] = useState(0);

  const requiredTaps = Math.max(1, Math.min(10, taps));

  const handleClick = useCallback(() => {
    if (shaking) return;

    if (!opened) {
      const nextTap = tapCount + 1;
      setTapCount(nextTap);

      if (nextTap >= requiredTaps) {
        // Final tap: shake then open
        setShaking(true);
        setTimeout(() => {
          setShaking(false);
          setOpened(true);
          setFortune(getFortune());
        }, 600);
      } else {
        // Intermediate tap: just shake
        setShaking(true);
        setTimeout(() => setShaking(false), 400);
      }
    } else {
      // Re-draw: close cookie
      setOpened(false);
      setTapCount(0);
      setTimeout(() => {
        setFortune(getFortune());
      }, 300);
    }
  }, [opened, tapCount, requiredTaps, shaking, getFortune]);

  const fs = parseFontSize(fontSize);
  const resolvedText = textColor ? `#${textColor}` : "#1E1E1E";
  const resolvedBg = transparentBg ? "transparent" : `#${bg}`;

  // Crack progress: 0 when no taps, approaching 1 as taps increase
  const crackProgress = requiredTaps > 1 && tapCount > 0 && !opened
    ? tapCount / requiredTaps
    : 0;

  const renderClassicCookie = () => {
    if (opened) {
      // Split cookie with fortune paper
      return (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fortune paper rising from center */}
          <g className="animate-fortune-paper">
            <rect x="25" y="12" width="30" height="18" rx="2" fill="#FEF9C3" stroke="#D97706" strokeWidth="0.5" />
            <line x1="30" y1="18" x2="50" y2="18" stroke="#D9770640" strokeWidth="0.5" />
            <line x1="30" y1="22" x2="48" y2="22" stroke="#D9770640" strokeWidth="0.5" />
          </g>
          {/* Left half */}
          <g className="animate-crack-left">
            <ellipse cx="25" cy="50" rx="18" ry="16" fill={`#${cookieColor}`} />
            <path d="M10 45 Q25 30 38 45" stroke={`#${cookieColor}`} strokeWidth="6" fill={`#${cookieColor}`} />
            {/* Texture */}
            <ellipse cx="25" cy="50" rx="14" ry="12" fill="none" stroke={`#${cookieColor}80`} strokeWidth="0.5" />
          </g>
          {/* Right half */}
          <g className="animate-crack-right">
            <ellipse cx="55" cy="50" rx="18" ry="16" fill={`#${cookieColor}`} />
            <path d="M42 45 Q55 30 70 45" stroke={`#${cookieColor}`} strokeWidth="6" fill={`#${cookieColor}`} />
            {/* Texture */}
            <ellipse cx="55" cy="50" rx="14" ry="12" fill="none" stroke={`#${cookieColor}80`} strokeWidth="0.5" />
          </g>
        </svg>
      );
    }

    // Closed/tapping cookie
    return (
      <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="40" rx="35" ry="20" fill={`#${cookieColor}`} />
        <path d="M10 35 Q40 10 70 35" stroke={`#${cookieColor}`} strokeWidth="8" fill={`#${cookieColor}`} />
        {/* Texture line */}
        <ellipse cx="40" cy="38" rx="28" ry="14" fill="none" stroke={`#${cookieColor}60`} strokeWidth="0.5" />
        {/* Crack lines that appear with tapping progress */}
        {crackProgress > 0 && (
          <g opacity={crackProgress * 0.9}>
            <path
              d="M40 22 L41 28 L39 34"
              stroke="#8B4513"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
            />
            {crackProgress > 0.3 && (
              <path
                d="M39 34 L36 38"
                stroke="#8B4513"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
              />
            )}
            {crackProgress > 0.5 && (
              <path
                d="M39 34 L43 39"
                stroke="#8B4513"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
              />
            )}
            {crackProgress > 0.7 && (
              <path
                d="M36 38 L33 42"
                stroke="#8B4513"
                strokeWidth="0.6"
                fill="none"
                strokeLinecap="round"
              />
            )}
          </g>
        )}
      </svg>
    );
  };

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
        style={{ animation: shaking ? (opened ? "shake 0.6s ease-in-out" : "shake 0.4s ease-in-out") : undefined }}
        aria-label="포춘 쿠키 열기"
      >
        {style === "classic" ? renderClassicCookie() : style === "modern" ? (
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

      {/* Tap progress hint */}
      {tapCount > 0 && tapCount < requiredTaps && !opened && (
        <p className="text-xs opacity-60 tabular-nums">
          {tapCount} / {requiredTaps}
        </p>
      )}

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
        @keyframes crack-left {
          from { transform: rotate(0deg) translate(0, 0); }
          to { transform: rotate(-15deg) translate(-6px, 4px); }
        }
        @keyframes crack-right {
          from { transform: rotate(0deg) translate(0, 0); }
          to { transform: rotate(15deg) translate(6px, 4px); }
        }
        @keyframes fortune-paper {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-crack-left {
          animation: crack-left 0.5s ease-out forwards;
          transform-origin: 25px 50px;
        }
        .animate-crack-right {
          animation: crack-right 0.5s ease-out forwards;
          transform-origin: 55px 50px;
        }
        .animate-fortune-paper {
          animation: fortune-paper 0.6s 0.2s ease-out both;
        }
      `}</style>
    </div>
  );
}
