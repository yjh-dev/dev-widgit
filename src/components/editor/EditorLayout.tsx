"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface EditorLayoutProps {
  title: string;
  children: ReactNode;
}

export default function EditorLayout({ title, children }: EditorLayoutProps) {
  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          홈으로
        </Link>
        <h1 className="text-2xl font-bold mb-1">{title}</h1>
        <p className="text-muted-foreground text-sm mb-8">
          설정을 변경하면 오른쪽 프리뷰에 실시간으로 반영됩니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {children}
        </div>
      </div>
    </div>
  );
}
