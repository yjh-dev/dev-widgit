"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, ExternalLink, RotateCcw, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ColorPicker from "@/components/ui/color-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ThemeToggle from "@/components/ui/theme-toggle";
import { copyToClipboard } from "@/lib/clipboard";
import { useHomePath } from "@/lib/use-home-path";

type CardType = "quote" | "stats" | "profile" | "announcement";
type Theme = "light" | "dark";
type Trend = "up" | "down" | "none";

const CARD_TYPES: { value: CardType; label: string }[] = [
  { value: "quote", label: "명언 카드" },
  { value: "stats", label: "통계 카드" },
  { value: "profile", label: "프로필 카드" },
  { value: "announcement", label: "공지 카드" },
];

const THEME_OPTIONS: { value: Theme; label: string }[] = [
  { value: "light", label: "라이트" },
  { value: "dark", label: "다크" },
];

const TREND_OPTIONS: { value: Trend; label: string }[] = [
  { value: "none", label: "없음" },
  { value: "up", label: "상승" },
  { value: "down", label: "하락" },
];

const DEFAULT_COLORS: Record<CardType, string> = {
  quote: "6366F1",
  stats: "2563EB",
  profile: "6366F1",
  announcement: "EF4444",
};

interface Preset {
  label: string;
  state: Partial<CardState>;
}

interface CardState {
  type: CardType;
  theme: Theme;
  color: string;
  // quote
  text: string;
  author: string;
  // stats
  statLabel: string;
  statValue: string;
  trend: Trend;
  trendValue: string;
  // profile
  name: string;
  role: string;
  initials: string;
  // announcement
  title: string;
  desc: string;
  badge: string;
}

const INITIAL_STATE: CardState = {
  type: "quote",
  theme: "light",
  color: "6366F1",
  text: "",
  author: "",
  statLabel: "",
  statValue: "",
  trend: "none",
  trendValue: "",
  name: "",
  role: "",
  initials: "",
  title: "",
  desc: "",
  badge: "",
};

const PRESETS: Preset[] = [
  {
    label: "명언 카드",
    state: {
      type: "quote",
      theme: "light",
      color: "6366F1",
      text: "성공은 끊임없는 노력의 결과이다",
      author: "에디슨",
    },
  },
  {
    label: "다크 명언",
    state: {
      type: "quote",
      theme: "dark",
      color: "8B5CF6",
      text: "시작이 반이다",
      author: "아리스토텔레스",
    },
  },
  {
    label: "방문자 통계",
    state: {
      type: "stats",
      theme: "light",
      color: "2563EB",
      statLabel: "방문자",
      statValue: "1,234",
      trend: "up",
      trendValue: "+12%",
    },
  },
  {
    label: "매출 통계",
    state: {
      type: "stats",
      theme: "dark",
      color: "22C55E",
      statLabel: "매출",
      statValue: "\u20A92.5M",
      trend: "up",
      trendValue: "+8%",
    },
  },
  {
    label: "프로필",
    state: {
      type: "profile",
      theme: "light",
      color: "6366F1",
      name: "홍길동",
      role: "프론트엔드 개발자",
      initials: "",
    },
  },
  {
    label: "공지사항",
    state: {
      type: "announcement",
      theme: "light",
      color: "EF4444",
      title: "새 기능 출시",
      desc: "다크 모드가 추가되었습니다",
      badge: "NEW",
    },
  },
];

const CARD_DIMENSIONS: Record<CardType, { w: number; h: number }> = {
  quote: { w: 800, h: 400 },
  stats: { w: 600, h: 300 },
  profile: { w: 600, h: 200 },
  announcement: { w: 800, h: 200 },
};

function CardEditorInner() {
  const homePath = useHomePath();
  const [state, setState] = useState<CardState>(INITIAL_STATE);

  const update = useCallback(
    <K extends keyof CardState>(key: K, value: CardState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleTypeChange = useCallback(
    (t: CardType) => {
      setState((prev) => ({
        ...prev,
        type: t,
        color: DEFAULT_COLORS[t],
      }));
    },
    [],
  );

  const handlePreset = useCallback((preset: Preset) => {
    setState(() => ({ ...INITIAL_STATE, ...preset.state }));
  }, []);

  const handleReset = useCallback(() => {
    setState(INITIAL_STATE);
    toast.success("설정이 초기화되었습니다!");
  }, []);

  const cardUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const base = `${window.location.origin}/api/card`;
    const params = new URLSearchParams();

    params.set("type", state.type);
    if (state.theme !== "light") params.set("theme", state.theme);
    if (state.color !== DEFAULT_COLORS[state.type])
      params.set("color", state.color);

    switch (state.type) {
      case "quote":
        if (state.text) params.set("text", state.text);
        if (state.author) params.set("author", state.author);
        break;
      case "stats":
        if (state.statLabel) params.set("label", state.statLabel);
        if (state.statValue) params.set("value", state.statValue);
        if (state.trend !== "none") params.set("trend", state.trend);
        if (state.trendValue) params.set("trendValue", state.trendValue);
        break;
      case "profile":
        if (state.name) params.set("name", state.name);
        if (state.role) params.set("role", state.role);
        if (state.initials) params.set("initials", state.initials);
        break;
      case "announcement":
        if (state.title) params.set("title", state.title);
        if (state.desc) params.set("desc", state.desc);
        if (state.badge) params.set("badge", state.badge);
        break;
    }

    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }, [state]);

  const handleCopy = useCallback(async () => {
    await copyToClipboard(cardUrl);
    toast.success("카드 이미지 URL이 클립보드에 복사되었습니다!");
  }, [cardUrl]);

  const dim = CARD_DIMENSIONS[state.type];
  const aspectRatio = `${dim.w}/${dim.h}`;

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <Link
            href={homePath}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
          <ThemeToggle />
        </div>
        <h1 className="text-2xl font-bold mb-1">카드 이미지 만들기</h1>
        <p className="text-muted-foreground text-sm mb-8">
          노션 이미지 블록에 URL로 삽입할 수 있는 동적 카드 이미지를 생성합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left: Editor Panel */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              {/* Presets */}
              <div className="space-y-2">
                <Label>프리셋</Label>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((p) => (
                    <Button
                      key={p.label}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handlePreset(p)}
                    >
                      {p.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Card Type */}
              <div className="space-y-2">
                <Label>카드 타입</Label>
                <Select
                  value={state.type}
                  onValueChange={(v) => handleTypeChange(v as CardType)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CARD_TYPES.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Theme */}
              <div className="space-y-2">
                <Label>테마</Label>
                <Select
                  value={state.theme}
                  onValueChange={(v) => update("theme", v as Theme)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {THEME_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dynamic fields based on type */}
              {state.type === "quote" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="text">문구</Label>
                    <textarea
                      id="text"
                      value={state.text}
                      onChange={(e) => update("text", e.target.value)}
                      placeholder="오늘도 화이팅!"
                      rows={3}
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="author">작성자 / 출처</Label>
                    <Input
                      id="author"
                      value={state.author}
                      onChange={(e) => update("author", e.target.value)}
                      placeholder="작자 미상"
                    />
                  </div>
                </>
              )}

              {state.type === "stats" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="statLabel">라벨</Label>
                    <Input
                      id="statLabel"
                      value={state.statLabel}
                      onChange={(e) => update("statLabel", e.target.value)}
                      placeholder="방문자"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="statValue">값</Label>
                    <Input
                      id="statValue"
                      value={state.statValue}
                      onChange={(e) => update("statValue", e.target.value)}
                      placeholder="1,234"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>추세</Label>
                    <Select
                      value={state.trend}
                      onValueChange={(v) => update("trend", v as Trend)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TREND_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {state.trend !== "none" && (
                    <div className="space-y-2">
                      <Label htmlFor="trendValue">추세 값</Label>
                      <Input
                        id="trendValue"
                        value={state.trendValue}
                        onChange={(e) => update("trendValue", e.target.value)}
                        placeholder="+12%"
                      />
                    </div>
                  )}
                </>
              )}

              {state.type === "profile" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      value={state.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="홍길동"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">역할 / 직함</Label>
                    <Input
                      id="role"
                      value={state.role}
                      onChange={(e) => update("role", e.target.value)}
                      placeholder="프론트엔드 개발자"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initials">아바타 이니셜 (1-2자)</Label>
                    <Input
                      id="initials"
                      value={state.initials}
                      onChange={(e) =>
                        update("initials", e.target.value.slice(0, 2))
                      }
                      placeholder="비우면 이름 첫 글자"
                      maxLength={2}
                    />
                  </div>
                </>
              )}

              {state.type === "announcement" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="title">제목</Label>
                    <Input
                      id="title"
                      value={state.title}
                      onChange={(e) => update("title", e.target.value)}
                      placeholder="새 기능 출시"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="desc">설명</Label>
                    <Input
                      id="desc"
                      value={state.desc}
                      onChange={(e) => update("desc", e.target.value)}
                      placeholder="다크 모드가 추가되었습니다"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="badge">배지 텍스트</Label>
                    <Input
                      id="badge"
                      value={state.badge}
                      onChange={(e) => update("badge", e.target.value)}
                      placeholder="NEW"
                    />
                  </div>
                </>
              )}

              {/* Color */}
              <ColorPicker
                id="color"
                label="액센트 색상"
                value={state.color}
                onChange={(v) => update("color", v)}
                placeholder={DEFAULT_COLORS[state.type]}
              />

              {/* URL Display & Actions */}
              <div className="space-y-3 border-t pt-4">
                <Label>카드 이미지 URL</Label>
                <textarea
                  readOnly
                  value={cardUrl}
                  rows={2}
                  className="w-full rounded-md border bg-muted px-3 py-2 text-xs text-muted-foreground break-all resize-none focus:outline-none"
                />
                <div className="flex gap-2">
                  <Button onClick={handleCopy} className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    URL 복사
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(cardUrl, "_blank")}
                    title="새 탭에서 열기"
                    aria-label="새 탭에서 열기"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleReset}
                    title="초기화"
                    aria-label="초기화"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Usage guide */}
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4" />
                  사용 방법
                </p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>위의 URL 복사 버튼을 클릭합니다.</li>
                  <li>
                    노션에서 <code className="px-1 py-0.5 rounded bg-muted border text-xs font-mono">/image</code> 또는{" "}
                    <code className="px-1 py-0.5 rounded bg-muted border text-xs font-mono">/이미지</code>를 입력합니다.
                  </li>
                  <li>
                    &ldquo;링크 삽입&rdquo;을 선택하고 URL을 붙여넣습니다.
                  </li>
                </ol>
                <p className="text-xs mt-2">
                  갤러리 뷰의 커버 이미지나 페이지 내 이미지 블록으로도 활용할 수 있습니다.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Right: Preview */}
          <div className="md:sticky md:top-8">
            <p className="text-xs text-muted-foreground text-center mb-3">
              미리보기 ({dim.w} x {dim.h})
            </p>
            <div
              className="border rounded-lg overflow-hidden bg-muted/30"
              style={{ aspectRatio }}
            >
              {cardUrl && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={cardUrl}
                  src={cardUrl}
                  alt="카드 이미지 미리보기"
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateCardPage() {
  return (
    <Suspense>
      <CardEditorInner />
    </Suspense>
  );
}
