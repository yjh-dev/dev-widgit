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
];
