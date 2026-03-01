import type { Preset } from "./types";

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

// GitHub Contribution
export const githubContributionPresets: Preset[] = [
  {
    id: "github-dark",
    name: "GitHub 다크",
    data: {
      color: "22C55E",
      bg: "0D1117",
      textColor: "C9D1D9",
      cellRadius: "rounded",
      cellSize: "sm",
    },
  },
  {
    id: "github-blue",
    name: "블루 잔디",
    data: {
      color: "3B82F6",
      bg: "FFFFFF",
      textColor: "1E1E1E",
      cellRadius: "circle",
      cellSize: "sm",
    },
  },
];

// Profile Card
export const profileCardPresets: Preset[] = [
  {
    id: "profile-developer",
    name: "개발자 카드",
    data: {
      name: "홍길동",
      bio: "Frontend Developer",
      layout: "vertical",
      avatarShape: "circle",
      accentColor: "2563EB",
      color: "1E1E1E",
      bg: "FFFFFF",
      socials: [
        { type: "github", url: "username", label: "GitHub" },
        { type: "link", url: "https://blog.example.com", label: "웹사이트" },
      ],
    },
  },
  {
    id: "profile-dark",
    name: "다크 프로필",
    data: {
      name: "이름",
      bio: "한 줄 소개",
      layout: "horizontal",
      avatarShape: "rounded",
      accentColor: "7C3AED",
      color: "E0E0E0",
      bg: "1A1A2E",
    },
  },
];

// Link Tree
export const linkTreePresets: Preset[] = [
  {
    id: "linktree-dev",
    name: "개발자 링크",
    data: {
      title: "내 링크",
      linkStyle: "filled",
      accentColor: "2563EB",
      color: "1E1E1E",
      bg: "FFFFFF",
      links: [
        { id: "lk-1", title: "GitHub", url: "https://github.com", icon: "" },
        { id: "lk-2", title: "블로그", url: "https://blog.example.com", icon: "📝" },
        { id: "lk-3", title: "포트폴리오", url: "https://portfolio.example.com", icon: "🎨" },
      ],
    },
  },
  {
    id: "linktree-dark",
    name: "다크 링크",
    data: {
      title: "Links",
      linkStyle: "outline",
      accentColor: "7C3AED",
      color: "E0E0E0",
      bg: "1A1A2E",
      links: [
        { id: "lk-1", title: "Website", url: "https://example.com", icon: "🌐" },
        { id: "lk-2", title: "Twitter", url: "https://x.com", icon: "" },
      ],
    },
  },
];

// Image Card
export const imageCardPresets: Preset[] = [
  {
    id: "image-card-default",
    name: "기본 이미지 카드",
    data: {
      fit: "cover",
      captionPos: "bottom",
      showCaption: true,
      color: "1E1E1E",
      bg: "FFFFFF",
      borderRadius: 16,
    },
  },
  {
    id: "image-card-overlay",
    name: "오버레이 캡션",
    data: {
      fit: "cover",
      captionPos: "overlay",
      showCaption: true,
      color: "1E1E1E",
      bg: "FFFFFF",
      borderRadius: 16,
    },
  },
];

// Currency
export const currencyPresets: Preset[] = [
  {
    id: "currency-usd",
    name: "달러 환율",
    data: {
      base: "USD",
      targets: ["KRW", "JPY", "EUR"],
      showFlag: true,
      accentColor: "2563EB",
      color: "1E1E1E",
      bg: "FFFFFF",
    },
  },
  {
    id: "currency-dark",
    name: "다크 환율",
    data: {
      base: "USD",
      targets: ["KRW", "EUR"],
      showFlag: true,
      accentColor: "06B6D4",
      color: "E0E0E0",
      bg: "1A1A2E",
    },
  },
];

// Radar Chart
export const radarChartPresets: Preset[] = [
  {
    id: "radar-skills",
    name: "개발자 스킬",
    data: {
      items: [
        { label: "코딩", value: 85 },
        { label: "디자인", value: 55 },
        { label: "기획", value: 70 },
        { label: "소통", value: 80 },
        { label: "리더십", value: 65 },
      ],
      color: "6366F1",
      gridColor: "E5E7EB",
      bg: "FFFFFF",
      fillOpacity: 30,
    },
  },
  {
    id: "radar-dark",
    name: "다크 능력치",
    data: {
      items: [
        { label: "공격", value: 90 },
        { label: "방어", value: 60 },
        { label: "속도", value: 75 },
        { label: "마법", value: 80 },
        { label: "체력", value: 70 },
      ],
      color: "EC4899",
      gridColor: "374151",
      textColor: "E0E0E0",
      bg: "1A1A2E",
      fillOpacity: 25,
    },
  },
];

// Pie Chart
export const pieChartPresets: Preset[] = [
  {
    id: "pie-budget",
    name: "예산 분배",
    data: {
      slices: [
        { label: "식비", value: 35, color: "6366F1" },
        { label: "교통", value: 15, color: "EC4899" },
        { label: "주거", value: 30, color: "F59E0B" },
        { label: "여가", value: 20, color: "22C55E" },
      ],
      style: "donut",
      showLegend: true,
      bg: "FFFFFF",
    },
  },
  {
    id: "pie-dark",
    name: "다크 파이",
    data: {
      slices: [
        { label: "A", value: 40, color: "7C3AED" },
        { label: "B", value: 35, color: "06B6D4" },
        { label: "C", value: 25, color: "F59E0B" },
      ],
      style: "pie",
      showLegend: true,
      textColor: "E0E0E0",
      bg: "1A1A2E",
    },
  },
];

// Battery
export const batteryPresets: Preset[] = [
  {
    id: "battery-auto",
    name: "자동 색상",
    data: {
      level: 75,
      showPercent: true,
      autoColor: true,
      bg: "FFFFFF",
    },
  },
  {
    id: "battery-custom-dark",
    name: "커스텀 다크",
    data: {
      level: 45,
      showPercent: true,
      autoColor: false,
      color: "7C3AED",
      animate: true,
      textColor: "E0E0E0",
      bg: "1A1A2E",
    },
  },
];

// Testimonial
export const testimonialPresets: Preset[] = [
  {
    id: "testimonial-card",
    name: "카드 스타일",
    data: {
      quote: "이 서비스를 사용한 후 생산성이 크게 향상되었습니다.",
      author: "김지수",
      role: "프로덕트 매니저",
      layout: "card",
      showQuoteMarks: true,
      accentColor: "6366F1",
      bg: "FFFFFF",
    },
  },
  {
    id: "testimonial-centered-dark",
    name: "중앙 정렬 다크",
    data: {
      quote: "최고의 노션 위젯 서비스입니다!",
      author: "이민호",
      role: "개발자",
      layout: "centered",
      showQuoteMarks: true,
      accentColor: "EC4899",
      textColor: "E0E0E0",
      bg: "1A1A2E",
    },
  },
];

// Emoji Rain
export const emojiRainPresets: Preset[] = [
  {
    id: "emoji-party",
    name: "파티",
    data: {
      emojis: "🎉🎊🥳🎈🪅",
      speed: "normal",
      density: "normal",
      transparentBg: true,
    },
  },
  {
    id: "emoji-nature",
    name: "자연",
    data: {
      emojis: "🌸🌺🍃🦋✨",
      speed: "slow",
      density: "dense",
      transparentBg: true,
    },
  },
];

// Changelog
export const changelogPresets: Preset[] = [
  {
    id: "changelog-default",
    name: "기본 변경로그",
    data: {
      entries: [
        { version: "v2.0", date: "2026-02-15", desc: "다크 모드 지원 추가" },
        { version: "v1.5", date: "2026-01-20", desc: "성능 최적화 및 버그 수정" },
        { version: "v1.0", date: "2025-12-01", desc: "첫 번째 정식 출시" },
      ],
      accentColor: "6366F1",
      bg: "FFFFFF",
    },
  },
  {
    id: "changelog-dark",
    name: "다크 변경로그",
    data: {
      entries: [
        { version: "v3.0", date: "2026-03-01", desc: "새로운 UI 출시" },
        { version: "v2.5", date: "2026-02-01", desc: "API 개선" },
      ],
      accentColor: "06B6D4",
      textColor: "E0E0E0",
      bg: "1A1A2E",
    },
  },
];
