"use client";

import { useState, useEffect, useMemo, useCallback, startTransition } from "react";
import { Copy, RotateCcw, ExternalLink, ChevronDown, Download, Import, Code, Share2, Image } from "lucide-react";
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
// html-to-image is lazy-loaded on demand (heavy ~300KB library)
import { getCustomPresets, type CustomPreset } from "@/lib/custom-presets";
import type { WidgetType } from "@/lib/templates";
import ThemeQuickApply from "./ThemeQuickApply";
import EditorActionPresets from "./EditorActionPresets";
import EditorActionSaveWidget from "./EditorActionSaveWidget";
import ShareCardDialog from "./ShareCardDialog";
import GallerySubmitButton from "./GallerySubmitButton";
import { trackCopyUrl, trackCopyEmbed, trackCopyShareLink, trackExportImage } from "@/lib/analytics";
import { useLocale } from "@/components/LocaleProvider";

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
  const [shareOpen, setShareOpen] = useState(false);
  const { register } = useEditorActions();
  const { t } = useLocale();

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
    if (!raw) { toast.error(t("editor.enterUrl")); return; }
    try {
      const parsed = new URL(raw);
      const path = parsed.pathname;
      if (!path.startsWith("/widget/")) {
        toast.error(t("editor.notWidgetUrl"));
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
      toast.error(t("editor.invalidUrl"));
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
    trackCopyUrl(widgetType);
    if (shortUrl) {
      navigator.clipboard.writeText(displayUrl).then(() => {
        toast.success(t("editor.shortUrlCopied"));
      });
    } else {
      onCopy();
    }
  }, [shortUrl, displayUrl, onCopy, widgetType, t]);

  useEffect(() => {
    register({ widgetUrl: displayUrl, onCopy: wrappedOnCopy, onReset });
  }, [displayUrl, wrappedOnCopy, onReset, register]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="widget-url">{t("editor.widgetUrl")}</Label>
          <div className="flex items-center gap-1.5">
            <Label htmlFor="short-url-toggle" className="text-xs text-muted-foreground cursor-pointer">{t("editor.shortUrl")}</Label>
            <Switch id="short-url-toggle" checked={shortUrl} onCheckedChange={handleToggle} />
          </div>
        </div>
        <textarea
          id="widget-url"
          readOnly
          value={displayUrl}
          rows={2}
          className="w-full rounded-md border bg-muted px-3 py-2 text-xs text-muted-foreground break-all resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={wrappedOnCopy} className="flex-1" data-tour-step="copy-url">
          <Copy className="w-4 h-4 mr-2" />
          {t("editor.copyUrl")}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(displayUrl, "_blank")}
          title={t("editor.openNew")}
          aria-label={t("editor.openNew")}
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={async () => {
            const preview = document.getElementById("widget-preview");
            if (!preview) { toast.error(t("editor.noPreview")); return; }
            try {
              const { toPng } = await import("html-to-image");
              const dataUrl = await toPng(preview, { pixelRatio: 2 });
              const a = document.createElement("a");
              a.download = "widget.png";
              a.href = dataUrl;
              a.click();
              trackExportImage(widgetType);
              toast.success(t("editor.imageSaved"));
            } catch {
              toast.error(t("editor.imageFailed"));
            }
          }}
          title={t("editor.saveImage")}
          aria-label={t("editor.saveImage")}
        >
          <Download className="w-4 h-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon" title={t("editor.reset")} aria-label={t("editor.reset")}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("editor.resetConfirm")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t("editor.resetDesc")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("editor.cancel")}</AlertDialogCancel>
              <AlertDialogAction onClick={onReset}>{t("editor.reset")}</AlertDialogAction>
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
              trackCopyEmbed(widgetType);
              toast.success(t("editor.embedCopied"));
            });
          }}
        >
          <Code className="w-3.5 h-3.5 mr-1.5" />
          {t("editor.embedCode")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-8 text-xs"
          onClick={() => {
            const editorUrl = displayUrl.replace("/widget/", "/create/");
            navigator.clipboard.writeText(editorUrl).then(() => {
              trackCopyShareLink(widgetType);
              toast.success(t("editor.shareLinkCopied"));
            });
          }}
        >
          <Share2 className="w-3.5 h-3.5 mr-1.5" />
          {t("editor.shareLink")}
        </Button>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 h-8 text-xs"
          onClick={() => setShareOpen(true)}
        >
{/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image className="w-3.5 h-3.5 mr-1.5" />
          {t("editor.snsCard")}
        </Button>
        {mounted && widgetType && (
          <GallerySubmitButton widgetType={widgetType} widgetUrl={displayUrl} />
        )}
      </div>
      <ShareCardDialog open={shareOpen} onOpenChange={setShareOpen} widgetUrl={displayUrl} />

      <div className="flex flex-wrap gap-x-3 gap-y-1">
        <button
          type="button"
          onClick={() => setShowImport(!showImport)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-expanded={showImport}
          aria-label={t("editor.importUrl")}
        >
          <Import className={`w-3.5 h-3.5 transition-transform ${showImport ? "rotate-180" : ""}`} />
          {t("editor.importUrl")}
        </button>
        <button
          type="button"
          onClick={() => setGuideOpen(!guideOpen)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-expanded={guideOpen}
          aria-label={t("editor.embedGuide")}
          data-tour-step="embed-guide"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${guideOpen ? "rotate-180" : ""}`}
          />
          {t("editor.embedGuide")}
        </button>
      </div>

      {showImport && (
        <div className="flex gap-2">
          <input
            type="text"
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleImport()}
            placeholder={t("editor.importPlaceholder")}
            aria-label={t("editor.importUrl")}
            className="flex-1 rounded-md border bg-background px-3 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            autoFocus
          />
          <Button size="sm" className="h-8 text-xs" onClick={handleImport}>{t("editor.loadBtn")}</Button>
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
              toast.success(t("editor.themeApplied"));
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
