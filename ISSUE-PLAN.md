# Issue Plan - Life Story

**Updated**: 2026-02-06
**Open**: 5 issues | **Closed this session**: 4 (#71, #72, #75, #78)

---

## Phase 2: UX & Design (1 issue, ~4 hr) ← CURRENT

| #   | Title                                                               | Effort | Status  |
|-----|---------------------------------------------------------------------|--------|---------|
| 74  | Landing page redesign — current design needs user-approved direction| hard   | pending |

## Phase 3: Quality & Testing (1 issue, ~2 hr)

| #   | Title                                                               | Effort | Status  |
|-----|---------------------------------------------------------------------|--------|---------|
| 73  | Test coverage gaps — key interactive components have zero tests     | med    | pending |

## Phase 4: Hardening & Polish (2 issues, ~2 hr)

| #   | Title                                                               | Effort | Status  |
|-----|---------------------------------------------------------------------|--------|---------|
| 76  | GitHub Pages SPA redirect causes extra hop + console 404            | med    | pending |
| 77  | CSP allows unsafe-inline for scripts — harden when possible         | med    | pending |

## Backlog (Hard / Exploratory)

| #   | Title                                                               | Effort | Status  |
|-----|---------------------------------------------------------------------|--------|---------|
| 66  | Case file theme feels cheesy — consider redesign or removal         | hard   | pending |

---

## Archive (Completed)

### Phase 2 / Phase 4 Fixes
- ✓ #75 - Focus management: useRouteChangeReset hook resets scroll/focus on page-level route changes
- ✓ #78 - Font optimization: all Google Fonts now non-render-blocking (media="print" onload swap)

### Phase 1: Stability & Budget
- ✓ #71 - Bundle size: dead code cleanup, budget raised to 80KB (74.4KB actual, 5.5KB headroom)
- ✓ #72 - PWA precache: 102 entries/3.4MB → 20 entries/477KB (86% reduction, data chunks runtime-cached)

### Audit & Quality (2026-02-06)
- ✓ #57 - Add share/copy URL button for reports

### UI Polish
- ✓ #56 - Added reading progress indicator bar (useScrollProgress hook + MainLayout fixed bar)

### Phase 4: Theme & Readability Polish
- ✓ #67 - Timeline theme: switched body text from Courier Prime to DM Sans (sans-serif)
- ✓ #55 - Constrained line length with max-w-prose in Timeline and CaseFile themes
- ✓ #65 - Newspaper theme: added CSS hyphens for better justified text word spacing
- ✓ #54 - Added "New Report" back-to-landing navigation in ThemeSwitcher (desktop sidebar + mobile sheet)

### Phase 3: Content Quality
- ✓ #59 - Curate celebrity birthday lists to max 10 recognizable names per day (fame scoring engine, 12 monthly files transformed)
- ✓ #62 - Formative years/childhood content rewritten in documentary journalism tone (67 files)
- ✓ #63 - Remove content repetition: dead generation sections removed, assembleReport.js simplified

### Phase 2: Content Tone Overhaul (feature/phase-2)
- ✓ #61 - Career section tone is inappropriately dark — 'what was done to you' framing
- ✓ #60 - Tone down generational comparison sections — too bleak and depressing
- ✓ #64 - Switch report content from second-person 'you' to objective/third-person voice

### Phase 1: Mobile & UX Fixes (feature/phase-1)
- ✓ #52 - Fix mobile viewport/layout issues causing empty space and content overflow
- ✓ #53 - Improve mobile tab navigation with scroll indicators
- ✓ #58 - Birthday rank/percentile section needs clearer labeling

### Phase 1: Accessibility Fixes (PR #51)
- ✓ #48 - Add ARIA tab pattern to all themes for screen reader accessibility
- ✓ #49 - Fix color contrast failures to meet WCAG AA (4.5:1 ratio)
- ✓ #50 - Hide decorative emojis from screen readers with aria-hidden

### Previously Phase 1: Code Quality
- ✓ #41 - Add bundle size tracking
- ✓ #36 - Split App.jsx into smaller modules (526 → 25 lines, 8 new modules)

### Previously Phase 2: Polish
- ✓ #8 - Storytelling improvements - enhance narrative impact

### Previously Phase 1: Quick Wins
- ✓ #20 - Housekeeping: Clean up repo files and folder organization
- ✓ #35 - Add deployment documentation to README
- ✓ #40 - Enable Dependabot for dependency updates
- ✓ #16 - Document elevation strategy (shadows vs borders)

### Previously Phase 3: Polish & Nice-to-Have
- ✓ #38 - Add service worker for offline caching

### Previously Phase 1: Content Quality
- ✓ #42 - Audit all rendered text for hardcoded dates
- ✓ #43 - Content feels repetitive - audit and improve section-by-section quality

### Previously Phase 3: Performance & Code Quality
- ✓ #32 - Fix LoadingScreen stale closure issue
- ✓ #33 - Lazy load theme components
- ✓ #39 - Optimize font loading (6 families → critical only)

### Previously Phase 4: Testing & Infrastructure
- ✓ #29 - Set up automated testing infrastructure

### Previously Phase 5: Polish & Accessibility
- ✓ #37 - Add focus trap to mobile bottom sheet

---

## Quick Actions

**Start working now**:
- `/tg-bugfix #74` - Landing page redesign (needs design input first)
- `/tg-bugfix #73` - Test coverage gaps (~2 hr)
- `/tg-bugfix #76` - SPA redirect fix (~1 hr)

**Other commands**:
- `/tg-issue` - Log a new issue
- `/tg-review` - Review before shipping
