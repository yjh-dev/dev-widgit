"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ColorPicker from "@/components/ui/color-picker";
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
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useQuoteStore } from "@/store/useQuoteStore";
import { quotePresets } from "@/lib/presets";
import type { TextAlign, LineHeight } from "@/store/useQuoteStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { copyToClipboard } from "@/lib/clipboard";
import { ALIGN_OPTIONS, LINE_HEIGHT_OPTIONS } from "@/lib/quote";
import { QUOTE_FONT_OPTIONS_EXTENDED } from "@/lib/fonts";

export default function CreateQuotePage() {
  const {
    text, author, font, textColor, bg, transparentBg,
    borderRadius, padding, fontSize, align, showMarks, italic, lineHeight,
    authorColor, divider,
    setText, setAuthor, setFont, setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize, setAlign, setShowMarks, setItalic, setLineHeight,
    setAuthorColor, setDivider,
    loadPreset, reset,
  } = useQuoteStore();

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
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
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    if (align !== "center") params.set("align", align);
    if (!showMarks) params.set("marks", "false");
    if (italic) params.set("italic", "true");
    if (lineHeight !== "relaxed") params.set("lh", lineHeight);
    if (authorColor) params.set("authorColor", authorColor);
    if (divider) params.set("divider", "true");
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [text, author, font, textColor, bg, transparentBg, borderRadius, padding, fontSize, align, showMarks, italic, lineHeight, authorColor, divider]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="명언 카드 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={quotePresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
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
                      <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="작자 미상" />
                    </div>
                    <div className="space-y-2">
                      <Label>폰트</Label>
                      <Select value={font} onValueChange={setFont}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {QUOTE_FONT_OPTIONS_EXTENDED.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                ),
              },
              {
                id: "text",
                title: "텍스트 옵션",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>텍스트 정렬</Label>
                      <Select value={align} onValueChange={(v) => setAlign(v as TextAlign)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {ALIGN_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>줄 간격</Label>
                      <Select value={lineHeight} onValueChange={(v) => setLineHeight(v as LineHeight)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {LINE_HEIGHT_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showMarks">따옴표 아이콘</Label>
                      <Switch id="showMarks" checked={showMarks} onCheckedChange={setShowMarks} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="italic">이탤릭</Label>
                      <Switch id="italic" checked={italic} onCheckedChange={setItalic} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="divider">구분선</Label>
                      <Switch id="divider" checked={divider} onCheckedChange={setDivider} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="textColor" label="글자 색상" value={textColor} onChange={setTextColor} placeholder="1E1E1E" />
                    <ColorPicker id="authorColor" label="저자 색상 (비우면 글자 색상)" value={authorColor} onChange={setAuthorColor} placeholder="비우면 글자 색상" />
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
          <div className="border rounded-lg overflow-hidden aspect-[4/3]">
            <QuotePreview
              text={text} author={author} font={font} textColor={textColor} bg={bg}
              transparentBg={transparentBg} borderRadius={borderRadius} padding={padding}
              fontSize={fontSize} align={align} showMarks={showMarks} italic={italic} lineHeight={lineHeight}
              authorColor={authorColor} divider={divider}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
