"use client";

import { useState, useEffect, startTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Trash2, ExternalLink, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  useEffect(() => {
    startTransition(() => {
      setLicenseInfo(getLicenseInfo());
      setRemoved(isWatermarkRemoved());
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
