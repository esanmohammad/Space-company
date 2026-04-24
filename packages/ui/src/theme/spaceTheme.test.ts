import { describe, it, expect } from "vitest";
import { theme } from "antd";
import { spaceTheme } from "./spaceTheme";

describe("TC-045: spaceTheme tokens match design spec", () => {
  it("colorPrimary equals #D4AF37", () => {
    expect(spaceTheme.token?.colorPrimary).toBe("#D4AF37");
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

  it("colorTextSecondary equals #A0A0B8", () => {
    expect(spaceTheme.token?.colorTextSecondary).toBe("#A0A0B8");
  });

  it("borderRadius equals 8", () => {
    expect(spaceTheme.token?.borderRadius).toBe(8);
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
