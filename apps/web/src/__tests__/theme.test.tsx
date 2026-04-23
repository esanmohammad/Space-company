import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ConfigProvider, Button } from "antd";
import React from "react";
import { spaceTheme } from "@space-tourism/ui";

describe("TC-048: ConfigProvider applies spaceTheme tokens", () => {
  it("renders Button without errors when wrapped in ConfigProvider with spaceTheme", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ConfigProvider theme={spaceTheme}>
        <Button type="primary">Test</Button>
      </ConfigProvider>,
    );

    expect(screen.getByRole("button", { name: "Test" })).toBeTruthy();
    // No console errors about invalid tokens
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining("invalid"),
    );

    consoleSpy.mockRestore();
  });

  it("Button renders with primary type inside themed ConfigProvider", () => {
    render(
      <ConfigProvider theme={spaceTheme}>
        <Button type="primary" data-testid="themed-button">
          Themed
        </Button>
      </ConfigProvider>,
    );

    const button = screen.getByTestId("themed-button");
    expect(button).toBeTruthy();
    expect(button.textContent).toBe("Themed");
  });

  it("dark algorithm is present in spaceTheme", () => {
    // Just verify the theme object structure is valid for ConfigProvider
    expect(spaceTheme.algorithm).toBeDefined();
    expect(spaceTheme.token).toBeDefined();
  });

  it("ConfigProvider passes token values through without error", () => {
    const errors: string[] = [];
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      errors.push(String(args[0]));
      originalError(...args);
    };

    render(
      <ConfigProvider theme={spaceTheme}>
        <Button>No Error</Button>
      </ConfigProvider>,
    );

    console.error = originalError;

    const tokenErrors = errors.filter(
      (e) => e.includes("token") || e.includes("invalid"),
    );
    expect(tokenErrors.length).toBe(0);
  });
});
