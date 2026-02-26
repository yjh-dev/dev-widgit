export function formatTime(ms: number, showMs: boolean): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  const pad = (n: number) => String(n).padStart(2, "0");

  let result = "";
  if (hours > 0) {
    result = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  } else {
    result = `${pad(minutes)}:${pad(seconds)}`;
  }

  if (showMs) {
    result += `.${pad(milliseconds)}`;
  }

  return result;
}
