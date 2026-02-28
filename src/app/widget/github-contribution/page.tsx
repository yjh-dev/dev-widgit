"use client";

import { Suspense } from "react";
import { useWidgetParams } from "@/lib/use-widget-params";
import {
  parseBorderRadius,
  parsePadding,
  parseFontSize,
  parseHexColor,
} from "@/lib/common-widget-options";
import GithubContributionPreview from "@/components/widget/GithubContributionPreview";

const VALID_CELL_SIZES = ["sm", "md", "lg"] as const;
const VALID_CELL_RADIUS = ["square", "rounded", "circle"] as const;
const VALID_LANGS = ["ko", "en"] as const;

function GithubContributionContent() {
  const sp = useWidgetParams();

  const username = sp.get("username") || "";
  const year = sp.get("year") || "last";
  const showTotal = sp.get("total") !== "false";
  const showUsername = sp.get("showUser") !== "false";

  const rawLang = sp.get("lang");
  const lang = VALID_LANGS.includes(rawLang as "ko" | "en")
    ? (rawLang as "ko" | "en")
    : "ko";

  const rawCellSize = sp.get("cellSize");
  const cellSize = VALID_CELL_SIZES.includes(rawCellSize as "sm" | "md" | "lg")
    ? (rawCellSize as "sm" | "md" | "lg")
    : "sm";

  const rawCellRadius = sp.get("cellRadius");
  const cellRadius = VALID_CELL_RADIUS.includes(rawCellRadius as "square" | "rounded" | "circle")
    ? (rawCellRadius as "square" | "rounded" | "circle")
    : "rounded";

  const color = parseHexColor(sp.get("color"), "22C55E");
  const textColor = parseHexColor(sp.get("textColor"), "");
  const rawBg = sp.get("bg") || "FFFFFF";
  const transparentBg = rawBg === "transparent";
  const bg = transparentBg ? "FFFFFF" : parseHexColor(rawBg, "FFFFFF");

  const borderRadius = parseBorderRadius(sp.get("radius"));
  const padding = parsePadding(sp.get("pad"));
  const fontSize = parseFontSize(sp.get("fsize"));

  return (
    <div className="w-screen h-screen bg-transparent">
      <GithubContributionPreview
        username={username}
        year={year}
        showTotal={showTotal}
        showUsername={showUsername}
        lang={lang}
        cellSize={cellSize}
        cellRadius={cellRadius}
        color={color}
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

export default function WidgetGithubContributionPage() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center">
          <p className="text-muted-foreground text-sm">로딩 중...</p>
        </div>
      }
    >
      <GithubContributionContent />
    </Suspense>
  );
}
