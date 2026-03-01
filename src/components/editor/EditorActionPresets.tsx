"use client";

import { useState } from "react";
import { Save, Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  getCustomPresets,
  saveCustomPreset,
  deleteCustomPreset,
  type CustomPreset,
} from "@/lib/custom-presets";

interface EditorActionPresetsProps {
  widgetType: string;
  widgetUrl: string;
  presets: CustomPreset[];
  onPresetsChange: (presets: CustomPreset[]) => void;
}

export default function EditorActionPresets({
  widgetType,
  widgetUrl,
  presets,
  onPresetsChange,
}: EditorActionPresetsProps) {
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [savingName, setSavingName] = useState("");

  const handleSavePreset = () => {
    const name = savingName.trim();
    if (!name) { toast.error("프리셋 이름을 입력하세요."); return; }
    saveCustomPreset(widgetType, name, widgetUrl);
    onPresetsChange(getCustomPresets(widgetType));
    setSavingName("");
    setShowSaveInput(false);
    toast.success(`"${name}" 프리셋이 저장되었습니다!`);
  };

  const handleDeletePreset = (id: string) => {
    deleteCustomPreset(widgetType, id);
    onPresetsChange(getCustomPresets(widgetType));
    toast.success("프리셋이 삭제되었습니다.");
  };

  const handleLoadPreset = (preset: CustomPreset) => {
    window.location.assign(preset.url.replace("/widget/", "/create/"));
  };

  return (
    <div className="border-t pt-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">내 프리셋</span>
        </div>
        {!showSaveInput && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={() => setShowSaveInput(true)}
          >
            <Save className="w-3.5 h-3.5 mr-1" />
            현재 설정 저장
          </Button>
        )}
      </div>

      {showSaveInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={savingName}
            onChange={(e) => setSavingName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSavePreset()}
            placeholder="프리셋 이름"
            aria-label="프리셋 이름 입력"
            className="flex-1 rounded-md border bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
          <Button size="sm" className="h-8" onClick={handleSavePreset}>저장</Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => { setShowSaveInput(false); setSavingName(""); }}
          >
            취소
          </Button>
        </div>
      )}

      {presets.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <div key={p.id} className="group flex items-center gap-0.5">
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs"
                onClick={() => handleLoadPreset(p)}
              >
                {p.name}
              </Button>
              <button
                type="button"
                onClick={() => handleDeletePreset(p.id)}
                className="opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity text-muted-foreground hover:text-destructive p-0.5"
                title="삭제"
                aria-label={`${p.name} 프리셋 삭제`}
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        !showSaveInput && (
          <p className="text-xs text-muted-foreground">
            이 위젯 타입 전용 설정 템플릿입니다. 저장하면 클릭 한 번으로 설정을 불러올 수 있습니다.
          </p>
        )
      )}
    </div>
  );
}
