import type { LucideIcon } from "lucide-react";
import type { WidgetType } from "@/lib/templates";
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

function w(type: WidgetType, desc: string, tags: string[] = []): Widget {
  return { href: `/create/${type}`, type, icon: getWidgetIcon(type), name: getWidgetName(type), desc, tags: [type, ...tags] };
}

export const categories: WidgetCategory[] = [
  {
    title: "시간 & 날짜",
    widgets: [
      w("dday", "목표일까지 남은 일수를 표시합니다", ["countdown", "date", "디데이", "남은날"]),
      w("clock", "미니멀한 타이포그래피 시계를 표시합니다", ["time", "digital", "시간"]),
      w("analog-clock", "클래식한 아날로그 시계를 표시합니다", ["time", "watch", "시간"]),
      w("mini-calendar", "깔끔한 월간 캘린더를 표시합니다", ["calendar", "month", "달력"]),
      w("timeline", "여러 일정을 타임라인으로 나열합니다", ["schedule", "event", "일정"]),
      w("flip-clock", "레트로 스플릿 플랩 스타일 시계입니다", ["retro", "time", "시간"]),
      w("world-clock", "여러 타임존을 한눈에 비교합니다", ["timezone", "global", "세계"]),
      w("timetable", "주간 시간표를 표시합니다", ["schedule", "class", "수업"]),
      w("age-calculator", "생년월일 기반 정확한 나이를 표시합니다", ["birthday", "birth", "생일"]),
    ],
  },
  {
    title: "진행률 & 목표",
    widgets: [
      w("time-progress", "오늘·이번 달·올해의 진행률을 표시합니다", ["progress", "year", "연간", "월간"]),
      w("life-calendar", "기대수명을 주 단위로 시각화합니다", ["life", "mortality", "인생"]),
      w("reading", "책 읽기 목표 진행률을 표시합니다", ["book", "read", "독서"]),
      w("goal", "자유 단위의 목표 진행률을 표시합니다", ["target", "progress", "달성"]),
      w("water-tracker", "일일 물 섭취량을 트래킹합니다", ["water", "drink", "건강"]),
      w("stepper", "프로젝트 단계별 진행 상태를 표시합니다", ["step", "process", "프로젝트"]),
      w("battery", "배터리 모양의 진행률을 표시합니다", ["power", "charge", "충전"]),
      w("multi-progress", "여러 항목의 진행률을 비교합니다", ["compare", "multiple", "비교"]),
    ],
  },
  {
    title: "생산성 & 도구",
    widgets: [
      w("pomodoro", "집중·휴식을 번갈아 관리하는 타이머입니다", ["focus", "timer", "집중"]),
      w("stopwatch", "경과 시간을 측정하는 스톱워치입니다", ["timer", "lap", "측정"]),
      w("counter", "숫자를 세고 기록하는 카운터입니다", ["count", "number", "숫자"]),
      w("habit", "주간·월간 습관 체크를 관리합니다", ["tracker", "daily", "루틴"]),
      w("todo", "할 일 체크리스트를 관리합니다", ["task", "checklist", "할일"]),
      w("breathing", "명상·호흡 가이드 타이머입니다", ["meditation", "relax", "명상"]),
      w("countdown", "분·초 단위 카운트다운 타이머입니다", ["timer", "minute", "초"]),
      w("flashcard", "앞·뒤 카드로 암기를 도와줍니다", ["study", "memory", "공부"]),
      w("matrix", "아이젠하워 2×2 우선순위 매트릭스입니다", ["priority", "eisenhower", "우선순위"]),
      w("group", "여러 위젯을 하나로 합쳐 표시합니다", ["combine", "layout", "합치기", "묶음"]),
    ],
  },
  {
    title: "소셜 & 링크",
    widgets: [
      w("profile-card", "이름, 소개, SNS 링크가 포함된 명함 카드입니다", ["profile", "card", "명함", "소개"]),
      w("link-tree", "여러 링크를 세로로 나열한 버튼 목록입니다", ["links", "url", "링크모음"]),
      w("bookmark", "링크 카드를 만들어 표시합니다", ["link", "url", "즐겨찾기"]),
      w("github-contribution", "GitHub 기여 잔디 히트맵을 표시합니다", ["github", "grass", "잔디", "개발"]),
      w("testimonial", "리뷰·추천사 카드를 만듭니다", ["review", "feedback", "리뷰", "후기"]),
    ],
  },
  {
    title: "콘텐츠 & 장식",
    widgets: [
      w("quote", "감성 명언 텍스트 카드를 만듭니다", ["text", "motivation", "명언", "글귀"]),
      w("banner", "애니메이션 텍스트 배너를 만듭니다", ["text", "marquee", "텍스트", "글자"]),
      w("music", "장식용 음악 플레이어 카드입니다", ["player", "song", "음악", "노래"]),
      w("weather", "현재 날씨와 예보를 표시합니다", ["forecast", "temperature", "날씨", "기온"]),
      w("moon-phase", "현재 달 모양과 조도를 표시합니다", ["lunar", "night", "달", "밤"]),
      w("sticky-note", "포스트잇 스타일 메모 카드입니다", ["note", "memo", "메모", "포스트잇"]),
      w("gradient", "CSS 그라데이션 배너/구분선입니다", ["color", "background", "배경", "색상"]),
      w("typewriter", "텍스트가 타이핑되는 애니메이션 위젯입니다", ["typing", "animation", "타이핑"]),
      w("qr-code", "URL이나 텍스트를 QR 코드로 생성합니다", ["scan", "barcode", "스캔"]),
      w("dice", "주사위·동전·랜덤 뽑기 도구입니다", ["random", "coin", "주사위", "랜덤"]),
      w("stats-card", "KPI·통계 숫자를 표시합니다", ["number", "kpi", "통계", "숫자"]),
      w("color-palette", "컬러 스워치 팔레트를 표시합니다", ["color", "swatch", "컬러", "디자인"]),
      w("divider", "장식 구분선을 만듭니다", ["separator", "line", "구분", "선"]),
      w("image-card", "외부 이미지를 캡션과 함께 표시합니다", ["photo", "picture", "사진", "이미지"]),
      w("currency", "실시간 환율 정보를 표시합니다", ["exchange", "money", "환율", "돈"]),
      w("radar-chart", "스킬·능력치를 거미줄 차트로 시각화합니다", ["chart", "skill", "차트", "능력"]),
      w("pie-chart", "도넛/파이 차트로 비율을 시각화합니다", ["chart", "donut", "차트", "비율"]),
      w("emoji-rain", "이모지가 떨어지는 장식 애니메이션입니다", ["animation", "emoji", "이모지"]),
      w("changelog", "버전별 변경 이력을 표시합니다", ["version", "history", "변경", "업데이트"]),
      w("fortune-cookie", "랜덤 포춘 메시지를 보여줍니다", ["fortune", "random", "운세", "쿠키"]),
      w("badge", "텍스트 뱃지 라벨을 만듭니다", ["label", "tag", "뱃지", "라벨"]),
    ],
  },
];

export const allWidgets = categories.flatMap((c) =>
  c.widgets.map((w) => ({ ...w, category: c.title })),
);
