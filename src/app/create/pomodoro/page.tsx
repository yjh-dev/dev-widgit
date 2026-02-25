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
import PomodoroPreview from "@/components/widget/PomodoroPreview";
import { usePomodoroStore } from "@/store/usePomodoroStore";

export default function CreatePomodoroPage() {
  const {
    workTime,
    breakTime,
    color,
    bg,
    transparentBg,
    setWorkTime,
    setBreakTime,
    setColor,
    setBg,
    setTransparentBg,
    reset,
  } = usePomodoroStore();

  const buildWidgetUrl = useCallback(() => {
    const base = `${window.location.origin}/widget/pomodoro`;
    const params = new URLSearchParams();

    if (workTime !== 25) params.set("work", String(workTime));
    if (breakTime !== 5) params.set("break", String(breakTime));
    if (color !== "E11D48") params.set("color", color);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }

    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [workTime, breakTime, color, bg, transparentBg]);

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
        <h1 className="text-2xl font-bold mb-1">뽀모도로 타이머 위젯 만들기</h1>
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
                  <Label htmlFor="workTime">집중 시간 (분)</Label>
                  <Input
                    id="workTime"
                    type="number"
                    min={1}
                    max={120}
                    value={workTime}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v >= 1 && v <= 120) setWorkTime(v);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breakTime">휴식 시간 (분)</Label>
                  <Input
                    id="breakTime"
                    type="number"
                    min={1}
                    max={60}
                    value={breakTime}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (v >= 1 && v <= 60) setBreakTime(v);
                    }}
                  />
                </div>
              </fieldset>

              {/* 색상 */}
              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-muted-foreground mb-2">
                  색상
                </legend>
                <div className="space-y-2">
                  <Label htmlFor="color">집중 색상</Label>
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
                      placeholder="E11D48"
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
            <div className="space-y-3 w-full max-w-[320px]">
              <p className="text-xs text-muted-foreground text-center">
                미리보기
              </p>
              <div className="border rounded-lg overflow-hidden aspect-[4/3]">
                <PomodoroPreview
                  workTime={workTime}
                  breakTime={breakTime}
                  color={color}
                  bg={bg}
                  transparentBg={transparentBg}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
