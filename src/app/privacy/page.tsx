import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 — Widgit",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-bold tracking-tight mb-2">개인정보처리방침</h1>
        <p className="text-muted-foreground text-sm">최종 수정일: 2026년 3월 1일</p>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-20 prose prose-neutral dark:prose-invert prose-sm">
        <section>
          <h2>1. 수집하는 개인정보</h2>
          <p>
            Widgit은 사용자의 개인정보를 <strong>수집하지 않습니다</strong>.
            회원가입, 로그인, 이메일 수집 등의 과정이 없으며,
            서버에 사용자 데이터를 저장하지 않습니다.
          </p>
        </section>

        <section>
          <h2>2. 로컬 저장소 (localStorage) 사용</h2>
          <p>
            일부 위젯 기능은 브라우저의 <code>localStorage</code>를 사용합니다.
            이 데이터는 사용자의 기기에만 저장되며, 서버로 전송되지 않습니다.
          </p>
          <ul>
            <li><strong>카운터 위젯</strong> — 현재 카운트 값</li>
            <li><strong>투두리스트 위젯</strong> — 할 일 항목 및 완료 상태</li>
            <li><strong>습관 트래커 위젯</strong> — 체크된 날짜</li>
            <li><strong>에디터 설정</strong> — 프리뷰 크기, 짧은 URL 토글, 온보딩 완료 여부</li>
            <li><strong>라이선스 키</strong> — 워터마크 제거용 키 (입력한 경우)</li>
            <li><strong>저장된 위젯</strong> — 내 위젯 대시보드 데이터</li>
          </ul>
          <p>
            브라우저의 개발자 도구 또는 설정에서 localStorage를 직접 삭제할 수 있습니다.
          </p>
        </section>

        <section>
          <h2>3. 외부 서비스</h2>
          <p>본 서비스는 다음 외부 서비스를 사용하며, 각 서비스의 개인정보처리방침이 적용됩니다.</p>
          <ul>
            <li>
              <strong>Google Analytics (GA4)</strong> — 서비스 이용 통계 수집 (페이지 조회수, 방문 경로 등).
              IP 주소는 익명화 처리됩니다.
            </li>
            <li>
              <strong>Google AdSense</strong> — 광고 표시 (활성화된 경우).
              쿠키를 사용하여 관심 기반 광고를 제공할 수 있습니다.
            </li>
            <li>
              <strong>Open-Meteo API</strong> — 날씨 위젯에서 기상 데이터를 가져옵니다.
              위도/경도 좌표만 전송되며, 개인 식별 정보는 포함되지 않습니다.
            </li>
            <li>
              <strong>GitHub API</strong> — GitHub 잔디 위젯에서 공개 기여 데이터를 가져옵니다.
              입력한 GitHub 사용자명의 공개 프로필만 조회합니다.
            </li>
            <li>
              <strong>Google Fonts</strong> — 웹 폰트 로딩에 사용됩니다.
            </li>
          </ul>
        </section>

        <section>
          <h2>4. 쿠키</h2>
          <p>
            Widgit 자체는 쿠키를 사용하지 않습니다. 다만 Google Analytics 및 Google AdSense가
            활성화된 경우, 해당 서비스에서 쿠키를 사용할 수 있습니다.
            브라우저 설정에서 쿠키를 차단하거나 삭제할 수 있습니다.
          </p>
        </section>

        <section>
          <h2>5. 아동 개인정보</h2>
          <p>
            본 서비스는 만 14세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다.
          </p>
        </section>

        <section>
          <h2>6. 방침 변경</h2>
          <p>
            본 방침은 서비스 변경에 따라 업데이트될 수 있습니다.
            변경 시 본 페이지에 게시하며, 게시 시점부터 효력이 발생합니다.
          </p>
        </section>

        <section>
          <h2>7. 문의</h2>
          <p>
            개인정보 관련 문의는{" "}
            <Link href="/feedback" className="underline">피드백 페이지</Link>를 통해 접수할 수 있습니다.
          </p>
        </section>
      </main>
    </div>
  );
}
