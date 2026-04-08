# Tasks: Change the Company Name to Stark Space

> Generated from SPEC.md on 2026-04-08
> Total tasks: 14 | Parallel: 12 | Sequential: 2 | User stories: 4

## Dependencies & Execution Order

- **Phase 1 → Phase 2**: No setup phase needed — existing project, skip to foundational
- **Phase 2 (Foundational)**: Constants and metadata updates — GATE, blocks all user stories
- **Phase 3 (US1: Brand Name in UI)**: Update component props passing brand name — parallel with Phase 4
- **Phase 4 (US2: Social Links)**: Update social media URLs — parallel with Phase 3
- **Phase 5 (US3: Unit Tests)**: Update all unit test assertions — after Phases 3 & 4
- **E2E Test Phase**: Add brand-verification E2E tests — after all stories
- **Final Phase: Polish**: Cross-cutting verification — after E2E

---

## Phase 2: Foundational (GATE — blocks all user stories)

- [x] T001 [P] [US1] Update HTML title tag to "Stark Space" — `apps/web/index.html`
  - AC: `<title>` element text content is exactly "Stark Space"
  - AC: No other changes to the HTML file

- [x] T002 [P] [US2] Update COMPANY_INFO constant with new email and address — `packages/ui/src/constants/companyInfo.ts`
  - AC: `email` field is `contact@starkspace.com`
  - AC: `address` field is `1 Stark Drive, Cape Canaveral, FL 32920, USA`
  - AC: `phone` and `tagline` fields remain unchanged

- [x] T003 [P] [US1] Update feature card descriptions to reference "Stark Space" — `packages/ui/src/constants/featureCards.ts`
  - AC: All occurrences of "Stellar Horizons" in card descriptions replaced with "Stark Space"
  - AC: No other content or structure changes

---

## Phase 3: US1 — Brand Name in UI Components (parallel with Phase 4)

- [x] T004 [P] [US1] Update brandName, companyName, and social link URLs in App.tsx — `apps/web/src/App.tsx`
  - AC: `brandName` prop value is "Stark Space"
  - AC: `companyName` prop value is "Stark Space"
  - AC: GitHub social link href is `https://github.com/stark-space`
  - AC: Twitter social link href is `https://twitter.com/starkspace`
  - AC: LinkedIn social link href is `https://linkedin.com/company/stark-space`
  - AC: Social link labels and icons remain unchanged
  - Depends on: T001, T002, T003

- [x] T005 [P] [US1] Update LandingPage props to reference "Stark Space" — `apps/web/src/pages/LandingPage.tsx`
  - AC: `subHeadline` prop references "Stark Space" instead of "Stellar Horizons"
  - AC: `sectionTitle` prop is "Why Choose Stark Space"
  - AC: MissionStrip `title` and `body` props reference "Stark Space" instead of "Stellar Horizons"
  - AC: No structural or layout changes
  - Depends on: T001, T002, T003

---

## Phase 4: US3 — Unit Test Updates (after Phase 3)

### Tests

- [x] T006 [P] [US3] Update Navbar unit test assertions to "Stark Space" — `packages/ui/src/components/Navbar/Navbar.test.tsx`
  - AC: All assertions referencing "Stellar Horizons" changed to "Stark Space"
  - AC: Test still passes with `pnpm test`
  - Depends on: T004

- [x] T007 [P] [US3] Update Footer unit test assertions to "Stark Space" — `packages/ui/src/components/Footer/Footer.test.tsx`
  - AC: All assertions referencing "Stellar Horizons" changed to "Stark Space"
  - AC: Test still passes with `pnpm test`
  - Depends on: T004

- [x] T008 [P] [US3] Update navigation integration test assertions to "Stark Space" — `apps/web/src/__tests__/navigation.test.tsx`
  - AC: All assertions referencing "Stellar Horizons" changed to "Stark Space"
  - AC: Test still passes with `pnpm test`
  - Depends on: T004

---

## E2E Test Phase (after all user stories)

- [x] T009 [P] [E2E] [US1] Add brand name verification to landing E2E test — `e2e/landing.spec.ts`
  - AC: New test asserts navbar displays "Stark Space" text
  - AC: New test asserts hero subheadline contains "Stark Space"
  - AC: New test asserts features section title contains "Stark Space"
  - AC: New test asserts mission strip contains "Stark Space"
  - AC: All existing tests continue to pass
  - Depends on: T004, T005

- [x] T010 [P] [E2E] [US1] Add brand name verification to navigation E2E test — `e2e/navigation.spec.ts`
  - AC: New test asserts navbar brand text is "Stark Space" on both landing and contact pages
  - AC: New test asserts footer contains "Stark Space" text
  - AC: All existing tests continue to pass
  - Depends on: T004

- [x] T011 [P] [E2E] [US2] Add company info verification to contact form E2E test — `e2e/contact-form.spec.ts`
  - AC: New test asserts email link href contains `contact@starkspace.com`
  - AC: New test asserts address text contains "Stark Drive"
  - AC: All existing tests continue to pass
  - Depends on: T002, T004

- [x] T012 [P] [E2E] [US1] Add brand name verification to mobile navbar E2E test — `e2e/mobile-navbar.spec.ts`
  - AC: New test asserts navbar displays "Stark Space" text on mobile viewport
  - AC: All existing tests continue to pass
  - Depends on: T004

---

## Final Phase: Polish

- [x] T013 [US1,US2,US3] Global grep verification — no file (verification task)
  - AC: `grep -r "Stellar Horizons"` across `apps/`, `packages/`, and `e2e/` returns zero results
  - AC: `grep -r "stellarhorizons"` across `apps/`, `packages/`, and `e2e/` returns zero results (case-insensitive for email/URLs)
  - AC: `grep -r "stellar-horizons"` across `apps/`, `packages/`, and `e2e/` returns zero results
  - AC: `grep -r "Stellar Drive"` across `apps/`, `packages/`, and `e2e/` returns zero results
  - Depends on: T001, T002, T003, T004, T005, T006, T007, T008

- [x] T014 [US1,US2,US3] Run full test suite — no file (verification task)
  - AC: `pnpm test` exits with code 0 — all unit tests pass
  - AC: `pnpm exec playwright test` exits with code 0 — all E2E tests pass
  - AC: No visual regressions at 1280px desktop and 375px mobile viewports
  - Depends on: T009, T010, T011, T012, T013
