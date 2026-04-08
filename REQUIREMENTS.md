# Requirements: Rebrand Company Name from "Stellar Horizons" to "Moonshot"

**Version**: 1.0 | **Date**: 2026-04-08 | **Status**: Ready for Architecture Review

> Status values: `Draft` | `Ready for Analyst Review` | `Pending Clarification` | `Ready for Architecture Review` | `Approved`

---

## 0. Original Requirement
> Preserve verbatim. NEVER modify after creation.

**Raw Request**: "Change the company name to stellar to Moonshot"
**Date**: 2026-04-08 | **Requestor**: Project stakeholder

---

## 1. Summary

**Overview**: Rebrand the space tourism website by replacing all instances of the company name "Stellar Horizons" with "Moonshot" across the entire codebase, including UI text, metadata, constants, social media references, email addresses, street addresses, and test assertions.

**Business Value**: Establishes the new brand identity ("Moonshot") consistently across the customer-facing website and all supporting code, ensuring no remnants of the old "Stellar Horizons" branding remain.

**Success Criteria**:
- [ ] Zero occurrences of "Stellar Horizons" (case-insensitive) remain in source code, constants, or test files
- [ ] All user-visible text displays "Moonshot" instead of "Stellar Horizons"
- [ ] HTML `<title>` tag reads "Moonshot"
- [ ] All existing unit tests pass with updated brand references
- [ ] All existing E2E tests pass with updated brand references
- [ ] Social media URLs and contact information updated to reflect new brand

---

## 2. Scope

### In Scope
| ID | Capability | Priority | Description |
|----|------------|----------|-------------|
| F1 | Brand name replacement | P0 | Replace "Stellar Horizons" with "Moonshot" in all UI-visible text |
| F2 | HTML metadata update | P0 | Update `<title>` tag in `index.html` from "Stellar Horizons" to "Moonshot" |
| F3 | Constants update | P0 | Update `companyInfo.ts` address ("1 Stellar Drive" → "1 Moonshot Drive") and email ("contact@stellarhorizons.com" → "contact@moonshot.com") |
| F4 | Social media URLs | P1 | Update GitHub, Twitter, LinkedIn URLs from `stellar-horizons`/`stellarhorizons` to `moonshot` equivalents |
| F5 | Feature card copy | P0 | Update marketing copy in `featureCards.ts` referencing "Stellar Horizons" |
| F6 | Landing page copy | P0 | Update hero subheadline, "Why Choose" section title, and mission statement |
| F7 | Test assertions | P0 | Update all unit and E2E test assertions that reference the old brand name |

### Out of Scope
- Logo/image asset redesign (no visual logo files exist in the current codebase)
- Domain name or hosting changes
- Package name changes (`space-tourism`, `@space-tourism/web`, `@space-tourism/ui` remain unchanged)
- SEO meta tags beyond `<title>` (none currently exist)
- Color scheme or theme changes
- Navigation link labels (Home, Destinations, Experience, About, Contact — no brand references)

### Dependencies
- No external dependencies; this is a text-replacement change across existing files

---

## 3. Functional Requirements

### User Stories

#### US-1: See Updated Brand Name in Navigation
**As a** site visitor **I want** to see "Moonshot" in the navigation bar **So that** I recognize the correct company brand.

**Acceptance Criteria**:
- [ ] Given the user loads any page, when the Navbar renders, then the brand name displays "Moonshot"
- [ ] Given the user is on mobile, when the navigation drawer opens, then the brand name displays "Moonshot"

#### US-2: See Updated Brand Name in Footer
**As a** site visitor **I want** to see "Moonshot" in the footer **So that** the brand is consistent throughout the page.

**Acceptance Criteria**:
- [ ] Given the user scrolls to the footer on any page, when the Footer renders, then the company name displays "Moonshot"
- [ ] Given the footer contains a copyright notice, when rendered, then it reads "© [year] Moonshot"

#### US-3: See Updated Brand in Landing Page Content
**As a** site visitor **I want** to see "Moonshot" in all landing page marketing copy **So that** the brand messaging is consistent.

**Acceptance Criteria**:
- [ ] Given the user loads the landing page, when the Hero section renders, then the subheadline references "Moonshot" instead of "Stellar Horizons"
- [ ] Given the user scrolls to the features section, when the section renders, then the title reads "Why Choose Moonshot"
- [ ] Given the user scrolls to the mission strip, when it renders, then the mission statement references "Moonshot"
- [ ] Given the user scrolls to feature cards, when they render, then card descriptions reference "Moonshot" instead of "Stellar Horizons"

#### US-4: See Updated Brand in Contact Page
**As a** site visitor **I want** to see updated contact information reflecting the "Moonshot" brand **So that** I can reach the correct company.

**Acceptance Criteria**:
- [ ] Given the user navigates to the contact page, when the CompanyInfoBlock renders, then the address shows "1 Moonshot Drive, Cape Canaveral, FL 32920, USA"
- [ ] Given the user views the contact email, when rendered, then it displays "contact@moonshot.com"

#### US-5: See Updated Browser Tab Title
**As a** site visitor **I want** the browser tab to display "Moonshot" **So that** I can identify the correct tab.

**Acceptance Criteria**:
- [ ] Given the user opens the website, when the page loads, then the browser tab title reads "Moonshot"

#### US-6: Updated Social Media Links
**As a** site visitor **I want** social media links to point to the correct "Moonshot" accounts **So that** I can follow the right brand.

**Acceptance Criteria**:
- [ ] Given the user clicks the GitHub social link, when navigated, then the URL contains "moonshot" (e.g., `https://github.com/moonshot`)
- [ ] Given the user clicks the Twitter social link, when navigated, then the URL contains "moonshot" (e.g., `https://twitter.com/moonshot`)
- [ ] Given the user clicks the LinkedIn social link, when navigated, then the URL contains "moonshot" (e.g., `https://linkedin.com/company/moonshot`)

### State Diagram
```
N/A — This is a static content change with no state transitions.
```

### Business Rules
| ID | Rule | Validation |
|----|------|------------|
| BR-1 | All user-visible instances of "Stellar Horizons" must be replaced with "Moonshot" | Text search across rendered pages returns zero matches for "Stellar Horizons" |
| BR-2 | All code-level references (constants, props, test fixtures) must be updated | `grep -ri "stellar" src/` returns zero matches |
| BR-3 | The tagline remains unchanged | Tagline "Where humanity meets the stars — your journey beyond Earth starts here." is not modified |
| BR-4 | Phone number remains unchanged | Phone "+1 (800) 867-5309" is not modified |

---

## 4. Data Requirements

### Sources
| Source | Type | Description |
|--------|------|-------------|
| `packages/ui/src/constants/companyInfo.ts` | Static constant | Company address, email, phone, tagline |
| `packages/ui/src/constants/featureCards.ts` | Static constant | Feature card marketing copy |
| `apps/web/src/App.tsx` | Component props | brandName, companyName, social link URLs |
| `apps/web/src/pages/LandingPage.tsx` | Inline content | Hero, features title, mission statement text |
| `apps/web/index.html` | HTML metadata | `<title>` tag |

### Schema
```typescript
// No schema changes — existing interfaces remain the same.
// Only string literal values change.

// companyInfo.ts values change:
// address: '1 Moonshot Drive, Cape Canaveral, FL 32920, USA'
// email: 'contact@moonshot.com'

// App.tsx prop values change:
// brandName: 'Moonshot'
// companyName: 'Moonshot'
```

### State Management
- **Redux**: N/A — no Redux in this project
- **Local**: No state changes; only static prop values updated
- **URL**: N/A

---

## 5. UI/UX

- **Wireframes**: N/A — no layout changes; text-only updates
- **Component structure**: No structural changes. Affected components receive updated string props/constants:
  - `Navbar` ← `brandName="Moonshot"`
  - `Footer` ← `companyName="Moonshot"`
  - `Hero` ← updated `subHeadline` text
  - `FeaturesGrid` ← updated section title
  - `MissionStrip` ← updated mission text
  - `CompanyInfoBlock` ← updated constants from `companyInfo.ts`
- **Responsive**: No changes — existing responsive behavior unaffected
- **Accessibility**: No changes — ARIA labels referencing "Stellar Horizons" should be updated to "Moonshot" if any exist

---

## 6. Non-Functional Requirements

- **Performance**: No impact — string replacements only; no new assets, API calls, or bundle size changes
- **Browser support**: No changes to existing browser support
- **i18n**: N/A — single-language site; no i18n framework in use
- **Security**: No security implications

---

## 7. Integration

### Affected Packages
| Package | Impact | Changes |
|---------|--------|---------|
| `apps/web` | High | `App.tsx` (brand props, social URLs), `LandingPage.tsx` (copy), `index.html` (title), `navigation.test.tsx` (assertions) |
| `packages/ui` | High | `companyInfo.ts` (address, email), `featureCards.ts` (copy), `Navbar.test.tsx` (assertions), `Footer.test.tsx` (assertions), `CompanyInfoBlock.test.tsx` (assertions) |
| `e2e` | Medium | Any E2E tests asserting "Stellar Horizons" text need updated expectations |

### API Contracts
```
N/A — No API endpoints; static site with no backend.
```

---

## 8. Testing

### Unit Tests
- [ ] `Navbar.test.tsx` — Update all 19 instances of "Stellar Horizons" to "Moonshot"; verify brand name renders correctly
- [ ] `Footer.test.tsx` — Update all 11 instances; verify company name and social links render with new brand
- [ ] `CompanyInfoBlock.test.tsx` — Update address ("1 Moonshot Drive") and email ("contact@moonshot.com") assertions
- [ ] `navigation.test.tsx` — Update 2 instances of "Stellar Horizons" in test props

### Integration Tests
- [ ] Verify Navbar + Footer render "Moonshot" when composed in App.tsx
- [ ] Verify CompanyInfoBlock pulls updated constants from `companyInfo.ts`

### E2E Scenarios (Playwright)
- [ ] E2E-1: Landing page brand display — Steps: navigate to "/", verify navbar shows "Moonshot", scroll to footer, verify footer shows "Moonshot"
- [ ] E2E-2: Contact page brand display — Steps: navigate to "/contact", verify navbar shows "Moonshot", verify CompanyInfoBlock shows "1 Moonshot Drive" and "contact@moonshot.com"
- [ ] E2E-3: Browser title — Steps: navigate to "/", verify page title is "Moonshot"
- [ ] E2E-4: Social links — Steps: navigate to "/", scroll to footer, verify social link hrefs contain "moonshot"
- [ ] E2E-5: Landing page copy — Steps: navigate to "/", verify hero subheadline contains "Moonshot", verify features section title contains "Moonshot"
- **Auth required**: No
- **Figma reference**: N/A

---

## 9. Rollout
- **Feature flag**: N/A — this is a one-time branding change, not a toggleable feature
- **Phases**: 1) Update all source files and constants → 2) Update all test assertions → 3) Run full test suite to verify → 4) Deploy

---

## 10. Open Questions
| ID | Question | Owner | Due | Status |
|----|----------|-------|-----|--------|
| Q1 | Are the social media URLs (GitHub, Twitter, LinkedIn) actual accounts that exist under "moonshot", or should placeholder URLs be used? | Stakeholder | TBD | Open |
| Q2 | Should the email "contact@moonshot.com" be a real configured email, or is it display-only for now? | Stakeholder | TBD | Open |
| Q3 | Should the street address remain "1 Moonshot Drive" or change to an entirely new address? Assumed: rename "Stellar" to "Moonshot" in the address. | Stakeholder | TBD | Open |
| Q4 | Is the intended new name "Moonshot" (one word) or "Moonshot Horizons" or another variation? Assumed: "Moonshot" based on the request. | Stakeholder | TBD | Open |

---

## 11. Change Tracking

| Version | Date | Author | Changes | Status |
|---------|------|--------|---------|--------|
| 1.0 | 2026-04-08 | Analyst | Initial requirements for company rebrand from "Stellar Horizons" to "Moonshot" | Ready for Architecture Review |

---

## 12. Appendix

- **Glossary**:
  - **Stellar Horizons**: The current (old) company brand name to be replaced
  - **Moonshot**: The new company brand name
  - **brandName**: Prop passed to the Navbar component for displaying the company name
  - **companyName**: Prop passed to the Footer component for displaying the company name
- **References**:
  - Affected files identified via codebase search: `apps/web/src/App.tsx`, `apps/web/src/pages/LandingPage.tsx`, `apps/web/index.html`, `packages/ui/src/constants/companyInfo.ts`, `packages/ui/src/constants/featureCards.ts`, plus 5 test files
  - Total occurrences of "Stellar" across codebase: ~45+
