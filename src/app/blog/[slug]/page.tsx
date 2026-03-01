import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { articles, getArticle } from "@/lib/blog";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Widgit 블로그`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      tags: article.tags,
    },
  };
}

function NotionWidgetGuide() {
  return (
    <>
      <h2>노션 위젯이란?</h2>
      <p>
        노션(Notion)은 강력한 문서 작성 도구이지만, 기본 제공되는 임베드 블록만으로는
        대시보드나 꾸미기에 한계가 있습니다. <strong>노션 위젯</strong>은 노션 페이지에
        임베드할 수 있는 외부 웹 콘텐츠로, 시계, D-Day 카운트다운, 진행률 바 등
        다양한 기능을 노션 안에서 바로 사용할 수 있게 해줍니다.
      </p>

      <h2>Widgit 소개</h2>
      <p>
        Widgit은 <strong>53종 이상의 노션 전용 위젯</strong>을 제공하는 무료 서비스입니다.
        모든 설정이 URL에 담기는 무상태 구조라 회원가입이나 서버 비용 없이,
        URL 하나로 위젯이 동작합니다.
      </p>
      <ul>
        <li>D-Day 카운트다운, 시계, 아날로그 시계, 플립 시계</li>
        <li>시간 진행률, 목표 진행률, 인생 달력</li>
        <li>뽀모도로 타이머, 스톱워치, 습관 트래커</li>
        <li>명언 카드, 텍스트 배너, 메모지, 타이프라이터</li>
        <li>날씨, 달 위상, 그라데이션, QR 코드 등</li>
      </ul>

      <h2>노션에 위젯 임베드하는 방법</h2>
      <ol>
        <li>
          <strong>위젯 만들기:</strong>{" "}
          <Link href="/">Widgit 홈</Link>에서 원하는 위젯을 선택하고 에디터에서 설정을 조절합니다.
        </li>
        <li>
          <strong>URL 복사:</strong> 에디터 좌측의 &quot;URL 복사&quot; 버튼을 클릭합니다.
        </li>
        <li>
          <strong>노션에서 임베드:</strong> 노션 페이지에서 <code>/embed</code> 또는{" "}
          <code>/임베드</code>를 입력하고, 복사한 URL을 붙여넣은 뒤 &quot;링크 임베드&quot;를 클릭합니다.
        </li>
        <li>
          <strong>크기 조절:</strong> 임베드 블록의 모서리를 드래그하여 원하는 크기로 조절합니다.
        </li>
      </ol>

      <h2>추천 위젯 조합</h2>
      <p>
        노션 페이지를 더 멋지게 꾸미고 싶다면, 여러 위젯을 조합해보세요.
      </p>
      <ul>
        <li>
          <strong>미니멀 헤더:</strong> 시계 + 날씨 + 명언을 3열로 나란히 배치
        </li>
        <li>
          <strong>학생 대시보드:</strong> D-Day + 뽀모도로 + 시간 진행률 + 습관 트래커
        </li>
        <li>
          <strong>감성 노션:</strong> 그라데이션 배너 + 메모지 + 명언 + 달 위상
        </li>
        <li>
          <strong>독서 기록:</strong> 읽기 진행률 + 목표 진행률 + 타임라인
        </li>
      </ul>
      <p>
        더 많은 조합은 <Link href="/templates">추천 조합 페이지</Link>에서 확인할 수 있습니다.
      </p>

      <h2>시작해보세요</h2>
      <p>
        지금 바로 <Link href="/">Widgit</Link>에서 첫 위젯을 만들어보세요.
        회원가입 없이, 무료로, 30초만에 나만의 노션 위젯을 완성할 수 있습니다.
      </p>
    </>
  );
}

function ProductivityDashboard() {
  return (
    <>
      <h2>노션 생산성 대시보드란?</h2>
      <p>
        노션을 단순한 메모 앱이 아닌 <strong>나만의 생산성 허브</strong>로 만들 수 있습니다.
        핵심은 중요한 정보를 한 페이지에 모아 한눈에 파악하는 것입니다.
        위젯을 활용하면 시각적이고 인터랙티브한 대시보드를 쉽게 구성할 수 있습니다.
      </p>

      <h2>필수 위젯 4종</h2>

      <h3>1. D-Day 카운트다운</h3>
      <p>
        시험, 프로젝트 마감, 중요 일정까지 남은 일수를 실시간으로 표시합니다.
        시간 카운트다운 옵션을 켜면 시:분:초까지 볼 수 있어 긴장감을 유지하는 데 효과적입니다.
      </p>
      <p>
        <Link href="/create/dday">D-Day 위젯 만들기 →</Link>
      </p>

      <h3>2. 뽀모도로 타이머</h3>
      <p>
        25분 집중 + 5분 휴식의 뽀모도로 기법을 노션 안에서 바로 실행할 수 있습니다.
        라운드 표시, 자동 시작, 링/바 프로그레스 등 세밀한 커스터마이징이 가능합니다.
      </p>
      <p>
        <Link href="/create/pomodoro">뽀모도로 위젯 만들기 →</Link>
      </p>

      <h3>3. 습관 트래커</h3>
      <p>
        매일의 습관 달성 여부를 체크하는 인터랙티브 위젯입니다.
        주간/월간 뷰를 지원하며, 체크 기록은 브라우저에 자동 저장됩니다.
        운동, 독서, 공부 등 반복 습관 형성에 유용합니다.
      </p>
      <p>
        <Link href="/create/habit">습관 트래커 만들기 →</Link>
      </p>

      <h3>4. 시간/목표 진행률</h3>
      <p>
        올해, 이번 달, 이번 주가 얼마나 지났는지 프로그레스 바로 시각화합니다.
        목표 진행률 위젯과 함께 사용하면 저축, 운동, 학습 목표의 달성률도 추적할 수 있습니다.
      </p>
      <p>
        <Link href="/create/time-progress">시간 진행률 만들기 →</Link>
      </p>

      <h2>레이아웃 팁</h2>
      <ul>
        <li>
          <strong>상단 헤더:</strong> D-Day + 시계 + 날씨를 3열로 배치하면
          대시보드의 &quot;헤더&quot; 역할을 합니다.
        </li>
        <li>
          <strong>중간 섹션:</strong> 뽀모도로와 습관 트래커를 2열로 나란히 놓습니다.
        </li>
        <li>
          <strong>하단 요약:</strong> 시간 진행률 + 목표 진행률을 배치해
          전체 달성 현황을 한눈에 파악합니다.
        </li>
        <li>
          <strong>구분선 활용:</strong> 그라데이션 위젯을 얇게(전체폭) 넣으면
          섹션 간 시각적 구분이 됩니다.
        </li>
      </ul>

      <h2>지금 시작하세요</h2>
      <p>
        <Link href="/templates">추천 조합 페이지</Link>에서 &quot;학생 대시보드&quot; 또는
        &quot;시간관리 마스터&quot; 프리셋을 참고하면, 위젯 URL을 한 번에 복사해
        바로 노션에 붙여넣을 수 있습니다.
      </p>
      <p>
        나만의 생산성 대시보드를 만들어, 노션을 매일 열고 싶은 공간으로 바꿔보세요.
      </p>
    </>
  );
}

function HabitTracker() {
  return (
    <>
      <h2>습관 관리, 왜 노션에서?</h2>
      <p>
        습관 형성의 핵심은 <strong>매일 눈에 보이는 곳에서 체크하는 것</strong>입니다.
        노션을 매일 여는 사람이라면, 노션 안에 습관 트래커를 두는 것이 가장 효과적입니다.
        별도 앱을 설치할 필요 없이, 노션 페이지를 열면 바로 체크할 수 있습니다.
      </p>

      <h2>습관 트래커 위젯 설정하기</h2>
      <ol>
        <li>
          <Link href="/create/habit">습관 트래커 에디터</Link>를 엽니다.
        </li>
        <li>
          <strong>제목</strong>에 추적할 습관을 입력합니다 (예: 운동, 독서, 물 마시기).
        </li>
        <li>
          <strong>뷰</strong>를 선택합니다 — 주간(week)은 한 주 단위, 월간(month)은 한 달 전체를 봅니다.
        </li>
        <li>
          색상을 취향에 맞게 변경하고, <strong>URL 복사</strong> → 노션에 <code>/embed</code>합니다.
        </li>
      </ol>

      <h2>효과적인 습관 트래킹 팁</h2>
      <ul>
        <li>
          <strong>한 번에 하나씩:</strong> 처음에는 1~2개 습관만 트래킹하세요.
          너무 많으면 부담이 됩니다.
        </li>
        <li>
          <strong>구체적으로:</strong> &quot;운동&quot;보다 &quot;팔굽혀펴기 20회&quot;가 체크하기 쉽습니다.
        </li>
        <li>
          <strong>보이는 곳에:</strong> 노션 메인 페이지 상단에 배치하면 매일 확인하게 됩니다.
        </li>
        <li>
          <strong>연속 기록 유지:</strong> 체크가 이어지는 것을 보면 동기부여가 됩니다.
          일부러라도 연속을 유지해보세요.
        </li>
      </ul>

      <h2>함께 쓰면 좋은 위젯</h2>
      <ul>
        <li>
          <Link href="/create/water-tracker">물 마시기 트래커</Link> — 하루 물 섭취 목표 관리
        </li>
        <li>
          <Link href="/create/goal">목표 진행률</Link> — 월간 운동 횟수 같은 수치 목표 추적
        </li>
        <li>
          <Link href="/create/todo">투두리스트</Link> — 오늘의 할 일과 함께 습관 체크
        </li>
        <li>
          <Link href="/create/counter">카운터</Link> — 총 달성 횟수 누적 기록
        </li>
      </ul>

      <h2>지금 시작하세요</h2>
      <p>
        <Link href="/create/habit">습관 트래커 만들기 →</Link>
      </p>
      <p>
        체크 기록은 브라우저에 자동 저장되므로, 매일 노션을 열어 체크만 하면 됩니다.
        작은 습관부터 시작해보세요.
      </p>
    </>
  );
}

function AestheticDecoration() {
  return (
    <>
      <h2>노션도 예쁠 수 있다</h2>
      <p>
        노션은 기본적으로 심플한 디자인이지만, 위젯을 활용하면
        <strong> 나만의 감성 페이지</strong>를 만들 수 있습니다.
        색상, 폰트, 애니메이션을 자유롭게 조합해 인스타그램 감성의 노션 페이지를 완성해보세요.
      </p>

      <h2>감성 위젯 TOP 7</h2>

      <h3>1. 그라데이션 배너</h3>
      <p>
        페이지 상단에 컬러풀한 그라데이션 배너를 넣으면 분위기가 확 달라집니다.
        2~4색 조합, 방향, 애니메이션까지 설정 가능합니다.
      </p>
      <p><Link href="/create/gradient">그라데이션 만들기 →</Link></p>

      <h3>2. 메모지 (포스트잇)</h3>
      <p>
        손글씨 폰트의 포스트잇 스타일 메모. 핀이나 테이프 장식을 붙이고,
        살짝 기울여 놓으면 아날로그 감성이 살아납니다.
      </p>
      <p><Link href="/create/sticky-note">메모지 만들기 →</Link></p>

      <h3>3. 타이프라이터</h3>
      <p>
        텍스트가 한 글자씩 타이핑되는 애니메이션 효과.
        소개 문구나 좌우명을 이 위젯으로 표시하면 눈길을 끕니다.
      </p>
      <p><Link href="/create/typewriter">타이프라이터 만들기 →</Link></p>

      <h3>4. 달 위상</h3>
      <p>
        현재 달의 모양을 실시간으로 보여주는 위젯.
        다크 배경과 함께 사용하면 몽환적인 분위기를 연출합니다.
      </p>
      <p><Link href="/create/moon-phase">달 위상 만들기 →</Link></p>

      <h3>5. 명언 카드</h3>
      <p>
        좋아하는 문구를 세리프 폰트로 예쁘게 표시.
        따옴표 아이콘, 이탤릭, 구분선 등으로 카드 스타일을 꾸밀 수 있습니다.
      </p>
      <p><Link href="/create/quote">명언 카드 만들기 →</Link></p>

      <h3>6. 이모지 비</h3>
      <p>
        이모지가 화면에 떨어지는 장식 애니메이션. 투명 배경이라
        노션 페이지 위에 자연스럽게 겹쳐집니다.
      </p>
      <p><Link href="/create/emoji-rain">이모지 비 만들기 →</Link></p>

      <h3>7. 음악 플레이어</h3>
      <p>
        좋아하는 곡 정보를 예쁜 카드로 표시하는 장식용 위젯.
        앨범아트 색상을 바꿔 페이지 분위기에 맞출 수 있습니다.
      </p>
      <p><Link href="/create/music">음악 플레이어 만들기 →</Link></p>

      <h2>추천 조합: 감성 노션 페이지</h2>
      <ol>
        <li><strong>상단:</strong> 그라데이션 배너 (전체폭)</li>
        <li><strong>중간 좌:</strong> 타이프라이터 + 명언 카드</li>
        <li><strong>중간 우:</strong> 메모지 + 달 위상</li>
        <li><strong>하단:</strong> 구분선 + 음악 플레이어</li>
      </ol>
      <p>
        <Link href="/templates">추천 조합 페이지</Link>의 &quot;감성 꾸미기&quot; 프리셋을
        참고하세요.
      </p>
    </>
  );
}

function StudentDashboard() {
  return (
    <>
      <h2>학생에게 노션이 필요한 이유</h2>
      <p>
        수업, 시험, 과제, 동아리... 학생 생활은 관리할 것이 많습니다.
        노션에 모든 정보를 모아두고, 위젯으로 핵심 정보를 시각화하면
        매일 열고 싶은 <strong>나만의 학생 대시보드</strong>가 됩니다.
      </p>

      <h2>필수 위젯 5선</h2>

      <h3>1. 수능/시험 D-Day</h3>
      <p>
        수능, 중간고사, 기말고사까지 남은 일수를 실시간으로 표시합니다.
        시간 카운트다운까지 켜면 긴장감을 유지하는 데 효과적입니다.
      </p>
      <p><Link href="/create/dday">D-Day 위젯 만들기 →</Link></p>

      <h3>2. 시간표</h3>
      <p>
        주 5일 시간표를 그리드로 깔끔하게 표시합니다.
        과목별 색상을 지정하면 한눈에 파악할 수 있습니다.
      </p>
      <p><Link href="/create/timetable">시간표 위젯 만들기 →</Link></p>

      <h3>3. 뽀모도로 타이머</h3>
      <p>
        25분 집중 + 5분 휴식 사이클로 효율적인 공부가 가능합니다.
        노션을 열어두고 바로 타이머를 실행할 수 있어 편리합니다.
      </p>
      <p><Link href="/create/pomodoro">뽀모도로 만들기 →</Link></p>

      <h3>4. 공부 습관 트래커</h3>
      <p>
        매일 공부했는지 체크하는 습관 위젯.
        연속으로 체크가 이어지면 &quot;깨고 싶지 않은&quot; 동기부여가 생깁니다.
      </p>
      <p><Link href="/create/habit">습관 트래커 만들기 →</Link></p>

      <h3>5. 시험 일정 타임라인</h3>
      <p>
        중간고사, 기말고사, 수능 등 주요 일정을 타임라인으로 한눈에 봅니다.
        각 이벤트까지 남은 D-Day가 자동으로 표시됩니다.
      </p>
      <p><Link href="/create/timeline">타임라인 만들기 →</Link></p>

      <h2>학생 대시보드 레이아웃</h2>
      <ul>
        <li><strong>1행:</strong> D-Day (크게) + 미니 캘린더</li>
        <li><strong>2행:</strong> 뽀모도로 + 시간 진행률</li>
        <li><strong>3행:</strong> 습관 트래커 + 시험 타임라인</li>
        <li><strong>전체폭 하단:</strong> 시간표</li>
      </ul>

      <h2>바로 시작하기</h2>
      <p>
        <Link href="/templates">추천 조합 페이지</Link>에서 &quot;학생 대시보드&quot;
        프리셋의 위젯 URL을 한 번에 복사해 노션에 붙여넣을 수 있습니다.
      </p>
      <p>
        또는 위의 링크에서 각 위젯을 하나씩 커스터마이징해 나만의 대시보드를 만들어보세요.
      </p>
    </>
  );
}

const articleComponents: Record<string, React.FC> = {
  "notion-widget-guide": NotionWidgetGuide,
  "notion-productivity-dashboard": ProductivityDashboard,
  "notion-habit-tracker": HabitTracker,
  "notion-aesthetic-decoration": AestheticDecoration,
  "notion-student-dashboard": StudentDashboard,
};

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const Content = articleComponents[slug];
  if (!Content) notFound();

  return (
    <div className="min-h-screen bg-background">
      <header className="pt-12 pb-8 px-6 text-center">
        <div className="max-w-3xl mx-auto flex items-center justify-between mb-6">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            블로그
          </Link>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          {article.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span>{article.date}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}분 읽기
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-20 prose prose-neutral dark:prose-invert prose-sm">
        <Content />
      </main>
    </div>
  );
}
