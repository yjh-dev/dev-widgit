export type SavingsStyle = "bar" | "ring";

export function formatCurrency(amount: number, currency: string): string {
  try {
    const locale =
      currency === "₩" || currency === "원"
        ? "ko-KR"
        : currency === "$"
          ? "en-US"
          : currency === "¥"
            ? "ja-JP"
            : "ko-KR";
    const currencyCode =
      currency === "₩" || currency === "원"
        ? "KRW"
        : currency === "$"
          ? "USD"
          : currency === "¥"
            ? "JPY"
            : currency === "€"
              ? "EUR"
              : undefined;
    if (currencyCode) {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
        maximumFractionDigits: 0,
      }).format(amount);
    }
    return `${new Intl.NumberFormat("ko-KR").format(amount)}${currency}`;
  } catch {
    return `${amount.toLocaleString()}${currency}`;
  }
}

export interface SavingsProgress {
  percentage: number;
  current: number;
  target: number;
}

export function calculateSavingsProgress(
  current: number,
  target: number,
): SavingsProgress {
  if (target <= 0) return { percentage: 0, current: 0, target: 0 };
  const clamped = Math.max(0, Math.min(current, target));
  return {
    percentage: (clamped / target) * 100,
    current: clamped,
    target,
  };
}
