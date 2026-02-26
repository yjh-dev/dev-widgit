# Widgit — 노션 전용 위젯 생성 서비스

## 프로젝트 개요
URL 파라미터만으로 동작하는 **무상태(stateless) 노션 임베드 위젯** 생성 서비스.
서버·DB 없이 클라이언트 사이드에서 모든 렌더링을 처리한다.

## 궁극적 목표
경쟁 서비스(Indify, Nodi.so, WidgetBox)를 뛰어넘는 **고품질 노션 위젯 서비스** 구축.
- 다양한 위젯 라인업 (현재 10종 → 지속 확장)
- 세밀한 커스터마이징 (공통 스타일 + 위젯별 고유 옵션)
- 접이식 아코디언 UI로 복잡한 옵션을 깔끔하게 정리
- 무상태 아키텍처로 서버 비용 제로, 무한 확장성

## 기술 스택
- **프레임워크**: Next.js 16.1.6 (App Router, Turbopack)
- **언어**: TypeScript 5 (strict mode)
- **UI**: Tailwind CSS 4 + shadcn/ui (Radix UI 기반)
- **상태 관리**: Zustand 5
- **날짜 처리**: date-fns 4
- **아이콘**: lucide-react
- **다크 모드**: next-themes (system/light/dark)
- **패키지 매니저**: npm

## 디렉토리 구조
```
src/
├── app/
│   ├── page.tsx                          # 홈 — 위젯 목록
│   ├── create/
│   │   ├── dday/page.tsx                 # D-Day 위젯 에디터
│   │   ├── life-calendar/page.tsx        # 인생 달력 위젯 에디터
│   │   ├── time-progress/page.tsx        # 시간 진행률 바 위젯 에디터
│   │   ├── clock/page.tsx                # 미니멀 시계 위젯 에디터
│   │   ├── quote/page.tsx                # 명언 카드 위젯 에디터
│   │   ├── pomodoro/page.tsx             # 뽀모도로 타이머 위젯 에디터
│   │   ├── mini-calendar/page.tsx        # 미니 캘린더 위젯 에디터
│   │   ├── analog-clock/page.tsx         # 아날로그 시계 위젯 에디터
│   │   ├── counter/page.tsx              # 카운터 위젯 에디터
│   │   └── weather/page.tsx              # 날씨 위젯 에디터
│   └── widget/
│       ├── dday/page.tsx                 # D-Day 위젯 렌더링 (iframe용)
│       ├── life-calendar/page.tsx        # 인생 달력 위젯 렌더링 (iframe용)
│       ├── time-progress/page.tsx        # 시간 진행률 바 위젯 렌더링
│       ├── clock/page.tsx                # 미니멀 시계 위젯 렌더링
│       ├── quote/page.tsx                # 명언 카드 위젯 렌더링
│       ├── pomodoro/page.tsx             # 뽀모도로 타이머 위젯 렌더링
│       ├── mini-calendar/page.tsx        # 미니 캘린더 위젯 렌더링
│       ├── analog-clock/page.tsx         # 아날로그 시계 위젯 렌더링
│       ├── counter/page.tsx              # 카운터 위젯 렌더링
│       └── weather/page.tsx              # 날씨 위젯 렌더링
├── components/
│   ├── ui/                               # shadcn 공통 UI + 커스텀 공통 컴포넌트
│   │   ├── accordion.tsx                 # shadcn — 접이식 패널 (에디터 섹션용)
│   │   ├── button, card, input, label, select, switch, sonner  # shadcn
│   │   ├── color-picker.tsx              # 커스텀 — hex 입력 + 네이티브 피커 + 프리셋 스워치
│   │   └── theme-toggle.tsx              # 다크모드 토글 버튼 (Sun/Moon)
│   ├── editor/                           # 에디터 공통 컴포넌트
│   │   ├── EditorLayout.tsx              # 에디터 페이지 레이아웃 (좌측 폼 + 우측 프리뷰)
│   │   ├── EditorActions.tsx             # URL 복사 + 초기화 버튼
│   │   ├── EditorSection.tsx             # 아코디언 기반 접이식 섹션 래퍼
│   │   └── CommonStyleOptions.tsx        # 공통 스타일 옵션 (모서리/여백/글자크기)
│   ├── home/                             # 홈 페이지 컴포넌트
│   │   └── WidgetThumbnail.tsx           # 위젯 라이브 미니 프리뷰 (CSS scale 축소)
│   ├── ThemeProvider.tsx                 # next-themes 클라이언트 래퍼
│   └── widget/                           # 위젯 프리뷰 컴포넌트
│       ├── DdayWidgetPreview.tsx
│       ├── DdayProgressBar.tsx
│       ├── LifeCalendarPreview.tsx
│       ├── TimeProgressPreview.tsx
│       ├── ClockPreview.tsx
│       ├── QuotePreview.tsx
│       ├── PomodoroPreview.tsx
│       ├── MiniCalendarPreview.tsx
│       ├── AnalogClockPreview.tsx
│       ├── CounterPreview.tsx
│       └── WeatherPreview.tsx
├── lib/                                  # 순수 유틸리티 (UI 무관)
│   ├── dday.ts
│   ├── life-calendar.ts
│   ├── time-progress.ts
│   ├── clock.ts
│   ├── quote.ts
│   ├── pomodoro.ts
│   ├── mini-calendar.ts
│   ├── analog-clock.ts
│   ├── counter.ts
│   ├── weather.ts
│   ├── common-widget-options.ts          # 공통 스타일 타입/옵션/파서
│   ├── fonts.ts
│   └── utils.ts                          # cn() — clsx + tailwind-merge
└── store/                                # Zustand 스토어 (에디터 페이지 전용)
    ├── useWidgetStore.ts                 # D-Day 위젯 상태
    ├── useLifeCalendarStore.ts           # 인생 달력 위젯 상태
    ├── useTimeProgressStore.ts           # 시간 진행률 바 위젯 상태
    ├── useClockStore.ts                  # 미니멀 시계 위젯 상태
    ├── useQuoteStore.ts                  # 명언 카드 위젯 상태
    ├── usePomodoroStore.ts               # 뽀모도로 타이머 위젯 상태
    ├── useMiniCalendarStore.ts           # 미니 캘린더 위젯 상태
    ├── useAnalogClockStore.ts            # 아날로그 시계 위젯 상태
    ├── useCounterStore.ts                # 카운터 위젯 상태
    └── useWeatherStore.ts                # 날씨 위젯 상태
```

## 핵심 아키텍처 패턴

### 무상태 URL 파라미터 방식
모든 위젯 설정은 URL 쿼리 파라미터로 전달된다. DB/API 호출 없음.
- `/widget/dday?title=수능&date=2026-11-19&bg=1E1E1E&text=FFFFFF`
- `/widget/life-calendar?birthdate=1995-03-15&lifespan=90&color=22C55E`
- `/widget/time-progress?type=year&color=2563EB`
- `/widget/clock?timezone=Asia/Seoul&format=24h&font=mono`
- `/widget/quote?text=오늘도+화이팅&author=작자미상&font=serif`
- `/widget/pomodoro?work=25&break=5&color=E11D48`
- `/widget/mini-calendar?weekStart=mon&lang=ko&highlight=2563EB`
- `/widget/analog-clock?timezone=Asia/Seoul&showNumbers=true&numStyle=quarter`
- `/widget/counter?label=카운터&initial=0&step=1&btnColor=2563EB`
- `/widget/weather?lat=37.5665&lon=126.978&city=서울&unit=celsius`

### 다크 모드 아키텍처
- `next-themes` + `attribute="class"` + `defaultTheme="system"`
- `ThemeProvider` 클라이언트 래퍼가 `layout.tsx`에서 `<body>` 감싸기
- 홈/에디터 페이지는 CSS 변수 기반으로 자동 다크 모드 대응
- `/widget/*` 렌더링 페이지는 URL 파라미터의 hex 색상을 직접 사용하므로 다크 모드 영향 없음
- `ThemeToggle` 버튼: 홈 히어로 + 에디터 헤더에 배치

### 위젯 추가 시 따라야 할 패턴 (6개 파일)
1. `src/lib/<widget>.ts` — 계산 로직 (순수 함수)
2. `src/store/use<Widget>Store.ts` — Zustand 스토어 (에디터용)
3. `src/components/widget/<Widget>Preview.tsx` — 프리뷰 컴포넌트
4. `src/app/widget/<widget>/page.tsx` — 위젯 렌더링 페이지 (`useSearchParams` + `Suspense`)
5. `src/app/create/<widget>/page.tsx` — 에디터 페이지 (`EditorSection` 아코디언 구조)
6. `src/app/page.tsx` — 홈에 카드 링크 추가

### 에디터 페이지 구조 (아코디언 패턴)
각 에디터 페이지는 `EditorSection` 컴포넌트로 옵션을 기능별 그룹으로 정리한다.
- **기본 설정** (기본 열림) — 핵심 위젯 설정
- **위젯 고유 옵션** (기본 열림) — 표시/텍스트/셀 등
- **색상** (기본 열림) — 색상 피커 + 투명 배경
- **스타일** (기본 접힘) — 모서리 둥글기, 안쪽 여백, 글자 크기

```tsx
<EditorSection
  defaultOpen={["basic", "display", "color"]}
  sections={[
    { id: "basic", title: "기본 설정", children: ... },
    { id: "display", title: "표시 옵션", children: ... },
    { id: "color", title: "색상", children: ... },
    { id: "style", title: "스타일", children: ... },
  ]}
/>
```

### 공통 스타일 옵션 시스템
모든 6개 위젯에 적용되는 공통 커스터마이징 옵션:

| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 모서리 둥글기 | `radius` | `0\|8\|16\|24\|9999` | `16` |
| 안쪽 여백 | `pad` | `8\|16\|24\|32` | `24` |
| 글자 크기 | `fsize` | `sm\|md\|lg\|xl` | `md` |

- `src/lib/common-widget-options.ts` — 타입, 옵션 배열, URL 파서
- `src/components/editor/CommonStyleOptions.tsx` — 재사용 가능한 Select 3개

### 날짜 처리 규칙
시간대 안전을 위해 `new Date(year, month, day)` 로컬 자정 생성 패턴 사용.
`toLocalDate()`와 `todayLocal()` 헬퍼를 각 lib 파일에서 재구현한다.

### 색상 값
Hex 값을 `#` 없이 저장/전달 (`"2563EB"`, `"FFFFFF"`).
렌더링 시 `#${color}` 형태로 조합. `"transparent"`는 별도 처리.
에디터 페이지의 색상 입력은 `<ColorPicker>` 공통 컴포넌트를 사용한다 (`src/components/ui/color-picker.tsx`).

### URL 빌더 규칙
비기본값만 URL에 추가하여 URL 길이를 최소화한다.
기존 URL은 새 파라미터 없이도 동일하게 렌더링됨 (하위 호환성).

## 위젯별 커스터마이징 옵션

### D-Day 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 시간 카운트다운 | `showTime` | boolean | `false` |
| 구분자 깜빡임 | `blink` | boolean | `true` |
| 완료 메시지 | `doneMsg` | string | `""` |
| 바 색상 | `barColor` | hex | `""` (textColor fallback) |
| 날짜 표시 형식 | `dateFmt` | `full\|short\|dot\|none` | `full` |

### Clock 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 초 표시 | `seconds` | boolean | `true` |
| 날짜 표시 | `date` | boolean | `false` |
| 구분자 깜빡임 | `blink` | boolean | `true` |
| 날짜 색상 | `dateColor` | hex | `""` (color fallback) |
| 날짜 표시 형식 | `dateFmt` | `kr\|en\|short` | `kr` |
| 폰트 | `font` | CSS키 + Google Font키 | `mono` |

타임존 19개 지원: 서울, 도쿄, 상하이, 홍콩, 방콕, 싱가포르, 뭄바이, 두바이, 시드니, 오클랜드, 런던, 파리, 베를린, 모스크바, 뉴욕, 시카고, LA, 상파울루, 하와이

### Quote 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 텍스트 정렬 | `align` | `left\|center\|right` | `center` |
| 따옴표 아이콘 | `marks` | boolean | `true` |
| 이탤릭 | `italic` | boolean | `false` |
| 줄 간격 | `lh` | `tight\|normal\|relaxed` | `relaxed` |
| 저자 색상 | `authorColor` | hex | `""` (textColor fallback) |
| 구분선 표시 | `divider` | boolean | `false` |
| 폰트 | `font` | CSS키 + Google Font키 | `serif` |

### Time Progress 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 주간 타입 | `type=week` | union 추가 | — |
| 바 스타일 | `style` | `bar\|ring` | `bar` |
| 라벨 표시 | `label` | boolean | `true` |
| 퍼센트 표시 | `percent` | boolean | `true` |
| 바 높이 | `barH` | `thin\|default\|thick` | `default` |
| 텍스트 색상 | `textColor` | hex | `""` (color fallback) |
| 주 시작일 | `weekStart` | `sun\|mon` | `sun` (URL) / `mon` (에디터) |
| 링 크기 | `ringSize` | `sm\|md\|lg` | `md` |
| 남은 시간 표시 | `remain` | boolean | `false` |

### Life Calendar 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 셀 모양 | `shape` | `square\|round` | `square` |
| 셀 크기 | `cellSize` | `sm\|md\|lg` | `sm` |
| 미래 셀 색상 | `futureColor` | hex string | `""` |
| 나이 라벨 | `years` | boolean | `false` |
| 현재 주 색상 | `nowColor` | hex | `""` (color fallback) |

### Pomodoro 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 긴 휴식 시간 | `longBreak` | number(1-60) | `15` |
| 라운드 수 | `rounds` | number(1-10) | `4` |
| 라운드 표시 | `showRounds` | boolean | `true` |
| 휴식 색상 | `breakColor` | hex | `22C55E` |
| 자동 시작 | `autoStart` | boolean | `false` |
| 프로그레스 스타일 | `pStyle` | `bar\|ring` | `bar` |

### Mini Calendar 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 주 시작일 | `weekStart` | `sun\|mon` | `mon` |
| 헤더 형식 | `header` | `full\|short\|none` | `full` |
| 요일 이름 표시 | `showDayNames` | boolean | `true` |
| 언어 | `lang` | `ko\|en` | `ko` |
| 타 월 날짜 표시 | `showOtherDays` | boolean | `true` |
| 네비게이션 | `showNav` | boolean | `true` |
| 하이라이트 색상 | `highlight` | hex | `2563EB` |

### Analog Clock 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 숫자 표시 | `showNumbers` | boolean | `true` |
| 숫자 스타일 | `numStyle` | `quarter\|all` | `quarter` |
| 초침 표시 | `showSeconds` | boolean | `true` |
| 눈금 표시 | `showTicks` | boolean | `true` |
| 테두리 표시 | `showBorder` | boolean | `true` |
| 시/분침 색상 | `handColor` | hex | `1E1E1E` |
| 초침 색상 | `secHandColor` | hex | `E11D48` |
| 시계판 색상 | `faceColor` | hex | `FFFFFF` |
| 눈금 색상 | `tickColor` | hex | `999999` |
| 테두리 색상 | `borderColor` | hex | `1E1E1E` |

### Counter 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 라벨 | `label` | string | `카운터` |
| 초기값 | `initial` | number | `0` |
| 증감량 | `step` | number | `1` |
| 최소값 | `min` | number | (없음) |
| 최대값 | `max` | number | (없음) |
| 초기화 버튼 | `showReset` | boolean | `true` |
| 버튼 색상 | `btnColor` | hex | `2563EB` |

### Weather 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 위도 | `lat` | number | `37.5665` |
| 경도 | `lon` | number | `126.978` |
| 도시 이름 | `city` | string | `서울` |
| 온도 단위 | `unit` | `celsius\|fahrenheit` | `celsius` |
| 예보 표시 | `showForecast` | boolean | `false` |
| 습도 표시 | `showHumidity` | boolean | `false` |
| 풍속 표시 | `showWind` | boolean | `false` |
| 아이콘 스타일 | `iconStyle` | `emoji\|minimal` | `emoji` |
| 갱신 주기(분) | `refresh` | number | `30` |

## 완료된 작업 이력

### v1 — 프로젝트 초기화
- Next.js + TypeScript + Tailwind + shadcn 기반 프로젝트 구성
- 무상태 URL 파라미터 아키텍처 설계
- 6개 위젯 구현 (D-Day, 인생 달력, 시간 진행률, 시계, 명언, 뽀모도로)
- 각 위젯별 에디터 + 렌더링 페이지 구현

### v2 — 커스터마이징 옵션 강화
- **공통 스타일 인프라** 구축 (`common-widget-options.ts`, `CommonStyleOptions.tsx`)
- **6개 위젯 전체에 공통 스타일 옵션** (borderRadius, padding, fontSize) 적용
- **위젯별 고유 옵션** 추가:
  - Clock: 초 표시, 날짜 표시, 깜빡임
  - Quote: 정렬, 따옴표, 이탤릭, 줄 간격
  - Time Progress: 주간 타입, 링 SVG, 라벨/퍼센트, 바 높이
  - Life Calendar: 셀 모양/크기, 미래 셀 색상
  - D-Day: 시간 카운트다운, 깜빡임, 완료 메시지
  - Pomodoro: 긴 휴식, 라운드 시스템, 휴식 색상, 자동 시작

### v3 — 에디터 UI 정리
- `shadcn/ui accordion` 도입
- `EditorSection` 아코디언 래퍼 컴포넌트 생성
- 6개 에디터 페이지를 기능별 접이식 그룹으로 재구성
- 핵심 설정은 기본 열림, 부가 스타일은 접힘 상태

### v4 — 기존 위젯 기능 강화
- **폰트 시스템 통합**: `resolveFontStyle()` 유틸로 CSS 제네릭 + Google Font 통합. Clock, Quote에서 6개 한국어 Google Font 선택 가능
- **Clock 타임존 확장**: 9개 → 19개 (싱가포르, 두바이, 시드니, 방콕, 홍콩, 베를린, 모스크바, 뭄바이, 상파울루, 하와이 추가)
- **개별 텍스트 색상 분리**: Clock(`dateColor`), TimeProgress(`textColor`), Quote(`authorColor`), D-Day(`barColor`)
- **Pomodoro 링 프로그레스**: `pStyle=ring` 옵션으로 원형 프로그레스 지원
- **TimeProgress 주간 시작 요일**: `weekStart=mon|sun` (에디터 기본값 mon, URL 기본값 sun)
- **TimeProgress 링 크기**: `ringSize=sm|md|lg` (80/120/160px)
- **TimeProgress 남은 시간 표시**: `remain=true`로 "14시간 30분 남음" 형식 표시
- **Quote 구분선**: `divider=true`로 본문-저자 사이 구분선 삽입
- **Life Calendar 나이 라벨**: `years=true`로 10년 단위 나이 표시
- **Life Calendar 현재 주 색상**: `nowColor`로 현재 주 별도 색상 지정
- **D-Day 날짜 포맷**: `dateFmt=full|short|dot|none`
- **Clock 날짜 포맷**: `dateFmt=kr|en|short`

### v5 — 신규 위젯 4종 + 다크 모드 + 홈 리디자인
- **신규 위젯 4종** 추가: 미니 캘린더, 아날로그 시계, 카운터, 날씨
  - Mini Calendar: 주 시작일, 헤더 형식, 언어(ko/en), 네비게이션, 하이라이트 색상
  - Analog Clock: 숫자 스타일(quarter/all), 초침, 눈금, 테두리, 시계판/침/눈금 개별 색상
  - Counter: 라벨, 초기값, 증감량, 최소/최대, localStorage 영속화
  - Weather: Open-Meteo API, 위도/경도, 온도 단위, 예보/습도/풍속 토글
- **다크 모드 지원**: `next-themes` 연동, ThemeProvider + ThemeToggle, Sonner 동적 테마
- **홈 페이지 리디자인**: 히어로 섹션 + 반응형 그리드(1/2/3열) + 라이브 미니 프리뷰 썸네일 + 호버 애니메이션

## 스크립트
```bash
npm run dev      # 로컬 개발 서버
npm run build    # 프로덕션 빌드 (검증용)
npm run lint     # ESLint
```

## 코딩 컨벤션
- 모든 페이지·컴포넌트 파일 상단에 `"use client"` 선언 (CSR 전용)
- path alias: `@/*` → `src/*`
- UI 컴포넌트는 shadcn CLI로 추가 (`npx shadcn@latest add <component>`)
- 한국어 UI 텍스트 사용 (서비스 타겟: 한국어 사용자)
- 컴포넌트 export는 `export default function` 사용
