export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: number;
}

export const articles: BlogArticle[] = [
  {
    slug: "notion-widget-guide",
    title: "노션 꾸미기: 위젯으로 노션 페이지 꾸미는 법",
    description:
      "노션 위젯이 무엇인지, Widgit으로 위젯을 만들고 노션에 임베드하는 방법, 추천 위젯 조합까지 한 번에 알아보세요.",
    date: "2026-03-01",
    tags: ["노션", "위젯", "꾸미기", "임베드"],
    readTime: 5,
  },
  {
    slug: "notion-productivity-dashboard",
    title: "노션 생산성 대시보드 만들기",
    description:
      "D-Day, 뽀모도로 타이머, 습관 트래커, 진행률 바를 조합해 나만의 노션 생산성 대시보드를 구성하는 방법을 소개합니다.",
    date: "2026-03-01",
    tags: ["노션", "생산성", "대시보드", "뽀모도로"],
    readTime: 7,
  },
  {
    slug: "notion-habit-tracker",
    title: "노션 습관 트래커 만들기: 매일 체크하는 루틴 관리법",
    description:
      "노션에 습관 트래커 위젯을 임베드해 운동, 독서, 공부 등 매일의 습관을 시각적으로 관리하는 방법을 소개합니다.",
    date: "2026-03-01",
    tags: ["노션", "습관", "트래커", "루틴", "자기계발"],
    readTime: 5,
  },
  {
    slug: "notion-aesthetic-decoration",
    title: "노션 꾸미기 모음: 감성 위젯으로 예쁜 노션 만들기",
    description:
      "그라데이션, 메모지, 타이프라이터, 달 위상 등 감성 위젯으로 노션 페이지를 꾸미는 아이디어와 조합을 소개합니다.",
    date: "2026-03-01",
    tags: ["노션", "꾸미기", "감성", "디자인", "메모지"],
    readTime: 6,
  },
  {
    slug: "notion-student-dashboard",
    title: "학생을 위한 노션 대시보드: 시험·시간표·습관 관리",
    description:
      "수능 D-Day, 시간표, 뽀모도로, 습관 트래커를 활용해 학생 맞춤 노션 대시보드를 만드는 방법을 단계별로 알려드립니다.",
    date: "2026-03-01",
    tags: ["노션", "학생", "대시보드", "수능", "시간표"],
    readTime: 6,
  },
  {
    slug: "notion-dday-widget",
    title: "노션 D-Day 위젯 만들기: 수능·시험·기념일 카운트다운",
    description:
      "Widgit으로 D-Day 위젯을 만들고 노션에 임베드하는 방법을 단계별로 소개합니다. 시간 카운트다운, 프로그레스 바 등 고급 옵션도 다룹니다.",
    date: "2026-03-01",
    tags: ["노션", "D-Day", "카운트다운", "수능", "시험"],
    readTime: 5,
  },
  {
    slug: "notion-pomodoro-timer",
    title: "노션 뽀모도로 타이머 위젯: 집중력 높이는 시간관리법",
    description:
      "뽀모도로 기법의 원리와 Widgit 뽀모도로 타이머 위젯을 노션에 임베드하여 집중·휴식 사이클을 관리하는 방법을 알려드립니다.",
    date: "2026-03-01",
    tags: ["노션", "뽀모도로", "타이머", "집중", "시간관리"],
    readTime: 6,
  },
  {
    slug: "notion-clock-widget",
    title: "노션 시계 위젯 만들기: 미니멀·아날로그·플립 시계 총정리",
    description:
      "Widgit이 제공하는 4가지 시계 위젯(미니멀, 아날로그, 플립, 세계 시계)의 특징과 커스터마이징 방법을 비교 소개합니다.",
    date: "2026-03-01",
    tags: ["노션", "시계", "위젯", "미니멀", "아날로그"],
    readTime: 6,
  },
  {
    slug: "notion-github-contribution",
    title: "노션에 GitHub 잔디 위젯 임베드하기: 개발자 대시보드",
    description:
      "GitHub 기여 잔디 히트맵 위젯을 노션에 임베드하여 개발자 포트폴리오나 학습 기록 대시보드를 꾸미는 방법을 소개합니다.",
    date: "2026-03-01",
    tags: ["노션", "GitHub", "잔디", "개발자", "포트폴리오"],
    readTime: 5,
  },
  {
    slug: "notion-quote-widget",
    title: "노션 명언 위젯 만들기: 매일 동기부여 받는 방법",
    description:
      "좋아하는 명언이나 글귀를 감성적인 카드로 만들어 노션에 임베드하는 방법과 폰트·색상 커스터마이징 팁을 소개합니다.",
    date: "2026-03-01",
    tags: ["노션", "명언", "동기부여", "글귀", "감성"],
    readTime: 5,
  },
];

export function getArticle(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
