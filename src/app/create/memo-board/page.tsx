"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateMemoBoardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/create/sticky-note");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-muted-foreground text-sm">메모지 위젯 에디터로 이동 중...</p>
    </div>
  );
}
