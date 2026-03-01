"use client";

import { useState, useEffect, useMemo, useCallback, startTransition } from "react";
import { Copy, RotateCcw, ExternalLink, ChevronDown, Download, Import, Code, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useEditorActions } from "./EditorActionsContext";
import { compressWidgetUrl, decompressToParams } from "@/lib/url-compression";
import { toPng } from "html-to-image";
import { getCustomPresets, type CustomPreset } from "@/lib/custom-presets";
import type { WidgetType } from "@/lib/templates";
import ThemeQuickApply from "./ThemeQuickApply";
import EditorActionPresets from "./EditorActionPresets";
import EditorActionSaveWidget from "./EditorActionSaveWidget";

const LS_KEY = "widgit-short-url";

interface EditorActionsProps {
  widgetUrl: string;
  onCopy: () => void;
  onReset: () => void;
  onApplyTheme?: (colors: Record<string, string>) => void;
}

function extractWidgetType(url: string): string {
  try {
    const path = new URL(url).pathname;
    return path.split("/").pop() || "";
  } catch {
    return "";
  }
}

export default function EditorActions({
  widgetUrl,
  onCopy,
  onReset,
  onApplyTheme,
}: EditorActionsProps) {
  const [guideOpen, setGuideOpen] = useState(false);
  const [shortUrl, setShortUrl] = useState(false);
  const [customPresets, setCustomPresets] = useState<CustomPreset[]>([]);
  const [showImport, setShowImport] = useState(false);
  const [importUrl, setImportUrl] = useState("");
  const { register } = useEditorActions();

  const [mounted, setMounted] = useState(false);
  useEffect(() => { startTransition(() => setMounted(true)); }, []);

  const widgetType = useMemo(() => extractWidgetType(widgetUrl), [widgetUrl]);

  useEffect(() => {
    startTransition(() => {
      try {
        const saved = localStorage.getItem(LS_KEY);
        if (saved === "true") setShortUrl(true);
      } catch { /* SSR / 접근 불가 무시 */ }
    });
  }, []);

  useEffect(() => {
    if (widgetType) startTransition(() => setCustomPresets(getCustomPresets(widgetType)));
  }, [widgetType]);

  const handleImport = () => {
    const raw = importUrl.trim();
    if (!raw) { toast.error("URL을 입력하세요."); return; }
    try {
      const parsed = new URL(raw);
      const path = parsed.pathname;
      if (!path.startsWith("/widget/")) {
        toast.error("위젯 URL 형식이 아닙니다. (/widget/... 형태)");
        return;
      }
      const compressed = parsed.searchParams.get("c");
      let qs = parsed.search;
      if (compressed) {
        const decompressed = decompressToParams(compressed);
        if (decompressed) {
          qs = `?${decompressed.toString()}`;
        }
      }
      const createPath = path.replace("/widget/", "/create/");
      window.location.href = `${createPath}${qs}`;
    } catch {
      toast.error("올바른 URL을 입력하세요.");
    }
  };

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
          aria-label="새 탭에서 열기"
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={async () => {
            const preview = document.getElementById("widget-preview");
            if (!preview) { toast.error("프리뷰를 찾을 수 없습니다."); return; }
            try {
              const dataUrl = await toPng(preview, { pixelRatio: 2 });
              const a = document.createElement("a");
              a.download = "widget.png";
              a.href = dataUrl;
              a.click();
              toast.success("이미지가 다운로드되었습니다!");
            } catch {
              toast.error("이미지 내보내기에 실패했습니다.");
            }
          }}
          title="이미지로 저장"
          aria-label="이미지로 저장"
        >
          <Download className="w-4 h-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon" title="초기화" aria-label="초기화">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>설정을 초기화할까요?</AlertDialogTitle>
              <AlertDialogDescription>
                모든 설정이 기본값으로 되돌아갑니다. 이 작업은 되돌릴 수 없습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={onReset}>초기화</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-8 text-xs"
          onClick={() => {
            const iframe = `<iframe src="${displayUrl}" width="100%" height="300" style="border:none;" loading="lazy"></iframe>`;
            navigator.clipboard.writeText(iframe).then(() => {
              toast.success("Embed 코드가 복사되었습니다!");
            });
          }}
        >
          <Code className="w-3.5 h-3.5 mr-1.5" />
          Embed 코드
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-8 text-xs"
          onClick={() => {
            const editorUrl = displayUrl.replace("/widget/", "/create/");
            navigator.clipboard.writeText(editorUrl).then(() => {
              toast.success("에디터 공유 링크가 복사되었습니다!");
            });
          }}
        >
          <Share2 className="w-3.5 h-3.5 mr-1.5" />
          공유 링크
        </Button>
      </div>

      <div className="flex flex-wrap gap-x-3 gap-y-1">
        <button
          type="button"
          onClick={() => setShowImport(!showImport)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Import className={`w-3.5 h-3.5 transition-transform ${showImport ? "rotate-180" : ""}`} />
          기존 URL 불러오기
        </button>
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
      </div>

      {showImport && (
        <div className="flex gap-2">
          <input
            type="text"
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleImport()}
            placeholder="기존 위젯 URL 붙여넣기"
            className="flex-1 rounded-md border bg-background px-3 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
          <Button size="sm" className="h-8 text-xs" onClick={handleImport}>불러오기</Button>
        </div>
      )}
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

      {mounted && onApplyTheme && widgetType && (
        <div className="border-t pt-4">
          <ThemeQuickApply
            widgetType={widgetType as WidgetType}
            onApply={(colors) => {
              onApplyTheme(colors);
              toast.success("테마가 적용되었습니다!");
            }}
          />
        </div>
      )}

      <EditorActionSaveWidget widgetType={widgetType} widgetUrl={widgetUrl} />

      <EditorActionPresets
        widgetType={widgetType}
        widgetUrl={widgetUrl}
        presets={customPresets}
        onPresetsChange={setCustomPresets}
      />
    </div>
  );
}
