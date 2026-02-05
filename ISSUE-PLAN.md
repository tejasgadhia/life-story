# Issue Plan - Life Story

**Generated**: 2026-02-04
**Last Updated**: 2026-02-04
**Total Open Issues**: 10

---

## Phase 1: Content Quality ← NEXT
> **High priority** - Improve content before adding more features

| # | Title | Effort | Status |
|---|-------|--------|--------|
| ~~42~~ | ~~Audit all rendered text for hardcoded dates and information~~ | med | ✓ complete |
| 43 | Content feels repetitive - audit and improve section-by-section quality | hard | pending |

**Estimated**: 4-6 hours
**Rationale**: #42 fixed (commit 6290c8a). #43 remains as the main content quality task.

---

## Phase 2: Quick Wins
> **Easy tasks** - Build momentum with fast completions

| # | Title | Effort | Status |
|---|-------|--------|--------|
| 20 | Housekeeping: Clean up repo files and folder organization | easy | pending |
| 40 | Enable Dependabot for dependency updates | easy | pending |
| 35 | Add deployment documentation to README | easy | pending |

**Estimated**: 1-2 hours
**Rationale**: Quick wins that improve project health. Can be done between larger tasks.

---

## Phase 3: Performance & Code Quality
> **Medium priority** - Technical improvements

| # | Title | Effort | Status |
|---|-------|--------|--------|
| ~~32~~ | ~~Fix LoadingScreen stale closure issue~~ | med | ✓ complete |
| 33 | Lazy load theme components | med | pending |
| 36 | Split App.jsx into smaller modules | med | pending |
| ~~39~~ | ~~Optimize font loading (6 families → critical only)~~ | med | ✓ complete |

**Estimated**: 2-4 hours
**Rationale**: #32 fixed (commit 0db1060), #39 fixed (font lazy loading). Remaining items are optimizations.

---

## Phase 4: Testing & Infrastructure
> **Foundation work** - Long-term project health

| # | Title | Effort | Status |
|---|-------|--------|--------|
| ~~29~~ | ~~Set up automated testing infrastructure~~ | hard | ✓ complete |
| 41 | Add bundle size tracking | med | pending |

**Estimated**: 2-4 hours
**Rationale**: #29 complete (commit 30a7bfc - Vitest infrastructure added). Bundle tracking remains.

---

## Phase 5: Polish & Accessibility
> **Nice-to-have** - When time permits

| # | Title | Effort | Status |
|---|-------|--------|--------|
| 37 | Add focus trap to mobile bottom sheet | med | pending |
| 38 | Add service worker for offline caching | hard | pending |
| 16 | Document elevation strategy (shadows vs borders) | easy | pending |
| 8 | Storytelling improvements - enhance narrative impact | med | pending |

**Estimated**: 6-10 hours
**Rationale**: Lower priority items. Service worker is complex; #8 builds on Phase 1 content work.

---

## Summary

| Phase | Issues | Effort | Focus |
|-------|--------|--------|-------|
| 1 | ~~#42~~, #43 | 4-6 hrs | Content quality |
| 2 | #20, #40, #35 | 1-2 hrs | Quick wins |
| 3 | ~~#32~~, #33, #36, ~~#39~~ | 2-4 hrs | Performance |
| 4 | ~~#29~~, #41 | 2-4 hrs | Testing |
| 5 | #37, #38, #16, #8 | 6-10 hrs | Polish |

**Completed**: 4 issues (#42, #32, #29, #39)
**Remaining**: 9 issues (~14-24 hours)

---

## Quick Reference

**Start here**: `#43` (high priority, content quality)
**Easy wins**: `#20`, `#40`, `#35`, `#16`
**Hardest items**: `#43`, `#38`

---

*Run `/tg-issues` to refresh status*
