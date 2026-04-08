# Tasks: About Page for Stellar Horizons

> Generated from SPEC.md on 2026-04-08
> Total tasks: 24 | Parallel: 20 | Sequential: 4 | User stories: 5

## Dependencies & Execution Order

- **Phase 1 → Phase 2**: Setup must complete before foundational work
- **Phase 2 → Phase 3+**: Foundational (types, constants, TeamCard) must complete before any user story page work
- **Phase 3+ stories**: All user stories are independent — run in parallel after the gate
- **E2E Test Phase**: Runs after all user story phases complete
- **Final phase**: Runs after all stories and E2E tests complete

---

## Phase 1: Setup

- [ ] T001 [P] [US0] Register lazy-loaded `/about` route in App.tsx — `apps/web/src/App.tsx`
  - AC: `React.lazy(() => import('./pages/AboutPage'))` added alongside existing LandingPage/ContactPage lazy imports
  - AC: `<Route path="/about" element={<AboutPage />} />` added inside Suspense boundary
  - AC: Existing routes unchanged; app compiles without errors

---

## Phase 2: Foundational (GATE — blocks all user stories)

- [ ] T002 [P] [US0] Define TeamMember, Milestone, CoreValue types — `packages/ui/src/types.ts`
  - AC: `TeamMember` interface with `id`, `name`, `title`, `bio`, `avatarUrl?` fields
  - AC: `Milestone` interface with `id`, `year`, `title`, `description` fields
  - AC: `CoreValue` interface with `id`, `icon`, `title`, `description` fields (matches FeatureCardData shape)
  - AC: All types exported from the file
  - Depends on: T001

- [ ] T003 [P] [US0] Create team members constant data — `packages/ui/src/constants/teamMembers.ts`
  - AC: Exports `TEAM_MEMBERS: TeamMember[]` with 4–6 fictional leadership entries
  - AC: Each entry has `id`, `name`, `title`, `bio`; `avatarUrl` optional
  - Depends on: T002

- [ ] T004 [P] [US0] Create milestones constant data — `packages/ui/src/constants/milestones.ts`
  - AC: Exports `MILESTONES: Milestone[]` with 4–6 entries in chronological order
  - AC: Each entry has `id`, `year`, `title`, `description`
  - Depends on: T002

- [ ] T005 [P] [US0] Create about values constant data — `packages/ui/src/constants/aboutValues.ts`
  - AC: Exports `ABOUT_VALUES: CoreValue[]` with 3–4 core values (Safety, Innovation, Accessibility, Discovery)
  - AC: Each entry uses an Ant Design icon identifier and matches FeatureCardData shape for FeaturesGrid compatibility
  - Depends on: T002

- [ ] T006 [P] [US0] Create TeamCard component — `packages/ui/src/components/TeamCard/TeamCard.tsx`
  - AC: Renders `name` as `<h3>`, `title` as `<p>`, `bio` as paragraph text, avatar image
  - AC: Falls back to initials-based placeholder when `avatarUrl` is undefined
  - AC: Wrapped in `<article>` element with `data-testid="team-card"`
  - AC: Uses `React.memo` for performance
  - AC: Accepts optional `className` prop
  - Depends on: T002

- [ ] T007 [P] [US0] Create TeamCard styles — `packages/ui/src/components/TeamCard/TeamCard.module.css`
  - AC: Dark theme styling consistent with existing components (background #14141F, text #E8E8E8, border #2A2A3A)
  - AC: Avatar circular with fallback initials styling
  - AC: Responsive: stacks on mobile, card layout on desktop
  - AC: Hover effect consistent with FeatureCard pattern
  - Depends on: T002

- [ ] T008 [P] [US0] Create TeamCard barrel export — `packages/ui/src/components/TeamCard/index.ts`
  - AC: Named export of `TeamCard` and `TeamCardProps` type
  - AC: Default export of `TeamCard`
  - Depends on: T006

- [ ] T009 [P] [US0] Create TeamCard unit tests — `packages/ui/src/components/TeamCard/TeamCard.test.tsx`
  - AC: Test renders name, title, bio from props
  - AC: Test renders avatar image when `avatarUrl` provided
  - AC: Test renders initials placeholder when `avatarUrl` is undefined
  - AC: Test uses `<article>` wrapper element
  - AC: Test has `<h3>` for name
  - AC: Test passes jest-axe accessibility audit
  - Depends on: T006

- [ ] T010 [US0] Export new types, constants, and TeamCard from UI package — `packages/ui/src/index.ts`
  - AC: Exports `TeamCard` component and `TeamCardProps` type
  - AC: Exports `TEAM_MEMBERS`, `MILESTONES`, `ABOUT_VALUES` constants
  - AC: Exports `TeamMember`, `Milestone`, `CoreValue` types
  - AC: All existing exports unchanged
  - Depends on: T002, T003, T004, T005, T008

---

## Phase 3: [US1 — About Page Layout & Hero] (parallel with Phase 4, 5, 6)

- [ ] T011 [P] [US1] Create AboutPage unit tests — `apps/web/src/pages/AboutPage.test.tsx`
  - AC: Test page renders without crashing
  - AC: Test Hero section displays "About Stellar Horizons" heading
  - AC: Test company story section renders narrative paragraphs
  - AC: Test CTA banner renders with correct label text
  - AC: Test CTA click calls `navigate('/contact')`
  - AC: Test passes jest-axe accessibility audit
  - Depends on: T010

- [ ] T012 [P] [US1] Create AboutPage styles — `apps/web/src/pages/AboutPage.module.css`
  - AC: Page-level container with dark background (#0A0A0F) consistent with ContactPage
  - AC: Section spacing consistent with existing pages
  - AC: Responsive layout: single column on mobile, constrained max-width on desktop
  - AC: Timeline section custom styling to match dark space theme
  - AC: Team grid section responsive styles
  - Depends on: T010

- [ ] T013 [US1] Create AboutPage component — `apps/web/src/pages/AboutPage.tsx`
  - AC: Composes Hero with headline "About Stellar Horizons", subHeadline, and CTA
  - AC: Company story section in SectionWrapper with Typography.Paragraph
  - AC: Uses `useNavigate()` for CTA → `/contact` navigation
  - AC: All sections wrapped in SectionWrapper with proper `aria-labelledby`
  - AC: Imports constants (TEAM_MEMBERS, MILESTONES, ABOUT_VALUES, COMPANY_INFO)
  - AC: Page has correct heading hierarchy: h1 → h2 → h3
  - Depends on: T010, T011, T012

---

## Phase 4: [US2 — Mission & Values Section] (parallel with Phase 3, 5, 6)

- [ ] T014 [P] [US2] Verify MissionStrip + FeaturesGrid integration in AboutPage tests — `apps/web/src/pages/AboutPage.test.tsx`
  - AC: Test mission section renders MissionStrip with mission statement text
  - AC: Test values section renders expected number of value cards (3–4)
  - AC: Test values match ABOUT_VALUES constant data
  - Note: This task ADDS tests to the file created in T011
  - Depends on: T013

---

## Phase 5: [US3 — Team Section] (parallel with Phase 3, 4, 6)

- [ ] T015 [P] [US3] Verify team section rendering in AboutPage tests — `apps/web/src/pages/AboutPage.test.tsx`
  - AC: Test team section renders expected number of TeamCard components (4–6)
  - AC: Test each card displays name, title, and bio from TEAM_MEMBERS constant
  - AC: Test team section uses responsive Ant Design Row/Col grid
  - Note: This task ADDS tests to the file created in T011
  - Depends on: T013

---

## Phase 6: [US4 — Milestones Timeline Section] (parallel with Phase 3, 4, 5)

- [ ] T016 [P] [US4] Verify milestones section in AboutPage tests — `apps/web/src/pages/AboutPage.test.tsx`
  - AC: Test milestones section renders Ant Design Timeline
  - AC: Test renders expected number of milestone items (4–6)
  - AC: Test milestones appear in chronological order
  - AC: Test each milestone shows year, title, and description
  - Note: This task ADDS tests to the file created in T011
  - Depends on: T013

---

## Phase 7: [US5 — Route Integration & Navigation] (parallel with Phase 4, 5, 6)

- [ ] T017 [P] [US5] Add About route tests to App test suite — `apps/web/src/App.test.tsx`
  - AC: Test `/about` route renders AboutPage component
  - AC: Test lazy loading with Suspense shows loading spinner then page
  - AC: Test navigation from About CTA to `/contact` works
  - AC: Existing route tests unchanged
  - Depends on: T013

---

## E2E Test Phase (after all user stories)

- [ ] T018 [P] [E2E] [US1,US5] About page navigation E2E test — `e2e/about.spec.ts`
  - AC: Navigate to `/`, click "About" nav link, verify URL is `/about`
  - AC: Verify heading "About Stellar Horizons" is visible
  - AC: Verify "About" nav link has `aria-current="page"` active state
  - AC: Uses custom test fixture from `fixtures.ts` (consistent with existing E2E tests)
  - Depends on: T013, T017

- [ ] T019 [P] [E2E] [US1,US2,US3,US4] About page content sections E2E — `e2e/about.spec.ts`
  - AC: Navigate to `/about`, verify story section visible
  - AC: Verify mission/values section renders with value cards
  - AC: Verify team section renders with team member cards
  - AC: Verify milestones timeline section renders with timeline items
  - Note: This task ADDS test cases to the file created in T018
  - Depends on: T018

- [ ] T020 [P] [E2E] [US1] About page CTA navigation E2E — `e2e/about.spec.ts`
  - AC: Navigate to `/about`, click CTA "Get in Touch" button
  - AC: Verify URL changes to `/contact`
  - Note: This task ADDS test cases to the file created in T018
  - Depends on: T018

- [ ] T021 [P] [E2E] [US1] About page mobile responsive E2E — `e2e/about.spec.ts`
  - AC: Set viewport to 375×667, navigate to `/about`
  - AC: Verify no horizontal scrollbar
  - AC: Verify team cards are stacked vertically
  - AC: Verify all sections are visible and readable
  - Note: This task ADDS test cases to the file created in T018
  - Depends on: T018

- [ ] T022 [P] [E2E] [US1] About page accessibility E2E — `e2e/about.spec.ts`
  - AC: Navigate to `/about`, run axe accessibility scan
  - AC: No critical or serious accessibility violations
  - AC: Verify heading hierarchy (h1 → h2 → h3)
  - Note: This task ADDS test cases to the file created in T018
  - Depends on: T018

---

## Final Phase: Polish

- [ ] T023 [US1,US2,US3,US4] Accessibility audit on AboutPage — `apps/web/src/pages/AboutPage.tsx`
  - AC: WCAG 2.1 AA compliance verified
  - AC: Keyboard navigation through all interactive elements (CTA button)
  - AC: Heading hierarchy h1 → h2 → h3 confirmed correct
  - AC: All `aria-labelledby` attributes reference valid IDs
  - AC: Color contrast meets 4.5:1 ratio on dark background
  - AC: Team member avatars have proper `alt` text
  - Depends on: T013, T014, T015, T016

- [ ] T024 [US1,US2,US3,US4] Performance verification — `apps/web/src/pages/AboutPage.tsx`
  - AC: AboutPage lazy chunk size < 50KB (verified via build output)
  - AC: Page load < 2s on simulated 3G in Playwright
  - AC: No unnecessary re-renders (static content, no state)
  - AC: `React.memo` on TeamCard confirmed working
  - Depends on: T013, T023
