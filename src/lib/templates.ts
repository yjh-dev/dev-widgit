export type WidgetType =
  | "dday" | "life-calendar" | "time-progress" | "clock" | "quote"
  | "pomodoro" | "mini-calendar" | "analog-clock" | "counter" | "weather"
  | "reading" | "habit" | "timeline" | "banner"
  | "bookmark" | "goal" | "stopwatch" | "music"
  | "gradient" | "sticky-note" | "flip-clock" | "moon-phase" | "dice" | "qr-code"
  | "typewriter"
  | "todo"
  | "github-contribution"
  | "profile-card"
  | "link-tree"
  | "breathing"
  | "world-clock"
  | "countdown"
  | "stats-card"
  | "color-palette"
  | "divider"
  | "timetable"
  | "flashcard"
  | "water-tracker"
  | "image-card"
  | "currency"
  | "age-calculator"
  | "radar-chart"
  | "pie-chart"
  | "stepper"
  | "battery"
  | "testimonial"
  | "emoji-rain"
  | "changelog"
  | "matrix"
  | "multi-progress"
  | "badge";

// --- Color Theme System ---

export interface ColorTheme {
  id: string;
  name: string;
  bg: string;
  text: string;
  accent: string;
  secondary: string;
}

export const colorThemes: ColorTheme[] = [
  { id: "light-default", name: "라이트 기본", bg: "FFFFFF", text: "1E1E1E", accent: "2563EB", secondary: "22C55E" },
  { id: "dark-night", name: "다크 나이트", bg: "1A1A2E", text: "E0E0E0", accent: "7C3AED", secondary: "06B6D4" },
  { id: "warm-pastel", name: "웜 파스텔", bg: "FFF7ED", text: "78350F", accent: "F97316", secondary: "FB923C" },
  { id: "cool-pastel", name: "쿨 파스텔", bg: "F0F9FF", text: "1E3A5F", accent: "3B82F6", secondary: "818CF8" },
  { id: "forest", name: "포레스트", bg: "F0FDF4", text: "14532D", accent: "16A34A", secondary: "22D3EE" },
  { id: "midnight", name: "미드나이트", bg: "0F172A", text: "F1F5F9", accent: "3B82F6", secondary: "F59E0B" },
  { id: "rose", name: "로제", bg: "FFF1F2", text: "881337", accent: "E11D48", secondary: "F472B6" },
  { id: "monochrome", name: "모노크롬", bg: "F5F5F5", text: "262626", accent: "525252", secondary: "A3A3A3" },
  { id: "sunset", name: "선셋", bg: "1C1917", text: "FEF3C7", accent: "F59E0B", secondary: "EF4444" },
  { id: "ocean", name: "오션", bg: "0C4A6E", text: "E0F2FE", accent: "06B6D4", secondary: "22D3EE" },
];

export function getThemeById(id: string): ColorTheme {
  return colorThemes.find((t) => t.id === id) ?? colorThemes[0];
}

export function applyThemeToWidget(
  type: WidgetType,
  theme: ColorTheme,
  config: Record<string, unknown> = {},
): Record<string, unknown> {
  const base = { borderRadius: 16, padding: 24, fontSize: "md" as const };

  switch (type) {
    case "dday":
      return { ...base, bgColor: theme.accent, textColor: "FFFFFF", ...config };
    case "clock":
      return { ...base, color: theme.text, bg: theme.bg, showSeconds: true, blink: true, ...config };
    case "analog-clock":
      return { ...base, padding: 16, faceColor: theme.bg, handColor: theme.text, secHandColor: theme.accent, tickColor: theme.secondary, borderColor: theme.text, bg: theme.bg, ...config };
    case "quote":
      return { ...base, textColor: theme.text, bg: theme.bg, ...config };
    case "pomodoro":
      return { ...base, color: theme.accent, bg: theme.bg, ...config };
    case "time-progress":
      return { ...base, color: theme.accent, bg: theme.bg, ...config };
    case "life-calendar":
      return { ...base, color: theme.accent, bg: theme.bg, ...config };
    case "mini-calendar":
      return { ...base, highlight: theme.accent, bg: theme.bg, ...config };
    case "counter":
      return { ...base, btnColor: theme.accent, bg: theme.bg, ...config };
    case "weather":
      return { ...base, bg: theme.bg, color: theme.text, ...config };
    case "reading":
      return { ...base, color: theme.accent, bg: theme.bg, textColor: theme.text, ...config };
    case "habit":
      return { ...base, color: theme.accent, bg: theme.bg, textColor: theme.text, interactive: false, ...config };
    case "timeline":
      return { ...base, color: theme.accent, bg: theme.bg, ...config };
    case "banner":
      return { ...base, color: theme.text, bg: theme.bg, ...config };
    case "bookmark":
      return { ...base, color: theme.text, bg: theme.bg, linkable: false, ...config };
    case "goal":
      return { ...base, color: theme.accent, bg: theme.bg, textColor: theme.text, ...config };
    case "stopwatch":
      return { ...base, btnColor: theme.accent, bg: theme.bg, color: theme.text, ...config };
    case "music":
      return { ...base, artColor: theme.accent, color: theme.text, bg: theme.bg, ...config };
    case "gradient":
      return { ...base, padding: 0, ...config };
    case "sticky-note":
      return { ...base, noteColor: theme.secondary, textColor: theme.text, ...config };
    case "flip-clock":
      return { ...base, flipColor: theme.text, textColor: theme.bg, gapColor: theme.secondary, bg: theme.bg, ...config };
    case "moon-phase":
      return { ...base, bg: "0F172A", textColor: "E0E0E0", ...config };
    case "dice":
      return { ...base, color: theme.accent, textColor: "FFFFFF", bg: theme.bg, ...config };
    case "qr-code":
      return { ...base, fgColor: theme.text, bgColor: theme.bg, ...config };
    case "typewriter":
      return { ...base, color: theme.text, bg: theme.bg, ...config };
    case "todo":
      return { ...base, color: theme.accent, bg: theme.bg, textColor: theme.text, ...config };
    case "github-contribution":
      return { ...base, color: theme.accent, bg: theme.bg, textColor: theme.text, ...config };
    case "profile-card":
      return { ...base, accentColor: theme.accent, color: theme.text, bg: theme.bg, ...config };
    case "link-tree":
      return { ...base, accentColor: theme.accent, color: theme.text, bg: theme.bg, ...config };
    case "breathing":
      return { ...base, accentColor: theme.accent, color: theme.text, bg: theme.bg, ...config };
    case "world-clock":
      return { ...base, color: theme.text, bg: theme.bg, ...config };
    case "countdown":
      return { ...base, accentColor: theme.accent, color: theme.text, bg: theme.bg, ...config };
    case "stats-card":
      return { ...base, accentColor: theme.accent, color: theme.text, bg: theme.bg, ...config };
    case "color-palette":
      return { ...base, color: theme.text, bg: theme.bg, ...config };
    case "divider":
      return { ...base, color: theme.secondary, bg: theme.bg, transparentBg: true, ...config };
    case "timetable":
      return { ...base, color: theme.text, bg: theme.bg, ...config };
    case "flashcard":
      return { ...base, accentColor: theme.accent, color: theme.text, bg: theme.bg, ...config };
    case "water-tracker":
      return { ...base, color: theme.accent, textColor: theme.text, bg: theme.bg, ...config };
    case "image-card":
      return { ...base, color: theme.text, bg: theme.bg, ...config };
    case "currency":
      return { ...base, accentColor: theme.accent, color: theme.text, bg: theme.bg, ...config };
    case "age-calculator":
      return { ...base, color: theme.accent, textColor: theme.text, bg: theme.bg, ...config };
    case "radar-chart":
      return { ...base, color: theme.accent, gridColor: theme.secondary, textColor: theme.text, bg: theme.bg, ...config };
    case "pie-chart":
      return { ...base, textColor: theme.text, bg: theme.bg, ...config };
    case "stepper":
      return { ...base, color: theme.accent, completedColor: theme.secondary, textColor: theme.text, bg: theme.bg, ...config };
    case "battery":
      return { ...base, color: theme.accent, textColor: theme.text, bg: theme.bg, ...config };
    case "testimonial":
      return { ...base, accentColor: theme.accent, textColor: theme.text, bg: theme.bg, ...config };
    case "emoji-rain":
      return { ...base, bg: theme.bg, transparentBg: true, ...config };
    case "changelog":
      return { ...base, accentColor: theme.accent, textColor: theme.text, bg: theme.bg, ...config };
    case "matrix":
      return { ...base, textColor: theme.text, bg: theme.bg, ...config };
    case "multi-progress":
      return { ...base, textColor: theme.text, bg: theme.bg, ...config };
    default:
      return { ...base, bg: theme.bg, color: theme.text, ...config };
  }
}

export function buildThemedWidgetUrl(
  type: WidgetType,
  theme: ColorTheme,
  config: Record<string, unknown> = {},
): string {
  const base = `/widget/${type}`;
  const params = new URLSearchParams();

  const addIfPresent = (key: string, val: unknown) => {
    if (val !== undefined && val !== null && val !== "") {
      params.set(key, String(val));
    }
  };

  switch (type) {
    case "dday":
      addIfPresent("title", config.title);
      addIfPresent("date", config.targetDate);
      addIfPresent("bg", config.bgColor ?? theme.accent);
      addIfPresent("text", config.textColor ?? "FFFFFF");
      if (config.showTime) addIfPresent("showTime", "true");
      break;
    case "clock":
      addIfPresent("timezone", config.timezone ?? "Asia/Seoul");
      addIfPresent("format", config.format ?? "24h");
      addIfPresent("font", config.font ?? "mono");
      addIfPresent("color", theme.text);
      addIfPresent("bg", theme.bg);
      if (config.showDate) addIfPresent("date", "true");
      if (config.seconds === false) addIfPresent("seconds", "false");
      break;
    case "analog-clock":
      addIfPresent("timezone", config.timezone ?? "Asia/Seoul");
      addIfPresent("faceColor", theme.bg);
      addIfPresent("handColor", theme.text);
      addIfPresent("secHandColor", theme.accent);
      addIfPresent("tickColor", theme.secondary);
      addIfPresent("borderColor", theme.text);
      if (config.showNumbers !== undefined) addIfPresent("showNumbers", String(config.showNumbers));
      if (config.numStyle) addIfPresent("numStyle", config.numStyle);
      break;
    case "quote":
      addIfPresent("text", config.text);
      addIfPresent("author", config.author);
      addIfPresent("font", config.font ?? "serif");
      addIfPresent("textColor", theme.text);
      addIfPresent("bg", theme.bg);
      if (config.italic) addIfPresent("italic", "true");
      break;
    case "pomodoro":
      addIfPresent("work", config.workTime ?? 25);
      addIfPresent("break", config.breakTime ?? 5);
      addIfPresent("color", theme.accent);
      addIfPresent("bg", theme.bg);
      if (config.pStyle) addIfPresent("pStyle", config.pStyle);
      break;
    case "time-progress":
      addIfPresent("type", config.type ?? "year");
      addIfPresent("color", theme.accent);
      addIfPresent("bg", theme.bg);
      if (config.style) addIfPresent("style", config.style);
      break;
    case "life-calendar":
      addIfPresent("birthdate", config.birthdate ?? "2000-01-01");
      addIfPresent("lifespan", config.lifespan ?? 80);
      addIfPresent("color", theme.accent);
      addIfPresent("bg", theme.bg);
      if (config.shape) addIfPresent("shape", config.shape);
      break;
    case "mini-calendar":
      addIfPresent("weekStart", config.weekStart ?? "mon");
      addIfPresent("lang", config.lang ?? "ko");
      addIfPresent("highlight", theme.accent);
      addIfPresent("bg", theme.bg);
      break;
    case "counter":
      addIfPresent("label", config.label ?? "카운터");
      addIfPresent("initial", config.initial ?? 0);
      addIfPresent("step", config.step ?? 1);
      addIfPresent("btnColor", theme.accent);
      addIfPresent("bg", theme.bg);
      break;
    case "weather":
      addIfPresent("lat", config.lat ?? 37.5665);
      addIfPresent("lon", config.lon ?? 126.978);
      addIfPresent("city", config.city ?? "서울");
      addIfPresent("bg", theme.bg);
      break;
    case "reading":
      addIfPresent("title", config.title);
      addIfPresent("current", config.currentPage);
      addIfPresent("total", config.totalPages);
      addIfPresent("color", theme.accent);
      addIfPresent("bg", theme.bg);
      break;
    case "habit":
      addIfPresent("title", config.title);
      addIfPresent("view", config.view ?? "week");
      addIfPresent("weekStart", config.weekStart ?? "mon");
      addIfPresent("color", theme.accent);
      addIfPresent("bg", theme.bg);
      break;
    case "timeline": {
      const events = config.events as { title: string; date: string }[] | undefined;
      if (events?.length) {
        params.set("events", events.map((e) => `${e.title}~${e.date}`).join("|"));
      }
      addIfPresent("color", theme.accent);
      addIfPresent("bg", theme.bg);
      break;
    }
    case "banner": {
      const texts = config.texts as string[] | undefined;
      if (texts?.length) {
        params.set("texts", texts.join("|"));
      }
      if (config.animation && config.animation !== "none") addIfPresent("anim", config.animation);
      if (config.bold) addIfPresent("bold", "true");
      addIfPresent("color", theme.text);
      addIfPresent("bg", theme.bg);
      if (config.font && config.font !== "sans") addIfPresent("font", config.font);
      break;
    }
    case "bookmark":
      addIfPresent("url", config.url);
      addIfPresent("title", config.title);
      addIfPresent("desc", config.desc);
      addIfPresent("bg", theme.bg);
      break;
    case "goal":
      addIfPresent("title", config.title);
      addIfPresent("current", config.current);
      addIfPresent("target", config.target);
      if (config.unit) addIfPresent("unit", config.unit);
      if (config.style) addIfPresent("style", config.style);
      addIfPresent("color", theme.accent);
      addIfPresent("bg", theme.bg);
      break;
    case "stopwatch":
      if (config.showMs) addIfPresent("showMs", "true");
      if (config.showLap) addIfPresent("showLap", "true");
      addIfPresent("btnColor", theme.accent);
      addIfPresent("bg", theme.bg);
      break;
    case "music":
      addIfPresent("title", config.title);
      addIfPresent("artist", config.artist);
      if (config.progress !== undefined) addIfPresent("progress", config.progress);
      addIfPresent("artColor", theme.accent);
      addIfPresent("bg", theme.bg);
      break;
    case "gradient": {
      const colors = config.colors as string[] | undefined;
      if (colors?.length) params.set("colors", colors.join("|"));
      if (config.dir !== undefined) addIfPresent("dir", config.dir);
      if (config.animate) addIfPresent("animate", "true");
      if (config.text) addIfPresent("text", config.text);
      break;
    }
    case "sticky-note":
      addIfPresent("text", config.text);
      addIfPresent("noteColor", config.noteColor ?? theme.secondary);
      addIfPresent("textColor", config.textColor ?? theme.text);
      if (config.font) addIfPresent("font", config.font);
      break;
    case "flip-clock":
      addIfPresent("timezone", config.timezone ?? "Asia/Seoul");
      addIfPresent("flipColor", config.flipColor ?? theme.text);
      addIfPresent("textColor", config.textColor ?? theme.bg);
      addIfPresent("bg", theme.bg);
      if (config.showSeconds) addIfPresent("showSeconds", "true");
      if (config.showDate) addIfPresent("showDate", "true");
      break;
    case "moon-phase":
      addIfPresent("bg", config.bg ?? "0F172A");
      addIfPresent("textColor", config.textColor ?? "E0E0E0");
      if (config.style) addIfPresent("style", config.style);
      break;
    case "dice":
      addIfPresent("color", config.color ?? theme.accent);
      addIfPresent("bg", theme.bg);
      if (config.mode) addIfPresent("mode", config.mode);
      if (config.sides) addIfPresent("sides", config.sides);
      break;
    case "qr-code":
      addIfPresent("data", config.data);
      if (config.label) addIfPresent("label", config.label);
      addIfPresent("fgColor", config.fgColor ?? theme.text);
      addIfPresent("bgColor", config.bgColor ?? theme.bg);
      break;
    case "typewriter": {
      const twTexts = config.texts as string[] | undefined;
      if (twTexts?.length) {
        params.set("texts", twTexts.map(encodeURIComponent).join("|"));
      }
      if (config.speed && config.speed !== 80) addIfPresent("speed", config.speed);
      if (config.pause && config.pause !== 2000) addIfPresent("pause", config.pause);
      if (config.cursor && config.cursor !== "bar") addIfPresent("cursor", config.cursor);
      if (config.loop === false) addIfPresent("loop", "false");
      if (config.deleteAnim === false) addIfPresent("deleteAnim", "false");
      if (config.bold) addIfPresent("bold", "true");
      addIfPresent("text", theme.text);
      addIfPresent("bg", theme.bg);
      if (config.font && config.font !== "sans") addIfPresent("font", config.font);
      break;
    }
    case "todo":
      if (config.title) addIfPresent("title", config.title);
      if (config.items) addIfPresent("items", config.items);
      addIfPresent("color", config.color ?? theme.accent);
      addIfPresent("textColor", config.textColor ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "github-contribution":
      if (config.username) addIfPresent("username", config.username);
      addIfPresent("color", config.color ?? theme.accent);
      addIfPresent("textColor", config.textColor ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "profile-card":
      if (config.name) addIfPresent("name", config.name);
      if (config.bio) addIfPresent("bio", config.bio);
      if (config.avatar) addIfPresent("avatar", config.avatar);
      addIfPresent("accent", config.accentColor ?? theme.accent);
      addIfPresent("color", config.color ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "link-tree":
      if (config.title) addIfPresent("title", config.title);
      addIfPresent("accent", config.accentColor ?? theme.accent);
      addIfPresent("color", config.color ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      if (config.style) addIfPresent("style", config.style);
      break;
    case "breathing":
      if (config.tech && config.tech !== "478") addIfPresent("tech", config.tech);
      addIfPresent("accent", config.accentColor ?? theme.accent);
      addIfPresent("color", config.color ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "world-clock":
      addIfPresent("color", config.color ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "countdown":
      addIfPresent("accent", config.accentColor ?? theme.accent);
      addIfPresent("color", config.color ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "stats-card":
      addIfPresent("accent", config.accentColor ?? theme.accent);
      addIfPresent("color", config.color ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "color-palette":
      addIfPresent("color", config.color ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "divider":
      addIfPresent("color", config.color ?? theme.secondary);
      break;
    case "timetable":
      addIfPresent("color", config.color ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "flashcard":
      addIfPresent("accent", config.accentColor ?? theme.accent);
      addIfPresent("color", config.color ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "water-tracker":
      addIfPresent("color", config.color ?? theme.accent);
      addIfPresent("textColor", config.textColor ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "image-card":
      addIfPresent("color", config.color ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "currency":
      addIfPresent("accent", config.accentColor ?? theme.accent);
      addIfPresent("color", config.color ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "age-calculator":
      addIfPresent("birthdate", config.birthdate ?? "1995-01-01");
      addIfPresent("color", config.color ?? theme.accent);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "radar-chart":
      addIfPresent("color", config.color ?? theme.accent);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "pie-chart":
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "stepper":
      addIfPresent("color", config.color ?? theme.accent);
      addIfPresent("completedColor", config.completedColor ?? theme.secondary);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "battery":
      addIfPresent("level", config.level ?? 75);
      addIfPresent("color", config.color ?? theme.accent);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "testimonial":
      addIfPresent("quote", config.quote);
      addIfPresent("author", config.author);
      addIfPresent("accent", config.accentColor ?? theme.accent);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "emoji-rain":
      addIfPresent("emojis", config.emojis);
      break;
    case "changelog":
      addIfPresent("accent", config.accentColor ?? theme.accent);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "matrix":
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
    case "multi-progress":
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
  }

  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

// --- Template Types ---

export interface TemplateWidget {
  type: WidgetType;
  name: string;
  widgetConfig: Record<string, unknown>;
}

export interface Template {
  id: string;
  title: string;
  desc: string;
  themeId: string;
  layout: number[][];
  widgets: TemplateWidget[];
  notionTip: string;
}

// --- Layout Presets ---

export interface LayoutPreset {
  id: string;
  name: string;
  desc: string;
  slots: number;
  grid: number[][];
}

export const layoutPresets: LayoutPreset[] = [
  { id: "single", name: "1열 스택", desc: "세로 나열", slots: 3, grid: [[1], [1], [1]] },
  { id: "two-col", name: "2열 균등", desc: "나란히 2개", slots: 2, grid: [[1, 1]] },
  { id: "three-col", name: "3열 균등", desc: "나란히 3개", slots: 3, grid: [[1, 1, 1]] },
  { id: "header-two", name: "헤더 + 2열", desc: "전폭 헤더 아래 2열", slots: 3, grid: [[1], [1, 1]] },
  { id: "two-footer", name: "2열 + 전폭", desc: "2열 아래 전폭 푸터", slots: 3, grid: [[1, 1], [1]] },
  { id: "grid-2x2", name: "2×2 그리드", desc: "정사각 그리드", slots: 4, grid: [[1, 1], [1, 1]] },
  { id: "header-three", name: "헤더 + 3열", desc: "전폭 + 3열", slots: 4, grid: [[1], [1, 1, 1]] },
  { id: "sandwich", name: "샌드위치", desc: "전폭+2열+전폭", slots: 4, grid: [[1], [1, 1], [1]] },
  { id: "dashboard", name: "대시보드", desc: "2+2+1", slots: 5, grid: [[1, 1], [1, 1], [1]] },
];

// --- Widget Defaults (for builder) ---

export interface WidgetDefault {
  type: WidgetType;
  name: string;
  defaultUrl: string;
}

export const widgetDefaults: WidgetDefault[] = [
  { type: "dday", name: "D-Day 위젯", defaultUrl: "/widget/dday?title=D-Day&date=2026-12-31&bg=1E1E1E&text=FFFFFF" },
  { type: "clock", name: "미니멀 시계", defaultUrl: "/widget/clock?timezone=Asia/Seoul&format=24h&font=mono" },
  { type: "analog-clock", name: "아날로그 시계", defaultUrl: "/widget/analog-clock?timezone=Asia/Seoul" },
  { type: "mini-calendar", name: "미니 캘린더", defaultUrl: "/widget/mini-calendar?weekStart=mon&lang=ko" },
  { type: "timeline", name: "타임라인", defaultUrl: "/widget/timeline?events=일정1~2026-06-01|일정2~2026-09-01&color=2563EB" },
  { type: "time-progress", name: "시간 진행률 바", defaultUrl: "/widget/time-progress?type=year&color=2563EB" },
  { type: "life-calendar", name: "인생 달력", defaultUrl: "/widget/life-calendar?birthdate=2000-01-01&lifespan=80&color=22C55E" },
  { type: "reading", name: "읽기 진행률", defaultUrl: "/widget/reading?title=책+제목&current=50&total=300&color=2563EB" },
  { type: "goal", name: "목표 진행률", defaultUrl: "/widget/goal?title=목표&current=30&target=100&color=22C55E" },
  { type: "pomodoro", name: "뽀모도로 타이머", defaultUrl: "/widget/pomodoro?work=25&break=5&color=E11D48" },
  { type: "stopwatch", name: "스톱워치", defaultUrl: "/widget/stopwatch?btnColor=2563EB" },
  { type: "counter", name: "카운터", defaultUrl: "/widget/counter?label=카운터&initial=0&step=1&btnColor=2563EB" },
  { type: "habit", name: "습관 트래커", defaultUrl: "/widget/habit?title=습관&view=week&color=22C55E" },
  { type: "quote", name: "명언 카드", defaultUrl: "/widget/quote?text=오늘도+화이팅&author=작자미상&font=serif" },
  { type: "banner", name: "텍스트 배너", defaultUrl: "/widget/banner?texts=텍스트를+입력하세요&bold=true" },
  { type: "bookmark", name: "북마크", defaultUrl: "/widget/bookmark?url=https://example.com&title=북마크&desc=설명" },
  { type: "music", name: "음악 플레이어", defaultUrl: "/widget/music?title=Song&artist=Artist&artColor=6366F1" },
  { type: "weather", name: "날씨", defaultUrl: "/widget/weather?lat=37.5665&lon=126.978&city=서울" },
  { type: "gradient", name: "그라데이션", defaultUrl: "/widget/gradient?colors=6366F1|EC4899" },
  { type: "sticky-note", name: "메모지", defaultUrl: "/widget/sticky-note?text=메모를+입력하세요" },
  { type: "flip-clock", name: "플립 시계", defaultUrl: "/widget/flip-clock?timezone=Asia/Seoul" },
  { type: "moon-phase", name: "달 위상", defaultUrl: "/widget/moon-phase" },
  { type: "dice", name: "주사위", defaultUrl: "/widget/dice?color=2563EB" },
  { type: "qr-code", name: "QR 코드", defaultUrl: "/widget/qr-code?data=https://example.com" },
  { type: "typewriter", name: "타이핑 효과", defaultUrl: "/widget/typewriter?texts=%ED%83%80%EC%9D%B4%ED%95%91+%ED%9A%A8%EA%B3%BC+%EC%9C%84%EC%A0%AF" },
  { type: "github-contribution", name: "GitHub 잔디", defaultUrl: "/widget/github-contribution?color=22C55E" },
  { type: "profile-card", name: "프로필 카드", defaultUrl: "/widget/profile-card?name=홍길동&bio=Hello" },
  { type: "link-tree", name: "링크 트리", defaultUrl: "/widget/link-tree?title=내+링크" },
  { type: "breathing", name: "호흡 타이머", defaultUrl: "/widget/breathing" },
  { type: "world-clock", name: "세계 시계", defaultUrl: "/widget/world-clock" },
  { type: "countdown", name: "카운트다운 타이머", defaultUrl: "/widget/countdown?min=5" },
  { type: "stats-card", name: "통계 카드", defaultUrl: "/widget/stats-card" },
  { type: "color-palette", name: "컬러 팔레트", defaultUrl: "/widget/color-palette" },
  { type: "divider", name: "구분선", defaultUrl: "/widget/divider" },
  { type: "timetable", name: "시간표", defaultUrl: "/widget/timetable" },
  { type: "flashcard", name: "플래시카드", defaultUrl: "/widget/flashcard" },
  { type: "water-tracker", name: "물 마시기 트래커", defaultUrl: "/widget/water-tracker" },
  { type: "image-card", name: "이미지 카드", defaultUrl: "/widget/image-card" },
  { type: "currency", name: "환율", defaultUrl: "/widget/currency" },
  { type: "age-calculator", name: "나이 계산기", defaultUrl: "/widget/age-calculator?birthdate=1995-01-01" },
  { type: "radar-chart", name: "레이더 차트", defaultUrl: "/widget/radar-chart" },
  { type: "pie-chart", name: "도넛 차트", defaultUrl: "/widget/pie-chart" },
  { type: "stepper", name: "단계 진행", defaultUrl: "/widget/stepper" },
  { type: "battery", name: "배터리", defaultUrl: "/widget/battery?level=75" },
  { type: "testimonial", name: "후기 카드", defaultUrl: "/widget/testimonial" },
  { type: "emoji-rain", name: "이모지 비", defaultUrl: "/widget/emoji-rain" },
  { type: "changelog", name: "변경 로그", defaultUrl: "/widget/changelog" },
  { type: "matrix", name: "매트릭스", defaultUrl: "/widget/matrix" },
  { type: "multi-progress", name: "멀티 프로그레스", defaultUrl: "/widget/multi-progress" },
];

// --- Home thumbnail default props ---

export function getHomeThumbnailProps(type: WidgetType): Record<string, unknown> {
  const common = { borderRadius: 0, fontSize: "sm" as const };
  switch (type) {
    case "dday":
      return { ...common, title: "수능", targetDate: "2026-11-19", bgColor: "1E1E1E", textColor: "FFFFFF", padding: 24 };
    case "life-calendar":
      return { ...common, birthdate: "2000-01-01", lifespan: 80, color: "2563EB", bg: "FFFFFF", showStats: false, padding: 12, cellSize: "sm" };
    case "time-progress":
      return { ...common, type: "year", color: "2563EB", bg: "FFFFFF", padding: 24 };
    case "clock":
      return { ...common, timezone: "Asia/Seoul", format: "24h", font: "mono", color: "1E1E1E", bg: "FFFFFF", padding: 24, showSeconds: false, blink: false };
    case "quote":
      return { ...common, text: "오늘이 가장 젊은 날이다", author: "작자미상", font: "serif", textColor: "1E1E1E", bg: "FFFFFF", padding: 24 };
    case "pomodoro":
      return { ...common, workTime: 25, breakTime: 5, color: "E11D48", bg: "FFFFFF", padding: 16 };
    case "mini-calendar":
      return { ...common, weekStart: "mon", lang: "ko", color: "1E1E1E", highlight: "2563EB", bg: "FFFFFF", padding: 12, showNav: false };
    case "analog-clock":
      return { ...common, timezone: "Asia/Seoul", bg: "FFFFFF", padding: 12 };
    case "counter":
      return { ...common, label: "카운터", initial: 42, color: "1E1E1E", btnColor: "2563EB", bg: "FFFFFF", padding: 16, showReset: false };
    case "weather":
      return { ...common, city: "서울", bg: "FFFFFF", padding: 24 };
    case "reading":
      return { ...common, title: "클린 코드", currentPage: 180, totalPages: 300, color: "2563EB", bg: "FFFFFF", padding: 24 };
    case "habit":
      return { ...common, title: "운동", view: "week", weekStart: "mon", checkedDates: new Set(["2026-02-23", "2026-02-24", "2026-02-25"]), interactive: false, color: "22C55E", bg: "FFFFFF", padding: 16 };
    case "timeline":
      return { ...common, events: [{ title: "기말고사", date: "2026-06-15" }, { title: "여름방학", date: "2026-07-20" }, { title: "수능", date: "2026-11-19" }], color: "2563EB", bg: "FFFFFF", padding: 16 };
    case "banner":
      return { ...common, texts: ["오늘도 화이팅! 💪"], animation: "none", bold: true, color: "1E1E1E", bg: "FFFFFF", padding: 24, fontSize: "md" };
    case "bookmark":
      return { ...common, url: "https://github.com", title: "GitHub", desc: "내 깃허브 프로필", color: "1E1E1E", bg: "FFFFFF", padding: 24, linkable: false };
    case "goal":
      return { ...common, title: "저축 목표", current: 35, target: 100, unit: "만원", color: "22C55E", bg: "FFFFFF", padding: 24 };
    case "stopwatch":
      return { ...common, color: "1E1E1E", btnColor: "2563EB", bg: "FFFFFF", padding: 16 };
    case "music":
      return { ...common, title: "Chill Beats", artist: "Lo-Fi Radio", progress: 45, artColor: "6366F1", color: "1E1E1E", bg: "FFFFFF", padding: 16 };
    case "gradient":
      return { ...common, colors: ["6366F1", "EC4899"], dir: 135, type: "linear", padding: 0 };
    case "sticky-note":
      return { ...common, text: "오늘 할 일\n1. 독서\n2. 운동", noteColor: "FBBF24", textColor: "1E1E1E", pin: "pin", rotation: 2, font: "gaegu", padding: 16, shadow: true };
    case "flip-clock":
      return { ...common, timezone: "Asia/Seoul", format: "24h", flipColor: "1E1E1E", textColor: "FFFFFF", gapColor: "333333", bg: "FFFFFF", padding: 16 };
    case "moon-phase":
      return { ...common, style: "realistic", showName: true, showPercent: true, moonColor: "F5F5DC", shadowColor: "1A1A2E", bg: "0F172A", textColor: "E0E0E0", moonSize: "sm", padding: 16 };
    case "dice":
      return { ...common, mode: "dice", count: 1, sides: 6, color: "2563EB", textColor: "FFFFFF", bg: "FFFFFF", padding: 16 };
    case "qr-code":
      return { ...common, data: "https://widgit.dev", fgColor: "1E1E1E", bgColor: "FFFFFF", size: "sm", padding: 16 };
    case "typewriter":
      return { ...common, texts: ["타이핑 효과 위젯"], speed: 80, pause: 2000, cursor: "bar", bold: true, color: "1E1E1E", bg: "FFFFFF", padding: 24, fontSize: "md" };
    case "todo":
      return { ...common, title: "오늘 할 일", initialItems: [{ id: "t1", text: "기획서 작성", done: true }, { id: "t2", text: "디자인 리뷰", done: false }, { id: "t3", text: "코드 리뷰", done: false }], interactive: false, color: "2563EB", bg: "FFFFFF", showProgress: true, strikethrough: true, padding: 16 };
    case "github-contribution":
      return { ...common, username: "", year: "last", showTotal: true, showUsername: false, lang: "ko", cellSize: "sm", cellRadius: "rounded", color: "22C55E", bg: "FFFFFF", textColor: "1E1E1E", padding: 12 };
    case "profile-card":
      return { ...common, name: "홍길동", bio: "Frontend Developer", layout: "vertical", avatarShape: "circle", accentColor: "2563EB", color: "1E1E1E", bg: "FFFFFF", padding: 16 };
    case "link-tree":
      return { ...common, title: "내 링크", links: [{ id: "s1", title: "GitHub", url: "https://github.com", icon: "" }, { id: "s2", title: "블로그", url: "https://blog.example.com", icon: "" }], linkStyle: "filled", accentColor: "2563EB", color: "1E1E1E", bg: "FFFFFF", padding: 16, linkable: false };
    case "breathing":
      return { ...common, inhale: 4, hold1: 7, exhale: 8, hold2: 0, rounds: 3, accentColor: "06B6D4", color: "1E1E1E", bg: "FFFFFF", padding: 16 };
    case "world-clock":
      return { ...common, zones: ["Asia/Seoul", "America/New_York"], format: "24h", showLabel: true, showSeconds: false, color: "1E1E1E", bg: "FFFFFF", padding: 16 };
    case "countdown":
      return { ...common, minutes: 5, seconds: 0, accentColor: "E11D48", color: "1E1E1E", bg: "FFFFFF", padding: 16 };
    case "stats-card":
      return { ...common, stats: [{ label: "방문자", value: "1,234", trend: "up", trendValue: "+12%" }], layout: "row", accentColor: "2563EB", color: "1E1E1E", bg: "FFFFFF", padding: 16 };
    case "color-palette":
      return { ...common, colors: ["2563EB", "7C3AED", "EC4899", "F59E0B"], layout: "horizontal", showHex: true, color: "1E1E1E", bg: "FFFFFF", padding: 16 };
    case "divider":
      return { ...common, style: "wave", weight: "medium", color: "D4D4D8", transparentBg: true, padding: 8 };
    case "timetable":
      return { ...common, entries: [], startHour: 9, endHour: 17, lang: "ko", color: "1E1E1E", bg: "FFFFFF", padding: 12 };
    case "flashcard":
      return { ...common, accentColor: "7C3AED", color: "1E1E1E", bg: "FFFFFF", padding: 16 };
    case "water-tracker":
      return { ...common, goal: 8, glassSize: 250, color: "3B82F6", textColor: "1E1E1E", bg: "FFFFFF", padding: 16 };
    case "image-card":
      return { ...common, fit: "cover", captionPos: "bottom", color: "1E1E1E", bg: "FFFFFF", padding: 16 };
    case "currency":
      return { ...common, base: "USD", targets: ["KRW", "JPY"], accentColor: "2563EB", color: "1E1E1E", bg: "FFFFFF", padding: 16 };
    case "age-calculator":
      return { ...common, birthdate: "1995-01-01", showTime: true, style: "full", color: "2563EB", bg: "FFFFFF", padding: 24 };
    case "radar-chart":
      return { ...common, items: [{ label: "코딩", value: 80 }, { label: "디자인", value: 60 }, { label: "기획", value: 70 }, { label: "소통", value: 85 }, { label: "리더십", value: 65 }], color: "6366F1", gridColor: "E5E7EB", bg: "FFFFFF", padding: 16 };
    case "pie-chart":
      return { ...common, slices: [{ label: "A", value: 40, color: "6366F1" }, { label: "B", value: 30, color: "EC4899" }, { label: "C", value: 20, color: "F59E0B" }, { label: "D", value: 10, color: "22C55E" }], style: "donut", bg: "FFFFFF", padding: 16 };
    case "stepper":
      return { ...common, steps: [{ label: "기획" }, { label: "디자인" }, { label: "개발" }, { label: "배포" }], currentStep: 1, color: "2563EB", completedColor: "22C55E", bg: "FFFFFF", padding: 16 };
    case "battery":
      return { ...common, level: 75, showPercent: true, autoColor: true, bg: "FFFFFF", padding: 24 };
    case "testimonial":
      return { ...common, quote: "이 서비스 정말 좋습니다!", author: "김지수", role: "PM", layout: "card", accentColor: "6366F1", bg: "FFFFFF", padding: 16 };
    case "emoji-rain":
      return { ...common, emojis: "🎉🎊✨💖🌟", speed: "normal", density: "normal", transparentBg: true, padding: 0 };
    case "changelog":
      return { ...common, entries: [{ version: "v2.0", date: "2026-02-15", desc: "다크 모드 추가" }, { version: "v1.0", date: "2025-12-01", desc: "첫 출시" }], accentColor: "6366F1", bg: "FFFFFF", padding: 16 };
    case "matrix":
      return { ...common, items: [{ text: "프로젝트 마감", quadrant: 0 }, { text: "운동 계획", quadrant: 1 }, { text: "이메일", quadrant: 2 }, { text: "SNS", quadrant: 3 }], bg: "FFFFFF", padding: 12 };
    case "multi-progress":
      return { ...common, items: [{ label: "프론트엔드", value: 80, max: 100, color: "6366F1" }, { label: "백엔드", value: 65, max: 100, color: "EC4899" }, { label: "디자인", value: 90, max: 100, color: "22C55E" }], bg: "FFFFFF", padding: 16 };
    default:
      return common;
  }
}

// --- 8 Templates (theme-differentiated) ---

export const templates: Template[] = [
  {
    id: "student",
    title: "학생 대시보드",
    desc: "수능/시험 D-Day + 공부 타이머 + 진행률 관리를 한 곳에",
    themeId: "cool-pastel",
    layout: [[0, 4], [1, 2], [3, 5]],
    notionTip: "D-Day를 상단 좌측에 크게, 아래에 타이머와 진행률을 2열로 배치하세요.",
    widgets: [
      { type: "dday", name: "수능 D-Day", widgetConfig: { title: "수능", targetDate: "2026-11-19" } },
      { type: "pomodoro", name: "뽀모도로 타이머", widgetConfig: { workTime: 25, breakTime: 5 } },
      { type: "time-progress", name: "올해 진행률", widgetConfig: { type: "year" } },
      { type: "habit", name: "공부 습관", widgetConfig: { title: "공부", view: "week", weekStart: "mon", checkedDates: new Set(["2026-02-23", "2026-02-24", "2026-02-26"]) } },
      { type: "mini-calendar", name: "학사 캘린더", widgetConfig: { weekStart: "mon", lang: "ko" } },
      { type: "timeline", name: "시험 일정", widgetConfig: { events: [{ title: "중간고사", date: "2026-04-20" }, { title: "기말고사", date: "2026-06-25" }, { title: "수능", date: "2026-11-19" }] } },
    ],
  },
  {
    id: "minimal",
    title: "미니멀 워크스페이스",
    desc: "깔끔한 노션 헤더를 위한 시계 + 날씨 + 명언 세트",
    themeId: "monochrome",
    layout: [[0, 1, 2], [4], [3]],
    notionTip: "3열로 나란히 배치하면 깔끔한 헤더가 됩니다. 그라데이션 구분선 아래 배너를 전폭으로 추가하세요.",
    widgets: [
      { type: "clock", name: "모노 시계", widgetConfig: { timezone: "Asia/Seoul", format: "24h", font: "mono" } },
      { type: "weather", name: "서울 날씨", widgetConfig: { city: "서울" } },
      { type: "quote", name: "명언 카드", widgetConfig: { text: "오늘이 가장 젊은 날이다", author: "작자미상", font: "serif" } },
      { type: "banner", name: "모노 배너", widgetConfig: { texts: ["Keep it simple."], bold: true, animation: "none" } },
      { type: "gradient", name: "그라데이션 구분선", widgetConfig: { colors: ["D4D4D8", "A1A1AA"], dir: 90 } },
    ],
  },
  {
    id: "reading",
    title: "독서 & 배움",
    desc: "읽기 목표 추적 + 독서 계획 타임라인으로 독서 습관 만들기",
    themeId: "warm-pastel",
    layout: [[4], [0, 1], [2, 3]],
    notionTip: "배너를 전폭 상단에, 읽기 진행률과 목표를 2열로 배치하세요.",
    widgets: [
      { type: "reading", name: "읽기 진행률", widgetConfig: { title: "클린 코드", currentPage: 180, totalPages: 300 } },
      { type: "goal", name: "올해 독서 목표", widgetConfig: { title: "올해 독서", current: 8, target: 24, unit: "권" } },
      { type: "quote", name: "독서 명언", widgetConfig: { text: "책은 도끼날 수 있는 꿈이다", author: "닐 게이먼", font: "serif" } },
      { type: "counter", name: "완독 카운터", widgetConfig: { label: "완독", initial: 0, step: 1 } },
      { type: "banner", name: "독서 격려 배너", widgetConfig: { texts: ["오늘도 한 페이지 더"], animation: "scroll", bold: true } },
    ],
  },
  {
    id: "dark-productivity",
    title: "다크 생산성",
    desc: "어두운 테마로 집중력을 높이는 생산성 대시보드",
    themeId: "midnight",
    layout: [[0, 1], [2, 3], [4]],
    notionTip: "노션을 다크모드로 설정하면 위젯과 조화롭습니다. 시계와 타이머를 상단에 배치하세요.",
    widgets: [
      { type: "flip-clock", name: "플립 시계", widgetConfig: { timezone: "Asia/Seoul", showDate: true, flipColor: "E0E0E0", textColor: "0F172A", gapColor: "94A3B8" } },
      { type: "pomodoro", name: "뽀모도로", widgetConfig: { workTime: 25, breakTime: 5, pStyle: "ring" } },
      { type: "stopwatch", name: "스톱워치", widgetConfig: { showMs: true, showLap: true } },
      { type: "time-progress", name: "하루 진행률", widgetConfig: { type: "day", style: "ring" } },
      { type: "counter", name: "집중 카운터", widgetConfig: { label: "집중 세션", initial: 0, step: 1 } },
    ],
  },
  {
    id: "aesthetic",
    title: "감성 꾸미기",
    desc: "노션 페이지를 예쁘게 꾸미는 로제 감성 위젯 모음",
    themeId: "rose",
    layout: [[5], [0], [1, 3], [4, 6], [2]],
    notionTip: "그라데이션 헤더를 최상단에, 배너와 음악+시계를 중간에, 메모지와 명언을 함께 배치하세요.",
    widgets: [
      { type: "banner", name: "감성 배너", widgetConfig: { texts: ["오늘도 화이팅!"], animation: "fade", bold: true } },
      { type: "music", name: "음악 플레이어", widgetConfig: { title: "Spring Day", artist: "Lo-Fi Chill", progress: 42 } },
      { type: "bookmark", name: "북마크 카드", widgetConfig: { url: "https://github.com", title: "GitHub", desc: "내 깃허브 프로필" } },
      { type: "analog-clock", name: "아날로그 시계", widgetConfig: { timezone: "Asia/Seoul", showNumbers: true, numStyle: "quarter" } },
      { type: "quote", name: "감성 명언", widgetConfig: { text: "꽃이 지고 나서야 봄인 줄 안다", author: "이해인", font: "serif", italic: true } },
      { type: "gradient", name: "그라데이션 헤더", widgetConfig: { colors: ["EC4899", "F472B6", "FB923C"], dir: 135, animate: false } },
      { type: "sticky-note", name: "메모지", widgetConfig: { text: "오늘의 기분 💭", noteColor: "F9A8D4", pin: "tape", rotation: -2, font: "gaegu" } },
    ],
  },
  {
    id: "goals",
    title: "목표 달성",
    desc: "저축·운동·습관 목표를 한 곳에서 관리하는 목표 대시보드",
    themeId: "forest",
    layout: [[0, 1], [2, 3], [4]],
    notionTip: "목표 2개를 상단에 나란히, 습관과 인생달력을 중간에, D-Day를 하단 전폭에 배치하세요.",
    widgets: [
      { type: "goal", name: "저축 목표", widgetConfig: { title: "저축", current: 350000, target: 1000000, unit: "원", style: "bar" } },
      { type: "goal", name: "운동 목표", widgetConfig: { title: "운동", current: 12, target: 30, unit: "회", style: "ring" } },
      { type: "habit", name: "운동 습관", widgetConfig: { title: "운동", view: "week", weekStart: "mon", checkedDates: new Set(["2026-02-23", "2026-02-25", "2026-02-27"]) } },
      { type: "life-calendar", name: "인생 달력", widgetConfig: { birthdate: "2000-01-01", lifespan: 80, shape: "round" } },
      { type: "dday", name: "목표 달성일", widgetConfig: { title: "목표 달성일", targetDate: "2026-12-31" } },
    ],
  },
  {
    id: "daily",
    title: "데일리 루틴",
    desc: "매일 체크하는 일상 관리 대시보드",
    themeId: "light-default",
    layout: [[2, 0], [1, 3], [4]],
    notionTip: "시계를 좌측 상단에, 날씨를 우측에 배치해 매일 확인하세요.",
    widgets: [
      { type: "weather", name: "오늘 날씨", widgetConfig: { city: "서울" } },
      { type: "mini-calendar", name: "이번 달 캘린더", widgetConfig: { weekStart: "mon", lang: "ko" } },
      { type: "clock", name: "현재 시각", widgetConfig: { timezone: "Asia/Seoul", format: "24h", font: "mono", showDate: true } },
      { type: "counter", name: "물 마시기", widgetConfig: { label: "물 마시기 (잔)", initial: 0, step: 1 } },
      { type: "habit", name: "하루 습관", widgetConfig: { title: "루틴 체크", view: "week", weekStart: "mon", checkedDates: new Set(["2026-02-24", "2026-02-25", "2026-02-26"]) } },
    ],
  },
  {
    id: "night-owl",
    title: "나이트 아울",
    desc: "따뜻한 색감의 야간용 위젯 조합",
    themeId: "sunset",
    layout: [[0, 1], [2, 3], [4, 5]],
    notionTip: "노션 다크모드와 함께 사용하면 눈이 편합니다. 플립 시계와 진행률을 상단에, 달 위상을 하단에 배치하세요.",
    widgets: [
      { type: "flip-clock", name: "플립 시계", widgetConfig: { timezone: "Asia/Seoul", flipColor: "FEF3C7", textColor: "1C1917", gapColor: "D97706", showDate: true, dateFmt: "kr" } },
      { type: "time-progress", name: "올해 진행률", widgetConfig: { type: "year" } },
      { type: "music", name: "음악 플레이어", widgetConfig: { title: "Midnight Jazz", artist: "Night Vibes", progress: 65 } },
      { type: "quote", name: "밤 명언", widgetConfig: { text: "밤은 낮보다 더 많은 별을 가지고 있다", author: "헤밍웨이", font: "serif" } },
      { type: "timeline", name: "이번 주 일정", widgetConfig: { events: [{ title: "프로젝트 마감", date: "2026-03-06" }, { title: "미팅", date: "2026-03-10" }, { title: "발표", date: "2026-03-15" }] } },
      { type: "moon-phase", name: "달 위상", widgetConfig: { style: "realistic", moonSize: "md", showName: true, showPercent: true } },
    ],
  },
];
