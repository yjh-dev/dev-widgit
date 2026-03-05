"use client";

import { useState, useMemo, useEffect, useRef, startTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  History,
  Star,
  ArrowUp,
} from "lucide-react";
import ThemeToggle from "@/components/ui/theme-toggle";
import LocaleToggle from "@/components/ui/locale-toggle";
import WidgetThumbnail from "@/components/home/WidgetThumbnail";
import AdBanner from "@/components/AdBanner";
import { getRecentWidgets } from "@/lib/recent-widgets";
import { getCategories, getAllWidgets } from "@/lib/widget-categories";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { useLocale } from "@/components/LocaleProvider";

const VISITED_KEY = "wiget-tree-visited";

export default function Home() {
  const { locale, t } = useLocale();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const CATEGORY_ALL = t("home.all");
  const [activeCategory, setActiveCategory] = useState(CATEGORY_ALL);
  const [recentTypes, setRecentTypes] = useState<string[]>([]);
  const [favoriteTypes, setFavoriteTypes] = useState<string[]>([]);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const [headerH, setHeaderH] = useState(0);

  const localCategories = useMemo(() => getCategories(locale), [locale]);
  const localAllWidgets = useMemo(() => getAllWidgets(locale), [locale]);
  const categoryNames = useMemo(() => [CATEGORY_ALL, ...localCategories.map((c) => c.title)], [CATEGORY_ALL, localCategories]);

  useEffect(() => {
    if (!localStorage.getItem(VISITED_KEY)) {
      router.replace("/intro");
      return;
    }
    setReady(true);
  }, [router]);

  useEffect(() => {
    setActiveCategory(CATEGORY_ALL);
  }, [CATEGORY_ALL]);

  useEffect(() => {
    startTransition(() => {
      setRecentTypes(getRecentWidgets().map((r) => r.type));
      setFavoriteTypes(getFavorites());
    });
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeaderH(el.offsetHeight));
    ro.observe(el);
    setHeaderH(el.offsetHeight);
    return () => ro.disconnect();
  }, [ready]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 80 && y > lastScrollY.current) {
        setHeaderHidden(true);
      } else if (y < lastScrollY.current) {
        setHeaderHidden(false);
      }
      setShowScrollTop(y > 600);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const recentWidgets = useMemo(
    () => recentTypes
      .map((type) => localAllWidgets.find((w) => w.type === type))
      .filter(Boolean) as (typeof localAllWidgets)[number][],
    [recentTypes, localAllWidgets],
  );

  const favoriteWidgets = useMemo(
    () => favoriteTypes
      .map((type) => localAllWidgets.find((w) => w.type === type))
      .filter(Boolean) as (typeof localAllWidgets)[number][],
    [favoriteTypes, localAllWidgets],
  );

  const handleToggleFavorite = (type: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(type);
    setFavoriteTypes(getFavorites());
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const byCat =
      activeCategory === CATEGORY_ALL
        ? localCategories
        : localCategories.filter((c) => c.title === activeCategory);

    if (!q) return byCat;

    return byCat
      .map((c) => ({
        ...c,
        widgets: c.widgets.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.desc.toLowerCase().includes(q) ||
            w.tags.some((t) => t.toLowerCase().includes(q)),
        ),
      }))
      .filter((c) => c.widgets.length > 0);
  }, [query, activeCategory, localCategories, CATEGORY_ALL]);

  const totalCount = filtered.reduce((sum, c) => sum + c.widgets.length, 0);

  const highlight = (text: string) => {
    const q = query.trim();
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-primary/20 text-inherit rounded-sm px-0.5">{text.slice(idx, idx + q.length)}</mark>
        {text.slice(idx + q.length)}
      </>
    );
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header ref={headerRef} className={`border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 transition-transform duration-300 ${headerHidden ? "max-md:-translate-y-full" : ""}`}>
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/intro" className="text-xl font-bold tracking-tight">Wiget-Tree</Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LocaleToggle />
          </div>
        </div>
      </header>

      <div className="pt-6" />

      {/* Favorite widgets */}
      {favoriteWidgets.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <h2 className="text-sm font-medium text-muted-foreground">즐겨찾기</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {favoriteWidgets.map((w) => {
              const Icon = w.icon;
              return (
                <Link
                  key={w.type}
                  href={w.href}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-card shrink-0 transition-colors hover:bg-accent"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium whitespace-nowrap">{w.name}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Recent widgets */}
      {recentWidgets.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <History className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-muted-foreground">{t("home.recentWidgets")}</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {recentWidgets.map((w) => {
              const Icon = w.icon;
              return (
                <Link
                  key={w.type}
                  href={w.href}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border bg-card shrink-0 transition-colors hover:bg-accent"
                >
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium whitespace-nowrap">{w.name}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Search & Filter */}
      <section className="max-w-5xl mx-auto px-6 py-8 space-y-4">
        {/* Search input */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("home.search")}
            aria-label={t("home.search")}
            className="w-full rounded-lg border bg-background pl-9 pr-9 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="검색어 지우기"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="위젯 카테고리">
          {categoryNames.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={activeCategory === name}
              onClick={() => setActiveCategory(name)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === name
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </section>

      {/* Result count */}
      {query.trim() && (
        <div className="max-w-5xl mx-auto px-6 pb-2">
          <p className="text-sm text-muted-foreground">
            {totalCount > 0 ? `${totalCount} ${t("home.resultCount")}` : ""}
          </p>
        </div>
      )}

      {/* Ad */}
      <div className="max-w-5xl mx-auto px-6 pb-8">
        <AdBanner format="horizontal" />
      </div>

      {/* Categories */}
      <main className="max-w-5xl mx-auto px-6 pb-20 space-y-12">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">
              &ldquo;{query}&rdquo; {t("home.noResult")}
            </p>
          </div>
        ) : (
          filtered.map((category) => (
            <section key={category.title}>
              <h2
                className="text-lg font-semibold mb-4 sticky z-40 bg-background py-2 -mx-6 px-6 md:static md:mx-0 md:px-0 md:py-0 transition-[top] duration-300"
                style={{ top: headerHidden ? 0 : headerH }}
              >{category.title}</h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {category.widgets.map((w) => {
                  const Icon = w.icon;
                  return (
                    <Link
                      key={w.href}
                      href={w.href}
                      className="group rounded-xl border bg-card overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative"
                    >
                      <WidgetThumbnail type={w.type} />
                      <div className="p-2.5 sm:p-4 flex items-start gap-2 sm:gap-3">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-card-foreground text-sm sm:text-base">{highlight(w.name)}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">{highlight(w.desc)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => handleToggleFavorite(w.type, e)}
                          className="shrink-0 p-1 rounded-md hover:bg-muted transition-colors"
                          aria-label={favoriteTypes.includes(w.type) ? "즐겨찾기 해제" : "즐겨찾기 추가"}
                        >
                          <Star
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                              favoriteTypes.includes(w.type)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-muted-foreground/40"
                            }`}
                          />
                        </button>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Scroll to top FAB — mobile only */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-4 z-40 md:hidden w-10 h-10 rounded-full bg-muted/80 backdrop-blur border shadow-md flex items-center justify-center active:scale-95 transition-all"
          style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
          aria-label="맨 위로 이동"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Wiget-Tree</span>
              <span>{localAllWidgets.length} {t("footer.widgets")}</span>
              <span>{t("footer.serverless")}</span>
              <span>{t("footer.free")}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <Link href="/intro" className="hover:text-foreground transition-colors">
                {t("nav.intro")}
              </Link>
              <Link href="/guide" className="hover:text-foreground transition-colors">
                {t("nav.guide")}
              </Link>
              <Link href="/templates" className="hover:text-foreground transition-colors">
                {t("nav.templates")}
              </Link>
              <Link href="/gallery" className="hover:text-foreground transition-colors">
                {t("nav.gallery")}
              </Link>
              <Link href="/my-widgets" className="hover:text-foreground transition-colors">
                {t("nav.myWidgets")}
              </Link>
              <Link href="/blog" className="hover:text-foreground transition-colors">
                {t("nav.blog")}
              </Link>
              <Link href="/feedback" className="hover:text-foreground transition-colors">
                {t("nav.feedback")}
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                {t("nav.terms")}
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                {t("nav.privacy")}
              </Link>
              <Link href="/settings" className="hover:text-foreground transition-colors">
                {t("nav.settings")}
              </Link>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6">
            {t("footer.desc")}
          </p>
        </div>
      </footer>
    </div>
  );
}
