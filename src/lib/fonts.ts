import {
  Noto_Sans_KR,
  Jua,
  Do_Hyeon,
  Gothic_A1,
  Gaegu,
  Black_Han_Sans,
} from "next/font/google";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  display: "swap",
});

const jua = Jua({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jua",
  display: "swap",
});

const doHyeon = Do_Hyeon({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-do-hyeon",
  display: "swap",
});

const gothicA1 = Gothic_A1({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-gothic-a1",
  display: "swap",
});

const gaegu = Gaegu({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-gaegu",
  display: "swap",
});

const blackHanSans = Black_Han_Sans({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-black-han-sans",
  display: "swap",
});

export type FontKey =
  | "noto-sans-kr"
  | "jua"
  | "do-hyeon"
  | "gothic-a1"
  | "gaegu"
  | "black-han-sans";

export const fontMap: Record<FontKey, { className: string; variable: string }> =
  {
    "noto-sans-kr": {
      className: notoSansKr.className,
      variable: notoSansKr.variable,
    },
    jua: { className: jua.className, variable: jua.variable },
    "do-hyeon": { className: doHyeon.className, variable: doHyeon.variable },
    "gothic-a1": {
      className: gothicA1.className,
      variable: gothicA1.variable,
    },
    gaegu: { className: gaegu.className, variable: gaegu.variable },
    "black-han-sans": {
      className: blackHanSans.className,
      variable: blackHanSans.variable,
    },
  };

export const allFontVariables = Object.values(fontMap)
  .map((f) => f.variable)
  .join(" ");

export const FONT_OPTIONS: { value: FontKey; label: string }[] = [
  { value: "noto-sans-kr", label: "Noto Sans KR" },
  { value: "jua", label: "Jua" },
  { value: "do-hyeon", label: "Do Hyeon" },
  { value: "gothic-a1", label: "Gothic A1" },
  { value: "gaegu", label: "Gaegu" },
  { value: "black-han-sans", label: "Black Han Sans" },
];

const CSS_FAMILIES: Record<string, string> = {
  sans: "ui-sans-serif, system-ui, sans-serif",
  serif: "ui-serif, Georgia, serif",
  mono: "ui-monospace, SFMono-Regular, monospace",
  script: "'Segoe Script', 'Apple Chancery', cursive",
};

export function resolveFontStyle(key: string): { className?: string; fontFamily?: string } {
  if (key in fontMap) return { className: fontMap[key as FontKey].className };
  return { fontFamily: CSS_FAMILIES[key] ?? CSS_FAMILIES.sans };
}

export const CLOCK_FONT_OPTIONS: { value: string; label: string }[] = [
  { value: "mono", label: "Mono" },
  { value: "sans", label: "Sans (고딕)" },
  { value: "serif", label: "Serif (명조)" },
  ...FONT_OPTIONS,
];

export const QUOTE_FONT_OPTIONS_EXTENDED: { value: string; label: string }[] = [
  { value: "sans", label: "Sans (고딕)" },
  { value: "serif", label: "Serif (명조)" },
  { value: "script", label: "Script (필기)" },
  ...FONT_OPTIONS,
];

export const ALL_FONT_KEYS: string[] = [
  "sans", "serif", "mono", "script",
  ...Object.keys(fontMap),
];
