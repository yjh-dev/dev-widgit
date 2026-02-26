"use client";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import BookmarkPreview from "@/components/widget/BookmarkPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { bookmarkPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { copyToClipboard } from "@/lib/clipboard";

export default function CreateBookmarkPage() {
  const {
    url, title, desc, showIcon, showUrl,
    color, bg, transparentBg,
    borderRadius, padding, fontSize,
    setUrl, setTitle, setDesc, setShowIcon, setShowUrl,
    setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useBookmarkStore();

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/bookmark`;
    const params = new URLSearchParams();
    if (url) params.set("url", url);
    if (title) params.set("title", title);
    if (desc) params.set("desc", desc);
    if (!showIcon) params.set("showIcon", "false");
    if (!showUrl) params.set("showUrl", "false");
    if (color !== "1E1E1E") params.set("color", color);
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
  }, [url, title, desc, showIcon, showUrl, color, bg, transparentBg, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="북마크 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={bookmarkPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="url">URL</Label>
                      <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">제목</Label>
                      <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="링크 제목" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="desc">설명</Label>
                      <Input id="desc" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="간단한 설명" />
                    </div>
                  </>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showIcon">파비콘 표시</Label>
                      <Switch id="showIcon" checked={showIcon} onCheckedChange={setShowIcon} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showUrl">URL 표시</Label>
                      <Switch id="showUrl" checked={showUrl} onCheckedChange={setShowUrl} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="글자 색상" value={color} onChange={setColor} placeholder="1E1E1E" />
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
          <div className="border rounded-lg overflow-hidden aspect-[16/9]">
            <BookmarkPreview
              url={url} title={title} desc={desc}
              showIcon={showIcon} showUrl={showUrl} color={color}
              bg={bg} transparentBg={transparentBg} borderRadius={borderRadius}
              padding={padding} fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
