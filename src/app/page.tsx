"use client";

import { useState, useMemo, useEffect, startTransition } from "react";
import Link from "next/link";
import {
  MousePointerClick,
  Palette,
  Copy,
  Code,
  LayoutGrid,
  BookOpenCheck,
  Search,
  X,
  History,
  FolderHeart,
  Sparkles,
  Image as ImageIcon,
  Award,
  CreditCard,
  GalleryHorizontalEnd,
  Group,
  Zap,
  Server,
  Puzzle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import LocaleToggle from "@/components/ui/locale-toggle";
import WidgetThumbnail from "@/components/home/WidgetThumbnail";
import HeroWidgetShowcase from "@/components/home/HeroWidgetShowcase";
import AdBanner from "@/components/AdBanner";
import { getRecentWidgets } from "@/lib/recent-widgets";
import { getCategories, getAllWidgets } from "@/lib/widget-categories";
import { useLocale } from "@/components/LocaleProvider";

export default function Home() {
  const { locale, t } = useLocale();
  const [query, setQuery] = useState("");
  const CATEGORY_ALL = t("home.all");
  const [activeCategory, setActiveCategory] = useState(CATEGORY_ALL);
  const [recentTypes, setRecentTypes] = useState<string[]>([]);

  const localCategories = useMemo(() => getCategories(locale), [locale]);
  const localAllWidgets = useMemo(() => getAllWidgets(locale), [locale]);
  const categoryNames = useMemo(() => [CATEGORY_ALL, ...localCategories.map((c) => c.title)], [CATEGORY_ALL, localCategories]);

  // Reset category filter when locale changes
  useEffect(() => {
    setActiveCategory(CATEGORY_ALL);
  }, [CATEGORY_ALL]);

  useEffect(() => {
    startTransition(() => {
      setRecentTypes(getRecentWidgets().map((r) => r.type));
    });
  }, []);

  const recentWidgets = useMemo(
    () => recentTypes
      .map((type) => localAllWidgets.find((w) => w.type === type))
      .filter(Boolean) as (typeof localAllWidgets)[number][],
    [recentTypes, localAllWidgets],
  );

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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="pt-12 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-2xl font-bold tracking-tight">Widgit</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LocaleToggle />
            </div>
          </div>

          {/* Hero content — 2 columns on desktop */}
          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left — text */}
            <div className="text-center md:text-left space-y-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {t("home.heroTitle1")}
                <br />
                <span className="text-primary">{t("home.heroTitle2")}</span>{t("home.heroTitle3")}
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto md:mx-0">
                {localAllWidgets.length}{t("home.heroDesc")}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button size="lg" asChild>
                  <a href="#widgets">
                    {t("home.heroCta")}
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/guide">
                    <BookOpenCheck className="w-4 h-4 mr-1.5" />
                    {t("home.heroGuide")}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right — live widget showcase */}
            <div className="hidden md:block">
              <HeroWidgetShowcase />
            </div>
          </div>
        </div>
      </header>

      {/* Stats strip */}
      <section className="border-y bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 py-6 grid grid-cols-3 gap-4 text-center">
          {[
            { icon: Puzzle, value: `${localAllWidgets.length}`, label: t("home.statWidgets") },
            { icon: Zap, value: t("home.statFree"), label: t("home.statFreeLabel") },
            { icon: Server, value: t("home.statServerless"), label: t("home.statServerlessLabel") },
          ].map((stat) => {
            const StatIcon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center gap-1.5">
                <StatIcon className="w-5 h-5 text-primary" />
                <p className="text-xl sm:text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How to use */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <h3 className="text-center text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wider">{t("home.howToUse")}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { icon: MousePointerClick, label: t("step.select"), desc: t("step.selectDesc") },
            { icon: Palette, label: t("step.customize"), desc: t("step.customizeDesc") },
            { icon: Copy, label: t("step.copy"), desc: t("step.copyDesc") },
            { icon: Code, label: t("step.embed"), desc: t("step.embedDesc") },
          ].map((step, i) => {
            const StepIcon = step.icon;
            return (
              <div key={i} className="flex flex-col items-center gap-2 p-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <StepIcon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <p className="text-sm font-medium">{step.label}</p>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Navigation links */}
      <section className="max-w-3xl mx-auto px-6 pb-14 flex flex-wrap justify-center gap-3">
        <Button variant="outline" asChild>
          <Link href="/templates">
            <LayoutGrid className="w-4 h-4 mr-2" />
            {t("nav.templates")}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/guide">
            <BookOpenCheck className="w-4 h-4 mr-2" />
            {t("nav.guide")}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/my-widgets">
            <FolderHeart className="w-4 h-4 mr-2" />
            {t("nav.myWidgets")}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/create/icon">
            <Sparkles className="w-4 h-4 mr-2" />
            {t("nav.iconMaker")}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/create/cover">
            <ImageIcon className="w-4 h-4 mr-2" />
            {t("nav.coverMaker")}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/gallery">
            <GalleryHorizontalEnd className="w-4 h-4 mr-2" />
            {t("nav.gallery")}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/create/group">
            <Group className="w-4 h-4 mr-2" />
            {t("nav.groupMaker")}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/create/badge">
            <Award className="w-4 h-4 mr-2" />
            {t("nav.badgeMaker")}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/create/card">
            <CreditCard className="w-4 h-4 mr-2" />
            {t("nav.cardMaker")}
          </Link>
        </Button>
      </section>

      {/* Recent widgets */}
      {recentWidgets.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-8">
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
      <section id="widgets" className="max-w-5xl mx-auto px-6 pb-8 space-y-4 scroll-mt-4">
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
              <h2 className="text-lg font-semibold mb-4">{category.title}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.widgets.map((w) => {
                  const Icon = w.icon;
                  return (
                    <Link
                      key={w.href}
                      href={w.href}
                      className="group rounded-xl border bg-card overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <WidgetThumbnail type={w.type} />
                      <div className="p-4 flex items-start gap-3">
                        <Icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                        <div>
                          <p className="font-semibold text-card-foreground">{w.name}</p>
                          <p className="text-sm text-muted-foreground">{w.desc}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Widgit</span>
              <span>{localAllWidgets.length} {t("footer.widgets")}</span>
              <span>{t("footer.serverless")}</span>
              <span>{t("footer.free")}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
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
