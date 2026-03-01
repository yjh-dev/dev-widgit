import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });

import {
  getSavedWidgets,
  saveWidget,
  deleteWidget,
  duplicateWidget,
  importWidgets,
} from "@/lib/saved-widgets";

describe("saved-widgets", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("returns empty array when no saved widgets", () => {
    expect(getSavedWidgets()).toEqual([]);
  });

  it("saves and retrieves a widget", () => {
    const widget = saveWidget("Test", "dday" as never, "/widget/dday?title=test");
    expect(widget.name).toBe("Test");
    expect(widget.type).toBe("dday");
    const all = getSavedWidgets();
    expect(all).toHaveLength(1);
    expect(all[0].id).toBe(widget.id);
  });

  it("deletes a widget", () => {
    const widget = saveWidget("ToDelete", "clock" as never, "/widget/clock");
    expect(getSavedWidgets()).toHaveLength(1);
    deleteWidget(widget.id);
    expect(getSavedWidgets()).toHaveLength(0);
  });

  it("duplicates a widget", () => {
    const widget = saveWidget("Original", "dday" as never, "/widget/dday");
    const copy = duplicateWidget(widget.id);
    expect(copy).not.toBeNull();
    expect(copy!.name).toBe("Original (복사)");
    expect(getSavedWidgets()).toHaveLength(2);
  });

  it("imports widgets without duplicates", () => {
    const widget = saveWidget("Existing", "dday" as never, "/widget/dday");
    const imported = importWidgets([
      { ...widget, name: "Duplicate" }, // same id
      { id: "sw-new", name: "New", type: "clock" as never, widgetUrl: "/widget/clock", createdAt: Date.now(), updatedAt: Date.now() },
    ]);
    expect(imported).toBe(1); // only "New" should be imported
    expect(getSavedWidgets()).toHaveLength(2);
  });
});
