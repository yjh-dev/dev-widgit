export type DiceMode = "dice" | "coin" | "picker";
export type DiceSides = 4 | 6 | 8 | 10 | 12 | 20;

export const DICE_SIDES_OPTIONS: { value: DiceSides; label: string }[] = [
  { value: 4, label: "D4" },
  { value: 6, label: "D6" },
  { value: 8, label: "D8" },
  { value: 10, label: "D10" },
  { value: 12, label: "D12" },
  { value: 20, label: "D20" },
];

// D6 dot positions for each face value
export const D6_DOTS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[25, 25], [75, 75]],
  3: [[25, 25], [50, 50], [75, 75]],
  4: [[25, 25], [75, 25], [25, 75], [75, 75]],
  5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
  6: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]],
};

export function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function flipCoin(): "앞" | "뒤" {
  return Math.random() < 0.5 ? "앞" : "뒤";
}

export function pickRandom(items: string[]): string {
  if (items.length === 0) return "";
  return items[Math.floor(Math.random() * items.length)];
}
