"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

const LS_KEY = "widgit-onboarding-done";

interface TourStep {
  selector: string;
  title: string;
  description: string;
}

const steps: TourStep[] = [
  {
    selector: "#editor-grid > :first-child",
    title: "설정 변경",
    description: "왼쪽 패널에서 위젯 옵션을 자유롭게 변경하세요.",
  },
  {
    selector: "#editor-grid > :nth-child(2)",
    title: "실시간 프리뷰",
    description: "설정을 변경하면 오른쪽 프리뷰에 즉시 반영됩니다.",
  },
  {
    selector: "[data-tour-step='copy-url']",
    title: "URL 복사",
    description: "모든 설정이 URL에 담깁니다. 복사해서 노션에 붙여넣으세요.",
  },
  {
    selector: "[data-tour-step='embed-guide']",
    title: "노션에 임베드",
    description: "노션에서 /embed 입력 → URL 붙여넣기로 위젯을 추가할 수 있습니다.",
  },
];

export default function OnboardingTour() {
  const [active, setActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    // 데스크톱만 (md+ = 768px)
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    try {
      if (localStorage.getItem(LS_KEY) === "true") return;
    } catch {
      return;
    }
    // 약간의 딜레이 후 시작 (렌더 완료 대기)
    const timer = setTimeout(() => setActive(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const positionTooltip = useCallback(() => {
    if (!active) return;
    const step = steps[currentStep];
    const el = document.querySelector(step.selector);
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const padding = 8;

    // Spotlight: element 위치
    setSpotlightStyle({
      position: "fixed",
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
      borderRadius: 12,
    });

    // Tooltip position: 요소 아래 또는 위
    const tooltipWidth = 280;
    let top = rect.bottom + padding + 8;
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;

    // 화면 아래 넘어가면 위에 표시
    if (top + 120 > window.innerHeight) {
      top = rect.top - padding - 8 - 120;
    }
    // 좌우 경계 보정
    left = Math.max(16, Math.min(left, window.innerWidth - tooltipWidth - 16));

    setTooltipStyle({
      position: "fixed",
      top,
      left,
      width: tooltipWidth,
      zIndex: 10002,
    });
  }, [active, currentStep]);

  useEffect(() => {
    requestAnimationFrame(positionTooltip);
    window.addEventListener("resize", positionTooltip);
    window.addEventListener("scroll", positionTooltip, true);
    return () => {
      window.removeEventListener("resize", positionTooltip);
      window.removeEventListener("scroll", positionTooltip, true);
    };
  }, [positionTooltip]);

  const finish = useCallback(() => {
    setActive(false);
    try {
      localStorage.setItem(LS_KEY, "true");
    } catch { /* 무시 */ }
  }, []);

  const next = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      finish();
    }
  }, [currentStep, finish]);

  if (!active) return null;

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  return (
    <>
      {/* Backdrop with spotlight cutout */}
      <div
        className="fixed inset-0"
        style={{
          zIndex: 10000,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          pointerEvents: "auto",
        }}
        onClick={finish}
      />

      {/* Spotlight ring */}
      <div
        style={{
          ...spotlightStyle,
          zIndex: 10001,
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
          pointerEvents: "none",
        }}
      />

      {/* Tooltip */}
      <div
        style={tooltipStyle}
        className="bg-popover border rounded-xl shadow-lg p-4"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground font-medium">
            {currentStep + 1} / {steps.length}
          </span>
        </div>
        <h3 className="font-semibold text-sm mb-1">{step.title}</h3>
        <p className="text-xs text-muted-foreground mb-3">
          {step.description}
        </p>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={finish}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            건너뛰기
          </button>
          <Button size="sm" className="h-7 text-xs" onClick={next}>
            {isLast ? "완료" : "다음"}
          </Button>
        </div>
      </div>
    </>
  );
}
