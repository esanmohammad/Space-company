import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { expect as jestExpect } from 'vitest';
import Footer from './Footer';
import type { SocialLink } from '../../types';

jestExpect.extend(toHaveNoViolations);

const TEST_SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Follow us on Twitter',
    href: 'https://twitter.com/moonshot',
    icon: <span>TW</span>,
  },
  {
    label: 'Connect on LinkedIn',
    href: 'https://linkedin.com/company/moonshot',
    icon: <span>LI</span>,
  },
  {
    label: 'Watch on YouTube',
    href: 'https://youtube.com/@moonshot',
    icon: <span>YT</span>,
  },
];

describe('Footer', () => {
  describe('copyright', () => {
    it('renders copyright text containing the company name', () => {
      render(
        <Footer
          companyName="Moonshot"
          tagline="Reach for the stars."
          socialLinks={TEST_SOCIAL_LINKS}
          year={2026}
        />
      );
      const footerEl = screen.getByRole('contentinfo');
      expect(footerEl.textContent).toContain('Moonshot');
    });

    it('renders copyright text containing the provided year', () => {
      render(
        <Footer
          companyName="Moonshot"
          tagline="Reach for the stars."
          socialLinks={TEST_SOCIAL_LINKS}
          year={2026}
        />
      );
      const footerEl = screen.getByRole('contentinfo');
      expect(footerEl.textContent).toContain('2026');
    });

    it('uses the current year when year prop is not provided', () => {
      render(
        <Footer
          companyName="Moonshot"
          tagline="Reach for the stars."
          socialLinks={TEST_SOCIAL_LINKS}
        />
      );
      const currentYear = new Date().getFullYear().toString();
      const footerEl = screen.getByRole('contentinfo');
      expect(footerEl.textContent).toContain(currentYear);
    });
  });

  describe('tagline', () => {
    it('renders the tagline text', () => {
      render(
        <Footer
          companyName="Moonshot"
          tagline="Reach for the stars."
          socialLinks={TEST_SOCIAL_LINKS}
          year={2026}
        />
      );
      expect(screen.getByText('Reach for the stars.')).toBeTruthy();
    });
  });

  describe('social links', () => {
    it('renders all social links with correct href', () => {
      render(
        <Footer
          companyName="Moonshot"
          tagline="Reach for the stars."
          socialLinks={TEST_SOCIAL_LINKS}
          year={2026}
        />
      );
      const twitterLink = screen.getByRole('link', { name: 'Follow us on Twitter' });
      expect(twitterLink.getAttribute('href')).toBe('https://twitter.com/moonshot');

      const linkedinLink = screen.getByRole('link', { name: 'Connect on LinkedIn' });
      expect(linkedinLink.getAttribute('href')).toBe('https://linkedin.com/company/moonshot');

      const youtubeLink = screen.getByRole('link', { name: 'Watch on YouTube' });
      expect(youtubeLink.getAttribute('href')).toBe('https://youtube.com/@moonshot');
    });

    it('renders social links with correct aria-label', () => {
      render(
        <Footer
          companyName="Moonshot"
          tagline="Reach for the stars."
          socialLinks={TEST_SOCIAL_LINKS}
          year={2026}
        />
      );
      expect(screen.getByRole('link', { name: 'Follow us on Twitter' })).toBeTruthy();
      expect(screen.getByRole('link', { name: 'Connect on LinkedIn' })).toBeTruthy();
      expect(screen.getByRole('link', { name: 'Watch on YouTube' })).toBeTruthy();
    });

    it('renders decorative icons with aria-hidden="true"', () => {
      const { container } = render(
        <Footer
          companyName="Moonshot"
          tagline="Reach for the stars."
          socialLinks={TEST_SOCIAL_LINKS}
          year={2026}
        />
      );
      const hiddenSpans = container.querySelectorAll('[aria-hidden="true"]');
      expect(hiddenSpans.length).toBe(TEST_SOCIAL_LINKS.length);
    });
  });

  describe('landmark', () => {
    it('renders inside a <footer> element', () => {
      const { container } = render(
        <Footer
          companyName="Moonshot"
          tagline="Reach for the stars."
          socialLinks={TEST_SOCIAL_LINKS}
          year={2026}
        />
      );
      expect(container.querySelector('footer')).toBeTruthy();
    });

    it('is discoverable via the contentinfo landmark role', () => {
      render(
        <Footer
          companyName="Moonshot"
          tagline="Reach for the stars."
          socialLinks={TEST_SOCIAL_LINKS}
          year={2026}
        />
      );
      expect(screen.getByRole('contentinfo')).toBeTruthy();
    });
  });

  describe('accessibility (jest-axe)', () => {
    it('has no WCAG violations', async () => {
      const { container } = render(
        <Footer
          companyName="Moonshot"
          tagline="Reach for the stars."
          socialLinks={TEST_SOCIAL_LINKS}
          year={2026}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no WCAG violations with empty social links', async () => {
      const { container } = render(
        <Footer
          companyName="Moonshot"
          tagline="Reach for the stars."
          socialLinks={[]}
          year={2026}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
