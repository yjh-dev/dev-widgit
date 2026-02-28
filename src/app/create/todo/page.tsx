"use client";

import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import TodoPreview from "@/components/widget/TodoPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import PresetSelector from "@/components/editor/PresetSelector";
import { useTodoStore } from "@/store/useTodoStore";
import { todoPresets } from "@/lib/presets";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { useInitFromUrl } from "@/lib/use-init-from-url";
import { copyToClipboard } from "@/lib/clipboard";
import { parseTodoItems, serializeTodoItems, generateId } from "@/lib/todo";
import type { FontSizeKey } from "@/lib/common-widget-options";

export default function CreateTodoPage() {
  const {
    title, items,
    color, textColor, bg, transparentBg,
    showProgress, strikethrough,
    borderRadius, padding, fontSize,
    setTitle, setItems,
    setColor, setTextColor, setBg, setTransparentBg,
    setShowProgress, setStrikethrough,
    setBorderRadius, setPadding, setFontSize,
    loadPreset, reset,
  } = useTodoStore();

  const [newItemText, setNewItemText] = useState("");

  useInitFromUrl((p) => {
    loadPreset({
      ...(p.has("title") && { title: p.get("title")! }),
      ...(p.has("items") && { items: p.get("items")! }),
      ...(p.has("color") && { color: p.get("color")! }),
      ...(p.has("textColor") && { textColor: p.get("textColor")! }),
      ...(p.has("bg") && p.get("bg") === "transparent"
        ? { transparentBg: true }
        : p.has("bg") && { bg: p.get("bg")!, transparentBg: false }),
      ...(p.has("progress") && { showProgress: p.get("progress") !== "false" }),
      ...(p.has("strike") && { strikethrough: p.get("strike") !== "false" }),
      ...(p.has("radius") && { borderRadius: Number(p.get("radius")) }),
      ...(p.has("pad") && { padding: Number(p.get("pad")) }),
      ...(p.has("fsize") && { fontSize: p.get("fsize") as FontSizeKey }),
    });
  });

  const todoItems = parseTodoItems(items);

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/todo`;
    const params = new URLSearchParams();
    if (title) params.set("title", title);
    if (items) params.set("items", items);
    if (color !== "2563EB") params.set("color", color);
    if (textColor) params.set("textColor", textColor);
    if (transparentBg) {
      params.set("bg", "transparent");
    } else if (bg !== "FFFFFF") {
      params.set("bg", bg);
    }
    if (!showProgress) params.set("progress", "false");
    if (!strikethrough) params.set("strike", "false");
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [title, items, color, textColor, bg, transparentBg, showProgress, strikethrough, borderRadius, padding, fontSize]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  const addItem = () => {
    const text = newItemText.trim();
    if (!text) return;
    const updated = [...todoItems, { id: generateId(), text, done: false }];
    setItems(serializeTodoItems(updated));
    setNewItemText("");
  };

  const removeItem = (id: string) => {
    const updated = todoItems.filter((i) => i.id !== id);
    setItems(serializeTodoItems(updated));
  };

  const toggleItem = (id: string) => {
    const updated = todoItems.map((i) => (i.id === id ? { ...i, done: !i.done } : i));
    setItems(serializeTodoItems(updated));
  };

  return (
    <EditorLayout title="투두리스트 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <PresetSelector presets={todoPresets} onSelect={loadPreset} />
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <div className="space-y-2">
                    <Label htmlFor="title">리스트 제목</Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: 오늘 할 일" />
                  </div>
                ),
              },
              {
                id: "items",
                title: "할 일 항목",
                children: (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        value={newItemText}
                        onChange={(e) => setNewItemText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addItem()}
                        placeholder="새 항목 추가"
                      />
                      <Button size="icon" onClick={addItem} className="shrink-0" aria-label="추가">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {todoItems.length > 0 && (
                      <ul className="space-y-1.5">
                        {todoItems.map((item) => (
                          <li key={item.id} className="flex items-center gap-2 text-sm">
                            <button
                              type="button"
                              onClick={() => toggleItem(item.id)}
                              className="shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center"
                              style={{
                                borderColor: `#${color}`,
                                backgroundColor: item.done ? `#${color}` : "transparent",
                              }}
                              aria-label={item.done ? "완료 취소" : "완료 체크"}
                            >
                              {item.done && (
                                <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" stroke="white" strokeWidth="2">
                                  <path d="M2 6l3 3 5-5" />
                                </svg>
                              )}
                            </button>
                            <span className={`flex-1 ${item.done ? "line-through opacity-50" : ""}`}>
                              {item.text}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                              aria-label="삭제"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {todoItems.length === 0 && (
                      <p className="text-xs text-muted-foreground">위에서 항목을 추가하세요.</p>
                    )}
                  </div>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="progress">진행률 바</Label>
                      <Switch id="progress" checked={showProgress} onCheckedChange={setShowProgress} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="strikethrough">완료 시 취소선</Label>
                      <Switch id="strikethrough" checked={strikethrough} onCheckedChange={setStrikethrough} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="color" label="체크 색상" value={color} onChange={setColor} placeholder="2563EB" />
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
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} onApplyTheme={(c) => useTodoStore.setState(c)} />
          </div>
        </CardContent>
      </Card>

      <TodoPreview
        title={title}
        initialItems={todoItems}
        interactive={false}
        color={color}
        textColor={textColor}
        bg={bg}
        transparentBg={transparentBg}
        showProgress={showProgress}
        strikethrough={strikethrough}
        borderRadius={borderRadius}
        padding={padding}
        fontSize={fontSize}
      />
    </EditorLayout>
  );
}
