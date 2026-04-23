import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { expect as jestExpect } from "vitest";
import Navbar from "./Navbar";
import type { NavLink } from "../../types";

jestExpect.extend(toHaveNoViolations);

// Mock react-router-dom to avoid BrowserRouter requirement
vi.mock("react-router-dom", () => ({
  Link: ({
    to,
    children,
    ...props
  }: {
    to: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Mock the MenuOutlined icon — the source imports it as a named export from a
// sub-path that only has a default export; provide both so either import style works.
vi.mock("@ant-design/icons/lib/icons/MenuOutlined", () => {
  const MenuOutlined = () => <span aria-hidden="true">☰</span>;
  return { default: MenuOutlined, MenuOutlined };
});

const TEST_LINKS: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destinations" },
  { label: "About", to: "/about" },
];

/**
 * Helper: find the hamburger button.
 * In JSDOM the button has display:none (mobile media query doesn't apply),
 * so we must query by attribute rather than accessible role.
 */
function getHamburger() {
  return document.querySelector(
    'button[aria-label="Open navigation"]',
  ) as HTMLButtonElement | null;
}

describe("Navbar", () => {
  describe("Desktop rendering (TC-028)", () => {
    it("renders the brand name", () => {
      render(
        <Navbar brandName="Stark Space" links={TEST_LINKS} currentPath="/" />,
      );
      expect(screen.getByText("Stark Space")).toBeTruthy();
    });

    it("renders all nav links", () => {
      render(
        <Navbar brandName="Stark Space" links={TEST_LINKS} currentPath="/" />,
      );
      expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Destinations").length).toBeGreaterThan(0);
      expect(screen.getAllByText("About").length).toBeGreaterThan(0);
    });

    it('sets aria-current="page" on the active link', () => {
      render(
        <Navbar
          brandName="Stark Space"
          links={TEST_LINKS}
          currentPath="/destinations"
        />,
      );
      const activeLinks = screen.getAllByRole("link", { name: "Destinations" });
      const activeLink = activeLinks.find(
        (el) => el.getAttribute("aria-current") === "page",
      );
      expect(activeLink).toBeTruthy();
    });

    it("does not set aria-current on non-active links", () => {
      render(
        <Navbar
          brandName="Stark Space"
          links={TEST_LINKS}
          currentPath="/destinations"
        />,
      );
      const homeLinks = screen.getAllByRole("link", { name: "Home" });
      homeLinks.forEach((link) => {
        expect(link.getAttribute("aria-current")).not.toBe("page");
      });
    });

    it("renders a <nav> landmark", () => {
      const { container } = render(
        <Navbar brandName="Stark Space" links={TEST_LINKS} currentPath="/" />,
      );
      expect(container.querySelector("nav")).toBeTruthy();
    });

    it("renders inside a <header> element", () => {
      const { container } = render(
        <Navbar brandName="Stark Space" links={TEST_LINKS} currentPath="/" />,
      );
      expect(container.querySelector("header")).toBeTruthy();
    });

    it("has no accessibility violations (jest-axe)", async () => {
      const { container } = render(
        <Navbar brandName="Stark Space" links={TEST_LINKS} currentPath="/" />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Mobile rendering — hamburger & drawer (TC-030, TC-031, TC-032)", () => {
    /**
     * NOTE: In JSDOM, CSS media queries are not applied, so `.hamburger`
     * keeps its default `display: none` rule.  We query by DOM attribute
     * (bypassing visible-only RTL queries) and fire events directly so that
     * React handlers are still invoked.
     */

    it("TC-030: hamburger button is present in the DOM with correct aria-label", () => {
      render(
        <Navbar brandName="Stark Space" links={TEST_LINKS} currentPath="/" />,
      );
      const hamburger = getHamburger();
      expect(hamburger).not.toBeNull();
      expect(hamburger!.getAttribute("aria-label")).toBe("Open navigation");
    });

    it('TC-030: hamburger button has aria-expanded="false" initially', () => {
      render(
        <Navbar brandName="Stark Space" links={TEST_LINKS} currentPath="/" />,
      );
      const hamburger = getHamburger();
      expect(hamburger!.getAttribute("aria-expanded")).toBe("false");
    });

    it('TC-031: clicking hamburger opens the drawer (title "Site navigation" visible)', async () => {
      render(
        <Navbar brandName="Stark Space" links={TEST_LINKS} currentPath="/" />,
      );
      const hamburger = getHamburger()!;
      fireEvent.click(hamburger);
      await waitFor(() => {
        expect(screen.getByText("Site navigation")).toBeTruthy();
      });
    });

    it("TC-031: drawer contains nav links after hamburger click", async () => {
      render(
        <Navbar brandName="Stark Space" links={TEST_LINKS} currentPath="/" />,
      );
      fireEvent.click(getHamburger()!);
      await waitFor(() => {
        expect(screen.getByText("Site navigation")).toBeTruthy();
      });
      // Links appear inside the open drawer
      const allDestLinks = screen.getAllByRole("link", {
        name: "Destinations",
      });
      expect(allDestLinks.length).toBeGreaterThan(0);
    });

    it("TC-031: clicking a drawer link closes the drawer", async () => {
      render(
        <Navbar brandName="Stark Space" links={TEST_LINKS} currentPath="/" />,
      );
      fireEvent.click(getHamburger()!);
      await waitFor(() => {
        expect(screen.getByText("Site navigation")).toBeTruthy();
      });
      // Click the last Destinations link (it lives in the drawer)
      const drawerLinks = screen.getAllByRole("link", { name: "Destinations" });
      fireEvent.click(drawerLinks[drawerLinks.length - 1]);
      // AntD Drawer removes .ant-drawer-open when closed
      await waitFor(() => {
        expect(document.querySelector(".ant-drawer-open")).toBeNull();
      });
    });

    it("TC-032: pressing Escape closes the open drawer", async () => {
      render(
        <Navbar brandName="Stark Space" links={TEST_LINKS} currentPath="/" />,
      );
      fireEvent.click(getHamburger()!);
      await waitFor(() => {
        expect(screen.getByText("Site navigation")).toBeTruthy();
      });
      fireEvent.keyDown(document, { key: "Escape" });
      // AntD Drawer removes .ant-drawer-open when closed
      await waitFor(() => {
        expect(document.querySelector(".ant-drawer-open")).toBeNull();
      });
    });
  });

  describe("Edge cases (TC-029)", () => {
    it("TC-029: renders brand only without error when links array is empty", () => {
      render(<Navbar brandName="Stark Space" links={[]} currentPath="/" />);
      expect(screen.getByText("Stark Space")).toBeTruthy();
    });

    it("TC-029: no nav links rendered when links array is empty", () => {
      render(<Navbar brandName="Stark Space" links={[]} currentPath="/" />);
      const links = screen.queryAllByRole("link");
      // Only the brand link should be visible
      expect(links.length).toBeLessThanOrEqual(1);
    });
  });
});
