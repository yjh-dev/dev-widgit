import { describe, it, expect } from "vitest";
import { categories, allWidgets } from "@/lib/widget-categories";

describe("widget-categories", () => {
  it("has all categories", () => {
    expect(categories.length).toBeGreaterThanOrEqual(5);
    const titles = categories.map((c) => c.title);
    expect(titles).toContain("시간 & 날짜");
    expect(titles).toContain("진행률 & 목표");
    expect(titles).toContain("생산성 & 도구");
    expect(titles).toContain("콘텐츠 & 장식");
  });

  it("allWidgets flattens all categories", () => {
    const totalFromCategories = categories.reduce((sum, c) => sum + c.widgets.length, 0);
    expect(allWidgets.length).toBe(totalFromCategories);
  });

  it("each widget has required fields", () => {
    for (const w of allWidgets) {
      expect(w.href).toMatch(/^\/create\//);
      expect(w.type).toBeTruthy();
      expect(w.name).toBeTruthy();
      expect(w.desc).toBeTruthy();
      expect(w.icon).toBeTruthy();
      expect(w.tags.length).toBeGreaterThan(0);
      expect(w.category).toBeTruthy();
    }
  });

  it("no duplicate widget types", () => {
    const types = allWidgets.map((w) => w.type);
    const unique = new Set(types);
    expect(unique.size).toBe(types.length);
  });
});
