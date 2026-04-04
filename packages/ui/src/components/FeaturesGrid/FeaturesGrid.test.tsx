import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { expect as jestExpect } from 'vitest';
import type { FeatureCardData } from '../../types';
import FeaturesGrid from './FeaturesGrid';

jestExpect.extend(toHaveNoViolations);

function makeFeatures(count: number): FeatureCardData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `feature-${i}`,
    icon: <span>★</span>,
    title: `Feature ${i + 1}`,
    description: `Description for feature ${i + 1}`,
  }));
}

describe('FeaturesGrid', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('renders correct number of cards for 3 features', () => {
    render(<FeaturesGrid features={makeFeatures(3)} />);
    const cards = screen.getAllByTestId('feature-card');
    expect(cards.length).toBe(3);
  });

  it('renders correct number of cards for 6 features', () => {
    render(<FeaturesGrid features={makeFeatures(6)} />);
    const cards = screen.getAllByTestId('feature-card');
    expect(cards.length).toBe(6);
  });

  it('renders correct number of cards for 4 features', () => {
    render(<FeaturesGrid features={makeFeatures(4)} />);
    const cards = screen.getAllByTestId('feature-card');
    expect(cards.length).toBe(4);
  });

  it('calls console.warn when features.length < 3', () => {
    render(<FeaturesGrid features={makeFeatures(2)} />);
    expect(warnSpy).toHaveBeenCalled();
  });

  it('calls console.warn and renders only 6 cards when features.length > 6', () => {
    render(<FeaturesGrid features={makeFeatures(8)} />);
    expect(warnSpy).toHaveBeenCalled();
    const cards = screen.getAllByTestId('feature-card');
    expect(cards.length).toBe(6);
  });

  it('renders sectionTitle as <h2> when provided', () => {
    render(<FeaturesGrid features={makeFeatures(3)} sectionTitle="Our Features" />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeTruthy();
    expect(heading.textContent).toBe('Our Features');
  });

  it('does not render <h2> when sectionTitle is absent', () => {
    render(<FeaturesGrid features={makeFeatures(3)} />);
    const headings = screen.queryAllByRole('heading', { level: 2 });
    expect(headings.length).toBe(0);
  });

  it('has zero accessibility violations', async () => {
    const { container } = render(
      <FeaturesGrid features={makeFeatures(3)} sectionTitle="Our Features" />
    );
    const results = await axe(container);
    jestExpect(results).toHaveNoViolations();
  });
});
