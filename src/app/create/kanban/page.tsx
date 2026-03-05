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
import KanbanPreview from "@/components/widget/KanbanPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import EffectOptions from "@/components/editor/EffectOptions";
import EffectPresetSelector from "@/components/editor/EffectPresetSelector";
import EditorEffectsPreview from "@/components/editor/EditorEffectsPreview";
import { useKanbanStore } from "@/store/useKanbanStore";
import { GENERAL_FONT_OPTIONS } from "@/lib/fonts";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseColumns, serializeColumns, DEFAULT_COLUMNS, type KanbanColumn } from "@/lib/kanban";
import { parseCommonParams } from "@/lib/common-params";
import { addBgParam, addCommonStyleParams, addEffectParams, addExtraStyleParams, buildUrl } from "@/lib/url-builder-utils";

export default function CreateKanbanPage() {
  const {
    title, columns,
    color, textColor, font,
    bg, transparentBg,
    borderRadius, padding, fontSize,
    setTitle, setColumns,
    setColor, setTextColor, setFont,
    setBg, setTransparentBg,
    setBorderRadius, setPadding, setFontSize,
    fx, fxInt, gbg, gbgDir, neonColor, bshadow,
    setFx, setFxInt, setGbg, setGbgDir, setNeonColor, setBshadow,
    tshadow, bw, bc, opacity, ls,
    setTshadow, setBw, setBc, setOpacity, setLs,
    loadPreset, reset,
  } = useKanbanStore();

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("title") && { title: p.get("title")! }),
      ...(p.has("columns") && { columns: p.get("columns")! }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("font") && { font: p.get("font")! }),
      ...parseCommonParams(p),
      ...(p.has("tshadow") && { tshadow: p.get("tshadow")! }),
      ...(p.has("bw") && { bw: p.get("bw")! }),
      ...(p.has("bc") && { bc: p.get("bc")! }),
      ...(p.has("opacity") && { opacity: p.get("opacity")! }),
      ...(p.has("ls") && { ls: p.get("ls")! }),
    });
  });

  const parsedColumns: KanbanColumn[] = columns ? parseColumns(columns) : DEFAULT_COLUMNS;

  const updateColumnTitle = (colIdx: number, newTitle: string) => {
    const updated = parsedColumns.map((col, i) =>
      i === colIdx ? { ...col, title: newTitle } : col,
    );
    setColumns(serializeColumns(updated));
  };

  const updateColumnItems = (colIdx: number, itemsText: string) => {
    const items = itemsText.split("\n").filter(Boolean);
    const updated = parsedColumns.map((col, i) =>
      i === colIdx ? { ...col, items } : col,
    );
    setColumns(serializeColumns(updated));
  };

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/kanban`;
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    const serialized = columns || serializeColumns(DEFAULT_COLUMNS);
    if (serialized !== serializeColumns(DEFAULT_COLUMNS)) params.set("columns", serialized);
    if (color !== "6366F1") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    if (font !== "sans") params.set("font", font);
    addBgParam(params, transparentBg, bg);
    addCommonStyleParams(params, borderRadius, padding, fontSize);
    addEffectParams(params, fx, fxInt, gbg, gbgDir, neonColor, bshadow);
    addExtraStyleParams(params, tshadow, bw, bc, opacity, ls);
    return buildUrl(base, params);
  }, [title, columns, color, textColor, font, bg, transparentBg, borderRadius, padding, fontSize, fx, fxInt, gbg, gbgDir, neonColor, bshadow, tshadow, bw, bc, opacity, ls]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="칸반 보드 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="title">보드 제목</Label>
                      <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: 프로젝트 관리" />
                    </div>
                  </div>
                ),
              },
              {
                id: "columns",
                title: "열 설정",
                children: (
                  <div className="space-y-4">
                    {parsedColumns.map((col, colIdx) => (
                      <div key={colIdx} className="space-y-2">
                        <Label>{colIdx + 1}번째 열 이름</Label>
                        <Input
                          value={col.title}
                          onChange={(e) => updateColumnTitle(colIdx, e.target.value)}
                          placeholder={`열 ${colIdx + 1} 이름`}
                        />
                        <Label className="text-xs text-muted-foreground">초기 항목 (줄바꿈으로 구분)</Label>
                        <textarea
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[60px] focus:outline-none focus:ring-2 focus:ring-ring"
                          value={col.items.join("\n")}
                          onChange={(e) => updateColumnItems(colIdx, e.target.value)}
                          placeholder="항목을 줄바꿈으로 구분"
                        />
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <div className="space-y-2">
                    <Label>폰트</Label>
                    <Select value={font} onValueChange={setFont}>
                      <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {GENERAL_FONT_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="강조 색상" value={color} onChange={setColor} placeholder="6366F1" />
                    <ColorPicker id="textColor" label="텍스트 색상 (비우면 기본)" value={textColor} onChange={setTextColor} placeholder="" />
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
                id: "effects",
                title: "효과",
                children: (
                  <>
                    <EffectPresetSelector onSelect={loadPreset} />
                    <EffectOptions
                      fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
                      neonColor={neonColor} bshadow={bshadow}
                      onFxChange={setFx} onFxIntChange={setFxInt}
                      onGbgChange={setGbg} onGbgDirChange={setGbgDir}
                      onNeonColorChange={setNeonColor} onBshadowChange={setBshadow}
                    />
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
                    tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
                    onTshadowChange={setTshadow} onBwChange={setBw} onBcChange={setBc}
                    onOpacityChange={setOpacity} onLsChange={setLs}
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useKanbanStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <EditorEffectsPreview
        fx={fx} fxInt={fxInt} gbg={gbg} gbgDir={gbgDir}
        neonColor={neonColor} bshadow={bshadow} borderRadius={borderRadius}
        tshadow={tshadow} bw={bw} bc={bc} opacity={opacity} ls={ls}
      >
        <KanbanPreview
          title={title}
          initialColumns={parsedColumns}
          interactive={false}
          color={color}
          textColor={textColor}
          bg={bg}
          transparentBg={transparentBg}
          borderRadius={borderRadius}
          padding={padding}
          fontSize={fontSize}
          font={font}
        />
      </EditorEffectsPreview>
    </EditorLayout>
  );
}
