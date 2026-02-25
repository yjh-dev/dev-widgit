import Link from "next/link";
import { CalendarDays, Clock, Grid3X3, Quote, Timer, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Widgit</h1>
      <p className="text-muted-foreground mb-10">
        URL 하나로 동작하는 노션 전용 위젯
      </p>

      <div className="grid gap-4 w-full max-w-sm">
        <Link
          href="/create/dday"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-accent"
        >
          <CalendarDays className="w-6 h-6 text-primary" />
          <div>
            <p className="font-semibold">D-Day 위젯</p>
            <p className="text-sm text-muted-foreground">
              목표일까지 남은 일수를 표시합니다
            </p>
          </div>
        </Link>

        <Link
          href="/create/life-calendar"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-accent"
        >
          <Grid3X3 className="w-6 h-6 text-primary" />
          <div>
            <p className="font-semibold">인생 달력 위젯</p>
            <p className="text-sm text-muted-foreground">
              기대수명을 주 단위로 시각화합니다
            </p>
          </div>
        </Link>

        <Link
          href="/create/time-progress"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-accent"
        >
          <TrendingUp className="w-6 h-6 text-primary" />
          <div>
            <p className="font-semibold">시간 진행률 바</p>
            <p className="text-sm text-muted-foreground">
              오늘·이번 달·올해의 진행률을 표시합니다
            </p>
          </div>
        </Link>

        <Link
          href="/create/clock"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-accent"
        >
          <Clock className="w-6 h-6 text-primary" />
          <div>
            <p className="font-semibold">미니멀 시계</p>
            <p className="text-sm text-muted-foreground">
              미니멀한 타이포그래피 시계를 표시합니다
            </p>
          </div>
        </Link>

        <Link
          href="/create/quote"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-accent"
        >
          <Quote className="w-6 h-6 text-primary" />
          <div>
            <p className="font-semibold">명언 카드</p>
            <p className="text-sm text-muted-foreground">
              감성 명언 텍스트 카드를 만듭니다
            </p>
          </div>
        </Link>

        <Link
          href="/create/pomodoro"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:bg-accent"
        >
          <Timer className="w-6 h-6 text-primary" />
          <div>
            <p className="font-semibold">뽀모도로 타이머</p>
            <p className="text-sm text-muted-foreground">
              집중·휴식을 번갈아 관리하는 타이머입니다
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
