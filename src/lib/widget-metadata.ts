export interface WidgetMeta {
  name: string;
  desc: string;
}

export const widgetMetadata: Record<string, WidgetMeta> = {
  "dday": { name: "D-Day 위젯", desc: "목표일까지 남은 일수를 표시하는 노션 위젯" },
  "clock": { name: "미니멀 시계", desc: "미니멀한 타이포그래피 시계 노션 위젯" },
  "analog-clock": { name: "아날로그 시계", desc: "클래식한 아날로그 시계 노션 위젯" },
  "mini-calendar": { name: "미니 캘린더", desc: "깔끔한 월간 캘린더 노션 위젯" },
  "timeline": { name: "타임라인", desc: "여러 일정을 타임라인으로 나열하는 노션 위젯" },
  "flip-clock": { name: "플립 시계", desc: "레트로 스플릿 플랩 스타일 시계 노션 위젯" },
  "time-progress": { name: "시간 진행률 바", desc: "오늘·이번 달·올해의 진행률을 표시하는 노션 위젯" },
  "life-calendar": { name: "인생 달력", desc: "기대수명을 주 단위로 시각화하는 노션 위젯" },
  "reading": { name: "읽기 진행률", desc: "책 읽기 목표 진행률을 표시하는 노션 위젯" },
  "goal": { name: "목표 진행률", desc: "자유 단위의 목표 진행률을 표시하는 노션 위젯" },
  "pomodoro": { name: "뽀모도로 타이머", desc: "집중·휴식을 번갈아 관리하는 타이머 노션 위젯" },
  "stopwatch": { name: "스톱워치", desc: "경과 시간을 측정하는 스톱워치 노션 위젯" },
  "counter": { name: "카운터", desc: "숫자를 세고 기록하는 카운터 노션 위젯" },
  "habit": { name: "습관 트래커", desc: "주간·월간 습관 체크를 관리하는 노션 위젯" },
  "qr-code": { name: "QR 코드", desc: "URL이나 텍스트를 QR 코드로 생성하는 노션 위젯" },
  "dice": { name: "주사위", desc: "주사위·동전·랜덤 뽑기 도구 노션 위젯" },
  "quote": { name: "명언 카드", desc: "감성 명언 텍스트 카드 노션 위젯" },
  "banner": { name: "텍스트 배너", desc: "애니메이션 텍스트 배너 노션 위젯" },
  "bookmark": { name: "북마크", desc: "링크 카드를 만들어 표시하는 노션 위젯" },
  "music": { name: "음악 플레이어", desc: "장식용 음악 플레이어 카드 노션 위젯" },
  "weather": { name: "날씨", desc: "현재 날씨와 예보를 표시하는 노션 위젯" },
  "moon-phase": { name: "달 위상", desc: "현재 달 모양과 조도를 표시하는 노션 위젯" },
  "sticky-note": { name: "메모지", desc: "포스트잇 스타일 메모 카드 노션 위젯" },
  "gradient": { name: "그라데이션", desc: "CSS 그라데이션 배너/구분선 노션 위젯" },
};
