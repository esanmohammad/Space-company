# Requirements: Change Theme to Light

**Version**: 1.0 | **Date**: 2026-04-09 | **Status**: Ready for Architecture Review

> Status values: `Draft` | `Ready for Analyst Review` | `Pending Clarification` | `Ready for Architecture Review` | `Approved`

---

## 0. Original Requirement
> Preserve verbatim. NEVER modify after creation.

**Raw Request**: change theme to light
**Date**: 2026-04-09 | **Requestor**: Unknown

---

## 1. Summary

**Overview**: The Space Tourism web application currently uses a dark theme with near-black backgrounds (`#0A0A0F`, `#14141F`) and light text throughout all component CSS modules and the Ant Design token configuration. This feature replaces the dark theme with a light theme across the entire application — updating `spaceTheme.ts` to use `theme.defaultAlgorithm` and replacing dark color values in all `*.module.css` files.

**Business Value**: A light theme improves readability in bright environments, broadens accessibility for users sensitive to dark interfaces, and enables a modern, clean aesthetic suitable for a broader audience.

**Success Criteria**:
- [ ] Ant Design theme algorithm is switched from `darkAlgorithm` to `defaultAlgorithm` (light) in `spaceTheme.ts`
- [ ] All component CSS modules use light backgrounds (white / near-white) and dark text
- [ ] No dark background color values (`#0A0A0F`, `#14141F`, `#0D1B3E`, `#1a1a4e`, `#1a1a2e`) remain in production CSS
- [ ] All existing E2E and unit tests pass without modification to test logic
- [ ] WCAG AA contrast ratios (≥ 4.5:1 for normal text) are maintained between text and backgrounds

---

## 2. Scope

### In Scope
| ID | Capability | Priority | Description |
|----|------------|----------|-------------|
| F1 | Ant Design theme token update | P0 | Switch `algorithm` from `theme.darkAlgorithm` to `theme.defaultAlgorithm` in `spaceTheme.ts`; replace dark `colorBgBase`, `colorBgContainer`, `colorBorder`, `colorTextBase`, `colorTextSecondary` tokens with light equivalents |
| F2 | Navbar light styling | P0 | Replace dark `#0A0A0F` background and `#2A2A3A` border in `Navbar.module.css` with light surface colors; ensure link and hamburger text remain legible on light background |
| F3 | Hero section light styling | P0 | Replace dark gradient (`#0A0A0F` → `#0D1B3E`) in `Hero.module.css` with a light gradient or light solid background |
| F4 | CtaBanner light styling | P0 | Replace dark gradient (`#0D1B3E` → `#1a1a4e`) and dark headline text color in `CtaBanner.module.css` |
| F5 | FeatureCard light styling | P0 | Replace dark `#14141F` card background in `FeatureCard.module.css` with a light card surface color |
| F6 | Footer light styling | P0 | Replace dark `#0A0A0F` background and muted dark text colors (`#8888aa`, `#555577`) in `Footer.module.css` |
| F7 | SectionWrapper compatibility | P0 | Verify `SectionWrapper.module.css` renders correctly on a light page background (currently has no background color — confirm it inherits correctly) |
| F8 | ContactForm light compatibility | P0 | Verify `ContactForm.module.css` and Ant Design form inputs render correctly on a light page background |
| F9 | MissionStrip light styling | P1 | Review `MissionStrip.module.css` for any dark color values and update to light equivalents |

### Out of Scope
- Implementing a dark/light toggle or user preference persistence
- Changing the primary brand accent color (`#4F8EF7`)
- Redesigning layout, typography scale, or spacing
- Changing page routing, navigation structure, or business logic
- Adding new components or pages
- Updating package names or monorepo configuration

### Dependencies
- Ant Design (`antd`) — provides `theme.defaultAlgorithm` and design tokens consumed via `ConfigProvider`
- All `*.module.css` files in `packages/ui/src/components/`
- `packages/ui/src/theme/spaceTheme.ts` — central theme config consumed by `apps/web`

---

## 3. Functional Requirements

### User Stories

#### US-1: Light Background on Page Load
**As a** site visitor **I want** the application to display with a light (white/near-white) background **So that** I can comfortably read content in a bright environment.

**Acceptance Criteria**:
- [ ] Given I navigate to the landing page (`/`), when the page loads, then the page background is a light color (not black or near-black `#0A0A0F`)
- [ ] Given I navigate to the contact page (`/contact`), when the page loads, then the page background is light and all form inputs are legible

#### US-2: Legible Navigation Bar
**As a** site visitor **I want** the navbar to use a light surface with dark text links **So that** navigation items are clearly readable against the light background.

**Acceptance Criteria**:
- [ ] Given the page loads on desktop, when I view the navbar, then the navbar background is light (not `#0A0A0F`) and nav link text is dark
- [ ] Given the page loads on mobile, when I open the mobile drawer, then the drawer background is light and drawer link text is dark and legible

#### US-3: Light Hero Section
**As a** site visitor **I want** the hero section to display on a light gradient or light solid background **So that** the overall page feels coherent with the light theme.

**Acceptance Criteria**:
- [ ] Given I view the hero section, when the page renders, then the hero background gradient or solid color uses light values (no dark navy or black)
- [ ] Given I view the hero section, then headline and body text maintain WCAG AA contrast against the light hero background

#### US-4: Light Feature Cards
**As a** site visitor **I want** feature cards to appear on a light card surface **So that** they are distinguishable from the page background while remaining readable.

**Acceptance Criteria**:
- [ ] Given I view the features grid, when the page renders, then each feature card has a light background (not `#14141F`)
- [ ] Given I hover over a feature card, then the hover shadow is subtle and appropriate for a light theme context

#### US-5: Light CTA Banner
**As a** site visitor **I want** the call-to-action banner to use a light background **So that** it is visually consistent with the rest of the light-themed page.

**Acceptance Criteria**:
- [ ] Given I view the CTA banner, when the page renders, then the banner background is light (not a dark navy gradient)
- [ ] Given I view the CTA banner headline, then it is displayed in dark text with sufficient contrast on the light background

#### US-6: Light Footer
**As a** site visitor **I want** the footer to display on a light background **So that** the end of the page is consistent with the overall light theme.

**Acceptance Criteria**:
- [ ] Given I view the footer, when the page renders, then the footer background is light (not `#0A0A0F`)
- [ ] Given I view the footer, then all text (tagline, copyright, social icons) is legible in dark color on the light background

### State Diagram
```
[Current: Dark Theme Applied] → (theme CSS + token update deployed) → [Light Theme Applied]
```
No runtime state transitions — this is a static, always-on theme change with no user toggle.

### Business Rules
| ID | Rule | Validation |
|----|------|------------|
| BR-1 | Primary accent color `#4F8EF7` is preserved — only backgrounds, borders, and body text colors change | Visual inspection — accent still appears on links, icons, hover states |
| BR-2 | All text/background color pairings must meet WCAG AA (contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text) | Contrast checker tool or axe-core in automated tests |
| BR-3 | The Ant Design `spaceTheme` must use `theme.defaultAlgorithm` instead of `theme.darkAlgorithm` | Code review of `spaceTheme.ts` |
| BR-4 | No component CSS module may retain a dark background color value: `#0A0A0F`, `#14141F`, `#0D1B3E`, `#1a1a4e`, `#1a1a2e` | Grep for these hex values post-implementation |

---

## 4. Data Requirements

### Sources
| Source | Type | Description |
|--------|------|-------------|
| `packages/ui/src/theme/spaceTheme.ts` | Static config | Ant Design `ThemeConfig` object consumed by the app's `ConfigProvider` |
| `packages/ui/src/components/*/` | Static CSS | Per-component `*.module.css` files with hardcoded dark color values |

### Schema

```typescript
// packages/ui/src/theme/spaceTheme.ts — expected token shape after change
import { theme } from 'antd';
import type { ThemeConfig } from 'antd';

export const spaceTheme: ThemeConfig = {
  algorithm: theme.defaultAlgorithm, // changed from theme.darkAlgorithm
  token: {
    colorPrimary: '#4F8EF7',          // unchanged
    colorBgBase: string,               // light, e.g. '#FFFFFF'
    colorBgContainer: string,          // light surface, e.g. '#F5F5F5'
    colorBorder: string,               // light border, e.g. '#D9D9D9'
    colorTextBase: string,             // dark text, e.g. '#1A1A1A'
    colorTextSecondary: string,        // medium-dark, e.g. '#595959'
    borderRadius: 4,                   // unchanged
  },
};
```

### Color Mapping Reference

| CSS Property | Current (Dark) | Target (Light) |
|---|---|---|
| Page / navbar background | `#0A0A0F` | `#FFFFFF` or `#FAFAFA` |
| Card / container background | `#14141F` | `#F5F5F5` or `#FFFFFF` |
| Border color | `#2A2A3A` | `#D9D9D9` |
| Primary text | `#E8E8E8` | `#1A1A1A` |
| Secondary / muted text | `#8A8A9A`, `#8888aa`, `#555577` | `#595959` |
| Hero gradient | `#0A0A0F → #0D1B3E` | `#EAF0FF → #FFFFFF` (assumed) |
| CTA banner gradient | `#0D1B3E → #1a1a4e` | `#EAF0FF → #D6E4FF` (assumed) |
| Drawer link hover background | `#1a1a2e` | `#F0F5FF` (assumed) |
| Accent / primary | `#4F8EF7` | `#4F8EF7` (unchanged) |

### State Management
- **Redux**: N/A — no runtime theme state; this is a build-time/static change
- **Local**: N/A
- **URL**: N/A

---

## 5. UI/UX

- **Wireframes**: No Figma designs provided. Light theme should use standard clean, minimal light aesthetics consistent with the existing layout and spacing.
- **Component structure** (unchanged — only colors update):
  ```
  App
  ├── Navbar              ← F2: light background
  ├── Hero                ← F3: light gradient
  ├── SectionWrapper
  │   └── FeaturesGrid
  │       └── FeatureCard (×N)  ← F5: light card surface
  ├── MissionStrip        ← F9: light styling review
  ├── CtaBanner           ← F4: light gradient
  ├── SectionWrapper
  │   └── ContactForm     ← F8: compatibility check
  └── Footer              ← F6: light background
  ```
- **Responsive**: No layout changes — responsive breakpoints remain unchanged (mobile < 768px, desktop ≥ 768px). All media queries in CSS modules are preserved.
- **Accessibility**: WCAG AA minimum. Focus ring colors remain `#4F8EF7` (unchanged). Keyboard navigation unchanged.

---

## 6. Non-Functional Requirements

- **Performance**: No performance impact expected — theme change is CSS/config only. No new assets, API calls, or meaningful bundle size change.
- **Browser support**: Unchanged — modern evergreen browsers (Chrome, Firefox, Safari, Edge latest 2 versions).
- **i18n**: N/A — no text or layout changes involved.
- **Security**: N/A — no data, auth, or network changes.

---

## 7. Integration

### Affected Packages
| Package | Impact | Changes |
|---------|--------|---------|
| `packages/ui` | High | Update `spaceTheme.ts` token values and algorithm; update dark color values in all `*.module.css` files |
| `apps/web` | Low | Consumes `spaceTheme` via `ConfigProvider` — no code changes needed if the exported `spaceTheme` interface is preserved |
| `e2e` | Low | Existing E2E tests should pass as-is (they test functionality/navigation, not color values) |

### API Contracts
N/A — no API changes.

---

## 8. Testing

- **Unit**:
  - [ ] `SectionWrapper.test.tsx` — verify component renders without errors after theme update
  - [ ] `Hero.test.tsx` — verify Hero renders without errors after CSS background change
  - [ ] `FeatureCard.test.tsx` — verify card renders correctly after background color change
  - [ ] `CtaBanner.test.tsx` — verify banner renders correctly after gradient update
- **Integration**:
  - [ ] Verify Ant Design `ConfigProvider` receives updated `spaceTheme` with `defaultAlgorithm` and renders form inputs, buttons with light backgrounds
  - [ ] Verify no dark residual backgrounds appear in component snapshot tests

- **E2E Scenarios** (Playwright):
  - [ ] E2E-1: Light landing page — Steps: navigate to `/`, assert page background is not dark (`#0A0A0F` absent), assert hero section renders with light background, assert navbar is visible with light background
  - [ ] E2E-2: Light navbar desktop — Steps: navigate to `/` at 1280px width, assert navbar background is light, assert nav link text is visible
  - [ ] E2E-3: Light mobile drawer — Steps: navigate to `/` at 375px width, click hamburger button, assert drawer opens with light background and legible dark links
  - [ ] E2E-4: Light contact page — Steps: navigate to `/contact`, assert page background is light, assert contact form is visible with legible inputs
  - [ ] E2E-5: Existing suite regression — Steps: run full `contact-form.spec.ts`, `landing.spec.ts`, `mobile-navbar.spec.ts`, `navigation.spec.ts` — all must pass without modification
  - **Auth required**: No
  - **Figma reference**: N/A

---

## 9. Rollout

- **Feature flag**: `light-theme`, default: enabled. This is treated as a permanent one-way migration (no dark fallback) unless Q1 is answered otherwise.
- **Phases**:
  1. Internal — update all CSS modules and `spaceTheme.ts`, run unit + E2E tests, verify visually via Playwright screenshots
  2. GA — merge to main after all tests pass; no staged rollout required (cosmetic-only change)

---

## 10. Open Questions

| ID | Question | Owner | Due | Status |
|----|----------|-------|-----|--------|
| Q1 | Is this a permanent one-way switch to light, or should a future dark/light toggle be supported? Default assumption: permanent one-way switch. | Requestor | 2026-04-16 | Open |
| Q2 | Is there a specific design mockup or approved light color palette, or should standard Ant Design light defaults with the existing accent `#4F8EF7` be used? Default assumption: use Ant Design defaults. | Requestor | 2026-04-16 | Open |
| Q3 | Should the hero and CTA banner retain a branded blue-tinted gradient on a light base, or use a pure white/grey solid background? Default assumption: light blue-tinted gradient (e.g., `#EAF0FF → #FFFFFF`) to preserve space brand feel. | Requestor | 2026-04-16 | Open |
| Q4 | Does `MissionStrip.module.css` contain dark color values that require updating? (File identified but CSS not reviewed in requirements phase.) | Engineer | 2026-04-16 | Open |
| Q5 | Are there Ant Design component-level overrides (e.g., `components` key in `ThemeConfig`) that also need light-theme tokens? | Engineer | 2026-04-16 | Open |

---

## 11. Change Tracking

> When updating: use `~~strikethrough~~` for old text, add new text after, update version, set status to `Ready for Analyst Review`.

| Version | Date | Author | Changes | Status |
|---------|------|--------|---------|--------|
| 1.0 | 2026-04-09 | Analyst | Initial requirements based on feature request "change theme to light" | Ready for Architecture Review |

---

## 12. Appendix

### Glossary
- **Dark theme**: The current color scheme using near-black backgrounds (`#0A0A0F`) and light text (`#E8E8E8`)
- **Light theme**: The target color scheme using white/near-white backgrounds and dark text
- **`spaceTheme.ts`**: Central Ant Design `ThemeConfig` object at `packages/ui/src/theme/spaceTheme.ts`
- **`darkAlgorithm`**: Ant Design built-in algorithm that derives dark-mode token values from base tokens
- **`defaultAlgorithm`**: Ant Design built-in algorithm that derives standard light-mode token values
- **WCAG AA**: Web Content Accessibility Guidelines Level AA — requires contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (≥ 18pt or ≥ 14pt bold)

### References
- Ant Design Theming: https://ant.design/docs/react/customize-theme
- Ant Design Algorithms: https://ant.design/docs/react/customize-theme#theme-algorithm
- WCAG Contrast Checker: https://webaim.org/resources/contrastchecker/
- Affected theme config: `packages/ui/src/theme/spaceTheme.ts`
- Affected CSS modules: `Navbar.module.css`, `Hero.module.css`, `CtaBanner.module.css`, `FeatureCard.module.css`, `Footer.module.css`, `SectionWrapper.module.css`, `ContactForm.module.css`, `MissionStrip.module.css`
