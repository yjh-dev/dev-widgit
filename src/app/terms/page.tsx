import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 — Widgit",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="pt-12 pb-8 px-6 text-center">
        <div className="max-w-3xl mx-auto flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">이용약관</h1>
        <p className="text-muted-foreground text-sm">최종 수정일: 2026년 3월 1일</p>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-20 prose prose-neutral dark:prose-invert prose-sm">
        <section>
          <h2>1. 서비스 개요</h2>
          <p>
            Widgit(이하 &quot;서비스&quot;)은 노션(Notion) 페이지에 임베드할 수 있는 위젯을 생성하는
            무료 웹 서비스입니다. 모든 위젯 설정은 URL 쿼리 파라미터에 저장되며,
            별도의 서버나 데이터베이스를 사용하지 않는 무상태(stateless) 아키텍처로 운영됩니다.
          </p>
        </section>

        <section>
          <h2>2. 이용 조건</h2>
          <ul>
            <li>본 서비스는 <strong>무료</strong>로 제공되며, 개인 및 상업적 용도로 사용할 수 있습니다.</li>
            <li>위젯 URL을 노션, 웹사이트, 블로그 등에 자유롭게 임베드할 수 있습니다.</li>
            <li>서비스를 이용하기 위해 회원가입이나 로그인은 필요하지 않습니다.</li>
            <li>서비스의 소스 코드를 무단으로 복제하여 별도 서비스를 운영하는 것은 금지합니다.</li>
          </ul>
        </section>

        <section>
          <h2>3. 데이터 처리</h2>
          <p>
            Widgit은 사용자의 개인정보를 서버에 저장하지 않습니다.
            일부 위젯(카운터, 투두리스트, 습관 트래커 등)은 브라우저의 <code>localStorage</code>를
            사용하여 상태를 유지하며, 이 데이터는 사용자의 기기에만 저장됩니다.
          </p>
        </section>

        <section>
          <h2>4. 면책 조항</h2>
          <ul>
            <li>서비스는 &quot;있는 그대로&quot;(as-is) 제공되며, 특정 목적에 대한 적합성을 보장하지 않습니다.</li>
            <li>서버 유지보수, 장애 등으로 인해 서비스가 일시적으로 중단될 수 있습니다.</li>
            <li>서비스 중단으로 인한 손해에 대해 책임을 지지 않습니다.</li>
            <li>위젯 URL에 저장된 데이터의 백업은 사용자의 책임입니다.</li>
          </ul>
        </section>

        <section>
          <h2>5. 지적 재산권</h2>
          <p>
            서비스의 디자인, 코드, 브랜드 등에 대한 지적 재산권은 Widgit에 있습니다.
            사용자가 생성한 위젯 콘텐츠(텍스트, 색상 설정 등)에 대한 권리는 사용자에게 있습니다.
          </p>
        </section>

        <section>
          <h2>6. 약관 변경</h2>
          <p>
            본 약관은 서비스 개선을 위해 사전 고지 없이 변경될 수 있습니다.
            변경된 약관은 본 페이지에 게시한 시점부터 효력이 발생합니다.
          </p>
        </section>

        <section>
          <h2>7. 문의</h2>
          <p>
            서비스 이용에 관한 문의는{" "}
            <Link href="/feedback" className="underline">피드백 페이지</Link>를 통해 접수할 수 있습니다.
          </p>
        </section>
      </main>
    </div>
  );
}
