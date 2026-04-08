# Requirements: Change the Company Name to Stark Space

**Version**: 1.0 | **Date**: 2026-04-08 | **Status**: Ready for Architecture Review

> Status values: `Draft` | `Ready for Analyst Review` | `Pending Clarification` | `Ready for Architecture Review` | `Approved`

---

## 0. Original Requirement
> Preserve verbatim. NEVER modify after creation.

**Raw Request**: Change the company name Stark Space
**Date**: 2026-04-08 | **Requestor**: User

---

## 1. Summary

**Overview**: Rebrand the space tourism website by changing the company name from the current "Stellar Horizons" to "Stark Space" across all user-facing text, metadata, constants, test assertions, and supporting assets (social links, email, address references). This is a text-level branding change with no structural or functional modifications to the application.

**Business Value**: Aligns the product with the updated company identity "Stark Space", ensuring consistent branding across the entire web application for customers, partners, and search engines.

**Success Criteria**:
- [ ] Every visible instance of "Stellar Horizons" in the rendered UI is replaced with "Stark Space"
- [ ] The HTML `<title>` tag reads "Stark Space"
- [ ] Social media links reference `stark-space` / `starkspace` handles
- [ ] Contact email updated to `contact@starkspace.com`
- [ ] Address updated to reference "Stark" branding (e.g., "1 Stark Drive")
- [ ] All existing unit tests pass with updated assertions
- [ ] All existing E2E tests pass with updated assertions
- [ ] No regressions in layout, styling, or navigation

---

## 2. Scope

### In Scope
| ID | Capability | Priority | Description |
|----|------------|----------|-------------|
| F1 | Company name in UI text | P0 | Replace "Stellar Horizons" with "Stark Space" in Navbar brand, Footer company name, Hero subheadline, FeaturesGrid section title, MissionStrip body, and feature card descriptions |
| F2 | HTML metadata | P0 | Update `<title>` tag in `apps/web/index.html` from "Stellar Horizons" to "Stark Space" |
| F3 | Company constants | P0 | Update `COMPANY_INFO` in `packages/ui/src/constants/companyInfo.ts` — email, address, tagline to reflect "Stark Space" branding |
| F4 | Social media links | P1 | Update GitHub, Twitter, and LinkedIn URLs in `apps/web/src/App.tsx` to use Stark Space handles |
| F5 | Feature card copy | P1 | Update feature card descriptions in `packages/ui/src/constants/featureCards.ts` that reference "Stellar Horizons" |
| F6 | Test assertions | P0 | Update all hardcoded "Stellar Horizons" strings in unit tests (Navbar.test.tsx, Footer.test.tsx, navigation.test.tsx) and E2E tests |

### Out of Scope
- Logo or icon image changes (no image assets identified)
- Domain name or DNS changes
- Backend or API changes (static frontend only)
- SEO metadata beyond `<title>` (e.g., Open Graph tags — none currently exist)
- Package name changes (`@space-tourism/web`, `@space-tourism/ui` remain unchanged)
- Theme or color scheme changes

### Dependencies
- No external dependencies; this is a self-contained text replacement across the monorepo

---

## 3. Functional Requirements

### User Stories

#### US-1: See Updated Brand Name in Navigation
**As a** site visitor **I want** to see "Stark Space" in the navigation bar **So that** I know I am on the correct company website.

**Acceptance Criteria**:
- [ ] Given the user loads any page, when the Navbar renders, then the brand name displays "Stark Space"
- [ ] Given the user is on mobile, when the navigation drawer opens, then the brand name displays "Stark Space"

#### US-2: See Updated Brand Name in Footer
**As a** site visitor **I want** to see "Stark Space" in the page footer **So that** the branding is consistent throughout the site.

**Acceptance Criteria**:
- [ ] Given the user scrolls to the footer, when the Footer renders, then the company name displays "Stark Space"
- [ ] Given the user views the footer, when social links are visible, then they link to Stark Space social profiles

#### US-3: See Updated Brand in Landing Page Content
**As a** site visitor **I want** the landing page content to reference "Stark Space" **So that** all marketing copy reflects the correct company identity.

**Acceptance Criteria**:
- [ ] Given the user visits the home page, when the Hero section renders, then the subheadline references "Stark Space"
- [ ] Given the user views the features section, when the section title renders, then it reads "Why Choose Stark Space"
- [ ] Given the user views the mission strip, when the body text renders, then it references "Stark Space"
- [ ] Given the user views feature cards, when descriptions mention the company, then they say "Stark Space"

#### US-4: See Updated Brand in Browser Tab
**As a** site visitor **I want** the browser tab to display "Stark Space" **So that** I can identify the site among open tabs.

**Acceptance Criteria**:
- [ ] Given the user opens the site, when the page loads, then the browser tab title shows "Stark Space"

#### US-5: See Updated Contact Information
**As a** site visitor **I want** the contact details to reflect the Stark Space brand **So that** I can reach the correct company.

**Acceptance Criteria**:
- [ ] Given the user visits the contact page, when company info renders, then the email shows a `@starkspace.com` address
- [ ] Given the user views the address, when company info renders, then the address references Stark Space branding

### State Diagram
```
N/A — No state transitions. This is a static text replacement with no behavioral changes.
```

### Business Rules
| ID | Rule | Validation |
|----|------|------------|
| BR-1 | The string "Stellar Horizons" must not appear anywhere in user-facing rendered output | Visual inspection + text search of rendered DOM |
| BR-2 | The replacement name must be exactly "Stark Space" (two words, both capitalized) | Grep source for exact casing |
| BR-3 | Derived identifiers (URLs, email) should use "starkspace" (no hyphen) or "stark-space" (hyphenated) consistently | Review all URL/email references |
| BR-4 | The tagline and mission copy should be updated to be coherent with the new name | Manual copy review |

---

## 4. Data Requirements

### Sources
| Source | Type | Description |
|--------|------|-------------|
| `packages/ui/src/constants/companyInfo.ts` | Static constant | Central COMPANY_INFO object (email, address, phone, tagline) |
| `packages/ui/src/constants/featureCards.ts` | Static constant | Feature card descriptions referencing the company name |
| `apps/web/src/App.tsx` | Component props | Hardcoded brandName and social link URLs |
| `apps/web/src/pages/LandingPage.tsx` | Component props | Hardcoded headline, subHeadline, sectionTitle, and body text |
| `apps/web/index.html` | HTML | `<title>` tag |

### Schema
```typescript
// No schema changes. Existing interfaces remain the same.
// packages/ui/src/types — CompanyInfo, SocialLink, FeatureCardData unchanged.

// Updated constant values:
const COMPANY_INFO: CompanyInfo = {
  address: '1 Stark Drive, Cape Canaveral, FL 32920, USA',  // was "1 Stellar Drive"
  email: 'contact@starkspace.com',                           // was "contact@stellarhorizons.com"
  phone: '+1 (800) 867-5309',                                // unchanged
  tagline: 'Where humanity meets the stars — your journey beyond Earth starts here.', // unchanged or updated
};
```

### State Management
- **Redux**: N/A — no Redux usage in current codebase
- **Local**: N/A — no component state changes required
- **URL**: N/A — no URL parameter changes

---

## 5. UI/UX

- **Wireframes**: No wireframe changes. Layout and visual design remain identical; only text content changes.
- **Component structure**: No structural changes. Affected components receive updated string props/constants:
  - `Navbar` — `brandName` prop
  - `Footer` — `companyName` prop
  - `Hero` — `subHeadline` prop
  - `FeaturesGrid` — `sectionTitle` prop
  - `MissionStrip` — `title` and `body` props
  - `CtaBanner` — no company name reference (unchanged)
  - `CompanyInfoBlock` — consumes updated `COMPANY_INFO`
- **Responsive**: No changes. Text replacement does not affect responsive behavior. Verify no text overflow on mobile for "Stark Space" (shorter than "Stellar Horizons" — no risk).
- **Accessibility**: No changes. WCAG compliance unaffected. Verify screen readers announce "Stark Space" correctly.

---

## 6. Non-Functional Requirements

- **Performance**: No impact. Static text replacement only; no new assets, API calls, or bundle size changes.
- **Browser support**: No changes to browser support matrix. Existing support maintained.
- **i18n**: N/A — application is English-only. No i18n framework in use.
- **Security**: No impact. No new inputs, endpoints, or data flows. CSP headers unchanged.

---

## 7. Integration

### Affected Packages
| Package | Impact | Changes |
|---------|--------|---------|
| `@space-tourism/ui` | Medium | Update `companyInfo.ts` constants, `featureCards.ts` descriptions |
| `@space-tourism/web` | Medium | Update `App.tsx` (brandName props, social links), `LandingPage.tsx` (content props), `index.html` (title) |
| `e2e` | Low | Update any E2E test assertions that match on "Stellar Horizons" |

### API Contracts
```
N/A — No API endpoints exist. This is a static frontend application.
```

---

## 8. Testing

### Unit Tests
- [ ] `packages/ui/src/components/Navbar/Navbar.test.tsx` — Update all assertions from "Stellar Horizons" to "Stark Space"
- [ ] `packages/ui/src/components/Footer/Footer.test.tsx` — Update all assertions from "Stellar Horizons" to "Stark Space"
- [ ] `apps/web/src/__tests__/navigation.test.tsx` — Update assertion on line 50 from "Stellar Horizons" to "Stark Space"

### Integration Tests
- [ ] Verify Navbar renders "Stark Space" when consuming updated constants
- [ ] Verify Footer renders "Stark Space" and updated social links
- [ ] Verify LandingPage content sections display updated copy

### E2E Scenarios (Playwright)
- [ ] E2E-1: Landing page brand verification — Steps: navigate to `/`, verify page title is "Stark Space", verify Navbar brand text is "Stark Space", verify Hero subheadline contains "Stark Space", verify features section title contains "Stark Space"
- [ ] E2E-2: Footer brand verification — Steps: navigate to `/`, scroll to footer, verify company name is "Stark Space", verify social links contain "stark" in URLs
- [ ] E2E-3: Contact page brand verification — Steps: navigate to `/contact`, verify company info block shows updated email and address
- [ ] E2E-4: Mobile navigation brand verification — Steps: set viewport to mobile, navigate to `/`, open mobile nav drawer, verify brand name is "Stark Space"
- **Auth required**: No — public pages only
- **Figma reference**: N/A

---

## 9. Rollout
- **Feature flag**: N/A — This is a simple branding change. No feature flag needed; deploy as a single atomic change.
- **Phases**: 1) Update all source files and constants → 2) Run full test suite → 3) Deploy to production

---

## 10. Open Questions
| ID | Question | Owner | Due | Status |
|----|----------|-------|-----|--------|
| Q1 | Should the tagline "Where humanity meets the stars..." be updated to mention "Stark Space" explicitly, or remain as-is? Default assumption: keep current tagline unchanged. | Requestor | TBD | Open |
| Q2 | What are the correct social media handles for Stark Space? Default assumption: `github.com/stark-space`, `twitter.com/starkspace`, `linkedin.com/company/stark-space` | Requestor | TBD | Open |
| Q3 | Should the contact email be `contact@starkspace.com` or `contact@stark-space.com`? Default assumption: `contact@starkspace.com` | Requestor | TBD | Open |
| Q4 | Should the street address change from "1 Stellar Drive" to "1 Stark Drive" or remain unchanged? Default assumption: change to "1 Stark Drive" | Requestor | TBD | Open |
| Q5 | Should package names (`@space-tourism/web`, `@space-tourism/ui`, `space-tourism`) be updated? Default assumption: No — out of scope for this change. | Requestor | TBD | Open |

---

## 11. Change Tracking

| Version | Date | Author | Changes | Status |
|---------|------|--------|---------|--------|
| 1.0 | 2026-04-08 | Analyst | Initial requirements based on feature request | Ready for Architecture Review |

---

## 12. Appendix
- **Glossary**:
  - **Stark Space**: The new company name replacing "Stellar Horizons"
  - **Stellar Horizons**: The current (to be replaced) company name
  - **COMPANY_INFO**: Centralized constant object in `packages/ui/src/constants/companyInfo.ts` holding company contact details
- **References**:
  - Current source: `packages/ui/src/constants/companyInfo.ts`
  - Current source: `packages/ui/src/constants/featureCards.ts`
  - App entry: `apps/web/src/App.tsx`
  - Landing page: `apps/web/src/pages/LandingPage.tsx`
  - HTML template: `apps/web/index.html`
