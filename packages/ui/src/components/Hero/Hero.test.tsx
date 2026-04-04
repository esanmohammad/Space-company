import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { expect as jestExpect } from 'vitest';
import Hero from './Hero';

jestExpect.extend(toHaveNoViolations);

const defaultProps = {
  headline: 'Journey Beyond the Stars',
  subHeadline: 'The final frontier awaits — book your seat today.',
  ctaLabel: 'Book Now',
  onCtaClick: vi.fn(),
};

describe('Hero', () => {
  beforeEach(() => {
    defaultProps.onCtaClick = vi.fn();
  });

  it('renders <h1> with headline text', () => {
    render(<Hero {...defaultProps} />);
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1).toBeTruthy();
    expect(h1.textContent).toBe(defaultProps.headline);
  });

  it('renders subHeadline text', () => {
    render(<Hero {...defaultProps} />);
    expect(screen.getByText(defaultProps.subHeadline)).toBeTruthy();
  });

  it('renders CTA button with correct label', () => {
    render(<Hero {...defaultProps} />);
    const button = screen.getByRole('button', { name: defaultProps.ctaLabel });
    expect(button).toBeTruthy();
  });

  it('clicking CTA calls onCtaClick exactly once', () => {
    render(<Hero {...defaultProps} />);
    const button = screen.getByRole('button', { name: defaultProps.ctaLabel });
    fireEvent.click(button);
    expect(defaultProps.onCtaClick).toHaveBeenCalledTimes(1);
  });

  it('renders no <img> element for background', () => {
    const { container } = render(<Hero {...defaultProps} backgroundImage="/bg.jpg" />);
    const imgs = container.querySelectorAll('img');
    expect(imgs.length).toBe(0);
  });

  it('has zero accessibility violations', async () => {
    const { container } = render(<Hero {...defaultProps} />);
    const results = await axe(container);
    jestExpect(results).toHaveNoViolations();
  });
});
