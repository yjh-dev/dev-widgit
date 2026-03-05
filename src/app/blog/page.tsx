import Link from "next/link";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { articles } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "블로그 — Wiget-Tree",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="pt-12 pb-8 px-6 text-center">
        <div className="max-w-3xl mx-auto flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">블로그</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          노션 위젯 활용법과 생산성 팁을 공유합니다.
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-20 space-y-4">
        {articles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`}>
            <Card className="hover:border-foreground/20 transition-colors cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {article.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{article.date}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}분
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {article.tags.slice(0, 3).join(", ")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </main>
    </div>
  );
}
