import type { WidgetType } from "./widget-type";

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
