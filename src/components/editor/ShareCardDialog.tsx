"use client";

import { useState, useRef, useCallback } from "react";
import { Download, Copy, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
// html-to-image is lazy-loaded on demand
import { trackShareCard } from "@/lib/analytics";

interface ShareCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  widgetUrl: string;
}

export default function ShareCardDialog({
  open,
  onOpenChange,
  widgetUrl,
}: ShareCardDialogProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cardDataUrl, setCardDataUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const generateCard = useCallback(async () => {
    const preview = document.getElementById("widget-preview");
    if (!preview) {
      toast.error("프리뷰를 찾을 수 없습니다.");
      return;
    }

    setGenerating(true);
    try {
      const { toPng } = await import("html-to-image");
      const widgetPng = await toPng(preview, { pixelRatio: 2 });

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = 1200;
      canvas.height = 630;

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, 1200, 630);
      grad.addColorStop(0, "#1E1E2E");
      grad.addColorStop(1, "#2D2B55");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 630);

      // Load widget screenshot
      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = widgetPng;
      });

      // Draw widget screenshot centered with padding
      const maxW = 1000;
      const maxH = 400;
      const scale = Math.min(maxW / img.width, maxH / img.height, 1);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (1200 - w) / 2;
      const y = (630 - h - 60) / 2 + 10;

      // Widget background card
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.beginPath();
      ctx.roundRect(x - 20, y - 20, w + 40, h + 40, 16);
      ctx.fill();

      ctx.drawImage(img, x, y, w, h);

      // Branding bar at bottom
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.font = "bold 24px system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Widgit — 노션 위젯 메이커", 600, 600);

      const dataUrl = canvas.toDataURL("image/png");
      setCardDataUrl(dataUrl);
      trackShareCard(new URL(widgetUrl).pathname.split("/").pop() || "");
    } catch {
      toast.error("카드 이미지 생성에 실패했습니다.");
    } finally {
      setGenerating(false);
    }
  }, []);

  const handleOpen = useCallback(
    (isOpen: boolean) => {
      onOpenChange(isOpen);
      if (isOpen) {
        setCardDataUrl(null);
        // Delay to ensure dialog is mounted
        setTimeout(generateCard, 100);
      }
    },
    [onOpenChange, generateCard]
  );

  const handleDownload = () => {
    if (!cardDataUrl) return;
    const a = document.createElement("a");
    a.download = "widgit-share.png";
    a.href = cardDataUrl;
    a.click();
    toast.success("이미지가 다운로드되었습니다!");
  };

  const handleCopyImage = async () => {
    if (!cardDataUrl) return;
    try {
      const res = await fetch(cardDataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      toast.success("이미지가 클립보드에 복사되었습니다!");
    } catch {
      toast.error("이미지 복사에 실패했습니다. 다운로드를 이용하세요.");
    }
  };

  const handleShareX = () => {
    const editorUrl = widgetUrl.replace("/widget/", "/create/");
    const text = encodeURIComponent(
      "Widgit으로 나만의 노션 위젯을 만들었어요!"
    );
    const url = encodeURIComponent(editorUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank"
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>SNS 공유 카드</DialogTitle>
        </DialogHeader>

        {/* Hidden canvas for generation */}
        <canvas ref={canvasRef} className="hidden" />

        <div className="space-y-4">
          {generating && (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              카드 이미지 생성 중...
            </div>
          )}

          {cardDataUrl && !generating && (
            <div className="rounded-lg overflow-hidden border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cardDataUrl}
                alt="공유 카드 미리보기"
                className="w-full"
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleDownload}
              disabled={!cardDataUrl || generating}
              className="flex-1"
              size="sm"
            >
              <Download className="w-4 h-4 mr-1.5" />
              이미지 저장
            </Button>
            <Button
              onClick={handleCopyImage}
              disabled={!cardDataUrl || generating}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <Copy className="w-4 h-4 mr-1.5" />
              이미지 복사
            </Button>
            <Button
              onClick={handleShareX}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-1.5" />
              X에 공유
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
