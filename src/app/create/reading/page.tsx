"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import ReadingPreview from "@/components/widget/ReadingPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useReadingStore } from "@/store/useReadingStore";
import { readingPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { ReadingStyle } from "@/lib/reading";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, buildUrl } from "@/lib/url-builder-utils";

export default function CreateReadingPage() {
  const {
    title, currentPage, totalPages, style, showPages,
    color, textColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    setTitle, setCurrentPage, setTotalPages, setStyle, setShowPages,
    setColor, setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useReadingStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("title") && { title: p.get("title")! }),
      ...(p.has("current") && { currentPage: Number(p.get("current")) }),
      ...(p.has("total") && { totalPages: Number(p.get("total")) }),
      ...(p.has("style") && { style: p.get("style") as ReadingStyle }),
      ...(p.has("pages") && { showPages: p.get("pages") !== "false" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...parseCommonParams(p),
    });
  });

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/reading`;
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (currentPage !== 0) params.set("current", String(currentPage));
    if (totalPages !== 300) params.set("total", String(totalPages));
    if (style !== "bar") params.set("style", style);
    if (!showPages) params.set("pages", "false");
    if (color !== "2563EB") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    return buildUrl(base, params);
  }, [title, currentPage, totalPages, style, showPages, color, textColor, bg, transparentBg, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="읽기 진행률 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={readingPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title">책 제목</Label>
                      <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="읽고 있는 책 제목" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalPages">총 페이지 수</Label>
                      <Input
                        id="totalPages" type="number" min={1}
                        value={totalPages}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 1) setTotalPages(v);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentPage">현재 페이지</Label>
                      <Input
                        id="currentPage" type="number" min={0} max={totalPages}
                        value={currentPage}
                        onChange={(e) => {
                          const v = Number(e.target.value);
                          if (v >= 0) setCurrentPage(v);
                        }}
                      />
                    </div>
                  </>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>프로그레스 스타일</Label>
                      <Select value={style} onValueChange={(v) => setStyle(v as ReadingStyle)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bar">바</SelectItem>
                          <SelectItem value="ring">링</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showPages">페이지 수 표시</Label>
                      <Switch id="showPages" checked={showPages} onCheckedChange={setShowPages} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="프로그레스 색상" value={color} onChange={setColor} placeholder="2563EB" />
                    <ColorPicker id="textColor" label="텍스트 색상 (비우면 프로그레스 색상)" value={textColor} onChange={setTextColor} placeholder="" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useReadingStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[16/9]">
            <ReadingPreview
              title={title} currentPage={currentPage} totalPages={totalPages}
              style={style} showPages={showPages} color={color} textColor={textColor}
              bg={bg} transparentBg={transparentBg} borderRadius={borderRadius}
              padding={padding} fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
