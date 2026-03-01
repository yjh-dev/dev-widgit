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
];

export function getArticle(slug: string): BlogArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
