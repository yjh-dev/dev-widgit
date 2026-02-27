"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Copy, RotateCcw, ExternalLink, ChevronDown, Download, Save, Trash2, Star, Import } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useEditorActions } from "./EditorActionsContext";
import { compressWidgetUrl, decompressToParams } from "@/lib/url-compression";
import { toPng } from "html-to-image";
import {
  getCustomPresets,
  saveCustomPreset,
  deleteCustomPreset,
  type CustomPreset,
} from "@/lib/custom-presets";

const LS_KEY = "widgit-short-url";

interface EditorActionsProps {
  widgetUrl: string;
  onCopy: () => void;
  onReset: () => void;
}

function extractWidgetType(url: string): string {
  try {
    const path = new URL(url).pathname; // /widget/dday
    return path.split("/").pop() || "";
  } catch {
    return "";
  }
}

export default function EditorActions({
  widgetUrl,
  onCopy,
  onReset,
}: EditorActionsProps) {
  const [guideOpen, setGuideOpen] = useState(false);
  const [shortUrl, setShortUrl] = useState(false);
  const [customPresets, setCustomPresets] = useState<CustomPreset[]>([]);
  const [savingName, setSavingName] = useState("");
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [importUrl, setImportUrl] = useState("");
  const { register } = useEditorActions();

  const widgetType = useMemo(() => extractWidgetType(widgetUrl), [widgetUrl]);

  // localStorage에서 토글 상태 복원
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved === "true") setShortUrl(true);
    } catch { /* SSR / 접근 불가 무시 */ }
  }, []);

  // 커스텀 프리셋 로드
  useEffect(() => {
    if (widgetType) setCustomPresets(getCustomPresets(widgetType));
  }, [widgetType]);

  const handleSavePreset = () => {
    const name = savingName.trim();
    if (!name) { toast.error("프리셋 이름을 입력하세요."); return; }
    saveCustomPreset(widgetType, name, widgetUrl);
    setCustomPresets(getCustomPresets(widgetType));
    setSavingName("");
    setShowSaveInput(false);
    toast.success(`"${name}" 프리셋이 저장되었습니다!`);
  };

  const handleDeletePreset = (id: string) => {
    deleteCustomPreset(widgetType, id);
    setCustomPresets(getCustomPresets(widgetType));
    toast.success("프리셋이 삭제되었습니다.");
  };

  const handleLoadPreset = (preset: CustomPreset) => {
    window.location.href = preset.url.replace("/widget/", "/create/");
  };

  const handleImport = () => {
    const raw = importUrl.trim();
    if (!raw) { toast.error("URL을 입력하세요."); return; }
    try {
      const parsed = new URL(raw);
      const path = parsed.pathname;

      // /widget/xxx → /create/xxx
      if (!path.startsWith("/widget/")) {
        toast.error("위젯 URL 형식이 아닙니다. (/widget/... 형태)");
        return;
      }

      // 압축 URL 처리: ?c=... → 개별 파라미터로 전개
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
        >
          <Download className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onReset} title="초기화">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-3">
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

      {/* Custom presets */}
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

        {customPresets.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {customPresets.map((p) => (
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
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive p-0.5"
                  title="삭제"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          !showSaveInput && (
            <p className="text-xs text-muted-foreground">
              현재 설정을 저장하면 다음에 빠르게 불러올 수 있습니다.
            </p>
          )
        )}
      </div>
    </div>
  );
}
