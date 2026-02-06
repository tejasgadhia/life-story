# Next Steps - Life Story
Last Updated: February 5, 2026

## Immediate Tasks (Start Here)

### 1. Mobile Responsive Polish
**Priority**: HIGH
**File(s)**: All theme components in `src/components/themes/`
**What to do**: Audit each theme on mobile viewports, fix layout issues, ensure touch targets meet 44px minimum, test tab navigation on narrow screens
**Why**: Listed as priority #1 in CLAUDE.md
**Estimated effort**: Medium

### 2. Share/Copy URL Button
**Priority**: MEDIUM
**File(s)**: Theme components or new shared component
**What to do**: Add a button that copies the current report URL to clipboard. URLs are already shareable via routing, just need a UI affordance.
**Why**: Open issue #57
**Estimated effort**: Quick

## Future Enhancements

- PDF export of reports
- Heat map visualization for birthday data
- Case file theme redesign (#66)
- Additional themes

## Questions to Resolve

- Should the FAB be hidden on the landing page? (Currently shows but has no birthday context)
- PDF export: server-side or client-side generation?

## Blockers

- None

## Next Session Starter Prompt

> "Continue working on life-story. Last session: fixed loading screen so it always appears when generating a new report (4.3s staged animation), stabilized animation callbacks, moved loading orchestration to ThemeWrapper. Next: mobile responsive polish across all three themes. Reference NEXT-STEPS.md for details."
