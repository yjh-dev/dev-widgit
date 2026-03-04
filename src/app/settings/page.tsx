"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Trash2, ExternalLink, EyeOff, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import ThemeToggle from "@/components/ui/theme-toggle";
import {
  getLicenseInfo,
  activateLicense,
  deactivateLicense,
  isWatermarkRemoved,
  type LicenseInfo,
} from "@/lib/license";


const PURCHASE_URL = "https://widgit.lemonsqueezy.com";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo | null>(null);
  const [removed, setRemoved] = useState(false);
  const [defaultPreviewSize, setDefaultPreviewSize] = useState("free");
  const [defaultShortUrl, setDefaultShortUrl] = useState(false);
  const [skipSplash, setSkipSplash] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setLicenseInfo(getLicenseInfo());
      setRemoved(isWatermarkRemoved());
      try {
        const savedSize = localStorage.getItem("widgit-preview-size");
        if (savedSize) setDefaultPreviewSize(savedSize);
        const savedShort = localStorage.getItem("widgit-short-url");
        if (savedShort === "true") setDefaultShortUrl(true);
        const savedSkip = localStorage.getItem("widgit-visited");
        if (savedSkip === "true") setSkipSplash(true);
      } catch { /* 무시 */ }
      setMounted(true);
    });
  }, []);

  const handleActivate = () => {
    const key = licenseKey.trim();
    if (!key) {
      toast.error("라이선스 키를 입력하세요.");
      return;
    }
    const success = activateLicense(key);
    if (success) {
      setLicenseInfo(getLicenseInfo());
      setRemoved(true);
      setLicenseKey("");
      toast.success("워터마크가 제거되었습니다!");
    } else {
      toast.error("올바르지 않은 키 형식입니다. XXXXX-XXXXX-XXXXX 형식으로 입력하세요.");
    }
  };

  const handleDeactivate = () => {
    deactivateLicense();
    setLicenseInfo(null);
    setRemoved(false);
    toast.success("라이선스가 해제되었습니다.");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="max-w-2xl mx-auto px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Link>
          <ThemeToggle />
        </div>
        <h1 className="text-2xl font-bold">설정</h1>
      </header>

      <main className="max-w-2xl mx-auto px-6 pb-20 space-y-8">
        {/* Watermark removal */}
        <section className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-primary" />
            워터마크 제거
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            위젯에 표시되는 &quot;Widgit&quot; 브랜딩을 제거합니다. 일회성 구매로 영구 적용됩니다.
          </p>

          {!mounted ? (
            <div className="h-20" />
          ) : removed ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400">
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">워터마크 제거됨</span>
              </div>
              {licenseInfo && (
                <p className="text-xs text-muted-foreground">
                  키: {licenseInfo.key.slice(0, 5)}...{licenseInfo.key.slice(-5)}
                  {" · "}
                  등록: {new Date(licenseInfo.activatedAt).toLocaleDateString("ko-KR")}
                </p>
              )}
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={handleDeactivate}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                라이선스 해제
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg border-2 border-dashed p-4 text-center">
                <p className="text-2xl font-bold">₩990</p>
                <p className="text-xs text-muted-foreground mt-1">일회성 · 영구 적용</p>
                <a
                  href={PURCHASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  구매하기
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="space-y-2">
                <Label htmlFor="license-key">라이선스 키 입력</Label>
                <div className="flex gap-2">
                  <Input
                    id="license-key"
                    type="text"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleActivate()}
                    placeholder="구매 후 받은 키를 입력하세요"
                    className="font-mono"
                  />
                  <Button onClick={handleActivate}>
                    <Check className="w-4 h-4 mr-1.5" />
                    활성화
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Preferences */}
        <section className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-primary" />
            환경 설정
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            에디터의 기본 설정을 관리합니다.
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>기본 프리뷰 크기</Label>
              <Select
                value={defaultPreviewSize}
                onValueChange={(v) => {
                  setDefaultPreviewSize(v);
                  try { localStorage.setItem("widgit-preview-size", v); } catch { /* 무시 */ }
                  toast.success("기본 프리뷰 크기가 변경되었습니다.");
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">자유</SelectItem>
                  <SelectItem value="square">1:1 정사각형</SelectItem>
                  <SelectItem value="wide">2:1 와이드</SelectItem>
                  <SelectItem value="tall">1:2 세로</SelectItem>
                  <SelectItem value="mobile">9:16 모바일</SelectItem>
                  <SelectItem value="notion-full">노션 전체폭</SelectItem>
                  <SelectItem value="notion-half">노션 반폭</SelectItem>
                  <SelectItem value="notion">노션 목업</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>짧은 URL 기본값</Label>
                <p className="text-xs text-muted-foreground">에디터에서 LZ 압축 URL을 기본으로 사용합니다</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={defaultShortUrl}
                onClick={() => {
                  const next = !defaultShortUrl;
                  setDefaultShortUrl(next);
                  try { localStorage.setItem("widgit-short-url", String(next)); } catch { /* 무시 */ }
                  toast.success(next ? "짧은 URL이 기본으로 설정되었습니다." : "기본 URL이 기본으로 설정되었습니다.");
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  defaultShortUrl ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-background transition-transform ${
                    defaultShortUrl ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>스플래시 건너뛰기</Label>
                <p className="text-xs text-muted-foreground">홈 접속 시 바로 위젯 목록으로 이동합니다</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={skipSplash}
                onClick={() => {
                  const next = !skipSplash;
                  setSkipSplash(next);
                  try {
                    if (next) localStorage.setItem("widgit-visited", "true");
                    else localStorage.removeItem("widgit-visited");
                  } catch { /* 무시 */ }
                  toast.success(next ? "다음부터 위젯 목록으로 바로 이동합니다." : "다음 홈 접속 시 서비스 소개가 표시됩니다.");
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  skipSplash ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-background transition-transform ${
                    skipSplash ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => {
                  try {
                    localStorage.removeItem("widgit-preview-size");
                    localStorage.removeItem("widgit-short-url");
                    localStorage.removeItem("widgit-visited");
                    setDefaultPreviewSize("free");
                    setDefaultShortUrl(false);
                    setSkipSplash(false);
                    toast.success("환경 설정이 초기화되었습니다.");
                  } catch { /* 무시 */ }
                }}
              >
                설정 초기화
              </Button>
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="rounded-xl border bg-card p-6 space-y-3">
          <h2 className="text-lg font-semibold">Widgit은 무료입니다</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span>모든 위젯 — 무제한 무료</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span>전체 커스터마이징 옵션 — 제한 없음</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span>위젯 저장·프리셋·테마 — 전부 무료</span>
            </li>
            <li className="flex items-start gap-2">
              <EyeOff className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>워터마크 제거만 유료 (₩990 일회성)</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
