# Issue Plan - Life Story

**Updated**: 2026-02-05
**Open**: 13 issues | **Closed this session**: 3 (#52, #53, #58)

---

## Phase 2: Content Tone Overhaul (3 issues, ~10 hr) ← CURRENT

| #   | Title                                                                  | Effort | Status  |
|-----|------------------------------------------------------------------------|--------|---------|
| 61  | Career section tone is inappropriately dark — 'what was done to you' framing | hard   | pending |
| 60  | Tone down generational comparison sections — too bleak and depressing  | hard   | pending |
| 64  | Switch report content from second-person 'you' to objective/third-person voice | hard   | pending |

## Phase 3: Content Quality (3 issues, ~7 hr)

| #   | Title                                                                  | Effort | Status  |
|-----|------------------------------------------------------------------------|--------|---------|
| 59  | Curate celebrity birthday lists to max 10 recognizable names per day   | hard   | pending |
| 62  | Formative years/childhood content is saccharine and schlocky           | hard   | pending |
| 63  | Remove content repetition across report sections                       | med    | pending |

## Phase 4: Theme & Readability Polish (4 issues, ~2 hr)

| #   | Title                                                                  | Effort | Status  |
|-----|------------------------------------------------------------------------|--------|---------|
| 55  | Constrain line length with max-w-prose for better readability          | easy   | pending |
| 54  | Add 'back to landing page' navigation element                         | easy   | pending |
| 67  | Timeline theme: switch body text to a sans-serif font for readability  | easy   | pending |
| 65  | Newspaper theme: fix word spacing by reducing font size or increasing column width | easy   | pending |

## Backlog (Nice-to-Have)

| #   | Title                                                                  | Effort | Status  |
|-----|------------------------------------------------------------------------|--------|---------|
| 57  | Add share/copy URL button for reports                                  | easy   | pending |
| 56  | Add reading progress indicator for long content                        | easy   | pending |
| 66  | Case file theme feels cheesy — consider redesign or removal            | hard   | pending |

---

## Archive (Completed)

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
- `/tg-bugfix phase 2` - Work through current phase (Content Tone Overhaul)
- `/tg-bugfix #55` - Quick win: Constrain line length with max-w-prose (~30 min)

**Other commands**:
- `/tg-issue` - Log a new issue
- `/tg-review` - Review before shipping
