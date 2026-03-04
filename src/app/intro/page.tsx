"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  MousePointerClick,
  Palette,
  Copy,
  Code,
  LayoutGrid,
  BookOpenCheck,
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
import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/theme-toggle";
import LocaleToggle from "@/components/ui/locale-toggle";
const HeroWidgetShowcase = dynamic(
  () => import("@/components/home/HeroWidgetShowcase"),
  { ssr: false },
);
import { getAllWidgets } from "@/lib/widget-categories";
import { useLocale } from "@/components/LocaleProvider";

export default function IntroPage() {
  const { locale, t } = useLocale();
  const localAllWidgets = useMemo(() => getAllWidgets(locale), [locale]);

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
                  <Link href="/">
                    {t("home.heroCta")}
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
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
      <section className="max-w-3xl mx-auto px-6 pb-14 space-y-4">
        {/* Primary */}
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/">
              <LayoutGrid className="w-4 h-4 mr-2" />
              {t("home.heroCta")}
            </Link>
          </Button>
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
            <Link href="/gallery">
              <GalleryHorizontalEnd className="w-4 h-4 mr-2" />
              {t("nav.gallery")}
            </Link>
          </Button>
        </div>
        {/* Makers */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { href: "/create/icon", icon: Sparkles, label: t("nav.iconMaker") },
            { href: "/create/cover", icon: ImageIcon, label: t("nav.coverMaker") },
            { href: "/create/badge", icon: Award, label: t("nav.badgeMaker") },
            { href: "/create/card", icon: CreditCard, label: t("nav.cardMaker") },
            { href: "/create/group", icon: Group, label: t("nav.groupMaker") },
          ].map((item) => {
            const NavIcon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground bg-muted hover:bg-muted/80 transition-colors"
              >
                <NavIcon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </section>

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
              <Link href="/" className="hover:text-foreground transition-colors">
                {t("home.heroCta")}
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
