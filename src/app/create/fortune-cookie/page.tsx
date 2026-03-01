"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FortuneCookiePreview from "@/components/widget/FortuneCookiePreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import { useFortuneCookieStore } from "@/store/useFortuneCookieStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { CookieStyle } from "@/lib/fortune-cookie";

export default function CreateFortuneCookiePage() {
  const {
    customMessage, lang, style, cookieColor,
    textColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    setCustomMessage, setLang, setStyle, setCookieColor,
    setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    reset,
  } = useFortuneCookieStore();

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/fortune-cookie`;
    const params = new URLSearchParams();
    if (customMessage) params.set("message", customMessage);
    if (lang !== "ko") params.set("lang", lang);
    if (style !== "classic") params.set("style", style);
    if (cookieColor !== "D97706") params.set("cookieColor", cookieColor);
    if (textColor) params.set("textColor", textColor);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [customMessage, lang, style, cookieColor, textColor, bg, transparentBg, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="포춘 쿠키 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="customMessage">커스텀 메시지 (비우면 랜덤)</Label>
                      <Input
                        id="customMessage"
                        value={customMessage}
                        onChange={(e) => setCustomMessage(e.target.value)}
                        placeholder="비우면 랜덤 포춘 메시지"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>언어</Label>
                      <Select value={lang} onValueChange={(v) => setLang(v as "ko" | "en")}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ko">한국어</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>스타일</Label>
                      <Select value={style} onValueChange={(v) => setStyle(v as CookieStyle)}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="classic">클래식</SelectItem>
                          <SelectItem value="modern">모던</SelectItem>
                          <SelectItem value="paper">종이</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="cookieColor" label="쿠키 색상" value={cookieColor} onChange={setCookieColor} placeholder="D97706" />
                    <ColorPicker id="textColor" label="텍스트 색상" value={textColor} onChange={setTextColor} placeholder="자동" />
                    <div className="flex items-center justify-between">
                      <Label htmlFor="transparent">투명 배경</Label>
                      <Switch id="transparent" checked={transparentBg} onCheckedChange={setTransparentBg} />
                    </div>
                    {!transparentBg && (
                      <ColorPicker id="bg" label="배경색" value={bg} onChange={setBg} placeholder="FFFFFF" />
                    )}
                  </>
                ),
              },
              {
                id: "style",
                title: "스타일",
                children: (
                  <CommonStyleOptions
                    borderRadius={borderRadius} padding={padding} fontSize={fontSize}
                    onBorderRadiusChange={setBorderRadius} onPaddingChange={setPadding} onFontSizeChange={setFontSize}
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden min-h-[250px]">
            <FortuneCookiePreview
              customMessage={customMessage}
              lang={lang}
              style={style}
              cookieColor={cookieColor}
              textColor={textColor}
              bg={bg}
              transparentBg={transparentBg}
              borderRadius={borderRadius}
              padding={padding}
              fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
