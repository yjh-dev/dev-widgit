"use client";

import { useState, useEffect, useMemo, startTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Pencil,
  Trash2,
  CopyPlus,
  FolderHeart,
  Plus,
  Search,
  Download,
  Upload,
} from "lucide-react";
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
import { toast } from "sonner";
import ThemeToggle from "@/components/ui/theme-toggle";
import {
  getSavedWidgets,
  deleteWidget,
  duplicateWidget,
  updateWidget,
  importWidgets,
  type SavedWidget,
} from "@/lib/saved-widgets";
import { getWidgetName, getWidgetIcon } from "@/lib/widget-names";
import type { WidgetType } from "@/lib/templates";

function formatDate(ts: number): string {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${y}.${m}.${day} ${h}:${min}`;
}

export default function MyWidgetsPage() {
  const [widgets, setWidgets] = useState<SavedWidget[]>([]);
  const [mounted, setMounted] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  useEffect(() => {
    startTransition(() => {
      setWidgets(getSavedWidgets());
      setMounted(true);
    });
  }, []);

  const refresh = () => setWidgets(getSavedWidgets());

  const uniqueTypes = useMemo(
    () => [...new Set(widgets.map((w) => w.type))],
    [widgets],
  );

  const filtered = useMemo(() => {
    let list = widgets;
    if (typeFilter) list = list.filter((w) => w.type === typeFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((w) => w.name.toLowerCase().includes(q));
    }
    return list;
  }, [widgets, typeFilter, search]);

  const handleCopy = (w: SavedWidget) => {
    const fullUrl = `${window.location.origin}${w.widgetUrl}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      toast.success("URL이 복사되었습니다!");
    });
  };

  const handleEdit = (w: SavedWidget) => {
    const createUrl = w.widgetUrl.replace("/widget/", "/create/");
    window.location.href = createUrl;
  };

  const handleDelete = (id: string) => {
    deleteWidget(id);
    refresh();
    toast.success("위젯이 삭제되었습니다.");
  };

  const handleDuplicate = (id: string) => {
    const copy = duplicateWidget(id);
    if (copy) {
      refresh();
      toast.success(`"${copy.name}" 위젯이 복제되었습니다!`);
    }
  };

  const handleRenameStart = (w: SavedWidget) => {
    setEditingId(w.id);
    setEditingName(w.name);
  };

  const handleExport = () => {
    const data = getSavedWidgets();
    if (data.length === 0) { toast.error("내보낼 위젯이 없습니다."); return; }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `widgit-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`${data.length}개 위젯을 내보냈습니다!`);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          if (!Array.isArray(data)) { toast.error("올바른 위젯 백업 파일이 아닙니다."); return; }
          const count = importWidgets(data);
          if (count === 0) { toast.info("가져올 새 위젯이 없습니다. (이미 존재)"); return; }
          refresh();
          toast.success(`${count}개 위젯을 가져왔습니다!`);
        } catch {
          toast.error("파일을 읽을 수 없습니다.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleRenameSubmit = () => {
    if (!editingId) return;
    const name = editingName.trim();
    if (!name) {
      toast.error("이름을 입력하세요.");
      return;
    }
    updateWidget(editingId, { name });
    setEditingId(null);
    setEditingName("");
    refresh();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-3">
          <FolderHeart className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">내 위젯</h1>
          {mounted && widgets.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {widgets.length}개
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          에디터에서 저장한 위젯을 관리합니다.
        </p>
        {mounted && widgets.length > 0 && (
          <div className="flex gap-2 mt-3">
            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={handleExport}>
              <Download className="w-3.5 h-3.5 mr-1" />
              내보내기
            </Button>
            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={handleImport}>
              <Upload className="w-3.5 h-3.5 mr-1" />
              가져오기
            </Button>
          </div>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-20">
        {mounted && widgets.length > 0 && (
          <div className="mb-6 space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="위젯 이름 검색"
                aria-label="위젯 이름 검색"
                className="w-full pl-9 pr-3 py-2 rounded-lg border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            {/* Type filter chips */}
            {uniqueTypes.length > 1 && (
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setTypeFilter(null)}
                  className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                    typeFilter === null
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  전체
                </button>
                {uniqueTypes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTypeFilter(typeFilter === t ? null : t)}
                    className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                      typeFilter === t
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {getWidgetName(t as WidgetType)}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {!mounted ? (
          <div className="py-20" />
        ) : widgets.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20">
            <FolderHeart className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-40" />
            <p className="text-muted-foreground mb-1">
              저장된 위젯이 없습니다.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              에디터에서 위젯을 만들고 &ldquo;내 위젯에 저장&rdquo; 버튼을 눌러보세요.
            </p>
            <div className="flex gap-3 justify-center">
              <Button asChild>
                <Link href="/">
                  <Plus className="w-4 h-4 mr-2" />
                  위젯 만들러 가기
                </Link>
              </Button>
              <Button variant="outline" onClick={handleImport}>
                <Upload className="w-4 h-4 mr-2" />
                가져오기
              </Button>
            </div>
          </div>
        ) : (
          /* Widget grid */
          filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm">
                검색 결과가 없습니다.
              </p>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((w) => {
              const Icon = getWidgetIcon(w.type as WidgetType);
              const typeName = getWidgetName(w.type as WidgetType);

              return (
                <div
                  key={w.id}
                  className="rounded-xl border bg-card overflow-hidden"
                >
                  {/* iframe live preview */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-muted" aria-hidden="true">
                    <iframe
                      src={w.widgetUrl}
                      className="absolute inset-0 origin-top-left border-0"
                      style={{
                        width: "200%",
                        height: "200%",
                        transform: "scale(0.5)",
                        pointerEvents: "none",
                      }}
                      loading="lazy"
                      title={w.name}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        {editingId === w.id ? (
                          <div className="flex gap-1.5">
                            <input
                              type="text"
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleRenameSubmit();
                                if (e.key === "Escape") setEditingId(null);
                              }}
                              className="flex-1 rounded border bg-background px-2 py-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              className="h-7 text-xs"
                              onClick={handleRenameSubmit}
                            >
                              확인
                            </Button>
                          </div>
                        ) : (
                          <p
                            className="font-semibold text-card-foreground truncate cursor-pointer hover:text-primary transition-colors"
                            onClick={() => handleRenameStart(w)}
                            title="클릭하여 이름 변경"
                          >
                            {w.name}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                            {typeName}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(w.updatedAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-8 text-xs"
                        onClick={() => handleCopy(w)}
                      >
                        <Copy className="w-3.5 h-3.5 mr-1" />
                        URL 복사
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-8 text-xs"
                        onClick={() => handleEdit(w)}
                      >
                        <Pencil className="w-3.5 h-3.5 mr-1" />
                        수정
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => handleDuplicate(w.id)}
                        title="복제"
                        aria-label="복제"
                      >
                        <CopyPlus className="w-3.5 h-3.5" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 text-destructive hover:text-destructive"
                            title="삭제"
                            aria-label="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>위젯을 삭제할까요?</AlertDialogTitle>
                            <AlertDialogDescription>
                              &ldquo;{w.name}&rdquo; 위젯이 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>취소</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(w.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              삭제
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )
        )}
      </main>
    </div>
  );
}
