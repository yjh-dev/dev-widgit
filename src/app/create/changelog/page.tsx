"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import ChangelogPreview from "@/components/widget/ChangelogPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useChangelogStore } from "@/store/useChangelogStore";
import { changelogPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { copyToClipboard } from "@/lib/clipboard";
import { serializeEntries } from "@/lib/changelog";

export default function CreateChangelogPage() {
  const {
    entries, showDate, showVersion,
    accentColor, textColor, bg, transparentBg,
    borderRadius, padding, fontSize,
    addEntry, removeEntry,
    setShowDate, setShowVersion,
    setAccentColor, setTextColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useChangelogStore();

  const [newVersion, setNewVersion] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAdd = () => {
    if (!newVersion.trim() && !newDesc.trim()) return;
    addEntry({ version: newVersion.trim(), date: newDate, desc: newDesc.trim() });
    setNewVersion("");
    setNewDate("");
    setNewDesc("");
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/changelog`;
    const params = new URLSearchParams();
    if (entries.length > 0) params.set("entries", serializeEntries(entries));
    if (!showDate) params.set("showDate", "false");
    if (!showVersion) params.set("showVersion", "false");
    if (accentColor !== "6366F1") params.set("accentColor", accentColor);
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
  }, [entries, showDate, showVersion, accentColor, textColor, bg, transparentBg, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="변경 로그 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={changelogPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "항목 관리",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="newVersion">버전</Label>
                      <Input
                        id="newVersion"
                        value={newVersion}
                        onChange={(e) => setNewVersion(e.target.value)}
                        placeholder="예: v2.1"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newDate">날짜</Label>
                      <Input
                        id="newDate"
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newDesc">설명</Label>
                      <Input
                        id="newDesc"
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="예: 새로운 기능 추가"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleAdd}
                      disabled={!newVersion.trim() && !newDesc.trim()}
                      className="w-full"
                    >
                      항목 추가
                    </Button>
                    {entries.length > 0 && (
                      <div className="space-y-1 mt-2">
                        <Label className="text-xs opacity-50">등록된 항목 ({entries.length}/10)</Label>
                        {entries.map((e, i) => (
                          <div key={i} className="flex items-center justify-between text-sm py-1 px-2 rounded bg-muted">
                            <span className="truncate">
                              {e.version && <strong className="mr-1">{e.version}</strong>}
                              {e.desc}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeEntry(i)}
                              className="text-muted-foreground hover:text-destructive ml-2 shrink-0"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {entries.length >= 10 && (
                      <p className="text-xs text-muted-foreground">최대 10개까지 추가할 수 있습니다</p>
                    )}
                  </>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showVersion">버전 표시</Label>
                      <Switch id="showVersion" checked={showVersion} onCheckedChange={setShowVersion} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showDate">날짜 표시</Label>
                      <Switch id="showDate" checked={showDate} onCheckedChange={setShowDate} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="accentColor" label="강조 색상" value={accentColor} onChange={setAccentColor} placeholder="6366F1" />
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
          <div className="border rounded-lg overflow-hidden min-h-[200px]">
            <ChangelogPreview
              entries={entries}
              showDate={showDate}
              showVersion={showVersion}
              accentColor={accentColor}
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
