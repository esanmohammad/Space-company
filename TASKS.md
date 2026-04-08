# Tasks: Rebrand "Stellar Horizons" to "Moonshot"

> Generated from SPEC.md on 2026-04-08
> Total tasks: 14 | Parallel: 12 | Sequential: 2 | User stories: 1 (US1: Rebrand to Moonshot)

## Dependencies & Execution Order

- **Phase 1 → Phase 2**: No setup phase needed — existing project with all tooling in place
- **Phase 2 (Foundational)**: Update shared constants and HTML metadata — blocks UI and test phases
- **Phase 2 → Phase 3**: Constants must be updated before UI files that import them
- **Phase 3 → Phase 4**: Source files must be updated before test assertions are aligned
- **Phase 3 stories**: All UI update tasks are independent — run in parallel
- **Phase 4**: All test update tasks are independent — run in parallel
- **E2E Test Phase**: Runs after all source and test updates complete
- **Final phase**: Runs after E2E verification

---

## Phase 2: Foundational (GATE — blocks all user story work)

- [ ] T001 [P] [US1] Replace "Stellar" references in company info constants — `packages/ui/src/constants/companyInfo.ts`
  - AC: `address` reads `"1 Moonshot Drive, Cape Canaveral, FL 32920, USA"`
  - AC: `email` reads `"contact@moonshot.com"`
  - AC: `phone` and `tagline` remain unchanged

- [ ] T002 [P] [US1] Replace "Stellar Horizons" in feature card descriptions — `packages/ui/src/constants/featureCards.ts`
  - AC: Line 14 description reads "...Moonshot carries you beyond the atmosphere..." instead of "...Stellar Horizons carries you..."
  - AC: No other card content is modified

- [ ] T003 [P] [US1] Update HTML title tag to "Moonshot" — `apps/web/index.html`
  - AC: `<title>` tag reads `Moonshot`
  - AC: No other HTML metadata is modified

---

## Phase 3: UI Brand Updates (parallel after Phase 2 gate)

- [ ] T004 [P] [US1] Replace brand name and social links in App container — `apps/web/src/App.tsx`
  - AC: `brandName` prop on Navbar is `"Moonshot"`
  - AC: `companyName` prop on Footer is `"Moonshot"`
  - AC: GitHub social link href is `https://github.com/moonshot`
  - AC: Twitter social link href is `https://twitter.com/moonshot`
  - AC: LinkedIn social link href is `https://linkedin.com/company/moonshot`
  - Depends on: T001

- [ ] T005 [P] [US1] Replace brand name in landing page copy — `apps/web/src/pages/LandingPage.tsx`
  - AC: Hero `subHeadline` reads "Moonshot offers exclusive space tourism experiences..." instead of "Stellar Horizons offers..."
  - AC: `sectionTitle` reads `"Why Choose Moonshot"`
  - AC: Mission `body` contains "Moonshot is committed to making space accessible..." instead of "Stellar Horizons is committed..."
  - Depends on: T002

---

## Phase 4: Unit Test Updates (parallel after Phase 3)

- [ ] T006 [P] [US1] Update Navbar test assertions from "Stellar Horizons" to "Moonshot" — `packages/ui/src/components/Navbar/Navbar.test.tsx`
  - AC: All 15 occurrences of `brandName="Stellar Horizons"` replaced with `brandName="Moonshot"`
  - AC: All `getByText('Stellar Horizons')` assertions replaced with `getByText('Moonshot')`
  - AC: All tests pass (`pnpm test`)
  - Depends on: T004

- [ ] T007 [P] [US1] Update Footer test assertions for brand name and social URLs — `packages/ui/src/components/Footer/Footer.test.tsx`
  - AC: All `companyName="Stellar Horizons"` replaced with `companyName="Moonshot"`
  - AC: `toContain('Stellar Horizons')` replaced with `toContain('Moonshot')`
  - AC: Twitter URL assertion updated to `https://twitter.com/moonshot`
  - AC: LinkedIn URL assertion updated to `https://linkedin.com/company/moonshot`
  - AC: YouTube URL assertion updated to `https://youtube.com/@moonshot`
  - AC: All tests pass (`pnpm test`)
  - Depends on: T004

- [ ] T008 [P] [US1] Update CompanyInfoBlock test fixtures for address and email — `packages/ui/src/components/CompanyInfoBlock/CompanyInfoBlock.test.tsx`
  - AC: Test fixture `address` reads `"1 Moonshot Drive, Cape Canaveral, FL 32920, USA"`
  - AC: Test fixture `email` reads `"contact@moonshot.com"`
  - AC: All tests pass (`pnpm test`)
  - Depends on: T001

- [ ] T009 [P] [US1] Update navigation test brandName prop — `apps/web/src/__tests__/navigation.test.tsx`
  - AC: Line 50 `brandName="Stellar Horizons"` replaced with `brandName="Moonshot"`
  - AC: All tests pass (`pnpm test`)
  - Depends on: T004

---

## E2E Test Phase (after all source and test updates)

- [ ] T010 [P] [E2E] [US1] Verify landing page brand display end-to-end — `e2e/landing.spec.ts`
  - AC: If any assertions reference "Stellar Horizons", update them to "Moonshot"
  - AC: Test verifies "Moonshot" appears in navbar brand text
  - AC: Test verifies hero subheadline contains "Moonshot"
  - AC: Test verifies features section title contains "Moonshot"
  - AC: Test verifies footer contains "Moonshot"
  - AC: Playwright test passes (`pnpm exec playwright test landing.spec.ts`)
  - Depends on: T004, T005, T006, T007

- [ ] T011 [P] [E2E] [US1] Verify navigation brand and social links end-to-end — `e2e/navigation.spec.ts`
  - AC: If any assertions reference "Stellar Horizons", update them to "Moonshot"
  - AC: Test verifies navbar displays "Moonshot"
  - AC: Test verifies social link hrefs contain "moonshot" (not "stellar")
  - AC: Playwright test passes (`pnpm exec playwright test navigation.spec.ts`)
  - Depends on: T004, T009

- [ ] T012 [P] [E2E] [US1] Verify contact page brand info end-to-end — `e2e/contact-form.spec.ts`
  - AC: If any assertions reference "Stellar Horizons" or "stellarhorizons", update them to "Moonshot"/"moonshot"
  - AC: Test verifies address shows "1 Moonshot Drive"
  - AC: Test verifies email shows "contact@moonshot.com"
  - AC: Playwright test passes (`pnpm exec playwright test contact-form.spec.ts`)
  - Depends on: T001, T008

---

## Final Phase: Polish

- [ ] T013 [US1] Verify zero remaining "Stellar Horizons" references — `apps/web/index.html`
  - AC: `grep -ri "stellar" --include="*.ts" --include="*.tsx" --include="*.html"` returns zero matches across entire repo (excluding TASKS.md, SPEC.md, REQUIREMENTS.md, node_modules, and .md planning files)
  - AC: `pnpm test` passes with zero failures
  - AC: `pnpm lint` passes with zero errors
  - Depends on: T010, T011, T012

- [ ] T014 [US1] Visual verification of all pages — `e2e/mobile-navbar.spec.ts`
  - AC: If any assertions reference "Stellar Horizons", update them to "Moonshot"
  - AC: Mobile navbar displays "Moonshot" correctly
  - AC: Playwright test passes (`pnpm exec playwright test mobile-navbar.spec.ts`)
  - Depends on: T004, T006
