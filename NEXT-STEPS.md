# Next Steps - Life Story
Last Updated: 2026-02-05

## Immediate Tasks (Start Here)

### 1. Share/Copy URL Button (#57)
**Priority**: MEDIUM
**File(s)**: `src/components/ThemeSwitcher.jsx`
**What to do**: Add a "Copy Link" or "Share" button to the ThemeSwitcher sidebar/bottom sheet. Use `navigator.clipboard.writeText(window.location.href)` with a brief toast/feedback.
**Why**: URLs are already shareable — users just need a button to copy them easily.
**Estimated effort**: Quick (30 min)

### 2. Reading Progress Indicator (#56)
**Priority**: MEDIUM
**File(s)**: New component, integrate into theme layouts
**What to do**: Add a thin progress bar at the top of the page that fills as the user scrolls through content. Could be a simple scroll-percentage bar.
**Why**: Reports are ~5,000 words — progress feedback helps users orient themselves.
**Estimated effort**: Quick (30 min)

### 3. CaseFile Theme Evaluation (#66)
**Priority**: LOW
**File(s)**: `src/components/themes/CaseFileTheme.jsx`
**What to do**: Either redesign the CaseFile theme to feel more sophisticated, or remove it entirely. The "CLASSIFIED" stamps and paperclip decoration may feel cheesy.
**Why**: User feedback suggests the FBI dossier aesthetic doesn't land well.
**Estimated effort**: Substantial (2-4 hours)

## Future Enhancements

- PDF export of reports
- Heat map visualization for birthday data
- Additional years beyond 1946-2012
- Dark mode support

## Questions to Resolve

- Is the CaseFile theme worth redesigning, or should it be replaced with something else entirely?
- Should share button use Web Share API on mobile vs clipboard on desktop?

## Blockers

- None

## Next Session Starter Prompt

> "Continue working on life-story. Last session: Completed Phase 4 — 4 theme/readability issues (#67 sans-serif, #55 max-w-prose, #65 newspaper hyphens, #54 back nav). All 4 phases now complete (25+ issues closed). Next: Backlog nice-to-haves — #57 share button, #56 progress indicator. Check ISSUE-PLAN.md for the full plan."
