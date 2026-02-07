# Next Steps - Life Story
Last Updated: February 6, 2026

## Immediate Tasks (Start Here)

### 1. Landing Page Redesign
**Priority**: HIGH — user unhappy with current design, multiple attempts failed
**File(s)**: `src/components/DatePicker.jsx`
**What to do**: Use `/tg-themes` to present 4-6 design options BEFORE writing code. Get user approval on direction first. The current light charcoal/amber design is intentional — don't assume it needs to revert to vintage brown.
**Why**: User expressed dissatisfaction in previous sessions. Multiple blind fix attempts failed.
**Estimated effort**: Medium (design review) + Substantial (implementation)

### 2. Case File Theme Redesign (#66)
**Priority**: MEDIUM
**File(s)**: `src/components/themes/CaseFileTheme.jsx`
**What to do**: Review current implementation, propose design improvements
**Why**: Issue #66 — current design feels cheesy

### 3. Reduce PWA Precache Size
**Priority**: MEDIUM — 102 entries / 3.4MB is excessive
**File(s)**: `vite.config.js` (VitePWA globPatterns config)
**What to do**: Exclude year data JSON chunks from precache. These load on-demand and don't need offline support. Consider switching to NetworkFirst runtime caching for data files.
**Why**: 3.4MB precache slows first load. Year data is 67 files that only load when a specific birthday is entered.
**Estimated effort**: Quick

### 4. Add Test Coverage
**Priority**: LOW — no tests for key interactive components
**File(s)**: `src/components/ThemeSwitcher.jsx`, `DatePicker.jsx`, `ThemeWrapper.jsx`, `ErrorBoundary.jsx`
**What to do**: Add unit tests for ThemeSwitcher (open/close, theme change navigation), DatePicker (validation, formatting), ThemeWrapper (data loading, error states), ErrorBoundary (error rendering)
**Why**: 33 tests pass but key interactive components are untested
**Estimated effort**: Substantial

## Future Enhancements

- Lighthouse CI in GitHub Actions (a11y >= 90, perf >= 80 thresholds)
- CSP hardening — move inline SPA redirect script to external file
- Bundle size monitoring — currently at 99.2% of 75KB budget
- Focus management on route changes (useEffect in ThemeWrapper to focus tabpanel)

## Blockers

- Landing page redesign blocked on user design approval — must present options first

## Next Session Starter Prompt

> "Continue working on life-story. Last session: ran comprehensive 4-phase audit (production verification, build analysis, Lighthouse, visual regression). Fixed 7 accessibility/quality issues: contrast ratios, heading order, main landmark, FAB cursor, deprecated meta tag, unused font variable. All critical items from previous sessions resolved — CSS cascade verified on production, theme switcher confirmed clickable, PWA config already correct. Next: landing page redesign (present options with /tg-themes first). Reference NEXT-STEPS.md for details."
