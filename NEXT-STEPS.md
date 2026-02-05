# Next Steps - Life Story

Last Updated: 2026-02-05

## Immediate Tasks (Start Here)

### 1. Phase 3: Content Quality
**Priority**: HIGH
**Effort**: Substantial (~7 hr across 3 issues)
**Issues**: #59, #62, #63

#### #59 - Curate celebrity birthday lists to max 10 recognizable names per day
**File(s)**: `src/data/birthdays/*.json` (12 monthly files)
**What to do**: Audit all 366 birthday lists, trim to max 10 recognizable names each. Remove obscure celebrities that don't resonate.
**Why**: Lists are too long and include names most people won't recognize

#### #62 - Formative years/childhood content is saccharine and schlocky
**File(s)**: `src/data/years/*.json` (childhood_context section)
**What to do**: Rewrite childhood sections to match the new journalistic tone. Less "the smell of fresh Play-Doh" nostalgia, more specific cultural anchoring.
**Why**: Childhood sections feel generic and overly sentimental compared to the now-improved career and comparison sections

#### #63 - Remove content repetition across report sections
**File(s)**: `src/data/years/*.json` (all sections)
**What to do**: Audit year files for repeated information between sections (e.g., same event mentioned in childhood_context AND historical_milestones).
**Why**: Reports feel padded when the same facts appear in multiple tabs

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

- For #62 (childhood content): how much nostalgia is too much? Some specificity ("Blockbuster Friday nights") is genuinely good -- the issue is generic sentimentality.
- For #63 (repetition): should there be any intentional overlap between tabs, or should each tab be completely self-contained?

## Blockers

None

## Next Session Starter Prompt

Copy this to start your next session:

> "Continue working on life-story. Last session: Completed Phase 2 (Content Tone Overhaul) -- rewrote all 71 data files to fix voice (#64), career tone (#61), and comparison tone (#60). All prose now uses third-person/documentary voice with factual journalism. 10 issues remain across 3 phases. Next: Phase 3 is Content Quality (#59, #62, #63) or grab quick wins from Phase 4 (#55, #54, #67, #65). Check ISSUE-PLAN.md for the full plan."
