# Next Steps - Life Story
Last Updated: 2026-02-05

## Immediate Tasks (Start Here)

### 1. Celebrity Curation (#59)
**Priority**: HIGH
**File(s)**: `src/data/birthdays/*.json` (12 files), `src/utils/assembleReport.js`, `src/components/shared/CelebrityList.jsx`
**What to do**:
- Write a curation script that scores ~28-30 celebrities per day for recognizability
- Keep max 10 per day, prioritizing household-name recognition and category diversity
- Flatten from `celebrities_categorized` structure to flat `celebrities` array
- Update assembleReport.js to read flat array instead of categorized
- Update CelebrityList.jsx — remove "Show all" toggle (list is always <=10)
**Why**: User feedback says "I recognize almost none of these names" — the oldest-first sort shows the most obscure entries
**Estimated effort**: Substantial (~3-4 hours)

### 2. Phase 4 Quick Wins (4 issues, ~2 hours total)
**Priority**: MEDIUM

- **#55 - max-w-prose**: Add `max-w-prose` to content areas for readable line length (~30 min)
- **#54 - Back navigation**: Add "back to landing page" link/button to report view (~30 min)
- **#67 - Sans-serif body**: Switch Timeline theme body text from Courier Prime to a sans-serif (~20 min)
- **#65 - Newspaper spacing**: Fix word spacing in Newspaper theme columns (~30 min)

## Future Enhancements

- #57 - Share/copy URL button for reports
- #56 - Reading progress indicator
- #66 - Case file theme redesign or removal

## Questions to Resolve

- Celebrity curation approach: LLM-based scoring vs. static allow-list vs. Wikipedia page views API?
- Should we keep `celebrities_categorized` as a backward-compatible field or remove entirely?

## Next Session Starter Prompt

> "Continue working on life-story. Last session: Completed Phase 3 items #62 (childhood rewrite) and #63 (repetition cleanup) -- rewrote all 67 childhood sections in documentary journalism tone, removed dead generation sections, simplified assembleReport.js. 8 issues remain. Next: #59 celebrity curation (last Phase 3 item) or Phase 4 quick wins (#55, #54, #67, #65). Check ISSUE-PLAN.md for the full plan."
