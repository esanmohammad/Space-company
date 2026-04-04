import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { expect as jestExpect } from 'vitest';
import CtaBanner from './CtaBanner';

jestExpect.extend(toHaveNoViolations);

const defaultProps = {
  headline: 'Ready to Reach the Stars?',
  ctaLabel: 'Book Your Flight',
  onCtaClick: vi.fn(),
};

describe('CtaBanner', () => {
  beforeEach(() => {
    defaultProps.onCtaClick = vi.fn();
  });

  it('renders headline text', () => {
    render(<CtaBanner {...defaultProps} />);
    expect(screen.getByText(defaultProps.headline)).toBeTruthy();
  });

  it('renders CTA button with correct label', () => {
    render(<CtaBanner {...defaultProps} />);
    const button = screen.getByRole('button', { name: defaultProps.ctaLabel });
    expect(button).toBeTruthy();
  });

  it('clicking button calls onCtaClick exactly once', () => {
    render(<CtaBanner {...defaultProps} />);
    const button = screen.getByRole('button', { name: defaultProps.ctaLabel });
    fireEvent.click(button);
    expect(defaultProps.onCtaClick).toHaveBeenCalledTimes(1);
  });

  it('has zero accessibility violations', async () => {
    const { container } = render(<CtaBanner {...defaultProps} />);
    const results = await axe(container);
    jestExpect(results).toHaveNoViolations();
  });
});
