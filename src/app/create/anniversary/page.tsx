"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateAnniversaryPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/create/dday");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-muted-foreground">D-Day 에디터로 이동 중...</p>
    </div>
  );
}
