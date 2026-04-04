# TESTPLAN.md — Space Tourism Company: Landing Page & Contact Page

**Version**: 1.0 | **Date**: 2026-04-04 | **Based on**: REQUIREMENTS.md v1.0, SPEC.md, TASKS.md

---

## Overview

### What Is Being Tested
A two-page marketing website for a fictional space tourism company built inside a Turborepo monorepo. The application consists of:

- **Landing page** (`/`): Hero section, feature cards grid, mission strip, CTA banner
- **Contact page** (`/contact`): Validated contact form + company info block
- **Shared components**: Navbar (responsive with mobile drawer), Footer
- **Client-side routing**: React Router v6 BrowserRouter between the two pages
- **Contact form state machine**: idle → dirty → submitting → success/error → idle
- **Responsive behaviour**: Three breakpoints (mobile < 768 px, tablet 768–1024 px, desktop > 1024 px)

### Feature Scope
| Feature | Priority | Test Coverage |
|---------|----------|---------------|
| F1 — Turborepo monorepo scaffold | P0 | Build pipeline verification (E2E setup) |
| F2 — Shared UI package (`packages/ui`) | P0 | Unit tests per component |
| F3 — Landing page Hero section | P0 | Unit + E2E |
| F4 — Landing page Features section | P0 | Unit |
| F5 — Landing page Mission strip | P1 | Unit |
| F6 — Landing page CTA banner | P1 | Unit + E2E |
| F7 — Contact form with validation | P0 | Unit + Integration + E2E |
| F8 — Company info block | P1 | Unit |
| F9 — Shared Navbar (desktop + mobile) | P0 | Unit + Integration + E2E |
| F10 — Shared Footer | P1 | Unit |
| F11 — Client-side routing | P0 | Integration + E2E |
| F12 — Minimalist space theme | P0 | Unit (token values) |

### Risk Areas
- **Contact form state machine**: Most complex component; six validation rules (BR-1–BR-6); async mock submission; notification/reset flow
- **Mobile Navbar Drawer**: Hamburger toggle, Escape-key close, link-click-then-close sequence
- **Responsive no-overflow**: Horizontal scroll must not appear at 320–375 px viewports
- **Ant Design theme tokens**: `ConfigProvider` colour contrast must meet WCAG 2.1 AA (≥ 4.5:1)
- **Route-level lazy loading**: `React.lazy` + `Suspense` boundary; Suspense fallback renders during chunk load
- **Bundle size**: Total gzipped JS must stay under 300 KB; `@ant-design/icons` barrel import must not occur

---

## Test Strategy

### Frameworks
| Framework | Version | Purpose | Config File |
|-----------|---------|---------|-------------|
| **Vitest** | ≥ 1.x | Unit & integration tests | `packages/ui/vitest.config.ts` |
| **React Testing Library** | ≥ 14.x | Component rendering & user interactions | — |
| `@testing-library/user-event` | ≥ 14.x | Realistic DOM event simulation | — |
| `@testing-library/jest-dom` | ≥ 6.x | Custom matchers (`toBeInTheDocument`, etc.) | — |
| `jest-axe` | ≥ 8.x | WCAG 2.1 AA automated accessibility checks | — |
| **Playwright** | ≥ 1.40 | End-to-end browser tests | `e2e/playwright.config.ts` |

### Test Categories
| Category | Framework | Target | Directory |
|----------|-----------|--------|-----------|
| Unit | Vitest + RTL | Individual components and utility functions | `packages/ui/src/components/**/*.test.tsx` |
| Integration | Vitest + RTL | Multi-component flows; routing; form lifecycle | `packages/ui/src/components/**/*.test.tsx` |
| E2E | Playwright | Full browser flows; responsive; navigation | `e2e/*.spec.ts` |

### Browsers (Playwright)
| Browser | Engine | Priority |
|---------|--------|----------|
| Chromium (Desktop) | Blink | P0 — primary |
| Firefox (Desktop) | Gecko | P1 |
| WebKit / Safari (Desktop) | WebKit | P1 |
| Chromium (Mobile — 375×812) | Blink | P0 — responsive tests |

### Environments
- **Unit/Integration**: JSDOM (Vitest default); base URL not required
- **E2E**: `http://localhost:5173` (Vite dev server); `webServer` block in Playwright config starts `pnpm turbo dev` and awaits port 5173

### Parallelisation
- Vitest: default thread-pool parallelism across test files
- Playwright: `workers: 2` minimum; each E2E spec file runs independently; no shared browser state between files

### Coverage Split Target
- 60 % unit · 30 % integration · 10 % E2E (per SPEC.md)

---

## Authentication

No authentication is required for any feature in v1.0. The application has no login flow, protected routes, or session management.

- **storageState**: Not applicable
- **Global setup**: Not required for auth; Playwright `webServer` block handles dev-server startup
- **Multi-role testing**: Not applicable
- **Future consideration**: If auth is introduced in a later phase, a `global-setup.ts` storageState approach (Playwright) should be added at that point

---

## Test Data

### Static Content Constants (used by unit + integration tests)
| Constant | File | Used In |
|----------|------|---------|
| `FEATURE_CARDS` | `packages/ui/src/constants/featureCards.ts` | `FeaturesGrid`, `LandingPage` |
| `COMPANY_INFO` | `packages/ui/src/constants/companyInfo.ts` | `CompanyInfoBlock`, `ContactPage` |
| `NAV_LINKS` | `packages/ui/src/constants/navLinks.ts` | `Navbar`, `App.tsx` |

All static content is hardcoded (no external API). Tests may import these constants directly or supply inline fixtures to isolate component behaviour.

### Mock Submit Utility
- File: `packages/ui/src/utils/mockSubmit.ts`
- Default behaviour: resolves `{ success: true, message: 'Message received' }` after ~1500 ms via `setTimeout`
- Error simulation: `mockContactSubmit(values, { simulateError: true })` throws `new Error('Network error')`
- Unit/integration tests must pass an `onSubmit` prop override to `ContactForm` to:
  - Control timing (use `vi.useFakeTimers()` to avoid 1500 ms waits)
  - Simulate error paths without env-var changes

### Vitest Timer Mocking
- Use `vi.useFakeTimers()` in `ContactForm` async tests
- Advance timers with `vi.advanceTimersByTimeAsync(1500)` to trigger mock resolution
- Always call `vi.useRealTimers()` in `afterEach`

### Inline Fixtures (for unit tests)
```typescript
// Minimum valid ContactFormValues
const VALID_FORM_DATA = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  subject: 'Space inquiry',
  message: 'I would like to book a trip to Mars.',
};

// Minimum valid FeatureCardData set (3 items)
const MOCK_FEATURES: FeatureCardData[] = [
  { id: '1', icon: <span />, title: 'Destinations', description: 'Explore the cosmos.' },
  { id: '2', icon: <span />, title: 'Safety',       description: 'Your safety first.'   },
  { id: '3', icon: <span />, title: 'Experience',   description: 'Unforgettable.'        },
];

// Minimum valid CompanyInfo
const MOCK_COMPANY_INFO: CompanyInfo = {
  address: '1 Space Lane, Houston TX',
  email: 'hello@astrovoyage.com',
  phone: '+1 800 SPACE GO',
  tagline: 'Beyond the stars.',
};
```

### E2E Test Data
All E2E tests use hardcoded inline data; no test database or seed scripts are needed (all content is static).

```
Valid form fill (E2E):
  name:    "Jane Doe"
  email:   "jane@example.com"
  subject: "Space inquiry"
  message: "I would like to book a trip to Mars and explore the cosmos."
```

### Environment Variables
| Variable | Purpose | Required For |
|----------|---------|-------------|
| `VITE_SIMULATE_ERROR` | (Optional, Q8) Toggle error path in mock without code change | E2E error-path tests, if implemented |

---

## E2E Test Cases

> Tests are grouped by spec file. Each Playwright test is independent — no ordering dependency.

---

### TC-001: Landing Page Hero Section Renders

**User Story**: US-1 — View the Landing Page
**Priority**: P0
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`
- [ ] No authentication required

**Steps**:
1. Navigate to `http://localhost:5173/`
2. Wait for the page to reach network idle
3. Assert the `<h1>` hero headline is visible in the viewport
4. Assert the hero sub-headline text is visible
5. Assert the "Get in Touch" (or equivalent) primary CTA button is visible
6. Assert at least 3 feature cards are present in the DOM (`article` elements or equivalent)
7. Scroll to the bottom of the page
8. Assert the `<footer>` element is visible

**Expected**:
- [ ] `<h1>` heading is visible and non-empty
- [ ] Hero CTA button is visible with a label matching `/get in touch/i` or the configured label
- [ ] At least 3 feature card headings (`h3`) are present and visible
- [ ] Footer is visible after scroll; contains copyright text

**File**: `e2e/landing.spec.ts`

---

### TC-002: CTA Button Navigates to Contact Page

**User Story**: US-1 — Click CTA navigates to `/contact`
**Priority**: P0
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`

**Steps**:
1. Navigate to `http://localhost:5173/`
2. Click the primary CTA button in the Hero section
3. Wait for navigation to complete

**Expected**:
- [ ] URL becomes `http://localhost:5173/contact`
- [ ] Contact page heading (e.g., "Contact Us") is visible
- [ ] Contact form fields (Name, Email, Subject, Message) are present

**File**: `e2e/landing.spec.ts`

---

### TC-003: CTA Banner Button Also Navigates to Contact Page

**User Story**: US-1 — Bottom CTA banner navigates to `/contact`
**Priority**: P1
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`

**Steps**:
1. Navigate to `http://localhost:5173/`
2. Scroll to the bottom of the page to bring `CtaBanner` into view
3. Click the CTA button inside the `CtaBanner` section
4. Wait for navigation to complete

**Expected**:
- [ ] URL becomes `http://localhost:5173/contact`
- [ ] Contact page is displayed

**File**: `e2e/landing.spec.ts`

---

### TC-004: Navbar "Contact" Link Navigates to Contact Page

**User Story**: US-2 — Navigate Between Pages
**Priority**: P0
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`
- [ ] Desktop viewport (1280×800)

**Steps**:
1. Navigate to `http://localhost:5173/`
2. Locate the "Contact" link in the navigation bar
3. Click the "Contact" link
4. Wait for navigation to complete

**Expected**:
- [ ] URL becomes `http://localhost:5173/contact`
- [ ] Contact page heading is visible
- [ ] "Contact" nav link has `aria-current="page"` attribute
- [ ] "Home" nav link does NOT have `aria-current="page"`

**File**: `e2e/navigation.spec.ts`

---

### TC-005: Navbar "Home" Link Navigates Back to Landing Page

**User Story**: US-2 — Navigate Between Pages
**Priority**: P0
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`
- [ ] Desktop viewport (1280×800)
- [ ] Currently on `/contact` page

**Steps**:
1. Navigate to `http://localhost:5173/contact`
2. Locate the "Home" link in the navigation bar
3. Click the "Home" link
4. Wait for navigation to complete

**Expected**:
- [ ] URL becomes `http://localhost:5173/`
- [ ] Hero `<h1>` heading is visible
- [ ] "Home" nav link has `aria-current="page"` attribute
- [ ] "Contact" nav link does NOT have `aria-current="page"`

**File**: `e2e/navigation.spec.ts`

---

### TC-006: Footer Is Visible on Both Pages

**User Story**: US-2 — Footer present on all pages
**Priority**: P1
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`

**Steps**:
1. Navigate to `http://localhost:5173/`
2. Scroll to the bottom of the page
3. Assert `<footer>` element is visible
4. Navigate to `http://localhost:5173/contact`
5. Scroll to the bottom of the page
6. Assert `<footer>` element is visible

**Expected**:
- [ ] Footer element (`<footer>`) is present and visible on the landing page
- [ ] Footer element (`<footer>`) is present and visible on the contact page
- [ ] Footer contains copyright text on both pages

**File**: `e2e/navigation.spec.ts`

---

### TC-007: Contact Form Shows Validation Errors on Empty Submit

**User Story**: US-3 — Submit the Contact Form (validation failure path)
**Priority**: P0
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`
- [ ] Form fields are empty (initial state)

**Steps**:
1. Navigate to `http://localhost:5173/contact`
2. Click the Submit button without filling any fields
3. Wait for validation to complete

**Expected**:
- [ ] Inline error message appears below the Name field (required error)
- [ ] Inline error message appears below the Email field (required error)
- [ ] Inline error message appears below the Subject field (required error)
- [ ] Inline error message appears below the Message field (required error)
- [ ] Form does NOT show a success notification
- [ ] URL remains `/contact`

**File**: `e2e/contact-form.spec.ts`

---

### TC-008: Contact Form Shows Email Format Validation Error

**User Story**: US-3 — Email validation (BR-2)
**Priority**: P0
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`

**Steps**:
1. Navigate to `http://localhost:5173/contact`
2. Fill the Email field with `"not-a-valid-email"`
3. Tab away from the Email field (blur event) OR click the Submit button
4. Wait for validation feedback

**Expected**:
- [ ] An inline error message matching `/valid email/i` or `/invalid email/i` appears below the Email field
- [ ] No success notification appears

**File**: `e2e/contact-form.spec.ts`

---

### TC-009: Contact Form Happy Path — Fill, Submit, Loading, Success, Reset

**User Story**: US-3 — Submit the Contact Form (happy path)
**Priority**: P0
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`

**Steps**:
1. Navigate to `http://localhost:5173/contact`
2. Fill the Name field with `"Jane Doe"`
3. Fill the Email field with `"jane@example.com"`
4. Fill the Subject field with `"Space inquiry"`
5. Fill the Message field with `"I would like to book a trip to Mars and explore the cosmos."`
6. Click the Submit button
7. Immediately assert the submit button is disabled
8. Wait for the success notification to appear (up to 5000 ms)
9. Assert the form fields are cleared

**Expected**:
- [ ] Submit button becomes disabled immediately after click (loading state)
- [ ] Success notification appears containing text matching `/sent/i` or `/touch/i`
- [ ] After success, Name field value is empty (`""`)
- [ ] After success, Email field value is empty (`""`)
- [ ] After success, Subject field value is empty (`""`)
- [ ] After success, Message field value is empty (`""`)
- [ ] Submit button is re-enabled after success (form returns to idle state)

**File**: `e2e/contact-form.spec.ts`

---

### TC-010: Contact Form Submit Button Is Disabled While Submitting

**User Story**: US-3 — BR-5: Submit button disabled while submitting
**Priority**: P0
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`
- [ ] Valid form data ready

**Steps**:
1. Navigate to `http://localhost:5173/contact`
2. Fill all fields with valid data (same as TC-009)
3. Click the Submit button
4. Assert button state before the 1500 ms mock delay expires

**Expected**:
- [ ] Submit button has `disabled` attribute immediately after click
- [ ] Submit button shows a loading indicator (AntD `loading` prop spinner) during submission
- [ ] Submit button is not clickable a second time while loading

**File**: `e2e/contact-form.spec.ts`

---

### TC-011: Contact Page Shows Company Info Block

**User Story**: US-4 — View Company Contact Information
**Priority**: P1
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`

**Steps**:
1. Navigate to `http://localhost:5173/contact`
2. Wait for the page to load completely

**Expected**:
- [ ] A company address text is visible on the page
- [ ] A `mailto:` email link is visible (contains `@`)
- [ ] A `tel:` phone link is visible
- [ ] The company info is within an `<address>` element

**File**: `e2e/contact-form.spec.ts`

---

### TC-012: Mobile Navbar — Hamburger Button Visible at 375 px

**User Story**: US-2 — Mobile navbar hamburger; US-5 — Responsive design
**Priority**: P0
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`
- [ ] Viewport set to 375×812 (iPhone SE portrait)

**Steps**:
1. Set viewport to `{ width: 375, height: 812 }`
2. Navigate to `http://localhost:5173/`
3. Assert the hamburger/menu button is visible
4. Assert desktop inline nav links are NOT visible

**Expected**:
- [ ] A button with `aria-label` matching `/open navigation/i` or `/menu/i` is visible
- [ ] Inline desktop navigation links ("Home", "Contact") are not visible (hidden via CSS)

**File**: `e2e/mobile-navbar.spec.ts`

---

### TC-013: Mobile Navbar — Drawer Opens with Navigation Links

**User Story**: US-2 — Mobile hamburger drawer; US-5 — Responsive
**Priority**: P0
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`
- [ ] Viewport set to 375×812

**Steps**:
1. Set viewport to `{ width: 375, height: 812 }`
2. Navigate to `http://localhost:5173/`
3. Click the hamburger/menu button
4. Wait for the drawer to open

**Expected**:
- [ ] Navigation drawer is visible
- [ ] "Home" link is visible inside the drawer
- [ ] "Contact" link is visible inside the drawer

**File**: `e2e/mobile-navbar.spec.ts`

---

### TC-014: Mobile Navbar — Drawer Closes After Link Click and Navigates

**User Story**: US-2 — Mobile drawer link navigation
**Priority**: P0
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`
- [ ] Viewport set to 375×812
- [ ] Mobile drawer is open

**Steps**:
1. Set viewport to `{ width: 375, height: 812 }`
2. Navigate to `http://localhost:5173/`
3. Click the hamburger button to open the drawer
4. Click the "Contact" link inside the drawer
5. Wait for navigation and drawer close

**Expected**:
- [ ] URL becomes `http://localhost:5173/contact`
- [ ] Drawer is no longer visible (closed after link click)
- [ ] Contact page heading is visible

**File**: `e2e/mobile-navbar.spec.ts`

---

### TC-015: Mobile Navbar — Drawer Closes on Escape Key

**User Story**: US-2 — Keyboard accessibility for mobile drawer
**Priority**: P1
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`
- [ ] Viewport set to 375×812

**Steps**:
1. Set viewport to `{ width: 375, height: 812 }`
2. Navigate to `http://localhost:5173/`
3. Click the hamburger button to open the drawer
4. Wait for the drawer to open
5. Press the `Escape` key

**Expected**:
- [ ] Drawer closes after Escape key press
- [ ] URL remains `/` (no navigation occurred)

**File**: `e2e/mobile-navbar.spec.ts`

---

### TC-016: No Horizontal Overflow at Mobile Viewport (Landing Page)

**User Story**: US-5 — Responsive design, no horizontal scroll
**Priority**: P0
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`
- [ ] Viewport set to 375×812

**Steps**:
1. Set viewport to `{ width: 375, height: 812 }`
2. Navigate to `http://localhost:5173/`
3. Wait for full page load
4. Evaluate `document.documentElement.scrollWidth` vs `window.innerWidth`
5. Scroll to the bottom of the page
6. Re-evaluate scroll width after scroll

**Expected**:
- [ ] `document.documentElement.scrollWidth <= window.innerWidth` (no horizontal scrollbar)
- [ ] No section causes content to overflow the 375 px boundary

**File**: `e2e/landing.spec.ts`

---

### TC-017: No Horizontal Overflow at Mobile Viewport (Contact Page)

**User Story**: US-5 — Responsive design, no horizontal scroll on contact page
**Priority**: P1
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`
- [ ] Viewport set to 375×812

**Steps**:
1. Set viewport to `{ width: 375, height: 812 }`
2. Navigate to `http://localhost:5173/contact`
3. Wait for full page load
4. Evaluate `document.documentElement.scrollWidth` vs `window.innerWidth`

**Expected**:
- [ ] `document.documentElement.scrollWidth <= window.innerWidth`
- [ ] Contact form and company info block do not overflow on mobile

**File**: `e2e/mobile-navbar.spec.ts`

---

### TC-018: Feature Cards Render in Multi-Column Grid at Desktop

**User Story**: US-5 — Feature cards display in multi-column grid at ≥ 1024 px
**Priority**: P1
**Framework**: Playwright
**Category**: E2E

**Preconditions**:
- [ ] Dev server running at `http://localhost:5173`
- [ ] Viewport set to 1280×800

**Steps**:
1. Set viewport to `{ width: 1280, height: 800 }`
2. Navigate to `http://localhost:5173/`
3. Locate the features grid section
4. Evaluate the bounding boxes of the first 3 feature cards

**Expected**:
- [ ] At least 3 feature card `article` elements are visible
- [ ] Cards are arranged in multiple columns (cards in the same row share the same `top` bounding position)

**File**: `e2e/landing.spec.ts`

---

### TC-019: SectionWrapper — Renders Correct Semantic Element

**User Story**: US-1 — Foundational layout component
**Priority**: P1
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `SectionWrapper` component imported

**Input**:
```typescript
render(<SectionWrapper>Test content</SectionWrapper>)
render(<SectionWrapper as="div">Test content</SectionWrapper>)
```

**Steps**:
1. Render `<SectionWrapper>children</SectionWrapper>` with no `as` prop; assert root is `<section>`
2. Render with `as="div"`; assert root is `<div>`
3. Render with `as="article"`; assert root is `<article>`
4. Verify `className` prop applied to root element
5. Verify `aria-labelledby` forwarded to root element
6. Run `jest-axe` on each render

**Expected**:
- [ ] Default renders `<section>` element in the DOM
- [ ] `as="div"` renders `<div>` element
- [ ] `className` prop is applied to the root element
- [ ] `aria-labelledby` prop is forwarded to the root element
- [ ] `jest-axe` reports zero WCAG violations

**File**: `packages/ui/src/components/SectionWrapper/SectionWrapper.test.tsx`

---

### TC-020: FeatureCard — Renders Title, Description, and Icon

**User Story**: US-2 — Landing page Features section (F4, BR-7)
**Priority**: P0
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `FeatureCard` component imported

**Input**:
```typescript
const props = {
  id: '1',
  icon: <span data-testid="icon" />,
  title: 'Destinations',
  description: 'Explore the cosmos.'
};
render(<FeatureCard {...props} />)
```

**Steps**:
1. Render the component with the above props
2. Assert title rendered inside `<h3>`
3. Assert description text present
4. Assert icon container has `aria-hidden="true"`
5. Assert root element is `<article>`
6. Run `jest-axe`

**Expected**:
- [ ] `getByRole('heading', { level: 3, name: 'Destinations' })` is in the document
- [ ] `getByText('Explore the cosmos.')` is in the document
- [ ] Icon wrapper element has `aria-hidden="true"`
- [ ] Root element is `<article>` (semantic landmark)
- [ ] `jest-axe` reports zero WCAG violations

**File**: `packages/ui/src/components/FeatureCard/FeatureCard.test.tsx`

---

### TC-021: FeaturesGrid — Renders 3 to 6 Cards Correctly

**User Story**: US-2 — Features section renders between 3 and 6 cards (BR-7)
**Priority**: P0
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `FeaturesGrid` component imported
- [ ] `MOCK_FEATURES` fixture with 3 items

**Input**: `features` array with 3 valid `FeatureCardData` items; `sectionTitle="Our Features"`

**Steps**:
1. Render `<FeaturesGrid features={MOCK_FEATURES} sectionTitle="Our Features" />`
2. Assert 3 `article` elements rendered
3. Assert `<h2>` heading contains "Our Features"
4. Run `jest-axe`

**Expected**:
- [ ] 3 `article` elements are in the document
- [ ] `getByRole('heading', { level: 2, name: 'Our Features' })` is present
- [ ] `jest-axe` reports zero WCAG violations

**File**: `packages/ui/src/components/FeaturesGrid/FeaturesGrid.test.tsx`

---

### TC-022: FeaturesGrid — Warns and Truncates When > 6 Cards Provided

**User Story**: US-2 — Features section enforcement (BR-7)
**Priority**: P1
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `FeaturesGrid` component imported
- [ ] `console.warn` spy via `vi.spyOn(console, 'warn')`

**Input**: `features` array with 8 valid `FeatureCardData` items

**Steps**:
1. Spy on `console.warn`
2. Render `<FeaturesGrid features={eightItemArray} />`
3. Assert `console.warn` was called
4. Assert only 6 `article` elements rendered

**Expected**:
- [ ] `console.warn` called at least once (dev warning about count > 6)
- [ ] Exactly 6 `article` elements rendered (sliced to first 6)

**File**: `packages/ui/src/components/FeaturesGrid/FeaturesGrid.test.tsx`

---

### TC-023: FeaturesGrid — Warns When < 3 Cards Provided

**User Story**: US-2 — Feature card minimum count enforcement
**Priority**: P1
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `FeaturesGrid` component imported
- [ ] `console.warn` spy configured

**Input**: `features` array with 2 `FeatureCardData` items

**Steps**:
1. Spy on `console.warn`
2. Render `<FeaturesGrid features={twoItemArray} />`
3. Assert `console.warn` was called
4. Assert 2 `article` elements rendered (graceful degradation)

**Expected**:
- [ ] `console.warn` called (dev warning about count < 3)
- [ ] 2 `article` elements rendered (renders available cards)

**File**: `packages/ui/src/components/FeaturesGrid/FeaturesGrid.test.tsx`

---

### TC-024: Hero — Renders Headline, Sub-Headline, and CTA Button

**User Story**: US-1 — Landing page Hero (F3)
**Priority**: P0
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `Hero` component imported
- [ ] `onCtaClick` mock via `vi.fn()`

**Input**:
```typescript
{
  headline: 'Beyond the Stars',
  subHeadline: 'Your journey starts here',
  ctaLabel: 'Get in Touch',
  onCtaClick: vi.fn()
}
```

**Steps**:
1. Render `<Hero {...props} />`
2. Assert `<h1>` with headline text is present
3. Assert sub-headline text is present
4. Assert CTA button with label "Get in Touch" is present
5. Click the CTA button
6. Assert `onCtaClick` called exactly once
7. Assert no `<img>` element rendered for the background
8. Run `jest-axe`

**Expected**:
- [ ] `getByRole('heading', { level: 1, name: /beyond the stars/i })` is in the document
- [ ] Sub-headline text is in the document
- [ ] `getByRole('button', { name: /get in touch/i })` is in the document
- [ ] `onCtaClick` called exactly once after button click
- [ ] No `<img>` element in the rendered output (background is CSS only)
- [ ] `jest-axe` reports zero WCAG violations

**File**: `packages/ui/src/components/Hero/Hero.test.tsx`

---

### TC-025: MissionStrip — Renders Title and Body Text

**User Story**: US-1 — Landing page Mission strip (F5)
**Priority**: P1
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `MissionStrip` component imported

**Input**: `{ title: 'Our Mission', body: 'We take you to the stars safely and sustainably.' }`

**Steps**:
1. Render `<MissionStrip title="Our Mission" body="We take you to the stars safely and sustainably." />`
2. Assert `<h2>` with title text is present
3. Assert body text is present
4. Assert no `<img>` element rendered for background
5. Run `jest-axe`

**Expected**:
- [ ] `getByRole('heading', { level: 2, name: /our mission/i })` is in the document
- [ ] Body text content is in the document
- [ ] No `<img>` element for background (decorative CSS only)
- [ ] `jest-axe` reports zero WCAG violations

**File**: `packages/ui/src/components/MissionStrip/MissionStrip.test.tsx`

---

### TC-026: CtaBanner — Renders Headline and Calls onCtaClick

**User Story**: US-1 — Landing page CTA banner (F6)
**Priority**: P1
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `CtaBanner` component imported
- [ ] `onCtaClick` mock via `vi.fn()`

**Input**: `{ headline: 'Ready to Launch?', ctaLabel: 'Contact Us', onCtaClick: vi.fn() }`

**Steps**:
1. Render `<CtaBanner headline="Ready to Launch?" ctaLabel="Contact Us" onCtaClick={mockFn} />`
2. Assert headline text is present
3. Assert CTA button with correct label is present
4. Click the button
5. Assert `onCtaClick` called exactly once
6. Run `jest-axe`

**Expected**:
- [ ] Headline text "Ready to Launch?" is in the document
- [ ] `getByRole('button', { name: /contact us/i })` is in the document
- [ ] `onCtaClick` called exactly once after button click
- [ ] `jest-axe` reports zero WCAG violations

**File**: `packages/ui/src/components/CtaBanner/CtaBanner.test.tsx`

---

### TC-027: CompanyInfoBlock — Renders Address, Email Link, Phone Link

**User Story**: US-4 — View Company Contact Information (F8)
**Priority**: P1
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `CompanyInfoBlock` component imported
- [ ] `MOCK_COMPANY_INFO` fixture

**Input**: `{ companyInfo: MOCK_COMPANY_INFO }`

**Steps**:
1. Render `<CompanyInfoBlock companyInfo={MOCK_COMPANY_INFO} />`
2. Assert address text is present inside an `<address>` element
3. Assert `<a href="mailto:hello@astrovoyage.com">` is present
4. Assert phone link has `href` starting with `tel:`
5. Assert tagline text is present
6. Run `jest-axe`

**Expected**:
- [ ] `<address>` element contains address text
- [ ] Email link has `href` starting with `mailto:`
- [ ] Phone link has `href` starting with `tel:`
- [ ] Tagline text is in the document
- [ ] `jest-axe` reports zero WCAG violations

**File**: `packages/ui/src/components/CompanyInfoBlock/CompanyInfoBlock.test.tsx`

---

### TC-028: Navbar — Renders Brand Name and Navigation Links (Desktop)

**User Story**: US-2 — Navigate Between Pages; US-7 — Shared Navbar (F9)
**Priority**: P0
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `Navbar` component imported
- [ ] `MemoryRouter` wrapper provided (React Router context)

**Input**:
```typescript
{
  brandName: 'AstroVoyage',
  links: [{ label: 'Home', to: '/' }, { label: 'Contact', to: '/contact' }],
  currentPath: '/'
}
```

**Steps**:
1. Render `<Navbar {...props} />` inside `MemoryRouter`
2. Assert brand name "AstroVoyage" is visible
3. Assert "Home" link present with `aria-current="page"` (active route is `/`)
4. Assert "Contact" link present without `aria-current`
5. Assert `<nav>` landmark present
6. Run `jest-axe`

**Expected**:
- [ ] Brand name "AstroVoyage" is in the document
- [ ] `getByRole('link', { name: 'Home' })` has `aria-current="page"`
- [ ] `getByRole('link', { name: 'Contact' })` does not have `aria-current`
- [ ] A `<nav>` landmark element is present
- [ ] `jest-axe` reports zero WCAG violations

**File**: `packages/ui/src/components/Navbar/Navbar.test.tsx`

---

### TC-029: Navbar — Empty Links Array Renders Brand Only Without Error

**User Story**: US-7 — Navbar graceful degradation
**Priority**: P2
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `Navbar` component imported with `MemoryRouter`

**Input**: `{ brandName: 'AstroVoyage', links: [], currentPath: '/' }`

**Steps**:
1. Render `<Navbar brandName="AstroVoyage" links={[]} currentPath="/" />` inside `MemoryRouter`
2. Assert brand name renders
3. Assert no nav links are present
4. Assert no error thrown
5. Run `jest-axe`

**Expected**:
- [ ] Brand name "AstroVoyage" is in the document
- [ ] No navigation links rendered
- [ ] Component renders without throwing
- [ ] `jest-axe` reports zero WCAG violations

**File**: `packages/ui/src/components/Navbar/Navbar.test.tsx`

---

### TC-030: Navbar — Hamburger Button Present with Correct aria-label

**User Story**: US-2 — Mobile navbar; US-5 — Responsive
**Priority**: P0
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `Navbar` component imported with `MemoryRouter`

**Input**: Standard `NavbarProps` with `links = NAV_LINKS`

**Steps**:
1. Render `<Navbar brandName="AstroVoyage" links={NAV_LINKS} currentPath="/" />`
2. Assert hamburger button is present in the DOM
3. Assert hamburger button has `aria-label` matching `/open navigation/i`
4. Assert AntD Drawer is not visible in the initial state
5. Run `jest-axe`

**Expected**:
- [ ] Hamburger button is in the document
- [ ] Button has `aria-label="Open navigation"` (or equivalent)
- [ ] AntD Drawer is not visible initially
- [ ] `jest-axe` reports zero WCAG violations

**File**: `packages/ui/src/components/Navbar/Navbar.test.tsx`

---

### TC-031: Navbar — Hamburger Click Opens Drawer; Drawer Link Closes It

**User Story**: US-2 — Mobile drawer interaction
**Priority**: P0
**Framework**: Vitest
**Category**: Integration

**Preconditions**:
- [ ] `Navbar` component with `MemoryRouter` and `userEvent`

**Input**: `userEvent.click(hamburgerButton)` → `userEvent.click(contactLinkInDrawer)`

**Steps**:
1. Render `<Navbar brandName="AstroVoyage" links={NAV_LINKS} currentPath="/" />`
2. Click the hamburger button via `userEvent.click`
3. Assert drawer opens with "Home" and "Contact" links visible
4. Click the "Contact" link inside the drawer
5. Assert drawer is closed

**Expected**:
- [ ] After hamburger click: navigation links become visible in the drawer
- [ ] After drawer link click: drawer closes (`drawerOpen` state becomes false)
- [ ] Navigation occurs (URL changes within MemoryRouter context)
- [ ] `jest-axe` reports zero WCAG violations

**File**: `packages/ui/src/components/Navbar/Navbar.test.tsx`

---

### TC-032: Navbar — Escape Key Closes Open Drawer

**User Story**: US-2 — Keyboard accessibility for mobile drawer
**Priority**: P1
**Framework**: Vitest
**Category**: Integration

**Preconditions**:
- [ ] `Navbar` component with `MemoryRouter`
- [ ] Drawer opened before test step

**Input**: Keyboard event `Escape` while drawer is open

**Steps**:
1. Render Navbar; click hamburger to open drawer
2. Assert drawer is visible
3. Press `Escape` via `userEvent.keyboard('{Escape}')`
4. Assert drawer is closed

**Expected**:
- [ ] Drawer closes after Escape key press
- [ ] No navigation occurs

**File**: `packages/ui/src/components/Navbar/Navbar.test.tsx`

---

### TC-033: Footer — Renders Copyright, Tagline, and Social Links

**User Story**: US-1 — Footer present (F10)
**Priority**: P1
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `Footer` component imported
- [ ] `socialLinks` fixture with 2 items

**Input**: `{ companyName: 'AstroVoyage', tagline: 'Beyond the stars.', socialLinks: mockSocialLinks, year: 2026 }`

**Steps**:
1. Render `<Footer companyName="AstroVoyage" tagline="Beyond the stars." socialLinks={mockSocialLinks} year={2026} />`
2. Assert copyright text contains "AstroVoyage" and "2026"
3. Assert tagline text is present
4. Assert social links have `aria-label` and correct `href`
5. Assert icon elements have `aria-hidden="true"`
6. Assert root element is `<footer>`
7. Run `jest-axe`

**Expected**:
- [ ] Text containing "AstroVoyage" and "2026" is in the document
- [ ] Tagline "Beyond the stars." is in the document
- [ ] Social link anchors have `aria-label` attributes
- [ ] Decorative icons have `aria-hidden="true"`
- [ ] Root semantic element is `<footer>`
- [ ] `jest-axe` reports zero WCAG violations

**File**: `packages/ui/src/components/Footer/Footer.test.tsx`

---

### TC-034: Footer — Defaults Year to Current Year When Not Provided

**User Story**: US-1 — Footer year defaults
**Priority**: P2
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `Footer` component imported

**Input**: `{ companyName: 'AstroVoyage', tagline: '...', socialLinks: [] }` — no `year` prop

**Steps**:
1. Render `<Footer companyName="AstroVoyage" tagline="..." socialLinks={[]} />` with no `year` prop
2. Assert copyright text contains `String(new Date().getFullYear())`

**Expected**:
- [ ] Copyright text contains the current year (from `new Date().getFullYear()`)

**File**: `packages/ui/src/components/Footer/Footer.test.tsx`

---

### TC-035: ContactForm — Empty Submit Shows All Required Errors

**User Story**: US-3 — Contact form validation (all fields required)
**Priority**: P0
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `ContactForm` component with AntD `ConfigProvider` wrapper in test render
- [ ] All form fields empty (initial render)

**Input**: Submit click with all fields empty

**Steps**:
1. Render `<ContactForm />`
2. Click the Submit button via `userEvent.click`
3. Wait for AntD Form validation to settle

**Expected**:
- [ ] Required error message visible for Name field
- [ ] Required error message visible for Email field
- [ ] Required error message visible for Subject field
- [ ] Required error message visible for Message field
- [ ] No success notification triggered
- [ ] `jest-axe` reports zero WCAG violations

**File**: `packages/ui/src/components/ContactForm/ContactForm.test.tsx`

---

### TC-036: ContactForm — Invalid Email Shows Email Validation Error

**User Story**: US-3 — Email format validation (BR-2)
**Priority**: P0
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `ContactForm` with AntD provider wrapper

**Input**: Email field value `"not-an-email"`; other fields may remain empty

**Steps**:
1. Render `<ContactForm />`
2. Type `"not-an-email"` into the Email field
3. Click Submit (or tab away to trigger blur validation)
4. Wait for validation

**Expected**:
- [ ] Error message matching `/valid email/i` or `/invalid email/i` is in the document
- [ ] No success notification triggered

**File**: `packages/ui/src/components/ContactForm/ContactForm.test.tsx`

---

### TC-037: ContactForm — Name Length Violations Show Validation Errors

**User Story**: US-3 — Name field validation (BR-1: min 2 chars, max 100 chars, letters + spaces)
**Priority**: P0
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `ContactForm` with AntD provider wrapper

**Input**: Name = `"A"` (1 char); Name = `"A".repeat(101)` (101 chars)

**Steps**:
1. Render `<ContactForm />`
2. Type `"A"` into the Name field; submit; assert length/pattern error appears
3. Clear Name; type a 101-character string; submit; assert length error appears
4. Assert no error for Name = `"Jo"` (2 characters — minimum valid)

**Expected**:
- [ ] Error message for Name appears when value is 1 character (below minimum)
- [ ] Error message for Name appears when value exceeds 100 characters
- [ ] No error for valid Name = `"Jo"` (2 chars, letters only)

**File**: `packages/ui/src/components/ContactForm/ContactForm.test.tsx`

---

### TC-038: ContactForm — Message Length Violations Show Validation Errors

**User Story**: US-3 — Message field validation (BR-4: min 10 chars, max 1000 chars)
**Priority**: P0
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `ContactForm` with AntD provider wrapper

**Input**: Message = `"Short"` (5 chars)

**Steps**:
1. Render `<ContactForm />`
2. Type `"Short"` (5 characters) into the Message field
3. Submit the form
4. Assert inline length error appears for Message

**Expected**:
- [ ] Error message for Message appears indicating minimum length violation (< 10 chars)
- [ ] No error for a message with exactly 10 or more characters

**File**: `packages/ui/src/components/ContactForm/ContactForm.test.tsx`

---

### TC-039: ContactForm — Submit Button Disabled with aria-busy During Submission

**User Story**: US-3 — BR-5: submit button disabled while submitting
**Priority**: P0
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `ContactForm` with `vi.useFakeTimers()`
- [ ] `onSubmit` prop override: a promise controlled by fake timers

**Input**: Valid form data; `onSubmit` that resolves after fake timer advance

**Steps**:
1. Render `<ContactForm onSubmit={mockSlowSubmit} />`
2. Fill all fields with valid data
3. Click Submit
4. Assert button is disabled immediately (before timers advance)
5. Assert button has `aria-busy="true"` while submitting
6. Advance fake timers by 1500 ms; wait for update
7. Assert button is re-enabled (not disabled after success)

**Expected**:
- [ ] Submit button has `disabled` attribute immediately after click
- [ ] Submit button has `aria-busy="true"` during submission
- [ ] Submit button re-enabled and `aria-busy` removed after success resolves

**File**: `packages/ui/src/components/ContactForm/ContactForm.test.tsx`

---

### TC-040: ContactForm — Successful Submit Shows Notification and Resets Fields

**User Story**: US-3 — Happy path: notification + form reset (BR-6)
**Priority**: P0
**Framework**: Vitest
**Category**: Integration

**Preconditions**:
- [ ] `ContactForm` with `vi.useFakeTimers()`
- [ ] AntD `ConfigProvider` and notification context in test render
- [ ] `onSubmit` prop overridden with a controlled-resolve promise

**Input**:
```typescript
name: 'Jane Doe', email: 'jane@example.com',
subject: 'Space inquiry', message: 'I would like to book a trip to Mars.'
```

**Steps**:
1. Render `<ContactForm onSubmit={mockSuccessSubmit} />`
2. Fill all four fields with valid data
3. Click Submit
4. Advance fake timers by 1500 ms; wait for updates
5. Assert success notification appears
6. Assert all form fields are empty

**Expected**:
- [ ] AntD success notification containing `"sent"` or `"touch"` is displayed
- [ ] Name, Email, Subject, Message fields are all empty after success
- [ ] Form returns to idle/submittable state

**File**: `packages/ui/src/components/ContactForm/ContactForm.test.tsx`

---

### TC-041: ContactForm — Error Submit Shows Error Notification and Allows Retry

**User Story**: US-3 — Error path state machine transition
**Priority**: P1
**Framework**: Vitest
**Category**: Integration

**Preconditions**:
- [ ] `ContactForm` with `vi.useFakeTimers()`
- [ ] `onSubmit` prop overridden with a function that rejects with `Error('Network error')`

**Input**: Valid form data; `onSubmit` that throws `new Error('Network error')`

**Steps**:
1. Render `<ContactForm onSubmit={mockErrorSubmit} />`
2. Fill all fields with valid data
3. Click Submit; advance fake timers
4. Assert error notification appears
5. Assert form fields retain their values (not reset)
6. Assert Submit button is re-enabled (retry allowed)

**Expected**:
- [ ] AntD error notification containing `"wrong"` or `"error"` or `"again"` is displayed
- [ ] Form fields retain entered values (not cleared on error)
- [ ] Submit button is not disabled (user can retry)

**File**: `packages/ui/src/components/ContactForm/ContactForm.test.tsx`

---

### TC-042: ContactForm — Accessibility Audit (Idle and Error States)

**User Story**: US-3 — WCAG 2.1 AA compliance for contact form
**Priority**: P0
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `ContactForm` with AntD provider wrapper
- [ ] `jest-axe` configured

**Input**: Idle state render; then validation-triggered error state

**Steps**:
1. Render `<ContactForm />` in idle state; run `axe`; assert zero violations
2. Click Submit (empty) to trigger validation errors; run `axe` again; assert zero violations

**Expected**:
- [ ] `jest-axe` reports zero WCAG violations in idle state
- [ ] `jest-axe` reports zero WCAG violations when error messages displayed
- [ ] All `Form.Item` have associated `<label>` elements
- [ ] All required inputs have `aria-required="true"`
- [ ] Error messages linked via `aria-describedby`

**File**: `packages/ui/src/components/ContactForm/ContactForm.test.tsx`

---

### TC-043: mockContactSubmit — Resolves After ~1500 ms

**User Story**: US-3 — Mock submit utility contract
**Priority**: P1
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `mockContactSubmit` imported from `packages/ui/src/utils/mockSubmit.ts`
- [ ] `vi.useFakeTimers()` enabled

**Input**: `VALID_FORM_DATA`; fake timers

**Steps**:
1. Call `mockContactSubmit(VALID_FORM_DATA)`
2. Assert promise is still pending before 1500 ms elapses
3. Advance fake timers by 1500 ms
4. Assert promise resolves with `{ success: true, message: 'Message received' }`

**Expected**:
- [ ] Returns a `Promise`
- [ ] Resolves to `{ success: true, message: 'Message received' }` after 1500 ms

**File**: `packages/ui/src/utils/mockSubmit.test.ts`

---

### TC-044: mockContactSubmit — Throws Error When simulateError Is True

**User Story**: US-3 — Mock error path
**Priority**: P1
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `mockContactSubmit` imported
- [ ] `vi.useFakeTimers()` enabled

**Input**: `VALID_FORM_DATA`, `{ simulateError: true }`

**Steps**:
1. Call `mockContactSubmit(VALID_FORM_DATA, { simulateError: true })`
2. Advance fake timers by 1500 ms
3. Assert promise rejects with `Error('Network error')`

**Expected**:
- [ ] Promise rejects
- [ ] Rejection error message is `'Network error'`

**File**: `packages/ui/src/utils/mockSubmit.test.ts`

---

### TC-045: spaceTheme Tokens — Correct Values Match Design Spec

**User Story**: US-1 / F12 — Minimalist space theme
**Priority**: P1
**Framework**: Vitest
**Category**: Unit

**Preconditions**:
- [ ] `spaceTheme` imported from `packages/ui/src/theme/spaceTheme.ts`

**Input**: Imported `spaceTheme` object

**Steps**:
1. Assert `colorPrimary` equals `'#4F8EF7'`
2. Assert `colorBgBase` equals `'#0A0A0F'`
3. Assert `colorBgContainer` equals `'#14141F'`
4. Assert `colorBorder` equals `'#2A2A3A'`
5. Assert `colorTextBase` equals `'#E8E8E8'`
6. Assert `borderRadius` equals `4`
7. Assert `algorithm` includes `theme.darkAlgorithm`

**Expected**:
- [ ] Each token value matches the design spec constants defined in SPEC.md
- [ ] `algorithm` is set (dark algorithm present)

**File**: `packages/ui/src/theme/spaceTheme.test.ts`

---

### TC-046: Integration — Navbar "Contact" Link Changes Route to /contact

**User Story**: US-2 — Navigate Between Pages
**Priority**: P0
**Framework**: Vitest
**Category**: Integration

**Preconditions**:
- [ ] Full `App.tsx` (or `LandingPage` + `ContactPage`) rendered inside `MemoryRouter initialEntries={['/']}`
- [ ] `ConfigProvider` wrapping the tree

**Input**: Click on `getByRole('link', { name: 'Contact' })`

**Steps**:
1. Render full app at `'/'`
2. Assert landing page hero heading is visible
3. Click the "Contact" navbar link
4. Assert contact page heading is visible
5. Assert hero heading is NOT in the document

**Expected**:
- [ ] After navigation: contact page content (form fields) is rendered
- [ ] Landing page hero is unmounted
- [ ] "Contact" nav link has `aria-current="page"`

**File**: `apps/web/src/__tests__/navigation.test.tsx`

---

### TC-047: Integration — Navbar "Home" Link Returns to /

**User Story**: US-2 — Navigate Between Pages
**Priority**: P0
**Framework**: Vitest
**Category**: Integration

**Preconditions**:
- [ ] Full app rendered with `MemoryRouter initialEntries={['/contact']}`

**Input**: Click on `getByRole('link', { name: 'Home' })`

**Steps**:
1. Render full app starting at `/contact`
2. Assert contact page heading is visible
3. Click the "Home" navbar link
4. Assert hero heading is visible
5. Assert contact page content is unmounted

**Expected**:
- [ ] Landing page hero is rendered after clicking "Home"
- [ ] Contact page content is unmounted
- [ ] "Home" nav link has `aria-current="page"`

**File**: `apps/web/src/__tests__/navigation.test.tsx`

---

### TC-048: Integration — ConfigProvider Applies Space Theme Tokens

**User Story**: US-1 / F12 — Theme propagation via ConfigProvider
**Priority**: P1
**Framework**: Vitest
**Category**: Integration

**Preconditions**:
- [ ] `ConfigProvider` with `spaceTheme` wrapping an AntD `Button`

**Input**: `<ConfigProvider theme={spaceTheme}><Button type="primary">Test</Button></ConfigProvider>`

**Steps**:
1. Render the above component tree
2. Assert rendered button reflects `colorPrimary` token (no console errors about invalid tokens)

**Expected**:
- [ ] Button renders without errors
- [ ] No console errors about invalid theme tokens
- [ ] `algorithm` applied (dark mode styling present)

**File**: `apps/web/src/__tests__/theme.test.tsx`

---

### TC-049: Integration — Full Form Submission Flow: Fill → Submit → Loading → Success → Reset

**User Story**: US-3 — Contact form full lifecycle
**Priority**: P0
**Framework**: Vitest
**Category**: Integration

**Preconditions**:
- [ ] `ContactPage` (or `ContactForm`) rendered with `MemoryRouter`, `ConfigProvider`, and `vi.useFakeTimers()`
- [ ] `onSubmit` prop injected for controlled async

**Input**: Valid `ContactFormValues`; controlled-resolve `onSubmit`

**Steps**:
1. Render `<ContactPage />` (or `<ContactForm onSubmit={mockSuccessSubmit} />`)
2. Fill Name, Email, Subject, Message with valid data
3. Click Submit
4. Assert submit button is disabled (loading state)
5. Advance fake timers by 1500 ms; wait for updates
6. Assert success notification appears
7. Assert all form fields are cleared

**Expected**:
- [ ] Submission flow: `idle → dirty → submitting → success → idle`
- [ ] Submit button disabled during `submitting` state
- [ ] Success notification visible after mock resolves
- [ ] All fields cleared after success

**File**: `packages/ui/src/components/ContactForm/ContactForm.test.tsx`

---

## Acceptance Criteria

The test suite passes when ALL of the following conditions are met:

### Unit & Integration (Vitest)

| Criterion | Target | Failure Action |
|-----------|--------|----------------|
| All Vitest unit tests pass | 100 % pass rate | Block merge |
| All Vitest integration tests pass | 100 % pass rate | Block merge |
| `jest-axe` reports zero WCAG 2.1 AA violations | 0 violations across all components | Block merge |
| No unexpected `console.error` during unit tests | 0 unexpected errors | Block merge |
| Code coverage for `packages/ui/src/components/` | ≥ 80 % line coverage | Warn (do not block) |

### E2E (Playwright)

| Criterion | Target | Failure Action |
|-----------|--------|----------------|
| All Playwright E2E tests pass in Chromium | 100 % pass rate | Block merge |
| All Playwright E2E tests pass in Firefox and WebKit | 100 % pass rate | Warn on first failure; block on 2 consecutive |
| No horizontal overflow at 375 px viewport (TC-016, TC-017) | `scrollWidth <= innerWidth` on both pages | Block merge |
| Contact form happy-path (TC-009) passes consistently | 3/3 consecutive runs | Block merge |
| Mobile navbar drawer open/close (TC-013, TC-014, TC-015) | Pass | Block merge |

### Performance & Build

| Criterion | Target | Failure Action |
|-----------|--------|----------------|
| Total gzipped initial JS bundle | < 300 KB | Block merge |
| `pnpm turbo build` exits without error | Exit code 0 | Block merge |
| Turbo cache hit time on unchanged code | < 5 s | Warn |
| No barrel import of `@ant-design/icons` | Named imports only | Block merge |

### Accessibility

| Criterion | Target | Failure Action |
|-----------|--------|----------------|
| Zero WCAG 2.1 AA violations in automated audit | 0 (via `jest-axe`) | Block merge |
| All interactive elements keyboard-reachable | Verified via Playwright Tab key traversal | Block merge |
| Colour contrast — body text `#E8E8E8` on `#0A0A0F` | ≥ 17.5:1 (pass) | Block merge |
| Colour contrast — secondary text `#8A8A9A` on `#0A0A0F` | ≥ 5.1:1 (pass) | Block merge |
| Colour contrast — CTA button text on `#4F8EF7` | ≥ 4.6:1 (pass) | Block merge |

### Definition of Done

The test suite is considered complete and the feature is ready for deployment when:
1. All P0 Vitest tests pass (TC-019 through TC-049 for P0 items)
2. All P0 Playwright E2E tests pass (TC-001, TC-002, TC-004, TC-005, TC-007, TC-009, TC-010, TC-012, TC-013, TC-014, TC-016)
3. `jest-axe` finds zero violations in all components in all states
4. No horizontal overflow at 375 px viewport on either page
5. Contact form happy path completes end-to-end in the browser
6. `pnpm turbo build` exits with code 0 and gzipped bundle < 300 KB
