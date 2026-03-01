"use client";

import { useState, useEffect, useMemo, startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, History, Search } from "lucide-react";
import { getRecentWidgets } from "@/lib/recent-widgets";
import { getAllWidgets } from "@/lib/widget-categories";
import { useLocale } from "@/components/LocaleProvider";

export default function EditorWidgetNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [recentTypes, setRecentTypes] = useState<string[]>([]);

  const currentType = pathname.replace("/create/", "");
  const widgets = useMemo(() => getAllWidgets(locale), [locale]);
  const current = widgets.find((w) => w.type === currentType);

  useEffect(() => {
    startTransition(() => {
      setRecentTypes(getRecentWidgets().map((r) => r.type));
    });
  }, []);

  const recentWidgets = useMemo(
    () =>
      recentTypes
        .filter((type) => type !== currentType)
        .map((type) => widgets.find((w) => w.type === type))
        .filter(Boolean)
        .slice(0, 4) as (typeof widgets)[number][],
    [recentTypes, currentType, widgets],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return widgets
      .filter(
        (w) =>
          w.type !== currentType &&
          (w.name.toLowerCase().includes(q) ||
            w.type.toLowerCase().includes(q) ||
            w.tags.some((t) => t.toLowerCase().includes(q))),
      )
      .slice(0, 8);
  }, [query, widgets, currentType]);

  const handleSelect = (type: string) => {
    setOpen(false);
    setQuery("");
    router.push(`/create/${type}`);
  };

  if (!current) return null;

  const CurrentIcon = current.icon;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <CurrentIcon className="w-4 h-4 text-primary" />
        <span className="font-medium text-foreground">{current.name}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => { setOpen(false); setQuery(""); }}
          />

          {/* dropdown */}
          <div className="absolute left-0 top-full mt-1 z-50 w-72 rounded-lg border bg-popover shadow-lg p-2 space-y-1">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={locale === "en" ? "Search widgets..." : "위젯 검색..."}
                className="w-full rounded-md border bg-background pl-8 pr-3 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                autoFocus
              />
            </div>

            {/* Search results */}
            {query.trim() && filtered.length > 0 && (
              <div className="max-h-48 overflow-y-auto">
                {filtered.map((w) => {
                  const Icon = w.icon;
                  return (
                    <button
                      key={w.type}
                      type="button"
                      onClick={() => handleSelect(w.type)}
                      className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-md text-xs hover:bg-accent transition-colors text-left"
                    >
                      <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate">{w.name}</span>
                      <span className="ml-auto text-muted-foreground text-[10px]">{w.category}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {query.trim() && filtered.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-2">
                {locale === "en" ? "No results" : "결과 없음"}
              </p>
            )}

            {/* Recent widgets (when no search query) */}
            {!query.trim() && recentWidgets.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 px-2 py-1">
                  <History className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    {locale === "en" ? "Recent" : "최근"}
                  </span>
                </div>
                {recentWidgets.map((w) => {
                  const Icon = w.icon;
                  return (
                    <button
                      key={w.type}
                      type="button"
                      onClick={() => handleSelect(w.type)}
                      className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-md text-xs hover:bg-accent transition-colors text-left"
                    >
                      <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate">{w.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
