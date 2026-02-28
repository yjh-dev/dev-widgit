"use client";

import { toast } from "sonner";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
import ColorPalettePreview from "@/components/widget/ColorPalettePreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useColorPaletteStore } from "@/store/useColorPaletteStore";
import { serializeColors, deserializeColors } from "@/lib/color-palette";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import type { FontSizeKey } from "@/lib/common-widget-options";
import type { PaletteLayout } from "@/lib/color-palette";
import type { Preset } from "@/lib/presets";

const colorPalettePresets: Preset[] = [
  {
    id: "palette-brand-blue",
    name: "브랜드 블루",
    data: {
      colors: ["1E40AF", "3B82F6", "93C5FD", "DBEAFE"],
      showHex: true,
    },
  },
  {
    id: "palette-sunset",
    name: "선셋",
    data: {
      colors: ["DC2626", "F97316", "FBBF24", "FDE68A"],
      showHex: true,
    },
  },
];

export default function CreateColorPalettePage() {
  const {
    colors, layout, showHex, color, bg, transparentBg,
    borderRadius, padding, fontSize,
    setColors, setLayout, setShowHex, setColor, setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useColorPaletteStore();

  useInitFromUrl((p) => {
    const bgVal = p.get("bg");
    loadPreset({
      ...(p.has("colors") && { colors: deserializeColors(p.get("colors")!) }),
      ...(p.has("layout") && { layout: p.get("layout") as PaletteLayout }),
      ...(p.has("showHex") && { showHex: p.get("showHex") !== "false" }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(bgVal === "transparent"
        ? { transparentBg: true }
        : bgVal
          ? { bg: bgVal, transparentBg: false }
          : {}),
      ...(p.has("radius") && { borderRadius: Number(p.get("radius")) }),
      ...(p.has("pad") && { padding: Number(p.get("pad")) }),
      ...(p.has("fsize") && { fontSize: p.get("fsize") as FontSizeKey }),
    });
  });

  const handleColorChange = (index: number, value: string) => {
    const updated = [...colors];
    updated[index] = value;
    setColors(updated);
  };

  const handleAddColor = () => {
    if (colors.length < 6) setColors([...colors, "94A3B8"]);
  };

  const handleRemoveColor = (index: number) => {
    if (colors.length > 2) setColors(colors.filter((_, i) => i !== index));
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/color-palette`;
    const params = new URLSearchParams();
    const defaultColors = "2563EB|7C3AED|EC4899|F59E0B";
    const currentColors = serializeColors(colors);
    if (currentColors !== defaultColors) params.set("colors", currentColors);
    if (layout !== "horizontal") params.set("layout", layout);
    if (!showHex) params.set("showHex", "false");
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
  }, [colors, layout, showHex, color, bg, transparentBg, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="컬러 팔레트 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={colorPalettePresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>레이아웃</Label>
                      <Select value={layout} onValueChange={(v) => setLayout(v as PaletteLayout)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="horizontal">가로</SelectItem>
                          <SelectItem value="vertical">세로</SelectItem>
                          <SelectItem value="grid">그리드 (2열)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showHex">HEX 값 표시</Label>
                      <Switch id="showHex" checked={showHex} onCheckedChange={setShowHex} />
                    </div>
                  </>
                ),
              },
              {
                id: "colors",
                title: "팔레트 색상",
                children: (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <Label>색상 목록</Label>
                      <span className="text-xs text-muted-foreground">{colors.length}/6</span>
                    </div>
                    {colors.map((c, i) => (
                      <div key={i} className="flex items-end gap-2">
                        <div className="flex-1">
                          <ColorPicker
                            id={`palette-color-${i}`}
                            label={`색상 ${i + 1}`}
                            value={c}
                            onChange={(v) => handleColorChange(i, v)}
                          />
                        </div>
                        {colors.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveColor(i)}
                            className="text-muted-foreground hover:text-destructive shrink-0 pb-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    {colors.length < 6 && (
                      <Button type="button" variant="outline" size="sm" onClick={handleAddColor}>
                        색상 추가
                      </Button>
                    )}
                  </>
                ),
              },
              {
                id: "color",
                title: "위젯 색상",
                children: (
                  <>
                    <ColorPicker id="color" label="텍스트 색상" value={color} onChange={setColor} placeholder="1E1E1E" />
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
                    borderRadius={borderRadius}
                    padding={padding}
                    fontSize={fontSize}
                    onBorderRadiusChange={setBorderRadius}
                    onPaddingChange={setPadding}
                    onFontSizeChange={setFontSize}
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useColorPaletteStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden min-h-[120px]">
            <ColorPalettePreview
              colors={colors}
              layout={layout}
              showHex={showHex}
              color={color}
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
