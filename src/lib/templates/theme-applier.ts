import type { WidgetType } from "./widget-type";
import type { ColorTheme } from "./themes";

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
    case "fortune-cookie":
      return { ...base, cookieColor: theme.accent, textColor: theme.text, bg: theme.bg, ...config };
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
    case "fortune-cookie":
      addIfPresent("cookieColor", config.cookieColor ?? theme.accent);
      addIfPresent("textColor", config.textColor ?? theme.text);
      addIfPresent("bg", config.bg ?? theme.bg);
      break;
  }

  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}
