"use client";

import { useState, type ReactNode } from "react";
import { Eye, X } from "lucide-react";

interface MobilePreviewFabProps {
  children: ReactNode;
  aspect?: string;
}

export default function MobilePreviewFab({ children, aspect }: MobilePreviewFabProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* FAB button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 md:hidden w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center active:scale-95 transition-transform"
        title="미리보기"
      >
        <Eye className="w-5 h-5" />
      </button>

      {/* Overlay + Bottom sheet */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          {/* Sheet */}
          <div className="absolute bottom-0 inset-x-0 bg-background rounded-t-2xl max-h-[70vh] flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 pb-3">
              <span className="text-sm font-medium">미리보기</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Preview content */}
            <div className="flex-1 overflow-auto px-4 pb-6">
              <div
                className="w-full bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center"
                style={{ aspectRatio: aspect || "4/3" }}
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
