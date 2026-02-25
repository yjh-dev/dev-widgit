"use client";

import { useCallback, useMemo } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ArrowLeft, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import LifeCalendarPreview from "@/components/widget/LifeCalendarPreview";
import { useLifeCalendarStore } from "@/store/useLifeCalendarStore";

export default function CreateLifeCalendarPage() {
  const {
    birthdate,
    lifespan,
    color,
    bg,
    transparentBg,
    showStats,
    setBirthdate,
    setLifespan,
    setColor,
    setBg,
    setTransparentBg,
    setShowStats,
    reset,
  } = useLifeCalendarStore();

  const buildWidgetUrl = useCallback(() => {
    const base = `${window.location.origin}/widget/life-calendar`;
    const params = new URLSearchParams();

    if (birthdate) params.set("birthdate", birthdate);
    if (lifespan !== 80) params.set("lifespan", String(lifespan));
    if (color !== "2563EB") params.set("color", color);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (!showStats) params.set("stats", "false");

    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [birthdate, lifespan, color, bg, transparentBg, showStats]);

  const widgetUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return buildWidgetUrl();
  }, [buildWidgetUrl]);

  const handleCopy = async () => {
    const url = buildWidgetUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-4 h-4" />
          홈으로
        </Link>
        <h1 className="text-2xl font-bold mb-1">인생 달력 위젯 만들기</h1>
        <p className="text-muted-foreground text-sm mb-8">
          설정을 변경하면 오른쪽 프리뷰에 실시간으로 반영됩니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 좌측: 폼 */}
          <Card>
            <CardContent className="space-y-6 pt-6">
              {/* 기본 설정 */}
              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-muted-foreground mb-2">
                  기본 설정
                </legend>
                <div className="space-y-2">
                  <Label htmlFor="birthdate">생년월일</Label>
                  <Input
                    id="birthdate"
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lifespan">기대 수명 (년)</Label>
                  <Input
                    id="lifespan"
                    type="number"
                    min={1}
                    max={120}
                    value={lifespan}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v >= 1 && v <= 120) setLifespan(v);
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="showStats">통계 표시</Label>
                  <Switch
                    id="showStats"
                    checked={showStats}
                    onCheckedChange={setShowStats}
                  />
                </div>
              </fieldset>

              {/* 색상 */}
              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-muted-foreground mb-2">
                  색상
                </legend>
                <div className="space-y-2">
                  <Label htmlFor="color">칸 색상</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">#</span>
                    <Input
                      id="color"
                      value={color}
                      onChange={(e) =>
                        setColor(
                          e.target.value
                            .replace(/[^0-9a-fA-F]/g, "")
                            .slice(0, 6),
                        )
                      }
                      maxLength={6}
                      placeholder="2563EB"
                    />
                    <div
                      className="w-8 h-8 rounded border shrink-0"
                      style={{ backgroundColor: `#${color}` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="transparent">투명 배경</Label>
                  <Switch
                    id="transparent"
                    checked={transparentBg}
                    onCheckedChange={setTransparentBg}
                  />
                </div>

                {!transparentBg && (
                  <div className="space-y-2">
                    <Label htmlFor="bg">배경색</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-sm">#</span>
                      <Input
                        id="bg"
                        value={bg}
                        onChange={(e) =>
                          setBg(
                            e.target.value
                              .replace(/[^0-9a-fA-F]/g, "")
                              .slice(0, 6),
                          )
                        }
                        maxLength={6}
                        placeholder="FFFFFF"
                      />
                      <div
                        className="w-8 h-8 rounded border shrink-0"
                        style={{ backgroundColor: `#${bg}` }}
                      />
                    </div>
                  </div>
                )}
              </fieldset>

              {/* 액션 */}
              <div className="flex gap-2 pt-2">
                <Button onClick={handleCopy} className="flex-1">
                  <Copy className="w-4 h-4 mr-2" />
                  URL 복사
                </Button>
                <Button variant="outline" onClick={reset}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              {/* URL 미리보기 */}
              <div className="space-y-2">
                <Label>위젯 URL</Label>
                <textarea
                  readOnly
                  value={widgetUrl}
                  rows={2}
                  className="w-full rounded-md border bg-muted px-3 py-2 text-xs text-muted-foreground break-all resize-none focus:outline-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* 우측: 실시간 프리뷰 */}
          <div className="flex items-center justify-center">
            <div className="space-y-3 w-full max-w-[400px]">
              <p className="text-xs text-muted-foreground text-center">
                미리보기
              </p>
              <div className="border rounded-lg overflow-hidden aspect-[52/80]">
                <LifeCalendarPreview
                  birthdate={birthdate}
                  lifespan={lifespan}
                  color={color}
                  bg={bg}
                  transparentBg={transparentBg}
                  showStats={showStats}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
