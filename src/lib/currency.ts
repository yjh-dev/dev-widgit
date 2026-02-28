export const CURRENCIES = [
  { code: "USD", name: "미국 달러", symbol: "$" },
  { code: "EUR", name: "유로", symbol: "€" },
  { code: "JPY", name: "일본 엔", symbol: "¥" },
  { code: "CNY", name: "중국 위안", symbol: "¥" },
  { code: "GBP", name: "영국 파운드", symbol: "£" },
  { code: "KRW", name: "한국 원", symbol: "₩" },
];

export function getCurrencySymbol(code: string): string {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? code;
}

export function getCurrencyName(code: string): string {
  return CURRENCIES.find((c) => c.code === code)?.name ?? code;
}

// Free API: https://api.frankfurter.app/latest?from=USD&to=KRW,JPY,EUR
export async function fetchRates(
  base: string,
  targets: string[],
): Promise<Record<string, number>> {
  try {
    const res = await fetch(
      `https://api.frankfurter.app/latest?from=${base}&to=${targets.join(",")}`,
    );
    if (!res.ok) return {};
    const data = await res.json();
    return data.rates || {};
  } catch {
    return {};
  }
}

export function serializeTargets(targets: string[]): string {
  return targets.join("|");
}

export function deserializeTargets(raw: string): string[] {
  if (!raw) return ["KRW", "JPY"];
  return raw.split("|").filter(Boolean);
}
