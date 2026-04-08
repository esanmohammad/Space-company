# Requirements: About Company Page

**Version**: 1.0 | **Date**: 2026-04-08 | **Status**: Ready for Architecture Review

> Status values: `Draft` | `Ready for Analyst Review` | `Pending Clarification` | `Ready for Architecture Review` | `Approved`

---

## 0. Original Requirement

> Preserve verbatim. NEVER modify after creation.

**Raw Request**: Add about company page
**Date**: 2026-04-08 | **Requestor**: Project stakeholder

---

## 1. Summary

**Overview**: Add a new "About" page to the Stellar Horizons space-tourism website that presents the company's story, mission, values, and team. The navigation already includes an `/about` link but the page does not yet exist, resulting in a dead route.

**Business Value**: Builds trust and credibility with potential space-tourism customers by showcasing the company's mission, history, and values. Completes a core informational page that is already referenced in the site navigation.

**Success Criteria**:
- [ ] `/about` route renders the About page without errors
- [ ] Navigation link for "About" correctly routes to the page and shows active state (`aria-current="page"`)
- [ ] Page follows the existing dark space theme and responsive layout patterns
- [ ] Page passes WCAG 2.1 AA accessibility checks
- [ ] All E2E tests for the About page pass in CI

---

## 2. Scope

### In Scope

| ID | Capability | Priority | Description |
|----|------------|----------|-------------|
| F1 | About page route | P0 | Register `/about` route in App.tsx so the existing nav link resolves |
| F2 | Hero section | P0 | Page hero with company headline and sub-headline |
| F3 | Mission & Vision section | P0 | Dedicated section communicating company mission and vision |
| F4 | Company Values section | P0 | Grid of core company values (reuse FeaturesGrid/FeatureCard pattern) |
| F5 | Company Story / History section | P1 | Brief narrative about company founding and milestones |
| F6 | Team / Leadership section | P1 | Highlight key leadership or team culture |
| F7 | CTA Banner | P0 | Call-to-action directing users to Contact or booking |
| F8 | Responsive layout | P0 | Mobile-first responsive design consistent with existing pages |
| F9 | E2E tests | P0 | Playwright tests covering page rendering and navigation |

### Out of Scope
- Dynamic content from a CMS or API — all content is static
- Individual team member profile pages
- Blog or news section
- Careers/jobs listing
- Interactive timeline or animations beyond existing patterns

### Dependencies
- `@space-tourism/ui` component library (Hero, FeaturesGrid, FeatureCard, MissionStrip, CtaBanner, SectionWrapper)
- Ant Design 5.17.0 grid system and theme (spaceTheme with dark algorithm)
- React Router DOM 6.23.0 routing
- Existing Navbar already links to `/about`

---

## 3. Functional Requirements

### User Stories

#### US-1: View About Page
**As a** site visitor **I want** to navigate to the About page **So that** I can learn about Stellar Horizons as a company before considering their services.

**Acceptance Criteria**:
- [ ] Given I am on any page, when I click the "About" nav link, then I am routed to `/about` and the page renders
- [ ] Given I am on the About page, when I view the navbar, then the "About" link has `aria-current="page"`
- [ ] Given I am on the About page, when the page loads, then I see a hero section with a company headline and sub-headline
- [ ] Given I am on the About page, when I scroll down, then I see mission/vision content, company values, and a CTA banner
- [ ] Given I am on the About page, when I view the footer, then the global footer is visible with company info and social links

#### US-2: View Company Values
**As a** potential customer **I want** to see the company's core values **So that** I can assess whether the company aligns with my expectations for safety, quality, and innovation.

**Acceptance Criteria**:
- [ ] Given I am on the About page, when the values section renders, then I see at least 3 value cards displayed in a responsive grid
- [ ] Given I am on mobile (<768px), when I view the values section, then the cards stack vertically in a single column
- [ ] Given I am on desktop (≥992px), when I view the values section, then the cards display in a multi-column layout (up to 3 columns)

#### US-3: Navigate to Contact from About Page
**As a** interested visitor **I want** a clear call-to-action on the About page **So that** I can easily get in touch after learning about the company.

**Acceptance Criteria**:
- [ ] Given I am on the About page, when I see the CTA banner, then it displays a headline and a button labeled to contact or book
- [ ] Given I am on the About page, when I click the CTA button, then I am navigated to `/contact`

#### US-4: Responsive About Page
**As a** mobile user **I want** the About page to be fully usable on small screens **So that** I have a good experience regardless of device.

**Acceptance Criteria**:
- [ ] Given I am on a mobile viewport (375px wide), when the About page loads, then there is no horizontal overflow
- [ ] Given I am on a mobile viewport, when I view all sections, then text is readable and images/cards are appropriately sized
- [ ] Given I am on a tablet viewport (768px), when I view the page, then the layout adjusts to utilize available space

### State Diagram

```
[Route /about] → [Page Render]
  → [Hero Section] (static)
  → [Mission/Vision Section] (static)
  → [Values Grid Section] (static)
  → [Company Story Section] (static, if implemented)
  → [Team Section] (static, if implemented)
  → [CTA Banner] (static, CTA click → navigate /contact)
```

> Note: This is a fully static page with no loading/error/empty states required. All content is hardcoded.

### Business Rules

| ID | Rule | Validation |
|----|------|------------|
| BR-1 | All text content is static (no API calls) | No loading spinners or error states needed |
| BR-2 | Values grid displays between 3 and 6 cards | FeaturesGrid component enforces max 6 |
| BR-3 | CTA button navigates to `/contact` | Click triggers `navigate('/contact')` via React Router |
| BR-4 | Page must use the existing spaceTheme | Visual consistency with Landing and Contact pages |
| BR-5 | Page reuses existing UI components where possible | Minimize new component creation |

---

## 4. Data Requirements

### Sources

| Source | Type | Description |
|--------|------|-------------|
| Static content | Hardcoded | All page content defined in component or constants file |

### Schema

```typescript
interface CompanyValue {
  id: string;
  icon: string;       // Ant Design icon name (e.g., "SafetyCertificateOutlined")
  title: string;
  description: string;
}

interface AboutPageContent {
  hero: {
    headline: string;
    subHeadline: string;
  };
  mission: {
    title: string;
    body: string;
  };
  values: CompanyValue[];  // 3–6 items
  story?: {
    title: string;
    body: string;
  };
  cta: {
    headline: string;
    ctaLabel: string;
  };
}
```

### State Management

- **Redux**: N/A — no global state needed; page is entirely static
- **Local**: Minimal — only React Router navigation state
- **URL**: `/about` route; no query parameters or shareable state needed

---

## 5. UI/UX

- **Wireframes**: No Figma designs provided. Follow the visual pattern established by LandingPage.tsx (Hero → content sections → CTA Banner).

- **Component structure**:
  ```
  AboutPage
  ├── Hero (headline: company tagline, subHeadline: brief description)
  ├── SectionWrapper
  │   └── MissionStrip (title: "Our Mission", body: mission text)
  ├── SectionWrapper
  │   └── FeaturesGrid (sectionTitle: "Our Values", features: CompanyValue[])
  │       └── FeatureCard × 3–6
  ├── SectionWrapper (optional P1)
  │   └── Company Story section (custom or MissionStrip reuse)
  ├── SectionWrapper (optional P1)
  │   └── Team/Leadership section
  └── CtaBanner (headline: "Ready to Explore?", ctaLabel: "Get in Touch")
  ```

- **Responsive**:
  - Mobile (<768px): Single-column layout, stacked cards, full-width sections, readable font sizes
  - Tablet (768–991px): Two-column grid for value cards
  - Desktop (≥992px): Three-column grid for value cards, max-width 1200px centered content

- **Accessibility**:
  - WCAG 2.1 AA compliance
  - Keyboard navigation: all interactive elements (CTA button, nav links) focusable and operable via keyboard
  - Semantic HTML: `<section>`, `<article>`, appropriate headings hierarchy (h1 for hero, h2 for section titles)
  - `aria-labelledby` on sections via SectionWrapper
  - Sufficient color contrast per existing spaceTheme (light text on dark backgrounds)

- **Design tokens** (from spaceTheme.ts):
  - Background: `#0A0A0F` (base), `#14141F` (container)
  - Text: `#E8E8E8` (primary), `#8A8A9A` (secondary)
  - Primary accent: `#4F8EF7`
  - Border: `#2A2A3A`
  - Border radius: 4px

---

## 6. Non-Functional Requirements

- **Performance**: Page load < 1000ms (static content, no API calls); Lighthouse performance score ≥ 90; no additional bundle impact beyond page component
- **Browser support**: Chrome (latest 2), Firefox (latest 2), Safari (latest 2), Edge (latest 2) — consistent with existing app
- **i18n**: English only; no RTL support required; no localization infrastructure needed
- **Security**: No user input on this page; no API calls; no special security considerations. Standard CSP headers apply.

---

## 7. Integration

### Affected Packages

| Package | Impact | Changes |
|---------|--------|---------|
| `apps/web` | High | Add AboutPage component, register `/about` route in App.tsx |
| `@space-tourism/ui` | Low | No new components needed — reuse Hero, FeaturesGrid, FeatureCard, MissionStrip, CtaBanner, SectionWrapper |
| `e2e` | Medium | Add `about.spec.ts` with page rendering and navigation tests |

### API Contracts

N/A — This is a static page with no API calls.

---

## 8. Testing

### Unit
- [ ] AboutPage component renders without crashing
- [ ] Hero section displays headline and sub-headline
- [ ] Values section renders the correct number of value cards (3–6)
- [ ] CTA button has correct navigation target (`/contact`)

### Integration
- [ ] Navigating to `/about` renders the AboutPage within the app shell (Navbar + Footer)
- [ ] "About" nav link shows `aria-current="page"` when on `/about`
- [ ] CTA button click navigates to `/contact`

### E2E Scenarios (Playwright)

- [ ] E2E-1: **About page loads** — Steps: navigate to `/about`, verify hero headline visible, verify mission section visible, verify values grid has ≥3 cards, verify CTA banner visible, verify footer visible
- [ ] E2E-2: **Navigation to About** — Steps: navigate to `/`, click "About" nav link, verify URL is `/about`, verify `aria-current="page"` on About link
- [ ] E2E-3: **CTA navigates to Contact** — Steps: navigate to `/about`, click CTA button, verify URL is `/contact`
- [ ] E2E-4: **Mobile responsive** — Steps: set viewport to 375×667, navigate to `/about`, verify no horizontal overflow (`scrollWidth <= clientWidth`), verify hamburger menu visible
- [ ] E2E-5: **Multi-column layout on desktop** — Steps: set viewport to 1280×720, navigate to `/about`, verify value cards are in multi-column layout (card positions differ in Y-axis)
- **Auth required**: No — public page
- **Figma reference**: N/A

---

## 9. Rollout

- **Feature flag**: N/A — the `/about` nav link already exists in production navigation; the page simply needs to resolve. No feature flag needed for a standard informational page.
- **Phases**:
  1. Implement P0 items (route, hero, mission, values, CTA, responsive, tests)
  2. Implement P1 items (company story, team/leadership sections)
  3. Content review and refinement

---

## 10. Open Questions

| ID | Question | Owner | Due | Status |
|----|----------|-------|-----|--------|
| Q1 | What specific company values should be displayed? (Assumed: Safety, Innovation, Sustainability, Excellence based on space-tourism context) | Content/Product | TBD | Open |
| Q2 | Should the company story section include specific founding year and milestones, or general narrative? (Assumed: general narrative for v1) | Content/Product | TBD | Open |
| Q3 | Is a team/leadership section needed for v1, or is it deferred? (Assumed: P1, deferred) | Product | TBD | Open |
| Q4 | Should the hero have a background image? If so, which asset? (Assumed: optional, can use CSS gradient like existing pages) | Design | TBD | Open |
| Q5 | Is there approved copy/content for the About page, or should placeholder content be used? (Assumed: placeholder content for initial implementation) | Content/Product | TBD | Open |

---

## 11. Change Tracking

> When updating: use `~~strikethrough~~` for old text, add new text after, update version, set status to `Ready for Analyst Review`.

| Version | Date | Author | Changes | Status |
|---------|------|--------|---------|--------|
| 1.0 | 2026-04-08 | Analyst | Initial requirements | Ready for Architecture Review |

---

## 12. Appendix

- **Glossary**:
  - **Stellar Horizons**: The company brand name for this space-tourism website
  - **spaceTheme**: The Ant Design theme configuration (`spaceTheme.ts`) defining colors, typography, and dark algorithm
  - **SectionWrapper**: A reusable layout component providing consistent max-width and padding for page sections
  - **FeaturesGrid**: A responsive grid component that renders up to 6 FeatureCard items
  - **MissionStrip**: A full-width content section component with title and body text

- **References**:
  - Existing pages: `apps/web/src/pages/LandingPage.tsx`, `apps/web/src/pages/ContactPage.tsx`
  - Navigation config: `apps/web/src/navLinks.ts`
  - App shell: `apps/web/src/App.tsx`
  - UI components: `packages/ui/src/components/`
  - Theme: `packages/ui/src/theme/spaceTheme.ts`
  - E2E fixtures: `e2e/e2e/fixtures.ts`
  - Playwright config: `e2e/playwright.config.ts`
