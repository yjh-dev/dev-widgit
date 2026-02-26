import type { TimelineEvent } from "@/lib/timeline";

export interface Preset<T = Record<string, unknown>> {
  id: string;
  name: string;
  data: T;
}

// D-Day
export const ddayPresets: Preset[] = [
  {
    id: "dday-suneung-dark",
    name: "수능 D-Day (다크)",
    data: {
      title: "수능",
      targetDate: "2026-11-19",
      bgColor: "1E1E1E",
      textColor: "FFFFFF",
      isDarkMode: true,
      showTime: true,
      dateFmt: "full",
    },
  },
  {
    id: "dday-newyear",
    name: "새해 카운트다운",
    data: {
      title: "2027 새해",
      targetDate: "2027-01-01",
      bgColor: "7C3AED",
      textColor: "FFFFFF",
      isDarkMode: true,
      showTime: true,
      doneMsg: "새해 복 많이 받으세요! 🎉",
    },
  },
];

// Clock
export const clockPresets: Preset[] = [
  {
    id: "clock-tokyo-mono",
    name: "도쿄 시계 (모노)",
    data: {
      timezone: "Asia/Tokyo",
      format: "24h",
      font: "mono",
      color: "F8F8F2",
      bg: "282A36",
      showSeconds: true,
      showDate: true,
      dateFmt: "en",
    },
  },
  {
    id: "clock-ny",
    name: "뉴욕 시계",
    data: {
      timezone: "America/New_York",
      format: "12h",
      font: "noto-sans-kr",
      color: "1E1E1E",
      bg: "F0F0F0",
      showSeconds: false,
      showDate: true,
      dateFmt: "en",
    },
  },
];

// Quote
export const quotePresets: Preset[] = [
  {
    id: "quote-dark",
    name: "다크 명언",
    data: {
      text: "오늘 할 수 있는 일에 최선을 다하자",
      author: "작자미상",
      font: "noto-serif-kr",
      textColor: "F8F8F2",
      bg: "1E1E1E",
      showMarks: true,
      italic: true,
      lineHeight: "relaxed",
      divider: true,
    },
  },
  {
    id: "quote-minimal",
    name: "미니멀 명언",
    data: {
      text: "천리길도 한 걸음부터",
      author: "노자",
      font: "noto-sans-kr",
      textColor: "374151",
      bg: "FFFFFF",
      showMarks: false,
      italic: false,
      lineHeight: "normal",
      align: "left",
      padding: 32,
    },
  },
];

// Life Calendar
export const lifeCalendarPresets: Preset[] = [
  {
    id: "life-minimal",
    name: "미니멀 (작은 셀)",
    data: {
      color: "6366F1",
      bg: "FFFFFF",
      shape: "square",
      cellSize: "sm",
      showYears: false,
      futureColor: "E5E7EB",
    },
  },
  {
    id: "life-colorful",
    name: "컬러풀 (큰 셀)",
    data: {
      color: "22C55E",
      bg: "FAFAF9",
      shape: "round",
      cellSize: "lg",
      showYears: true,
      nowColor: "EAB308",
      futureColor: "D1FAE5",
    },
  },
];

// Time Progress
export const timeProgressPresets: Preset[] = [
  {
    id: "tp-year-ring",
    name: "올해 진행률 (링)",
    data: {
      type: "year",
      style: "ring",
      color: "8B5CF6",
      ringSize: "lg",
      showLabel: true,
      showPercent: true,
      showRemain: true,
    },
  },
  {
    id: "tp-month-bar",
    name: "이번 달 (바)",
    data: {
      type: "month",
      style: "bar",
      color: "2563EB",
      barHeight: "thick",
      showLabel: true,
      showPercent: true,
    },
  },
];

// Pomodoro
export const pomodoroPresets: Preset[] = [
  {
    id: "pomo-classic",
    name: "클래식 25/5",
    data: {
      workTime: 25,
      breakTime: 5,
      longBreak: 15,
      rounds: 4,
      color: "E11D48",
      breakColor: "22C55E",
      pStyle: "bar",
    },
  },
  {
    id: "pomo-deep",
    name: "딥워크 50/10",
    data: {
      workTime: 50,
      breakTime: 10,
      longBreak: 30,
      rounds: 2,
      color: "7C3AED",
      breakColor: "06B6D4",
      pStyle: "ring",
    },
  },
];

// Banner
export const bannerPresets: Preset[] = [
  {
    id: "banner-cheer-scroll",
    name: "응원 배너 (스크롤)",
    data: {
      texts: ["오늘도 화이팅! 💪", "넌 할 수 있어! 🔥", "포기하지 마! ⭐"],
      animation: "scroll",
      speed: 3,
      bold: true,
      color: "FFFFFF",
      bg: "E11D48",
      fontSize: "xl",
    },
  },
  {
    id: "banner-notice-fade",
    name: "공지 배너 (페이드)",
    data: {
      texts: ["공지사항을 입력하세요", "두 번째 공지"],
      animation: "fade",
      speed: 4,
      bold: true,
      color: "1E1E1E",
      bg: "FEF3C7",
      fontSize: "lg",
      font: "sans",
    },
  },
];

// Bookmark
export const bookmarkPresets: Preset[] = [
  {
    id: "bookmark-github",
    name: "깃허브 프로필",
    data: {
      url: "https://github.com",
      title: "GitHub",
      desc: "내 깃허브 프로필",
      showIcon: true,
      showUrl: true,
      color: "1E1E1E",
      bg: "FFFFFF",
    },
  },
  {
    id: "bookmark-blog",
    name: "블로그 링크",
    data: {
      url: "https://blog.example.com",
      title: "내 블로그",
      desc: "개발 블로그입니다",
      showIcon: true,
      showUrl: true,
      color: "FFFFFF",
      bg: "1E1E1E",
    },
  },
];

// Goal
export const goalPresets: Preset[] = [
  {
    id: "goal-saving",
    name: "저축 목표",
    data: {
      title: "여행 자금",
      current: 350000,
      target: 1000000,
      unit: "원",
      style: "bar",
      color: "22C55E",
    },
  },
  {
    id: "goal-exercise",
    name: "운동 목표",
    data: {
      title: "이번 달 운동",
      current: 12,
      target: 30,
      unit: "회",
      style: "ring",
      color: "E11D48",
    },
  },
];

// Music
export const musicPresets: Preset[] = [
  {
    id: "music-lofi",
    name: "Lo-Fi 감성",
    data: {
      title: "Chill Beats",
      artist: "Lo-Fi Radio",
      progress: 45,
      artColor: "7C3AED",
      color: "F8F8F2",
      bg: "1E1E1E",
    },
  },
  {
    id: "music-kpop",
    name: "K-Pop 스타일",
    data: {
      title: "좋은 날",
      artist: "아이유",
      progress: 60,
      artColor: "EC4899",
      color: "1E1E1E",
      bg: "FDF2F8",
    },
  },
];

// Widgets without presets — empty arrays
export const miniCalendarPresets: Preset[] = [];
export const analogClockPresets: Preset[] = [];
export const counterPresets: Preset[] = [];
export const weatherPresets: Preset[] = [];
export const readingPresets: Preset[] = [];
export const habitPresets: Preset[] = [];
export const timelinePresets: Preset<{ events?: TimelineEvent[] }>[] = [];
export const stopwatchPresets: Preset[] = [];
