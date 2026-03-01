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
  Award,
  Cookie,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { WidgetType } from "@/lib/templates";

interface WidgetMeta {
  name: string;
  nameEn: string;
  icon: LucideIcon;
}

const widgetMetaMap: Record<WidgetType, WidgetMeta> = {
  dday: { name: "D-Day 위젯", nameEn: "D-Day", icon: CalendarDays },
  clock: { name: "미니멀 시계", nameEn: "Minimal Clock", icon: Clock },
  "analog-clock": { name: "아날로그 시계", nameEn: "Analog Clock", icon: Gauge },
  "mini-calendar": { name: "미니 캘린더", nameEn: "Mini Calendar", icon: Calendar },
  timeline: { name: "타임라인", nameEn: "Timeline", icon: ListTodo },
  "flip-clock": { name: "플립 시계", nameEn: "Flip Clock", icon: FlipVertical },
  "time-progress": { name: "시간 진행률 바", nameEn: "Time Progress Bar", icon: TrendingUp },
  "life-calendar": { name: "인생 달력 위젯", nameEn: "Life Calendar", icon: Grid3X3 },
  reading: { name: "읽기 진행률", nameEn: "Reading Progress", icon: BookOpen },
  goal: { name: "목표 진행률", nameEn: "Goal Progress", icon: Target },
  pomodoro: { name: "뽀모도로 타이머", nameEn: "Pomodoro Timer", icon: Timer },
  stopwatch: { name: "스톱워치", nameEn: "Stopwatch", icon: Hourglass },
  counter: { name: "카운터", nameEn: "Counter", icon: Hash },
  habit: { name: "습관 트래커", nameEn: "Habit Tracker", icon: CheckSquare },
  "qr-code": { name: "QR 코드", nameEn: "QR Code", icon: QrCode },
  dice: { name: "주사위", nameEn: "Dice", icon: Dice5 },
  quote: { name: "명언 카드", nameEn: "Quote Card", icon: Quote },
  banner: { name: "텍스트 배너", nameEn: "Text Banner", icon: Type },
  bookmark: { name: "북마크", nameEn: "Bookmark", icon: LinkIcon },
  music: { name: "음악 플레이어", nameEn: "Music Player", icon: Music },
  weather: { name: "날씨", nameEn: "Weather", icon: CloudSun },
  "moon-phase": { name: "달 위상", nameEn: "Moon Phase", icon: Moon },
  "sticky-note": { name: "메모지", nameEn: "Sticky Note", icon: StickyNote },
  gradient: { name: "그라데이션", nameEn: "Gradient", icon: Blend },
  typewriter: { name: "타이핑 효과", nameEn: "Typewriter", icon: TextCursorInput },
  todo: { name: "투두리스트", nameEn: "Todo List", icon: ListChecks },
  "github-contribution": { name: "GitHub 잔디", nameEn: "GitHub Contributions", icon: GitBranch },
  "profile-card": { name: "프로필 카드", nameEn: "Profile Card", icon: UserCircle },
  "link-tree": { name: "링크 트리", nameEn: "Link Tree", icon: List },
  breathing: { name: "호흡 타이머", nameEn: "Breathing Timer", icon: Wind },
  "world-clock": { name: "세계 시계", nameEn: "World Clock", icon: Globe },
  countdown: { name: "카운트다운", nameEn: "Countdown", icon: TimerReset },
  "stats-card": { name: "통계 카드", nameEn: "Stats Card", icon: BarChart3 },
  "color-palette": { name: "컬러 팔레트", nameEn: "Color Palette", icon: Palette },
  divider: { name: "구분선", nameEn: "Divider", icon: Minus },
  timetable: { name: "시간표", nameEn: "Timetable", icon: Table },
  flashcard: { name: "플래시카드", nameEn: "Flashcard", icon: Layers },
  "water-tracker": { name: "물 마시기", nameEn: "Water Tracker", icon: Droplets },
  "image-card": { name: "이미지 카드", nameEn: "Image Card", icon: Image },
  currency: { name: "환율", nameEn: "Currency", icon: DollarSign },
  "age-calculator": { name: "나이 계산기", nameEn: "Age Calculator", icon: Cake },
  "radar-chart": { name: "레이더 차트", nameEn: "Radar Chart", icon: Radar },
  "pie-chart": { name: "도넛 차트", nameEn: "Pie Chart", icon: PieChart },
  stepper: { name: "단계 진행", nameEn: "Stepper", icon: ListOrdered },
  battery: { name: "배터리", nameEn: "Battery", icon: BatteryMedium },
  testimonial: { name: "후기 카드", nameEn: "Testimonial", icon: MessageSquareQuote },
  "emoji-rain": { name: "이모지 비", nameEn: "Emoji Rain", icon: CloudRain },
  changelog: { name: "변경 로그", nameEn: "Changelog", icon: FileText },
  matrix: { name: "매트릭스", nameEn: "Matrix", icon: Grid2X2 },
  "multi-progress": { name: "멀티 프로그레스", nameEn: "Multi Progress", icon: BarChartHorizontal },
  badge: { name: "뱃지", nameEn: "Badge", icon: Award },
  "fortune-cookie": { name: "포춘 쿠키", nameEn: "Fortune Cookie", icon: Cookie },
  group: { name: "위젯 그룹", nameEn: "Widget Group", icon: Layers },
};

export function getWidgetName(type: WidgetType, locale: "ko" | "en" = "ko"): string {
  const meta = widgetMetaMap[type];
  if (!meta) return type;
  return locale === "en" ? meta.nameEn : meta.name;
}

export function getWidgetIcon(type: WidgetType): LucideIcon {
  return widgetMetaMap[type]?.icon ?? Clock;
}

export function getWidgetMeta(type: WidgetType): WidgetMeta {
  return widgetMetaMap[type] ?? { name: type, nameEn: type, icon: Clock };
}
