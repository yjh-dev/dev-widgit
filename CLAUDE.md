# Widgit — 노션 전용 위젯 생성 서비스

## 프로젝트 개요
URL 파라미터만으로 동작하는 **무상태(stateless) 노션 임베드 위젯** 생성 서비스.
서버·DB 없이 클라이언트 사이드에서 모든 렌더링을 처리한다.

## 궁극적 목표
경쟁 서비스(Indify, Nodi.so, WidgetBox)를 뛰어넘는 **고품질 노션 위젯 서비스** 구축.
- 다양한 위젯 라인업 (현재 27종 → 지속 확장)
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
│   ├── guide/page.tsx                    # 노션 임베드 가이드
│   ├── templates/page.tsx                # 추천 조합 + 레이아웃 빌더
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
│   │   ├── weather/page.tsx              # 날씨 위젯 에디터
│   │   ├── reading/page.tsx             # 읽기 진행률 위젯 에디터
│   │   ├── habit/page.tsx               # 습관 트래커 위젯 에디터
│   │   ├── timeline/page.tsx            # 타임라인 위젯 에디터
│   │   ├── banner/page.tsx              # 텍스트 배너 위젯 에디터
│   │   ├── bookmark/page.tsx            # 북마크 위젯 에디터
│   │   ├── goal/page.tsx                # 목표 진행률 위젯 에디터
│   │   ├── stopwatch/page.tsx           # 스톱워치 위젯 에디터
│   │   ├── music/page.tsx               # 음악 플레이어 위젯 에디터
│   │   ├── gradient/page.tsx            # 그라데이션 위젯 에디터
│   │   ├── sticky-note/page.tsx         # 메모지 위젯 에디터
│   │   ├── flip-clock/page.tsx          # 플립 시계 위젯 에디터
│   │   ├── moon-phase/page.tsx          # 달 위상 위젯 에디터
│   │   ├── dice/page.tsx               # 주사위 위젯 에디터
│   │   ├── qr-code/page.tsx             # QR 코드 위젯 에디터
│   │   ├── typewriter/page.tsx          # 타이프라이터 위젯 에디터
│   │   ├── todo/page.tsx                # 투두리스트 위젯 에디터
│   │   └── github-contribution/page.tsx # GitHub 잔디 위젯 에디터
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
│       ├── weather/page.tsx              # 날씨 위젯 렌더링
│       ├── reading/page.tsx             # 읽기 진행률 위젯 렌더링
│       ├── habit/page.tsx               # 습관 트래커 위젯 렌더링
│       ├── timeline/page.tsx            # 타임라인 위젯 렌더링
│       ├── banner/page.tsx              # 텍스트 배너 위젯 렌더링
│       ├── bookmark/page.tsx            # 북마크 위젯 렌더링
│       ├── goal/page.tsx                # 목표 진행률 위젯 렌더링
│       ├── stopwatch/page.tsx           # 스톱워치 위젯 렌더링
│       ├── music/page.tsx               # 음악 플레이어 위젯 렌더링
│       ├── gradient/page.tsx             # 그라데이션 위젯 렌더링
│       ├── sticky-note/page.tsx          # 메모지 위젯 렌더링
│       ├── flip-clock/page.tsx           # 플립 시계 위젯 렌더링
│       ├── moon-phase/page.tsx           # 달 위상 위젯 렌더링
│       ├── dice/page.tsx                # 주사위 위젯 렌더링
│       ├── qr-code/page.tsx              # QR 코드 위젯 렌더링
│       ├── typewriter/page.tsx           # 타이프라이터 위젯 렌더링
│       ├── todo/page.tsx                 # 투두리스트 위젯 렌더링
│       └── github-contribution/page.tsx  # GitHub 잔디 위젯 렌더링
├── components/
│   ├── ui/                               # shadcn 공통 UI + 커스텀 공통 컴포넌트
│   │   ├── accordion.tsx                 # shadcn — 접이식 패널 (에디터 섹션용)
│   │   ├── button, card, input, label, select, switch, sonner  # shadcn
│   │   ├── color-picker.tsx              # 커스텀 — hex 입력 + 네이티브 피커 + 프리셋 스워치
│   │   └── theme-toggle.tsx              # 다크모드 토글 버튼 (Sun/Moon)
│   ├── editor/                           # 에디터 공통 컴포넌트
│   │   ├── EditorLayout.tsx              # 에디터 페이지 레이아웃 (좌측 폼 + 우측 프리뷰)
│   │   ├── EditorActions.tsx             # URL 복사 + 초기화 버튼 + 짧은 URL 토글
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
│       ├── WeatherPreview.tsx
│       ├── ReadingPreview.tsx
│       ├── HabitPreview.tsx
│       ├── TimelinePreview.tsx
│       ├── BannerPreview.tsx
│       ├── BookmarkPreview.tsx
│       ├── GoalPreview.tsx
│       ├── StopwatchPreview.tsx
│       ├── MusicPreview.tsx
│       ├── GradientPreview.tsx
│       ├── StickyNotePreview.tsx
│       ├── FlipClockPreview.tsx
│       ├── MoonPhasePreview.tsx
│       ├── DicePreview.tsx
│       ├── QRCodePreview.tsx
│       ├── TypewriterPreview.tsx
│       ├── TodoPreview.tsx
│       ├── GithubContributionPreview.tsx
│       └── WidgetRenderer.tsx
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
│   ├── reading.ts
│   ├── habit.ts
│   ├── timeline.ts
│   ├── banner.ts
│   ├── bookmark.ts
│   ├── goal.ts
│   ├── stopwatch.ts
│   ├── music.ts
│   ├── gradient.ts
│   ├── sticky-note.ts
│   ├── flip-clock.ts
│   ├── moon-phase.ts
│   ├── dice.ts
│   ├── qr-code.ts
│   ├── typewriter.ts
│   ├── todo.ts
│   ├── github-contribution.ts
│   ├── presets.ts                        # 위젯별 프리셋 데이터
│   ├── templates.ts                      # 추천 조합 + 레이아웃 프리셋 + 위젯 기본 URL 데이터
│   ├── url-compression.ts               # LZ 압축/해제 유틸 (lz-string)
│   ├── use-widget-params.ts             # useSearchParams 대체 훅 (압축 URL 자동 해제)
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
    ├── useWeatherStore.ts                # 날씨 위젯 상태
    ├── useReadingStore.ts                # 읽기 진행률 위젯 상태
    ├── useHabitStore.ts                  # 습관 트래커 위젯 상태
    ├── useTimelineStore.ts               # 타임라인 위젯 상태
    ├── useBannerStore.ts                 # 텍스트 배너 위젯 상태
    ├── useBookmarkStore.ts               # 북마크 위젯 상태
    ├── useGoalStore.ts                   # 목표 진행률 위젯 상태
    ├── useStopwatchStore.ts              # 스톱워치 위젯 상태
    ├── useMusicStore.ts                  # 음악 플레이어 위젯 상태
    ├── useGradientStore.ts               # 그라데이션 위젯 상태
    ├── useStickyNoteStore.ts             # 메모지 위젯 상태
    ├── useFlipClockStore.ts              # 플립 시계 위젯 상태
    ├── useMoonPhaseStore.ts              # 달 위상 위젯 상태
    ├── useDiceStore.ts                   # 주사위 위젯 상태
    ├── useQRCodeStore.ts                 # QR 코드 위젯 상태
    ├── useTypewriterStore.ts             # 타이프라이터 위젯 상태
    ├── useTodoStore.ts                   # 투두리스트 위젯 상태
    └── useGithubContributionStore.ts     # GitHub 잔디 위젯 상태
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
- `/widget/reading?title=클린코드&current=180&total=300&color=2563EB`
- `/widget/habit?title=운동&view=week&weekStart=mon&color=22C55E`
- `/widget/timeline?events=기말고사~2026-06-15|여름방학~2026-07-20|수능~2026-11-19&color=2563EB`
- `/widget/banner?texts=오늘도%20화이팅!%20💪&anim=scroll&bold=true`
- `/widget/bookmark?url=https://github.com&title=GitHub&desc=프로필&showIcon=true`
- `/widget/goal?title=저축&current=350000&target=1000000&unit=원&style=bar&color=22C55E`
- `/widget/stopwatch?showMs=true&showLap=true&btnColor=2563EB`
- `/widget/music?title=Chill+Beats&artist=Lo-Fi&progress=45&artColor=6366F1`
- `/widget/gradient?colors=6366F1|EC4899&dir=135&type=linear`
- `/widget/sticky-note?text=오늘+할+일&noteColor=FBBF24&pin=pin&rotation=2&font=gaegu`
- `/widget/flip-clock?timezone=Asia/Seoul&format=24h&flipColor=1E1E1E&textColor=FFFFFF`
- `/widget/moon-phase?style=realistic&moonColor=F5F5DC&bg=0F172A`
- `/widget/dice?mode=dice&count=2&sides=6&color=2563EB`
- `/widget/qr-code?data=https://github.com&label=GitHub&fgColor=1E1E1E`
- `/widget/typewriter?texts=안녕하세요|반갑습니다&speed=60&cursor=bar&color=1E1E1E`
- `/widget/todo?title=오늘+할+일&items=할일1|!완료된것|할일2&color=7C3AED`
- `/widget/github-contribution?username=torvalds&year=2025&color=22C55E`

### URL LZ 압축 (짧은 URL)
에디터의 "짧은 URL" 토글 ON 시 쿼리 파라미터를 `lz-string`으로 압축하여 `?c=<compressed>` 형태로 단축한다.
- 압축 결과가 원본보다 길면 원본을 그대로 사용 (자동 감지)
- 렌더링 페이지는 `useWidgetParams()` 훅으로 `?c=` 자동 감지 → 압축 해제
- 기존 개별 파라미터 URL은 100% 하위 호환

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
모든 24개 위젯에 적용되는 공통 커스터마이징 옵션:

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

### Reading (읽기 진행률) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 제목 | `title` | string | `""` |
| 현재 페이지 | `current` | number | `0` |
| 전체 페이지 | `total` | number | `300` |
| 스타일 | `style` | `bar\|ring` | `bar` |
| 페이지 수 표시 | `pages` | boolean | `true` |
| 텍스트 색상 | `textColor` | hex | `""` (color fallback) |

### Habit (습관 트래커) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 제목 | `title` | string | `""` |
| 뷰 | `view` | `week\|month` | `week` |
| 주 시작일 | `weekStart` | `sun\|mon` | `mon` |
| 체크된 날짜 | `checked` | comma-separated dates | `""` |
| 텍스트 색상 | `textColor` | hex | `""` (color fallback) |

### Timeline (타임라인) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 이벤트 | `events` | `title~date\|...` | `[]` |
| 과거 이벤트 표시 | `past` | boolean | `false` |
| 과거 색상 | `pastColor` | hex | `999999` |

### Banner (텍스트 배너) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 텍스트 | `texts` | `URI인코딩\|...` | `["텍스트를 입력하세요"]` |
| 애니메이션 | `anim` | `none\|scroll\|fade` | `none` |
| 속도 (초) | `speed` | number(1-10) | `3` |
| 정렬 | `align` | `left\|center\|right` | `center` |
| 굵게 | `bold` | boolean | `true` |
| 폰트 | `font` | `sans\|serif\|mono` | `sans` |

### Bookmark (북마크) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| URL | `url` | string | `""` |
| 제목 | `title` | string | `""` |
| 설명 | `desc` | string | `""` |
| 아이콘 표시 | `showIcon` | boolean | `true` |
| URL 표시 | `showUrl` | boolean | `true` |

### Goal (목표 진행률) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 제목 | `title` | string | `""` |
| 현재값 | `current` | number | `0` |
| 목표값 | `target` | number | `100` |
| 단위 | `unit` | string | `""` |
| 스타일 | `style` | `bar\|ring` | `bar` |
| 값 표시 | `showValue` | boolean | `true` |
| 텍스트 색상 | `textColor` | hex | `""` (color fallback) |

### Stopwatch (스톱워치) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 밀리초 표시 | `showMs` | boolean | `false` |
| 랩 표시 | `showLap` | boolean | `false` |
| 버튼 색상 | `btnColor` | hex | `2563EB` |

### Music (음악 플레이어) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 곡명 | `title` | string | `""` |
| 아티스트 | `artist` | string | `""` |
| 진행률 | `progress` | number(0-100) | `35` |
| 아트 색상 | `artColor` | hex | `6366F1` |
| 프로그레스 표시 | `showProgress` | boolean | `true` |

### Gradient (그라데이션) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 색상 (2~4개) | `colors` | hex 파이프 구분 | `6366F1\|EC4899` |
| 방향 | `dir` | number(0-360) | `135` |
| 타입 | `type` | `linear\|radial\|conic` | `linear` |
| 애니메이션 | `animate` | boolean | `false` |
| 오버레이 텍스트 | `text` | string | `""` |
| 텍스트 색상 | `textColor` | hex | `FFFFFF` |
| 속도 | `speed` | number(3-30) | `10` |

### Sticky Note (메모지) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 텍스트 | `text` | string (%0A=줄바꿈) | `"메모를 입력하세요"` |
| 노트 색상 | `noteColor` | hex | `FBBF24` |
| 텍스트 색상 | `textColor` | hex | `1E1E1E` |
| 장식 | `pin` | `none\|pin\|tape` | `pin` |
| 회전각 | `rotation` | -5~5 | `2` |
| 폰트 | `font` | font key | `gaegu` |
| 줄 간격 | `lh` | `tight\|normal\|relaxed` | `normal` |
| 그림자 | `shadow` | boolean | `true` |

### Flip Clock (플립 시계) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 타임존 | `timezone` | string (19개) | `Asia/Seoul` |
| 포맷 | `format` | `12h\|24h` | `24h` |
| 초 표시 | `showSeconds` | boolean | `false` |
| 카드 색상 | `flipColor` | hex | `1E1E1E` |
| 텍스트 색상 | `textColor` | hex | `FFFFFF` |
| 구분선 색상 | `gapColor` | hex | `333333` |
| 날짜 표시 | `showDate` | boolean | `false` |
| 날짜 포맷 | `dateFmt` | `kr\|en\|short` | `kr` |

### Moon Phase (달 위상) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 스타일 | `style` | `realistic\|simple\|emoji` | `realistic` |
| 위상명 표시 | `showName` | boolean | `true` |
| 조도% 표시 | `showPercent` | boolean | `true` |
| 다음 보름달 | `showNext` | boolean | `false` |
| 달 색상 | `moonColor` | hex | `F5F5DC` |
| 그림자 색상 | `shadowColor` | hex | `1A1A2E` |
| 달 크기 | `moonSize` | `sm\|md\|lg` | `md` |

### Dice (주사위) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 모드 | `mode` | `dice\|coin\|picker` | `dice` |
| 주사위 수 | `count` | 1~4 | `1` |
| 면 수 | `sides` | `4\|6\|8\|10\|12\|20` | `6` |
| 주사위 색상 | `color` | hex | `2563EB` |
| 텍스트 색상 | `textColor` | hex | `FFFFFF` |
| 뽑기 항목 | `items` | 파이프 구분 | `""` |
| 합계 표시 | `showTotal` | boolean | `true` |
| 기록 표시 | `history` | boolean | `false` |

### QR Code (QR 코드) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 데이터 | `data` | string (URI 인코딩) | `""` |
| 라벨 | `label` | string | `""` |
| 전경색 | `fgColor` | hex | `1E1E1E` |
| 배경색 | `bgColor` | hex | `FFFFFF` |
| 크기 | `size` | `sm\|md\|lg` | `md` |
| 오류 보정 | `ec` | `L\|M\|Q\|H` | `M` |
| 모듈 스타일 | `module` | `square\|rounded\|dots` | `square` |

### Typewriter (타이프라이터) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 텍스트 | `texts` | URI인코딩 파이프 구분 | `["텍스트를 입력하세요"]` |
| 타이핑 속도(ms) | `speed` | number(20-200) | `60` |
| 일시정지(ms) | `pause` | number(500-5000) | `1500` |
| 커서 스타일 | `cursor` | `bar\|block\|underscore\|none` | `bar` |
| 굵게 | `bold` | boolean | `true` |
| 폰트 | `font` | font key | `sans` |

### Todo (투두리스트) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 제목 | `title` | string | `""` |
| 할 일 항목 | `items` | 파이프 구분 (`!`=완료) | `""` |
| 강조 색상 | `color` | hex | `7C3AED` |
| 텍스트 색상 | `textColor` | hex | `""` |
| 배경색 | `bg` | hex | `FFFFFF` |
| 진행률 표시 | `progress` | boolean | `true` |
| 취소선 | `strike` | boolean | `true` |

### GitHub Contribution (깃허브 잔디) 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 사용자명 | `username` | string | `""` |
| 연도 | `year` | `last\|2025\|...` | `last` |
| 기여 수 표시 | `total` | boolean | `true` |
| 사용자명 표시 | `showUser` | boolean | `true` |
| 언어 | `lang` | `ko\|en` | `ko` |
| 셀 크기 | `cellSize` | `sm\|md\|lg` | `sm` |
| 셀 모양 | `cellRadius` | `square\|rounded\|circle` | `rounded` |

## 홈 페이지 카테고리 구조
위젯을 4개 카테고리로 그룹화하여 표시:
- **시간 & 날짜** (6): D-Day, 시계, 아날로그 시계, 미니 캘린더, 타임라인, 플립 시계
- **진행률 & 목표** (4): 시간 진행률, 인생 달력, 읽기 진행률, 목표 진행률
- **생산성 & 도구** (7): 뽀모도로, 스톱워치, 카운터, 습관 트래커, 투두리스트, QR 코드, 주사위
- **콘텐츠 & 장식** (10): 명언 카드, 텍스트 배너, 북마크, 음악 플레이어, 날씨, 달 위상, 메모지, 그라데이션, 타이프라이터, GitHub 잔디

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

### v6 — 신규 위젯 4종 추가 (10종 → 14종)
- **읽기 진행률(Reading)**: 책 읽기 진행률을 bar/ring 스타일로 표시, 제목·현재/전체 페이지
- **습관 트래커(Habit)**: 주간(week)/월간(month) 뷰로 습관 체크 관리, 인터랙티브 체크 그리드
- **타임라인(Timeline)**: 여러 일정을 D-Day 라벨과 함께 수직 타임라인으로 나열, pipe+tilde 직렬화 (`title~date|title~date`)
- **텍스트 배너(Banner)**: 다중 텍스트 지원, scroll(마퀴)/fade(순환 전환)/none 애니메이션, 정렬·굵기·폰트 옵션

### v7 — 신규 위젯 4종 추가 + 홈 카테고리화 (14종 → 18종)
- **북마크(Bookmark)**: URL·제목·설명 카드, Google Favicon API 파비콘, 클릭 시 링크 이동(`target="_top"`), `linkable` prop으로 썸네일 `<a>` 중첩 방지
- **목표 진행률(Goal)**: Reading과 유사하되 자유 단위(원, 회, km 등) 지원, bar/ring 스타일
- **스톱워치(Stopwatch)**: 시작/정지/리셋, 랩 타임 기록, 밀리초 표시 옵션
- **음악 플레이어(Music)**: 장식용 플레이어 카드, 앨범아트 색상, 프로그레스 바, 재생 컨트롤 UI
- **홈 페이지 카테고리 섹션**: 18개 위젯을 4개 카테고리(시간&날짜, 진행률&목표, 생산성&도구, 콘텐츠&장식)로 그룹화
- **프리뷰 가운데 정렬 수정**: TimelinePreview·BookmarkPreview 에디터 미리보기 센터링 개선

### v8 — 추천 조합 + 레이아웃 빌더 + 임베드 가이드
- **추천 조합 페이지** (`/templates`): 8개 테마별 위젯 조합 (학생, 미니멀, 독서, 목표, 감성, 시간관리, 데일리, 자기성장) + 레이아웃 합성 프리뷰 + 개별/전체 URL 복사
- **레이아웃 가이드**: 9가지 레이아웃 프리셋 (1열, 2열, 3열, 헤더+2열, 2×2 그리드 등) 시각적 가이드
- **인터랙티브 레이아웃 빌더**: 레이아웃 카드 클릭 → 슬롯별 위젯 배정(Select 드롭다운) → 배정된 위젯 URL 일괄 복사
- **위젯 기본 URL 데이터**: `widgetDefaults` 배열로 18종 위젯의 이름 + 기본 URL 매핑 (`src/lib/templates.ts`)
- **노션 임베드 가이드** (`/guide`): 기본 임베드 방법, 크기 조절, 다크 모드 팁, FAQ
- **AnalogClock hydration 수정**: SSR/클라이언트 간 부동소수점 정밀도 차이(`round4`) + 시계 바늘 `mounted` 가드 적용

### v9 — 신규 위젯 6종 추가 (18종 → 24종)
- **그라데이션(Gradient)**: 2~4색 CSS 그라데이션 배너/구분선, linear/radial/conic 타입, 애니메이션 지원, 8개 프리셋
- **메모지(Sticky Note)**: 포스트잇 스타일 메모 카드, 핀/테이프 장식, 회전각, 그림자, 6색 프리셋, 손글씨 폰트(Gaegu) 기본
- **플립 시계(Flip Clock)**: 공항 스플릿 플랩 스타일 레트로 시계, CSS 3D 플립 애니메이션, 기존 clock.ts 타임존/날짜 로직 재사용, ResizeObserver 자동 스케일링
- **달 위상(Moon Phase)**: 삭망월(29.53일) 기반 순수 수학 계산, SVG 타원호 명암 경계 렌더링, realistic/simple/emoji 3가지 스타일, 한국어 위상명
- **주사위(Dice)**: 주사위(D4~D20) + 동전 + 랜덤 뽑기 3모드, SVG 주사위 면 + CSS 흔들기 애니메이션, 기록 기능
- **QR 코드(QR Code)**: 순수 TS QR 인코딩 알고리즘(~300줄, Reed-Solomon GF(256)), square/rounded/dots 3가지 모듈 스타일, 데이터 300자 제한
- **프리셋 시스템**: 6종 신규 위젯에 각 2개 프리셋 추가, PresetSelector 컴포넌트 연동
- **추천 조합 업데이트**: 기존 템플릿에 신규 위젯 통합 (다크 생산성→플립 시계, 감성→그라데이션+메모지, 나이트 아울→플립 시계+달 위상)

### v10 — URL LZ 압축 단축 기능
- **lz-string 기반 URL 압축**: `compressToEncodedURIComponent`로 쿼리 파라미터를 `?c=<compressed>` 형태로 단축
- **url-compression.ts**: `compressWidgetUrl()` (압축 결과가 원본보다 길면 원본 자동 반환) + `decompressToParams()` 유틸
- **useWidgetParams 훅**: `useSearchParams()` 드롭인 대체, `?c=` 파라미터 자동 감지 → 압축 해제 → URLSearchParams 반환
- **EditorActions 짧은 URL 토글**: Switch 토글(localStorage 기억) → 압축 URL 표시/복사/새 탭 열기, MobileBottomBar 자동 연동
- **24개 렌더링 페이지 일괄 수정**: `useSearchParams` → `useWidgetParams` 교체로 압축 URL 하위 호환 100%

### v11 — 내 위젯 대시보드 + 품질 개선 + 신규 위젯 2종 (24종 → 26종)
- **내 위젯 대시보드** (`/my-widgets`): 에디터에서 저장한 위젯을 iframe 라이브 프리뷰로 관리 (수정/삭제/복제/URL 복사), 검색·타입 필터
- **타이프라이터(Typewriter)**: 텍스트 타이핑 애니메이션 위젯, 다중 텍스트 순환, 커서 스타일(bar/block/underscore), 속도·일시정지 조절
- **투두리스트(Todo)**: 체크리스트 위젯, 인터랙티브 체크/추가/삭제, localStorage 상태 영속화, 진행률 바, 취소선 옵션
- **위젯 테마 일괄 적용**: 10개 색상 테마 스워치로 에디터에서 bg/text/accent 일괄 변경, Zustand `setState()` 활용
- **Embed 코드 & 공유 링크**: `<iframe>` HTML 복사 + `/create/` 에디터 URL 공유
- **접근성(a11y)**: 아이콘 버튼 aria-label, 색상 피커 접근성, 썸네일 aria-hidden
- **PWA 아이콘**: SVG→PNG 변환(192/512), manifest.json 업데이트
- **커스텀 404 페이지**: 브랜딩된 not-found 페이지
- **SEO**: sitemap.ts + 동적 메타데이터, og:image, 가이드 페이지 보강

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
