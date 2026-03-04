import type { WidgetType } from "./widget-type";

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
    case "fortune-cookie":
      return { ...common, customMessages: [], lang: "ko", style: "classic", cookieColor: "D97706", textColor: "1E1E1E", bg: "FFFFFF", padding: 24 };
    default:
      return common;
  }
}
