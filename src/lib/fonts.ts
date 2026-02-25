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
