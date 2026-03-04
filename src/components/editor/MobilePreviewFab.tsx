"use client";

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { Eye, X } from "lucide-react";

interface MobilePreviewFabProps {
  children: ReactNode;
  aspect?: string;
}

export default function MobilePreviewFab({ children, aspect }: MobilePreviewFabProps) {
  const [open, setOpen] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  // Focus trap: trap Tab inside sheet, Escape to close, restore focus on close
  useEffect(() => {
    if (!open) return;

    // Save previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    // Focus close button on open
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }

      if (e.key === "Tab") {
        const sheet = sheetRef.current;
        if (!sheet) return;

        const focusable = sheet.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restore focus on close
      previousFocusRef.current?.focus();
    };
  }, [open, close]);

  return (
    <>
      {/* FAB button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 md:hidden w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        title="미리보기"
        aria-label="미리보기 열기"
      >
        <Eye className="w-5 h-5" />
      </button>

      {/* Overlay + Bottom sheet */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={close}
            aria-hidden="true"
          />

          {/* Sheet */}
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="미리보기"
            className="absolute bottom-0 inset-x-0 bg-background rounded-t-2xl max-h-[70vh] flex flex-col animate-in slide-in-from-bottom duration-300"
          >
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-3">
              <span className="text-sm font-medium">미리보기</span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                aria-label="미리보기 닫기"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview content */}
            <div className="flex-1 overflow-auto px-4 pb-6">
              <div
                className="w-full bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center"
                style={{ aspectRatio: aspect || undefined, minHeight: aspect ? undefined : 280 }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
