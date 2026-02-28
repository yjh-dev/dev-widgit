export function formatCountdown(totalSeconds: number, showMs: boolean): string {
  if (totalSeconds <= 0) return showMs ? "00:00.0" : "00:00";
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  const ms = Math.floor((totalSeconds % 1) * 10);
  const base = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return showMs ? `${base}.${ms}` : base;
}
