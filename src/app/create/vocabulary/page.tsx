"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateVocabularyPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/create/flashcard");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-muted-foreground">플래시카드 에디터로 이동 중...</p>
    </div>
  );
}
