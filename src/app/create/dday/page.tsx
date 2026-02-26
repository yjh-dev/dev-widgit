"use client";

import { toast } from "sonner";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ColorPicker from "@/components/ui/color-picker";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import DdayWidgetPreview from "@/components/widget/DdayWidgetPreview";
import EditorLayout from "@/components/editor/EditorLayout";
import EditorActions from "@/components/editor/EditorActions";
import EditorSection from "@/components/editor/EditorSection";
import CommonStyleOptions from "@/components/editor/CommonStyleOptions";
import { useDdayWidgetStore } from "@/store/useWidgetStore";
import { useWidgetUrl } from "@/lib/use-widget-url";
import { copyToClipboard } from "@/lib/clipboard";
import { FONT_OPTIONS, type FontKey } from "@/lib/fonts";

type DdayDateFormat = "full" | "short" | "dot" | "none";

export default function CreateDdayPage() {
  const {
    title, targetDate, bgColor, textColor, isDarkMode, calcType, isAnnual,
    layout, startDate, isTransparent, font, borderRadius, padding, fontSize,
    showTime, blink, doneMsg, barColor, dateFmt,
    setTitle, setTargetDate, setBgColor, setTextColor, setIsDarkMode, setCalcType, setIsAnnual,
    setLayout, setStartDate, setIsTransparent, setFont, setBorderRadius, setPadding, setFontSize,
    setShowTime, setBlink, setDoneMsg, setBarColor, setDateFmt,
    reset,
  } = useDdayWidgetStore();

  const { buildWidgetUrl, widgetUrl } = useWidgetUrl(() => {
    const base = `${window.location.origin}/widget/dday`;
    const params = new URLSearchParams();
    params.set("title", title);
    params.set("date", targetDate);
    params.set("bg", bgColor);
    params.set("text", textColor);
    if (calcType !== "down") params.set("calcType", calcType);
    if (isAnnual) params.set("annual", "true");
    if (layout !== "default") params.set("layout", layout);
    if (startDate) params.set("start", startDate);
    if (isTransparent) params.set("transparent", "true");
    if (font !== "noto-sans-kr") params.set("font", font);
    if (borderRadius !== 16) params.set("radius", String(borderRadius));
    if (padding !== 24) params.set("pad", String(padding));
    if (fontSize !== "md") params.set("fsize", fontSize);
    if (showTime) params.set("showTime", "true");
    if (!blink) params.set("blink", "false");
    if (doneMsg) params.set("doneMsg", doneMsg);
    if (barColor) params.set("barColor", barColor);
    if (dateFmt !== "full") params.set("dateFmt", dateFmt);
    return `${base}?${params.toString()}`;
  }, [title, targetDate, bgColor, textColor, calcType, isAnnual, layout, startDate, isTransparent, font, borderRadius, padding, fontSize, showTime, blink, doneMsg, barColor, dateFmt]);

  const handleCopy = async () => {
    await copyToClipboard(buildWidgetUrl());
    toast.success("위젯 URL이 클립보드에 복사되었습니다!");
  };

  return (
    <EditorLayout title="D-Day 위젯 만들기">
      <Card>
        <CardContent className="pt-6">
          <EditorSection
            defaultOpen={["basic"]}
            sections={[
              {
                id: "basic",
                title: "기본 설정",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title">타이틀</Label>
                      <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: 수능, 생일, 여행" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetDate">목표 날짜</Label>
                      <Input id="targetDate" type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
                    </div>
                  </>
                ),
              },
              {
                id: "calc",
                title: "계산 방식",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>카운트 방식</Label>
                      <Select value={calcType} onValueChange={(v) => setCalcType(v as "down" | "up")}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="down">카운트다운 (D-N)</SelectItem>
                          <SelectItem value="up">카운트업 (N일째)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="annual">매년 반복</Label>
                      <Switch id="annual" checked={isAnnual} onCheckedChange={setIsAnnual} />
                    </div>
                  </>
                ),
              },
              {
                id: "display",
                title: "표시 옵션",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>날짜 표시 형식</Label>
                      <Select value={dateFmt} onValueChange={(v) => setDateFmt(v as DdayDateFormat)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">전체 (2026.11.19 (목))</SelectItem>
                          <SelectItem value="short">짧게 (11.19 (목))</SelectItem>
                          <SelectItem value="dot">날짜만 (2026.11.19)</SelectItem>
                          <SelectItem value="none">숨김</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="showTime">시간 카운트다운</Label>
                      <Switch id="showTime" checked={showTime} onCheckedChange={setShowTime} />
                    </div>
                    {showTime && (
                      <div className="flex items-center justify-between">
                        <Label htmlFor="blink">구분자 깜빡임</Label>
                        <Switch id="blink" checked={blink} onCheckedChange={setBlink} />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="doneMsg">완료 메시지</Label>
                      <Input id="doneMsg" value={doneMsg} onChange={(e) => setDoneMsg(e.target.value)} placeholder="비우면 D+N 표시" />
                    </div>
                  </>
                ),
              },
              {
                id: "layout",
                title: "레이아웃",
                children: (
                  <>
                    <div className="space-y-2">
                      <Label>레이아웃</Label>
                      <Select value={layout} onValueChange={(v) => setLayout(v as "default" | "progress")}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">기본</SelectItem>
                          <SelectItem value="progress">프로그레스 바</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {layout === "progress" && (
                      <div className="space-y-2">
                        <Label htmlFor="startDate">시작 날짜</Label>
                        <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label>폰트</Label>
                      <Select value={font} onValueChange={(v) => setFont(v as FontKey)}>
                        <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {FONT_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="transparent">투명 배경</Label>
                      <Switch id="transparent" checked={isTransparent} onCheckedChange={setIsTransparent} />
                    </div>
                  </>
                ),
              },
              {
                id: "color",
                title: "색상",
                children: (
                  <>
                    <ColorPicker id="bgColor" label="배경색" value={bgColor} onChange={setBgColor} placeholder="1E1E1E" disabled={isTransparent} />
                    <ColorPicker id="textColor" label="글자색" value={textColor} onChange={setTextColor} placeholder="FFFFFF" />
                    {layout === "progress" && (
                      <ColorPicker id="barColor" label="바 색상 (비우면 글자색)" value={barColor} onChange={setBarColor} placeholder="비우면 글자색" />
                    )}
                    <div className="flex items-center gap-3">
                      <Label>테마</Label>
                      <Button variant="outline" size="sm" onClick={() => setIsDarkMode(!isDarkMode)}>
                        {isDarkMode ? (<><Moon className="w-4 h-4 mr-1" /> 다크</>) : (<><Sun className="w-4 h-4 mr-1" /> 라이트</>)}
                      </Button>
                    </div>
                  </>
                ),
              },
              {
                id: "style",
                title: "스타일",
                children: (
                  <CommonStyleOptions
                    borderRadius={borderRadius} padding={padding} fontSize={fontSize}
                    onBorderRadiusChange={setBorderRadius} onPaddingChange={setPadding} onFontSizeChange={setFontSize}
                  />
                ),
              },
            ]}
          />
          <div className="mt-6">
            <EditorActions widgetUrl={widgetUrl} onCopy={handleCopy} onReset={reset} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center order-first md:order-last md:sticky md:top-8">
        <div className="space-y-3 w-full max-w-[400px]">
          <p className="text-xs text-muted-foreground text-center">미리보기</p>
          <div className="border rounded-lg overflow-hidden aspect-[4/3] flex items-center justify-center">
            <DdayWidgetPreview
            title={title} targetDate={targetDate} bgColor={bgColor} textColor={textColor}
            calcType={calcType} isAnnual={isAnnual} layout={layout} startDate={startDate}
            isTransparent={isTransparent} font={font} borderRadius={borderRadius} padding={padding}
            fontSize={fontSize} showTime={showTime} blink={blink} doneMsg={doneMsg}
            barColor={barColor} dateFmt={dateFmt}
          />
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
