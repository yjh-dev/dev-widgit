"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ThemeToggle from "@/components/ui/theme-toggle";

function StepBadge({ n }: { n: number }) {
  return (
    <span className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
      {n}
    </span>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="px-1.5 py-0.5 rounded bg-muted border text-xs font-mono">
      {children}
    </kbd>
  );
}

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-12 pb-8 px-6 text-center">
        <div className="max-w-3xl mx-auto flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
          <ThemeToggle />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          노션 임베드 가이드
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Wiget-Tree 위젯을 노션에 임베드하는 방법을 알아보세요.
        </p>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 pb-20 space-y-6">
        {/* 1. 기본 임베드 방법 */}
        <Card>
          <CardHeader>
            <CardTitle>기본 임베드 방법</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <StepBadge n={1} />
              <span className="text-sm text-muted-foreground">
                에디터에서 위젯을 만들고{" "}
                <strong className="text-foreground">URL 복사</strong> 버튼을
                클릭합니다.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <StepBadge n={2} />
              <span className="text-sm text-muted-foreground">
                노션 페이지에서 <Kbd>/embed</Kbd> 또는{" "}
                <Kbd>/임베드</Kbd>를 입력합니다.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <StepBadge n={3} />
              <span className="text-sm text-muted-foreground">
                복사한 URL을 붙여넣고{" "}
                <strong className="text-foreground">링크 임베드</strong>를
                클릭하면 완료!
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 2. 위젯 크기 조절 */}
        <Card>
          <CardHeader>
            <CardTitle>위젯 크기 조절</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              임베드 블록의 <strong className="text-foreground">모서리나 가장자리</strong>를
              드래그하면 크기를 자유롭게 조절할 수 있습니다.
            </p>
            <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
              <p className="font-medium text-foreground text-xs">위젯별 추천 크기</p>
              <ul className="space-y-1 text-xs">
                <li>
                  <strong className="text-foreground">전체 너비</strong> — 텍스트 배너, 그라데이션, 타임라인
                </li>
                <li>
                  <strong className="text-foreground">넓은 너비 (2/3~전체)</strong> — 미니 캘린더, 인생 달력, 습관 트래커
                </li>
                <li>
                  <strong className="text-foreground">중간 너비 (1/2)</strong> — 시계, 플립 시계, 아날로그 시계, D-Day, 명언 카드, 뽀모도로, 음악 플레이어, 메모지
                </li>
                <li>
                  <strong className="text-foreground">좁은 너비 (1/3)</strong> — 시간 진행률, 읽기 진행률, 목표 진행률, 날씨, 카운터, 스톱워치, QR 코드, 달 위상, 주사위, 북마크, 타이핑 효과
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 3. 레이아웃 팁 */}
        <Card>
          <CardHeader>
            <CardTitle>레이아웃 팁</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start gap-3">
              <StepBadge n={1} />
              <span>
                여러 위젯을 <strong className="text-foreground">나란히 배치</strong>하려면,
                노션에서 임베드 블록을 드래그해 다른 블록 옆으로 이동하세요.
                자동으로 <strong className="text-foreground">컬럼</strong>이 생성됩니다.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <StepBadge n={2} />
              <span>
                <strong className="text-foreground">2~3개 컬럼</strong>으로 시계 + 날씨 + 명언을
                나란히 배치하면 깔끔한 대시보드 헤더를 만들 수 있습니다.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <StepBadge n={3} />
              <span>
                텍스트 배너는 <strong className="text-foreground">전체 너비</strong>로 설정하면
                페이지 상단 헤더로 활용하기 좋습니다.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 4. 짧은 URL */}
        <Card>
          <CardHeader>
            <CardTitle>짧은 URL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              위젯 URL이 길어서 관리가 어렵다면, 에디터의{" "}
              <strong className="text-foreground">짧은 URL</strong> 토글을 켜보세요.
            </p>
            <div className="rounded-lg border bg-muted/50 p-4 space-y-2 text-xs">
              <p>
                <strong className="text-foreground">작동 원리:</strong>{" "}
                URL 파라미터를 LZ 압축하여 <Kbd>?c=&lt;compressed&gt;</Kbd> 형태로 단축합니다.
                압축 결과가 원본보다 길면 자동으로 원본 URL을 사용합니다.
              </p>
              <p>
                <strong className="text-foreground">호환성:</strong>{" "}
                기존 긴 URL과 짧은 URL 모두 정상 동작합니다.
                짧은 URL을 에디터에 불러올 때도 자동으로 해제됩니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 5. 투명 배경 활용 */}
        <Card>
          <CardHeader>
            <CardTitle>투명 배경 활용</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              에디터의 <strong className="text-foreground">색상</strong> 섹션에서{" "}
              <strong className="text-foreground">투명 배경</strong> 옵션을 켜면,
              위젯 배경이 투명해져 노션 페이지의 배경색과 자연스럽게 어울립니다.
            </p>
            <div className="rounded-lg border bg-muted/50 p-4 space-y-1.5 text-xs">
              <p>
                <strong className="text-foreground">팁:</strong> 노션의 밝은/어두운 모드에 모두 어울리도록
                글자 색상을 잘 선택하세요. 투명 배경에서는 글자색이 잘 보이는지 확인이 중요합니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 5. FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>자주 묻는 질문</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple">
              <AccordionItem value="q1">
                <AccordionTrigger className="text-sm">
                  위젯이 노션에서 보이지 않아요
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <Kbd>/embed</Kbd>가 아닌 <Kbd>/bookmark</Kbd>이나 다른 블록 타입으로 삽입한 경우
                    위젯이 정상적으로 표시되지 않을 수 있습니다.
                    반드시 <strong className="text-foreground">임베드</strong> 블록을 사용하세요.
                  </p>
                  <p>
                    또한, 위젯 URL이 올바르게 복사되었는지 확인하세요.
                    에디터에서 <strong className="text-foreground">URL 복사</strong> 버튼을 사용하면 정확한 URL을 받을 수 있습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger className="text-sm">
                  위젯 크기가 맞지 않아요
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    노션 임베드 블록의 크기를 직접 조절할 수 있습니다.
                    블록 모서리를 드래그하여 원하는 크기로 조절하세요.
                  </p>
                  <p>
                    위젯 내부의 글자 크기나 여백은 에디터의{" "}
                    <strong className="text-foreground">스타일</strong> 섹션에서 조절할 수 있습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger className="text-sm">
                  다크 모드에서 위젯이 어색해요
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    Wiget-Tree 위젯은 URL 파라미터로 색상을 직접 지정하므로,
                    노션의 다크 모드와 자동 연동되지 않습니다.
                  </p>
                  <p>
                    <strong className="text-foreground">투명 배경</strong>을 사용하면 배경은 자연스럽게 맞출 수 있고,
                    글자 색상은 밝은/어두운 모드 모두에서 잘 보이는 색(예: 중간 밝기의 색상)을 선택하는 것이 좋습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger className="text-sm">
                  위젯 설정을 변경하고 싶어요
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    위젯의 모든 설정은 URL에 담겨 있습니다.
                    에디터에서 설정을 변경한 후 새로운 URL을 복사하여
                    노션의 기존 임베드 블록에 붙여넣으면 됩니다.
                  </p>
                  <p>
                    기존 임베드 블록을 삭제하고 새로 만들거나,
                    블록을 클릭해 URL을 교체할 수 있습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5">
                <AccordionTrigger className="text-sm">
                  노션 모바일 앱에서도 위젯이 보이나요?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground space-y-2">
                  <p>
                    네, 노션 모바일 앱에서도 임베드 블록이 정상 표시됩니다.
                    다만 모바일에서는 위젯 크기 조절이 제한적이므로,
                    데스크톱에서 크기를 먼저 설정하는 것을 권장합니다.
                  </p>
                  <p>
                    인터랙티브 위젯(뽀모도로, 카운터, 스톱워치 등)은
                    모바일에서도 터치로 조작할 수 있습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q6">
                <AccordionTrigger className="text-sm">
                  서버가 다운되면 위젯도 안 보이나요?
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  <p>
                    Wiget-Tree은 서버리스 방식으로 동작하지만, 위젯 페이지를 호스팅하는
                    서버가 필요합니다. 서버가 일시적으로 다운되면 위젯이 로드되지 않을 수 있으나,
                    모든 설정이 URL에 저장되어 있으므로 서버가 복구되면 자동으로 정상 표시됩니다.
                    별도의 재설정은 필요 없습니다.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
