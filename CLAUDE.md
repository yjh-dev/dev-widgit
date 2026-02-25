# Widgit — 노션 전용 위젯 생성 서비스

## 프로젝트 개요
URL 파라미터만으로 동작하는 **무상태(stateless) 노션 임베드 위젯** 생성 서비스.
서버·DB 없이 클라이언트 사이드에서 모든 렌더링을 처리한다.

## 궁극적 목표
경쟁 서비스(Indify, Nodi.so, WidgetBox)를 뛰어넘는 **고품질 노션 위젯 서비스** 구축.
- 다양한 위젯 라인업 (현재 6종 → 지속 확장)
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
│   │   └── pomodoro/page.tsx             # 뽀모도로 타이머 위젯 에디터
│   └── widget/
│       ├── dday/page.tsx                 # D-Day 위젯 렌더링 (iframe용)
│       ├── life-calendar/page.tsx        # 인생 달력 위젯 렌더링 (iframe용)
│       ├── time-progress/page.tsx        # 시간 진행률 바 위젯 렌더링
│       ├── clock/page.tsx                # 미니멀 시계 위젯 렌더링
│       ├── quote/page.tsx                # 명언 카드 위젯 렌더링
│       └── pomodoro/page.tsx             # 뽀모도로 타이머 위젯 렌더링
├── components/
│   ├── ui/                               # shadcn 공통 UI + 커스텀 공통 컴포넌트
│   │   ├── accordion.tsx                 # shadcn — 접이식 패널 (에디터 섹션용)
│   │   ├── button, card, input, label, select, switch, sonner  # shadcn
│   │   └── color-picker.tsx              # 커스텀 — hex 입력 + 네이티브 피커 + 프리셋 스워치
│   ├── editor/                           # 에디터 공통 컴포넌트
│   │   ├── EditorLayout.tsx              # 에디터 페이지 레이아웃 (좌측 폼 + 우측 프리뷰)
│   │   ├── EditorActions.tsx             # URL 복사 + 초기화 버튼
│   │   ├── EditorSection.tsx             # 아코디언 기반 접이식 섹션 래퍼
│   │   └── CommonStyleOptions.tsx        # 공통 스타일 옵션 (모서리/여백/글자크기)
│   └── widget/                           # 위젯 프리뷰 컴포넌트
│       ├── DdayWidgetPreview.tsx
│       ├── DdayProgressBar.tsx
│       ├── LifeCalendarPreview.tsx
│       ├── TimeProgressPreview.tsx
│       ├── ClockPreview.tsx
│       ├── QuotePreview.tsx
│       └── PomodoroPreview.tsx
├── lib/                                  # 순수 유틸리티 (UI 무관)
│   ├── dday.ts
│   ├── life-calendar.ts
│   ├── time-progress.ts
│   ├── clock.ts
│   ├── quote.ts
│   ├── pomodoro.ts
│   ├── common-widget-options.ts          # 공통 스타일 타입/옵션/파서
│   ├── fonts.ts
│   └── utils.ts                          # cn() — clsx + tailwind-merge
└── store/                                # Zustand 스토어 (에디터 페이지 전용)
    ├── useWidgetStore.ts                 # D-Day 위젯 상태
    ├── useLifeCalendarStore.ts           # 인생 달력 위젯 상태
    ├── useTimeProgressStore.ts           # 시간 진행률 바 위젯 상태
    ├── useClockStore.ts                  # 미니멀 시계 위젯 상태
    ├── useQuoteStore.ts                  # 명언 카드 위젯 상태
    └── usePomodoroStore.ts               # 뽀모도로 타이머 위젯 상태
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

### Clock 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 초 표시 | `seconds` | boolean | `true` |
| 날짜 표시 | `date` | boolean | `false` |
| 구분자 깜빡임 | `blink` | boolean | `true` |

### Quote 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 텍스트 정렬 | `align` | `left\|center\|right` | `center` |
| 따옴표 아이콘 | `marks` | boolean | `true` |
| 이탤릭 | `italic` | boolean | `false` |
| 줄 간격 | `lh` | `tight\|normal\|relaxed` | `relaxed` |

### Time Progress 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 주간 타입 | `type=week` | union 추가 | — |
| 바 스타일 | `style` | `bar\|ring` | `bar` |
| 라벨 표시 | `label` | boolean | `true` |
| 퍼센트 표시 | `percent` | boolean | `true` |
| 바 높이 | `barH` | `thin\|default\|thick` | `default` |

### Life Calendar 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 셀 모양 | `shape` | `square\|round` | `square` |
| 셀 크기 | `cellSize` | `sm\|md\|lg` | `sm` |
| 미래 셀 색상 | `futureColor` | hex string | `""` |

### Pomodoro 위젯
| 옵션 | URL 파라미터 | 타입 | 기본값 |
|------|-------------|------|--------|
| 긴 휴식 시간 | `longBreak` | number(1-60) | `15` |
| 라운드 수 | `rounds` | number(1-10) | `4` |
| 라운드 표시 | `showRounds` | boolean | `true` |
| 휴식 색상 | `breakColor` | hex | `22C55E` |
| 자동 시작 | `autoStart` | boolean | `false` |

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
