# Tasks: Space Tourism Company — Landing Page & Contact Page

> Generated from SPEC.md on 2026-04-03
> Total tasks: 73 | Parallel: 70 | Sequential: 3 | User stories: 8

## Dependencies & Execution Order

- **Phase 1 → Phase 2**: All setup config must complete before foundational work begins
- **Phase 2 → Phase 3+**: Foundational types, theme, constants, utils, and `SectionWrapper` must complete before any user story component work
- **Phase 3–10 stories**: All user story phases are independent of each other — run fully in parallel after Phase 2 gate
- **Phase 11 App Assembly**: Runs after all component user story phases complete (needs all components built)
- **E2E Test Phase**: Runs after Phase 11 (needs assembled app running)
- **Final Phase**: Runs after E2E (cross-cutting polish on already-built files)

---

## Phase 1: Setup

- [ ] T001 [P] [US1] Create root package.json with pnpm workspaces and turbo dev dependency — `package.json`
  - AC: Defines `workspaces` field; declares `turbo` as devDependency; includes `dev`, `build`, `lint`, `test` scripts delegating to `turbo run`; no TypeScript errors when consumed
- [ ] T002 [P] [US1] Create pnpm workspace manifest — `pnpm-workspace.yaml`
  - AC: Lists `apps/*` and `packages/*` globs; pnpm recognises all workspace packages on `pnpm install`
- [ ] T003 [P] [US1] Create Turborepo pipeline config — `turbo.json`
  - AC: Defines `build`, `dev`, `lint`, `test` tasks; `build` has `dependsOn: ["^build"]`; `dev` is persistent; `outputs` and cache settings configured; incremental cache hit completes in < 5 s
- [ ] T004 [P] [US1] Create root .gitignore — `.gitignore`
  - AC: Ignores `node_modules`, `dist`, `.turbo`, `.env*`, coverage directories, and Playwright report folders
- [ ] T005 [P] [US1] Create shared TypeScript config package manifest — `packages/tsconfig/package.json`
  - AC: `name` is `@space-tourism/tsconfig`; no runtime dependencies; exports `base.json`
- [ ] T006 [P] [US1] Create shared TypeScript base config — `packages/tsconfig/base.json`
  - AC: `strict: true`; `target: "ESNext"`; `moduleResolution: "bundler"`; `jsx: "react-jsx"`; `esModuleInterop: true`; suitable for consumption via `extends`
- [ ] T007 [P] [US1] Create shared ESLint config package manifest — `packages/eslint-config/package.json`
  - AC: `name` is `@space-tourism/eslint-config`; peerDepends on `eslint`; exports `index.js`
- [ ] T008 [P] [US1] Create shared ESLint config rules — `packages/eslint-config/index.js`
  - AC: Extends `eslint:recommended`, `plugin:react/recommended`, `plugin:@typescript-eslint/recommended`; enables `react-hooks` rules; disables `react/react-in-jsx-scope`
- [ ] T009 [P] [US1] Create `packages/ui` package manifest — `packages/ui/package.json`
  - AC: `name` is `@space-tourism/ui`; peerDependencies: `react`, `react-dom`, `antd`; devDependencies include Vitest, RTL, `@testing-library/user-event`, `@testing-library/jest-dom`, `jest-axe`; `main` points to `src/index.ts`
- [ ] T010 [P] [US1] Create `packages/ui` TypeScript config — `packages/ui/tsconfig.json`
  - AC: Extends `@space-tourism/tsconfig/base.json`; `include: ["src"]`; resolves correctly under pnpm workspace
- [ ] T011 [P] [US1] Create `apps/web` package manifest — `apps/web/package.json`
  - AC: `name` is `@space-tourism/web`; depends on `react`, `react-dom`, `react-router-dom`, `antd`, `@ant-design/icons`, `@space-tourism/ui`; devDependencies include `vite`, `@vitejs/plugin-react`, Vitest, Playwright
- [ ] T012 [P] [US1] Create `apps/web` TypeScript config — `apps/web/tsconfig.json`
  - AC: Extends `@space-tourism/tsconfig/base.json`; `include: ["src"]`; `types` array includes `vite/client`
- [ ] T013 [P] [US1] Create Vite build config for `apps/web` — `apps/web/vite.config.ts`
  - AC: Uses `@vitejs/plugin-react`; `build.rollupOptions.output.manualChunks` splits `react`/`react-dom`/`react-router-dom` into `vendor-react` and `antd`/`@ant-design/icons` into `vendor-antd`; `build.reportCompressedSize: true`; production gzipped JS target < 300 KB
- [ ] T014 [P] [US1] Create HTML entry point for `apps/web` — `apps/web/index.html`
  - AC: References `src/main.tsx` as module script; `<title>` set to company brand name; includes meta charset and viewport tags; includes CSP meta tag disallowing `unsafe-inline` scripts
- [ ] T015 [P] [US1] Create SPA redirect config for static hosting — `apps/web/public/_redirects`
  - AC: Contains exactly `/* /index.html 200`; enables deep-link navigation on Netlify/Vercel without 404
- [ ] T016 [P] [E2E] Create Playwright config — `e2e/playwright.config.ts`
  - AC: `baseURL` is `http://localhost:5173`; `webServer` block starts `pnpm turbo dev` and waits for port 5173; `testDir` points to `./e2e`; Chromium project defined; screenshots on failure enabled

---

## Phase 2: Foundational (GATE — blocks all user stories)

- [ ] T017 [P] [US1] Define all shared TypeScript interfaces and types — `packages/ui/src/types.ts`
  - AC: Exports `FeatureCardData`, `CompanyInfo`, `ContactFormValues`, `FormStatus` union (`'idle' | 'dirty' | 'submitting' | 'success' | 'error'`), `SpaceTheme`, `NavLink` (`{ label: string; to: string }`), `SocialLink` (`{ label: string; href: string; icon: React.ReactNode }`) interfaces; no runtime code; strict TypeScript compiles without error
- [ ] T018 [P] [US1] Implement Ant Design space theme token overrides — `packages/ui/src/theme/spaceTheme.ts`
  - AC: Exports `spaceTheme` consumable by AntD `ConfigProvider`; sets `algorithm: theme.darkAlgorithm`; overrides `colorPrimary: '#4F8EF7'`, `colorBgBase: '#0A0A0F'`, `colorBgContainer: '#14141F'`, `colorBorder: '#2A2A3A'`, `colorTextBase: '#E8E8E8'`, `colorTextSecondary: '#8A8A9A'`, `borderRadius: 4`; colour contrast ratios match spec (body 17.5:1, secondary 5.1:1, CTA 4.6:1)
  - Depends on: T017
- [ ] T019 [P] [US2] Define feature cards static content — `packages/ui/src/constants/featureCards.ts`
  - AC: Exports `FEATURE_CARDS: FeatureCardData[]` with 3–6 entries; each has unique `id`, a named `@ant-design/icons` import (no barrel), `title`, and `description`
  - Depends on: T017
- [ ] T020 [P] [US6] Define company info static content — `packages/ui/src/constants/companyInfo.ts`
  - AC: Exports `COMPANY_INFO: CompanyInfo` with non-empty `address`, `email`, `phone`, and `tagline` fields
  - Depends on: T017
- [ ] T021 [P] [US7] Define nav links static content — `packages/ui/src/constants/navLinks.ts`
  - AC: Exports `NAV_LINKS: NavLink[]` containing at minimum `{ label: 'Home', to: '/' }` and `{ label: 'Contact', to: '/contact' }`
  - Depends on: T017
- [ ] T022 [P] [US5] Implement mock contact submit utility — `packages/ui/src/utils/mockSubmit.ts`
  - AC: Exports `mockContactSubmit(values: ContactFormValues, options?: { simulateError?: boolean }): Promise<{ success: true; message: string }>`; resolves after ~1500 ms via `setTimeout`; throws `new Error('Network error')` when `simulateError: true`; no real HTTP calls
  - Depends on: T017
- [ ] T023 [P] [US1] Implement `SectionWrapper` component — `packages/ui/src/components/SectionWrapper/SectionWrapper.tsx`
  - AC: Renders `<section>` by default; `as` prop accepts `'section' | 'div' | 'article' | 'aside'`; forwards `className` and `aria-labelledby`; applies consistent vertical padding and max-width centering via CSS Module class; wrapped in `React.memo`
  - Depends on: T017
- [ ] T024 [P] [US1] Create `SectionWrapper` CSS module — `packages/ui/src/components/SectionWrapper/SectionWrapper.module.css`
  - AC: `.wrapper` sets `padding: 4rem 1.5rem`; `.inner` sets `max-width: 1200px; margin: 0 auto`; no horizontal overflow at 320 px viewport
  - Depends on: T023
- [ ] T025 [P] [US1] Write `SectionWrapper` unit tests — `packages/ui/src/components/SectionWrapper/SectionWrapper.test.tsx`
  - AC: Renders `<section>` by default; `as="div"` renders `<div>`; `className` prop applied; `aria-labelledby` forwarded; `jest-axe` reports zero WCAG violations; all tests pass in Vitest
  - Depends on: T023, T024
- [ ] T026 [P] [US1] Create `SectionWrapper` barrel export — `packages/ui/src/components/SectionWrapper/index.ts`
  - AC: Re-exports `SectionWrapper` as named and default export; TypeScript resolves without error
  - Depends on: T023
- [ ] T027 [P] [US1] Create `packages/ui` barrel index — `packages/ui/src/index.ts`
  - AC: Re-exports all components (`Navbar`, `Footer`, `Hero`, `FeatureCard`, `FeaturesGrid`, `MissionStrip`, `CtaBanner`, `ContactForm`, `CompanyInfoBlock`, `SectionWrapper`), all types from `types.ts`, `spaceTheme`, all constants, and `mockContactSubmit`; consumers can import any public symbol from `@space-tourism/ui`
  - Depends on: T017, T018

---

## Phase 3: User Story 7 — Shared Navbar [P0] (parallel with Phases 4–10)

- [ ] T028 [P] [US7] Write `Navbar` unit and integration tests — `packages/ui/src/components/Navbar/Navbar.test.tsx`
  - AC: Desktop — renders brand name and all nav links; active link has `aria-current="page"`; `jest-axe` zero violations; mobile — hamburger button visible; clicking it opens AntD Drawer; Escape key closes drawer; clicking a drawer link fires navigation and closes drawer; empty `links` array renders brand only without error; all tests pass in Vitest
  - Depends on: T017, T021
- [ ] T029 [P] [US7] Implement `Navbar` component — `packages/ui/src/components/Navbar/Navbar.tsx`
  - AC: Accepts `NavbarProps` (`brandName: string`, `links: NavLink[]`, `currentPath: string`); renders `<header>` containing `<nav>`; desktop: React Router `<Link>` per item; active link gets `aria-current="page"`; mobile (< 768 px): hamburger button with `aria-label="Open navigation"` and AntD `Drawer` with `aria-label="Site navigation"`; drawer closes on Escape, overlay click, and link click; local `drawerOpen` `useState`; wrapped in `React.memo`
  - Depends on: T028, T017, T021
- [ ] T030 [P] [US7] Create `Navbar` CSS module — `packages/ui/src/components/Navbar/Navbar.module.css`
  - AC: `.nav` sets `position: sticky; top: 0; z-index: 1000` with dark theme background; `.desktopLinks` hidden below 768 px (`display: none`); `.hamburger` hidden above 768 px; no horizontal overflow at 320 px
  - Depends on: T029
- [ ] T031 [P] [US7] Create `Navbar` barrel export — `packages/ui/src/components/Navbar/index.ts`
  - AC: Re-exports `Navbar` as named and default export; `NavbarProps` type re-exported
  - Depends on: T029

---

## Phase 4: User Story 8 — Shared Footer [P1] (parallel with Phases 3, 5–10)

- [ ] T032 [P] [US8] Write `Footer` unit tests — `packages/ui/src/components/Footer/Footer.test.tsx`
  - AC: Renders copyright text containing company name and year; renders tagline; renders social links with correct `href` and `aria-label`; decorative icons have `aria-hidden="true"`; rendered inside `<footer>` element; `jest-axe` zero violations; all tests pass in Vitest
  - Depends on: T017
- [ ] T033 [P] [US8] Implement `Footer` component — `packages/ui/src/components/Footer/Footer.tsx`
  - AC: Accepts `FooterProps` (`companyName: string`, `tagline: string`, `socialLinks: SocialLink[]`, `year?: number`); renders `<footer>` landmark; copyright uses `year ?? new Date().getFullYear()`; social `<a>` elements have `aria-label`; icons have `aria-hidden="true"`; wrapped in `React.memo`
  - Depends on: T032, T017
- [ ] T034 [P] [US8] Create `Footer` CSS module — `packages/ui/src/components/Footer/Footer.module.css`
  - AC: `.footer` sets dark background, vertical padding, centred text; social link list is horizontal flex row; no horizontal overflow at 320 px
  - Depends on: T033
- [ ] T035 [P] [US8] Create `Footer` barrel export — `packages/ui/src/components/Footer/index.ts`
  - AC: Re-exports `Footer` as named and default export; `FooterProps` type re-exported
  - Depends on: T033

---

## Phase 5: User Story 1 — Landing Page Hero [P0] (parallel with Phases 3–4, 6–10)

- [ ] T036 [P] [US1] Write `Hero` unit tests — `packages/ui/src/components/Hero/Hero.test.tsx`
  - AC: Renders `<h1>` with headline text; renders subHeadline; renders CTA button with correct label; clicking CTA calls `onCtaClick` exactly once; no `<img>` element for background; `jest-axe` zero violations; all tests pass in Vitest
  - Depends on: T017
- [ ] T037 [P] [US1] Implement `Hero` component — `packages/ui/src/components/Hero/Hero.tsx`
  - AC: Accepts `HeroProps` (`headline: string`, `subHeadline: string`, `ctaLabel: string`, `onCtaClick: () => void`, `backgroundImage?: string`); renders `<h1>` for headline; background applied via CSS `background-image` style — no `<img>` element; CTA is AntD `Button type="primary"`; wrapped in `React.memo`
  - Depends on: T036, T017
- [ ] T038 [P] [US1] Create `Hero` CSS module — `packages/ui/src/components/Hero/Hero.module.css`
  - AC: `.hero` sets `min-height: 100vh`; CSS gradient fallback (`dark → deep-blue`); `display: flex; align-items: center; justify-content: center`; content centred; no horizontal overflow at 320 px
  - Depends on: T037
- [ ] T039 [P] [US1] Create `Hero` barrel export — `packages/ui/src/components/Hero/index.ts`
  - AC: Re-exports `Hero` as named and default export; `HeroProps` type re-exported
  - Depends on: T037

---

## Phase 6: User Story 2 — Landing Page Features Section [P0] (parallel with Phases 3–5, 7–10)

- [ ] T040 [P] [US2] Write `FeatureCard` unit tests — `packages/ui/src/components/FeatureCard/FeatureCard.test.tsx`
  - AC: Renders title in `<h3>`; renders description text; icon has `aria-hidden="true"`; wrapped in `<article>` element; `jest-axe` zero violations; all tests pass in Vitest
  - Depends on: T017
- [ ] T041 [P] [US2] Implement `FeatureCard` component — `packages/ui/src/components/FeatureCard/FeatureCard.tsx`
  - AC: Accepts `FeatureCardProps` (`id: string`, `icon: React.ReactNode`, `title: string`, `description: string`); wraps AntD `Card` in `<article>`; renders title as `<h3>`; icon wrapper has `aria-hidden="true"`; wrapped in `React.memo`
  - Depends on: T040, T017
- [ ] T042 [P] [US2] Create `FeatureCard` CSS module — `packages/ui/src/components/FeatureCard/FeatureCard.module.css`
  - AC: `.card` uses `colorBgContainer`-equivalent background; padding and `border-radius: 4px` match space theme; subtle hover effect; no horizontal overflow at 320 px
  - Depends on: T041
- [ ] T043 [P] [US2] Create `FeatureCard` barrel export — `packages/ui/src/components/FeatureCard/index.ts`
  - AC: Re-exports `FeatureCard` as named and default export; `FeatureCardProps` type re-exported
  - Depends on: T041
- [ ] T044 [P] [US2] Write `FeaturesGrid` unit tests — `packages/ui/src/components/FeaturesGrid/FeaturesGrid.test.tsx`
  - AC: Renders correct number of cards for valid input (3–6); `console.warn` spy called when `features.length < 3`; `console.warn` spy called and only 6 cards rendered when `features.length > 6`; optional `sectionTitle` renders as `<h2>` when provided and absent when not; `jest-axe` zero violations; all tests pass in Vitest
  - Depends on: T017, T041
- [ ] T045 [P] [US2] Implement `FeaturesGrid` component — `packages/ui/src/components/FeaturesGrid/FeaturesGrid.tsx`
  - AC: Accepts `FeaturesGridProps` (`features: FeatureCardData[]`, `sectionTitle?: string`); dev-warns when count < 3 or > 6, slices to first 6 when exceeded; uses AntD `Row`/`Col` with spans `xs: 24, sm: 24, md: 12, lg: 8`; renders `sectionTitle` as `<h2>` when provided; wrapped in `React.memo`
  - Depends on: T044, T041, T017
- [ ] T046 [P] [US2] Create `FeaturesGrid` barrel export — `packages/ui/src/components/FeaturesGrid/index.ts`
  - AC: Re-exports `FeaturesGrid` as named and default export; `FeaturesGridProps` type re-exported
  - Depends on: T045

---

## Phase 7: User Story 3 — Landing Page Mission Strip [P1] (parallel with Phases 3–6, 8–10)

- [ ] T047 [P] [US3] Write `MissionStrip` unit tests — `packages/ui/src/components/MissionStrip/MissionStrip.test.tsx`
  - AC: Renders `<h2>` with title text; renders body text; `backgroundImage` prop results in `background-image` style (no `<img>`); `jest-axe` zero violations; all tests pass in Vitest
  - Depends on: T017
- [ ] T048 [P] [US3] Implement `MissionStrip` component — `packages/ui/src/components/MissionStrip/MissionStrip.tsx`
  - AC: Accepts `MissionStripProps` (`title: string`, `body: string`, `backgroundImage?: string`); renders `<h2>` for title; background applied as decorative CSS — no `<img>` element; full-width layout; wrapped in `React.memo`
  - Depends on: T047, T017
- [ ] T049 [P] [US3] Create `MissionStrip` CSS module — `packages/ui/src/components/MissionStrip/MissionStrip.module.css`
  - AC: `.strip` sets full width, dark overlay when background image present, adequate vertical padding; text legible over any background; no horizontal overflow at 320 px
  - Depends on: T048
- [ ] T050 [P] [US3] Create `MissionStrip` barrel export — `packages/ui/src/components/MissionStrip/index.ts`
  - AC: Re-exports `MissionStrip` as named and default export; `MissionStripProps` type re-exported
  - Depends on: T048

---

## Phase 8: User Story 4 — Landing Page CTA Banner [P1] (parallel with Phases 3–7, 9–10)

- [ ] T051 [P] [US4] Write `CtaBanner` unit tests — `packages/ui/src/components/CtaBanner/CtaBanner.test.tsx`
  - AC: Renders headline text; renders CTA button with correct label; clicking button calls `onCtaClick` exactly once; `jest-axe` zero violations; all tests pass in Vitest
  - Depends on: T017
- [ ] T052 [P] [US4] Implement `CtaBanner` component — `packages/ui/src/components/CtaBanner/CtaBanner.tsx`
  - AC: Accepts `CtaBannerProps` (`headline: string`, `ctaLabel: string`, `onCtaClick: () => void`); headline is `<h2>`; CTA is AntD `Button type="primary" size="large"`; wrapped in `React.memo`
  - Depends on: T051, T017
- [ ] T053 [P] [US4] Create `CtaBanner` CSS module — `packages/ui/src/components/CtaBanner/CtaBanner.module.css`
  - AC: `.banner` sets contrasting background (dark navy or electric blue tint), full width, centred content, generous vertical padding; no horizontal overflow at 320 px
  - Depends on: T052
- [ ] T054 [P] [US4] Create `CtaBanner` barrel export — `packages/ui/src/components/CtaBanner/index.ts`
  - AC: Re-exports `CtaBanner` as named and default export; `CtaBannerProps` type re-exported
  - Depends on: T052

---

## Phase 9: User Story 5 — Contact Form [P0] (parallel with Phases 3–8, 10)

- [ ] T055 [P] [US5] Write `ContactForm` unit and integration tests — `packages/ui/src/components/ContactForm/ContactForm.test.tsx`
  - AC: Empty submit shows inline required errors for all four fields; invalid email shows inline email error; name < 2 chars shows length error; message < 10 chars shows length error; valid submit calls `onSubmit` prop, button becomes disabled with `aria-busy="true"` during submission; successful resolution shows success notification and resets all fields to empty; rejected `onSubmit` shows error notification and status transitions to `'error'`; `jest-axe` zero violations in idle and error states; all tests pass in Vitest
  - Depends on: T017, T022
- [ ] T056 [P] [US5] Implement `ContactForm` component — `packages/ui/src/components/ContactForm/ContactForm.tsx`
  - AC: Accepts `ContactFormProps` (`onSubmit?: (values: ContactFormValues) => Promise<void>`; defaults to `mockContactSubmit`); local `useState<FormStatus>` drives state machine; AntD `Form` with `useForm()` manages field values; fields: `name` (required, pattern `/^[a-zA-Z\s]{2,100}$/`), `email` (required, `type: 'email'`), `subject` (required, min 3, max 150), `message` (`TextArea`, required, min 10, max 1000); submit button disabled and `aria-busy="true"` while `formStatus === 'submitting'`; success: `form.resetFields()` + `notification.success` + status `'idle'`; error: `notification.error` + status `'error'`; all `Form.Item` have `label` and `name` props; `aria-required="true"` on all required inputs; no `React.memo` (owns mutable state)
  - Depends on: T055, T017, T022
- [ ] T057 [P] [US5] Create `ContactForm` CSS module — `packages/ui/src/components/ContactForm/ContactForm.module.css`
  - AC: `.form` sets max-width (e.g. 600 px) and centres on page; `.submitRow` right-aligns submit button; no horizontal overflow at 320 px
  - Depends on: T056
- [ ] T058 [P] [US5] Create `ContactForm` barrel export — `packages/ui/src/components/ContactForm/index.ts`
  - AC: Re-exports `ContactForm` as named and default export; `ContactFormProps` type re-exported
  - Depends on: T056

---

## Phase 10: User Story 6 — Contact Company Info Block [P1] (parallel with Phases 3–9)

- [ ] T059 [P] [US6] Write `CompanyInfoBlock` unit tests — `packages/ui/src/components/CompanyInfoBlock/CompanyInfoBlock.test.tsx`
  - AC: Renders address inside `<address>` element; renders `<a href="mailto:...">` for email; renders `<a href="tel:...">` for phone; renders tagline text; `jest-axe` zero violations; all tests pass in Vitest
  - Depends on: T017, T020
- [ ] T060 [P] [US6] Implement `CompanyInfoBlock` component — `packages/ui/src/components/CompanyInfoBlock/CompanyInfoBlock.tsx`
  - AC: Accepts `CompanyInfoBlockProps` (`companyInfo: CompanyInfo`); wraps content in `<address>` element; email is `<a href="mailto:{email}">`; phone is `<a href="tel:{phone}">`; wrapped in `React.memo`
  - Depends on: T059, T017, T020
- [ ] T061 [P] [US6] Create `CompanyInfoBlock` CSS module — `packages/ui/src/components/CompanyInfoBlock/CompanyInfoBlock.module.css`
  - AC: `.block` applies card-like styling consistent with space theme; typography legible against dark background; no horizontal overflow at 320 px
  - Depends on: T060
- [ ] T062 [P] [US6] Create `CompanyInfoBlock` barrel export — `packages/ui/src/components/CompanyInfoBlock/index.ts`
  - AC: Re-exports `CompanyInfoBlock` as named and default export; `CompanyInfoBlockProps` type re-exported
  - Depends on: T060

---

## Phase 11: App Assembly (after all component phases complete)

- [ ] T063 [P] [US1] Implement React app entry point — `apps/web/src/main.tsx`
  - AC: Calls `ReactDOM.createRoot(document.getElementById('root')!).render(...)`; wraps in `<BrowserRouter>` and AntD `<ConfigProvider theme={spaceTheme}>`; `<React.StrictMode>` enabled; no TypeScript errors
  - Depends on: T027, T018, T003, T013
- [ ] T064 [P] [US1] Implement app router and layout shell — `apps/web/src/App.tsx`
  - AC: Defines `<Routes>` with `<Route path="/" element={<LandingPage />}/>` and `<Route path="/contact" element={<ContactPage />}/>`; both page components via `React.lazy`; `<Suspense>` with AntD `<Spin>` centred on dark background as fallback; renders `<Navbar>` above routes passing `NAV_LINKS`, `brandName`, `useLocation().pathname`; renders `<Footer>` below with `socialLinks`, `companyName`, `tagline`; `<main>` landmark wraps `<Routes>`
  - Depends on: T063, T027, T031, T035
- [ ] T065 [P] [US1] Implement `LandingPage` page component — `apps/web/src/pages/LandingPage.tsx`
  - AC: Lazy-loadable default export; composes `<Hero>`, `<FeaturesGrid>`, `<MissionStrip>`, `<CtaBanner>` in order; `onCtaClick` on both `Hero` and `CtaBanner` calls `useNavigate('/contact')`; `FEATURE_CARDS` constant passed to `FeaturesGrid`; `<h1>` appears exactly once; heading hierarchy `h1 → h2 → h3` maintained; no TypeScript errors
  - Depends on: T064, T039, T046, T050, T054, T019
- [ ] T066 [P] [US5] Implement `ContactPage` page component — `apps/web/src/pages/ContactPage.tsx`
  - AC: Lazy-loadable default export; composes `<ContactForm>` and `<CompanyInfoBlock>` in responsive two-column layout (AntD `Row`/`Col`: `md: 14` / `md: 10`; mobile stacked); passes `COMPANY_INFO` to `CompanyInfoBlock`; page has visible `<h1>` (e.g. "Contact Us"); heading hierarchy maintained; no TypeScript errors
  - Depends on: T064, T058, T062, T020

---

## E2E Test Phase (after all user stories, before Polish)

- [ ] T067 [P] [E2E] [US1,US2,US3,US4] Landing page render and no-overflow E2E test — `e2e/landing.spec.ts`
  - AC: Navigate to `/`; hero `<h1>` is visible; at least 3 feature cards render; mission strip `<h2>` is visible; CTA banner button visible; clicking CTA navigates to `/contact`; at 375 px viewport width `document.documentElement.scrollWidth <= window.innerWidth` (no horizontal scroll)
  - Depends on: T065
- [ ] T068 [P] [E2E] [US7,US8] Navbar routing and footer E2E test — `e2e/navigation.spec.ts`
  - AC: From `/`, click "Contact" nav link → URL is `/contact`, contact page heading visible; from `/contact`, click "Home" → URL is `/`, hero visible; active nav link has `aria-current="page"` in each state; `<footer>` element visible on both pages
  - Depends on: T065, T066
- [ ] T069 [P] [E2E] [US5] Contact form validation and happy-path E2E test — `e2e/contact-form.spec.ts`
  - AC: Navigate to `/contact`; click Submit with empty fields → all four inline required errors visible; enter invalid email → email error visible; fill all fields validly and submit → button becomes disabled during ~1500 ms → success notification containing "sent" appears → all fields reset to empty; form is re-submittable after success
  - Depends on: T066
- [ ] T070 [P] [E2E] [US7] Mobile navbar drawer E2E test — `e2e/mobile-navbar.spec.ts`
  - AC: Viewport set to 375×812; hamburger button visible; desktop links not visible; click hamburger → drawer opens with nav links visible; click a link → drawer closes, navigation occurs; open drawer → press Escape → drawer closes; `document.documentElement.scrollWidth <= window.innerWidth` at 375 px (no horizontal overflow)
  - Depends on: T065, T066

---

## Final Phase: Polish (after all E2E tests)

- [ ] T071 [US7] Accessibility audit and remediation for `Navbar` — `packages/ui/src/components/Navbar/Navbar.tsx`
  - AC: Zero WCAG 2.1 AA violations per `jest-axe`; `aria-label="Open navigation"` on hamburger; `aria-label="Site navigation"` on drawer; Escape closes drawer; `aria-current="page"` on active link; `<nav>` landmark present; keyboard Tab reaches all links; focus ring visible and not suppressed
  - Depends on: T070
- [ ] T072 [US5] Accessibility audit and remediation for `ContactForm` — `packages/ui/src/components/ContactForm/ContactForm.tsx`
  - AC: Zero WCAG 2.1 AA violations per `jest-axe`; all `Form.Item` have associated `<label>`; `aria-required="true"` on all required inputs; `aria-busy="true"` on submit button while submitting; error messages linked via `aria-describedby`; AntD notification uses `aria-live` region; focus ring not suppressed
  - Depends on: T069
- [ ] T073 [US1] Bundle size verification and Vite chunk config — `apps/web/vite.config.ts`
  - AC: `pnpm turbo build` produces total gzipped JS < 300 KB; `manualChunks` correctly separates `vendor-react` and `vendor-antd`; `@ant-design/icons` imports are named-only (no barrel import); `build.reportCompressedSize: true` output confirms sizes; Turbo cache hit on unchanged code completes in < 5 s
  - Depends on: T065, T066
