"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WidgetErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-transparent gap-3">
      <p className="text-sm text-muted-foreground">위젯을 불러올 수 없습니다</p>
      <Button variant="outline" size="sm" onClick={reset}>
        <RotateCcw className="w-3 h-3 mr-1" />
        다시 시도
      </Button>
    </div>
  );
}
