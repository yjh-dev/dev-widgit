"use client";

import { Copy, ExternalLink, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditorActions } from "./EditorActionsContext";

export default function MobileBottomBar() {
  const { state } = useEditorActions();

  if (!state) return null;

  const { widgetUrl, onCopy, onReset } = state;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-background/80 backdrop-blur-lg border-t"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex items-center gap-2 px-4 py-3">
        <Button onClick={onCopy} size="sm" className="flex-1">
          <Copy className="w-4 h-4 mr-1.5" />
          URL 복사
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 shrink-0"
          onClick={() => window.open(widgetUrl, "_blank")}
          title="새 탭에서 열기"
          aria-label="새 탭에서 열기"
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 shrink-0"
          onClick={onReset}
          title="초기화"
          aria-label="초기화"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
