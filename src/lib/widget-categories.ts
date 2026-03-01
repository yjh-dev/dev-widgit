import type { LucideIcon } from "lucide-react";
import type { WidgetType } from "@/lib/templates";
import type { Locale } from "@/lib/i18n";
import { getWidgetIcon, getWidgetName } from "@/lib/widget-names";

export interface Widget {
  href: string;
  type: WidgetType;
  icon: LucideIcon;
  name: string;
  desc: string;
  tags: string[];
}

export interface WidgetCategory {
  title: string;
  widgets: Widget[];
}

interface RawWidget {
  type: WidgetType;
  descKo: string;
  descEn: string;
  tags: string[];
}

interface RawCategory {
  titleKo: string;
  titleEn: string;
  widgets: RawWidget[];
}

function rw(type: WidgetType, descKo: string, descEn: string, tags: string[] = []): RawWidget {
  return { type, descKo, descEn, tags: [type, ...tags] };
}

const rawCategories: RawCategory[] = [
  {
    titleKo: "시간 & 날짜",
    titleEn: "Time & Date",
    widgets: [
      rw("dday", "목표일까지 남은 일수를 표시합니다", "Shows days remaining until your target date", ["countdown", "date", "디데이", "남은날"]),
      rw("clock", "미니멀한 타이포그래피 시계를 표시합니다", "Displays a minimal typography clock", ["time", "digital", "시간"]),
      rw("analog-clock", "클래식한 아날로그 시계를 표시합니다", "Displays a classic analog clock", ["time", "watch", "시간"]),
      rw("mini-calendar", "깔끔한 월간 캘린더를 표시합니다", "Shows a clean monthly calendar", ["calendar", "month", "달력"]),
      rw("timeline", "여러 일정을 타임라인으로 나열합니다", "Lists multiple events in a timeline", ["schedule", "event", "일정"]),
      rw("flip-clock", "레트로 스플릿 플랩 스타일 시계입니다", "A retro split-flap style clock", ["retro", "time", "시간"]),
      rw("world-clock", "여러 타임존을 한눈에 비교합니다", "Compare multiple time zones at a glance", ["timezone", "global", "세계"]),
      rw("timetable", "주간 시간표를 표시합니다", "Shows a weekly timetable", ["schedule", "class", "수업"]),
      rw("age-calculator", "생년월일 기반 정확한 나이를 표시합니다", "Shows precise age based on birth date", ["birthday", "birth", "생일"]),
    ],
  },
  {
    titleKo: "진행률 & 목표",
    titleEn: "Progress & Goals",
    widgets: [
      rw("time-progress", "오늘·이번 달·올해의 진행률을 표시합니다", "Shows progress of today, this month, or this year", ["progress", "year", "연간", "월간"]),
      rw("life-calendar", "기대수명을 주 단위로 시각화합니다", "Visualizes life expectancy in weekly cells", ["life", "mortality", "인생"]),
      rw("reading", "책 읽기 목표 진행률을 표시합니다", "Tracks reading progress toward your goal", ["book", "read", "독서"]),
      rw("goal", "자유 단위의 목표 진행률을 표시합니다", "Tracks goal progress with any unit", ["target", "progress", "달성"]),
      rw("water-tracker", "일일 물 섭취량을 트래킹합니다", "Tracks daily water intake", ["water", "drink", "건강"]),
      rw("stepper", "프로젝트 단계별 진행 상태를 표시합니다", "Shows project step-by-step progress", ["step", "process", "프로젝트"]),
      rw("battery", "배터리 모양의 진행률을 표시합니다", "Shows progress in a battery shape", ["power", "charge", "충전"]),
      rw("multi-progress", "여러 항목의 진행률을 비교합니다", "Compares progress across multiple items", ["compare", "multiple", "비교"]),
    ],
  },
  {
    titleKo: "생산성 & 도구",
    titleEn: "Productivity & Tools",
    widgets: [
      rw("pomodoro", "집중·휴식을 번갈아 관리하는 타이머입니다", "Alternates focus and break sessions", ["focus", "timer", "집중"]),
      rw("stopwatch", "경과 시간을 측정하는 스톱워치입니다", "Measures elapsed time with lap recording", ["timer", "lap", "측정"]),
      rw("counter", "숫자를 세고 기록하는 카운터입니다", "Counts and records numbers", ["count", "number", "숫자"]),
      rw("habit", "주간·월간 습관 체크를 관리합니다", "Manages weekly/monthly habit tracking", ["tracker", "daily", "루틴"]),
      rw("todo", "할 일 체크리스트를 관리합니다", "Manages a task checklist", ["task", "checklist", "할일"]),
      rw("breathing", "명상·호흡 가이드 타이머입니다", "A meditation and breathing guide timer", ["meditation", "relax", "명상"]),
      rw("countdown", "분·초 단위 카운트다운 타이머입니다", "A countdown timer in minutes and seconds", ["timer", "minute", "초"]),
      rw("flashcard", "앞·뒤 카드로 암기를 도와줍니다", "Helps memorize with front/back cards", ["study", "memory", "공부"]),
      rw("matrix", "아이젠하워 2×2 우선순위 매트릭스입니다", "Eisenhower 2×2 priority matrix", ["priority", "eisenhower", "우선순위"]),
      rw("group", "여러 위젯을 하나로 합쳐 표시합니다", "Combines multiple widgets into one", ["combine", "layout", "합치기", "묶음"]),
    ],
  },
  {
    titleKo: "소셜 & 링크",
    titleEn: "Social & Links",
    widgets: [
      rw("profile-card", "이름, 소개, SNS 링크가 포함된 명함 카드입니다", "A card with name, bio, and social links", ["profile", "card", "명함", "소개"]),
      rw("link-tree", "여러 링크를 세로로 나열한 버튼 목록입니다", "A vertical list of link buttons", ["links", "url", "링크모음"]),
      rw("bookmark", "링크 카드를 만들어 표시합니다", "Creates and displays link cards", ["link", "url", "즐겨찾기"]),
      rw("github-contribution", "GitHub 기여 잔디 히트맵을 표시합니다", "Shows GitHub contribution heatmap", ["github", "grass", "잔디", "개발"]),
      rw("testimonial", "리뷰·추천사 카드를 만듭니다", "Creates review and testimonial cards", ["review", "feedback", "리뷰", "후기"]),
    ],
  },
  {
    titleKo: "콘텐츠 & 장식",
    titleEn: "Content & Decoration",
    widgets: [
      rw("quote", "감성 명언 텍스트 카드를 만듭니다", "Creates aesthetic quote text cards", ["text", "motivation", "명언", "글귀"]),
      rw("banner", "애니메이션 텍스트 배너를 만듭니다", "Creates animated text banners", ["text", "marquee", "텍스트", "글자"]),
      rw("music", "장식용 음악 플레이어 카드입니다", "A decorative music player card", ["player", "song", "음악", "노래"]),
      rw("weather", "현재 날씨와 예보를 표시합니다", "Shows current weather and forecast", ["forecast", "temperature", "날씨", "기온"]),
      rw("moon-phase", "현재 달 모양과 조도를 표시합니다", "Shows current moon shape and illumination", ["lunar", "night", "달", "밤"]),
      rw("sticky-note", "포스트잇 스타일 메모 카드입니다", "A post-it style memo card", ["note", "memo", "메모", "포스트잇"]),
      rw("gradient", "CSS 그라데이션 배너/구분선입니다", "A CSS gradient banner or divider", ["color", "background", "배경", "색상"]),
      rw("typewriter", "텍스트가 타이핑되는 애니메이션 위젯입니다", "An animated typing text widget", ["typing", "animation", "타이핑"]),
      rw("qr-code", "URL이나 텍스트를 QR 코드로 생성합니다", "Generates QR codes from URLs or text", ["scan", "barcode", "스캔"]),
      rw("dice", "주사위·동전·랜덤 뽑기 도구입니다", "Dice, coin flip, and random picker", ["random", "coin", "주사위", "랜덤"]),
      rw("stats-card", "KPI·통계 숫자를 표시합니다", "Displays KPI and statistics", ["number", "kpi", "통계", "숫자"]),
      rw("color-palette", "컬러 스워치 팔레트를 표시합니다", "Shows a color swatch palette", ["color", "swatch", "컬러", "디자인"]),
      rw("divider", "장식 구분선을 만듭니다", "Creates decorative dividers", ["separator", "line", "구분", "선"]),
      rw("image-card", "외부 이미지를 캡션과 함께 표시합니다", "Displays external images with captions", ["photo", "picture", "사진", "이미지"]),
      rw("currency", "실시간 환율 정보를 표시합니다", "Shows real-time exchange rates", ["exchange", "money", "환율", "돈"]),
      rw("radar-chart", "스킬·능력치를 거미줄 차트로 시각화합니다", "Visualizes skills in a radar chart", ["chart", "skill", "차트", "능력"]),
      rw("pie-chart", "도넛/파이 차트로 비율을 시각화합니다", "Visualizes ratios in a donut/pie chart", ["chart", "donut", "차트", "비율"]),
      rw("emoji-rain", "이모지가 떨어지는 장식 애니메이션입니다", "A decorative emoji rain animation", ["animation", "emoji", "이모지"]),
      rw("changelog", "버전별 변경 이력을 표시합니다", "Shows version-based changelog", ["version", "history", "변경", "업데이트"]),
      rw("fortune-cookie", "랜덤 포춘 메시지를 보여줍니다", "Shows random fortune messages", ["fortune", "random", "운세", "쿠키"]),
      rw("badge", "텍스트 뱃지 라벨을 만듭니다", "Creates text badge labels", ["label", "tag", "뱃지", "라벨"]),
    ],
  },
];

function buildCategories(locale: Locale): WidgetCategory[] {
  return rawCategories.map((rc) => ({
    title: locale === "en" ? rc.titleEn : rc.titleKo,
    widgets: rc.widgets.map((rw) => ({
      href: `/create/${rw.type}`,
      type: rw.type,
      icon: getWidgetIcon(rw.type),
      name: getWidgetName(rw.type, locale),
      desc: locale === "en" ? rw.descEn : rw.descKo,
      tags: rw.tags,
    })),
  }));
}

/** Default Korean categories for backward compatibility */
export const categories: WidgetCategory[] = buildCategories("ko");

/** Get locale-aware categories */
export function getCategories(locale: Locale): WidgetCategory[] {
  return buildCategories(locale);
}

export const allWidgets = categories.flatMap((c) =>
  c.widgets.map((w) => ({ ...w, category: c.title })),
);

export function getAllWidgets(locale: Locale) {
  return getCategories(locale).flatMap((c) =>
    c.widgets.map((w) => ({ ...w, category: c.title })),
  );
}
