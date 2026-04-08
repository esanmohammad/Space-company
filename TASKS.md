# Tasks: About Company Page

> Generated from SPEC.md on 2026-04-08
> Total tasks: 14 | Parallel: 8 | Sequential: 6 | User stories: 3

## Dependencies & Execution Order

- **Phase 1 → Phase 2**: Setup must complete before foundational work
- **Phase 2 → Phase 3+**: Foundational must complete before any user story
- **Phase 3 (US1 — P0)**: Core About page — blocks US2 and US3 (same files)
- **Phase 4 (US2 — P1)**: Company Story — extends US1, parallel with US3 not possible (shared files)
- **Phase 5 (US3 — P1)**: Team/Leadership — extends US1+US2, sequential after Phase 4
- **E2E Test Phase**: Runs after all story phases complete
- **Final phase**: Runs after E2E tests complete

---

## Phase 1: Setup

> No new dependencies required. All UI components exist in `@space-tourism/ui`.
> Ant Design, React Router, and Playwright are already installed.

_No tasks — existing tooling and dependencies are sufficient._

---

## Phase 2: Foundational (GATE — blocks all user stories)

- [ ] T001 [P] [US1] Create about page static content constants — `apps/web/src/constants/aboutContent.ts`
  - AC: Exports `ABOUT_HERO` object with `headline: string` and `subHeadline: string` fields
  - AC: Exports `ABOUT_MISSION` object with `title: string` and `body: string` fields
  - AC: Exports `ABOUT_VALUES` array of `FeatureCardData` items (import type from `@space-tourism/ui`) with 4–6 value entries (e.g., Safety, Innovation, Sustainability, Excellence)
  - AC: Exports `ABOUT_CTA` object with `headline: string` and `ctaLabel: string` fields
  - AC: All text is placeholder content consistent with Stellar Horizons branding
  - AC: File compiles with zero TypeScript errors

---

## Phase 3: US1 — Core About Page (P0)

### Tests

- [ ] T002 [P] [US1] Create AboutPage unit and integration tests — `apps/web/src/pages/__tests__/AboutPage.test.tsx`
  - AC: Test that AboutPage renders without crashing
  - AC: Test that Hero headline and sub-headline text from constants are visible in the DOM
  - AC: Test that Mission section title and body text are visible
  - AC: Test that at least 3 FeatureCard elements render in the values section
  - AC: Test that CtaBanner renders with correct headline and button label
  - AC: Test that CTA button click calls `navigate('/contact')` (mock `useNavigate`)
  - AC: Uses React Testing Library and Jest; mounts component inside `MemoryRouter`
  - Depends on: T001

### Components

- [ ] T003 [US1] Create AboutPage component — `apps/web/src/pages/AboutPage.tsx`
  - AC: Default-exports a `React.memo`-wrapped functional component (consistent with LandingPage pattern)
  - AC: Renders `Hero` with `headline` and `subHeadline` from `ABOUT_HERO` constants; no CTA button in hero
  - AC: Renders `SectionWrapper` containing `MissionStrip` with `title` and `body` from `ABOUT_MISSION`
  - AC: Renders `SectionWrapper` containing `FeaturesGrid` with `sectionTitle: "Our Values"` and `features` from `ABOUT_VALUES`
  - AC: Renders `CtaBanner` with `headline` and `ctaLabel` from `ABOUT_CTA`; `onCtaClick` navigates to `/contact` via `useNavigate()`
  - AC: Uses semantic `<section>` elements via `SectionWrapper` with `tag="section"`
  - AC: Heading hierarchy: `h1` in Hero → `h2` in each section (no skipped levels)
  - AC: Component has `displayName` set to `'AboutPage'`
  - AC: All imports from `@space-tourism/ui` — no new UI components created (ADR-1)
  - AC: All unit and integration tests from T002 pass
  - Depends on: T001, T002

### Integration

- [ ] T004 [US1] Register lazy-loaded /about route in App — `apps/web/src/App.tsx`
  - AC: Adds `const AboutPage = lazy(() => import('./pages/AboutPage'))` alongside existing lazy imports
  - AC: Adds `<Route path="/about" element={<AboutPage />} />` inside existing `<Suspense>` and `<Routes>` block
  - AC: Route order is consistent with existing routes (after `/contact` or alphabetical)
  - AC: Navigating to `/about` renders the AboutPage component
  - AC: Suspense fallback spinner shows while AboutPage chunk loads
  - AC: Navbar "About" link shows `aria-current="page"` when on `/about` (existing NavLink behavior)
  - AC: No changes to existing routes or components — only additive
  - Depends on: T003

---

## Phase 4: US2 — Company Story (P1)

### Content

- [ ] T005 [US2] Add company story content to constants — `apps/web/src/constants/aboutContent.ts`
  - AC: Exports `ABOUT_STORY` object with `title: string` and `body: string` fields
  - AC: Content describes Stellar Horizons founding narrative and general history (placeholder)
  - AC: Existing exports (`ABOUT_HERO`, `ABOUT_MISSION`, `ABOUT_VALUES`, `ABOUT_CTA`) are unchanged
  - AC: File compiles with zero TypeScript errors
  - Depends on: T004

### Components

- [ ] T006 [US2] Add Company Story section to AboutPage — `apps/web/src/pages/AboutPage.tsx`
  - AC: Renders an additional `SectionWrapper` containing `MissionStrip` with `ABOUT_STORY` content
  - AC: Story section appears between Mission/Vision and Values grid sections
  - AC: Uses existing `MissionStrip` component — no new components created (ADR-1)
  - AC: Heading hierarchy maintained (section uses `h2`)
  - Depends on: T005

### Tests

- [ ] T007 [US2] Update AboutPage tests for story section — `apps/web/src/pages/__tests__/AboutPage.test.tsx`
  - AC: Test that Company Story section title and body text are visible in the DOM
  - AC: All existing US1 tests continue to pass
  - Depends on: T006

---

## Phase 5: US3 — Team / Leadership (P1)

### Content

- [ ] T008 [US3] Add team/leadership content to constants — `apps/web/src/constants/aboutContent.ts`
  - AC: Exports `ABOUT_TEAM` object with `sectionTitle: string` and `members: Array<{ name: string; role: string; bio: string }>` (3–5 members)
  - AC: Content uses placeholder names and roles consistent with a space-tourism company
  - AC: Existing exports are unchanged
  - AC: File compiles with zero TypeScript errors
  - Depends on: T007

### Components

- [ ] T009 [US3] Add Team/Leadership section to AboutPage — `apps/web/src/pages/AboutPage.tsx`
  - AC: Renders a new `SectionWrapper` with `tag="section"` containing team member cards
  - AC: Team section appears after the Values grid and before the CtaBanner
  - AC: Uses Ant Design `Row`/`Col` grid (consistent with ContactPage pattern) for responsive card layout
  - AC: Each member card displays name, role, and bio text
  - AC: Section has `h2` heading maintaining heading hierarchy
  - AC: Responsive: single column on mobile (xs=24), multi-column on desktop (md=8)
  - Depends on: T008

### Tests

- [ ] T010 [US3] Update AboutPage tests for team section — `apps/web/src/pages/__tests__/AboutPage.test.tsx`
  - AC: Test that Team section heading is visible
  - AC: Test that at least 3 team member names are rendered
  - AC: All existing US1 and US2 tests continue to pass
  - Depends on: T009

---

## E2E Test Phase (after all user stories)

- [ ] T011 [P] [E2E] [US1] About page core E2E tests — `e2e/e2e/about.spec.ts`
  - AC: Uses custom `test` fixture from `./fixtures` (consistent with existing E2E tests)
  - AC: **E2E-1**: Navigates to `/about`; asserts Hero headline visible, mission section visible, ≥3 value cards rendered, CTA banner visible, footer visible
  - AC: **E2E-2**: From home page, clicks "About" nav link; asserts URL is `/about`; asserts `aria-current="page"` on About link
  - AC: **E2E-3**: On `/about`, clicks CTA button; asserts URL changes to `/contact`
  - AC: **E2E-4**: At 375×667 viewport, asserts no horizontal overflow (`scrollWidth <= clientWidth`), hamburger menu visible
  - AC: **E2E-5**: At 1280×720 viewport, asserts value cards are laid out in multiple columns (cards have different `x` positions)
  - AC: Test file follows patterns from `landing.spec.ts` and `contact-form.spec.ts`
  - Depends on: T004

- [ ] T012 [E2E] [US2,US3] About page P1 sections E2E tests — `e2e/e2e/about.spec.ts`
  - AC: Adds test that Company Story section heading and body text are visible on `/about`
  - AC: Adds test that Team/Leadership section heading is visible and ≥3 member names render
  - AC: All E2E-1 through E2E-5 tests from T011 continue to pass
  - Depends on: T010, T011

---

## Final Phase: Polish

- [ ] T013 [US1,US2,US3] Accessibility audit for AboutPage — `apps/web/src/pages/AboutPage.tsx`
  - AC: All `<section>` elements have `aria-labelledby` referencing their heading `id`
  - AC: Heading hierarchy is strictly `h1` → `h2` with no skipped levels
  - AC: CTA button is a native `<button>` element, operable via Tab + Enter/Space
  - AC: Decorative icons use `aria-hidden="true"`
  - AC: No color contrast violations (text on background meets WCAG AA 4.5:1 ratio)
  - AC: Zero horizontal overflow on viewports ≥ 320px
  - Depends on: T010, T012

- [ ] T014 [US1] Performance verification — `apps/web/src/pages/AboutPage.tsx`
  - AC: AboutPage chunk is lazy-loaded (not in main bundle); verified by checking no `AboutPage` in initial JS bundle
  - AC: `React.memo` wrapping is present on the exported component
  - AC: Lighthouse performance score ≥ 90 on `/about` route
  - AC: No unnecessary re-renders (static content, no state changes trigger re-render)
  - Depends on: T013
