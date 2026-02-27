"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Copy, RotateCcw, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useEditorActions } from "./EditorActionsContext";
import { compressWidgetUrl } from "@/lib/url-compression";

const LS_KEY = "widgit-short-url";

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
  const [shortUrl, setShortUrl] = useState(false);
  const { register } = useEditorActions();

  // localStorage에서 토글 상태 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved === "true") setShortUrl(true);
    } catch { /* SSR / 접근 불가 무시 */ }
  }, []);

  const handleToggle = (checked: boolean) => {
    setShortUrl(checked);
    try { localStorage.setItem(LS_KEY, String(checked)); } catch { /* 무시 */ }
  };

  const displayUrl = useMemo(
    () => (shortUrl ? compressWidgetUrl(widgetUrl) : widgetUrl),
    [shortUrl, widgetUrl],
  );

  const wrappedOnCopy = useCallback(() => {
    if (shortUrl) {
      navigator.clipboard.writeText(displayUrl).then(() => {
        toast.success("짧은 URL이 복사되었습니다!");
      });
    } else {
      onCopy();
    }
  }, [shortUrl, displayUrl, onCopy]);

  useEffect(() => {
    register({ widgetUrl: displayUrl, onCopy: wrappedOnCopy, onReset });
  }, [displayUrl, wrappedOnCopy, onReset, register]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>위젯 URL</Label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <span className="text-xs text-muted-foreground">짧은 URL</span>
            <Switch checked={shortUrl} onCheckedChange={handleToggle} />
          </label>
        </div>
        <textarea
          readOnly
          value={displayUrl}
          rows={2}
          className="w-full rounded-md border bg-muted px-3 py-2 text-xs text-muted-foreground break-all resize-none focus:outline-none"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={wrappedOnCopy} className="flex-1">
          <Copy className="w-4 h-4 mr-2" />
          URL 복사
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(displayUrl, "_blank")}
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
