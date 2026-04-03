# Requirements: Space Tourism Company — Landing Page & Contact Page

**Version**: 1.0 | **Date**: 2026-04-03 | **Status**: Ready for Architecture Review

> Status values: `Draft` | `Ready for Analyst Review` | `Pending Clarification` | `Ready for Architecture Review` | `Approved`

---

## 0. Original Requirement
> Preserve verbatim. NEVER modify after creation.

**Raw Request**: Build a space tourism company landing page and contact page inside turbo repo with react ant design and minimalist look
**Date**: 2026-04-03 | **Requestor**: esanmohammad

---

## 1. Summary

**Overview**: Build a two-page marketing website for a fictional space tourism company — a landing (home) page and a contact page — inside a Turborepo monorepo using React and Ant Design with a minimalist aesthetic. The site showcases the company's space travel offerings and provides visitors a way to get in touch.

**Business Value**: Establishes a professional web presence for the space tourism brand, converts visitor interest into leads via the contact form, and demonstrates a scalable monorepo foundation that can grow to include booking flows, dashboards, and other features.

**Success Criteria**:
- [ ] Turborepo workspace scaffolded with at least one `apps/` application and one `packages/` shared library
- [ ] Landing page renders hero section, feature highlights, and a call-to-action with minimalist Ant Design styling
- [ ] Contact page renders a validated contact form that submits successfully
- [ ] All routes are navigable via a shared navigation bar
- [ ] Site is responsive across mobile (<768 px), tablet (768–1024 px), and desktop (>1024 px)
- [ ] No console errors or accessibility violations at WCAG 2.1 AA level
- [ ] Turbo `build` and `dev` pipelines run without errors

---

## 2. Scope

### In Scope
| ID  | Capability                        | Priority | Description                                                                                     |
|-----|-----------------------------------|----------|-------------------------------------------------------------------------------------------------|
| F1  | Turborepo monorepo scaffold       | P0       | Root `turbo.json`, `package.json` workspaces, `apps/web` and `packages/ui` setup               |
| F2  | Shared UI package                 | P0       | `packages/ui` — shared Ant Design-based components (Navbar, Footer, Section wrappers)           |
| F3  | Landing page — Hero section       | P0       | Full-viewport hero with headline, sub-headline, and primary CTA button                          |
| F4  | Landing page — Features section   | P0       | Grid of 3–4 feature cards (destinations, safety, experience) using Ant Design Card              |
| F5  | Landing page — About/Mission strip| P1       | Short paragraph about the company mission with a supporting image or background                 |
| F6  | Landing page — CTA banner         | P1       | Bottom-of-page call-to-action prompting user to contact or learn more                          |
| F7  | Contact page — Contact form       | P0       | Form with Name, Email, Subject, Message fields and Ant Design Form validation                   |
| F8  | Contact page — Company info block | P1       | Display fictional address, email, phone alongside the form                                     |
| F9  | Shared Navbar                     | P0       | Logo/brand name, navigation links (Home, Contact), responsive hamburger on mobile              |
| F10 | Shared Footer                     | P1       | Copyright, social links (placeholders), tagline                                                 |
| F11 | Client-side routing               | P0       | React Router v6 routing between `/` (Landing) and `/contact` (Contact)                         |
| F12 | Minimalist design theme           | P0       | Dark space-inspired palette, ample whitespace, clean typography via Ant Design theme tokens     |

### Out of Scope
- User authentication or accounts
- Booking / reservation flow
- Payment processing
- Backend API or database integration
- CMS or content management
- Blog or editorial pages
- Multi-language / i18n (beyond English)
- Email delivery for contact form (form submits to a mock handler only)
- Analytics or tracking scripts
- Server-side rendering (SSR) or Next.js; Vite is assumed for the web app

### Dependencies
- Node.js ≥ 18 LTS
- pnpm ≥ 8 (assumed workspace manager for Turborepo best practices)
- React 18
- Ant Design 5.x
- React Router v6
- Vite 5.x (bundler for `apps/web`)
- TypeScript 5.x
- Turbo 2.x

---

## 3. Functional Requirements

### User Stories

#### US-1: View the Landing Page
**As a** prospective space traveller **I want** to see an inspiring landing page when I visit the site **So that** I understand what the company offers and feel motivated to explore further.

**Acceptance Criteria**:
- [ ] Given I navigate to `/`, when the page loads, then a full-viewport hero section is displayed with a headline, sub-headline, and a "Get in Touch" CTA button
- [ ] Given I am on the landing page, when the page is fully loaded, then a features section with at least 3 cards (e.g. Destinations, Safety, Experience) is visible below the hero
- [ ] Given I am on the landing page, when I click the primary CTA button, then I am navigated to `/contact`
- [ ] Given the page is loaded, when I scroll to the bottom, then a footer with copyright text is visible

#### US-2: Navigate Between Pages
**As a** site visitor **I want** to use the navigation bar to move between the landing page and contact page **So that** I can explore the site without using the browser back/forward buttons.

**Acceptance Criteria**:
- [ ] Given I am on any page, when the navbar renders, then I see links labelled "Home" and "Contact"
- [ ] Given I click "Home", when navigation completes, then the URL is `/` and the landing page content is shown
- [ ] Given I click "Contact", when navigation completes, then the URL is `/contact` and the contact page content is shown
- [ ] Given I am on mobile (<768 px), when the navbar renders, then links are hidden behind a hamburger icon
- [ ] Given I tap the hamburger icon on mobile, when the menu opens, then all navigation links are accessible

#### US-3: Submit the Contact Form
**As a** prospective customer **I want** to fill in and submit a contact form **So that** I can express interest in space travel packages.

**Acceptance Criteria**:
- [ ] Given I navigate to `/contact`, when the page loads, then I see a form with Name, Email, Subject, and Message fields and a Submit button
- [ ] Given I submit the form with all fields empty, when validation runs, then required-field error messages appear beneath each empty field
- [ ] Given I enter an invalid email format, when I blur or submit, then an inline error "Please enter a valid email" is shown
- [ ] Given I fill all fields correctly, when I click Submit, then the form shows a success notification ("Message sent! We'll be in touch.") and the form resets
- [ ] Given a submission is in progress, when the submit button is clicked again, then it is disabled and shows a loading spinner

#### US-4: View Company Contact Information
**As a** site visitor **I want** to see the company's address, email, and phone number on the contact page **So that** I can reach them via channels other than the form.

**Acceptance Criteria**:
- [ ] Given I navigate to `/contact`, when the page loads, then a company info block shows a fictional address, email address, and phone number
- [ ] Given I view the contact page on desktop, when the layout renders, then the form and info block appear side-by-side
- [ ] Given I view the contact page on mobile, when the layout renders, then the info block stacks above or below the form

#### US-5: Experience Responsive Design
**As a** mobile user **I want** the site to be fully usable on my phone **So that** I can browse space travel options on any device.

**Acceptance Criteria**:
- [ ] Given any page is loaded at viewport width <768 px, when I scroll, then there is no horizontal overflow
- [ ] Given any page is loaded at viewport width <768 px, when the hero section renders, then typography scales to remain readable (min 16 px body)
- [ ] Given any page is loaded at viewport width ≥1024 px, when feature cards render, then they display in a multi-column grid

### State Diagram

```
Contact Form States:

[idle] → (user fills form) → [dirty]
[dirty] → (submit clicked, validation fails) → [invalid] → (user corrects) → [dirty]
[dirty] → (submit clicked, validation passes) → [submitting]
[submitting] → (mock success) → [success] → (3s auto-reset OR user dismisses) → [idle]
[submitting] → (mock error) → [error] → (retry) → [submitting]

Navigation States:

[/] ←→ (navbar link / CTA button) ←→ [/contact]
```

### Business Rules
| ID   | Rule                                                                                      | Validation                                              |
|------|-------------------------------------------------------------------------------------------|---------------------------------------------------------|
| BR-1 | Name field: min 2 characters, max 100 characters, letters and spaces only                | Ant Design Form rule; regex `/^[a-zA-Z\s]{2,100}$/`    |
| BR-2 | Email field: valid RFC 5322 email format                                                  | Ant Design built-in `type: 'email'` rule                |
| BR-3 | Subject field: min 3 characters, max 150 characters                                      | Ant Design Form `min`/`max` rules                       |
| BR-4 | Message field: min 10 characters, max 1000 characters                                    | Ant Design Form `min`/`max` rules                       |
| BR-5 | Submit button disabled while form is submitting                                           | Button `loading` prop tied to submission state          |
| BR-6 | On successful mock submission, form resets to empty state                                 | Ant Design `form.resetFields()` after success           |
| BR-7 | Feature cards on landing page: minimum 3, maximum 6                                      | Hardcoded content array in component                    |

---

## 4. Data Requirements

### Sources
| Source             | Type         | Description                                                         |
|--------------------|--------------|---------------------------------------------------------------------|
| Static content     | Hardcoded    | Hero copy, feature card copy, company info — no external API        |
| Contact form       | Mock handler | `setTimeout`-based mock submit returning success after 1.5 s        |
| Theme tokens       | Ant Design   | Color palette, spacing, typography via `ConfigProvider` theme object |

### Schema

```typescript
// packages/ui/src/types.ts

export interface FeatureCard {
  id: string;
  icon: string;          // Ant Design icon component name or emoji fallback
  title: string;
  description: string;
}

export interface CompanyInfo {
  address: string;
  email: string;
  phone: string;
  tagline: string;
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type FormStatus = 'idle' | 'dirty' | 'submitting' | 'success' | 'error';

// Ant Design theme token overrides
export interface SpaceTheme {
  colorPrimary: string;       // e.g. '#4F8EF7' (space blue)
  colorBgBase: string;        // e.g. '#0A0A0F' (near-black)
  colorTextBase: string;      // e.g. '#E8E8E8'
  borderRadius: number;       // e.g. 4
  fontFamily: string;
}
```

### State Management
- **Local (useState / useReducer)**: Contact form status (`FormStatus`), form field values managed by Ant Design Form instance
- **Context**: Theme tokens passed via Ant Design `ConfigProvider` at app root
- **Redux / Zustand**: Not required — no shared cross-page state needed
- **URL**: Current route managed by React Router v6 (`BrowserRouter`)

---

## 5. UI/UX

### Wireframes
No Figma file provided. Layout described textually below; wireframes are assumed to be created during design phase.

### Component Structure

```
apps/web/src/
├── main.tsx                          # React root, BrowserRouter, ConfigProvider
├── App.tsx                           # Route definitions (/, /contact)
├── pages/
│   ├── LandingPage.tsx               # Composes Hero, Features, Mission, CtaBanner
│   └── ContactPage.tsx               # Composes ContactForm, CompanyInfoBlock
└── ...

packages/ui/src/
├── components/
│   ├── Navbar/
│   │   ├── Navbar.tsx                # Ant Design Menu / Drawer for mobile
│   │   └── index.ts
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── Hero/
│   │   ├── Hero.tsx                  # Full-viewport section, headline, CTA Button
│   │   └── index.ts
│   ├── FeatureCard/
│   │   ├── FeatureCard.tsx           # Ant Design Card, icon, title, description
│   │   └── index.ts
│   ├── FeaturesGrid/
│   │   ├── FeaturesGrid.tsx          # Ant Design Row/Col grid of FeatureCards
│   │   └── index.ts
│   ├── MissionStrip/
│   │   ├── MissionStrip.tsx          # Full-width section with company blurb
│   │   └── index.ts
│   ├── CtaBanner/
│   │   ├── CtaBanner.tsx             # Bottom banner with CTA button
│   │   └── index.ts
│   ├── ContactForm/
│   │   ├── ContactForm.tsx           # Ant Design Form with validation
│   │   └── index.ts
│   ├── CompanyInfoBlock/
│   │   ├── CompanyInfoBlock.tsx      # Address, email, phone display
│   │   └── index.ts
│   └── SectionWrapper/
│       ├── SectionWrapper.tsx        # Consistent padding/max-width wrapper
│       └── index.ts
├── theme/
│   └── spaceTheme.ts                 # Ant Design ConfigProvider token overrides
└── types.ts
```

### Responsive Behaviour
| Breakpoint      | Navbar              | Hero Typography | Feature Cards        | Contact Layout      |
|-----------------|---------------------|-----------------|----------------------|---------------------|
| Mobile <768 px  | Hamburger + Drawer  | 32 px headline  | 1 column stack       | Single column stack |
| Tablet 768–1024 | Inline links        | 48 px headline  | 2 column grid        | Single column stack |
| Desktop >1024   | Inline links        | 64 px headline  | 3–4 column grid      | Two-column side-by-side |

### Design — Minimalist Space Theme
- **Background**: Near-black `#0A0A0F` or `#0D0D1A`
- **Primary Accent**: Electric blue `#4F8EF7` (Ant Design `colorPrimary`)
- **Text Primary**: Off-white `#E8E8E8`
- **Text Secondary**: Muted grey `#8A8A9A`
- **Cards**: Slightly lighter background `#14141F`, subtle border `#2A2A3A`
- **Typography**: Clean sans-serif (system font stack or Inter); large headline weights
- **Whitespace**: Generous section padding (min 80 px vertical)
- **No decorative clutter**: Icons used sparingly; imagery limited to hero background (starfield/space image or CSS gradient)

### Accessibility
- WCAG 2.1 AA compliance
- Colour contrast ratio ≥ 4.5:1 for all body text on dark backgrounds
- All interactive elements keyboard-navigable (Tab, Enter, Space)
- Ant Design Form fields have associated `<label>` elements
- Images (if any) include descriptive `alt` text
- Hamburger menu button has `aria-label="Open navigation"`
- Focus indicators visible on all focusable elements

---

## 6. Non-Functional Requirements

- **Performance**: First Contentful Paint < 2 s on broadband; Lighthouse performance score ≥ 85; total initial JS bundle < 300 KB gzipped (code-splitting Ant Design icons as needed)
- **Build time**: Turbo `build` pipeline completes in < 60 s on first run, with cache hits < 5 s on subsequent runs
- **Browser support**: Chrome 110+, Firefox 110+, Safari 16+, Edge 110+; no IE support
- **i18n**: English only (en-US); no RTL requirement
- **Security**: No user data persisted; contact form submission is a client-side mock only; no API keys or secrets in source code; dependencies kept up to date via lockfile
- **TypeScript**: Strict mode enabled; no `any` types without explicit justification

---

## 7. Integration

### Affected Packages
| Package          | Impact | Changes                                                                      |
|------------------|--------|------------------------------------------------------------------------------|
| `apps/web`       | High   | New React application; Vite config, routes, page composition                 |
| `packages/ui`    | High   | New shared component library; all presentational components and theme tokens |
| Root workspace   | High   | `turbo.json`, root `package.json`, pnpm workspace config                     |

### API Contracts
No real API. Mock submission handler:

```
ContactForm mock submit:
  Input:  ContactFormValues { name, email, subject, message }
  Action: await new Promise(resolve => setTimeout(resolve, 1500))
  Output: { success: true, message: "Message received" }

  On simulated error (optional toggle for testing):
  Output: throws Error("Network error")
```

---

## 8. Testing

### Unit
- [ ] `FeatureCard` renders title, description, and icon correctly
- [ ] `Navbar` renders "Home" and "Contact" links
- [ ] `Navbar` renders hamburger button at mobile viewport width
- [ ] `ContactForm` shows validation errors when submitted empty
- [ ] `ContactForm` shows email validation error for invalid email
- [ ] `ContactForm` disables submit button while submitting
- [ ] `ContactForm` shows success notification and resets on successful mock submit
- [ ] `CompanyInfoBlock` renders address, email, and phone

### Integration
- [ ] Navigating from `/` to `/contact` via navbar "Contact" link renders the contact page
- [ ] Navigating from `/contact` to `/` via navbar "Home" link renders the landing page
- [ ] CTA button on landing page navigates to `/contact`
- [ ] `ConfigProvider` applies space theme tokens to all Ant Design components
- [ ] Form submission flow: fill → submit → loading state → success state → reset

### E2E Scenarios (Playwright)
- [ ] **E2E-1: Landing page hero renders** — Steps: navigate to `/`; assert hero headline is visible; assert CTA button is visible
- [ ] **E2E-2: Navigation works** — Steps: navigate to `/`; click "Contact" in navbar; assert URL is `/contact`; click "Home"; assert URL is `/`
- [ ] **E2E-3: Contact form validation** — Steps: navigate to `/contact`; click Submit without filling fields; assert error messages visible for all required fields
- [ ] **E2E-4: Contact form happy path** — Steps: navigate to `/contact`; fill Name, Email, Subject, Message with valid data; click Submit; assert loading spinner appears; assert success notification appears; assert form fields are cleared
- [ ] **E2E-5: Mobile navbar** — Steps: set viewport to 375×812; navigate to `/`; assert hamburger button visible; click hamburger; assert navigation drawer opens with "Home" and "Contact" links
- [ ] **E2E-6: Responsive no overflow** — Steps: set viewport to 375×812; navigate to `/`; scroll page; assert no horizontal scrollbar present
- **Auth required**: No
- **Figma reference**: N/A (no Figma file provided)

---

## 9. Rollout

- **Feature flag**: N/A — this is a greenfield project; entire site is the initial release
- **Phases**:
  1. **Phase 1 — Internal**: Scaffold Turborepo, `apps/web`, `packages/ui`; implement all components; run dev server locally
  2. **Phase 2 — QA**: Run unit, integration, and E2E tests; fix accessibility and performance issues; Lighthouse audit
  3. **Phase 3 — GA**: Deploy static build (e.g., Vercel, Netlify, or GitHub Pages); verify production build via Turbo pipeline

---

## 10. Open Questions

| ID  | Question                                                                                                                   | Owner      | Due        | Status |
|-----|----------------------------------------------------------------------------------------------------------------------------|------------|------------|--------|
| Q1  | Should the company have a real name and brand identity, or is a placeholder name (e.g. "AstroVoyage") acceptable?          | Requestor  | 2026-04-07 | Open   |
| Q2  | Is pnpm the intended package manager, or should npm/yarn be used for the Turborepo workspace?                              | Requestor  | 2026-04-07 | Open   |
| Q3  | Should `apps/web` use Vite + React, or is Next.js (App Router) preferred for the web app inside the monorepo?             | Requestor  | 2026-04-07 | Open   |
| Q4  | Is a starfield/space hero background image required, or is a CSS gradient (dark-to-deep-blue) acceptable as a default?     | Requestor  | 2026-04-07 | Open   |
| Q5  | Should the contact form POST to a real backend endpoint in a future phase, and if so, is there an existing API base URL?   | Requestor  | 2026-04-10 | Open   |
| Q6  | Are social media links in the footer real (e.g., Twitter, LinkedIn handles) or placeholders with `#` hrefs?               | Requestor  | 2026-04-07 | Open   |
| Q7  | Should the monorepo include a `packages/eslint-config` and `packages/tsconfig` for shared tooling, per Turborepo best practices? | Engineer | 2026-04-07 | Open |

---

## 11. Change Tracking

> When updating: use `~~strikethrough~~` for old text, add new text after, update version, set status to `Ready for Analyst Review`.

| Version | Date       | Author  | Changes         | Status                          |
|---------|------------|---------|-----------------|----------------------------------|
| 1.0     | 2026-04-03 | Analyst | Initial draft   | Ready for Architecture Review   |

---

## 12. Appendix

### Glossary
- **Turborepo**: A high-performance build system for JavaScript/TypeScript monorepos by Vercel, configured via `turbo.json`
- **Monorepo**: A single repository containing multiple packages or applications (`apps/`, `packages/`)
- **Ant Design (AntD)**: A React UI component library by Alibaba, providing a comprehensive set of production-ready components
- **ConfigProvider**: Ant Design's root context component for applying global theme token overrides
- **Minimalist**: Design philosophy emphasising whitespace, limited colour palette, and removal of non-essential decorative elements
- **Hero Section**: The first full-viewport section of a landing page, containing the primary headline and call-to-action
- **CTA (Call to Action)**: A button or link prompting the user to take a desired action (e.g., "Get in Touch")
- **WCAG 2.1 AA**: Web Content Accessibility Guidelines version 2.1, conformance level AA — the industry-standard accessibility target
- **FCP (First Contentful Paint)**: A Core Web Vital measuring time until the first content is painted on screen
- **pnpm**: A fast, disk-efficient Node.js package manager with native workspace support

### References
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Ant Design 5.x Documentation](https://ant.design/docs/react/introduce)
- [React Router v6 Documentation](https://reactrouter.com/en/main)
- [React 18 Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/)
- [Playwright Documentation](https://playwright.dev)
