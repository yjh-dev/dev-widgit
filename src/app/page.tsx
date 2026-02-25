import Link from "next/link";
import { CalendarDays } from "lucide-react";

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
      </div>
    </div>
  );
}
