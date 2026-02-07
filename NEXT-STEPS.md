# Next Steps - Life Story
Last Updated: February 6, 2026

## Immediate Tasks (Start Here)

### 1. Landing Page Redesign (#74)
**Priority**: HIGH — user unhappy with current design, multiple attempts failed
**File(s)**: `src/components/DatePicker.jsx` (currently the landing page component)
**What to do**: Use `/tg-themes` to present 4-6 design options BEFORE writing code. Get user approval on direction first. The current light charcoal/amber design is intentional — don't assume it needs to revert to vintage brown.
**Why**: User expressed dissatisfaction in previous sessions. Multiple blind fix attempts failed.
**Estimated effort**: Medium (design review) + Substantial (implementation)

## Future Enhancements

- Lighthouse CI in GitHub Actions (a11y >= 90, perf >= 80 thresholds)
- E2E tests (Playwright) for full report generation flow
- Consider adding back themes in the future once core design is solid
- Consider preact or other React alternatives if bundle budget becomes tight

## Blockers

- Landing page redesign blocked on user design approval — must present options first

## Next Session Starter Prompt

> "Continue working on life-story. Last session: fixed mobile bottom sheet bug (#85), then removed Newspaper/Case File themes + ThemeSwitcher + font size controls entirely (-1,402 lines). App is now Timeline-only: cleaner codebase, smaller bundle (CSS -28%, precache -11%), 80 tests passing. Only open issue: #74 (landing page redesign). Start with `/tg-themes` to present design options — don't code until design is approved."
