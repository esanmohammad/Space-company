import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { expect as jestExpect } from "vitest";
import MissionStrip from "./MissionStrip";

jestExpect.extend(toHaveNoViolations);

const defaultProps = {
  title: "Our Mission",
  body: "We are committed to making space travel accessible to everyone on Earth.",
};

describe("MissionStrip", () => {
  it("renders <h2> with title text", () => {
    render(<MissionStrip {...defaultProps} />);
    const h2 = screen.getByRole("heading", { level: 2 });
    expect(h2).toBeTruthy();
    expect(h2.textContent).toBe(defaultProps.title);
  });

  it("renders body text", () => {
    render(<MissionStrip {...defaultProps} />);
    expect(screen.getByText(defaultProps.body)).toBeTruthy();
  });

  it("applies background-image style when backgroundImage prop is provided", () => {
    const bgUrl = "/images/space-bg.jpg";
    const { getByTestId } = render(
      <MissionStrip {...defaultProps} backgroundImage={bgUrl} />,
    );
    const section = getByTestId("mission-strip");
    // jsdom may add quotes around the URL, accept both forms
    const bg = section.style.backgroundImage;
    expect(bg === `url(${bgUrl})` || bg === `url("${bgUrl}")`).toBe(true);
  });

  it("renders no <img> element for background", () => {
    const { container } = render(
      <MissionStrip {...defaultProps} backgroundImage="/bg.jpg" />,
    );
    const imgs = container.querySelectorAll("img");
    expect(imgs.length).toBe(0);
  });

  it("has zero accessibility violations", async () => {
    const { container } = render(<MissionStrip {...defaultProps} />);
    const results = await axe(container);
    jestExpect(results).toHaveNoViolations();
  });
});
