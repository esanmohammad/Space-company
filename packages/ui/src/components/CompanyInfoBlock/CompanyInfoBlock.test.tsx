import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { expect as jestExpect } from "vitest";
import CompanyInfoBlock from "./CompanyInfoBlock";
import type { CompanyInfo } from "../../types";

jestExpect.extend(toHaveNoViolations);

const companyInfo: CompanyInfo = {
  address: "1 Stark Drive, Cape Canaveral, FL 32920, USA",
  email: "contact@starkspace.com",
  phone: "+1 (800) 867-5309",
  tagline:
    "Where humanity meets the stars — your journey beyond Earth starts here.",
};

describe("CompanyInfoBlock", () => {
  it("renders address inside <address> element", () => {
    const { container } = render(
      <CompanyInfoBlock companyInfo={companyInfo} />,
    );
    const addressEl = container.querySelector("address");
    expect(addressEl).toBeTruthy();
    expect(addressEl!.textContent).toContain(companyInfo.address);
  });

  it('renders <a href="mailto:..."> for email', () => {
    render(<CompanyInfoBlock companyInfo={companyInfo} />);
    const emailLink = screen.getByRole("link", { name: companyInfo.email });
    expect(emailLink).toBeTruthy();
    expect(emailLink.getAttribute("href")).toBe(`mailto:${companyInfo.email}`);
  });

  it('renders <a href="tel:..."> for phone', () => {
    render(<CompanyInfoBlock companyInfo={companyInfo} />);
    const phoneLink = screen.getByRole("link", { name: companyInfo.phone });
    expect(phoneLink).toBeTruthy();
    expect(phoneLink.getAttribute("href")).toBe(`tel:${companyInfo.phone}`);
  });

  it("renders tagline text", () => {
    render(<CompanyInfoBlock companyInfo={companyInfo} />);
    expect(screen.getByText(companyInfo.tagline)).toBeTruthy();
  });

  it("has zero accessibility violations", async () => {
    const { container } = render(
      <CompanyInfoBlock companyInfo={companyInfo} />,
    );
    const results = await axe(container);
    jestExpect(results).toHaveNoViolations();
  });
});
