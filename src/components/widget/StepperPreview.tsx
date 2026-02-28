"use client";

import { Check } from "lucide-react";
import type { Step, StepperLayout } from "@/lib/stepper";
import type { FontSizeKey } from "@/lib/common-widget-options";

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-sm",
  xl: "text-base",
};

const DESC_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-[9px]",
  md: "text-[10px]",
  lg: "text-xs",
  xl: "text-sm",
};

const CIRCLE_SIZE_MAP: Record<FontSizeKey, number> = {
  sm: 24,
  md: 28,
  lg: 32,
  xl: 36,
};

interface StepperPreviewProps {
  steps?: Step[];
  currentStep?: number;
  layout?: StepperLayout;
  showDesc?: boolean;
  showNumbers?: boolean;
  color?: string;
  completedColor?: string;
  textColor?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function StepperPreview({
  steps = [],
  currentStep = 1,
  layout = "horizontal",
  showDesc = true,
  showNumbers = true,
  color = "2563EB",
  completedColor = "22C55E",
  textColor = "",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: StepperPreviewProps) {
  const resolvedTextColor = textColor || "333333";
  const labelClass = LABEL_SIZE_MAP[fontSize];
  const descClass = DESC_SIZE_MAP[fontSize];
  const circleSize = CIRCLE_SIZE_MAP[fontSize];
  // currentStep is 0-indexed internally
  const current = Math.max(0, Math.min(currentStep, steps.length));

  if (steps.length === 0) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          backgroundColor: transparentBg ? "transparent" : `#${bg}`,
          borderRadius,
          padding,
        }}
      >
        <p className="text-sm opacity-50" style={{ color: `#${resolvedTextColor}` }}>
          단계를 추가해주세요
        </p>
      </div>
    );
  }

  if (layout === "vertical") {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          backgroundColor: transparentBg ? "transparent" : `#${bg}`,
          borderRadius,
          padding,
        }}
      >
        <div className="flex flex-col">
          {steps.map((step, i) => {
            const isCompleted = i < current;
            const isActive = i === current;
            const isFuture = i > current;
            const stepColor = isCompleted ? completedColor : isActive ? color : "CBD5E1";
            const isLast = i === steps.length - 1;

            return (
              <div key={i} className="flex gap-3">
                {/* Circle + line */}
                <div className="flex flex-col items-center">
                  <div
                    className="rounded-full flex items-center justify-center shrink-0"
                    style={{
                      width: circleSize,
                      height: circleSize,
                      backgroundColor: isFuture ? "transparent" : `#${stepColor}`,
                      border: isFuture ? `2px solid #CBD5E1` : "none",
                    }}
                  >
                    {isCompleted ? (
                      <Check className="text-white" style={{ width: circleSize * 0.5, height: circleSize * 0.5 }} />
                    ) : (
                      showNumbers && (
                        <span
                          className="text-xs font-bold"
                          style={{ color: isFuture ? "#CBD5E1" : "#FFFFFF" }}
                        >
                          {i + 1}
                        </span>
                      )
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className="w-px flex-1 min-h-[24px]"
                      style={{
                        backgroundColor: isCompleted ? `#${completedColor}` : "#CBD5E140",
                      }}
                    />
                  )}
                </div>
                {/* Label + desc */}
                <div className={`pb-4 ${isLast ? "pb-0" : ""}`}>
                  <p
                    className={`${labelClass} font-semibold mt-1`}
                    style={{
                      color: `#${isFuture ? "94A3B8" : resolvedTextColor}`,
                    }}
                  >
                    {step.label}
                  </p>
                  {showDesc && step.desc && (
                    <p
                      className={`${descClass} mt-0.5 opacity-60`}
                      style={{ color: `#${resolvedTextColor}` }}
                    >
                      {step.desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Horizontal layout
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
      }}
    >
      <div className="flex items-start w-full">
        {steps.map((step, i) => {
          const isCompleted = i < current;
          const isActive = i === current;
          const isFuture = i > current;
          const stepColor = isCompleted ? completedColor : isActive ? color : "CBD5E1";
          const isLast = i === steps.length - 1;

          return (
            <div key={i} className="flex-1 flex flex-col items-center relative">
              {/* Connector line */}
              <div className="flex items-center w-full">
                {i > 0 && (
                  <div
                    className="flex-1 h-px"
                    style={{
                      backgroundColor: isCompleted || isActive ? `#${isCompleted ? completedColor : color}40` : "#CBD5E140",
                    }}
                  />
                )}
                {/* Circle */}
                <div
                  className="rounded-full flex items-center justify-center shrink-0"
                  style={{
                    width: circleSize,
                    height: circleSize,
                    backgroundColor: isFuture ? "transparent" : `#${stepColor}`,
                    border: isFuture ? `2px solid #CBD5E1` : "none",
                  }}
                >
                  {isCompleted ? (
                    <Check className="text-white" style={{ width: circleSize * 0.5, height: circleSize * 0.5 }} />
                  ) : (
                    showNumbers && (
                      <span
                        className="text-xs font-bold"
                        style={{ color: isFuture ? "#CBD5E1" : "#FFFFFF" }}
                      >
                        {i + 1}
                      </span>
                    )
                  )}
                </div>
                {!isLast && (
                  <div
                    className="flex-1 h-px"
                    style={{
                      backgroundColor: isCompleted ? `#${completedColor}40` : "#CBD5E140",
                    }}
                  />
                )}
              </div>
              {/* Label + desc */}
              <p
                className={`${labelClass} font-semibold mt-2 text-center`}
                style={{
                  color: `#${isFuture ? "94A3B8" : resolvedTextColor}`,
                }}
              >
                {step.label}
              </p>
              {showDesc && step.desc && (
                <p
                  className={`${descClass} mt-0.5 text-center opacity-60`}
                  style={{ color: `#${resolvedTextColor}` }}
                >
                  {step.desc}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
