import type { Preset } from "./types";

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

// Todo
export const todoPresets: Preset[] = [
  {
    id: "todo-daily-dark",
    name: "데일리 다크",
    data: {
      title: "오늘 할 일",
      items: "기획서%20작성|디자인%20리뷰|!회의%20참석|코드%20리뷰",
      color: "7C3AED",
      bg: "1A1A2E",
      textColor: "E0E0E0",
      showProgress: true,
      strikethrough: true,
    },
  },
  {
    id: "todo-study",
    name: "공부 체크리스트",
    data: {
      title: "공부 계획",
      items: "%EC%88%98%ED%95%99%201%EC%9E%A5|%EC%98%81%EC%96%B4%20%EB%8B%A8%EC%96%B4|!%EA%B5%AD%EC%96%B4%20%EB%AC%B8%EB%B2%95",
      color: "2563EB",
      bg: "FFFFFF",
      showProgress: true,
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

// Flashcard
export const flashcardPresets: Preset[] = [
  {
    id: "flashcard-vocab",
    name: "영어 단어장",
    data: {
      cards: [
        { front: "Apple", back: "사과" },
        { front: "Book", back: "책" },
        { front: "Water", back: "물" },
        { front: "Friend", back: "친구" },
        { front: "Dream", back: "꿈" },
      ],
      accentColor: "7C3AED",
      showCount: true,
    },
  },
  {
    id: "flashcard-dark-quiz",
    name: "다크 퀴즈",
    data: {
      cards: [
        { front: "대한민국의 수도는?", back: "서울" },
        { front: "π의 값은?", back: "3.14159..." },
        { front: "H₂O는?", back: "물" },
      ],
      accentColor: "06B6D4",
      bg: "1A1A2E",
      color: "E0E0E0",
      showCount: true,
    },
  },
];

// Water Tracker
export const waterTrackerPresets: Preset[] = [
  {
    id: "water-default",
    name: "기본 물 트래커",
    data: {
      goal: 8,
      glassSize: 250,
      color: "3B82F6",
      showMl: true,
    },
  },
  {
    id: "water-dark",
    name: "다크 트래커",
    data: {
      goal: 8,
      glassSize: 250,
      color: "06B6D4",
      bg: "1A1A2E",
      textColor: "E0E0E0",
      showMl: true,
    },
  },
];

// Breathing
export const breathingPresets: Preset[] = [
  {
    id: "breathing-478",
    name: "4-7-8 릴랙스",
    data: {
      technique: "478",
      inhale: 4,
      hold1: 7,
      exhale: 8,
      hold2: 0,
      rounds: 3,
      accentColor: "06B6D4",
      color: "1E1E1E",
      bg: "FFFFFF",
    },
  },
  {
    id: "breathing-night",
    name: "나이트 박스 호흡",
    data: {
      technique: "box",
      inhale: 4,
      hold1: 4,
      exhale: 4,
      hold2: 4,
      rounds: 5,
      accentColor: "7C3AED",
      color: "E0E0E0",
      bg: "0F172A",
    },
  },
];

// Age Calculator
export const ageCalculatorPresets: Preset[] = [
  {
    id: "age-full",
    name: "풀 표시",
    data: {
      birthdate: "1995-01-01",
      showTime: true,
      showLabel: true,
      style: "full",
      color: "2563EB",
      bg: "FFFFFF",
    },
  },
  {
    id: "age-compact-dark",
    name: "컴팩트 다크",
    data: {
      birthdate: "2000-06-15",
      showTime: true,
      showLabel: false,
      style: "compact",
      color: "06B6D4",
      textColor: "E0E0E0",
      bg: "1A1A2E",
    },
  },
];

// Stepper
export const stepperPresets: Preset[] = [
  {
    id: "stepper-project",
    name: "프로젝트 단계",
    data: {
      steps: [
        { label: "기획", desc: "아이디어 구상" },
        { label: "디자인", desc: "UI/UX 설계" },
        { label: "개발", desc: "코딩 및 구현" },
        { label: "배포", desc: "서비스 출시" },
      ],
      currentStep: 2,
      layout: "horizontal",
      color: "2563EB",
      completedColor: "22C55E",
      bg: "FFFFFF",
    },
  },
  {
    id: "stepper-vertical-dark",
    name: "세로 다크",
    data: {
      steps: [
        { label: "접수", desc: "신청 완료" },
        { label: "검토", desc: "서류 검토 중" },
        { label: "승인", desc: "승인 대기" },
      ],
      currentStep: 1,
      layout: "vertical",
      color: "7C3AED",
      completedColor: "06B6D4",
      textColor: "E0E0E0",
      bg: "1A1A2E",
    },
  },
];

// Matrix
export const matrixPresets: Preset[] = [
  {
    id: "matrix-eisenhower",
    name: "아이젠하워",
    data: {
      items: [
        { text: "프로젝트 마감", quadrant: 0 },
        { text: "운동 계획", quadrant: 1 },
        { text: "이메일 답장", quadrant: 2 },
        { text: "SNS 확인", quadrant: 3 },
      ],
      showLabels: true,
      showAxes: true,
      bg: "FFFFFF",
    },
  },
  {
    id: "matrix-dark",
    name: "다크 매트릭스",
    data: {
      items: [
        { text: "버그 수정", quadrant: 0 },
        { text: "리팩토링", quadrant: 1 },
        { text: "회의", quadrant: 2 },
        { text: "뉴스 확인", quadrant: 3 },
      ],
      showLabels: true,
      showAxes: true,
      textColor: "E0E0E0",
      bg: "1A1A2E",
    },
  },
];

// Multi Progress
export const multiProgressPresets: Preset[] = [
  {
    id: "multi-skills",
    name: "스킬 진행",
    data: {
      items: [
        { label: "프론트엔드", value: 80, max: 100, color: "6366F1" },
        { label: "백엔드", value: 65, max: 100, color: "EC4899" },
        { label: "디자인", value: 90, max: 100, color: "22C55E" },
        { label: "DevOps", value: 45, max: 100, color: "F59E0B" },
      ],
      showPercent: true,
      barHeight: "default",
      bg: "FFFFFF",
    },
  },
  {
    id: "multi-dark",
    name: "다크 프로그레스",
    data: {
      items: [
        { label: "매출", value: 750, max: 1000, color: "7C3AED" },
        { label: "이익", value: 420, max: 1000, color: "06B6D4" },
        { label: "고객수", value: 880, max: 1000, color: "F59E0B" },
      ],
      showPercent: true,
      showValue: true,
      barHeight: "thick",
      textColor: "E0E0E0",
      bg: "1A1A2E",
    },
  },
];

// Counter
export const counterPresets: Preset[] = [
  {
    id: "counter-score",
    name: "점수 카운터",
    data: {
      label: "점수",
      initial: 0,
      step: 1,
      showReset: true,
      btnColor: "2563EB",
      bg: "FFFFFF",
    },
  },
  {
    id: "counter-dark",
    name: "다크 카운터",
    data: {
      label: "카운트",
      initial: 0,
      step: 5,
      showReset: true,
      btnColor: "7C3AED",
      color: "E0E0E0",
      bg: "1A1A2E",
    },
  },
];

// Weather
export const weatherPresets: Preset[] = [
  {
    id: "weather-seoul",
    name: "서울 날씨",
    data: {
      lat: 37.5665,
      lon: 126.978,
      city: "서울",
      unit: "celsius",
      showForecast: true,
      showHumidity: true,
      iconStyle: "emoji",
    },
  },
  {
    id: "weather-tokyo-dark",
    name: "도쿄 (다크)",
    data: {
      lat: 35.6762,
      lon: 139.6503,
      city: "도쿄",
      unit: "celsius",
      showForecast: false,
      showHumidity: true,
      showWind: true,
      iconStyle: "minimal",
      bg: "1A1A2E",
      color: "E0E0E0",
    },
  },
];

// Reading
export const readingPresets: Preset[] = [
  {
    id: "reading-bar",
    name: "독서 진행 (바)",
    data: {
      title: "클린 코드",
      current: 180,
      total: 300,
      style: "bar",
      color: "2563EB",
      pages: true,
    },
  },
  {
    id: "reading-ring-dark",
    name: "독서 진행 (링 다크)",
    data: {
      title: "사피엔스",
      current: 250,
      total: 450,
      style: "ring",
      color: "22C55E",
      pages: true,
      bg: "1A1A2E",
      textColor: "E0E0E0",
    },
  },
];

// Habit
export const habitPresets: Preset[] = [
  {
    id: "habit-exercise",
    name: "운동 습관",
    data: {
      title: "운동",
      view: "week",
      weekStart: "mon",
      color: "22C55E",
    },
  },
  {
    id: "habit-month-dark",
    name: "월간 (다크)",
    data: {
      title: "습관 트래커",
      view: "month",
      weekStart: "mon",
      color: "7C3AED",
      bg: "1A1A2E",
      textColor: "E0E0E0",
    },
  },
];

// Stopwatch
export const stopwatchPresets: Preset[] = [
  {
    id: "stopwatch-default",
    name: "기본 스톱워치",
    data: {
      showMs: false,
      showLap: true,
      btnColor: "2563EB",
    },
  },
  {
    id: "stopwatch-dark",
    name: "다크 스톱워치",
    data: {
      showMs: true,
      showLap: true,
      btnColor: "7C3AED",
      bg: "1A1A2E",
      color: "E0E0E0",
    },
  },
];
