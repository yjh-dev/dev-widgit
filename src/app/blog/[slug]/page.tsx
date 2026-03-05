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
    title: `${article.title} — Wiget-Tree 블로그`,
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

      <h2>Wiget-Tree 소개</h2>
      <p>
        Wiget-Tree은 <strong>53종 이상의 노션 전용 위젯</strong>을 제공하는 무료 서비스입니다.
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
          <Link href="/">Wiget-Tree 홈</Link>에서 원하는 위젯을 선택하고 에디터에서 설정을 조절합니다.
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
        지금 바로 <Link href="/">Wiget-Tree</Link>에서 첫 위젯을 만들어보세요.
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

function DdayWidget() {
  return (
    <>
      <h2>D-Day 위젯이란?</h2>
      <p>
        노션에서 목표일까지 남은 일수를 실시간으로 보여주는 위젯입니다. 수능, 시험, 기념일, 여행 등
        중요한 날까지의 카운트다운을 노션 페이지에서 바로 확인할 수 있습니다.
      </p>

      <h2>D-Day 위젯 만들기 (3단계)</h2>
      <ol>
        <li><Link href="/create/dday">D-Day 에디터</Link>에 접속합니다.</li>
        <li><strong>제목</strong>과 <strong>목표 날짜</strong>를 설정합니다 (예: 수능, 2026-11-19).</li>
        <li>색상과 스타일을 원하는 대로 변경한 후, <strong>URL 복사</strong> → 노션에서 <code>/embed</code>로 붙여넣기.</li>
      </ol>

      <h2>고급 옵션</h2>
      <h3>시간 카운트다운</h3>
      <p>
        &quot;시간 카운트다운&quot; 옵션을 켜면 남은 시간이 <strong>시:분:초</strong>까지 표시됩니다.
        깜빡이는 구분자 효과로 더 몰입감 있는 D-Day를 만들 수 있습니다.
      </p>

      <h3>프로그레스 바</h3>
      <p>
        D-Day까지의 진행률을 시각적인 바로 표시합니다. 이미 지나간 기간을 직관적으로 확인할 수 있어
        동기부여에 효과적입니다.
      </p>

      <h3>완료 메시지</h3>
      <p>
        D-Day가 지난 후 표시할 메시지를 설정할 수 있습니다.
        예: &quot;시험 끝! 수고했어요 🎉&quot;
      </p>

      <h3>날짜 표시 형식</h3>
      <p>
        날짜를 다양한 형식으로 표시할 수 있습니다:
        2026년 11월 19일 (전체) / 11월 19일 (짧게) / 2026.11.19 (점) / 미표시.
      </p>

      <h2>추천 활용 사례</h2>
      <ul>
        <li><strong>수능/시험:</strong> 시험일 카운트다운 + 시간 표시 ON</li>
        <li><strong>기념일:</strong> 100일, 생일 등 경과일 표시</li>
        <li><strong>프로젝트:</strong> 마감일 관리 + 프로그레스 바</li>
        <li><strong>여행:</strong> 여행 출발일까지 설렘 카운트다운</li>
      </ul>

      <h2>바로 만들어보세요</h2>
      <p>
        <Link href="/create/dday">D-Day 위젯 에디터 →</Link>에서 30초만에 위젯을 만들 수 있습니다.
        회원가입 없이 완전 무료입니다.
      </p>
    </>
  );
}

function PomodoroTimer() {
  return (
    <>
      <h2>뽀모도로 기법이란?</h2>
      <p>
        <strong>뽀모도로 기법</strong>(Pomodoro Technique)은 이탈리아의 프란체스코 시릴로가 개발한
        시간 관리 방법입니다. 25분 집중 + 5분 휴식을 반복하고, 4라운드마다 긴 휴식(15분)을 취합니다.
      </p>
      <p>
        이 기법의 핵심은 짧은 시간에 완전히 몰입하고, 정해진 시간만큼 확실히 쉬는 것입니다.
        공부, 업무, 코딩 등 어떤 작업에든 효과적입니다.
      </p>

      <h2>노션 뽀모도로 위젯 만들기</h2>
      <ol>
        <li><Link href="/create/pomodoro">뽀모도로 에디터</Link>에 접속합니다.</li>
        <li>집중 시간(기본 25분), 휴식 시간(기본 5분)을 설정합니다.</li>
        <li>색상과 프로그레스 스타일(바/링)을 선택합니다.</li>
        <li>URL을 복사해 노션에 임베드합니다.</li>
      </ol>

      <h2>주요 옵션</h2>
      <h3>프로그레스 스타일</h3>
      <p>
        <strong>바(Bar)</strong>: 가로 진행률 바로 남은 시간을 표시합니다. 넓은 위젯에 적합합니다.<br />
        <strong>링(Ring)</strong>: 원형 프로그레스로 남은 시간을 표시합니다. 정사각형 위젯에 적합합니다.
      </p>

      <h3>라운드 시스템</h3>
      <p>
        라운드 수(기본 4)를 설정하고, 현재 몇 라운드인지 표시할 수 있습니다.
        4라운드가 끝나면 긴 휴식(기본 15분)으로 전환됩니다.
      </p>

      <h3>자동 시작</h3>
      <p>
        &quot;자동 시작&quot; 옵션을 켜면 페이지를 열자마자 타이머가 자동으로 시작됩니다.
      </p>

      <h2>효과적인 뽀모도로 사용법</h2>
      <ul>
        <li>한 뽀모도로(25분) 동안은 <strong>하나의 작업만</strong> 집중합니다.</li>
        <li>휴식 시간에는 화면에서 눈을 떼고, 물 마시기·스트레칭을 합니다.</li>
        <li>방해 요소가 떠오르면 메모하고, 현재 뽀모도로가 끝난 후 처리합니다.</li>
        <li><Link href="/create/todo">투두리스트 위젯</Link>과 함께 사용하면 더욱 효과적입니다.</li>
      </ul>

      <h2>지금 시작하세요</h2>
      <p>
        <Link href="/create/pomodoro">뽀모도로 위젯 에디터 →</Link>에서 나만의 타이머를 만들어보세요.
      </p>
    </>
  );
}

function ClockWidget() {
  return (
    <>
      <h2>노션 시계 위젯 4종 비교</h2>
      <p>
        Wiget-Tree은 4가지 서로 다른 스타일의 시계 위젯을 제공합니다.
        각각의 특징과 어울리는 노션 페이지 스타일을 비교해보겠습니다.
      </p>

      <h3>1. 미니멀 시계</h3>
      <p>
        깔끔한 디지털 타이포그래피 시계입니다. 6종 한국어 폰트를 선택할 수 있어
        노션 페이지 분위기에 맞출 수 있습니다. 초 표시, 날짜 표시, 구분자 깜빡임 옵션을 지원합니다.
      </p>
      <p><Link href="/create/clock">미니멀 시계 만들기 →</Link></p>

      <h3>2. 아날로그 시계</h3>
      <p>
        클래식한 원형 시계입니다. 숫자 스타일(전체/4방향), 초침, 눈금, 테두리를 세밀하게 커스터마이징할 수 있습니다.
        시계판, 시침, 분침, 초침 색상을 각각 설정 가능합니다.
      </p>
      <p><Link href="/create/analog-clock">아날로그 시계 만들기 →</Link></p>

      <h3>3. 플립 시계</h3>
      <p>
        공항 스플릿 플랩 디스플레이 스타일의 레트로 시계입니다.
        CSS 3D 플립 애니메이션으로 숫자가 넘어가는 효과를 보여줍니다.
        다크한 노션 페이지에 특히 잘 어울립니다.
      </p>
      <p><Link href="/create/flip-clock">플립 시계 만들기 →</Link></p>

      <h3>4. 세계 시계</h3>
      <p>
        여러 타임존의 시간을 한눈에 비교할 수 있습니다. 최대 4개 도시를 동시에 표시하며,
        19개 주요 도시를 지원합니다. 해외 팀과 협업하거나 유학 준비 중이라면 유용합니다.
      </p>
      <p><Link href="/create/world-clock">세계 시계 만들기 →</Link></p>

      <h2>어떤 시계를 선택할까?</h2>
      <ul>
        <li><strong>미니멀 대시보드:</strong> 미니멀 시계 — 깔끔하고 작은 공간에 적합</li>
        <li><strong>감성 노션:</strong> 아날로그 시계 — 클래식하고 따뜻한 느낌</li>
        <li><strong>다크 테마:</strong> 플립 시계 — 레트로하고 개성 있는 디자인</li>
        <li><strong>글로벌 업무:</strong> 세계 시계 — 타임존 비교 필수</li>
      </ul>

      <h2>19개 지원 도시</h2>
      <p>
        서울, 도쿄, 상하이, 홍콩, 방콕, 싱가포르, 뭄바이, 두바이, 시드니, 오클랜드,
        런던, 파리, 베를린, 모스크바, 뉴욕, 시카고, LA, 상파울루, 하와이
      </p>
    </>
  );
}

function GithubContribution() {
  return (
    <>
      <h2>GitHub 잔디 위젯이란?</h2>
      <p>
        GitHub의 기여 히트맵(일명 &quot;잔디&quot;)을 노션 페이지에 임베드할 수 있는 위젯입니다.
        개발 공부 기록, 포트폴리오, 일일 코딩 습관 추적 등에 활용할 수 있습니다.
      </p>

      <h2>위젯 만들기</h2>
      <ol>
        <li><Link href="/create/github-contribution">GitHub 잔디 에디터</Link>에 접속합니다.</li>
        <li><strong>GitHub 사용자명</strong>을 입력합니다 (예: torvalds).</li>
        <li>연도, 색상, 셀 모양 등을 설정합니다.</li>
        <li>URL을 복사해 노션에 임베드합니다.</li>
      </ol>

      <h2>커스터마이징 옵션</h2>
      <h3>연도 선택</h3>
      <p>
        &quot;최근 1년&quot;(기본) 또는 특정 연도(2025, 2024 등)를 선택할 수 있습니다.
        과거 기록도 확인할 수 있어 연간 비교에 유용합니다.
      </p>

      <h3>셀 스타일</h3>
      <p>
        셀 모양을 사각형, 둥근 사각형, 원형 중에서 선택할 수 있습니다.
        셀 크기도 소(sm), 중(md), 대(lg) 중에서 선택 가능합니다.
      </p>

      <h3>표시 옵션</h3>
      <ul>
        <li><strong>총 기여 수:</strong> 연간 총 커밋 수를 상단에 표시</li>
        <li><strong>사용자명:</strong> GitHub 아이디를 표시</li>
        <li><strong>언어:</strong> 한국어/영어 전환</li>
      </ul>

      <h2>활용 아이디어</h2>
      <ul>
        <li><strong>개발자 포트폴리오:</strong> 프로필 카드 + 잔디 위젯으로 개발 활동 시각화</li>
        <li><strong>코딩 습관 추적:</strong> 습관 트래커 + 잔디 위젯으로 일일 코딩 습관 관리</li>
        <li><strong>팀 대시보드:</strong> 팀원별 잔디 위젯을 나란히 배치하여 기여도 비교</li>
      </ul>

      <h2>바로 만들기</h2>
      <p>
        <Link href="/create/github-contribution">GitHub 잔디 위젯 에디터 →</Link>
      </p>
    </>
  );
}

function QuoteWidget() {
  return (
    <>
      <h2>명언 위젯이란?</h2>
      <p>
        좋아하는 명언, 글귀, 좌우명을 감성적인 카드 형태로 만들어 노션에 임베드하는 위젯입니다.
        매일 노션을 열 때마다 동기부여를 받을 수 있는 나만의 명언 카드를 만들어보세요.
      </p>

      <h2>명언 위젯 만들기</h2>
      <ol>
        <li><Link href="/create/quote">명언 카드 에디터</Link>에 접속합니다.</li>
        <li><strong>명언 텍스트</strong>와 <strong>저자</strong>를 입력합니다.</li>
        <li>폰트, 색상, 정렬 등을 설정합니다.</li>
        <li>URL을 복사해 노션에 임베드합니다.</li>
      </ol>

      <h2>디자인 커스터마이징</h2>
      <h3>폰트 선택</h3>
      <p>
        6종의 한국어 웹폰트를 지원합니다. 세리프(명조)체는 클래식한 느낌,
        손글씨체(Gaegu)는 따뜻한 느낌을 줍니다. 노션 페이지 분위기에 맞게 선택하세요.
      </p>

      <h3>따옴표 장식</h3>
      <p>
        큰 따옴표 아이콘을 표시/숨김할 수 있습니다. 따옴표를 켜면 명언 느낌이 더 살아납니다.
      </p>

      <h3>정렬과 줄 간격</h3>
      <p>
        텍스트 정렬(왼쪽/가운데/오른쪽)과 줄 간격(좁게/보통/넓게)을 조절하여
        긴 명언도 가독성 좋게 표시할 수 있습니다.
      </p>

      <h3>구분선</h3>
      <p>
        명언 본문과 저자 사이에 얇은 구분선을 넣어 깔끔하게 분리할 수 있습니다.
      </p>

      <h2>추천 명언</h2>
      <ul>
        <li>&quot;오늘 할 수 있는 일에 최선을 다하자&quot; — 벤자민 프랭클린</li>
        <li>&quot;시작이 반이다&quot; — 아리스토텔레스</li>
        <li>&quot;작은 것에도 최선을&quot;</li>
        <li>&quot;꾸준함이 재능을 이긴다&quot;</li>
      </ul>

      <h2>감성 조합 아이디어</h2>
      <p>
        명언 카드 단독으로도 좋지만, 다른 감성 위젯과 조합하면 더 멋집니다:
      </p>
      <ul>
        <li>명언 카드 + <Link href="/create/gradient">그라데이션 배너</Link></li>
        <li>명언 카드 + <Link href="/create/moon-phase">달 위상</Link></li>
        <li>명언 카드 + <Link href="/create/sticky-note">메모지</Link></li>
      </ul>

      <h2>시작하기</h2>
      <p>
        <Link href="/create/quote">명언 카드 에디터 →</Link>에서 지금 바로 나만의 명언 카드를 만들어보세요.
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
  "notion-dday-widget": DdayWidget,
  "notion-pomodoro-timer": PomodoroTimer,
  "notion-clock-widget": ClockWidget,
  "notion-github-contribution": GithubContribution,
  "notion-quote-widget": QuoteWidget,
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
