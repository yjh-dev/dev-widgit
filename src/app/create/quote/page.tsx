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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QuotePreview from "@/components/widget/QuotePreview";
import { useQuoteStore } from "@/store/useQuoteStore";
import { QUOTE_FONT_OPTIONS, type QuoteFont } from "@/lib/quote";

export default function CreateQuotePage() {
  const {
    text,
    author,
    font,
    textColor,
    bg,
    transparentBg,
    setText,
    setAuthor,
    setFont,
    setTextColor,
    setBg,
    setTransparentBg,
    reset,
  } = useQuoteStore();

  const buildWidgetUrl = useCallback(() => {
    const base = `${window.location.origin}/widget/quote`;
    const params = new URLSearchParams();

    if (text) params.set("text", text);
    if (author) params.set("author", author);
    if (font !== "serif") params.set("font", font);
    if (textColor !== "1E1E1E") params.set("textColor", textColor);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }

    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [text, author, font, textColor, bg, transparentBg]);

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
        <h1 className="text-2xl font-bold mb-1">명언 카드 위젯 만들기</h1>
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
                  <Label htmlFor="text">문구</Label>
                  <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="오늘 하루도 수고했어"
                    rows={3}
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="author">작성자 / 출처</Label>
                  <Input
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="작자 미상"
                  />
                </div>
                <div className="space-y-2">
                  <Label>폰트</Label>
                  <Select
                    value={font}
                    onValueChange={(v) => setFont(v as QuoteFont)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {QUOTE_FONT_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </fieldset>

              {/* 색상 */}
              <fieldset className="space-y-4">
                <legend className="text-sm font-semibold text-muted-foreground mb-2">
                  색상
                </legend>
                <div className="space-y-2">
                  <Label htmlFor="textColor">글자 색상</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">#</span>
                    <Input
                      id="textColor"
                      value={textColor}
                      onChange={(e) =>
                        setTextColor(
                          e.target.value
                            .replace(/[^0-9a-fA-F]/g, "")
                            .slice(0, 6),
                        )
                      }
                      maxLength={6}
                      placeholder="1E1E1E"
                    />
                    <div
                      className="w-8 h-8 rounded border shrink-0"
                      style={{ backgroundColor: `#${textColor}` }}
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
              <div className="border rounded-lg overflow-hidden aspect-[4/3]">
                <QuotePreview
                  text={text}
                  author={author}
                  font={font}
                  textColor={textColor}
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
