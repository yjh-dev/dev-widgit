"use client";

import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreateErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="max-w-sm text-center space-y-4">
        <h2 className="text-xl font-bold">문제가 발생했습니다</h2>
        <p className="text-sm text-muted-foreground">
          위젯 설정 중 오류가 발생했습니다. 다시 시도하거나 홈으로 돌아가 주세요.
        </p>
        <div className="flex gap-2 justify-center">
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            다시 시도
          </Button>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              홈으로
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
