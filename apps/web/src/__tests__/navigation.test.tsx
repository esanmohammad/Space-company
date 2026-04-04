import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import React from 'react';

// ─── Icon mocks ────────────────────────────────────────────────────────────
// @ant-design/icons CJS sub-path modules fail to interop correctly in vitest.
// Mock them with simple no-op components so tests focus on routing logic.
// Use vi.hoisted so the factory can reference the function before hoisting.

// Define mock factory inline (no external variables — vi.mock is hoisted)
vi.mock('@ant-design/icons/lib/icons/MenuOutlined', () => {
  const Icon = () => null;
  return { default: Icon, MenuOutlined: Icon };
});
vi.mock('@ant-design/icons/RocketOutlined', () => ({ default: () => null }));
vi.mock('@ant-design/icons/GlobalOutlined', () => ({ default: () => null }));
vi.mock('@ant-design/icons/SafetyCertificateOutlined', () => ({ default: () => null }));
vi.mock('@ant-design/icons/StarOutlined', () => ({ default: () => null }));
vi.mock('@ant-design/icons/GithubOutlined', () => ({ default: () => null }));
vi.mock('@ant-design/icons/TwitterOutlined', () => ({ default: () => null }));
vi.mock('@ant-design/icons/LinkedinOutlined', () => ({ default: () => null }));

// Mock notification to prevent console noise
vi.mock('antd', async (importOriginal) => {
  const actual = await importOriginal<typeof import('antd')>();
  return {
    ...actual,
    notification: {
      ...actual.notification,
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

// ─── Imports (after mocks) ──────────────────────────────────────────────────
import { Navbar, NAV_LINKS } from '@space-tourism/ui';
import LandingPage from '../pages/LandingPage';
import ContactPage from '../pages/ContactPage';

// A non-lazy TestApp that wires routes directly — avoids lazy-loading complexity.
function AppContent() {
  const location = useLocation();
  return (
    <>
      <Navbar
        brandName="Stellar Horizons"
        links={NAV_LINKS}
        currentPath={location.pathname}
      />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </>
  );
}

function renderApp(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ConfigProvider>
        <AppContent />
      </ConfigProvider>
    </MemoryRouter>,
  );
}

// ─── TC-046 ─────────────────────────────────────────────────────────────────
describe('TC-046: Navbar "Contact" Link Changes Route to /contact', () => {
  it('starts on landing page with hero h1 heading visible', async () => {
    renderApp('/');
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
    });
  });

  it('clicking Contact nav link renders contact page content', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
    });

    const contactLinks = screen.getAllByRole('link', { name: 'Contact' });
    await user.click(contactLinks[0]);

    await waitFor(() => {
      expect(screen.getByTestId('contact-heading')).toBeTruthy();
    });
  });

  it('after navigating to /contact, hero headline is no longer the landing page headline', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
    });

    const contactLinks = screen.getAllByRole('link', { name: 'Contact' });
    await user.click(contactLinks[0]);

    await waitFor(() => {
      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1.textContent).toMatch(/contact us/i);
    });
  });

  it('Contact nav link has aria-current="page" after navigation', async () => {
    const user = userEvent.setup();
    renderApp('/');

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
    });

    const contactLinks = screen.getAllByRole('link', { name: 'Contact' });
    await user.click(contactLinks[0]);

    await waitFor(() => {
      const allContactLinks = screen.getAllByRole('link', { name: 'Contact' });
      const hasActive = allContactLinks.some(
        (link) => link.getAttribute('aria-current') === 'page',
      );
      expect(hasActive).toBe(true);
    });
  });
});

// ─── TC-047 ─────────────────────────────────────────────────────────────────
describe('TC-047: Navbar "Home" Link Returns to /', () => {
  it('starts on contact page with contact heading visible', async () => {
    renderApp('/contact');
    await waitFor(() => {
      expect(screen.getByTestId('contact-heading')).toBeTruthy();
    });
  });

  it('clicking Home nav link renders landing page hero', async () => {
    const user = userEvent.setup();
    renderApp('/contact');

    await waitFor(() => {
      expect(screen.getByTestId('contact-heading')).toBeTruthy();
    });

    const homeLinks = screen.getAllByRole('link', { name: 'Home' });
    await user.click(homeLinks[0]);

    await waitFor(() => {
      const h1 = screen.getByRole('heading', { level: 1 });
      // Landing page hero headline
      expect(h1.textContent).toMatch(/journey|stars|space|mission|earth|horizon/i);
    });
  });

  it('after navigating home, contact heading is no longer visible', async () => {
    const user = userEvent.setup();
    renderApp('/contact');

    await waitFor(() => {
      expect(screen.getByTestId('contact-heading')).toBeTruthy();
    });

    const homeLinks = screen.getAllByRole('link', { name: 'Home' });
    await user.click(homeLinks[0]);

    await waitFor(() => {
      expect(screen.queryByTestId('contact-heading')).toBeFalsy();
    });
  });

  it('Home nav link has aria-current="page" after navigation back to /', async () => {
    const user = userEvent.setup();
    renderApp('/contact');

    await waitFor(() => {
      expect(screen.getByTestId('contact-heading')).toBeTruthy();
    });

    const homeLinks = screen.getAllByRole('link', { name: 'Home' });
    await user.click(homeLinks[0]);

    await waitFor(() => {
      const allHomeLinks = screen.getAllByRole('link', { name: 'Home' });
      const hasActive = allHomeLinks.some(
        (link) => link.getAttribute('aria-current') === 'page',
      );
      expect(hasActive).toBe(true);
    });
  });
});
