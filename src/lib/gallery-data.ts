export type GalleryCategory = "학생" | "감성" | "생산성" | "개발자" | "건강" | "독서" | "꾸미기" | "팀";

export interface GalleryShowcase {
  id: string;
  title: string;
  desc: string;
  category: GalleryCategory;
  layout: string;
  widgets: { label: string; url: string }[];
}

export const galleryCategories: GalleryCategory[] = [
  "학생", "감성", "생산성", "개발자", "건강", "독서", "꾸미기", "팀",
];

export const galleryShowcase: GalleryShowcase[] = [
  {
    id: "student-dashboard",
    title: "미니멀 학생 대시보드",
    desc: "수능 D-Day, 시간표, 뽀모도로를 조합한 학생 필수 세트",
    category: "학생",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "수능 D-Day", url: "/widget/dday?title=%EC%88%98%EB%8A%A5&date=2026-11-19&bg=1E1E1E&text=FFFFFF&color=6366F1" },
      { label: "시간표", url: "/widget/timetable?bg=1E1E1E&text=FFFFFF&color=6366F1" },
      { label: "뽀모도로", url: "/widget/pomodoro?work=25&break=5&color=6366F1&bg=1E1E1E&text=FFFFFF" },
    ],
  },
  {
    id: "aesthetic-note",
    title: "감성 노트 꾸미기",
    desc: "명언, 메모지, 그라데이션으로 노션을 감성적으로",
    category: "감성",
    layout: "grid-cols-1 sm:grid-cols-2",
    widgets: [
      { label: "명언 카드", url: "/widget/quote?text=%EC%98%A4%EB%8A%98%EB%8F%84+%ED%99%94%EC%9D%B4%ED%8C%85&author=%EB%82%98&font=serif&bg=FFF7ED&color=EA580C" },
      { label: "그라데이션", url: "/widget/gradient?colors=F472B6|A78BFA&dir=135&type=linear" },
      { label: "메모지", url: "/widget/sticky-note?text=%EC%98%A4%EB%8A%98+%ED%95%A0+%EC%9D%BC&noteColor=FBBF24&pin=pin" },
      { label: "타이핑 효과", url: "/widget/typewriter?texts=%EC%98%A4%EB%8A%98%EB%8F%84+%EC%A2%8B%EC%9D%80+%ED%95%98%EB%A3%A8|%ED%99%94%EC%9D%B4%ED%8C%85!&speed=60&cursor=bar&color=EA580C&bg=FFF7ED" },
    ],
  },
  {
    id: "goal-management",
    title: "목표 관리 세트",
    desc: "올해 진행률, 독서 목표, 습관 트래커를 한 곳에",
    category: "생산성",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "올해 진행률", url: "/widget/time-progress?type=year&color=22C55E&style=ring" },
      { label: "독서 목표", url: "/widget/reading?title=%ED%81%B4%EB%A6%B0%EC%BD%94%EB%93%9C&current=180&total=300&color=22C55E" },
      { label: "습관 트래커", url: "/widget/habit?title=%EC%9A%B4%EB%8F%99&view=week&color=22C55E" },
    ],
  },
  {
    id: "dark-productivity",
    title: "다크 모드 생산성",
    desc: "어두운 테마의 시계, 카운트다운, 투두리스트",
    category: "생산성",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "플립 시계", url: "/widget/flip-clock?flipColor=1E1E1E&textColor=FFFFFF&bg=0F172A" },
      { label: "투두리스트", url: "/widget/todo?title=%EC%98%A4%EB%8A%98+%ED%95%A0+%EC%9D%BC&items=%EB%AF%B8%ED%8C%85|%EC%BD%94%EB%94%A9|!%EB%A6%AC%EB%B7%B0&color=7C3AED&bg=1E1E1E&textColor=E2E8F0" },
      { label: "스톱워치", url: "/widget/stopwatch?btnColor=7C3AED&bg=1E1E1E&text=FFFFFF" },
    ],
  },
  {
    id: "developer-profile",
    title: "개발자 프로필",
    desc: "GitHub 잔디, 프로필 카드, QR 코드로 나만의 포트폴리오",
    category: "개발자",
    layout: "grid-cols-1 sm:grid-cols-2",
    widgets: [
      { label: "GitHub 잔디", url: "/widget/github-contribution?username=torvalds&year=last&color=22C55E&bg=0F172A&text=E2E8F0" },
      { label: "프로필 카드", url: "/widget/profile-card?bg=0F172A&text=E2E8F0&color=22C55E" },
      { label: "QR 코드", url: "/widget/qr-code?data=https://github.com&label=GitHub&fgColor=22C55E&bg=0F172A" },
      { label: "통계 카드", url: "/widget/stats-card?bg=0F172A&text=E2E8F0&color=22C55E" },
    ],
  },
  {
    id: "health-wellness",
    title: "건강 & 웰빙",
    desc: "호흡 타이머, 물 마시기, 달 위상으로 웰빙 루틴",
    category: "건강",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "호흡 타이머", url: "/widget/breathing?color=38BDF8&bg=0F172A&text=E2E8F0" },
      { label: "물 마시기", url: "/widget/water-tracker?color=38BDF8&bg=F0F9FF" },
      { label: "달 위상", url: "/widget/moon-phase?style=realistic&moonColor=F5F5DC&bg=0F172A&text=E2E8F0" },
    ],
  },
  {
    id: "reading-dashboard",
    title: "독서 기록 대시보드",
    desc: "읽기 진행률, 독서 목표, 명언으로 독서 습관 관리",
    category: "독서",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "읽기 진행률", url: "/widget/reading?title=%ED%81%B4%EB%A6%B0%EC%BD%94%EB%93%9C&current=210&total=300&color=F59E0B&bg=FFFBEB&text=92400E&style=ring" },
      { label: "독서 목표", url: "/widget/goal?title=%EC%98%AC%ED%95%B4+%EB%AA%A9%ED%91%9C+50%EA%B6%8C&current=23&target=50&unit=%EA%B6%8C&color=F59E0B&bg=FFFBEB&text=92400E" },
      { label: "독서 명언", url: "/widget/quote?text=%EC%B1%85%EC%9D%80+%EB%A7%88%EC%9D%8C%EC%9D%98+%EC%96%91%EC%8B%9D%EC%9D%B4%EB%8B%A4&author=%ED%82%A4%EC%BC%80%EB%A1%9C&font=serif&bg=FFFBEB&color=92400E" },
    ],
  },
  {
    id: "notion-header",
    title: "노션 헤더 꾸미기",
    desc: "그라데이션 배너 + 시계로 노션 페이지 상단을 꾸미기",
    category: "꾸미기",
    layout: "grid-cols-1 sm:grid-cols-2",
    widgets: [
      { label: "그라데이션 배너", url: "/widget/gradient?colors=6366F1|EC4899|F59E0B&dir=135&type=linear&text=Welcome&textColor=FFFFFF" },
      { label: "미니멀 시계", url: "/widget/clock?timezone=Asia/Seoul&format=24h&bg=1E1E2E&color=FFFFFF&font=mono&seconds=true&blink=true" },
    ],
  },
  {
    id: "team-collaboration",
    title: "팀 협업 대시보드",
    desc: "프로젝트 진행률, 타임라인, 카운트다운을 조합",
    category: "팀",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "프로젝트 진행", url: "/widget/stepper?bg=FFFFFF&text=1E1E1E&color=2563EB" },
      { label: "마감 타임라인", url: "/widget/timeline?events=%EB%94%94%EC%9E%90%EC%9D%B8~2026-03-15|%EA%B0%9C%EB%B0%9C~2026-04-01|QA~2026-04-15|%EC%B6%9C%EC%8B%9C~2026-05-01&color=2563EB&bg=FFFFFF&text=1E1E1E" },
      { label: "출시 D-Day", url: "/widget/dday?title=%EC%B6%9C%EC%8B%9C%EC%9D%BC&date=2026-05-01&bg=FFFFFF&text=1E1E1E&color=2563EB" },
    ],
  },
  {
    id: "retro-mood",
    title: "레트로 감성",
    desc: "플립 시계, 포춘 쿠키, 주사위로 레트로 무드",
    category: "감성",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "플립 시계", url: "/widget/flip-clock?flipColor=2D2B55&textColor=E2E8F0&gapColor=1E1E2E&bg=1E1E2E" },
      { label: "포춘 쿠키", url: "/widget/fortune-cookie?bg=1E1E2E&text=E2E8F0&color=F59E0B" },
      { label: "주사위", url: "/widget/dice?mode=dice&count=2&sides=6&color=6366F1&textColor=FFFFFF&bg=1E1E2E" },
    ],
  },
  {
    id: "self-improvement",
    title: "자기계발 트래커",
    desc: "습관, 물, 운동 목표를 한 페이지에서 관리",
    category: "건강",
    layout: "grid-cols-1 sm:grid-cols-2",
    widgets: [
      { label: "운동 습관", url: "/widget/habit?title=%EC%9A%B4%EB%8F%99&view=month&color=EF4444&bg=FFFFFF&text=1E1E1E" },
      { label: "물 마시기", url: "/widget/water-tracker?color=3B82F6&bg=FFFFFF" },
      { label: "독서 목표", url: "/widget/goal?title=%EB%8F%85%EC%84%9C&current=15&target=30&unit=%EA%B6%8C&color=22C55E&bg=FFFFFF&text=1E1E1E" },
      { label: "인생 달력", url: "/widget/life-calendar?birthdate=2000-01-01&lifespan=80&color=818CF8&bg=FFFFFF" },
    ],
  },
  {
    id: "pastel-cute",
    title: "파스텔 감성 꾸미기",
    desc: "부드러운 파스텔 컬러의 위젯 조합",
    category: "꾸미기",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "메모지", url: "/widget/sticky-note?text=%EC%98%A4%EB%8A%98%EC%9D%98+%EB%AA%A9%ED%91%9C&noteColor=FBCFE8&textColor=831843&pin=tape&font=gaegu" },
      { label: "캘린더", url: "/widget/mini-calendar?highlight=EC4899&bg=FFF1F2&text=831843" },
      { label: "배너", url: "/widget/banner?texts=%EC%98%A4%EB%8A%98%EB%8F%84+%ED%96%89%EB%B3%B5%ED%95%9C+%ED%95%98%EB%A3%A8&anim=fade&bg=FDF2F8&color=DB2777&bold=true" },
    ],
  },
  // --- 신규 6개 ---
  {
    id: "exam-countdown",
    title: "시험 카운트다운 세트",
    desc: "D-Day, 타임라인, 인생달력으로 시험까지 남은 시간을 시각화",
    category: "학생",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "수능 D-Day", url: "/widget/dday?title=%EC%88%98%EB%8A%A5&date=2026-11-19&bg=2563EB&text=FFFFFF&color=FFFFFF&dateFmt=dot" },
      { label: "시험 타임라인", url: "/widget/timeline?events=%EC%A4%91%EA%B0%84%EA%B3%A0%EC%82%AC~2026-04-20|%EA%B8%B0%EB%A7%90%EA%B3%A0%EC%82%AC~2026-06-25|%EC%88%98%EB%8A%A5~2026-11-19&color=2563EB&bg=F0F9FF&text=1E3A5F" },
      { label: "올해 진행률", url: "/widget/time-progress?type=year&color=2563EB&style=ring&bg=F0F9FF" },
    ],
  },
  {
    id: "coding-setup",
    title: "코딩 세션 대시보드",
    desc: "뽀모도로, 스톱워치, 카운터로 코딩 집중 환경 구축",
    category: "개발자",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "뽀모도로", url: "/widget/pomodoro?work=50&break=10&color=22C55E&bg=0F172A&text=E2E8F0&pStyle=ring" },
      { label: "스톱워치", url: "/widget/stopwatch?showMs=true&showLap=true&btnColor=22C55E&bg=0F172A&text=E2E8F0" },
      { label: "커밋 카운터", url: "/widget/counter?label=%EC%BB%A4%EB%B0%8B&initial=0&step=1&btnColor=22C55E&bg=0F172A" },
    ],
  },
  {
    id: "morning-routine",
    title: "모닝 루틴 체크",
    desc: "아침 습관과 하루 시작을 돕는 위젯 세트",
    category: "건강",
    layout: "grid-cols-1 sm:grid-cols-2",
    widgets: [
      { label: "아침 습관", url: "/widget/habit?title=%EC%95%84%EC%B9%A8+%EB%A3%A8%ED%8B%B4&view=week&weekStart=mon&color=F59E0B&bg=FFFBEB&text=78350F" },
      { label: "물 마시기", url: "/widget/water-tracker?color=38BDF8&bg=F0F9FF" },
      { label: "오늘의 명언", url: "/widget/quote?text=%EC%95%84%EC%B9%A8%EC%9D%80+%EC%83%88%EB%A1%9C%EC%9A%B4+%EC%8B%9C%EC%9E%91%EC%9D%B4%EB%8B%A4&author=%EB%82%98&font=serif&bg=FFFBEB&color=78350F" },
      { label: "하루 진행률", url: "/widget/time-progress?type=day&color=F59E0B&bg=FFFBEB&style=bar" },
    ],
  },
  {
    id: "bookworm",
    title: "책벌레 대시보드",
    desc: "여러 권의 독서 진행률을 한눈에 관리",
    category: "독서",
    layout: "grid-cols-1 sm:grid-cols-2",
    widgets: [
      { label: "현재 독서", url: "/widget/reading?title=%EC%9B%90%EC%94%BD+%EB%AF%B8%EB%93%9C%EB%82%98%EC%9D%B4%ED%8A%B8&current=120&total=400&color=7C3AED&bg=F5F3FF&text=4C1D95&style=ring" },
      { label: "연간 목표", url: "/widget/goal?title=%EC%98%AC%ED%95%B4+%EB%8F%85%EC%84%9C&current=18&target=52&unit=%EA%B6%8C&color=7C3AED&bg=F5F3FF&text=4C1D95&style=bar" },
      { label: "읽을 책 메모", url: "/widget/sticky-note?text=%EB%8B%A4%EC%9D%8C+%EC%9D%BD%EC%9D%84+%EC%B1%85%0A%EB%8D%B0%EB%AF%B8%EC%95%88%0A%EC%82%AC%ED%94%BC%EC%97%94%EC%8A%A4&noteColor=DDD6FE&textColor=4C1D95&pin=tape&font=gaegu" },
      { label: "독서 타이머", url: "/widget/stopwatch?btnColor=7C3AED&bg=F5F3FF&text=4C1D95" },
    ],
  },
  {
    id: "minimalist-dark-home",
    title: "미니멀 다크 홈",
    desc: "어두운 배경에 최소한의 위젯으로 깔끔한 노션 홈",
    category: "꾸미기",
    layout: "grid-cols-1 sm:grid-cols-3",
    widgets: [
      { label: "시계", url: "/widget/clock?timezone=Asia/Seoul&format=24h&font=mono&color=E2E8F0&bg=0F172A&seconds=false&date=true&dateFmt=short" },
      { label: "구분선", url: "/widget/gradient?colors=334155|0F172A&dir=90&type=linear" },
      { label: "배너", url: "/widget/banner?texts=Focus.+Build.+Ship.&anim=fade&bold=true&bg=0F172A&color=94A3B8&font=mono" },
    ],
  },
  {
    id: "team-sprint",
    title: "스프린트 보드",
    desc: "팀 스프린트 진행률과 마감일을 한눈에",
    category: "팀",
    layout: "grid-cols-1 sm:grid-cols-2",
    widgets: [
      { label: "스프린트 진행", url: "/widget/goal?title=%EC%8A%A4%ED%94%84%EB%A6%B0%ED%8A%B8+%EC%A7%84%ED%96%89&current=7&target=12&unit=%ED%83%9C%EC%8A%A4%ED%81%AC&color=2563EB&bg=FFFFFF&text=1E1E1E&style=bar" },
      { label: "데일리 카운터", url: "/widget/counter?label=%EC%99%84%EB%A3%8C+%ED%83%9C%EC%8A%A4%ED%81%AC&initial=0&step=1&btnColor=2563EB&bg=FFFFFF" },
      { label: "마감 D-Day", url: "/widget/dday?title=%EC%8A%A4%ED%94%84%EB%A6%B0%ED%8A%B8+%EC%A2%85%EB%A3%8C&date=2026-03-21&bg=2563EB&text=FFFFFF" },
      { label: "회의 타이머", url: "/widget/pomodoro?work=30&break=5&color=2563EB&bg=FFFFFF&text=1E1E1E" },
    ],
  },
];
