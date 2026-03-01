import { describe, it, expect } from "vitest";
import { addBgParam, addCommonStyleParams, buildUrl } from "@/lib/url-builder-utils";

describe("addBgParam", () => {
  it("adds transparent bg", () => {
    const p = new URLSearchParams();
    addBgParam(p, true, "FFFFFF");
    expect(p.get("bg")).toBe("transparent");
  });

  it("adds non-default bg color", () => {
    const p = new URLSearchParams();
    addBgParam(p, false, "1E1E1E");
    expect(p.get("bg")).toBe("1E1E1E");
  });

  it("skips default bg", () => {
    const p = new URLSearchParams();
    addBgParam(p, false, "FFFFFF");
    expect(p.has("bg")).toBe(false);
  });

  it("skips custom default bg", () => {
    const p = new URLSearchParams();
    addBgParam(p, false, "000000", "000000");
    expect(p.has("bg")).toBe(false);
  });
});

describe("addCommonStyleParams", () => {
  it("adds non-default values", () => {
    const p = new URLSearchParams();
    addCommonStyleParams(p, 8, 32, "lg");
    expect(p.get("radius")).toBe("8");
    expect(p.get("pad")).toBe("32");
    expect(p.get("fsize")).toBe("lg");
  });

  it("skips all defaults", () => {
    const p = new URLSearchParams();
    addCommonStyleParams(p, 16, 24, "md");
    expect(p.toString()).toBe("");
  });

  it("adds only changed values", () => {
    const p = new URLSearchParams();
    addCommonStyleParams(p, 16, 32, "md");
    expect(p.has("radius")).toBe(false);
    expect(p.get("pad")).toBe("32");
    expect(p.has("fsize")).toBe(false);
  });
});

describe("buildUrl", () => {
  it("returns base without params", () => {
    const p = new URLSearchParams();
    expect(buildUrl("/widget/clock", p)).toBe("/widget/clock");
  });

  it("returns base with params", () => {
    const p = new URLSearchParams();
    p.set("bg", "1E1E1E");
    expect(buildUrl("/widget/clock", p)).toBe("/widget/clock?bg=1E1E1E");
  });
});
