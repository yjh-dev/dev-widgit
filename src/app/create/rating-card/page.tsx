"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateRatingCardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/create/testimonial");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <p className="text-muted-foreground">후기 카드 에디터로 이동 중...</p>
    </div>
  );
}
