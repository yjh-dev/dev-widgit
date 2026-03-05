export interface PasswordOptions {
  length: number;
  upper: boolean;
  lower: boolean;
  numbers: boolean;
  symbols: boolean;
}

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export function generatePassword(opts: PasswordOptions): string {
  let chars = "";
  if (opts.upper) chars += UPPER;
  if (opts.lower) chars += LOWER;
  if (opts.numbers) chars += NUMBERS;
  if (opts.symbols) chars += SYMBOLS;
  if (!chars) chars = LOWER + NUMBERS;
  const arr = new Uint32Array(opts.length);
  crypto.getRandomValues(arr);
  return Array.from(arr, (v) => chars[v % chars.length]).join("");
}

export function getStrength(pwd: string): { level: "weak" | "medium" | "strong" | "very-strong"; score: number } {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (pwd.length >= 16) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const level = score >= 6 ? "very-strong" : score >= 4 ? "strong" : score >= 2 ? "medium" : "weak";
  return { level, score: Math.min(score, 7) };
}
