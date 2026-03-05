"use client";

import { useEffect, useState, startTransition } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackPwaInstall } from "@/lib/analytics";
import { toast } from "sonner";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session or already installed
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (sessionStorage.getItem("wiget-tree-pwa-dismissed")) {
      startTransition(() => setDismissed(true));
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // DevTools 강제 표시 이벤트 수신
    const forceHandler = () => {
      setForceShow(true);
      setDismissed(false);
    };
    window.addEventListener("devtools:force-pwa-prompt", forceHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("devtools:force-pwa-prompt", forceHandler);
    };
  }, []);

  const showBanner = forceShow || (deferredPrompt && !dismissed);
  if (!showBanner) return null;

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        trackPwaInstall();
        setDeferredPrompt(null);
      }
    } else {
      // 강제 표시 모드 — 실제 설치 불가
      toast.info("개발 환경: 실제 설치는 프로덕션 빌드에서 가능합니다");
      setForceShow(false);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    setForceShow(false);
    sessionStorage.setItem("wiget-tree-pwa-dismissed", "1");
  };

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="flex items-center gap-3 rounded-xl border bg-background/95 backdrop-blur-sm p-3 shadow-lg">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-bold text-sm">
          W
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">Wiget-Tree 앱 설치</p>
          <p className="text-xs text-muted-foreground">
            홈 화면에 추가하여 빠르게 접속하세요
          </p>
        </div>
        <Button size="sm" onClick={handleInstall} className="shrink-0 gap-1">
          <Download className="h-3.5 w-3.5" />
          설치
        </Button>
        <button
          onClick={handleDismiss}
          className="shrink-0 p-1 rounded-md hover:bg-muted"
          aria-label="닫기"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
