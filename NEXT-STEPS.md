# Next Steps - Life Story
Last Updated: 2026-02-05

## Immediate Tasks (Start Here)

### 1. Phase 4 Quick Wins (4 issues, ~2 hours total)
**Priority**: HIGH

- **#55 - max-w-prose**: Add `max-w-prose` to content areas for readable line length (~30 min)
  - Files: All 3 theme components in `src/components/themes/`
  - What: Wrap content sections in `max-w-prose mx-auto` for optimal reading width
  - Why: Long lines are hard to read on wide screens

- **#54 - Back navigation**: Add "back to landing page" link/button to report view (~30 min)
  - Files: Theme components or `src/components/layout/MainLayout.jsx`
  - What: Add a navigation element that returns to the date picker
  - Why: No way to go back and generate a different report

- **#67 - Sans-serif body**: Switch Timeline theme body text from Courier Prime to a sans-serif (~20 min)
  - Files: `src/components/themes/TimelineTheme.jsx`, possibly `tailwind.config.js`
  - What: Change body text font class from `font-body` (Courier Prime) to a sans-serif
  - Why: Monospace body text hurts readability

- **#65 - Newspaper spacing**: Fix word spacing in Newspaper theme columns (~30 min)
  - Files: `src/components/themes/NewspaperTheme.jsx`
  - What: Reduce font size or increase column width to fix word-spacing artifacts
  - Why: Justified text in narrow columns creates large gaps between words

## Future Enhancements

- #57 - Share/copy URL button for reports
- #56 - Reading progress indicator
- #66 - Case file theme redesign or removal

## Blockers

- None

## Next Session Starter Prompt

> "Continue working on life-story. Last session: Completed #59 (celebrity curation) — built fame scoring engine with ~900-name allow-list, curated all 12 monthly birthday files to max 10 recognizable names/day, simplified CelebrityList.jsx and assembleReport.js. Phase 3 is now fully complete (6 issues closed across 3 sessions). Next: Phase 4 quick wins — #55 max-w-prose, #54 back nav, #67 sans-serif body, #65 newspaper spacing. Check ISSUE-PLAN.md for the full plan."
