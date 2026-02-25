# Widgit — 노션 전용 위젯 생성 서비스

## 프로젝트 개요
URL 파라미터만으로 동작하는 **무상태(stateless) 노션 임베드 위젯** 생성 서비스.
서버·DB 없이 클라이언트 사이드에서 모든 렌더링을 처리한다.

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
│   │   └── life-calendar/page.tsx        # 인생 달력 위젯 에디터
│   └── widget/
│       ├── dday/page.tsx                 # D-Day 위젯 렌더링 (iframe용)
│       └── life-calendar/page.tsx        # 인생 달력 위젯 렌더링 (iframe용)
├── components/
│   ├── ui/                               # shadcn 공통 UI (button, card, input, label, select, switch)
│   └── widget/                           # 위젯 프리뷰 컴포넌트
│       ├── DdayWidgetPreview.tsx
│       ├── DdayProgressBar.tsx
│       └── LifeCalendarPreview.tsx
├── lib/                                  # 순수 유틸리티 (UI 무관)
│   ├── dday.ts
│   ├── life-calendar.ts
│   ├── fonts.ts
│   └── utils.ts                          # cn() — clsx + tailwind-merge
└── store/                                # Zustand 스토어 (에디터 페이지 전용)
    ├── useWidgetStore.ts                 # D-Day 위젯 상태
    └── useLifeCalendarStore.ts           # 인생 달력 위젯 상태
```

## 핵심 아키텍처 패턴

### 무상태 URL 파라미터 방식
모든 위젯 설정은 URL 쿼리 파라미터로 전달된다. DB/API 호출 없음.
- `/widget/dday?title=수능&date=2026-11-19&bg=1E1E1E&text=FFFFFF`
- `/widget/life-calendar?birthdate=1995-03-15&lifespan=90&color=22C55E`

### 위젯 추가 시 따라야 할 패턴 (5개 파일)
1. `src/lib/<widget>.ts` — 계산 로직 (순수 함수)
2. `src/store/use<Widget>Store.ts` — Zustand 스토어 (에디터용)
3. `src/components/widget/<Widget>Preview.tsx` — 프리뷰 컴포넌트
4. `src/app/widget/<widget>/page.tsx` — 위젯 렌더링 페이지 (`useSearchParams` + `Suspense`)
5. `src/app/create/<widget>/page.tsx` — 에디터 페이지 (좌측 폼 + 우측 프리뷰)
6. `src/app/page.tsx` — 홈에 카드 링크 추가

### 날짜 처리 규칙
시간대 안전을 위해 `new Date(year, month, day)` 로컬 자정 생성 패턴 사용.
`toLocalDate()`와 `todayLocal()` 헬퍼를 각 lib 파일에서 재구현한다.

### 색상 값
Hex 값을 `#` 없이 저장/전달 (`"2563EB"`, `"FFFFFF"`).
렌더링 시 `#${color}` 형태로 조합. `"transparent"`는 별도 처리.

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
