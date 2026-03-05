"use client";

import { useState, useCallback, useEffect, startTransition } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { generatePassword, getStrength } from "@/lib/password-gen";
import type { FontSizeKey } from "@/lib/common-widget-options";
import { resolveFontStyle } from "@/lib/fonts";

const FONT_SIZE_MAP: Record<FontSizeKey, { pwd: string; label: string }> = {
  sm: { pwd: "text-sm", label: "text-xs" },
  md: { pwd: "text-base", label: "text-sm" },
  lg: { pwd: "text-lg", label: "text-base" },
  xl: { pwd: "text-xl", label: "text-lg" },
};

const STRENGTH_COLORS: Record<string, string> = {
  weak: "#EF4444",
  medium: "#F59E0B",
  strong: "#22C55E",
  "very-strong": "#10B981",
};

const STRENGTH_LABELS: Record<string, string> = {
  weak: "약함",
  medium: "보통",
  strong: "강함",
  "very-strong": "매우 강함",
};

interface PasswordGenPreviewProps {
  length?: number;
  upper?: boolean;
  lower?: boolean;
  numbers?: boolean;
  symbols?: boolean;
  color?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
  font?: string;
}

export default function PasswordGenPreview({
  length = 16,
  upper = true,
  lower = true,
  numbers = true,
  symbols = false,
  color = "2563EB",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
  font = "mono",
}: PasswordGenPreviewProps) {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const pwd = generatePassword({ length, upper, lower, numbers, symbols });
    setPassword(pwd);
  }, [length, upper, lower, numbers, symbols]);

  useEffect(() => {
    startTransition(() => generate());
  }, [generate]);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const strength = password ? getStrength(password) : { level: "weak" as const, score: 0 };
  const strengthColor = STRENGTH_COLORS[strength.level];
  const sizeConfig = FONT_SIZE_MAP[fontSize];
  const resolvedTextColor = textColor || (color === "FFFFFF" ? "1E1E1E" : color);
  const fontStyle = resolveFontStyle(font);

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center gap-4 overflow-hidden ${fontStyle.className ?? ""}`}
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        fontFamily: fontStyle.fontFamily,
      }}
    >
      {/* Password display */}
      <div
        className="w-full rounded-lg px-4 py-3 flex items-center gap-2"
        style={{ backgroundColor: `#${color}15`, border: `1px solid #${color}30` }}
      >
        <p
          className={`${sizeConfig.pwd} font-mono flex-1 break-all select-all`}
          style={{ color: `#${resolvedTextColor}` }}
        >
          {password || "..."}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          aria-label="비밀번호 복사"
          className="shrink-0 p-1.5 rounded-md transition-colors hover:opacity-70"
          style={{ color: `#${color}` }}
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {copied && (
        <p className="text-xs" style={{ color: `#${color}` }}>
          복사됨!
        </p>
      )}

      {/* Strength bar */}
      <div className="w-full space-y-1">
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-1 h-1.5 rounded-full transition-colors"
              style={{
                backgroundColor:
                  i < Math.ceil(strength.score / 7 * 4)
                    ? strengthColor
                    : `#${resolvedTextColor}20`,
              }}
            />
          ))}
        </div>
        <p className={`${sizeConfig.label} text-center`} style={{ color: strengthColor }}>
          {STRENGTH_LABELS[strength.level]}
        </p>
      </div>

      {/* Generate button */}
      <button
        type="button"
        onClick={generate}
        aria-label="비밀번호 생성"
        className="px-4 py-2 rounded-lg font-medium text-sm transition-all hover:opacity-80 active:scale-95 inline-flex items-center gap-2"
        style={{
          backgroundColor: `#${color}`,
          color: bg === color ? "#FFFFFF" : `#${bg}`,
        }}
      >
        <RefreshCw className="w-4 h-4" />
        생성
      </button>
    </div>
  );
}
