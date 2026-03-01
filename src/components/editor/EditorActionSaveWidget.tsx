"use client";

import { useState } from "react";
import { FolderHeart, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { saveWidget } from "@/lib/saved-widgets";
import type { WidgetType } from "@/lib/templates";

interface EditorActionSaveWidgetProps {
  widgetType: string;
  widgetUrl: string;
}

export default function EditorActionSaveWidget({
  widgetType,
  widgetUrl,
}: EditorActionSaveWidgetProps) {
  const [showSaveWidget, setShowSaveWidget] = useState(false);
  const [saveWidgetName, setSaveWidgetName] = useState("");

  const handleSaveWidget = () => {
    const name = saveWidgetName.trim();
    if (!name) { toast.error("위젯 이름을 입력하세요."); return; }
    try {
      const parsed = new URL(widgetUrl);
      const relativeUrl = parsed.pathname + parsed.search;
      saveWidget(name, widgetType as WidgetType, relativeUrl);
      setSaveWidgetName("");
      setShowSaveWidget(false);
      toast.success("내 위젯에 저장되었습니다!");
    } catch {
      toast.error("위젯 URL을 확인하세요.");
    }
  };

  return (
    <div className="border-t pt-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <FolderHeart className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">내 위젯</span>
        </div>
        {!showSaveWidget && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={() => setShowSaveWidget(true)}
          >
            <Save className="w-3.5 h-3.5 mr-1" />
            내 위젯에 저장
          </Button>
        )}
      </div>

      {showSaveWidget && (
        <div className="flex gap-2">
          <input
            type="text"
            value={saveWidgetName}
            onChange={(e) => setSaveWidgetName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveWidget()}
            placeholder="위젯 이름 (예: 수능 D-Day)"
            className="flex-1 rounded-md border bg-background px-3 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
          <Button size="sm" className="h-8" onClick={handleSaveWidget}>저장</Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => { setShowSaveWidget(false); setSaveWidgetName(""); }}
          >
            취소
          </Button>
        </div>
      )}

      {!showSaveWidget && (
        <p className="text-xs text-muted-foreground">
          완성된 위젯을 이름을 붙여 저장합니다.{" "}
          <a href="/my-widgets" className="underline hover:text-foreground transition-colors">
            내 위젯
          </a>
          에서 URL 복사·수정·삭제할 수 있습니다.
        </p>
      )}
    </div>
  );
}
