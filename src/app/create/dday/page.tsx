"use client";

import { useCallback } from "react";
import { Copy, RotateCcw, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import DdayWidgetPreview from "@/components/widget/DdayWidgetPreview";
import { useDdayWidgetStore } from "@/store/useWidgetStore";

export default function CreateDdayPage() {
  const {
    title,
    targetDate,
    bgColor,
    textColor,
    isDarkMode,
    setTitle,
    setTargetDate,
    setBgColor,
    setTextColor,
    setIsDarkMode,
    reset,
  } = useDdayWidgetStore();

  const buildWidgetUrl = useCallback(() => {
    const base = `${window.location.origin}/widget/dday`;
    const params = new URLSearchParams({
      title,
      date: targetDate,
      bg: bgColor,
      text: textColor,
    });
    return `${base}?${params.toString()}`;
  }, [title, targetDate, bgColor, textColor]);

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
    alert("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-1">D-Day 위젯 만들기</h1>
        <p className="text-muted-foreground text-sm mb-8">
          설정을 변경하면 오른쪽 프리뷰에 실시간으로 반영됩니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 좌측: 폼 */}
          <Card>
            <CardContent className="space-y-5 pt-6">
              <div className="space-y-2">
                <Label htmlFor="title">타이틀</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 수능, 생일, 여행"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDate">목표 날짜</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bgColor">배경색</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">#</span>
                    <Input
                      id="bgColor"
                      value={bgColor}
                      onChange={(e) =>
                        setBgColor(e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6))
                      }
                      maxLength={6}
                      placeholder="1E1E1E"
                    />
                    <div
                      className="w-8 h-8 rounded border shrink-0"
                      style={{ backgroundColor: `#${bgColor}` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textColor">글자색</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">#</span>
                    <Input
                      id="textColor"
                      value={textColor}
                      onChange={(e) =>
                        setTextColor(e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6))
                      }
                      maxLength={6}
                      placeholder="FFFFFF"
                    />
                    <div
                      className="w-8 h-8 rounded border shrink-0"
                      style={{ backgroundColor: `#${textColor}` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Label>테마</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  {isDarkMode ? (
                    <><Moon className="w-4 h-4 mr-1" /> 다크</>
                  ) : (
                    <><Sun className="w-4 h-4 mr-1" /> 라이트</>
                  )}
                </Button>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleCopy} className="flex-1">
                  <Copy className="w-4 h-4 mr-2" />
                  URL 복사
                </Button>
                <Button variant="outline" onClick={reset}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 우측: 실시간 프리뷰 */}
          <div className="flex items-center justify-center">
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground text-center">미리보기</p>
              <DdayWidgetPreview
                title={title}
                targetDate={targetDate}
                bgColor={bgColor}
                textColor={textColor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
