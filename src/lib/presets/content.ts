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
  {
    id: "quote-pastel",
    name: "파스텔 명언",
    data: {
      text: "매일 조금씩 성장하자",
      author: "작자미상",
      font: "noto-serif-kr",
      textColor: "831843",
      bg: "FDF2F8",
      showMarks: true,
      italic: true,
    },
  },
  {
    id: "quote-neon",
    name: "네온 명언",
    data: {
      text: "꿈을 향해 나아가자",
      author: "",
      font: "mono",
      textColor: "22D3EE",
      bg: "0F172A",
      showMarks: false,
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
  {
    id: "life-pastel",
    name: "파스텔 인생 달력",
    data: {
      color: "EC4899",
      bg: "FDF2F8",
      shape: "round",
      cellSize: "md",
      futureColor: "FECDD3",
    },
  },
  {
    id: "life-neon",
    name: "네온 인생 달력",
    data: {
      color: "22D3EE",
      bg: "0F172A",
      shape: "square",
      cellSize: "sm",
      futureColor: "1E293B",
      nowColor: "A78BFA",
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
  {
    id: "banner-neon",
    name: "네온 배너",
    data: {
      texts: ["네온 스타일 배너"],
      animation: "scroll",
      bold: true,
      color: "22D3EE",
      bg: "0F172A",
      fontSize: "xl",
    },
  },
  {
    id: "banner-retro",
    name: "레트로 배너",
    data: {
      texts: ["레트로 감성 배너"],
      animation: "fade",
      color: "92400E",
      bg: "FFFBEB",
      fontSize: "lg",
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
  {
    id: "bookmark-pastel",
    name: "파스텔 북마크",
    data: {
      title: "내 포트폴리오",
      desc: "개인 사이트",
      color: "831843",
      bg: "FDF2F8",
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
  {
    id: "goal-pastel",
    name: "파스텔 목표",
    data: {
      title: "이번 달 독서",
      current: 5,
      target: 10,
      unit: "권",
      style: "ring",
      color: "EC4899",
      bg: "FDF2F8",
    },
  },
  {
    id: "goal-neon",
    name: "네온 목표",
    data: {
      title: "프로젝트",
      current: 75,
      target: 100,
      unit: "%",
      style: "bar",
      color: "22D3EE",
      bg: "0F172A",
      textColor: "E0E0E0",
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
  {
    id: "music-neon",
    name: "네온 뮤직",
    data: {
      title: "Midnight",
      artist: "Synthwave",
      artColor: "A78BFA",
      color: "22D3EE",
      bg: "0F172A",
    },
  },
  {
    id: "music-retro",
    name: "레트로 뮤직",
    data: {
      title: "올드 팝",
      artist: "Classic",
      artColor: "D97706",
      color: "92400E",
      bg: "FFFBEB",
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
  {
    id: "gradient-pastel",
    name: "파스텔 그라데이션",
    data: {
      colors: ["FEC5BB", "D8E2DC", "B5C7D3"],
      dir: 135,
      type: "linear",
    },
  },
  {
    id: "gradient-neon",
    name: "네온 그라데이션",
    data: {
      colors: ["7C3AED", "22D3EE", "EC4899"],
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
  {
    id: "sticky-pastel",
    name: "파스텔 메모",
    data: {
      text: "오늘의 감사 일기",
      noteColor: "FEC5BB",
      textColor: "92400E",
      pin: "tape",
      rotation: -2,
    },
  },
  {
    id: "sticky-retro",
    name: "레트로 메모",
    data: {
      text: "빈티지 메모",
      noteColor: "FEF3C7",
      textColor: "78350F",
      pin: "pin",
      rotation: 3,
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
  {
    id: "qr-pastel",
    name: "파스텔 QR",
    data: {
      fgColor: "831843",
      bgColor: "FDF2F8",
      module: "dots",
    },
  },
  {
    id: "qr-neon",
    name: "네온 QR",
    data: {
      fgColor: "22D3EE",
      bgColor: "0F172A",
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
  {
    id: "typewriter-neon",
    name: "네온 타이프라이터",
    data: {
      texts: ["Welcome to the future", "Neon dreams"],
      speed: 50,
      cursor: "block",
      font: "mono",
      color: "22D3EE",
      bg: "0F172A",
    },
  },
  {
    id: "typewriter-retro",
    name: "레트로 타이프라이터",
    data: {
      texts: ["옛날 옛적에...", "이야기가 시작됩니다"],
      speed: 100,
      cursor: "underscore",
      font: "serif",
      color: "78350F",
      bg: "FFFBEB",
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
  {
    id: "github-pastel",
    name: "파스텔 잔디",
    data: {
      color: "EC4899",
      bg: "FDF2F8",
      textColor: "831843",
      cellRadius: "circle",
    },
  },
  {
    id: "github-neon",
    name: "네온 잔디",
    data: {
      color: "22D3EE",
      bg: "020617",
      textColor: "E0E0E0",
      cellRadius: "rounded",
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
  {
    id: "profile-pastel",
    name: "파스텔 프로필",
    data: {
      accentColor: "EC4899",
      color: "831843",
      bg: "FDF2F8",
      layout: "vertical",
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
  {
    id: "linktree-pastel",
    name: "파스텔 링크",
    data: {
      accentColor: "EC4899",
      color: "831843",
      bg: "FDF2F8",
      linkStyle: "filled",
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
  {
    id: "image-card-dark",
    name: "다크 이미지",
    data: {
      color: "E0E0E0",
      bg: "1A1A2E",
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
  {
    id: "currency-pastel",
    name: "파스텔 환율",
    data: {
      accentColor: "EC4899",
      color: "831843",
      bg: "FDF2F8",
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
  {
    id: "radar-pastel",
    name: "파스텔 레이더",
    data: {
      color: "EC4899",
      gridColor: "FECDD3",
      bg: "FDF2F8",
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
  {
    id: "pie-pastel",
    name: "파스텔 파이",
    data: {
      slices: [
        { label: "A", value: 30, color: "EC4899" },
        { label: "B", value: 25, color: "06B6D4" },
        { label: "C", value: 25, color: "A78BFA" },
        { label: "D", value: 20, color: "F472B6" },
      ],
      style: "donut",
      bg: "FDF2F8",
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
  {
    id: "battery-pastel",
    name: "파스텔 배터리",
    data: {
      level: 80,
      color: "EC4899",
      bg: "FDF2F8",
      autoColor: false,
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
  {
    id: "testimonial-pastel",
    name: "파스텔 후기",
    data: {
      accentColor: "EC4899",
      bg: "FDF2F8",
      layout: "card",
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
  {
    id: "emoji-hearts",
    name: "하트 비",
    data: {
      emojis: "❤️💕💗💖💝",
      speed: "slow",
      density: "normal",
    },
  },
];

// Fortune Cookie
export const fortuneCookiePresets: Preset[] = [
  {
    id: "fortune-classic",
    name: "클래식 포춘",
    data: {
      bg: "FEF3C7",
      color: "92400E",
      accentColor: "F59E0B",
    },
  },
  {
    id: "fortune-dark",
    name: "다크 포춘",
    data: {
      bg: "1A1A2E",
      color: "E0E0E0",
      accentColor: "7C3AED",
    },
  },
  {
    id: "fortune-pastel",
    name: "파스텔 포춘",
    data: {
      bg: "FDF2F8",
      color: "831843",
      accentColor: "EC4899",
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
  {
    id: "changelog-pastel",
    name: "파스텔 변경로그",
    data: {
      accentColor: "EC4899",
      bg: "FDF2F8",
    },
  },
];

// Social Counter
export const socialCounterPresets: Preset[] = [
  {
    id: "social-creator",
    name: "크리에이터",
    data: {
      items: [{ platform: "YouTube", count: 12000 }, { platform: "Instagram", count: 8500 }],
      layout: "row", color: "E11D48",
    },
  },
  {
    id: "social-dev",
    name: "개발자",
    data: {
      items: [{ platform: "GitHub", count: 500 }, { platform: "Blog", count: 1200 }],
      layout: "row", color: "1E1E1E",
    },
  },
];

// Guestbook
export const guestbookPresets: Preset[] = [
  {
    id: "guestbook-purple",
    name: "보라 방명록",
    data: { title: "방명록", color: "6366F1", maxItems: 10 },
  },
  {
    id: "guestbook-dark",
    name: "다크 방명록",
    data: { title: "방명록", color: "7C3AED", bg: "1A1A2E", textColor: "E0E0E0" },
  },
];

// Poll
export const pollPresets: Preset[] = [
  {
    id: "poll-season",
    name: "계절 투표",
    data: { question: "좋아하는 계절은?", options: ["봄", "여름", "가을", "겨울"], color: "2563EB" },
  },
  {
    id: "poll-dark",
    name: "다크 투표",
    data: { question: "선택하세요", color: "7C3AED", bg: "1A1A2E", textColor: "E0E0E0" },
  },
];

// Vocabulary
export const vocabularyPresets: Preset[] = [
  {
    id: "vocab-daily",
    name: "오늘의 단어",
    data: { mode: "daily", color: "7C3AED" },
  },
  {
    id: "vocab-dark",
    name: "다크 단어장",
    data: { mode: "random", color: "22D3EE", bg: "0F172A", textColor: "E0E0E0" },
  },
];

// Mini Gallery
export const miniGalleryPresets: Preset[] = [
  {
    id: "gallery-fade",
    name: "페이드 갤러리",
    data: { transition: "fade", interval: 5, showDots: true },
  },
  {
    id: "gallery-slide",
    name: "슬라이드 갤러리",
    data: { transition: "slide", interval: 3, showDots: true },
  },
];

// ASCII Art
export const asciiArtPresets: Preset[] = [
  {
    id: "ascii-terminal",
    name: "터미널 스타일",
    data: { text: "HELLO", font: "standard", color: "22C55E", bg: "0F172A" },
  },
  {
    id: "ascii-banner",
    name: "배너 스타일",
    data: { text: "HI", font: "banner", color: "F59E0B", bg: "1E1E1E" },
  },
];

// Noise BG
export const noiseBgPresets: Preset[] = [
  {
    id: "noise-aurora",
    name: "오로라",
    data: { type: "gradient-flow", color1: "6366F1", color2: "06B6D4", speed: 1 },
  },
  {
    id: "noise-sunset",
    name: "석양",
    data: { type: "waves", color1: "F59E0B", color2: "E11D48", speed: 1 },
  },
];

// Daily Color
export const dailyColorPresets: Preset[] = [
  {
    id: "daily-full",
    name: "전체 정보",
    data: { showHex: true, showRgb: true, showName: true },
  },
  {
    id: "daily-minimal",
    name: "미니멀",
    data: { showHex: true, showRgb: false, showName: true, bg: "1E1E1E" },
  },
];

// Mini Map
export const miniMapPresets: Preset[] = [
  {
    id: "map-seoul",
    name: "서울",
    data: { lat: 37.5665, lon: 126.978, zoom: 13, label: "서울", color: "E11D48" },
  },
  {
    id: "map-tokyo",
    name: "도쿄",
    data: { lat: 35.6762, lon: 139.6503, zoom: 12, label: "Tokyo", color: "2563EB" },
  },
];

// Rating Card
export const ratingCardPresets: Preset[] = [
  {
    id: "rating-gold",
    name: "골드 별점",
    data: { title: "평가", rating: 4.5, maxStars: 5, color: "F59E0B" },
  },
  {
    id: "rating-dark",
    name: "다크 별점",
    data: { title: "리뷰", rating: 4.0, maxStars: 5, color: "F59E0B", bg: "1E1E1E", textColor: "FFFFFF" },
  },
];
