"use client";

import { useEffect, useState, startTransition } from "react";
import { Wrench, Trash2, X, RefreshCw, Cookie, Database, HardDrive, Download } from "lucide-react";
import { toast } from "sonner";

/** localStorage에서 wiget-tree 관련 키만 추출 */
function getWigetTreeKeys(): string[] {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) keys.push(key);
  }
  return keys;
}

export default function DevTools() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [lsCount, setLsCount] = useState(0);

  useEffect(() => {
    const isDev =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "0.0.0.0";
    startTransition(() => {
      setVisible(isDev);
      if (isDev) setLsCount(getWigetTreeKeys().length);
    });
  }, []);

  if (!visible) return null;

  const refreshCount = () => setLsCount(getWigetTreeKeys().length);

  const clearLocalStorage = () => {
    const count = localStorage.length;
    localStorage.clear();
    refreshCount();
    toast.success(`localStorage 삭제 완료 (${count}개 항목)`);
  };

  const clearSessionStorage = () => {
    const count = sessionStorage.length;
    sessionStorage.clear();
    toast.success(`sessionStorage 삭제 완료 (${count}개 항목)`);
  };

  const clearCookies = () => {
    const cookies = document.cookie.split(";");
    let count = 0;
    for (const cookie of cookies) {
      const name = cookie.split("=")[0].trim();
      if (name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        count++;
      }
    }
    toast.success(`쿠키 삭제 완료 (${count}개)`);
  };

  const clearServiceWorkerCache = async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    toast.success(`SW 캐시 삭제 완료 (${keys.length}개)`);
  };

  const clearAll = async () => {
    clearLocalStorage();
    clearSessionStorage();
    clearCookies();
    await clearServiceWorkerCache();
    toast.success("전체 데이터 삭제 완료 — 새로고침합니다", { duration: 1500 });
    setTimeout(() => window.location.reload(), 1500);
  };

  const actions = [
    {
      label: "localStorage",
      desc: `${lsCount}개 항목`,
      icon: Database,
      action: () => { clearLocalStorage(); refreshCount(); },
      color: "text-blue-400",
    },
    {
      label: "sessionStorage",
      desc: "세션 데이터",
      icon: HardDrive,
      action: clearSessionStorage,
      color: "text-green-400",
    },
    {
      label: "쿠키",
      desc: "브라우저 쿠키",
      icon: Cookie,
      action: clearCookies,
      color: "text-amber-400",
    },
    {
      label: "SW 캐시",
      desc: "서비스 워커 캐시",
      icon: RefreshCw,
      action: clearServiceWorkerCache,
      color: "text-purple-400",
    },
  ];

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => { setOpen(!open); refreshCount(); }}
        className="fixed bottom-4 right-4 z-[9999] flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 shadow-lg ring-1 ring-zinc-700 hover:bg-zinc-700 hover:text-white transition-colors"
        aria-label="개발자 도구"
      >
        <Wrench className="h-4.5 w-4.5" />
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-16 right-4 z-[9999] w-72 rounded-xl border border-zinc-700 bg-zinc-900 text-zinc-100 shadow-2xl animate-in slide-in-from-bottom-2 fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-semibold">Dev Tools</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-400">
                LOCAL
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded hover:bg-zinc-700"
              aria-label="닫기"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Actions */}
          <div className="p-2 space-y-1">
            {actions.map((a) => (
              <button
                key={a.label}
                onClick={a.action}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-zinc-800 transition-colors group"
              >
                <a.icon className={`h-4 w-4 shrink-0 ${a.color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{a.label}</p>
                  <p className="text-xs text-zinc-500">{a.desc}</p>
                </div>
                <Trash2 className="h-3.5 w-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          {/* Simulate */}
          <div className="border-t border-zinc-700 p-2">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent("devtools:force-pwa-prompt"));
                setOpen(false);
                toast.success("PWA 설치 프롬프트 표시됨");
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-zinc-800 transition-colors group"
            >
              <Download className="h-4 w-4 shrink-0 text-cyan-400" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">PWA 설치 프롬프트</p>
                <p className="text-xs text-zinc-500">강제로 배너 표시</p>
              </div>
            </button>
          </div>

          {/* Clear all */}
          <div className="border-t border-zinc-700 p-2">
            <button
              onClick={clearAll}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600/20 px-3 py-2.5 text-sm font-medium text-red-400 hover:bg-red-600/30 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              전체 삭제 + 새로고침
            </button>
          </div>
        </div>
      )}
    </>
  );
}
