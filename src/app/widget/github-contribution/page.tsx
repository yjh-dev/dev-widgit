"use client";

import { useWidgetParams } from "@/lib/use-widget-params";
import {
  parseBorderRadius,
  parsePadding,
  parseFontSize,
  parseHexColor,
} from "@/lib/common-widget-options";
import GithubContributionPreview from "@/components/widget/GithubContributionPreview";
import WidgetPage, { WidgetScreen } from "@/components/widget/WidgetPage";
import { parseBgParam } from "@/lib/common-params";

const VALID_CELL_SIZES = ["sm", "md", "lg"] as const;
const VALID_CELL_RADIUS = ["square", "rounded", "circle"] as const;
const VALID_LANGS = ["ko", "en"] as const;

function GithubContributionContent() {
  const sp = useWidgetParams();

  const username = sp.get("username") || "";
  const year = sp.get("year") || "last";
  const showTotal = sp.get("total") !== "false";
  const showUsername = sp.get("showUser") !== "false";
  const showStreak = sp.get("streak") === "true";
  const showStats = sp.get("stats") === "true";

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
  const { bg, transparentBg } = parseBgParam(sp.get("bg"));

  const borderRadius = parseBorderRadius(sp.get("radius"));
  const padding = parsePadding(sp.get("pad"));
  const fontSize = parseFontSize(sp.get("fsize"));

  return (
    <WidgetScreen>
      <GithubContributionPreview
        username={username}
        year={year}
        showTotal={showTotal}
        showUsername={showUsername}
        showStreak={showStreak}
        showStats={showStats}
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
    </WidgetScreen>
  );
}

export default function WidgetGithubContributionPage() {
  return (
    <WidgetPage>
      <GithubContributionContent />
    </WidgetPage>
  );
}
