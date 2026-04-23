import { describe, it, expect } from "vitest";
import { theme } from "antd";
import { spaceTheme } from "./spaceTheme";

describe("TC-045: spaceTheme tokens match design spec", () => {
  it("colorPrimary equals #4F8EF7", () => {
    expect(spaceTheme.token?.colorPrimary).toBe("#4F8EF7");
  });

  it("colorBgBase equals #0A0A0F", () => {
    expect(spaceTheme.token?.colorBgBase).toBe("#0A0A0F");
  });

  it("colorBgContainer equals #14141F", () => {
    expect(spaceTheme.token?.colorBgContainer).toBe("#14141F");
  });

  it("colorBorder equals #2A2A3A", () => {
    expect(spaceTheme.token?.colorBorder).toBe("#2A2A3A");
  });

  it("colorTextBase equals #E8E8E8", () => {
    expect(spaceTheme.token?.colorTextBase).toBe("#E8E8E8");
  });

  it("borderRadius equals 4", () => {
    expect(spaceTheme.token?.borderRadius).toBe(4);
  });

  it("algorithm includes theme.darkAlgorithm", () => {
    const algorithms = Array.isArray(spaceTheme.algorithm)
      ? spaceTheme.algorithm
      : [spaceTheme.algorithm];
    expect(algorithms).toContain(theme.darkAlgorithm);
  });

  it("algorithm is set (not undefined)", () => {
    expect(spaceTheme.algorithm).toBeDefined();
  });
});
