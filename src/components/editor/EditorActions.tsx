"use client";

import { useState } from "react";
import { Copy, RotateCcw, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EditorActionsProps {
  widgetUrl: string;
  onCopy: () => void;
  onReset: () => void;
}

export default function EditorActions({
  widgetUrl,
  onCopy,
  onReset,
}: EditorActionsProps) {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>위젯 URL</Label>
        <textarea
          readOnly
          value={widgetUrl}
          rows={2}
          className="w-full rounded-md border bg-muted px-3 py-2 text-xs text-muted-foreground break-all resize-none focus:outline-none"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={onCopy} className="flex-1">
          <Copy className="w-4 h-4 mr-2" />
          URL 복사
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(widgetUrl, "_blank")}
          title="새 탭에서 열기"
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onReset} title="초기화">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <button
        type="button"
        onClick={() => setGuideOpen(!guideOpen)}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${guideOpen ? "rotate-180" : ""}`}
        />
        노션에 임베드하는 방법
      </button>
      {guideOpen && (
        <div className="rounded-lg border bg-muted/50 p-4 space-y-2.5 text-sm text-muted-foreground">
          <div className="flex items-start gap-2.5">
            <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">1</span>
            <span>위의 <strong className="text-foreground">URL 복사</strong> 버튼을 클릭합니다.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">2</span>
            <span>노션 페이지에서 <kbd className="px-1.5 py-0.5 rounded bg-muted border text-xs font-mono">/embed</kbd> 또는 <kbd className="px-1.5 py-0.5 rounded bg-muted border text-xs font-mono">/임베드</kbd>를 입력합니다.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">3</span>
            <span>복사한 URL을 붙여넣고 <strong className="text-foreground">링크 임베드</strong>를 클릭하면 완료!</span>
          </div>
        </div>
      )}
    </div>
  );
}
