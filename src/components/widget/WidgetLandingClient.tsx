"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ThemeToggle from "@/components/ui/theme-toggle";
import WidgetRenderer from "@/components/widget/WidgetRenderer";
import { getHomeThumbnailProps } from "@/lib/templates/home-thumbnails";
import { getWidgetIcon } from "@/lib/widget-names";
import type { WidgetType } from "@/lib/templates";
import type { WidgetLanding } from "@/lib/widget-landing";
import { trackLandingCta } from "@/lib/analytics";
import { useHomePath } from "@/lib/use-home-path";

interface WidgetLandingClientProps {
  slug: string;
  name: string;
  desc: string;
  landing: WidgetLanding;
}

export default function WidgetLandingClient({
  slug,
  name,
  desc,
  landing,
}: WidgetLandingClientProps) {
  const [mounted, setMounted] = useState(false);
  const homePath = useHomePath();
  useEffect(() => setMounted(true), []);

  const Icon = getWidgetIcon(slug as WidgetType);
  const previewProps = getHomeThumbnailProps(slug as WidgetType);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-12 pb-4 px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between mb-8">
          <Link
            href={homePath}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-20">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
            <Icon className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">{name}</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">{desc}</p>
        </div>

        {/* Live Preview */}
        <Card className="mb-10 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative w-full aspect-[2/1] overflow-hidden bg-muted">
              {mounted && (
                <div
                  className="absolute inset-0 origin-top-left"
                  style={{
                    width: "200%",
                    height: "200%",
                    transform: "scale(0.5)",
                    pointerEvents: "none",
                  }}
                >
                  <WidgetRenderer
                    type={slug as WidgetType}
                    props={previewProps}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Button size="lg" asChild onClick={() => trackLandingCta(slug)}>
            <Link href={`/create/${slug}`}>
              지금 만들기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/guide">임베드 방법 보기</Link>
          </Button>
        </div>

        {/* Features */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            주요 기능
          </h2>
          <div className="grid gap-3">
            {landing.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border p-4"
              >
                <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                  {i + 1}
                </span>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            이런 곳에 활용하세요
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {landing.useCases.map((useCase, i) => (
              <div
                key={i}
                className="rounded-lg bg-muted/50 border p-4 text-sm"
              >
                {useCase}
              </div>
            ))}
          </div>
        </section>

        {/* How to embed */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">노션에 임베드하는 방법</h2>
          <div className="rounded-lg border bg-muted/50 p-5 space-y-3">
            {[
              <>에디터에서 위젯을 만들고 <strong className="text-foreground">URL 복사</strong> 클릭</>,
              <>노션에서 <kbd className="px-1.5 py-0.5 rounded bg-muted border text-xs font-mono">/embed</kbd> 입력</>,
              <>복사한 URL 붙여넣기 → <strong className="text-foreground">링크 임베드</strong> 클릭</>,
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground">{step}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center rounded-xl border bg-muted/30 p-8">
          <h2 className="text-lg font-bold mb-2">무료로 {name} 만들기</h2>
          <p className="text-sm text-muted-foreground mb-4">
            회원가입 없이, 30초만에 나만의 위젯을 완성하세요.
          </p>
          <Button size="lg" asChild>
            <Link href={`/create/${slug}`}>
              에디터 열기
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
