import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  Clock,
  CloudSun,
  Gauge,
  Grid3X3,
  Hash,
  Calendar,
  Hourglass,
  Link as LinkIcon,
  ListTodo,
  Music,
  Quote,
  Target,
  Timer,
  TrendingUp,
  Type,
  Blend,
  StickyNote,
  FlipVertical,
  Moon,
  Dice5,
  QrCode,
  TextCursorInput,
  ListChecks,
  GitBranch,
  UserCircle,
  List,
  Wind,
  Globe,
  TimerReset,
  BarChart3,
  Palette,
  Minus,
  Table,
  Layers,
  Droplets,
  Image,
  DollarSign,
  Cake,
  Radar,
  PieChart,
  ListOrdered,
  BatteryMedium,
  MessageSquareQuote,
  CloudRain,
  FileText,
  Grid2X2,
  BarChartHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { WidgetType } from "@/lib/templates";

interface WidgetMeta {
  name: string;
  icon: LucideIcon;
}

const widgetMetaMap: Record<WidgetType, WidgetMeta> = {
  dday: { name: "D-Day 위젯", icon: CalendarDays },
  clock: { name: "미니멀 시계", icon: Clock },
  "analog-clock": { name: "아날로그 시계", icon: Gauge },
  "mini-calendar": { name: "미니 캘린더", icon: Calendar },
  timeline: { name: "타임라인", icon: ListTodo },
  "flip-clock": { name: "플립 시계", icon: FlipVertical },
  "time-progress": { name: "시간 진행률 바", icon: TrendingUp },
  "life-calendar": { name: "인생 달력 위젯", icon: Grid3X3 },
  reading: { name: "읽기 진행률", icon: BookOpen },
  goal: { name: "목표 진행률", icon: Target },
  pomodoro: { name: "뽀모도로 타이머", icon: Timer },
  stopwatch: { name: "스톱워치", icon: Hourglass },
  counter: { name: "카운터", icon: Hash },
  habit: { name: "습관 트래커", icon: CheckSquare },
  "qr-code": { name: "QR 코드", icon: QrCode },
  dice: { name: "주사위", icon: Dice5 },
  quote: { name: "명언 카드", icon: Quote },
  banner: { name: "텍스트 배너", icon: Type },
  bookmark: { name: "북마크", icon: LinkIcon },
  music: { name: "음악 플레이어", icon: Music },
  weather: { name: "날씨", icon: CloudSun },
  "moon-phase": { name: "달 위상", icon: Moon },
  "sticky-note": { name: "메모지", icon: StickyNote },
  gradient: { name: "그라데이션", icon: Blend },
  typewriter: { name: "타이핑 효과", icon: TextCursorInput },
  todo: { name: "투두리스트", icon: ListChecks },
  "github-contribution": { name: "GitHub 잔디", icon: GitBranch },
  "profile-card": { name: "프로필 카드", icon: UserCircle },
  "link-tree": { name: "링크 트리", icon: List },
  breathing: { name: "호흡 타이머", icon: Wind },
  "world-clock": { name: "세계 시계", icon: Globe },
  countdown: { name: "카운트다운", icon: TimerReset },
  "stats-card": { name: "통계 카드", icon: BarChart3 },
  "color-palette": { name: "컬러 팔레트", icon: Palette },
  divider: { name: "구분선", icon: Minus },
  timetable: { name: "시간표", icon: Table },
  flashcard: { name: "플래시카드", icon: Layers },
  "water-tracker": { name: "물 마시기", icon: Droplets },
  "image-card": { name: "이미지 카드", icon: Image },
  currency: { name: "환율", icon: DollarSign },
  "age-calculator": { name: "나이 계산기", icon: Cake },
  "radar-chart": { name: "레이더 차트", icon: Radar },
  "pie-chart": { name: "도넛 차트", icon: PieChart },
  stepper: { name: "단계 진행", icon: ListOrdered },
  battery: { name: "배터리", icon: BatteryMedium },
  testimonial: { name: "후기 카드", icon: MessageSquareQuote },
  "emoji-rain": { name: "이모지 비", icon: CloudRain },
  changelog: { name: "변경 로그", icon: FileText },
  matrix: { name: "매트릭스", icon: Grid2X2 },
  "multi-progress": { name: "멀티 프로그레스", icon: BarChartHorizontal },
};

export function getWidgetName(type: WidgetType): string {
  return widgetMetaMap[type]?.name ?? type;
}

export function getWidgetIcon(type: WidgetType): LucideIcon {
  return widgetMetaMap[type]?.icon ?? Clock;
}

export function getWidgetMeta(type: WidgetType): WidgetMeta {
  return widgetMetaMap[type] ?? { name: type, icon: Clock };
}
