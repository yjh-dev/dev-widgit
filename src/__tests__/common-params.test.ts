import { describe, it, expect } from "vitest";
import { parseCommonParams, parseBgParam } from "@/lib/common-params";

describe("parseCommonParams", () => {
  it("parses bg color", () => {
    const p = new URLSearchParams("bg=1E1E1E");
    const result = parseCommonParams(p);
    expect(result.bg).toBe("1E1E1E");
    expect(result.transparentBg).toBeUndefined();
  });

  it("parses transparent bg", () => {
    const p = new URLSearchParams("bg=transparent");
    const result = parseCommonParams(p);
    expect(result.transparentBg).toBe(true);
    expect(result.bg).toBeUndefined();
  });

  it("parses radius, pad, fsize", () => {
    const p = new URLSearchParams("radius=8&pad=32&fsize=lg");
    const result = parseCommonParams(p);
    expect(result.borderRadius).toBe(8);
    expect(result.padding).toBe(32);
    expect(result.fontSize).toBe("lg");
  });

  it("returns empty for no params", () => {
    const p = new URLSearchParams();
    const result = parseCommonParams(p);
    expect(Object.keys(result)).toHaveLength(0);
  });

  it("handles partial params", () => {
    const p = new URLSearchParams("radius=24");
    const result = parseCommonParams(p);
    expect(result.borderRadius).toBe(24);
    expect(result.padding).toBeUndefined();
    expect(result.fontSize).toBeUndefined();
  });
});

describe("parseBgParam", () => {
  it("returns default for null", () => {
    const { bg, transparentBg } = parseBgParam(null);
    expect(bg).toBe("FFFFFF");
    expect(transparentBg).toBe(false);
  });

  it("returns color for hex value", () => {
    const { bg, transparentBg } = parseBgParam("1E1E1E");
    expect(bg).toBe("1E1E1E");
    expect(transparentBg).toBe(false);
  });

  it("returns transparent", () => {
    const { bg, transparentBg } = parseBgParam("transparent");
    expect(bg).toBe("FFFFFF");
    expect(transparentBg).toBe(true);
  });
});
