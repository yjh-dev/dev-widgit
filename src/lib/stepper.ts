export interface Step {
  label: string;
  desc?: string;
}

export type StepperLayout = "horizontal" | "vertical";

export function serializeSteps(steps: Step[]): string {
  return steps
    .map(
      (s) =>
        `${encodeURIComponent(s.label)}~${encodeURIComponent(s.desc || "")}`,
    )
    .join("|");
}

export function deserializeSteps(raw: string): Step[] {
  if (!raw) return [];
  try {
    return raw
      .split("|")
      .map((item) => {
        const [label, desc] = item.split("~");
        return {
          label: decodeURIComponent(label || ""),
          desc: decodeURIComponent(desc || "") || undefined,
        };
      })
      .filter((s) => s.label);
  } catch {
    return [];
  }
}
