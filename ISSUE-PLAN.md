# Issue Plan - Life Story

**Updated**: 2026-02-06
**Open**: 2 issues | **Closed this session**: 10 (#71, #72, #75, #78, #79, #80, #81, #82, #83, #84)

---

## Remaining: Design Work (2 issues, both need user input)

| #   | Title                                                               | Effort | Status  |
|-----|---------------------------------------------------------------------|--------|---------|
| 74  | Landing page redesign — current design needs user-approved direction| hard   | pending |
| 66  | Case file theme feels cheesy — consider redesign or removal         | hard   | pending |

Both issues require design direction — not standard bugfixes. Use `/tg-themes` to explore options.

---

## Archive (Completed)

### Milestone Review Fixes (#79-#84)
- ✓ #79 - Race condition in ThemeWrapper async data loading (cancelled flag + cleanup)
- ✓ #80 - WCAG AA contrast failures in DatePicker (charcoal-500 → charcoal-600)
- ✓ #81 - Heat map legend contrast for Timeline/CaseFile (sepia-brown → dark-brown)
- ✓ #82 - Scroll indicators already aria-hidden (decorative gradients, no fix needed)
- ✓ #83 - Tab panels sr-only headings added to all 3 themes
- ✓ #84 - sessionStorage.setItem wrapped in try-catch

### Quality & Testing
- ✓ #73 - Test coverage: DatePicker, ThemeSwitcher, useTabState (95 tests)

### Hardening & Polish
- ✓ #76 - SPA redirect merged with CSP-compliant external scripts
- ✓ #77 - CSP hardened: script-src, style-src, connect-src directives tightened

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

**Design work** (both need user direction first):
- `/tg-themes` then `/tg-bugfix #74` - Landing page redesign
- `/tg-themes` then `/tg-bugfix #66` - Case file theme redesign

**Other commands**:
- `/tg-issue` - Log a new issue
- `/tg-review` - Review before shipping
