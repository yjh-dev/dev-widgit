export interface MusicData {
  title: string;
  artist: string;
  progress: number;
  artColor: string;
  showProgress: boolean;
}

export function clampProgress(value: number): number {
  return Math.max(0, Math.min(100, value));
}
