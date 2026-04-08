# Test Plan: Change the Company Name to Stark Space

**Version**: 1.0 | **Date**: 2026-04-08 | **Feature**: Rebrand from "Stellar Horizons" to "Stark Space"

---

## Overview

This test plan covers the verification of the company rebrand from "Stellar Horizons" to "Stark Space" across the entire space-tourism monorepo. The change is a text-level branding update affecting UI text, HTML metadata, constants, social links, contact information, and all existing test assertions.

**Scope**:
- Navbar brand name display (desktop & mobile)
- Footer company name and social links
- Landing page content (Hero, FeaturesGrid, MissionStrip)
- Browser tab title (`<title>` tag)
- Contact page company info (email, address)
- Feature card descriptions
- Zero remaining occurrences of "Stellar Horizons" anywhere in the codebase

**Tech Stack**: React 18, Vite, Ant Design, React Router, pnpm monorepo (`apps/web`, `packages/ui`)

**Risk Areas**:
- Missed text replacements (partial grep coverage)
- Case-sensitive mismatches (e.g., "stellar horizons" in URLs vs "Stellar Horizons" in UI)
- Derived identifiers (email domain, social handles) inconsistently updated
- Mobile-specific rendering paths not covered by desktop-only checks

---

## Test Strategy

### Frameworks
| Framework | Purpose | Directory | Pattern |
|-----------|---------|-----------|---------|
| **Vitest** | Unit & component tests | `src/__tests__/`, `packages/ui/src/components/*/` | `*.test.ts{,x}` |
| **Playwright** | End-to-end browser tests | `e2e/` | `*.spec.ts` |

### Test Categories
| Category | Framework | Description |
|----------|-----------|-------------|
| Unit | Vitest | Individual component rendering with updated props/constants |
| Integration | Vitest | Component composition with real constants (navigation test) |
| E2E | Playwright | Full browser flows verifying rendered output |

### Browsers (Playwright)
- Chromium (primary)
- As configured in `apps/web/playwright.config.ts`

### Environments
- Local dev server at `http://localhost:5173`
- Vitest with jsdom environment

### Parallelization
- Vitest: parallel by default
- Playwright: parallel workers as configured; all E2E specs are independent

---

## Authentication

No authentication required. The space-tourism site is entirely public with no login, roles, or protected routes.

---

## Test Data

### Constants (Source of Truth)
| Constant | File | Key Values |
|----------|------|------------|
| `COMPANY_INFO` | `packages/ui/src/constants/companyInfo.ts` | `email: 'contact@starkspace.com'`, `address: '1 Stark Drive, Cape Canaveral, FL 32920, USA'`, `phone: '+1 (800) 867-5309'` |
| `FEATURE_CARDS` | `packages/ui/src/constants/featureCards.ts` | 4 cards; descriptions must reference "Stark Space" (not "Stellar Horizons") |

### Props (Hardcoded in Components)
| Prop | File | Value |
|------|------|-------|
| `brandName` | `apps/web/src/App.tsx` | `"Stark Space"` |
| `companyName` | `apps/web/src/App.tsx` | `"Stark Space"` |
| `socialLinks` | `apps/web/src/App.tsx` | GitHub: `https://github.com/stark-space`, Twitter: `https://twitter.com/starkspace`, LinkedIn: `https://linkedin.com/company/stark-space` |
| `subHeadline` | `apps/web/src/pages/LandingPage.tsx` | Contains "Stark Space" |
| `sectionTitle` | `apps/web/src/pages/LandingPage.tsx` | `"Why Choose Stark Space"` |
| MissionStrip `title`/`body` | `apps/web/src/pages/LandingPage.tsx` | References "Stark Space" |

### HTML Metadata
| Element | File | Value |
|---------|------|-------|
| `<title>` | `apps/web/index.html` | `"Stark Space"` |

### Mock APIs
None required. This is a static frontend application with no API calls.

### Negative Test Data
| ID | Description |
|----|-------------|
| NEG-1 | The string `"Stellar Horizons"` must NOT appear anywhere in rendered DOM |
| NEG-2 | The string `"stellarhorizons"` must NOT appear in any URL or email |
| NEG-3 | The string `"stellar-horizons"` must NOT appear in any URL |
| NEG-4 | The string `"Stellar Drive"` must NOT appear in any address text |

---

## E2E Test Cases

### TC-001: Browser Tab Title Shows "Stark Space"

**User Story**: US-4
**Priority**: P0
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Dev server running at localhost:5173

**Steps**:
1. Navigate to `/`
2. Read the page title via `page.title()`

**Expected**:
- [ ] Page title is exactly `"Stark Space"`

**File**: `e2e/landing.spec.ts`

---

### TC-002: Navbar Displays "Stark Space" on Desktop

**User Story**: US-1
**Priority**: P0
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Viewport at desktop width (1280px)

**Steps**:
1. Navigate to `/`
2. Locate the Navbar brand element

**Expected**:
- [ ] Navbar brand text is `"Stark Space"`
- [ ] Text `"Stellar Horizons"` does NOT appear in the navbar

**File**: `e2e/navigation.spec.ts`

---

### TC-003: Navbar Displays "Stark Space" on Mobile

**User Story**: US-1
**Priority**: P0
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Viewport set to mobile width (375px)

**Steps**:
1. Navigate to `/`
2. Locate the Navbar brand element
3. Tap the hamburger menu icon to open the mobile drawer
4. Observe the brand name in the drawer

**Expected**:
- [ ] Navbar brand text is `"Stark Space"` before and after opening the drawer
- [ ] Mobile drawer displays the brand name correctly

**File**: `e2e/mobile-navbar.spec.ts`

---

### TC-004: Hero Subheadline References "Stark Space"

**User Story**: US-3
**Priority**: P0
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Dev server running

**Steps**:
1. Navigate to `/`
2. Locate the Hero section subheadline element

**Expected**:
- [ ] Subheadline text contains `"Stark Space"`
- [ ] Subheadline text does NOT contain `"Stellar Horizons"`

**File**: `e2e/landing.spec.ts`

---

### TC-005: Features Section Title Shows "Why Choose Stark Space"

**User Story**: US-3
**Priority**: P0
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Dev server running

**Steps**:
1. Navigate to `/`
2. Scroll to the features section
3. Locate the section title element

**Expected**:
- [ ] Section title text contains `"Stark Space"`
- [ ] Section title reads `"Why Choose Stark Space"`

**File**: `e2e/landing.spec.ts`

---

### TC-006: MissionStrip References "Stark Space"

**User Story**: US-3
**Priority**: P1
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Dev server running

**Steps**:
1. Navigate to `/`
2. Scroll to the MissionStrip section
3. Locate the mission body text

**Expected**:
- [ ] MissionStrip body text contains `"Stark Space"`
- [ ] MissionStrip body text does NOT contain `"Stellar Horizons"`

**File**: `e2e/landing.spec.ts`

---

### TC-007: Feature Card Descriptions Reference "Stark Space"

**User Story**: US-3
**Priority**: P1
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Dev server running

**Steps**:
1. Navigate to `/`
2. Scroll to the features grid
3. Read the description text of all feature cards

**Expected**:
- [ ] No feature card description contains `"Stellar Horizons"`
- [ ] Feature cards that reference the company use `"Stark Space"`

**File**: `e2e/landing.spec.ts`

---

### TC-008: Footer Displays "Stark Space" Company Name

**User Story**: US-2
**Priority**: P0
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Dev server running

**Steps**:
1. Navigate to `/`
2. Scroll to the page footer

**Expected**:
- [ ] Footer company name text is `"Stark Space"`
- [ ] Footer does NOT contain `"Stellar Horizons"`

**File**: `e2e/navigation.spec.ts`

---

### TC-009: Footer Social Links Point to Stark Space Profiles

**User Story**: US-2
**Priority**: P1
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Dev server running

**Steps**:
1. Navigate to `/`
2. Scroll to the footer
3. Inspect the `href` attributes of social link elements

**Expected**:
- [ ] GitHub link href contains `stark-space`
- [ ] Twitter link href contains `starkspace`
- [ ] LinkedIn link href contains `stark-space`
- [ ] No social link href contains `stellar`

**File**: `e2e/navigation.spec.ts`

---

### TC-010: Contact Page Shows Updated Email

**User Story**: US-5
**Priority**: P0
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Dev server running

**Steps**:
1. Navigate to `/contact`
2. Locate the CompanyInfoBlock section
3. Find the email link

**Expected**:
- [ ] Email link href contains `contact@starkspace.com`
- [ ] Email text displays `contact@starkspace.com`
- [ ] No reference to `stellarhorizons.com`

**File**: `e2e/contact-form.spec.ts`

---

### TC-011: Contact Page Shows Updated Address

**User Story**: US-5
**Priority**: P0
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Dev server running

**Steps**:
1. Navigate to `/contact`
2. Locate the CompanyInfoBlock section
3. Find the address text

**Expected**:
- [ ] Address text contains `"Stark Drive"`
- [ ] Address text does NOT contain `"Stellar Drive"`

**File**: `e2e/contact-form.spec.ts`

---

### TC-012: Navbar Brand Persists Across Route Navigation

**User Story**: US-1
**Priority**: P1
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Dev server running

**Steps**:
1. Navigate to `/`
2. Verify Navbar brand text is `"Stark Space"`
3. Click the "Contact" navigation link
4. Wait for `/contact` route to load
5. Verify Navbar brand text is still `"Stark Space"`

**Expected**:
- [ ] Brand text is `"Stark Space"` on landing page
- [ ] Brand text is `"Stark Space"` on contact page
- [ ] Brand text is consistent across route transitions

**File**: `e2e/navigation.spec.ts`

---

### TC-013: No "Stellar Horizons" Text Anywhere in Rendered Landing Page

**User Story**: US-1, US-2, US-3
**Priority**: P0
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Dev server running

**Steps**:
1. Navigate to `/`
2. Wait for the page to fully render
3. Search the full page text content for `"Stellar Horizons"` (case-insensitive)

**Expected**:
- [ ] Zero matches of `"Stellar Horizons"` in the page body text
- [ ] Zero matches of `"stellar horizons"` in the page body text

**File**: `e2e/landing.spec.ts`

---

### TC-014: No "Stellar Horizons" Text Anywhere in Rendered Contact Page

**User Story**: US-5
**Priority**: P0
**Framework**: Playwright
**Category**: E2E
**Preconditions**:
- [ ] Dev server running

**Steps**:
1. Navigate to `/contact`
2. Wait for the page to fully render
3. Search the full page text content for `"Stellar Horizons"` (case-insensitive)

**Expected**:
- [ ] Zero matches of `"Stellar Horizons"` in the page body text
- [ ] Zero matches of `"stellarhorizons"` in any link href

**File**: `e2e/contact-form.spec.ts`

---

## Unit / Integration Test Cases

### TC-015: Navbar Component Renders "Stark Space" Brand Name

**User Story**: US-1
**Priority**: P0
**Framework**: Vitest
**Category**: Unit
**Preconditions**:
- [ ] Vitest with jsdom environment

**Input**: `<Navbar brandName="Stark Space" links={[...]} currentPath="/" />`

**Expected**:
- [ ] Rendered output contains text `"Stark Space"`
- [ ] Rendered output does NOT contain text `"Stellar Horizons"`
- [ ] Brand element is accessible (queryable by text)

**File**: `packages/ui/src/components/Navbar/Navbar.test.tsx`

---

### TC-016: Footer Component Renders "Stark Space" Company Name

**User Story**: US-2
**Priority**: P0
**Framework**: Vitest
**Category**: Unit
**Preconditions**:
- [ ] Vitest with jsdom environment

**Input**: `<Footer companyName="Stark Space" tagline="..." socialLinks={[...]} />`

**Expected**:
- [ ] Rendered output contains text `"Stark Space"`
- [ ] Rendered output does NOT contain text `"Stellar Horizons"`
- [ ] Copyright line includes `"Stark Space"`

**File**: `packages/ui/src/components/Footer/Footer.test.tsx`

---

### TC-017: Footer Social Links Use Stark Space URLs

**User Story**: US-2
**Priority**: P1
**Framework**: Vitest
**Category**: Unit
**Preconditions**:
- [ ] Vitest with jsdom environment

**Input**: `<Footer ... socialLinks={[{href: 'https://github.com/stark-space', ...}, ...]} />`

**Expected**:
- [ ] GitHub link href is `https://github.com/stark-space`
- [ ] Twitter link href is `https://twitter.com/starkspace`
- [ ] LinkedIn link href is `https://linkedin.com/company/stark-space`

**File**: `packages/ui/src/components/Footer/Footer.test.tsx`

---

### TC-018: Navigation Integration Test Shows "Stark Space"

**User Story**: US-1
**Priority**: P0
**Framework**: Vitest
**Category**: Integration
**Preconditions**:
- [ ] Vitest with jsdom environment
- [ ] Full App component rendered with router

**Input**: Render `<App />` and inspect navigation

**Expected**:
- [ ] Brand name text in rendered DOM is `"Stark Space"`
- [ ] Assertion does NOT reference `"Stellar Horizons"`

**File**: `apps/web/src/__tests__/navigation.test.tsx`

---

### TC-019: CompanyInfoBlock Renders Updated Email and Address

**User Story**: US-5
**Priority**: P0
**Framework**: Vitest
**Category**: Unit
**Preconditions**:
- [ ] Vitest with jsdom environment

**Input**: `<CompanyInfoBlock companyInfo={COMPANY_INFO} />`

**Expected**:
- [ ] Email link displays `contact@starkspace.com`
- [ ] Email link href is `mailto:contact@starkspace.com`
- [ ] Address text contains `"Stark Drive"`
- [ ] No reference to `"stellarhorizons"` or `"Stellar Drive"`

**File**: `packages/ui/src/components/CompanyInfoBlock/CompanyInfoBlock.test.tsx`

---

### TC-020: Hero Component Renders Updated Subheadline

**User Story**: US-3
**Priority**: P1
**Framework**: Vitest
**Category**: Unit
**Preconditions**:
- [ ] Vitest with jsdom environment

**Input**: `<Hero subHeadline="...Stark Space..." headline="..." ctaLabel="..." onCtaClick={fn} />`

**Expected**:
- [ ] Rendered subheadline text contains `"Stark Space"`
- [ ] No reference to `"Stellar Horizons"`

**File**: `packages/ui/src/components/Hero/Hero.test.tsx`

---

### TC-021: FeaturesGrid Renders Updated Section Title

**User Story**: US-3
**Priority**: P1
**Framework**: Vitest
**Category**: Unit
**Preconditions**:
- [ ] Vitest with jsdom environment

**Input**: `<FeaturesGrid features={FEATURE_CARDS} sectionTitle="Why Choose Stark Space" />`

**Expected**:
- [ ] Section title text is `"Why Choose Stark Space"`
- [ ] No reference to `"Stellar Horizons"` in section title

**File**: `packages/ui/src/components/FeaturesGrid/FeaturesGrid.test.tsx`

---

### TC-022: Feature Card Descriptions Contain "Stark Space"

**User Story**: US-3
**Priority**: P1
**Framework**: Vitest
**Category**: Unit
**Preconditions**:
- [ ] Vitest with jsdom environment

**Input**: Import `FEATURE_CARDS` from `packages/ui/src/constants/featureCards.ts`

**Expected**:
- [ ] No card description contains `"Stellar Horizons"`
- [ ] Cards that reference the company use `"Stark Space"`

**File**: `packages/ui/src/components/FeaturesGrid/FeaturesGrid.test.tsx`

---

### TC-023: MissionStrip Renders Updated Body Text

**User Story**: US-3
**Priority**: P1
**Framework**: Vitest
**Category**: Unit
**Preconditions**:
- [ ] Vitest with jsdom environment

**Input**: `<MissionStrip title="..." body="...Stark Space..." />`

**Expected**:
- [ ] Body text contains `"Stark Space"`
- [ ] No reference to `"Stellar Horizons"`

**File**: `packages/ui/src/components/MissionStrip/MissionStrip.test.tsx`

---

### TC-024: COMPANY_INFO Constant Has Correct Values

**User Story**: US-5
**Priority**: P0
**Framework**: Vitest
**Category**: Unit
**Preconditions**:
- [ ] Vitest environment

**Input**: Import `COMPANY_INFO` from `packages/ui/src/constants/companyInfo.ts`

**Expected**:
- [ ] `COMPANY_INFO.email` is `'contact@starkspace.com'`
- [ ] `COMPANY_INFO.address` is `'1 Stark Drive, Cape Canaveral, FL 32920, USA'`
- [ ] `COMPANY_INFO.phone` is `'+1 (800) 867-5309'` (unchanged)
- [ ] No field contains `"Stellar"` or `"stellarhorizons"`

**File**: `packages/ui/src/components/CompanyInfoBlock/CompanyInfoBlock.test.tsx`

---

### TC-025: Accessibility — Navbar Brand Announced Correctly

**User Story**: US-1
**Priority**: P2
**Framework**: Vitest
**Category**: Unit
**Preconditions**:
- [ ] Vitest with jsdom + jest-axe

**Input**: `<Navbar brandName="Stark Space" ... />`

**Expected**:
- [ ] No axe accessibility violations
- [ ] Brand name is in a text element readable by screen readers
- [ ] `aria-current="page"` is set on the active link

**File**: `packages/ui/src/components/Navbar/Navbar.test.tsx`

---

### TC-026: Accessibility — Footer Passes axe Audit

**User Story**: US-2
**Priority**: P2
**Framework**: Vitest
**Category**: Unit
**Preconditions**:
- [ ] Vitest with jsdom + jest-axe

**Input**: `<Footer companyName="Stark Space" ... />`

**Expected**:
- [ ] No axe accessibility violations
- [ ] Social links have `aria-label` attributes
- [ ] Footer uses `<footer>` semantic element

**File**: `packages/ui/src/components/Footer/Footer.test.tsx`

---

## Acceptance Criteria

### Pass/Fail Criteria
| # | Criterion | Pass Condition |
|---|-----------|----------------|
| 1 | All Vitest unit tests pass | `pnpm test` exits with code 0 |
| 2 | All Playwright E2E tests pass | `pnpm exec playwright test` exits with code 0 |
| 3 | Zero "Stellar Horizons" in source | `grep -ri "Stellar Horizons" apps/ packages/ e2e/` returns 0 results |
| 4 | Zero "stellarhorizons" in source | `grep -ri "stellarhorizons" apps/ packages/ e2e/` returns 0 results |
| 5 | Zero "stellar-horizons" in source | `grep -ri "stellar-horizons" apps/ packages/ e2e/` returns 0 results |
| 6 | Zero "Stellar Drive" in source | `grep -ri "Stellar Drive" apps/ packages/ e2e/` returns 0 results |
| 7 | Browser tab title | `<title>` is exactly "Stark Space" |
| 8 | Contact email | All references use `contact@starkspace.com` |
| 9 | Address | All references use "1 Stark Drive, Cape Canaveral, FL 32920, USA" |
| 10 | Social links | GitHub: `stark-space`, Twitter: `starkspace`, LinkedIn: `stark-space` |
| 11 | No visual regressions | Manual smoke test at 1280px desktop and 375px mobile shows no layout breakage |
| 12 | Accessibility | No new axe violations introduced |

### Coverage Requirements
- Every user story (US-1 through US-5) has at least one E2E test case
- Every affected component has at least one unit test verifying the updated text
- Both desktop and mobile viewports are covered in E2E tests

### Test Summary Matrix

| User Story | Unit Tests | E2E Tests | Coverage |
|------------|-----------|-----------|----------|
| US-1: Navbar brand | TC-015, TC-018, TC-025 | TC-002, TC-003, TC-012, TC-013 | Full |
| US-2: Footer brand | TC-016, TC-017, TC-026 | TC-008, TC-009, TC-013 | Full |
| US-3: Landing content | TC-020, TC-021, TC-022, TC-023 | TC-004, TC-005, TC-006, TC-007, TC-013 | Full |
| US-4: Browser tab | — | TC-001 | Full |
| US-5: Contact info | TC-019, TC-024 | TC-010, TC-011, TC-014 | Full |
