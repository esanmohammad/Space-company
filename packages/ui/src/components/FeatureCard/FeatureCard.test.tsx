import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { expect as jestExpect } from 'vitest';
import FeatureCard from './FeatureCard';

jestExpect.extend(toHaveNoViolations);

const defaultProps = {
  id: 'feature-1',
  icon: <span>🚀</span>,
  title: 'Orbital Launches',
  description: 'Experience the raw power of lift-off.',
};

describe('FeatureCard', () => {
  it('renders title in an h3 element', () => {
    render(<FeatureCard {...defaultProps} />);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeTruthy();
    expect(heading.textContent).toBe(defaultProps.title);
  });

  it('renders description text', () => {
    render(<FeatureCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.description)).toBeTruthy();
  });

  it('icon wrapper has aria-hidden="true"', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    const iconWrapper = container.querySelector('span[aria-hidden="true"]');
    expect(iconWrapper).not.toBeNull();
  });

  it('root element is <article>', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    const article = container.querySelector('article');
    expect(article).not.toBeNull();
    expect(article?.getAttribute('data-testid')).toBe('feature-card');
  });

  it('has zero accessibility violations', async () => {
    const { container } = render(<FeatureCard {...defaultProps} />);
    const results = await axe(container);
    jestExpect(results).toHaveNoViolations();
  });
});
