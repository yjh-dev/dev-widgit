"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ThemeToggle from "@/components/ui/theme-toggle";
import { toast } from "sonner";
import { trackFeedbackSubmit } from "@/lib/analytics";


const GITHUB_REPO = "https://github.com/wiget-tree-app/wiget-tree";

const categories = [
  { value: "widget-request", label: "위젯 요청" },
  { value: "feature", label: "기능 개선" },
  { value: "bug", label: "버그 신고" },
  { value: "other", label: "기타" },
] as const;

const categoryLabels: Record<string, string> = {
  "widget-request": "위젯 요청",
  feature: "기능 개선",
  bug: "버그 신고",
  other: "기타",
};

export default function FeedbackPage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }
    if (!category) {
      toast.error("카테고리를 선택해주세요.");
      return;
    }

    const issueTitle = encodeURIComponent(
      `[${categoryLabels[category]}] ${title.trim()}`
    );
    const issueBody = encodeURIComponent(
      [
        `## 카테고리`,
        categoryLabels[category],
        "",
        "## 설명",
        description.trim() || "(설명 없음)",
        "",
        "---",
        "_이 이슈는 Wiget-Tree 피드백 페이지에서 자동 생성되었습니다._",
      ].join("\n")
    );

    const labelMap: Record<string, string> = {
      "widget-request": "widget-request",
      feature: "enhancement",
      bug: "bug",
      other: "feedback",
    };

    trackFeedbackSubmit(category);
    window.open(
      `${GITHUB_REPO}/issues/new?title=${issueTitle}&body=${issueBody}&labels=${labelMap[category] || "feedback"}`,
      "_blank"
    );
  };

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
          <ThemeToggle />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          피드백 & 위젯 요청
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          버그 신고, 기능 개선, 새 위젯 아이디어를 알려주세요.
        </p>
      </header>

      <main className="max-w-xl mx-auto px-6 pb-20">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">피드백 작성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback-title">제목</Label>
              <Input
                id="feedback-title"
                placeholder="간단한 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback-category">카테고리</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="feedback-category">
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback-desc">설명 (선택)</Label>
              <textarea
                id="feedback-desc"
                rows={5}
                placeholder="자세한 설명을 입력하세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <Button onClick={handleSubmit} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              GitHub Issues에 제출
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              제출 시 GitHub Issues 페이지가 열리며, GitHub 로그인이 필요합니다.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
