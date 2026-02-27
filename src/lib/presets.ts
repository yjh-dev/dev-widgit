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

// Gradient
export const gradientPresets: Preset[] = [
  {
    id: "gradient-sunset",
    name: "선셋 그라데이션",
    data: {
      colors: ["F97316", "EC4899", "8B5CF6"],
      dir: 135,
      type: "linear",
      animate: false,
    },
  },
  {
    id: "gradient-ocean-anim",
    name: "오션 (애니메이션)",
    data: {
      colors: ["06B6D4", "3B82F6", "8B5CF6"],
      dir: 180,
      type: "linear",
      animate: true,
      speed: 8,
    },
  },
];

// Sticky Note
export const stickyNotePresets: Preset[] = [
  {
    id: "sticky-todo",
    name: "할 일 메모 (노랑)",
    data: {
      text: "오늘 할 일\n1. 독서\n2. 운동\n3. 정리",
      noteColor: "FBBF24",
      textColor: "1E1E1E",
      pin: "pin",
      rotation: 2,
      font: "gaegu",
    },
  },
  {
    id: "sticky-pink-tape",
    name: "핑크 메모 (테이프)",
    data: {
      text: "잊지 말기! 🌸\n내일 미팅 10시",
      noteColor: "F9A8D4",
      textColor: "1E1E1E",
      pin: "tape",
      rotation: -1,
      font: "gaegu",
    },
  },
];

// Flip Clock
export const flipClockPresets: Preset[] = [
  {
    id: "flip-dark",
    name: "다크 플립",
    data: {
      flipColor: "1E1E1E",
      textColor: "FFFFFF",
      gapColor: "333333",
      bg: "0F172A",
      showDate: true,
      dateFmt: "kr",
      fontSize: "lg",
    },
  },
  {
    id: "flip-retro",
    name: "레트로 스타일",
    data: {
      flipColor: "78350F",
      textColor: "FEF3C7",
      gapColor: "92400E",
      bg: "FFFBEB",
      showDate: false,
      fontSize: "md",
    },
  },
];

// Moon Phase
export const moonPhasePresets: Preset[] = [
  {
    id: "moon-dark",
    name: "다크 달 위상",
    data: {
      style: "realistic",
      moonColor: "F5F5DC",
      shadowColor: "1A1A2E",
      bg: "0F172A",
      textColor: "E0E0E0",
      moonSize: "lg",
      showName: true,
      showPercent: true,
    },
  },
  {
    id: "moon-emoji",
    name: "이모지 달",
    data: {
      style: "emoji",
      bg: "FFFFFF",
      textColor: "1E1E1E",
      moonSize: "lg",
      showName: true,
      showPercent: false,
    },
  },
];

// Dice
export const dicePresets: Preset[] = [
  {
    id: "dice-classic",
    name: "클래식 주사위",
    data: {
      mode: "dice",
      count: 2,
      sides: 6,
      color: "2563EB",
      textColor: "FFFFFF",
      showTotal: true,
    },
  },
  {
    id: "dice-coin",
    name: "동전 던지기",
    data: {
      mode: "coin",
      color: "F59E0B",
      textColor: "FFFFFF",
      bg: "FFFBEB",
    },
  },
];

// QR Code
export const qrCodePresets: Preset[] = [
  {
    id: "qr-github",
    name: "깃허브 QR",
    data: {
      data: "https://github.com",
      label: "GitHub",
      fgColor: "1E1E1E",
      bgColor: "FFFFFF",
      size: "md",
      module: "square",
    },
  },
  {
    id: "qr-rounded-dark",
    name: "라운드 다크 QR",
    data: {
      data: "https://example.com",
      label: "링크",
      fgColor: "F8F8F2",
      bgColor: "1E1E1E",
      size: "md",
      module: "rounded",
    },
  },
];

// Typewriter
export const typewriterPresets: Preset[] = [
  {
    id: "typewriter-terminal",
    name: "다크 터미널",
    data: {
      texts: ["$ npm run build", "$ deploy --production", "✓ 배포 완료!"],
      speed: 60,
      pause: 1500,
      cursor: "block",
      bold: true,
      font: "mono",
      color: "22C55E",
      bg: "0F172A",
      fontSize: "lg",
    },
  },
  {
    id: "typewriter-greeting",
    name: "감성 인사",
    data: {
      texts: ["안녕하세요 👋", "오늘도 좋은 하루 되세요", "화이팅! 🔥"],
      speed: 80,
      pause: 2000,
      cursor: "bar",
      bold: true,
      font: "sans",
      color: "1E1E1E",
      bg: "FFF7ED",
      fontSize: "lg",
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
