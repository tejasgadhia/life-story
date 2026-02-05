# Next Steps - Life Story

Last Updated: 2026-02-05

## Immediate Tasks (Start Here)

### 1. Phase 2: Content Tone Overhaul
**Priority**: HIGH (P2-high)
**Effort**: Substantial (~10 hr across 3 issues)
**Issues**: #61, #60, #64

#### #61 - Career section tone is inappropriately dark
**File(s)**: `src/data/years/*.json` (career section HTML)
**What to do**: Rewrite career sections to remove "what was done to you" victimization framing. Keep factual analysis without the bleakness.
**Why**: User testing flagged this as off-putting

#### #60 - Generational comparison sections too bleak
**File(s)**: `src/data/generations/*.json` (comparison section HTML)
**What to do**: Tone down doom-and-gloom comparisons. Balance negative economic data with positive generational contributions.
**Why**: Reports should feel insightful, not depressing

#### #64 - Switch from second-person to third-person voice
**File(s)**: All `src/data/years/*.json` and `src/data/generations/*.json`
**What to do**: Replace "you" with objective/third-person voice throughout report content
**Why**: Second person feels too presumptuous for a data-driven report

### 2. Quick Wins (Phase 4)
**Priority**: MEDIUM
**Effort**: ~30 min each

- #55 - Add `max-w-prose` to content areas for readability
- #54 - Add "back to landing page" navigation element
- #67 - Switch Timeline body text to sans-serif font
- #65 - Fix Newspaper theme word spacing

## Future Enhancements

- PDF export
- Heat map visualization
- Additional themes (Art Deco, Scientific journal)
- Server-side rendering for SEO

## Questions to Resolve

- Should content rewrites (#61, #60, #64) be done all at once or incrementally?
- What tone to strike: witty magazine journalist (per CLAUDE.md) but less dark?
- Is third-person voice the right call, or would a more neutral second-person work?

## Blockers

None

## Next Session Starter Prompt

Copy this to start your next session:

> "Continue working on life-story. Last session: Completed Phase 1 (Mobile & UX Fixes) -- fixed 3 issues (#52, #53, #58) with mobile viewport overflow, tab scroll indicators, and clearer birthday labels. 13 issues remain across 4 phases. Next: Phase 2 is Content Tone Overhaul (#61, #60, #64) or grab quick wins from Phase 4 (#55, #54, #67, #65). Check ISSUE-PLAN.md for the full plan. Run /tg-bugfix phase 2 to start the next phase."
