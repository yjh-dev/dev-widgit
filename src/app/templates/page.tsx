"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, ExternalLink, ClipboardList, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ThemeToggle from "@/components/ui/theme-toggle";
import { templates, layoutPresets, widgetDefaults, type Template, type TemplateWidget, type LayoutPreset, type WidgetType } from "@/lib/templates";
import { copyToClipboard } from "@/lib/clipboard";
import { toast } from "sonner";

import DdayWidgetPreview from "@/components/widget/DdayWidgetPreview";
import ClockPreview from "@/components/widget/ClockPreview";
import QuotePreview from "@/components/widget/QuotePreview";
import PomodoroPreview from "@/components/widget/PomodoroPreview";
import TimeProgressPreview from "@/components/widget/TimeProgressPreview";
import HabitPreview from "@/components/widget/HabitPreview";
import ReadingPreview from "@/components/widget/ReadingPreview";
import GoalPreview from "@/components/widget/GoalPreview";
import TimelinePreview from "@/components/widget/TimelinePreview";
import BannerPreview from "@/components/widget/BannerPreview";
import MusicPreview from "@/components/widget/MusicPreview";
import BookmarkPreview from "@/components/widget/BookmarkPreview";
import AnalogClockPreview from "@/components/widget/AnalogClockPreview";
import CounterPreview from "@/components/widget/CounterPreview";
import MiniCalendarPreview from "@/components/widget/MiniCalendarPreview";
import LifeCalendarPreview from "@/components/widget/LifeCalendarPreview";
import StopwatchPreview from "@/components/widget/StopwatchPreview";
import WeatherPreview from "@/components/widget/WeatherPreview";

function WidgetMiniPreview({ widget }: { widget: TemplateWidget }) {
  const p = widget.previewProps;

  switch (widget.type) {
    case "dday":
      return (
        <DdayWidgetPreview
          title={p.title as string}
          targetDate={p.targetDate as string}
          bgColor={p.bgColor as string}
          textColor={p.textColor as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "clock":
      return (
        <ClockPreview
          timezone={p.timezone as string}
          format={p.format as "12h" | "24h"}
          font={p.font as string}
          color={p.color as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
          showSeconds={p.showSeconds as boolean}
          blink={p.blink as boolean}
        />
      );
    case "quote":
      return (
        <QuotePreview
          text={p.text as string}
          author={p.author as string}
          font={p.font as string}
          textColor={p.textColor as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "pomodoro":
      return (
        <PomodoroPreview
          workTime={p.workTime as number}
          breakTime={p.breakTime as number}
          color={p.color as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "time-progress":
      return (
        <TimeProgressPreview
          type={p.type as "day" | "month" | "year" | "week"}
          color={p.color as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "habit":
      return (
        <HabitPreview
          title={p.title as string}
          view={p.view as "week" | "month"}
          weekStart={p.weekStart as "sun" | "mon"}
          checkedDates={p.checkedDates as Set<string>}
          interactive={p.interactive as boolean}
          color={p.color as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
        />
      );
    case "reading":
      return (
        <ReadingPreview
          title={p.title as string}
          currentPage={p.currentPage as number}
          totalPages={p.totalPages as number}
          color={p.color as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "goal":
      return (
        <GoalPreview
          title={p.title as string}
          current={p.current as number}
          target={p.target as number}
          unit={p.unit as string}
          style={p.style as "bar" | "ring"}
          color={p.color as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "timeline":
      return (
        <TimelinePreview
          events={p.events as { title: string; date: string }[]}
          color={p.color as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "banner":
      return (
        <BannerPreview
          texts={p.texts as string[]}
          animation={p.animation as "none" | "scroll" | "fade"}
          bold={p.bold as boolean}
          color={p.color as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "music":
      return (
        <MusicPreview
          title={p.title as string}
          artist={p.artist as string}
          progress={p.progress as number}
          artColor={p.artColor as string}
          color={p.color as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "bookmark":
      return (
        <BookmarkPreview
          url={p.url as string}
          title={p.title as string}
          desc={p.desc as string}
          color={p.color as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
          linkable={p.linkable as boolean}
        />
      );
    case "analog-clock":
      return (
        <AnalogClockPreview
          timezone={p.timezone as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "weather":
      return (
        <WeatherPreview
          city={p.city as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "counter":
      return (
        <CounterPreview
          label={p.label as string}
          initial={p.initial as number}
          step={p.step as number}
          btnColor={p.btnColor as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "mini-calendar":
      return (
        <MiniCalendarPreview
          weekStart={p.weekStart as "sun" | "mon"}
          lang={p.lang as "ko" | "en"}
          highlight={p.highlight as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "life-calendar":
      return (
        <LifeCalendarPreview
          birthdate={p.birthdate as string}
          lifespan={p.lifespan as number}
          color={p.color as string}
          shape={p.shape as "square" | "round"}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    case "stopwatch":
      return (
        <StopwatchPreview
          showMs={p.showMs as boolean}
          showLap={p.showLap as boolean}
          btnColor={p.btnColor as string}
          bg={p.bg as string}
          borderRadius={p.borderRadius as number}
          padding={p.padding as number}
          fontSize={p.fontSize as "sm" | "md" | "lg" | "xl"}
        />
      );
    default:
      return null;
  }
}

function handleCopySingle(widgetUrl: string) {
  const fullUrl = `${window.location.origin}${widgetUrl}`;
  copyToClipboard(fullUrl);
  toast.success("URL이 클립보드에 복사되었습니다!");
}

function handleCopyAll(template: Template) {
  const allUrls = template.widgets
    .map((w) => `${window.location.origin}${w.url}`)
    .join("\n");
  copyToClipboard(allUrls);
  toast.success(`${template.widgets.length}개 위젯 URL이 모두 복사되었습니다!`);
}

function CompositeLayoutPreview({ template }: { template: Template }) {
  return (
    <div className="flex justify-center">
      <div
        className="w-full max-w-[600px] rounded-xl border bg-white p-4 overflow-hidden"
        style={{ transform: "scale(1)", transformOrigin: "top center" }}
      >
        <div className="flex flex-col gap-3">
          {template.layout.map((row, rowIdx) => (
            <div key={rowIdx} className="flex gap-3">
              {row.map((widgetIdx) => {
                const widget = template.widgets[widgetIdx];
                if (!widget) return null;
                return (
                  <div
                    key={widgetIdx}
                    className="flex-1 min-w-0 overflow-hidden"
                  >
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ minHeight: 80 }}
                    >
                      <div
                        className="origin-top-left"
                        style={{
                          width: "200%",
                          transform: "scale(0.5)",
                          pointerEvents: "none",
                        }}
                      >
                        <WidgetMiniPreview widget={widget} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LayoutPresetCard({
  preset,
  selected,
  onClick,
}: {
  preset: LayoutPreset;
  selected?: boolean;
  onClick?: () => void;
}) {
  let slotNum = 0;
  return (
    <div
      className={`p-3 border rounded-lg cursor-pointer transition-colors hover:border-primary ${
        selected ? "ring-2 ring-primary border-primary" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-2 mb-3">
        {preset.grid.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-2">
            {row.map((_, colIdx) => {
              slotNum++;
              return (
                <div
                  key={colIdx}
                  className="flex-1 h-8 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground font-medium"
                >
                  {slotNum}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div>
        <div className="text-sm font-medium">{preset.name}</div>
        <div className="text-xs text-muted-foreground">
          {preset.slots}칸 · {preset.desc}
        </div>
      </div>
    </div>
  );
}

function LayoutBuilder({
  preset,
  onClose,
}: {
  preset: LayoutPreset;
  onClose: () => void;
}) {
  const [slotWidgets, setSlotWidgets] = useState<(WidgetType | "")[]>(
    Array(preset.slots).fill("")
  );

  const assignedCount = slotWidgets.filter((t) => t !== "").length;

  function handleSlotChange(index: number, value: string) {
    setSlotWidgets((prev) => {
      const next = [...prev];
      next[index] = value as WidgetType | "";
      return next;
    });
  }

  function handleCopyBuilderUrls() {
    const urls = slotWidgets
      .filter((type) => type !== "")
      .map((type) => {
        const w = widgetDefaults.find((d) => d.type === type)!;
        return `${window.location.origin}${w.defaultUrl}`;
      })
      .join("\n");
    copyToClipboard(urls);
    toast.success(`${assignedCount}개 위젯 URL이 복사되었습니다!`);
  }

  // Build slot index mapping from grid
  let slotCounter = 0;
  const gridWithSlots = preset.grid.map((row) =>
    row.map(() => slotCounter++)
  );

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">{preset.name} 레이아웃</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left: Layout visualization */}
          <div className="flex flex-col gap-2">
            {gridWithSlots.map((row, rowIdx) => (
              <div key={rowIdx} className="flex gap-2">
                {row.map((slotIndex) => {
                  const widget = widgetDefaults.find(
                    (w) => w.type === slotWidgets[slotIndex]
                  );
                  return (
                    <div
                      key={slotIndex}
                      className={`flex-1 h-12 rounded-md flex items-center justify-center text-xs font-medium transition-colors ${
                        widget
                          ? "bg-primary/10 text-primary border border-primary/30"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {widget ? widget.name : slotIndex + 1}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Right: Slot selectors */}
          <div className="space-y-3">
            {Array.from({ length: preset.slots }, (_, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm font-medium w-16 shrink-0">
                  슬롯 {i + 1}
                </span>
                <Select
                  value={slotWidgets[i] || "_none"}
                  onValueChange={(v) =>
                    handleSlotChange(i, v === "_none" ? "" : v)
                  }
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="위젯 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="_none" className="text-muted-foreground">
                      선택 안 함
                    </SelectItem>
                    {widgetDefaults.map((w) => (
                      <SelectItem key={w.type} value={w.type}>
                        {w.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>

        {/* Copy URL button */}
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleCopyBuilderUrls}
            disabled={assignedCount === 0}
          >
            <Copy className="w-4 h-4 mr-2" />
            URL 복사 ({assignedCount}개)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TemplatesPage() {
  const [mounted, setMounted] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<LayoutPreset | null>(null);
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-12 pb-8 px-6 text-center">
        <div className="max-w-5xl mx-auto flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
          <ThemeToggle />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">추천 조합</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          테마별로 어울리는 위젯 조합을 모았습니다.
          <br />
          URL을 복사해 노션에 바로 임베드하세요.
        </p>
      </header>

      {/* Layout Presets + Templates */}
      <main className="max-w-5xl mx-auto px-6 pb-20 space-y-10">
        {/* Layout Guide */}
        <section>
          <h2 className="text-xl font-bold mb-1">레이아웃 가이드</h2>
          <p className="text-sm text-muted-foreground mb-4">
            레이아웃을 선택하고, 각 슬롯에 위젯을 배정하세요
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {layoutPresets.map((preset) => (
              <LayoutPresetCard
                key={preset.id}
                preset={preset}
                selected={selectedPreset?.id === preset.id}
                onClick={() =>
                  setSelectedPreset(
                    selectedPreset?.id === preset.id ? null : preset
                  )
                }
              />
            ))}
          </div>
          {selectedPreset && (
            <LayoutBuilder
              key={selectedPreset.id}
              preset={selectedPreset}
              onClose={() => setSelectedPreset(null)}
            />
          )}
        </section>

        {/* Templates */}
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle className="text-xl">{template.title}</CardTitle>
              <CardDescription>{template.desc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Composite layout preview */}
              {mounted && <CompositeLayoutPreview template={template} />}

              {/* Individual widget URL list */}
              <div className="rounded-lg border divide-y">
                {template.widgets.map((widget, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-sm font-medium truncate mr-3">
                      {widget.name}
                    </span>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleCopySingle(widget.url)}
                      >
                        <Copy className="w-3.5 h-3.5 mr-1.5" />
                        URL 복사
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        asChild
                      >
                        <Link href={widget.editorUrl}>
                          <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                          수정
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Copy all URLs button */}
              <div className="flex justify-center">
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => handleCopyAll(template)}
                >
                  <ClipboardList className="w-4 h-4 mr-2" />
                  전체 URL 복사
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
