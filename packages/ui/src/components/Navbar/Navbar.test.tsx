import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { expect as jestExpect } from 'vitest';
import Navbar from './Navbar';
import type { NavLink } from '../../types';

jestExpect.extend(toHaveNoViolations);

// Mock react-router-dom to avoid BrowserRouter requirement
vi.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }: { to: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

const TEST_LINKS: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'About', to: '/about' },
];

describe('Navbar', () => {
  describe('Desktop rendering', () => {
    it('renders the brand name', () => {
      render(<Navbar brandName="Stellar Horizons" links={TEST_LINKS} currentPath="/" />);
      expect(screen.getByText('Stellar Horizons')).toBeTruthy();
    });

    it('renders all nav links', () => {
      render(<Navbar brandName="Stellar Horizons" links={TEST_LINKS} currentPath="/" />);
      expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Destinations').length).toBeGreaterThan(0);
      expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    });

    it('sets aria-current="page" on the active link', () => {
      render(<Navbar brandName="Stellar Horizons" links={TEST_LINKS} currentPath="/destinations" />);
      // Find the link with aria-current in desktop nav
      const activeLinks = screen.getAllByRole('link', { name: 'Destinations' });
      const activeDesktopLink = activeLinks.find(
        (el) => el.getAttribute('aria-current') === 'page'
      );
      expect(activeDesktopLink).toBeTruthy();
    });

    it('does not set aria-current on non-active links', () => {
      render(<Navbar brandName="Stellar Horizons" links={TEST_LINKS} currentPath="/destinations" />);
      const homeLinks = screen.getAllByRole('link', { name: 'Home' });
      homeLinks.forEach((link) => {
        expect(link.getAttribute('aria-current')).not.toBe('page');
      });
    });

    it('has no accessibility violations (jest-axe)', async () => {
      const { container } = render(
        <Navbar brandName="Stellar Horizons" links={TEST_LINKS} currentPath="/" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Mobile rendering', () => {
    it('renders the hamburger button', () => {
      render(<Navbar brandName="Stellar Horizons" links={TEST_LINKS} currentPath="/" />);
      const hamburger = screen.getByRole('button', { name: 'Open navigation' });
      expect(hamburger).toBeTruthy();
    });

    it('opens the drawer when hamburger button is clicked', async () => {
      const user = userEvent.setup();
      render(<Navbar brandName="Stellar Horizons" links={TEST_LINKS} currentPath="/" />);
      const hamburger = screen.getByRole('button', { name: 'Open navigation' });
      await user.click(hamburger);
      await waitFor(() => {
        expect(screen.getByText('Site navigation')).toBeTruthy();
      });
    });

    it('closes the drawer when Escape key is pressed', async () => {
      const user = userEvent.setup();
      render(<Navbar brandName="Stellar Horizons" links={TEST_LINKS} currentPath="/" />);
      const hamburger = screen.getByRole('button', { name: 'Open navigation' });
      await user.click(hamburger);
      await waitFor(() => {
        expect(screen.getByText('Site navigation')).toBeTruthy();
      });
      fireEvent.keyDown(document, { key: 'Escape' });
      await waitFor(() => {
        expect(screen.queryByText('Site navigation')).toBeFalsy();
      });
    });

    it('closes the drawer and fires navigation when a drawer link is clicked', async () => {
      const user = userEvent.setup();
      render(<Navbar brandName="Stellar Horizons" links={TEST_LINKS} currentPath="/" />);
      const hamburger = screen.getByRole('button', { name: 'Open navigation' });
      await user.click(hamburger);
      await waitFor(() => {
        expect(screen.getByText('Site navigation')).toBeTruthy();
      });
      // Click a link inside the drawer
      const drawerLinks = screen.getAllByRole('link', { name: 'Destinations' });
      // The drawer link is one of them; click it
      await user.click(drawerLinks[drawerLinks.length - 1]);
      await waitFor(() => {
        expect(screen.queryByText('Site navigation')).toBeFalsy();
      });
    });
  });

  describe('Edge cases', () => {
    it('renders brand only without error when links array is empty', () => {
      render(<Navbar brandName="Stellar Horizons" links={[]} currentPath="/" />);
      expect(screen.getByText('Stellar Horizons')).toBeTruthy();
    });

    it('renders inside a <header> element', () => {
      const { container } = render(
        <Navbar brandName="Stellar Horizons" links={TEST_LINKS} currentPath="/" />
      );
      expect(container.querySelector('header')).toBeTruthy();
    });

    it('renders a <nav> element', () => {
      const { container } = render(
        <Navbar brandName="Stellar Horizons" links={TEST_LINKS} currentPath="/" />
      );
      expect(container.querySelector('nav')).toBeTruthy();
    });
  });
});
