import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { expect as jestExpect } from 'vitest';
import SectionWrapper from './SectionWrapper';

jestExpect.extend(toHaveNoViolations);

describe('SectionWrapper', () => {
  describe('default rendering', () => {
    it('renders a <section> element by default', () => {
      const { container } = render(
        <SectionWrapper>Content</SectionWrapper>
      );
      const section = container.querySelector('section');
      expect(section).not.toBeNull();
    });

    it('renders children inside the wrapper', () => {
      render(<SectionWrapper>Hello World</SectionWrapper>);
      expect(screen.getByText('Hello World')).toBeTruthy();
    });

    it('renders with data-testid="section-wrapper"', () => {
      render(<SectionWrapper>Content</SectionWrapper>);
      expect(screen.getByTestId('section-wrapper')).toBeTruthy();
    });
  });

  describe('as prop', () => {
    it('renders a <div> when as="div"', () => {
      const { container } = render(
        <SectionWrapper as="div">Content</SectionWrapper>
      );
      const div = container.querySelector('div[data-testid="section-wrapper"]');
      expect(div).not.toBeNull();
      expect(div?.tagName.toLowerCase()).toBe('div');
    });

    it('renders an <article> when as="article"', () => {
      const { container } = render(
        <SectionWrapper as="article">Content</SectionWrapper>
      );
      const article = container.querySelector('article');
      expect(article).not.toBeNull();
    });

    it('renders an <aside> when as="aside"', () => {
      const { container } = render(
        <SectionWrapper as="aside">Content</SectionWrapper>
      );
      const aside = container.querySelector('aside');
      expect(aside).not.toBeNull();
    });
  });

  describe('className prop', () => {
    it('applies custom className alongside the module class', () => {
      const { container } = render(
        <SectionWrapper className="custom-class">Content</SectionWrapper>
      );
      const wrapper = container.querySelector('[data-testid="section-wrapper"]');
      expect(wrapper?.className).toContain('custom-class');
    });

    it('renders without error when className is not provided', () => {
      const { container } = render(
        <SectionWrapper>Content</SectionWrapper>
      );
      const wrapper = container.querySelector('[data-testid="section-wrapper"]');
      expect(wrapper).not.toBeNull();
    });
  });

  describe('aria-labelledby prop', () => {
    it('forwards aria-labelledby to the root element', () => {
      render(
        <SectionWrapper aria-labelledby="my-heading">
          <h2 id="my-heading">Heading</h2>
          Content
        </SectionWrapper>
      );
      const wrapper = screen.getByTestId('section-wrapper');
      expect(wrapper.getAttribute('aria-labelledby')).toBe('my-heading');
    });

    it('does not set aria-labelledby when not provided', () => {
      render(<SectionWrapper>Content</SectionWrapper>);
      const wrapper = screen.getByTestId('section-wrapper');
      expect(wrapper.getAttribute('aria-labelledby')).toBeNull();
    });
  });

  describe('id prop', () => {
    it('forwards id to the root element', () => {
      render(<SectionWrapper id="my-section">Content</SectionWrapper>);
      const wrapper = screen.getByTestId('section-wrapper');
      expect(wrapper.getAttribute('id')).toBe('my-section');
    });
  });

  describe('accessibility (jest-axe)', () => {
    it('has no WCAG violations with default props', async () => {
      const { container } = render(
        <SectionWrapper>
          <h2 id="heading">Section Heading</h2>
          <p>Section content</p>
        </SectionWrapper>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no WCAG violations with aria-labelledby', async () => {
      const { container } = render(
        <SectionWrapper aria-labelledby="section-heading">
          <h2 id="section-heading">Labelled Section</h2>
          <p>Some content</p>
        </SectionWrapper>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no WCAG violations when rendered as div', async () => {
      const { container } = render(
        <SectionWrapper as="div">
          <p>Content in a div</p>
        </SectionWrapper>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
