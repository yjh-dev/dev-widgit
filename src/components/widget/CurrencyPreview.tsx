"use client";

import { useEffect, useState } from "react";
import {
  fetchRates,
  getCurrencySymbol,
  getCurrencyName,
  CURRENCIES,
} from "@/lib/currency";
import type { FontSizeKey } from "@/lib/common-widget-options";

const HEADER_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

const RATE_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
  xl: "text-2xl",
};

const LABEL_SIZE_MAP: Record<FontSizeKey, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

// Sample rates for when API fails
const SAMPLE_RATES: Record<string, number> = {
  KRW: 1380.5,
  JPY: 154.32,
  EUR: 0.92,
  GBP: 0.79,
  CNY: 7.24,
  USD: 1,
};

interface CurrencyPreviewProps {
  base?: string;
  targets?: string[];
  showFlag?: boolean;
  refreshMin?: number;
  accentColor?: string;
  color?: string;
  bg?: string;
  transparentBg?: boolean;
  borderRadius?: number;
  padding?: number;
  fontSize?: FontSizeKey;
}

export default function CurrencyPreview({
  base = "USD",
  targets = ["KRW", "JPY"],
  showFlag = true,
  refreshMin = 60,
  accentColor = "2563EB",
  color = "1E1E1E",
  bg = "FFFFFF",
  transparentBg = false,
  borderRadius = 16,
  padding = 24,
  fontSize = "md",
}: CurrencyPreviewProps) {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setFailed(false);
      const filteredTargets = targets.filter((t) => t !== base);
      if (filteredTargets.length === 0) {
        setRates({});
        setLoading(false);
        return;
      }
      const result = await fetchRates(base, filteredTargets);
      if (cancelled) return;
      if (Object.keys(result).length === 0) {
        // API failed — use sample data
        const sample: Record<string, number> = {};
        for (const t of filteredTargets) {
          const baseRate = SAMPLE_RATES[base] ?? 1;
          const targetRate = SAMPLE_RATES[t] ?? 1;
          sample[t] = parseFloat((targetRate / baseRate).toFixed(4));
        }
        setRates(sample);
        setFailed(true);
      } else {
        setRates(result);
        setFailed(false);
      }
      setLoading(false);
    };

    load();
    const interval = setInterval(load, refreshMin * 60 * 1000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [base, targets, refreshMin]);

  const formatRate = (rate: number): string => {
    if (rate >= 100) return rate.toLocaleString("ko-KR", { maximumFractionDigits: 2 });
    if (rate >= 1) return rate.toFixed(4);
    return rate.toFixed(6);
  };

  const filteredTargets = targets.filter((t) => t !== base);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{
        backgroundColor: transparentBg ? "transparent" : `#${bg}`,
        borderRadius,
        padding,
        color: `#${color}`,
      }}
    >
      {loading ? (
        <p className={`${LABEL_SIZE_MAP[fontSize]} opacity-50`}>로딩 중...</p>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center gap-1.5">
            {showFlag && (
              <span className={HEADER_SIZE_MAP[fontSize]}>
                {getCurrencySymbol(base)}
              </span>
            )}
            <p className={`${HEADER_SIZE_MAP[fontSize]} font-semibold`}>
              1 {base} =
            </p>
          </div>

          {/* Rate list */}
          <div className="w-full space-y-2">
            {filteredTargets.map((code) => {
              const rate = rates[code];
              const isKnown = CURRENCIES.some((c) => c.code === code);
              return (
                <div
                  key={code}
                  className="flex items-center justify-between w-full px-2 py-1.5 rounded-md"
                  style={{ backgroundColor: `#${accentColor}10` }}
                >
                  <div className="flex items-center gap-1.5">
                    {showFlag && (
                      <span className={`${LABEL_SIZE_MAP[fontSize]} font-medium`} style={{ color: `#${accentColor}` }}>
                        {getCurrencySymbol(code)}
                      </span>
                    )}
                    <span className={`${LABEL_SIZE_MAP[fontSize]} opacity-70`}>
                      {isKnown ? getCurrencyName(code) : code}
                    </span>
                  </div>
                  <span className={`${RATE_SIZE_MAP[fontSize]} font-bold`}>
                    {rate !== undefined ? formatRate(rate) : "—"}
                  </span>
                </div>
              );
            })}
          </div>

          {/* API failure note */}
          {failed && (
            <p className="text-[10px] opacity-30 mt-1">* 샘플 데이터 (API 연결 실패)</p>
          )}
        </>
      )}
    </div>
  );
}
