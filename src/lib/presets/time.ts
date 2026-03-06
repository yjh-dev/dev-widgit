import type { Preset } from "./types";

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
  {
    id: "dday-pastel",
    name: "파스텔 D-Day",
    data: {
      bgColor: "FFF7ED",
      textColor: "92400E",
      showTime: false,
      dateFmt: "dot",
    },
  },
  {
    id: "dday-neon",
    name: "네온 D-Day",
    data: {
      bgColor: "0F172A",
      textColor: "22D3EE",
      isDarkMode: true,
      showTime: true,
      blink: true,
    },
  },
  {
    id: "dday-retro",
    name: "레트로 D-Day",
    data: {
      bgColor: "FFFBEB",
      textColor: "92400E",
      dateFmt: "short",
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
  {
    id: "clock-pastel",
    name: "파스텔 시계",
    data: {
      bg: "F0FDF4",
      color: "365314",
      font: "noto-serif-kr",
      showDate: true,
      dateFmt: "kr",
    },
  },
  {
    id: "clock-neon",
    name: "네온 시계",
    data: {
      bg: "0F172A",
      color: "A78BFA",
      font: "mono",
      showSeconds: true,
      blink: true,
    },
  },
  {
    id: "clock-retro",
    name: "레트로 시계",
    data: {
      bg: "FEF3C7",
      color: "78350F",
      font: "noto-serif-kr",
      showDate: true,
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
  {
    id: "tp-pastel-ring",
    name: "파스텔 링",
    data: {
      type: "year",
      style: "ring",
      color: "EC4899",
      ringSize: "md",
      bg: "FDF2F8",
    },
  },
  {
    id: "tp-neon",
    name: "네온 바",
    data: {
      type: "month",
      style: "bar",
      color: "22D3EE",
      bg: "0F172A",
      textColor: "E0E0E0",
    },
  },
  {
    id: "tp-retro",
    name: "레트로 바",
    data: {
      type: "week",
      style: "bar",
      color: "D97706",
      bg: "FFFBEB",
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
  {
    id: "flip-pastel",
    name: "파스텔 플립",
    data: {
      flipColor: "FDF2F8",
      textColor: "831843",
      gapColor: "FECDD3",
      bg: "FFF1F2",
    },
  },
  {
    id: "flip-neon",
    name: "네온 플립",
    data: {
      flipColor: "1E1E2E",
      textColor: "22D3EE",
      gapColor: "0F172A",
      bg: "020617",
    },
  },
  {
    id: "flip-wood",
    name: "우드 스타일",
    data: {
      flipColor: "78350F",
      textColor: "FBBF24",
      gapColor: "451A03",
      bg: "92400E",
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
  {
    id: "moon-pastel",
    name: "파스텔 달",
    data: {
      style: "simple",
      bg: "EDE9FE",
      textColor: "4C1D95",
      moonColor: "C4B5FD",
      moonSize: "md",
    },
  },
  {
    id: "moon-neon",
    name: "네온 달",
    data: {
      style: "realistic",
      bg: "020617",
      textColor: "22D3EE",
      moonColor: "F5F5DC",
      moonSize: "lg",
    },
  },
];

// World Clock
export const worldClockPresets: Preset[] = [
  {
    id: "wc-asia",
    name: "아시아 주요 도시",
    data: {
      zones: ["Asia/Seoul", "Asia/Tokyo", "Asia/Shanghai", "Asia/Singapore"],
      format: "24h",
      showLabel: true,
      showSeconds: false,
    },
  },
  {
    id: "wc-global",
    name: "글로벌 비즈니스",
    data: {
      zones: ["Asia/Seoul", "America/New_York", "Europe/London"],
      format: "24h",
      showLabel: true,
      showSeconds: false,
      bg: "1A1A2E",
      color: "E0E0E0",
    },
  },
  {
    id: "wc-pastel",
    name: "파스텔 세계시계",
    data: {
      bg: "FDF2F8",
      color: "831843",
      format: "12h",
    },
  },
];

// Countdown
export const countdownPresets: Preset[] = [
  {
    id: "cd-5min",
    name: "발표 5분",
    data: {
      minutes: 5,
      seconds: 0,
      accentColor: "E11D48",
    },
  },
  {
    id: "cd-exam-dark",
    name: "시험 다크",
    data: {
      minutes: 30,
      seconds: 0,
      accentColor: "7C3AED",
      bg: "1A1A2E",
      color: "E0E0E0",
    },
  },
  {
    id: "cd-pastel",
    name: "파스텔 카운트다운",
    data: {
      accentColor: "EC4899",
      bg: "FDF2F8",
      color: "831843",
    },
  },
];

// Mini Calendar
export const miniCalendarPresets: Preset[] = [
  {
    id: "minical-default",
    name: "기본 캘린더",
    data: {
      weekStart: "mon",
      lang: "ko",
      header: "full",
      showDayNames: true,
      showOtherDays: true,
      showNav: true,
      highlight: "2563EB",
    },
  },
  {
    id: "minical-dark",
    name: "다크 캘린더",
    data: {
      weekStart: "mon",
      lang: "ko",
      header: "short",
      showDayNames: true,
      showOtherDays: false,
      showNav: true,
      highlight: "7C3AED",
      bg: "1A1A2E",
      color: "E0E0E0",
    },
  },
  {
    id: "minical-pastel",
    name: "파스텔 캘린더",
    data: {
      highlight: "EC4899",
      bg: "FDF2F8",
      color: "831843",
      header: "full",
    },
  },
  {
    id: "minical-neon",
    name: "네온 캘린더",
    data: {
      highlight: "22D3EE",
      bg: "0F172A",
      color: "E0E0E0",
      header: "short",
    },
  },
];

// Analog Clock
export const analogClockPresets: Preset[] = [
  {
    id: "analog-classic",
    name: "클래식 시계",
    data: {
      showNumbers: true,
      numStyle: "all",
      showSeconds: true,
      showTicks: true,
      showBorder: true,
      handColor: "1E1E1E",
      secHandColor: "E11D48",
      faceColor: "FFFFFF",
      borderColor: "1E1E1E",
    },
  },
  {
    id: "analog-dark-minimal",
    name: "다크 미니멀",
    data: {
      showNumbers: true,
      numStyle: "quarter",
      showSeconds: false,
      showTicks: true,
      showBorder: false,
      handColor: "E0E0E0",
      secHandColor: "7C3AED",
      faceColor: "1A1A2E",
      tickColor: "4B5563",
      bg: "1A1A2E",
    },
  },
  {
    id: "analog-pastel",
    name: "파스텔 아날로그",
    data: {
      handColor: "831843",
      secHandColor: "EC4899",
      faceColor: "FDF2F8",
      borderColor: "FECDD3",
      bg: "FFF1F2",
    },
  },
  {
    id: "analog-neon",
    name: "네온 아날로그",
    data: {
      handColor: "A78BFA",
      secHandColor: "22D3EE",
      faceColor: "0F172A",
      borderColor: "7C3AED",
      bg: "020617",
    },
  },
];

// Timeline
export const timelinePresets: Preset[] = [
  {
    id: "timeline-exam",
    name: "시험 일정",
    data: {
      events: [
        { title: "중간고사", date: "2026-04-15" },
        { title: "기말고사", date: "2026-06-20" },
        { title: "방학", date: "2026-07-15" },
      ],
      color: "2563EB",
      past: false,
    },
  },
  {
    id: "timeline-dark",
    name: "다크 타임라인",
    data: {
      events: [
        { title: "기획 완료", date: "2026-03-01" },
        { title: "개발 시작", date: "2026-03-15" },
        { title: "출시", date: "2026-05-01" },
      ],
      color: "7C3AED",
      past: true,
      pastColor: "6B7280",
      bg: "1A1A2E",
      textColor: "E0E0E0",
    },
  },
  {
    id: "timeline-pastel",
    name: "파스텔 타임라인",
    data: {
      color: "EC4899",
      bg: "FDF2F8",
      textColor: "831843",
    },
  },
];

// Anniversary
export const anniversaryPresets: Preset[] = [
  {
    id: "anniversary-romantic",
    name: "로맨틱 기념일",
    data: {
      title: "우리의 기념일",
      color: "E11D48",
      textColor: "FFFFFF",
      bg: "1E1E1E",
      showDays: true,
      showWeeks: true,
    },
  },
  {
    id: "anniversary-pastel",
    name: "파스텔 기념일",
    data: {
      color: "EC4899",
      textColor: "831843",
      bg: "FDF2F8",
      showDays: true,
      showMonths: true,
    },
  },
];

// Countup
export const countupPresets: Preset[] = [
  {
    id: "countup-dark",
    name: "다크 카운트업",
    data: {
      color: "22D3EE",
      textColor: "E0E0E0",
      bg: "0F172A",
      showSeconds: true,
    },
  },
  {
    id: "countup-minimal",
    name: "미니멀 카운트업",
    data: {
      color: "2563EB",
      textColor: "1E1E1E",
      bg: "FFFFFF",
      showSeconds: false,
    },
  },
];

// Season Countdown
export const seasonCountdownPresets: Preset[] = [
  {
    id: "season-festive",
    name: "축제 시즌",
    data: {
      showIcon: true,
      color: "E11D48",
      textColor: "FFFFFF",
      bg: "1E1E1E",
    },
  },
  {
    id: "season-pastel",
    name: "파스텔 시즌",
    data: {
      showIcon: true,
      color: "EC4899",
      textColor: "831843",
      bg: "FDF2F8",
    },
  },
];

// Dual Clock (deprecated — mapped to world-clock format)
export const dualClockPresets: Preset[] = [];
